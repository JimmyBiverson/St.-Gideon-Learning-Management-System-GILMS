<?php

namespace App\Http\Middleware;

use App\Enums\SystemType;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SystemCollaborative
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $system = app('system');

        if ($system->sub_type === SystemType::COLLABORATIVE->value) {
            return $next($request);
        }

        return abort(404);
    }
}
