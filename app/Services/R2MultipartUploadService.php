<?php

namespace App\Services;

use App\Models\ChunkedUpload;
use App\Rules\RejectsExecutableExtension;
use Aws\S3\Exception\S3Exception;
use Aws\S3\S3Client;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class R2MultipartUploadService
{
    protected string $bucket;

    protected S3Client $s3Client;

    public function __construct()
    {
        $this->s3Client = R2ClientFactory::make();
        $this->bucket = R2ClientFactory::bucket();
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
        try {
            // Generate a unique file path for R2
            $extension = pathinfo($filename, PATHINFO_EXTENSION);

            if (RejectsExecutableExtension::isDenied($extension)) {
                throw new \InvalidArgumentException("Uploads with a .{$extension} extension are not allowed.");
            }

            $r2Key = 'lessons/'.Str::uuid().'.'.$extension;

            // Create multipart upload request
            $result = $this->s3Client->createMultipartUpload([
                'Bucket' => $this->bucket,
                'Key' => $r2Key,
                'ContentType' => $mimeType,
            ]);

            // Create record in database
            $uploadRecord = ChunkedUpload::create([
                'user_id' => $userId,
                'filename' => $r2Key,
                'original_filename' => $filename,
                'file_path' => $r2Key,
                'disk' => 'r2',
                'mime_type' => $mimeType,
                'size' => $fileSize,
                'upload_id' => $result['UploadId'],
                'key' => $r2Key,
                'status' => 'initialized',
                'chunks_completed' => 0,
                'total_chunks' => 0,
                'metadata' => $metadata,
            ]);

            return $uploadRecord;
        } catch (S3Exception $e) {
            Log::error('R2 multipart upload initialization error: '.$e->getMessage());
            throw $e;
        }
    }

    /**
     * A presigned URL the browser can PUT a part's bytes to directly,
     * bypassing our server entirely for the byte transfer. Presigning is a
     * local HMAC computation — no network call, no error handling needed
     * beyond what already wraps this class.
     */
    public function presignedPartUrl(ChunkedUpload $upload, int $partNumber, int $ttlMinutes = 120): string
    {
        $command = $this->s3Client->getCommand('UploadPart', [
            'Bucket' => $this->bucket,
            'Key' => $upload->key,
            'UploadId' => $upload->upload_id,
            'PartNumber' => $partNumber,
        ]);

        return (string) $this->s3Client->createPresignedRequest($command, "+{$ttlMinutes} minutes")->getUri();
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
        try {
            // Upload the part
            $result = $this->s3Client->uploadPart([
                'Bucket' => $this->bucket,
                'Key' => $upload->key,
                'UploadId' => $upload->upload_id,
                'PartNumber' => $partNumber,
                'Body' => $partContent,
            ]);

            // Update upload record
            $upload->increment('chunks_completed');

            // Return part information for completing the upload later
            return [
                'PartNumber' => $partNumber,
                'ETag' => $result['ETag'],
            ];
        } catch (S3Exception $e) {
            Log::error('R2 multipart upload part error: '.$e->getMessage());
            throw $e;
        }
    }

    /**
     * Complete multipart upload
     *
     * @param  ChunkedUpload  $upload  Upload record
     * @param  array  $parts  Array of part information from uploadPart()
     */
    public function completeUpload(ChunkedUpload $upload, array $parts): bool
    {
        try {
            // Complete the multipart upload
            $this->s3Client->completeMultipartUpload([
                'Bucket' => $this->bucket,
                'Key' => $upload->key,
                'UploadId' => $upload->upload_id,
                'MultipartUpload' => [
                    'Parts' => $parts,
                ],
            ]);

            // Generate the R2 public URL
            $publicUrl = config('filesystems.disks.r2.url');
            $r2Url = rtrim($publicUrl, '/').'/'.$upload->key;

            // Update upload record
            $upload->update([
                'status' => 'completed',
                'file_url' => $r2Url,
            ]);

            return true;
        } catch (S3Exception $e) {
            Log::error('R2 multipart upload completion error: '.$e->getMessage());
            $upload->update(['status' => 'failed']);
            throw $e;
        }
    }

    /**
     * Abort multipart upload
     *
     * @param  ChunkedUpload  $upload  Upload record
     */
    public function abortUpload(ChunkedUpload $upload): bool
    {
        try {
            if ($upload->upload_id) {
                $this->s3Client->abortMultipartUpload([
                    'Bucket' => $this->bucket,
                    'Key' => $upload->key,
                    'UploadId' => $upload->upload_id,
                ]);
            }

            // Update upload record
            $upload->update([
                'status' => 'aborted',
            ]);

            return true;
        } catch (S3Exception $e) {
            Log::error('R2 multipart upload abort error: '.$e->getMessage());

            return false;
        }
    }

    /**
     * Delete a file from R2
     *
     * @param  ChunkedUpload  $upload  Upload record
     * @return bool True on success, false on failure
     */
    public function deleteFile(ChunkedUpload $upload): bool
    {
        try {
            // Clean up any remaining chunks
            $this->abortUpload($upload);

            $result = $this->s3Client->deleteObject([
                'Bucket' => $this->bucket,
                'Key' => $upload->key,
            ]);

            if ($result) {
                $upload->delete();

                return true;
            }

            return false;
        } catch (S3Exception $e) {
            Log::error('R2 file deletion error: '.$e->getMessage());

            return false;
        }
    }
}
