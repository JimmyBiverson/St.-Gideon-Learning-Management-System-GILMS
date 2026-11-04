<?php

use Illuminate\Support\Facades\Mail;

function smtpTestSettings(string $driver = 'array'): array
{
    return [
        'mail_mailer' => $driver,
        'mail_host' => 'smtp.example.test',
        'mail_port' => 465,
        'mail_encryption' => 'ssl',
        'mail_from_address' => 'school@example.test',
        'mail_from_name' => 'Test School',
    ];
}

it('restores the original mail configuration after a successful test', function () {
    $original = config('mail');

    expect(testSmtpConnection(smtpTestSettings()))->toBeTrue()
        ->and(config('mail'))->toBe($original);
});

it('restores the original mail configuration when sending fails', function () {
    $original = config('mail');
    Mail::shouldReceive('raw')->once()->andThrow(new RuntimeException('Transport failed'));
    Mail::shouldReceive('forgetMailers')->twice();

    expect(fn () => testSmtpConnection(smtpTestSettings()))
        ->toThrow(RuntimeException::class, 'Transport failed');

    expect(config('mail'))->toBe($original);
});

it('rebuilds cached transports when smtp settings change', function () {
    config(['mail.default' => 'array']);
    $previous = app('mail.manager')->mailer('array');

    setSmtpConfig(smtpTestSettings());

    expect(app('mail.manager')->mailer('array'))->not->toBe($previous)
        ->and(config('mail.mailers.smtp.scheme'))->toBe('smtps')
        ->and(config('mail.mailers.smtp.timeout'))->toBe(15);

    setSmtpConfig([...smtpTestSettings(), 'mail_encryption' => 'tls']);

    expect(config('mail.mailers.smtp.scheme'))->toBe('smtp');
});

it('rejects invalid sender addresses before changing mail configuration', function () {
    $original = config('mail');

    expect(fn () => testSmtpConnection([...smtpTestSettings(), 'mail_from_address' => 'invalid']))
        ->toThrow(Exception::class, 'A valid from email address is required');

    expect(config('mail'))->toBe($original);
});
