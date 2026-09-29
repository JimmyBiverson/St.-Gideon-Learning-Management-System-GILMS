<?php

namespace Modules\Course\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\Course\Http\Middleware\Concerns\ChecksCourseAccess;
use Modules\Course\Models\SectionLesson;
use Symfony\Component\HttpFoundation\Response;

class LessonEnrollmentMiddleware
{
    use ChecksCourseAccess;

    /**
     * Handle an incoming request.
     *
     * Gates the lesson video streaming route by the same access rules as
     * CourseEnrollmentMiddleware, but keyed by the route-bound {lesson}
     * instead of a {watch_history} — the streaming route has no watch
     * history in its URL.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        /** @var SectionLesson $lesson */
        $lesson = $request->route('lesson');
        $course = $lesson->course;

        if ($this->userHasCourseAccess($user, $course)) {
            return $next($request);
        }

        abort(403, 'You are not enrolled in this course');
    }
}
