<?php

namespace App\Services;

use App\Models\ChunkedUpload;
use App\Rules\RejectsExecutableExtension;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class LocalFileUploadService
{
    protected string $disk;

    public function __construct()
    {
        $this->disk = 'public';
    }

    public function initiateUpload(string $filename, string $mimeType, int $fileSize, int $userId, array $metadata = [])
    {
        $extension = pathinfo($filename, PATHINFO_EXTENSION);

        // Belt-and-suspenders: ChunkInitiateRequest already rejects
        // dangerous/mismatched extensions before this is called, but this
        // is the point where the extension actually lands in a
        // publicly-served file path, so it's guarded again here too.
        if (RejectsExecutableExtension::isDenied($extension)) {
            throw new \InvalidArgumentException("Uploads with a .{$extension} extension are not allowed.");
        }

        // Application update packages are the entire product — source, Modules/
        // and vendor/. They must never land on the public disk, where they
        // would be downloadable at a plain HTTPS URL for as long as they sit
        // there (which is forever, if the update crashes before cleanup).
        // Lesson videos are private for the same reason: a public URL is a
        // permanent, unauthenticated download link for paid course content.
        $filetype = $metadata['filetype'] ?? null;
        $isUpdatePackage = $filetype === 'update';
        $isPrivate = $isUpdatePackage || $filetype === 'lesson_video';
        $disk = $isPrivate ? 'local' : $this->disk;
        $filePath = ($isUpdatePackage ? 'updates/' : 'lessons/').Str::uuid().'.'.$extension;

        // Create directory if it doesn't exist
        Storage::disk($disk)->makeDirectory(dirname($filePath));

        $uploadRecord = ChunkedUpload::create([
            'user_id' => $userId,
            'filename' => $filePath,
            'original_filename' => $filename,
            'file_path' => $filePath,
            'disk' => $disk,
            'mime_type' => $mimeType,
            'size' => $fileSize,
            'upload_id' => (string) Str::uuid(),
            'key' => $filePath,
            'status' => 'initialized',
            'chunks_completed' => 0,
            'total_chunks' => 0,
            'metadata' => $metadata,
        ]);

        return $uploadRecord;
    }

    /**
     * The disk an upload actually lives on. Set per-upload at initiation, so
     * every later operation must read it back from the record rather than
     * assuming the service default.
     */
    protected function diskFor($upload): string
    {
        return $upload->disk ?: $this->disk;
    }

    /**
     * Local storage has no presigned-URL concept — the app server is the
     * upload destination, so there's nothing to bypass. Kept as a no-op so
     * FileUploadService can call this uniformly across all three services.
     */
    public function presignedPartUrl($upload, int $partNumber, int $ttlMinutes = 120): ?string
    {
        return null;
    }

    public function uploadPart($upload, int $partNumber, string $partContent): array
    {
        $chunkPath = $upload->key.'.part'.$partNumber;
        Storage::disk($this->diskFor($upload))->put($chunkPath, $partContent);

        $upload->increment('chunks_completed');

        return [
            'PartNumber' => $partNumber,
            'ETag' => md5($partContent),
            // Don't include chunk_path in the response as it can be reconstructed
        ];
    }

    public function completeUpload($upload, array $parts): bool
    {
        $disk = $this->diskFor($upload);
        $mergePath = Storage::disk($disk)->path($upload->key.'.merging');

        try {
            // Sort parts by part number
            usort($parts, fn ($a, $b) => $a['PartNumber'] <=> $b['PartNumber']);

            // Merge into a temporary file opened for *writing*, then rename it
            // into place. Appending straight onto the destination made this
            // non-idempotent: a retried completion silently produced a
            // double-length file that still opens as a ZIP and only fails
            // later, halfway through overwriting the application.
            $finalHandle = fopen($mergePath, 'wb');

            if ($finalHandle === false) {
                throw new \RuntimeException('Unable to open the merge target for writing.');
            }

            foreach ($parts as $part) {
                // Handle both cases: when chunk_path is provided or needs to be constructed
                $chunkPath = $part['chunk_path'] ?? ($upload->key.'.part'.$part['PartNumber']);
                $absoluteChunkPath = Storage::disk($disk)->path($chunkPath);

                if (! file_exists($absoluteChunkPath)) {
                    // Never merge around a missing chunk: carrying on produced
                    // a silently truncated file, which for an update package
                    // means a partial application overwriting a working one.
                    throw new \RuntimeException("Upload is incomplete: chunk {$part['PartNumber']} is missing. Please upload the file again.");
                }

                $chunkHandle = fopen($absoluteChunkPath, 'rb');
                stream_copy_to_stream($chunkHandle, $finalHandle);
                fclose($chunkHandle);
                unlink($absoluteChunkPath);
            }

            fclose($finalHandle);

            if (! rename($mergePath, Storage::disk($disk)->path($upload->key))) {
                throw new \RuntimeException('Unable to move the merged upload into place.');
            }

            // Private uploads (application update packages, lesson videos) are
            // addressed by their upload id, never by URL — there is no public
            // URL to hand out.
            $fileUrl = $disk === 'public' ? asset('storage/'.$upload->key) : null;

            $upload->update([
                'status' => 'completed',
                'file_url' => $fileUrl,
            ]);

            return true;
        } catch (\Exception $e) {
            if (file_exists($mergePath)) {
                @unlink($mergePath);
            }

            Log::error('Local file upload completion error: '.$e->getMessage());
            $upload->update(['status' => 'failed']);
            throw $e;
        }
    }

    /**
     * Delete only this upload's own leftover chunk/part files, addressed
     * directly by number, rather than listing the whole (shared,
     * ever-growing — every local lesson video lives in the same flat
     * "lessons/" directory, see initiateUpload() above) directory just to
     * filter it down to a prefix match. That listing cost scaled with the
     * total number of files ever uploaded, not just this one.
     */
    private function cleanupPartFiles($upload, string $disk): void
    {
        for ($partNumber = 1; $partNumber <= $upload->total_chunks; $partNumber++) {
            $chunkPath = $upload->key.'.part'.$partNumber;

            if (Storage::disk($disk)->exists($chunkPath)) {
                Storage::disk($disk)->delete($chunkPath);
            }
        }
    }

    public function abortUpload($upload): bool
    {
        $disk = $this->diskFor($upload);

        try {
            $this->cleanupPartFiles($upload, $disk);

            // Delete a half-finished merge and the final file if they exist
            // — correct here because aborting means the upload should end up
            // with nothing on disk, whether it was mid-merge or (called out
            // of order) already complete.
            foreach ([$upload->key.'.merging', $upload->key] as $path) {
                if (Storage::disk($disk)->exists($path)) {
                    Storage::disk($disk)->delete($path);
                }
            }

            $upload->update(['status' => 'aborted']);

            return true;
        } catch (\Exception $e) {
            Log::error('Local upload abort error: '.$e->getMessage());

            return false;
        }
    }

    public function deleteFile(ChunkedUpload $upload): bool
    {
        $disk = $this->diskFor($upload);

        // Only clean up leftover part files here — not via abortUpload(),
        // which also deletes the final merged file itself. Calling that for
        // an already-completed file raced with the deletion below: it
        // removed $upload->key first, so the exists() check that used to
        // gate both the delete() call and $upload->delete() always failed,
        // silently leaving the ChunkedUpload row behind forever even though
        // the file was gone. Deliberately does NOT deleteDirectory(dirname(
        // $upload->key)) either: every local lesson video shares the single
        // flat "lessons/" directory, so that used to recursively delete
        // every locally-stored lesson video in the whole application, not
        // just this one — and its cost scaled with everything else sitting
        // in that directory, which is what made deletion slow as the
        // library grew.
        $this->cleanupPartFiles($upload, $disk);

        if (Storage::disk($disk)->exists($upload->key)) {
            Storage::disk($disk)->delete($upload->key);
        }

        $upload->delete();

        return true;
    }
}
