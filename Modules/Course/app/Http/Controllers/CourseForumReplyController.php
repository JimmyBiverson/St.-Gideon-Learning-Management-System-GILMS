<?php

namespace Modules\Course\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Course\Http\Requests\StoreCourseForumReplyRequest;
use Modules\Course\Http\Requests\UpdateCourseForumReplyRequest;
use Modules\Course\Models\CourseForumReply;
use Modules\Course\Services\CourseForumService;

class CourseForumReplyController extends Controller
{
    public function __construct(
        protected CourseForumService $forumService
    ) {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseForumReplyRequest $request)
    {
        $this->forumService->createForumReply($request->validated());

        return back()->with('success', 'Forum reply created successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseForumReplyRequest $request, string $id)
    {
        $this->forumService->updateForumReply($id, $request->validated());

        return back()->with('success', 'Forum reply updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CourseForumReply $courseForumReply)
    {
        $this->forumService->deleteForumReply($courseForumReply->id);

        return back()->with('success', 'Forum reply deleted successfully');
    }
}
