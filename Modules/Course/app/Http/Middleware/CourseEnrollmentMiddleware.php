<?php

namespace Modules\Course\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\Course\Http\Middleware\Concerns\ChecksCourseAccess;
use Modules\Course\Models\Course;
use Modules\Course\Models\CourseLiveClass;
use Modules\Course\Models\WatchHistory;
use Symfony\Component\HttpFoundation\Response;

class CourseEnrollmentMiddleware
{
    use ChecksCourseAccess;

    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        $course = $this->resolveCourse($request);

        if (! $course) {
            return back()->with('error', 'Invalid course');
        }

        if ($this->userHasCourseAccess($user, $course)) {
            return $next($request);
        }

        return back()->with('error', 'You are not enrolled in this course');
    }

    /**
     * This middleware is shared by routes that identify the course
     * differently: `course.play.start`/`course.play.finish` bind a
     * {watch_history}, `course.play.init` only has a `course_id` in the
     * request body (no WatchHistory exists yet), and the live-class routes
     * bind a CourseLiveClass {id} instead.
     */
    private function resolveCourse(Request $request): ?Course
    {
        $watchHistory = $request->route('watch_history');

        if ($watchHistory instanceof WatchHistory) {
            return Course::find($watchHistory->course_id);
        }

        if ($request->filled('course_id')) {
            return Course::find($request->course_id);
        }

        $liveClassId = $request->route('id');

        if ($liveClassId) {
            return CourseLiveClass::find($liveClassId)?->course;
        }

        return null;
    }
}
