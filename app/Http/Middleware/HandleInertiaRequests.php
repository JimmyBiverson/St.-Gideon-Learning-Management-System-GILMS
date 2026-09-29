<?php

namespace App\Http\Middleware;

use App\Services\GoogleAnalyticsService;
use App\Services\MetaPixelService;
use App\Services\NotificationService;
use App\Services\SettingsService;
use App\Services\SiteTranslationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;
use Inertia\Middleware;
use Modules\AIAssistant\Services\AIAssistantProviderService;
use Modules\Frontend\Models\Project;
use Modules\Language\Models\Language;
use Modules\Language\Services\LanguageService;

class HandleInertiaRequests extends Middleware
{
    public function __construct(
        private SettingsService $settingsService,
        private LanguageService $languageService,
        private NotificationService $notificationService,
        private MetaPixelService $metaPixelService,
        private GoogleAnalyticsService $googleAnalyticsService,
        private SiteTranslationService $siteTranslationService,
    ) {}

    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * Returning null disables Inertia's 409 version-mismatch redirect, which
     * in Inertia v2 causes a white screen due to encrypted-history decrypt
     * failures after the forced location reload. Vite's content-hashed filenames
     * already handle cache-busting, so the 409 mechanism is redundant.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return null;
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        if (! applicationInstalled()) {
            return [];
        }

        try {
            // Check if the database connection is established
            DB::connection()->getPdo();

            // Get the user
            $user = Auth::user();

            // Get the system settings
            $system = app('system');

            // Get the languages
            if (Schema::hasTable('languages')) {
                $langs = Language::where('is_active', true)->orderBy('is_default', 'desc')->get();
                $defaultLanguage = $langs->where('is_default', true)->first();
                $default = $defaultLanguage ? $defaultLanguage->code : 'en';
                config(['app.locale' => $default]);
                $locale = Cookie::get('locale', $default);
                App::setLocale($locale);

                $this->languageService->setLanguageProperties($locale);
            } else {
                $langs = [];
                $locale = Cookie::get('locale', 'en');
            }

            // Overlays onto the app('system') singleton in place, so every
            // other reader within this request (HomeController's meta
            // tags, the footer's company description, ...) sees the
            // translated fields too, as long as they resolve it after this
            // point — which they do, since this middleware runs first.
            if ($system) {
                $this->siteTranslationService->applyToSystemSettings($system);
            }

            // Get the direction
            $direction = Cookie::get('direction', 'ltr');
            if ($system && array_key_exists('direction', $system->fields)) {
                $systemDirection = $system->fields['direction'];
                if ($systemDirection !== 'none') {
                    $direction = $systemDirection;
                }
            }

            // Get the frontend
            $frontend = null;
            if ($system && array_key_exists('frontend', $system->fields) && ! empty($system->fields['frontend'])) {
                $frontend = Project::query()->first();
            }

            return [
                ...parent::share($request),
                'name' => config('app.name'),
                'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
                'auth' => ['user' => $user],
                'system' => $system,
                'frontend' => $frontend,
                'customize' => $request->query('customize', false),
                'appearance' => $request->cookie('appearance') ?? 'system',
                'navbar' => $this->settingsService->getNavbar('navbar_1'),
                'footer' => $this->settingsService->getFooter('footer_1'),
                'notifications' => Inertia::always(fn () => $this->notificationService->unreadFeed()),
                'unreadNotificationsCount' => Inertia::always(fn () => $this->notificationService->unreadCount()),
                'notificationPollInterval' => (int) config('notifications.poll_interval'),
                'langs' => $langs,
                'locale' => $locale,
                'direction' => $direction,
                'translate' => [
                    'auth' => trans('auth'),
                    'button' => trans('button'),
                    'common' => trans('common'),
                    'dashboard' => trans('dashboard'),
                    'frontend' => trans('frontend'),
                    'input' => trans('input'),
                    'settings' => trans('settings'),
                    'table' => trans('table'),
                ],
                'flash' => [
                    'error' => fn () => $request->session()->get('error'),
                    'warning' => fn () => $request->session()->get('warning'),
                    'success' => fn () => $request->session()->get('success'),
                    'metaPixelEvent' => fn () => $request->session()->get('metaPixelEvent'),
                    'googleAnalyticsEvent' => fn () => $request->session()->get('googleAnalyticsEvent'),
                ],
                'metaPixel' => [
                    'enabled' => $this->metaPixelService->isPixelEnabled(),
                    'pixelId' => $this->metaPixelService->isPixelEnabled() ? $this->metaPixelService->pixelId() : null,
                ],
                'googleAnalytics' => [
                    'enabled' => $this->googleAnalyticsService->isAnalyticsEnabled(),
                    'measurementId' => $this->googleAnalyticsService->isAnalyticsEnabled() ? $this->googleAnalyticsService->measurementId() : null,
                ],
                'pluginStatuses' => fn () => $this->moduleStatuses(),
            ];
        } catch (\Throwable $th) {
            return [
                ...parent::share($request),
                'name' => config('app.name'),
                'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
                'auth' => ['user' => Auth::user()],
                'system' => null,
                'frontend' => null,
                'customize' => $request->query('customize', false),
                'appearance' => $request->cookie('appearance') ?? 'system',
                'navbar' => null,
                'footer' => null,
                'notifications' => [],
                'unreadNotificationsCount' => 0,
                'notificationPollInterval' => (int) config('notifications.poll_interval'),
                'langs' => [],
                'locale' => Cookie::get('locale', 'en'),
                'direction' => Cookie::get('direction', 'ltr'),
                'translate' => [
                    'auth' => trans('auth'),
                    'button' => trans('button'),
                    'common' => trans('common'),
                    'dashboard' => trans('dashboard'),
                    'frontend' => trans('frontend'),
                    'input' => trans('input'),
                    'settings' => trans('settings'),
                    'table' => trans('table'),
                ],
                'flash' => [
                    'error' => fn () => $request->session()->get('error'),
                    'warning' => fn () => $request->session()->get('warning'),
                    'success' => fn () => $request->session()->get('success'),
                    'metaPixelEvent' => fn () => $request->session()->get('metaPixelEvent'),
                    'googleAnalyticsEvent' => fn () => $request->session()->get('googleAnalyticsEvent'),
                ],
                'metaPixel' => [
                    'enabled' => false,
                    'pixelId' => null,
                ],
                'googleAnalytics' => [
                    'enabled' => false,
                    'measurementId' => null,
                ],
                'pluginStatuses' => fn () => $this->moduleStatuses(),
            ];
        }
    }

    /**
     * @return array<string, bool>
     */
    private function moduleStatuses(): array
    {
        $path = base_path('modules_statuses.json');

        if (! File::exists($path)) {
            return [];
        }

        $statuses = json_decode(File::get($path), true);
        $statuses = is_array($statuses) ? $statuses : [];

        if (($statuses['AIAssistant'] ?? false) && class_exists(AIAssistantProviderService::class)) {
            $user = Auth::user();
            if ($user && app(AIAssistantProviderService::class)->isInstructorRestricted($user)) {
                $statuses['AIAssistant'] = false;
            }
        }

        return $statuses;
    }
}
