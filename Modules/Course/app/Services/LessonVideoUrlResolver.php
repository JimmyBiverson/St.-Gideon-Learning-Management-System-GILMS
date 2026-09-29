<?php

namespace Modules\Course\Services;

use App\Models\ChunkedUpload;
use App\Services\R2ClientFactory;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Modules\Course\Models\SectionLesson;

class LessonVideoUrlResolver
{
    /**
     * Resolve a short-lived, playable URL for a video lesson. Branches on
     * the disk the upload actually lives on (never on the site's current
     * default storage driver) so a lesson stays playable even after the
     * admin switches storage settings later.
     */
    public function resolve(SectionLesson $lesson): LessonVideoUrl
    {
        /** @var ChunkedUpload|null $upload */
        $upload = $lesson->chunkedUpload;

        if ($upload === null) {
            // Not yet backfilled to the private disk (mid-update, or a row
            // the backfill command couldn't clean up) — keep the lesson
            // playable via its legacy public URL rather than breaking it.
            // There's nothing to refresh, so no expiry is reported.
            return new LessonVideoUrl($lesson->lesson_src ?: null, null);
        }

        if ($upload->disk === 'bunny') {
            return $this->bunnyEmbedUrl($upload);
        }

        $ttlMinutes = (int) config('course.video_url_ttl_minutes', 20);
        $ttl = now()->addMinutes($ttlMinutes);

        $url = match ($upload->disk) {
            'local' => URL::temporarySignedRoute(
                'lesson.video.stream',
                $ttl,
                ['lesson' => $lesson->id]
            ),
            's3' => Storage::disk('s3')->temporaryUrl($upload->key, $ttl),
            'r2' => $this->r2PresignedUrl($upload, $ttl),
            default => null,
        };

        return new LessonVideoUrl($url, $url !== null ? $ttlMinutes * 60 : null);
    }

    private function r2PresignedUrl(ChunkedUpload $upload, \DateTimeInterface $ttl): string
    {
        $client = R2ClientFactory::make();

        $command = $client->getCommand('GetObject', [
            'Bucket' => R2ClientFactory::bucket(),
            'Key' => $upload->key,
        ]);

        return (string) $client->createPresignedRequest($command, $ttl)->getUri();
    }

    /**
     * Bunny's embed-view token is checked once when the iframe loads, not
     * per-segment the way our own signed streaming route or a presigned
     * S3/R2 URL is checked on every byte range — so unlike those, there is
     * nothing to proactively refresh mid-playback. expiresInSeconds is
     * deliberately null: it tells the frontend's refresh timer to stay
     * inert for this lesson (see useLessonVideoUrlRefresh).
     */
    private function bunnyEmbedUrl(ChunkedUpload $upload): LessonVideoUrl
    {
        $libraryId = (string) config('services.bunny.library_id');
        $tokenAuthKey = (string) config('services.bunny.token_auth_key');
        $expires = now()->addMinutes((int) config('course.video_url_ttl_minutes', 20))->timestamp;
        $token = hash('sha256', $tokenAuthKey.$upload->key.$expires);

        $url = "https://iframe.mediadelivery.net/embed/{$libraryId}/{$upload->key}?token={$token}&expires={$expires}";

        return new LessonVideoUrl($url, null, 'iframe');
    }
}
