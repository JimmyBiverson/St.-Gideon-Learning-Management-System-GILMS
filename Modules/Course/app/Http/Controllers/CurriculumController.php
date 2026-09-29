<?php

namespace Modules\Course\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\Course\Http\Requests\StoreLessonRequest;
use Modules\Course\Http\Requests\StoreSectionRequest;
use Modules\Course\Http\Requests\UpdateLessonRequest;
use Modules\Course\Http\Requests\UpdateSectionRequest;
use Modules\Course\Services\CourseSectionService;

class CurriculumController extends Controller
{
    public function __construct(protected CourseSectionService $sectionService) {}

    /**
     * Creates a new course section
     *
     * @param  StoreSectionRequest  $request  Validated request containing section data
     * @return RedirectResponse
     */
    public function section_store(StoreSectionRequest $request)
    {
        $user = Auth::user();

        $this->sectionService->createSection($request->validated(), $user->id);

        return back()->with('success', 'Section added successfully');
    }

    /**
     * Updates an existing course section
     *
     * @param  UpdateSectionRequest  $request  Validated request containing updated section data
     * @param  string  $id  Section ID to update
     * @return RedirectResponse
     */
    public function section_update(UpdateSectionRequest $request, string $id)
    {
        $this->sectionService->updateSection($id, $request->validated());

        return back()->with('success', 'Section updated successfully');
    }

    /**
     * Deletes a course section
     *
     * @param  string  $id  Section ID to delete
     * @return RedirectResponse
     */
    public function section_delete(string $id)
    {
        $this->sectionService->deleteSection($id);

        return back()->with('success', 'Section and all associated lessons deleted successfully');
    }

    /**
     * Updates the sort order of course sections
     *
     * @param  Request  $request  Contains itemJSON with ordered section IDs
     */
    public function section_sort(Request $request): RedirectResponse
    {
        $this->sectionService->sortSections($request->sortedData);

        return back()->with('success', 'Sections sorted successfully');
    }

    /**
     * Creates a new lesson within a section
     *
     * @param  StoreLessonRequest  $request  Validated request containing lesson data
     * @return RedirectResponse
     */
    public function lesson_store(StoreLessonRequest $request)
    {
        $user = Auth::user();

        $this->sectionService->createSectionLesson($request->validated(), $user->id);

        return back()->with('success', 'Lesson added successfully');
    }

    /**
     * Updates an existing lesson
     *
     * @param  UpdateLessonRequest  $request  Validated request containing updated lesson data
     * @param  string  $id  Lesson ID to update
     * @return RedirectResponse
     */
    public function lesson_update(UpdateLessonRequest $request, string $id)
    {
        $this->sectionService->updateSectionLesson($id, $request->validated());

        return back()->with('success', 'Lesson updated successfully');
    }

    /**
     * Deletes a lesson
     *
     * @return RedirectResponse
     */
    public function lesson_delete(string $id)
    {
        $this->sectionService->deleteSectionLesson($id);

        return back()->with('success', 'Lesson deleted successfully');
    }

    /**
     * Updates the sort order of lessons within a section
     *
     * @param  Request  $request  Contains itemJSON with ordered lesson IDs
     * @return RedirectResponse
     */
    public function lesson_sort(Request $request)
    {
        $this->sectionService->sortSectionLessons($request->sortedData);

        return back()->with('success', 'Lessons sorted successfully');
    }
}
