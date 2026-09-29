<?php

return [
    'name' => 'Course',

    /*
     * How long a signed/presigned lesson video playback URL stays valid.
     * Short on purpose: the player proactively fetches a fresh one (see
     * LessonVideoUrlController) well before this expires, so it's safe to
     * keep this small to shrink the window a copied URL stays usable.
     */
    'video_url_ttl_minutes' => env('LESSON_VIDEO_URL_TTL_MINUTES', 20),
];
