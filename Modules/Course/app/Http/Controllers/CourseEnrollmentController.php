<?php

namespace Modules\Course\Http\Controllers;

use App\Enums\PricingType;
use App\Http\Controllers\Controller;
use App\Models\Instructor;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Modules\Course\Http\Requests\StoreCourseEnrollmentRequest;
use Modules\Course\Services\CourseEnrollmentService;
use Modules\Course\Services\CourseService;

class CourseEnrollmentController extends Controller
{
    public function __construct(
        private UserService $user,
        private CourseService $course,
        private CourseEnrollmentService $courseEnrollment,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $extraParams = [];
        if (! isAdmin()) {
            if ($user->instructor) {
                /** @var Instructor $instructor */
                $instructor = $user->instructor;
                $extraParams = ['instructor_id' => $instructor->id];
            } else {
                $extraParams = ['user_id' => $user->id];
            }
        }

        $data = array_merge($request->all(), [
            'pagination' => true,
            'relations' => ['course:id,title', 'user:id,name,email,photo'],
        ], $extraParams);

        $prices = PricingType::cases();
        $users = $this->user->getUsers(['select' => 'id,name']);
        $courses = $this->course->getCourses(['status' => 'approved', 'select' => 'id,title,thumbnail', 'pagination' => true]);
        $enrollments = $this->courseEnrollment->getEnrollments($data);

        return Inertia::render('Course/dashboard/enrollments/courses', compact('prices', 'users', 'courses', 'enrollments'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseEnrollmentRequest $request)
    {
        $this->courseEnrollment->createCourseEnroll($request->validated());

        return back()->with('success', 'Enrollment is successfully done in this course');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->courseEnrollment->deleteEnrollment($id);

        return back()->with('success', 'Enrollment is successfully deleted');
    }
}
