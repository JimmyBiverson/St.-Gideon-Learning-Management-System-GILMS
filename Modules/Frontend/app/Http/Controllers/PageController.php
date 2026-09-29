<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Modules\Frontend\Http\Requests\StorePageRequest;
use Modules\Frontend\Http\Requests\UpdatePageRequest;
use Modules\Frontend\Models\Project;
use Modules\Frontend\Models\ProjectPage;
use Modules\Frontend\Services\PageTranslationService;
use Modules\Frontend\Services\ProjectPageService;

class PageController extends Controller
{
    public function __construct(
        protected ProjectPageService $projectPageService,
        protected PageTranslationService $pageTranslationService,
    ) {}

    public function index()
    {
        $project = Project::query()->with('pages')->first();

        return Inertia::render('Frontend/pages', compact('project'));
    }

    public function show(Request $request, ProjectPage $page)
    {
        $page->load('project');

        $this->pageTranslationService->applyToPage($page);

        return Inertia::render('Frontend/index', [
            'page' => $page,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePageRequest $request)
    {
        $this->projectPageService->createPage($request->validated());

        return back()->with('success', 'A new page successfully added');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePageRequest $request, ProjectPage $page)
    {
        $this->projectPageService->updatePage($page, $request->validated());

        $message = $request->status ? 'Page status updated successfully!' : 'Page updated successfully!';

        return back()->with('success', $message);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProjectPage $page)
    {
        $project = Project::query()->find($page->project_id);
        $firstPage = $project->pages()->first();

        if ($project->pages()->count() > 1) {
            $page->delete();
        }

        return redirect()->route('builder.index', [
            'page' => $firstPage->id,
            'project' => $project->id,
        ])->with('success', 'An existing project successfully deleted');
    }

    /**
     * Display the specified page.
     */
    public function editor(Request $request, string $project_id, string $page_id)
    {
        $project = Project::where('id', $project_id)
            ->select(['id', 'name'])
            ->with('media:id,model_id,name,file_name,disk,size,mime_type')
            ->first();
        $page = ProjectPage::where('id', $page_id)
            ->select(['id', 'banner', 'type', 'title', 'content', 'description', 'project_id'])
            ->first();

        if ($page->project_id != $project->id) {
            abort(403, 'Unauthorized access to this page.');
        }

        return Inertia::render('Frontend/editor', [
            'project' => $project,
            'page' => $page,
        ]);
    }

    /**
     * Display the bulk translation table for a single page and locale.
     */
    public function translate(Request $request, string $project_id, string $page_id, string $locale)
    {
        $project = Project::where('id', $project_id)
            ->select(['id', 'name'])
            ->first();
        $page = ProjectPage::where('id', $page_id)
            ->select(['id', 'title', 'content', 'description', 'project_id'])
            ->first();

        if ($page->project_id != $project->id) {
            abort(403, 'Unauthorized access to this page.');
        }

        return Inertia::render('Frontend/translate', [
            'project' => $project,
            'page' => $page,
            'locale' => $locale,
            'translations' => $this->pageTranslationService->getMap($page, $locale),
        ]);
    }

    /**
     * Update the specified page.
     */
    public function content(Request $request, Project $project, ProjectPage $page)
    {
        if ($page->project_id != $project->id) {
            abort(403, 'Unauthorized access to this page.');
        }

        $validated = $request->validate([
            'content' => 'sometimes|json',
        ]);

        DB::beginTransaction();
        try {
            $page->update($validated);

            DB::commit();

            return back();
        } catch (\Exception $e) {
            DB::rollBack();

            return back()->withErrors(['error' => 'Failed to update page. Please try again.']);
        }
    }
}
