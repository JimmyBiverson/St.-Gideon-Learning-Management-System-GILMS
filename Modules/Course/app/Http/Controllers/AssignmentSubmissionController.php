<?php

namespace Modules\Course\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Modules\Course\Http\Requests\StoreAssignmentSubmissionRequest;
use Modules\Course\Http\Requests\UpdateAssignmentSubmissionRequest;
use Modules\Course\Services\AssignmentSubmissionService;

class AssignmentSubmissionController extends Controller
{
    public function __construct(
        private AssignmentSubmissionService $submissionService,
    ) {}

    /**
     * Store a newly created submission in storage.
     */
    public function store(StoreAssignmentSubmissionRequest $request)
    {
        $this->submissionService->submitAssignment($request->validated());

        return back()->with('success', 'Assignment submitted successfully.');
    }

    /**
     * Update/Grade the specified submission.
     */
    public function update(UpdateAssignmentSubmissionRequest $request, string $id)
    {
        $this->submissionService->gradeSubmission($request->validated(), $id);

        return back()->with('success', 'Assignment graded successfully.');
    }

    /**
     * Get student submissions for an assignment.
     */
    public function getStudentSubmissions(string $assignmentId)
    {
        $submissions = $this->submissionService->getStudentSubmissions($assignmentId, Auth::id());

        return response()->json($submissions);
    }

    /**
     * Get a specific submission.
     */
    public function show(string $id)
    {
        $submission = $this->submissionService->getSubmissionById($id);

        return response()->json($submission);
    }
}
