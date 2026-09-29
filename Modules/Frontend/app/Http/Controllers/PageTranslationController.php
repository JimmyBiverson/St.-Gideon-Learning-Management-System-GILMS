<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Frontend\Http\Requests\UpdatePageTranslationRequest;
use Modules\Frontend\Models\Project;
use Modules\Frontend\Models\ProjectPage;
use Modules\Frontend\Services\PageTranslationService;

class PageTranslationController extends Controller
{
    public function __construct(protected PageTranslationService $pageTranslationService) {}

    public function index(Project $project, ProjectPage $page, string $locale)
    {
        if ($page->project_id != $project->id) {
            abort(403, 'Unauthorized access to this page.');
        }

        return response()->json([
            'translations' => $this->pageTranslationService->getMap($page, $locale),
        ]);
    }

    public function update(UpdatePageTranslationRequest $request, Project $project, ProjectPage $page, string $locale)
    {
        if ($page->project_id != $project->id) {
            abort(403, 'Unauthorized access to this page.');
        }

        $this->pageTranslationService->saveMap($page, $locale, $request->validated('translations'));

        return back()->with('success', 'Translations saved successfully');
    }
}
