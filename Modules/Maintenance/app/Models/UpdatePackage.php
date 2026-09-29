<?php

namespace Modules\Maintenance\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

/**
 * @property int $id
 * @property string $original_filename
 * @property string $path
 * @property int $size
 * @property string|null $sha256
 * @property string|null $version
 * @property string|null $min_upgradable_from
 * @property string|null $package_type
 * @property int $file_count
 * @property bool $vendor_included
 * @property bool $incremental
 * @property string|null $base_version
 * @property int $removed_count
 * @property string $status
 * @property array{errors: array<int, string>, warnings: array<int, string>}|null $validation
 */
class UpdatePackage extends Model
{
    public const string STATUS_READY = 'ready';

    public const string STATUS_INVALID = 'invalid';

    public const string STATUS_APPLIED = 'applied';

    public const string DISK = 'local';

    protected $fillable = [
        'original_filename',
        'path',
        'size',
        'sha256',
        'version',
        'min_upgradable_from',
        'package_type',
        'file_count',
        'vendor_included',
        'incremental',
        'base_version',
        'removed_count',
        'status',
        'validation',
        'uploaded_by',
        'applied_at',
    ];

    protected $casts = [
        'validation' => 'array',
        'size' => 'integer',
        'file_count' => 'integer',
        'vendor_included' => 'boolean',
        'incremental' => 'boolean',
        'removed_count' => 'integer',
        'applied_at' => 'datetime',
    ];

    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    public function absolutePath(): string
    {
        return Storage::disk(self::DISK)->path($this->path);
    }

    public function existsOnDisk(): bool
    {
        return Storage::disk(self::DISK)->exists($this->path);
    }

    /**
     * @return array<int, string>
     */
    public function errors(): array
    {
        return $this->validation['errors'] ?? [];
    }

    /**
     * @return array<int, string>
     */
    public function warnings(): array
    {
        return $this->validation['warnings'] ?? [];
    }

    /**
     * Whether this package can be installed on top of the given version.
     *
     * Deliberately derived rather than stored: a package that is too old today
     * was fine yesterday, and one that is installable today stops being so the
     * moment a different package is applied.
     */
    public function isUpgradeFor(string $currentVersion): bool
    {
        return $this->blockedReason($currentVersion) === null;
    }

    /**
     * Why this package cannot be installed right now, or null if it can be.
     */
    public function blockedReason(string $currentVersion): ?string
    {
        if ($this->status === self::STATUS_APPLIED) {
            return 'This package has already been installed.';
        }

        if ($this->status === self::STATUS_INVALID) {
            return $this->errors()[0] ?? 'This package failed validation.';
        }

        if (! $this->existsOnDisk()) {
            return 'The package file is missing from the server. Upload it again.';
        }

        if ($this->version === null) {
            return 'The package does not declare a version.';
        }

        $currentVersion = trim($currentVersion);

        // An incremental package holds only the difference from one exact
        // version. Applied to anything else it would leave the installation a
        // mixture of two releases, so there is no "or newer" here.
        if ($this->incremental && $this->base_version !== null && $this->base_version !== $currentVersion) {
            return "This incremental update applies to version {$this->base_version}, but you are running {$currentVersion}.";
        }

        if (version_compare($this->version, $currentVersion, '<')) {
            return "Version {$this->version} is older than your current version ({$currentVersion}).";
        }

        if (version_compare($this->version, $currentVersion, '=')) {
            return "Version {$this->version} is already installed.";
        }

        if ($this->min_upgradable_from !== null
            && version_compare($currentVersion, $this->min_upgradable_from, '<')) {
            return "Version {$this->version} requires {$this->min_upgradable_from} or newer. Install the intermediate release first.";
        }

        return null;
    }

    /**
     * Shape handed to the maintenance page.
     *
     * @return array<string, mixed>
     */
    public function toListItem(string $currentVersion): array
    {
        $blockedReason = $this->blockedReason($currentVersion);

        return [
            'id' => $this->id,
            'original_filename' => $this->original_filename,
            'size' => $this->size,
            'sha256' => $this->sha256,
            'version' => $this->version,
            'min_upgradable_from' => $this->min_upgradable_from,
            'package_type' => $this->package_type,
            'file_count' => $this->file_count,
            'vendor_included' => $this->vendor_included,
            'incremental' => $this->incremental,
            'base_version' => $this->base_version,
            'removed_count' => $this->removed_count,
            'status' => $this->status,
            'errors' => $this->errors(),
            'warnings' => $this->warnings(),
            'can_upgrade' => $blockedReason === null,
            'blocked_reason' => $blockedReason,
            'uploaded_at' => $this->created_at?->toIso8601String(),
            'applied_at' => $this->applied_at?->toIso8601String(),
        ];
    }
}
