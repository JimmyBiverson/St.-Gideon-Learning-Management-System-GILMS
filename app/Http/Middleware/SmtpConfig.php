<?php

namespace App\Http\Middleware;

use App\Services\SettingsService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SmtpConfig
{
    public function __construct(private SettingsService $settingsService) {}

    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $smtp = $this->settingsService->getSetting(['type' => 'smtp'])['fields'];

        // SMTP configuration
        config([
            'mail.default' => $smtp['mail_mailer'],
            'mail.mailers.smtp.host' => $smtp['mail_host'],
            'mail.mailers.smtp.port' => intval($smtp['mail_port']),
            'mail.mailers.smtp.encryption' => $smtp['mail_encryption'],
            'mail.mailers.smtp.username' => $smtp['mail_username'],
            'mail.mailers.smtp.password' => $smtp['mail_password'],
            'mail.mailers.smtp.timeout' => null,
            // 'mail.mailers.smtp.local_domain' => $_SERVER['SERVER_NAME'],
            'mail.from.name' => $smtp['mail_from_name'],
            'mail.from.address' => $smtp['mail_from_address'],
        ]);

        // Check SMTP configuration from config
        if (config('mail.default') === 'smtp') {
            // Check if required SMTP credentials exist in config
            if (
                empty(config('mail.mailers.smtp.host')) ||
                empty(config('mail.mailers.smtp.port')) ||
                empty(config('mail.mailers.smtp.username')) ||
                empty(config('mail.mailers.smtp.password'))
            ) {
                $message = 'SMTP configuration is incomplete, so email sending is not working right now.';

                /*
                 * `back()` is only safe when it provably lands somewhere else.
                 * These routes are reached by reloading the page, and a reload
                 * sends the page's own URL as Referer, so a bare `back()`
                 * returned the browser to the form that had just refused it and
                 * repeated until ERR_TOO_MANY_REDIRECTS. Without SMTP working,
                 * that is every login, register and password-reset screen — the
                 * exact pages needed to fix SMTP.
                 *
                 * /login has no `smtpConfig` of its own, but `/register` does, so
                 * `back()` from it is a genuinely different URL. The guard covers
                 * both without having to reason about which is which.
                 */
                if (canReturnToPreviousPage($request)) {
                    return back()->with('error', $message);
                }

                return redirect()->to(roleLandingUrl($request->user()))->with('error', $message);
            }
        }

        return $next($request);
    }
}
