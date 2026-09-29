<?php

namespace Modules\Installer\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class InstalledRoutes
{
    /**
     * Handle an incoming request.
     *
     * This middleware only ever redirects *toward* the installer.
     * InstallerRoutes is the only thing allowed to redirect away from it, so
     * the two can never both fire on the same request and trade the visitor
     * back and forth.
     */
    public function handle(Request $request, Closure $next)
    {
        if (applicationInstalled() || isInstallerRequest($request)) {
            return $next($request);
        }

        return redirect()->route('install.index');
    }
}
