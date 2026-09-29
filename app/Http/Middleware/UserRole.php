<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class UserRole
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // Check if user is logged in
        if (! $request->user()) {
            return redirect()->route('login.index');
        }

        // Allow access if user has any of the specified roles
        if (in_array($request->user()->role, $roles)) {
            return $next($request);
        }

        // If user doesn't have the required role
        return redirect()->back()->with('error', 'You do not have permission to access this page.');
    }
}
