<?php

namespace Modules\Course\Services;

final readonly class LessonVideoUrl
{
    /**
     * @param  'direct'|'iframe'  $type  'direct' feeds a <video src>
     *                                   (local/s3/r2); 'iframe' is a Bunny embed, which needs its own
     *                                   player and isn't refreshed mid-playback the way a bearer-token
     *                                   URL is (see LessonVideoUrlResolver::bunnyEmbedUrl()).
     */
    public function __construct(
        public ?string $url,
        public ?int $expiresInSeconds,
        public string $type = 'direct',
    ) {}
}
