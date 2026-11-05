<?php

use App\Http\Middleware\AuthConfig;
use App\Http\Middleware\SmtpConfig;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use App\Services\AuthService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

uses(RefreshDatabase::class);

it('does not expose the recaptcha secret', function () {
    config(['captcha.status' => true, 'captcha.sitekey' => 'public-key', 'captcha.secret' => 'private-key']);
    expect(app(AuthService::class)->recaptchaStatus())->toBe(['status' => true, 'siteKey' => 'public-key']);
});

it('creates unique unpredictable local passwords for google sign ins', function () {
    $service = app(AuthService::class);
    $first = $service->googleAuthRegister((object) ['id' => 'google-1', 'name' => 'One', 'email' => 'one@example.test', 'avatar' => null]);
    $second = $service->googleAuthRegister((object) ['id' => 'google-2', 'name' => 'Two', 'email' => 'two@example.test', 'avatar' => null]);

    expect(Hash::check('googleauth', $first->password))->toBeFalse()
        ->and($first->password)->not->toBe($second->password);
});

it('blocks the legacy shared password on existing google accounts', function () {
    $user = User::factory()->create(['google_id' => 'legacy-google', 'password' => Hash::make('googleauth')]);
    $request = LoginRequest::create('/login', 'POST', ['email' => $user->email, 'password' => 'googleauth']);
    $request->setContainer(app());

    expect(fn () => $request->authenticate())->toThrow(ValidationException::class);
    $this->assertGuest();
});

it('does not let the login form disable configured captcha', function () {
    config(['captcha.status' => true, 'captcha.sitekey' => 'public', 'captcha.secret' => 'secret']);
    $request = new LoginRequest;
    $validation = Validator::make(['email' => 'a@example.test', 'password' => 'password', 'recaptcha_status' => false], $request->rules());

    expect($validation->fails())->toBeTrue()->and($validation->errors()->has('recaptcha'))->toBeTrue();
});

it('does not let registration disable configured captcha', function () {
    $this->withoutMiddleware([AuthConfig::class, SmtpConfig::class]);
    config(['captcha.status' => true, 'captcha.sitekey' => 'public', 'captcha.secret' => 'secret']);
    $this->postJson(route('register.store'), [
        'name' => 'Student', 'email' => 'student@example.test', 'password' => 'secure-password',
        'password_confirmation' => 'secure-password', 'recaptcha_status' => false,
    ])->assertUnprocessable()->assertJsonValidationErrors('recaptcha');
    expect(User::where('email', 'student@example.test')->exists())->toBeFalse();
});

it('hides oauth credentials when serializing users', function () {
    $user = new User;
    $user->setRawAttributes(['name' => 'Student', 'google_access_token' => 'private', 'google_refresh_token' => 'private']);
    expect($user->toArray())->toBe(['name' => 'Student']);
});
