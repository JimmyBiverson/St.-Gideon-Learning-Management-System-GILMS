<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdatePageSectionRequest;
use App\Models\Page;
use App\Models\Setting;
use App\Services\JobCircularService;
use App\Services\PageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Inertia\Inertia;
use Modules\Course\Services\CourseCategoryService;
use Modules\Frontend\Models\ProjectPage;
use Modules\Frontend\Services\PageTranslationService;

class HomeController extends Controller
{
    public function __construct(
        protected PageService $pageService,
        protected JobCircularService $jobCircularService,
        protected CourseCategoryService $categoryService,
        protected PageTranslationService $pageTranslationService,
    ) {}

    public function index(Request $request)
    {
        if ((bool) app('system')->fields['frontend']) {
            $page = ProjectPage::where('type', 'home')
                ->where('status', true)
                ->select('id', 'title', 'slug', 'content', 'type', 'description', 'banner')
                ->first();

            if ($page) {
                $this->pageTranslationService->applyToPage($page);
            }

            $system = app('system');
            $siteName = $system->fields['name'] ?? 'Mentor Learning Management System';
            $metaTags = [
                'metaTitle' => $page ? ($page->title.' | '.$siteName) : $siteName,
                'metaDescription' => $page?->description ?? $system->fields['description'] ?? '',
                'ogTitle' => $page?->title ?? $siteName,
                'ogDescription' => $page?->description ?? $system->fields['description'] ?? '',
                'ogImage' => $page?->banner ?? $system->fields['banner'] ?? '',
                'ogUrl' => request()->url(),
                'ogType' => 'website',
                'twitterCard' => 'summary_large_image',
                'twitterTitle' => $page?->title ?? $siteName,
                'twitterDescription' => $page?->description ?? $system->fields['description'] ?? '',
                'twitterImage' => $page?->banner ?? $system->fields['banner'] ?? '',
            ];

            return Inertia::render('Frontend/index', [
                'type' => 'home',
                'page' => $page,
            ])->withViewData($metaTags);
        }

        $home = Setting::where('type', 'home_page')->first();
        $page = Page::where('id', $home->fields['page_id'])
            ->with(['sections' => function ($query) {
                $query->orderBy('sort', 'asc');
            }])
            ->first();
        $sections = $this->pageService->getPageSections($request->all(), $page);

        return Inertia::render('intro/'.$page->slug, [
            'page' => $page,
            'type' => 'intro',
            ...$sections,
        ]);
    }

    public function demo(Request $request, string $slug)
    {
        if (app('system')->fields['frontend']) {
            return Inertia::render('404');
        }

        $page = $this->pageService->getPageBySlug($slug);
        $sections = $this->pageService->getPageSections($request->all(), $page);

        return Inertia::render('intro/'.$page->slug, [
            'page' => $page,
            'type' => 'demo',
            ...$sections,
        ]);
    }

    /**
     * Update the specified section in storage.
     */
    public function update_section(UpdatePageSectionRequest $request, string $id)
    {
        $section = $this->pageService->updatePageSection($id, $request->validated());

        return back()->with('success', "Section '{$section->name}' has been updated successfully");
    }

    /**
     * Update the specified section in storage.
     */
    public function sort_section(Request $request)
    {
        $this->pageService->sortPageSections($request->sortedData);

        return back()->with('success', 'Page sections is sorted successfully');
    }

    public function inner_page(Request $request)
    {
        if (app('system')->fields['frontend'] && $request->slug != 'careers') {
            $page = ProjectPage::where('type', 'inner')
                ->where('status', true)
                ->where('slug', $request->slug)
                ->with('project')
                ->first();

            if (! $page) {
                return Inertia::render('404');
            }

            $this->pageTranslationService->applyToPage($page);

            $system = app('system');
            $siteName = $system->fields['name'] ?? 'Mentor Learning Management System';
            $metaTags = [
                'metaTitle' => $page->title.' | '.$siteName,
                'metaDescription' => $page->description ?? $system->fields['description'] ?? '',
                'ogTitle' => $page->title,
                'ogDescription' => $page->description ?? $system->fields['description'] ?? '',
                'ogImage' => $page->banner ?? $system->fields['banner'] ?? '',
                'ogUrl' => request()->url(),
                'ogType' => 'website',
                'twitterCard' => 'summary_large_image',
                'twitterTitle' => $page->title,
                'twitterDescription' => $page->description ?? $system->fields['description'] ?? '',
                'twitterImage' => $page->banner ?? $system->fields['banner'] ?? '',
            ];

            return Inertia::render('Frontend/index', [
                'type' => 'inner',
                'page' => $page,
            ])->withViewData($metaTags);
        }

        $innerPages = $this->pageService->getActiveInnerPages();
        $validSlugs = $innerPages->pluck('slug')->toArray();

        // Check if the requested slug exists in inner pages
        if (! in_array($request->slug, $validSlugs)) {
            // abort(404);
            return Inertia::render('404');
        }

        $page = $this->pageService->getCustomPageBySlug($request->slug);
        $sections = $request->slug === 'careers' ? [] : $this->pageService->getPageSections($request->all(), $page);
        $jobCirculars = $request->slug === 'careers' ?
            $this->jobCircularService->getJobCirculars(array_merge($request->all(), [
                'paginate' => true,
                'select' => 'id,uuid,title,status,location,job_type,work_type,experience_level,positions_available,application_deadline',
            ])) : null;

        return Inertia::render('inner/index', [
            'page' => $page,
            'jobCirculars' => $jobCirculars,
            ...$sections,
        ]);
    }

    public function seeder()
    {
        ini_set('max_execution_time', 600);

        try {
            Artisan::call('migrate:fresh', ['--force' => true, '--seed' => true]);

            Artisan::call('storage:link');

            Artisan::call('optimize:clear');

            return back()->with('success', 'Installation completed successfully. You can now log in.');
        } catch (\Throwable $th) {
            return back()->with('error', 'Error: '.$th->getMessage());
        }
    }
}
