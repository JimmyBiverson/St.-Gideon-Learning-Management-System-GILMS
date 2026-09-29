<?php

namespace App\Services;

use App\Models\ChunkedUpload;

class FileUploadService
{
    /** @var array<string, LocalFileUploadService|S3MultipartUploadService|R2MultipartUploadService> */
    protected array $services = [];

    /**
     * Every operation below except initiateUpload() acts on an existing
     * ChunkedUpload, which already knows which disk it actually lives on
     * (`$upload->disk`) — that must be what selects the service, not
     * whichever driver happens to be active right now. Picking off the
     * active driver instead meant a file uploaded to R2 stopped being
     * deletable (or resolvable) the moment an admin switched the active
     * storage driver to something else; it only ever "worked" by
     * coincidence when nobody had switched drivers since the upload.
     */
    protected function serviceFor(string $disk): LocalFileUploadService|S3MultipartUploadService|R2MultipartUploadService
    {
        return $this->services[$disk] ??= match ($disk) {
            's3' => new S3MultipartUploadService,
            'r2' => new R2MultipartUploadService,
            default => new LocalFileUploadService,
        };
    }

    /**
     * Get the underlying upload service instance for the currently active
     * storage driver.
     */
    public function getService(): LocalFileUploadService|S3MultipartUploadService|R2MultipartUploadService
    {
        return $this->serviceFor(config('filesystems.default'));
    }

    /**
     * Initialize multipart upload
     *
     * @param  string  $filename  Original filename
     * @param  string  $mimeType  Mime type of the file
     * @param  int  $fileSize  Total file size
     * @param  int  $userId  User ID
     * @param  array  $metadata  Additional metadata
     */
    public function initiateUpload(string $filename, string $mimeType, int $fileSize, int $userId, array $metadata = []): ChunkedUpload
    {
        return $this->serviceFor(config('filesystems.default'))->initiateUpload($filename, $mimeType, $fileSize, $userId, $metadata);
    }

    /**
     * Upload a part of the file
     *
     * @param  ChunkedUpload  $upload  Upload record
     * @param  int  $partNumber  Part number (1-based)
     * @param  string  $partContent  Content of the part
     * @return array Part information for completing the upload
     */
    public function uploadPart(ChunkedUpload $upload, int $partNumber, string $partContent): array
    {
        return $this->serviceFor($upload->disk)->uploadPart($upload, $partNumber, $partContent);
    }

    /**
     * A presigned URL the browser can PUT a part's bytes to directly
     * (S3/R2 only — null for local, which has no such concept).
     */
    public function presignedPartUrl(ChunkedUpload $upload, int $partNumber, int $ttlMinutes = 120): ?string
    {
        return $this->serviceFor($upload->disk)->presignedPartUrl($upload, $partNumber, $ttlMinutes);
    }

    /**
     * Complete multipart upload
     *
     * @param  ChunkedUpload  $upload  Upload record
     * @param  array  $parts  Array of part information from uploadPart()
     */
    public function completeUpload(ChunkedUpload $upload, array $parts): bool
    {
        return $this->serviceFor($upload->disk)->completeUpload($upload, $parts);
    }

    /**
     * Abort multipart upload
     *
     * @param  ChunkedUpload  $upload  Upload record
     */
    public function abortUpload(ChunkedUpload $upload): bool
    {
        return $this->serviceFor($upload->disk)->abortUpload($upload);
    }

    /**
     * Delete a file
     *
     * @param  ChunkedUpload  $upload  Upload record
     */
    public function deleteFile(ChunkedUpload $upload): bool
    {
        return $this->serviceFor($upload->disk)->deleteFile($upload);
    }

    /**
     * Get current storage driver
     */
    public function getDriver(): string
    {
        return config('filesystems.default');
    }

    /**
     * Check if using local storage
     */
    public function isLocalStorage(): bool
    {
        return config('filesystems.default') === 'local';
    }

    /**
     * Check if using cloud storage (S3 or R2)
     */
    public function isS3Storage(): bool
    {
        return config('filesystems.default') === 's3';
    }

    /**
     * Check if using cloud storage (S3 or R2)
     */
    public function isR2Storage(): bool
    {
        return config('filesystems.default') === 'r2';
    }
}
