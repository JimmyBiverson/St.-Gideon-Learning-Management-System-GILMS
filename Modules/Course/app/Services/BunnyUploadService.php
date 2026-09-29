<?php

namespace Modules\Course\Services;

use App\Models\ChunkedUpload;
use Illuminate\Support\Facades\Http;
use RuntimeException;

/**
 * Video uploads for lesson videos go directly from the browser to Bunny via
 * TUS (see BunnyVideoUploadController + resources/js/components/bunny-uploader-input.tsx)
 * — this service only talks to Bunny's regular HTTP API to create/delete the
 * video object, never to move file bytes. That's why it doesn't fit
 * App\Services\FileUploadService's chunk-relay interface (there's no
 * uploadPart() equivalent) and stays a standalone service used only by the
 * Bunny-specific upload endpoints and by CourseSectionService's cleanup.
 */
class BunnyUploadService
{
    private const API_BASE = 'https://video.bunnycdn.com';

    /**
     * Create a video object in the configured library and a matching
     * ChunkedUpload row, then return everything the browser needs to start
     * a TUS upload straight to Bunny.
     *
     * @return array{upload: ChunkedUpload, video_id: string, library_id: string, signature: string, expire: int}
     */
    public function initiate(string $title, int $userId): array
    {
        $libraryId = (string) config('services.bunny.library_id');
        $apiKey = (string) config('services.bunny.api_key');

        $response = Http::withHeaders(['AccessKey' => $apiKey])
            ->acceptJson()
            ->post(self::API_BASE."/library/{$libraryId}/videos", ['title' => $title]);

        if (! $response->successful() || empty($response->json('guid'))) {
            throw new RuntimeException('Failed to create the video on Bunny Stream: '.$response->body());
        }

        $videoId = (string) $response->json('guid');

        $upload = ChunkedUpload::create([
            'user_id' => $userId,
            'filename' => $videoId,
            'original_filename' => $title,
            'file_path' => $videoId,
            'disk' => 'bunny',
            'mime_type' => 'video/mp4',
            'size' => 0,
            'key' => $videoId,
            'status' => 'initialized',
            'chunks_completed' => 0,
            'total_chunks' => 1,
        ]);

        // Bunny requires at least a 1 hour window for the TUS upload to
        // complete in, regardless of how short our own signed-URL TTL is.
        $expire = now()->addHour()->timestamp;
        $signature = hash('sha256', $libraryId.$apiKey.$expire.$videoId);

        return [
            'upload' => $upload,
            'video_id' => $videoId,
            'library_id' => $libraryId,
            'signature' => $signature,
            'expire' => $expire,
        ];
    }

    public function markCompleted(ChunkedUpload $upload): void
    {
        $upload->update(['status' => 'completed']);
    }

    public function deleteFile(ChunkedUpload $upload): bool
    {
        $libraryId = (string) config('services.bunny.library_id');
        $apiKey = (string) config('services.bunny.api_key');

        $response = Http::withHeaders(['AccessKey' => $apiKey])
            ->acceptJson()
            ->delete(self::API_BASE."/library/{$libraryId}/videos/{$upload->key}");

        // Bunny 404s if the video was already removed on their side — that
        // still means our own row is safe to clean up.
        if (! $response->successful() && $response->status() !== 404) {
            return false;
        }

        $upload->delete();

        return true;
    }
}
