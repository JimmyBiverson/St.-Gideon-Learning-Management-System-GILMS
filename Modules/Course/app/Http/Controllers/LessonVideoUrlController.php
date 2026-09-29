<?php

namespace Modules\Course\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Modules\Course\Models\SectionLesson;
use Modules\Course\Services\LessonVideoUrlResolver;

class LessonVideoUrlController extends Controller
{
    /**
     * Mint a fresh signed/presigned playback URL for a video lesson. The
     * player calls this proactively before its current URL expires, so a
     * short TTL (see config('course.video_url_ttl_minutes')) doesn't break
     * playback of a long lesson.
     */
    public function __invoke(SectionLesson $lesson, LessonVideoUrlResolver $resolver): JsonResponse
    {
        abort_if($lesson->lesson_type !== 'video', 404);

        $videoUrl = $resolver->resolve($lesson);

        return response()->json([
            'url' => $videoUrl->url,
            'expires_in' => $videoUrl->expiresInSeconds,
        ]);
    }
}
