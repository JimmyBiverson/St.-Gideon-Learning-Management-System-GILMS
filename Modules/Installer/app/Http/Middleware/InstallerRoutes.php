<?php

namespace Modules\Installer\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InstallerRoutes
{
    /**
     * Handle an incoming request.
     *
     * This middleware only ever redirects *away from* the installer, and only
     * once there is a working installation to go back to. InstalledRoutes owns
     * the opposite direction, so a request can never be bounced between them.
     */
    public function handle(Request $request, Closure $next)
    {
        if (applicationInstalled() && isDBConnected()) {
            // route('home') rather than a hardcoded '/', so the target
            // follows APP_URL and any sub-directory the app is served from.
            return redirect()->route('home');
        }

        Inertia::share('flash', [
            'error' => fn () => $request->session()->get('error'),
            'warning' => fn () => $request->session()->get('warning'),
            'success' => fn () => $request->session()->get('success'),
        ]);

        return $next($request);
    }
}
