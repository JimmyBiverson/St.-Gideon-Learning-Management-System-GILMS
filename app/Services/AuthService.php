<?php

namespace App\Services;

use App\Enums\UserType;
use App\Jobs\SendGoogleAnalyticsEvent;
use App\Jobs\SendMetaCapiEvent;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    public function __construct(private readonly GoogleAnalyticsService $googleAnalytics) {}

    public function recaptchaStatus()
    {
        $recaptchaStatus = false;
        $status = config('captcha.status');
        $siteKey = config('captcha.sitekey');
        $secretKey = config('captcha.secret');

        if ($status && $siteKey && $secretKey) {
            $recaptchaStatus = true;
        }

        return [
            'status' => $recaptchaStatus,
            'siteKey' => $siteKey,
            'secretKey' => $secretKey,
        ];
    }

    public function googleAuthStatus()
    {
        $authStatus = false;
        $googleStatus = config('services.google.status');
        $clientID = config('services.google.client_id');
        $clientSecret = config('services.google.client_secret');
        $redirectURI = config('services.google.redirect');

        if ($googleStatus && ! empty($clientID) && ! empty($clientSecret) && ! empty($redirectURI)) {
            $authStatus = true;
        }

        return [
            'authStatus' => $authStatus,
            'clientID' => $clientID,
            'clientSecret' => $clientSecret,
            'redirectURI' => $redirectURI,
        ];
    }

    public function googleAuthRegister(object $user): User
    {
        return DB::transaction(function () use ($user) {
            $userData = [
                'name' => $user->name,
                'email' => $user->email,
                'photo' => $user->avatar,
                'role' => UserType::STUDENT->value,
                'email_verified_at' => now(),
                'google_id' => $user->id,
                'password' => Hash::make('googleauth'),
            ];

            // Add OAuth tokens if available
            if (isset($user->token)) {
                $userData['google_access_token'] = $user->token;

                if (isset($user->refreshToken)) {
                    $userData['google_refresh_token'] = $user->refreshToken;
                }

                if (isset($user->expiresIn)) {
                    $userData['google_token_expires_in'] = now()->addSeconds($user->expiresIn);
                }
            }

            $newUser = User::create($userData);

            return $newUser;
        }, 5);
    }

    /**
     * Update Google OAuth tokens for existing user
     */
    public function updateGoogleTokens(User $existingUser, object $googleUser): void
    {
        $updateData = [];

        if (isset($googleUser->token)) {
            $updateData['google_access_token'] = $googleUser->token;
        }

        if (isset($googleUser->refreshToken)) {
            $updateData['google_refresh_token'] = $googleUser->refreshToken;
        }

        if (isset($googleUser->expiresIn)) {
            $updateData['google_token_expires_in'] = now()->addSeconds($googleUser->expiresIn);
        }

        if (! empty($updateData)) {
            $existingUser->update($updateData);
        }
    }

    /**
     * Fire the Meta Pixel/CAPI "CompleteRegistration" event for a newly
     * registered user: flashes the event to the browser pixel and
     * dispatches the server-side Conversions API job with the same
     * event_id so Meta de-duplicates the two.
     */
    public function trackCompleteRegistration(User $user, Request $request, ?string $provider = null): void
    {
        $eventId = 'reg_'.$user->id;

        $request->session()->flash('metaPixelEvent', [
            'event' => 'CompleteRegistration',
            'event_id' => $eventId,
        ]);

        SendMetaCapiEvent::dispatch(
            'CompleteRegistration',
            $eventId,
            [
                'email' => $user->email,
                'external_id' => (string) $user->id,
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'fbc' => $request->cookie('_fbc'),
                'fbp' => $request->cookie('_fbp'),
            ],
            array_filter(['status' => 'success', 'provider' => $provider]),
            $request->headers->get('referer'),
        );

        $this->trackGoogleSignUp($user, $request, $provider);
    }

    /**
     * Fire the Google Analytics "sign_up" event. When the Measurement
     * Protocol is enabled it's sent server-side only (GA4 has no built-in
     * dedup for sign_up like it does for purchase by transaction_id), so
     * the browser only fires it as a fallback when MP is off.
     */
    private function trackGoogleSignUp(User $user, Request $request, ?string $provider): void
    {
        if ($this->googleAnalytics->isMpEnabled()) {
            SendGoogleAnalyticsEvent::dispatch(
                'sign_up',
                $this->googleAnalytics->extractClientIdFromCookie($request->cookie('_ga')),
                (string) $user->id,
                array_filter(['method' => $provider ?? 'email']),
            );

            return;
        }

        if ($this->googleAnalytics->isAnalyticsEnabled()) {
            $request->session()->flash('googleAnalyticsEvent', [
                'event' => 'sign_up',
            ]);
        }
    }
}
