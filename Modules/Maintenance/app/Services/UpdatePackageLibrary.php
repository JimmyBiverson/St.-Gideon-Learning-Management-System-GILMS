<?php

namespace Modules\Maintenance\Services;

use App\Models\ChunkedUpload;
use App\Services\Updates\UpdatePackageValidator;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Modules\Maintenance\Models\UpdatePackage;
use RuntimeException;

/**
 * The library of update packages staged on this server.
 *
 * Uploading and upgrading are separate steps on purpose: they fail for
 * different reasons, and a failed upgrade should cost a retry, not another
 * 60MB upload over the connection that already proved unreliable.
 */
class UpdatePackageLibrary
{
    public function __construct(
        private UpdatePackageValidator $validator
    ) {}

    /**
     * Adopt a completed chunked upload as an update package: validate it,
     * record what it is, and hand ownership of the file over from the upload.
     *
     * @throws RuntimeException
     */
    public function register(int $uploadId, ?int $userId = null): UpdatePackage
    {
        $upload = ChunkedUpload::query()
            ->where('id', $uploadId)
            ->where('status', 'completed')
            ->first();

        if (! $upload) {
            throw new RuntimeException('The uploaded file could not be found. Please upload it again.');
        }

        if (($upload->metadata['filetype'] ?? null) !== 'update') {
            throw new RuntimeException('The selected file is not an application update package.');
        }

        $path = (string) $upload->key;

        if (! Storage::disk(UpdatePackage::DISK)->exists($path)) {
            throw new RuntimeException('The uploaded file is missing from the server. Please upload it again.');
        }

        $absolutePath = Storage::disk(UpdatePackage::DISK)->path($path);

        // Structural validation only — whether it is installable *now* depends
        // on the site's version and is re-derived every time the list is read.
        $result = $this->validator->validate($absolutePath);

        $package = UpdatePackage::create([
            'original_filename' => $upload->original_filename,
            'path' => $path,
            'size' => filesize($absolutePath),
            'sha256' => hash_file('sha256', $absolutePath),
            'version' => $result->version,
            'min_upgradable_from' => $result->minUpgradableFrom,
            'package_type' => $result->type,
            'file_count' => $result->fileCount,
            'vendor_included' => $result->vendorIncluded,
            'incremental' => $result->incremental,
            'base_version' => $result->baseVersion,
            'removed_count' => $result->removedCount,
            'status' => $result->isValid() ? UpdatePackage::STATUS_READY : UpdatePackage::STATUS_INVALID,
            'validation' => ['errors' => $result->errors, 'warnings' => $result->warnings],
            'uploaded_by' => $userId,
        ]);

        // The package row owns the file from here; the upload record has done
        // its job and would otherwise be a second claim on the same bytes.
        $upload->delete();

        Log::info('Update package registered', [
            'package' => $package->original_filename,
            'version' => $package->version,
            'status' => $package->status,
            'errors' => $result->errors,
        ]);

        $this->prune($package->id);

        return $package;
    }

    /**
     * Re-check a package that is already on disk. A file can rot, and a package
     * validated against an older release of the validator may be judged
     * differently by a newer one.
     */
    public function reverify(UpdatePackage $package): UpdatePackage
    {
        if (! $package->existsOnDisk()) {
            $package->update([
                'status' => UpdatePackage::STATUS_INVALID,
                'validation' => [
                    'errors' => ['The package file is missing from the server. Upload it again.'],
                    'warnings' => [],
                ],
            ]);

            return $package;
        }

        $absolutePath = $package->absolutePath();
        $result = $this->validator->validate($absolutePath);
        $checksum = hash_file('sha256', $absolutePath);

        $errors = $result->errors;

        if ($package->sha256 !== null && $package->sha256 !== $checksum) {
            $errors[] = 'The package file has changed on disk since it was uploaded.';
        }

        $package->update([
            'size' => filesize($absolutePath),
            'sha256' => $checksum,
            'version' => $result->version,
            'min_upgradable_from' => $result->minUpgradableFrom,
            'package_type' => $result->type,
            'file_count' => $result->fileCount,
            'vendor_included' => $result->vendorIncluded,
            'incremental' => $result->incremental,
            'base_version' => $result->baseVersion,
            'removed_count' => $result->removedCount,
            'status' => $errors === [] ? UpdatePackage::STATUS_READY : UpdatePackage::STATUS_INVALID,
            'validation' => ['errors' => $errors, 'warnings' => $result->warnings],
        ]);

        return $package;
    }

    public function delete(UpdatePackage $package): void
    {
        if ($package->existsOnDisk()) {
            Storage::disk(UpdatePackage::DISK)->delete($package->path);
        }

        $package->delete();
    }

    /**
     * Drop the oldest packages once the library exceeds its retention limit.
     * Disk is the scarce resource on shared hosting, and each package is tens
     * of megabytes.
     *
     * @param  int|null  $keepId  A package that must survive regardless of age.
     */
    public function prune(?int $keepId = null): void
    {
        $limit = (int) config('release.package.retention', 3);

        if ($limit < 1) {
            return;
        }

        $survivors = UpdatePackage::query()
            ->orderByDesc('created_at')
            ->orderByDesc('id')
            ->limit($limit)
            ->pluck('id')
            ->all();

        if ($keepId !== null) {
            $survivors[] = $keepId;
        }

        UpdatePackage::query()
            ->whereNotIn('id', $survivors)
            ->get()
            ->each(function (UpdatePackage $package) {
                Log::info('Pruning old update package', ['package' => $package->original_filename]);
                $this->delete($package);
            });
    }

    /**
     * @return Collection<int, UpdatePackage>
     */
    public function all(): Collection
    {
        return UpdatePackage::query()
            ->orderByDesc('created_at')
            ->orderByDesc('id')
            ->get();
    }

    /**
     * Total bytes the library is holding, for the disk-usage hint in the UI.
     */
    public function diskUsage(): int
    {
        return (int) UpdatePackage::query()->sum('size');
    }
}
