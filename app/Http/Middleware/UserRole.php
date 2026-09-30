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

        $message = 'You do not have permission to access this page.';

        // `back()` is only safe when it provably lands somewhere else. Without
        // this guard a role mismatch self-loops: the browser sends the page it
        // came from as Referer, `back()` returns it to the page that just
        // refused it, and the pair repeats until the browser reports
        // ERR_TOO_MANY_REDIRECTS. This is exactly what an authenticated student
        // hit, because the `guest` middleware sent them to the admin-only
        // `dashboard` route from `/login`.
        if (canReturnToPreviousPage($request)) {
            return back()->with('error', $message);
        }

        // No safe previous page, so send them to their own home. That route
        // accepts their role, so it renders instead of refusing again.
        return redirect()->to(roleLandingUrl($request->user()))->with('error', $message);
    }
}
