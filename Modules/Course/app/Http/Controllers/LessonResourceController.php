<?php

namespace Modules\Course\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Course\Http\Requests\CourseSectionLessonResourceRequest;
use Modules\Course\Models\LessonResource;
use Modules\Course\Services\LessonResourceService;

class LessonResourceController extends Controller
{
    public function __construct(private LessonResourceService $service) {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(CourseSectionLessonResourceRequest $request)
    {
        $this->service->resourceStore($request->validated());

        return back()->with('success', 'Resource created successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CourseSectionLessonResourceRequest $request, string $id)
    {
        $lessonResource = LessonResource::findOrFail($id);

        $this->service->resourceUpdate($lessonResource, $request->validated());

        return back()->with('success', 'Resource updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $lessonResource = LessonResource::findOrFail($id);

        $this->service->resourceDelete($lessonResource);

        return back()->with('success', 'Resource deleted successfully');
    }
}
