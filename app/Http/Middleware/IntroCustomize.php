<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class IntroCustomize
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();

        if (! $request->customize) {
            return $next($request);
        }

        if ($user && isAdmin()) {
            return $next($request);
        }

        /*
         * `?customize` is only meaningful for an admin, so everyone else is
         * sent to the home page without the flag.
         *
         * This used to `redirect()->back()`, which self-looped: a refresh sent
         * the page's own URL as Referer, so the browser was returned to the
         * exact URL that had just refused it, until ERR_TOO_MANY_REDIRECTS.
         * Home is used rather than `back()` because it also drops the
         * `customize` parameter, so this cannot be re-triggered on arrival.
         */
        return redirect()->route('home');
    }
}
