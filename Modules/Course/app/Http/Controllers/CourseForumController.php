<?php

namespace Modules\Course\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Course\Http\Requests\StoreCourseForumRequest;
use Modules\Course\Http\Requests\UpdateCourseForumRequest;
use Modules\Course\Services\CourseForumService;

class CourseForumController extends Controller
{
    public function __construct(
        protected CourseForumService $forumService
    ) {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseForumRequest $request)
    {
        $this->forumService->createForum($request->validated());

        return back()->with('success', 'Forum created successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseForumRequest $request, string $id)
    {
        $this->forumService->updateForum($id, $request->validated());

        return back()->with('success', 'Forum updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->forumService->deleteForum($id);

        return back()->with('success', 'Forum deleted successfully');
    }
}
