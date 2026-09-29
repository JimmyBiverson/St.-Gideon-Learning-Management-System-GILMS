<?php

namespace Modules\Maintenance\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\SitemapBuilder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Modules\Maintenance\Http\Requests\MaintenanceLoginRequest;

class SystemController extends Controller
{
    public function login()
    {
        return Inertia::render('Maintenance/login');
    }

    public function verify(MaintenanceLoginRequest $request)
    {
        $request->authenticate();
        $request->session()->regenerate();

        return redirect()->intended(route('system.maintenance.index', absolute: false));
    }

    public function storage()
    {
        Artisan::call('storage:link');

        return redirect(route('system.maintenance.index'))->with('success', 'Storage linked successfully!');
    }

    public function refresh()
    {
        try {
            // Touch .env file to trigger application reload
            $envPath = base_path('.env');
            if (file_exists($envPath)) {
                touch($envPath);
            }

            return redirect(route('system.maintenance.index'))->with('success', 'Server refreshed successfully!');
        } catch (\Exception $e) {
            Log::error('Server refresh failed: '.$e->getMessage());

            return redirect(route('system.maintenance.index'))->with('error', 'Server refresh failed: '.$e->getMessage());
        }
    }

    public function clear(Request $request)
    {
        // Clear caches without affecting logged in users
        // Artisan::call('optimize:clear');
        Artisan::call('cache:clear');
        Artisan::call('config:clear');
        Artisan::call('route:clear');
        Artisan::call('view:clear');
        Artisan::call('up');

        return redirect(route('system.maintenance.index'))->with('success', 'System cache cleared successfully!');
    }

    public function reboot(Request $request)
    {
        // Clear caches without affecting logged in users
        // Artisan::call('optimize');
        Artisan::call('cache:clear');
        Artisan::call('config:clear');
        Artisan::call('route:clear');
        Artisan::call('view:clear');
        Artisan::call('up');

        return redirect(route('system.maintenance.index'))->with('success', 'System rebooted successfully!');
    }

    public function sitemap(SitemapBuilder $sitemapBuilder): RedirectResponse
    {
        try {
            $path = config('sitemap.path');
            $sitemap = $sitemapBuilder->build();
            $urlCount = count($sitemap->getTags());

            $sitemap->writeToFile($path);

            Cache::forget(config('sitemap.cache_key'));

            return redirect(route('system.maintenance.index'))->with(
                'success',
                "Sitemap generated successfully with {$urlCount} URLs at {$path}."
            );
        } catch (\Throwable $e) {
            Log::error('Sitemap generation failed: '.$e->getMessage(), [
                'exception' => $e,
            ]);

            return redirect(route('system.maintenance.index'))->with(
                'error',
                'Sitemap generation failed: '.$e->getMessage()
            );
        }
    }
}
