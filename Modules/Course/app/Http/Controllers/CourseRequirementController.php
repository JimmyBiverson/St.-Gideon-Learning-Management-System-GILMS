<?php

namespace Modules\Course\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Course\Http\Requests\StoreCourseRequirementRequest;
use Modules\Course\Http\Requests\UpdateCourseRequirementRequest;
use Modules\Course\Services\CourseRequirementService;

class CourseRequirementController extends Controller
{
    public function __construct(
        private CourseRequirementService $requirementService,
    ) {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseRequirementRequest $request)
    {
        $this->requirementService->createRequirement($request->validated());

        return back()->with('success', 'Course Requirement added successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseRequirementRequest $request, string $requirement)
    {
        $this->requirementService->updateRequirement($request->validated(), $requirement);

        return back()->with('success', 'Course Requirement updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $requirement)
    {
        $this->requirementService->deleteRequirement($requirement);

        return back()->with('success', 'Course Requirement deleted successfully');
    }
}
