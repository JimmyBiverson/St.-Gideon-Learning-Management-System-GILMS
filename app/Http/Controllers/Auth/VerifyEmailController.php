<?php

namespace App\Http\Controllers\Auth;

use App\Enums\UserType;
use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): SymfonyResponse
    {
        $adminDashboard = route('dashboard', absolute: false).'?verified=1';
        $studentDashboard = route('student.index', ['tab' => 'courses'], absolute: false).'?verified=1';

        if ($request->user()->hasVerifiedEmail()) {
            if ($request->user()->role === UserType::STUDENT->value) {
                return redirectIntended($studentDashboard);
            } else {
                return redirectIntended($adminDashboard);
            }
        }

        if ($request->user()->markEmailAsVerified()) {
            /** @var MustVerifyEmail $user */
            $user = $request->user();

            event(new Verified($user));
        }

        if ($request->user()->role === UserType::STUDENT->value) {
            return redirectIntended($studentDashboard);
        } else {
            return redirectIntended($adminDashboard);
        }
    }
}
