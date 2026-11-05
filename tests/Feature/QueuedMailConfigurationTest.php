<?php

use App\Http\Middleware\SmtpConfig;
use App\Models\Setting;
use App\Models\User;
use App\Notifications\ResetPasswordNotification;
use App\Notifications\VerifyEmailNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use Illuminate\Notifications\Events\NotificationSending;
use Illuminate\Support\Facades\Event;

uses(RefreshDatabase::class);

it('loads saved smtp settings for notifications without http middleware', function () {
    Setting::create(['type' => 'smtp', 'title' => 'SMTP', 'fields' => [
        'mail_mailer' => 'array', 'mail_host' => 'saved.example.test', 'mail_port' => 465,
        'mail_encryption' => 'ssl', 'mail_from_address' => 'school@example.test', 'mail_from_name' => 'Our School',
    ]]);
    Event::dispatch(new NotificationSending(new User, new VerifyEmailNotification, 'mail'));

    expect(config('mail.mailers.smtp.host'))->toBe('saved.example.test')
        ->and(config('mail.mailers.smtp.scheme'))->toBe('smtps')
        ->and(config('mail.from.name'))->toBe('Our School');
});

it('queues verification and password reset notifications after commit', function () {
    foreach ([new VerifyEmailNotification, new ResetPasswordNotification('test-token')] as $notification) {
        expect($notification)->toBeInstanceOf(ShouldQueue::class)
            ->and($notification->afterCommit)->toBeTrue()
            ->and($notification->tries)->toBe(3);
    }
});

it('generates a password reset link containing the token and recipient', function () {
    $user = new User(['email' => 'student+school@example.test', 'name' => 'Student']);
    $mail = (new ResetPasswordNotification('safe-token'))->toMail($user);
    parse_str(parse_url($mail->viewData['url'], PHP_URL_QUERY), $parameters);

    expect($parameters['token'])->toBe('safe-token')
        ->and($parameters['email'])->toBe($user->email);
});

it('does not block navigation when smtp credentials are not configured', function () {
    $middleware = app(SmtpConfig::class);
    $response = $middleware->handle(Request::create('/student/courses'), fn () => response('Learning remains available'));

    expect($response->getStatusCode())->toBe(200);

    Setting::create(['type' => 'smtp', 'title' => 'SMTP', 'fields' => [
        'mail_mailer' => 'smtp', 'mail_host' => '', 'mail_port' => 587,
        'mail_from_address' => 'school@example.test',
    ]]);
    $response = $middleware->handle(Request::create('/student/courses'), fn () => response('Learning remains available'));

    expect($response->getStatusCode())->toBe(200);
});
