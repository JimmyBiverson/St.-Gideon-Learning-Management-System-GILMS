<?php

namespace App\Http\Controllers;

use App\Http\Requests\FooterItemRequest;
use App\Http\Requests\NavbarItemRequest;
use App\Http\Requests\StoreCustomPageRequest;
use App\Http\Requests\UpdateAuthRequest;
use App\Http\Requests\UpdateCustomPageRequest;
use App\Http\Requests\UpdateGoogleAnalyticsRequest;
use App\Http\Requests\UpdateInstructorProfileRequest;
use App\Http\Requests\UpdateMetaPixelRequest;
use App\Http\Requests\UpdateSmtpSettingsRequest;
use App\Http\Requests\UpdateStorageRequest;
use App\Http\Requests\UpdateZoomConfigRequest;
use App\Models\Footer;
use App\Models\FooterItem;
use App\Models\Navbar;
use App\Models\NavbarItem;
use App\Services\InstructorService;
use App\Services\SettingsService;
use App\Services\SiteTranslationService;
use App\Services\StudentService;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function __construct(
        private StudentService $studentService,
        private SettingsService $settingsService,
        private InstructorService $instructorService,
        private SiteTranslationService $siteTranslationService,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function account(Request $request)
    {
        $instructor = null;
        if (! $request->tab || $request->tab === 'profile-update') {
            $instructor = $this->instructorService->getInstructorByUserId(Auth::user()->id);
        }

        return Inertia::render('dashboard/settings/account', ['instructor' => $instructor, 'tab' => $request->tab]);
    }

    /**
     * Display a listing of the resource.
     */
    public function profile_update(UpdateInstructorProfileRequest $request)
    {
        $user = Auth::user();
        $user = $this->studentService->updateProfile($request->validated(), $user->id);
        $this->instructorService->updateInstructor($request->validated(), $user->instructor_id);

        return back()->with('success', 'Profile updated successfully');
    }

    /**
     * Display a listing of the resource.
     */
    public function system(Request $request)
    {
        $system = $this->settingsService->getSetting(['type' => 'system']);

        // Captured before the overlay below so the edit form always has the
        // real (default-locale) source text for the translatable fields to
        // submit back, even while a translated locale is being viewed —
        // otherwise saving the (non-translatable) sections underneath would
        // silently overwrite the English source with the translated copy,
        // since system_update replaces the whole `fields` column.
        $systemDefaultFields = $system
            ? Arr::only($system->fields, SiteTranslationService::SYSTEM_SETTING_FIELDS)
            : [];

        // This is a page-level prop, so it shadows the already-translated
        // `system` shared by HandleInertiaRequests — without this, the
        // Website Information tab would silently show English regardless
        // of the selected locale, unlike every other reader of app('system').
        if ($system) {
            $this->siteTranslationService->applyToSystemSettings($system);
        }

        return Inertia::render('dashboard/settings/system/index', compact('system', 'systemDefaultFields'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function system_update(Request $request, string $id)
    {
        $this->settingsService->systemUpdate($request->all(), $id);

        return back()->with('success', 'System settings updated successfully');
    }

    /**
     * Get system setting (SEO/branding) translations for a locale.
     */
    public function system_translations(string $locale)
    {
        $system = $this->settingsService->getSetting(['type' => 'system']);

        return response()->json([
            'translations' => $system
                ? $this->siteTranslationService->getMap(SiteTranslationService::SYSTEM_SETTING, $locale)
                : [],
        ]);
    }

    /**
     * Save system setting (SEO/branding) translations for a locale.
     */
    public function system_translations_update(Request $request, string $locale)
    {
        $system = $this->settingsService->getSetting(['type' => 'system']);

        if (! $system) {
            return back()->withErrors(['error' => 'System settings not found']);
        }

        $translations = $request->validate(['translations' => 'present|array'])['translations'];

        foreach ($translations as &$item) {
            $item['translatable_id'] = $system->id;
        }
        unset($item);

        $this->siteTranslationService->saveMap(SiteTranslationService::SYSTEM_SETTING, $locale, $translations);

        return back()->with('success', 'Website translations saved successfully');
    }

    /**
     * Display a listing of the resource.
     */
    public function pages(Request $request)
    {
        $home = $this->settingsService->getSetting(['type' => 'home_page']);
        $pages = $this->settingsService->getAllPagesWithSections();

        return Inertia::render('dashboard/settings/pages/index', compact('home', 'pages'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function home_pages_update(Request $request, string $id)
    {
        $validated = $request->validate([
            'page_id' => 'required|exists:pages,id',
            'page_name' => 'required|string',
            'page_slug' => 'required|string',
        ]);

        $this->settingsService->homePagesSelect($validated, $id);

        return back()->with('success', 'Home page has been updated successfully');
    }

    public function system_type_update(Request $request)
    {
        $request->validate([
            'sub_type' => 'required|string|in:collaborative,administrative',
        ]);

        $this->settingsService->updateSystemType($request->sub_type);

        return back()->with('success', 'System type has been updated successfully');
    }

    public function custom_pages_edit(Request $request, string $id)
    {
        $page = $this->settingsService->getPageById($id);

        return Inertia::render('dashboard/settings/pages/update', compact('page'));
    }

    public function custom_pages_store(StoreCustomPageRequest $request)
    {
        $this->settingsService->customPagesCreate($request->validated());

        return back()->with('success', 'Custom page has been created successfully');
    }

    public function custom_pages_update(UpdateCustomPageRequest $request, string $id)
    {
        $this->settingsService->customPagesUpdate($request->validated(), $id);

        return back()->with('success', 'Custom page has been updated successfully');
    }

    public function custom_pages_destroy(string $id)
    {
        $this->settingsService->customPagesDestroy($id);

        return back()->with('success', 'Custom page has been deleted successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function page_select(Request $request, string $id)
    {
        // $this->settingsService->pagesUpdate($request->all(), $id);

        return back()->with('success', 'Pages settings updated successfully');
    }

    /**
     * Display a listing of the resource.
     */
    public function storage(Request $request)
    {
        $storage = $this->settingsService->getSetting(['type' => 'storage']);

        return Inertia::render('dashboard/settings/storage', compact('storage'));
    }

    /**
     * Update the specified resource in storage.
     */
    // public function storage_update(Request $request, Setting $setting)
    public function storage_update(UpdateStorageRequest $request, string $id)
    {
        $this->settingsService->storageUpdate($request->validated(), $id);
        Artisan::call('config:clear');

        return back()->with('success', 'Storage settings updated successfully');
    }

    /**
     * Display a listing of the resource.
     */
    public function smtp(Request $request)
    {
        $smtp = $this->settingsService->getSetting(['type' => 'smtp']);

        return Inertia::render('dashboard/settings/smtp', compact('smtp'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function smtp_update(UpdateSmtpSettingsRequest $request, string $id)
    {
        try {
            $this->settingsService->smtpUpdate($request->validated(), $id);

            return back()->with('success', 'SMTP settings updated successfully. A test email was sent to verify your configuration.');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function auth0(Request $request)
    {
        $auths = $this->settingsService->getSettings(['type' => 'auth']);

        return Inertia::render('dashboard/settings/auth', compact('auths'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function auth0_update(UpdateAuthRequest $request, string $id)
    {
        $this->settingsService->authUpdate($request->validated(), $id);

        return back()->with('success', 'Auth settings updated successfully.');
    }

    /**
     * Display a listing of the resource.
     */
    public function maintenance(Request $request)
    {
        Artisan::call('optimize:clear');

        return redirect(route('system.update-seeder'));
    }

    /**
     * Display a listing of the resource.
     */
    public function live_class(Request $request)
    {
        $liveClass = $this->settingsService->getSetting(['type' => 'live_class']);

        return Inertia::render('dashboard/settings/live-class', compact('liveClass'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function live_class_update(UpdateZoomConfigRequest $request, string $id)
    {
        try {
            $this->settingsService->zoomConfigUpdate($request->validated(), $id);

            return back()->with('success', 'Zoom configuration settings updated successfully.');
        } catch (\Exception $e) {
            return back()->with('error', $e->getMessage());
        }
    }

    /**
     * Display a listing of the resource.
     */
    public function meta_pixel(Request $request)
    {
        $metaPixel = $this->settingsService->getSetting(['type' => 'meta_pixel']);

        return Inertia::render('dashboard/settings/meta-pixel', compact('metaPixel'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function meta_pixel_update(UpdateMetaPixelRequest $request, string $id)
    {
        $this->settingsService->metaPixelUpdate($request->validated(), $id);

        return back()->with('success', 'Meta Pixel settings updated successfully.');
    }

    /**
     * Display a listing of the resource.
     */
    public function google_analytics(Request $request)
    {
        $googleAnalytics = $this->settingsService->getSetting(['type' => 'google_analytics']);

        return Inertia::render('dashboard/settings/google-analytics', compact('googleAnalytics'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function google_analytics_update(UpdateGoogleAnalyticsRequest $request, string $id)
    {
        $this->settingsService->googleAnalyticsUpdate($request->validated(), $id);

        return back()->with('success', 'Google Analytics settings updated successfully.');
    }

    /**
     * Store a new navbar item.
     */
    public function navbar_items_store(NavbarItemRequest $request, Navbar $navbar)
    {
        try {
            $this->settingsService->createNavbarItem($navbar, $request->validated());

            return back()->with('success', 'Navbar item created successfully');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to create navbar item: '.$e->getMessage());
        }
    }

    /**
     * Update a navbar item.
     */
    public function navbar_items_update(NavbarItemRequest $request, NavbarItem $item)
    {
        try {
            $this->settingsService->updateNavbarItem($item, $request->validated());

            return back()->with('success', 'Navbar item updated successfully');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to update navbar item: '.$e->getMessage());
        }
    }

    /**
     * Delete a navbar item.
     */
    public function navbar_items_destroy(NavbarItem $item)
    {
        try {
            $this->settingsService->deleteNavbarItem($item);

            return back()->with('success', 'Navbar item deleted successfully');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to delete navbar item: '.$e->getMessage());
        }
    }

    /**
     * Reorder navbar items.
     */
    public function navbar_items_reorder(Request $request)
    {
        try {
            $this->settingsService->reorderNavbarItems($request->sortedData);

            return back()->with('success', 'Navbar items reordered successfully');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to reorder navbar items: '.$e->getMessage());
        }
    }

    /**
     * Store a new footer item.
     */
    public function footer_items_store(FooterItemRequest $request, Footer $footer)
    {
        try {
            $this->settingsService->createFooterItem($footer, $request->validated());

            return back()->with('success', 'Footer item created successfully');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to create footer item: '.$e->getMessage());
        }
    }

    /**
     * Update a footer item.
     */
    public function footer_items_update(FooterItemRequest $request, FooterItem $item)
    {
        try {
            $this->settingsService->updateFooterItem($item, $request->validated());

            return back()->with('success', 'Footer item updated successfully');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to update footer item: '.$e->getMessage());
        }
    }

    /**
     * Delete a footer item.
     */
    public function footer_items_destroy(FooterItem $item)
    {
        try {
            $this->settingsService->deleteFooterItem($item);

            return back()->with('success', 'Footer item deleted successfully');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to delete footer item: '.$e->getMessage());
        }
    }

    /**
     * Reorder footer items.
     */
    public function footer_items_reorder(Request $request)
    {
        try {
            $this->settingsService->reorderFooterItems($request->sortedData);

            return back()->with('success', 'Footer items reordered successfully');
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to reorder footer items: '.$e->getMessage());
        }
    }

    /**
     * Get navbar item translations for a locale.
     */
    public function navbar_translations(string $locale)
    {
        return response()->json([
            'translations' => $this->siteTranslationService->getMap(SiteTranslationService::NAVBAR_ITEM, $locale),
        ]);
    }

    /**
     * Save navbar item translations for a locale.
     */
    public function navbar_translations_update(Request $request, string $locale)
    {
        $translations = $request->validate(['translations' => 'present|array'])['translations'];

        $this->siteTranslationService->saveMap(SiteTranslationService::NAVBAR_ITEM, $locale, $translations);

        return back()->with('success', 'Navbar translations saved successfully');
    }

    /**
     * Get footer item translations for a locale.
     */
    public function footer_translations(string $locale)
    {
        return response()->json([
            'translations' => $this->siteTranslationService->getMap(SiteTranslationService::FOOTER_ITEM, $locale),
        ]);
    }

    /**
     * Save footer item translations for a locale.
     */
    public function footer_translations_update(Request $request, string $locale)
    {
        $translations = $request->validate(['translations' => 'present|array'])['translations'];

        $this->siteTranslationService->saveMap(SiteTranslationService::FOOTER_ITEM, $locale, $translations);

        return back()->with('success', 'Footer translations saved successfully');
    }
}
