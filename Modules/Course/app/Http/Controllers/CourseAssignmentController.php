<?php

namespace Modules\Course\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Course\Http\Requests\StoreAssignmentRequest;
use Modules\Course\Http\Requests\UpdateAssignmentRequest;
use Modules\Course\Services\AssignmentSubmissionService;
use Modules\Course\Services\CourseAssignmentService;
use Modules\Course\Services\CourseService;

class CourseAssignmentController extends Controller
{
    public function __construct(
        private CourseAssignmentService $assignmentService,
        private CourseService $courseService,
        private AssignmentSubmissionService $submissionService,
    ) {}

    /**
     * Display a listing of course assignments.
     */
    public function index(Request $request, string $courseId): Response
    {
        $course = $this->courseService->getEditCourseById($courseId);

        return Inertia::render('Course/dashboard/assignment', [
            'course' => $course,
        ]);
    }

    /**
     * Display a listing of assignment submissions.
     */
    public function submissions(Request $request, string $courseId, string $assignmentId): Response
    {
        $course = $this->courseService->getEditCourseById($courseId);

        $submissions = $this->submissionService->getSubmissions(array_merge($request->all(), [
            'course_assignment_id' => $assignmentId,
            'relations' => ['assignment', 'student', 'grader'],
            'paginate' => true,
        ]));

        return Inertia::render('Course/dashboard/submissions', [
            'course' => $course,
            'assignment' => $assignmentId,
            'submissions' => $submissions,
        ]);
    }

    /**
     * Store a newly created assignment in storage.
     */
    public function store(StoreAssignmentRequest $request)
    {
        $this->assignmentService->createAssignment($request->validated());

        return back()->with('success', 'Assignment has been created.');
    }

    /**
     * Update the specified assignment in storage.
     */
    public function update(UpdateAssignmentRequest $request, string $id)
    {
        $this->assignmentService->updateAssignment($request->validated(), $id);

        return back()->with('success', 'Assignment has been updated.');
    }

    /**
     * Remove the specified assignment from storage.
     */
    public function destroy(string $id)
    {
        $this->assignmentService->deleteAssignment($id);

        return back()->with('success', 'Assignment has been deleted.');
    }
}
