<?php

namespace App\Http\Controllers\Auth;

use App\Enums\UserType;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\AuthService;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    public function __construct(public AuthService $authService) {}

    /**
     * Show the google sighup/login form.
     */
    public function show(Request $request)
    {
        session()->put('from', $request->from);

        return Socialite::driver('google')->redirect();
    }

    /**
     * Back to the specific route after login.
     */
    public function callback(Request $request)
    {
        $from = session()->get('from');

        try {
            $user = Socialite::driver('google')->user();
            $registered = User::where('google_id', $user->id)->orWhere('email', $user->email)->first();

            if ($registered) {
                // Update existing user's tokens
                $this->authService->updateGoogleTokens($registered, $user);
                Auth::login($registered, true);
            } else {
                $registered = $this->authService->googleAuthRegister($user);

                event(new Registered($registered));

                $this->authService->trackCompleteRegistration($registered, $request, 'google');

                Auth::login($registered, true);
            }

            if ($registered->role === UserType::STUDENT->value) {
                if ($from && $from == 'api') {
                    session()->forget('from');

                    return redirectIntended(config('app.frontend_url').'/student');
                } else {
                    return redirectIntended(route('student.index', ['tab' => 'courses'], absolute: false));
                }
            } else {
                if ($from && $from == 'api') {
                    session()->forget('from');

                    return redirectIntended(config('app.frontend_url').'/dashboard');
                } else {
                    return redirectIntended(route('dashboard', absolute: false));
                }
            }
        } catch (\Throwable $th) {
            if ($from && $from == 'api') {
                session()->forget('from');

                return redirectIntended(config('app.frontend_url').'/login');
            } else {
                return redirect()->route('login.index')->with('error', $th->getMessage());
            }
        }
    }
}
