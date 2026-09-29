<?php

namespace Modules\Course\Http\Middleware\Concerns;

use App\Models\User;
use Modules\Course\Models\Course;
use Modules\Course\Models\CourseEnrollment;

trait ChecksCourseAccess
{
    /**
     * Admin, the instructor who owns the course, or an enrolled user may
     * access the course's player/streaming routes — everyone else may not.
     */
    protected function userHasCourseAccess(User $user, Course $course): bool
    {
        if ($user->role === 'admin') {
            return true;
        }

        if ($user->role === 'instructor' && $user->instructor_id === $course->instructor_id) {
            return true;
        }

        return CourseEnrollment::where('user_id', $user->id)
            ->where('course_id', $course->id)
            ->exists();
    }
}
