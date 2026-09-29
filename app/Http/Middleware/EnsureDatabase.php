<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureDatabase
{
    /**
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (isInstallerRequest($request)) {
            return $next($request);
        }

        if (! isDBConnected()) {
            return redirect()->route('install.index');
        }

        return $next($request);
    }
}
