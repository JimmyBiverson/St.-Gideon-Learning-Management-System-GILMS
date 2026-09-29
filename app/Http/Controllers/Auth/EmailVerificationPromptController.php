<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class EmailVerificationPromptController extends Controller
{
    /**
     * Show the email verification prompt page.
     */
    public function __invoke(Request $request): Response|SymfonyResponse
    {
        return $request->user()->hasVerifiedEmail()
            ? redirectIntended(route('dashboard', absolute: false))
            : Inertia::render('auth/verify-email', ['status' => $request->session()->get('status')]);
    }
}
