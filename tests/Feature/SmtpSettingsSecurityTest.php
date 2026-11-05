<?php

use App\Models\Setting;
use App\Models\User;
use App\Services\SettingsService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Mail;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->smtp = Setting::create(['type' => 'smtp', 'title' => 'SMTP', 'fields' => [
        'mail_mailer' => 'array', 'mail_host' => 'smtp.example.test', 'mail_port' => 587,
        'mail_encryption' => 'tls', 'mail_from_address' => 'school@example.test',
        'mail_from_name' => 'School', 'mail_password' => 'private-test-password',
    ]]);
    $this->actingAs(User::factory()->create(['role' => 'admin']));
});

it('never returns the stored smtp password to the settings page', function () {
    $this->get(route('smtp.index'))->assertOk()->assertInertia(fn ($page) => $page
        ->component('dashboard/settings/smtp')->missing('smtp.fields.mail_password'));

    expect($this->smtp->fresh()->fields['mail_password'])->toBe('private-test-password');
});

it('preserves the saved password when the field is left blank', function () {
    app(SettingsService::class)->smtpUpdate([...$this->smtp->fields, 'mail_password' => '', 'mail_from_name' => 'Updated School'], (string) $this->smtp->id);

    expect($this->smtp->fresh()->fields['mail_password'])->toBe('private-test-password')
        ->and($this->smtp->fresh()->fields['mail_from_name'])->toBe('Updated School');
});

it('does not expose transport exception details to the frontend', function () {
    Mail::shouldReceive('forgetMailers')->twice();
    Mail::shouldReceive('raw')->once()->andThrow(new RuntimeException('secret transport diagnostic'));
    $this->post(route('smtp.update', $this->smtp->id), $this->smtp->fields)
        ->assertRedirect()->assertSessionHas('error', 'SMTP test failed. Check the host, port, encryption and credentials. No settings were saved.');
});

it('sends a test without changing saved settings', function () {
    $before = $this->smtp->fields;
    $this->post(route('smtp.test', $this->smtp->id), ['email' => 'recipient@example.test'])
        ->assertRedirect()->assertSessionHas('success');
    expect($this->smtp->fresh()->fields)->toBe($before);
});

it('validates the test recipient', function () {
    $this->postJson(route('smtp.test', $this->smtp->id), ['email' => 'invalid'])
        ->assertUnprocessable()->assertJsonValidationErrors('email');
});
