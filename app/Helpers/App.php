<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

function isDBConnected(): bool
{
    try {
        DB::connection()->getPdo();

        return true;
    } catch (Exception $e) {
        return false;
    }
}

/**
 * Whether the installer has finished.
 *
 * Single source of truth for install state. Four places used to re-implement
 * this and they disagreed: the installer routes tested
 * `! exists('installed') || ! env('MENTOR_INSTALLED')` — true when *either*
 * marker was missing, so it forced file sessions on nearly every install —
 * while the middleware tested the correct `||`. Middleware that disagree about
 * whether the app is installed redirect in opposite directions, and opposing
 * redirects on `/` and `/install/step-1` are exactly what a browser reports as
 * ERR_TOO_MANY_REDIRECTS.
 *
 * `MENTOR_INSTALLED` is compared as a boolean rather than tested for
 * truthiness, because the string "false" is truthy in PHP and would mark a
 * site installed that the installer never completed.
 */
function applicationInstalled(): bool
{
    if (filter_var(env('MENTOR_INSTALLED'), FILTER_VALIDATE_BOOLEAN)) {
        return true;
    }

    try {
        return Storage::disk('public')->exists('installed');
    } catch (Throwable) {
        // An unreadable or misconfigured disk is not proof that the site is
        // uninstalled. Reporting "not installed" only ever shows the
        // installer, which is the recoverable direction; reporting "installed"
        // would hide a site that genuinely has nothing to run against.
        return false;
    }
}

function isInstallerRequest(Request $request): bool
{
    return $request->is('install', 'install/*');
}

/**
 * Decide whether redirecting the visitor back to the page they came from is
 * safe, or whether it risks bouncing them straight back into the failure.
 *
 * `back()` resolves, in order: the Referer header, then the session's previous
 * URL, then `/`. That last fallback is the trap. On a GET with no Referer it
 * sends the browser to the home page — very often the page that just failed —
 * and the pair repeats until the browser gives up with
 * ERR_TOO_MANY_REDIRECTS, which hides the error that actually needed fixing.
 *
 * So `back()` is allowed only when it provably lands somewhere else:
 * non-GET requests (a failed form submission belongs on its own form), and
 * GET requests whose Referer is a same-origin page other than this one.
 */
function canReturnToPreviousPage(Request $request): bool
{
    if (! $request->isMethod('GET') && ! $request->isMethod('HEAD')) {
        return true;
    }

    $referer = $request->headers->get('referer');

    if (! is_string($referer) || $referer === '') {
        return false;
    }

    $parts = parse_url($referer);

    // A Referer without a host, or one pointing at another origin, is never a
    // safe place to bounce an error message to. `getHost()` only honours
    // X-Forwarded-Host from proxies we actually trust, so an untrusted client
    // cannot use this to steer the redirect elsewhere.
    if (! isset($parts['host']) || strcasecmp($parts['host'], $request->getHost()) !== 0) {
        return false;
    }

    $refererPath = $parts['path'] ?? '/';

    return rtrim($refererPath, '/') !== rtrim('/'.$request->path(), '/');
}

/**
 * Claim the single hop that is allowed between the application and the
 * installer, and report whether the caller is the one taking it.
 *
 * The installer is the only screen that can repair an unreachable database, so
 * redirecting there is right. Doing it unconditionally is not: the installer
 * can fail for reasons entirely of its own — no APP_KEY yet, sessions on a
 * database that is not there yet — and the exception handler would redirect
 * again. Bounded to one attempt, the second failure simply renders the real
 * error, which is something an admin can act on.
 *
 * Returns true only for the request that actually performs the redirect. When
 * no session is available the claim cannot be recorded, so no redirect is
 * performed at all: an untrackable redirect is an unbounded one.
 */
function claimInstallerRedirect(Request $request): bool
{
    if (! $request->hasSession()) {
        return false;
    }

    $session = $request->session();

    if ($session->get('installer_redirect_attempted')) {
        return false;
    }

    $session->put('installer_redirect_attempted', true);

    return true;
}

function setSmtpConfig(array $config)
{
    config([
        'mail.default' => $config['mail_mailer'] ?? 'smtp',
        'mail.mailers.smtp.host' => $config['mail_host'] ?? '',
        'mail.mailers.smtp.port' => $config['mail_port'] ?? '',
        'mail.mailers.smtp.encryption' => $config['mail_encryption'] ?? '',
        'mail.mailers.smtp.username' => $config['mail_username'] ?? null,
        'mail.mailers.smtp.password' => $config['mail_password'] ?? null,
        'mail.from.address' => $config['mail_from_address'],
        'mail.from.name' => $config['mail_from_name'] ?? 'System',
    ]);
}

function testSmtpConnection(array $config)
{
    // Basic validation
    if (empty($config['mail_from_address']) || ! filter_var($config['mail_from_address'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception('A valid from email address is required');
    }

    // Set mail config temporarily
    $previousConfig = config('mail');

    // Configure mail with test settings
    setSmtpConfig($config);

    // Send a test email to the admin email
    $subject = 'SMTP Test Email';
    $body = 'This is a test email to verify your SMTP settings. If you received this email, your SMTP configuration is working correctly.';
    $recipient = $config['mail_from_address'];

    Mail::raw($body, function ($message) use ($recipient, $subject) {
        $message->to($recipient)->subject($subject);
    });

    // Reset config
    config(['mail' => $previousConfig]);

    return true;
}

function setPaypalConfig(array $config, string $mode = 'sandbox')
{
    config(['paypal.mode' => $mode]); // Can only be 'sandbox' Or 'live'. If empty or invalid, 'live' will be used.
    config(['paypal.sandbox.client_id' => $config['sandbox_client_id']]);
    config(['paypal.sandbox.client_secret' => $config['sandbox_secret_key']]);
    config(['paypal.live.client_id' => $config['production_client_id']]);
    config(['paypal.live.client_secret' => $config['production_secret_key']]);

    $config = [
        'mode' => $mode, // Can only be 'sandbox' Or 'live'. If empty or invalid, 'live' will be used.
        'sandbox' => [
            'client_id' => $config['sandbox_client_id'],
            'client_secret' => $config['sandbox_secret_key'],
            'app_id' => 'APP-80W284485P519543T',
        ],
        'live' => [
            'client_id' => $config['production_client_id'],
            'client_secret' => $config['production_secret_key'],
            'app_id' => '',
        ],
        'payment_action' => 'Sale', // Can only be 'Sale', 'Authorization' or 'Order'
        'currency' => 'USD',
        'notify_url' => '', // Change this accordingly for your application.
        'locale' => 'en_US', // force gateway language  i.e. it_IT, es_ES, en_US ... (for express checkout only)
        'validate_ssl' => true, // Validate SSL when creating api client.
    ];

    return $config;
}

function apiResponse(array $data = [], array $flash = [], int $status = 200)
{
    return response()->json([
        'data' => $data,
        'flash' => $flash,
    ], $status);
}
