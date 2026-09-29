<?php

use App\Http\Middleware\AppConfig;
use App\Http\Middleware\AuthConfig;
use App\Http\Middleware\EnsureDatabase;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\IntroCustomize;
use App\Http\Middleware\IpDetectorMiddleware;
use App\Http\Middleware\SmtpConfig;
use App\Http\Middleware\SystemCollaborative;
use App\Http\Middleware\TrustProxies;
use App\Http\Middleware\UserRole;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Modules\Installer\Http\Middleware\InstalledRoutes;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

/*
|--------------------------------------------------------------------------
| First-Boot Environment Bootstrap
|--------------------------------------------------------------------------
|
| A checkout with no .env cannot reach its own installer. EncryptCookies
| throws MissingAppKeyException on every request, the exception handler
| redirects to the installer, the installer fails the same way, and the two
| bounce off each other until the browser gives up with
| ERR_TOO_MANY_REDIRECTS. The administrator is then locked out of the one
| screen that would have written a working .env, so the site cannot be
| repaired from the browser at all.
|
| This block runs before the application object exists, which means before
| .env has been parsed, the container has booted, or the database has been
| touched. It therefore only uses the filesystem and PHP itself. Two rules
| keep it safe:
|
|   1. It never overwrites a value that already exists. It only ever invents
|      one that is missing or blank.
|   2. It never throws. A read-only or unwritable .env is a hosting problem
|      to diagnose, not a reason to take the whole site down; the exception
|      handler in withExceptions() below renders a readable diagnostic in
|      that case instead of redirecting.
|
*/

$envPath = dirname(__DIR__).DIRECTORY_SEPARATOR.'.env';
$envExamplePath = $envPath.'.example';

if (! is_file($envPath) && is_file($envExamplePath)) {
    @copy($envExamplePath, $envPath);
}

// A blank APP_KEY is just as fatal as a missing one, and .env.example ships
// with APP_KEY= on purpose (a committed key would be shared by every
// install), so the copy above lands on a blank key. Fill it in.
//
// Line-based on purpose: these patterns use [ \t] rather than \s because \s
// also matches a newline, which lets `APP_KEY\s*=\s*` span a line break and
// write the key onto the following line — where Dotenv ignores it, leaving
// the key just as blank as before.
if (is_file($envPath) && is_writable($envPath)) {
    $env = @file_get_contents($envPath);

    if ($env !== false) {
        $lines = preg_split('/\r\n|\n|\r/', $env);
        $declaresKey = false;
        $freshKey = 'base64:'.base64_encode(random_bytes(32));

        foreach ($lines as $index => $line) {
            if (preg_match('/^[ \t]*APP_KEY[ \t]*=/', $line) !== 1) {
                continue;
            }

            $declaresKey = true;

            if (preg_match('/^[ \t]*APP_KEY[ \t]*=[ \t]*[\'"]?base64:[A-Za-z0-9+\/=]+[\'"]?[ \t]*$/', $line) === 1) {
                break;
            }

            $lines[$index] = 'APP_KEY='.$freshKey;
            @file_put_contents($envPath, implode("\n", $lines));

            break;
        }

        if (! $declaresKey) {
            @file_put_contents($envPath, rtrim($env, "\r\n")."\n\nAPP_KEY=".$freshKey."\n");
        }
    }
}

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->redirectGuestsTo(fn() => route('login.index'));

        // Trust proxies - must run early to detect HTTPS correctly.
        //
        // This previously read `trustProxies(at: 0)`. `at()` is typed
        // array|string, so 0 was coerced to the string "0" — which is falsy
        // in PHP, so the call did nothing at all. Proxies were never trusted:
        // behind nginx or a CDN every request looked like plain HTTP, and
        // scheme detection silently did the wrong thing. Registering the
        // application's own TrustProxies makes its TRUSTED_PROXIES env var
        // and its Docker/cloud auto-detection actually take effect. It is
        // prepended so it runs before anything that reads the scheme, and
        // before session cookie security flags are decided.
        $middleware->prependToGroup('web', TrustProxies::class);

        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            InstalledRoutes::class,
            EnsureDatabase::class,
            AppConfig::class,
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->preventRequestsDuringMaintenance(except: [
            'system/*',
            'install/refresh',
        ]);

        $middleware->alias([
            'role' => UserRole::class,
            'authConfig' => AuthConfig::class,
            'smtpConfig' => SmtpConfig::class,
            'customize' => IntroCustomize::class,
            'collaborative' => SystemCollaborative::class,
            'ip.detector' => IpDetectorMiddleware::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->renderable(function (Throwable $e, $request) {
            // The database is unreachable and this is not an installer request,
            // so the installer is the one screen that can fix it. Exactly one
            // hop is allowed, though: `claimInstallerRedirect()` hands out that
            // single redirect and refuses every later attempt, so an installer
            // that is itself broken renders its real error instead of being
            // redirected to again until the browser reports
            // ERR_TOO_MANY_REDIRECTS. JSON callers and the health probe get no
            // redirect at all, and a build with the Installer module disabled
            // has no route to redirect to, so both fall through to the normal
            // error rendering.
            if (
                ! isDBConnected()
                && ! isInstallerRequest($request)
                && ! $request->expectsJson()
                && Route::has('install.index')
                && $request->route() !== null
                && claimInstallerRedirect($request)
            ) {
                return redirect()->route('install.index');
            }

            if ($request->is('dashboard/uploads/chunked/*')) {
                return null;
            }

            // The maintenance/updater area must always be reachable, including
            // when something on it is broken — that's precisely when an admin
            // needs it most. `back()` below redirects to the page the request
            // came from, which on a broken /system/* page makes it look like
            // the page silently refuses to load. Let the exception render
            // normally here instead, so the actual error is visible.
            if ($request->is('system*')) {
                return null;
            }

            if (
                $e instanceof ValidationException
                || $e instanceof AuthenticationException
                || $e instanceof AuthorizationException
                || $e instanceof ModelNotFoundException
                || $e instanceof HttpExceptionInterface
            ) {
                return null;
            }

            if (canReturnToPreviousPage($request)) {
                return back()->with('error', $e->getMessage());
            }

            // There is no safe previous page. Sending the visitor to the home
            // page is only safe when the home page is not what just failed —
            // otherwise this is the same `/` -> `/` -> ... loop in a different
            // place. With no safe destination left, the error is the useful
            // output, so render it.
            if ($request->routeIs('home')) {
                return null;
            }

            return redirect()->route('home')->with('error', $e->getMessage());
        });
    })->create();
