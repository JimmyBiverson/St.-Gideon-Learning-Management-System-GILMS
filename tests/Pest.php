<?php

use App\Models\Setting;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

/*
|--------------------------------------------------------------------------
| Test Case
|--------------------------------------------------------------------------
|
| The closure you provide to your test functions is always bound to a specific PHPUnit test
| case class. By default, that class is "PHPUnit\Framework\TestCase". Of course, you may
| need to change it using the "pest()" function to bind a different classes or traits.
|
*/

pest()->extend(TestCase::class)
 // ->use(RefreshDatabase::class)
    ->in('Feature');

pest()->extend(TestCase::class)
    ->in('../Modules/AIAssistant/tests/Feature');

/*
|--------------------------------------------------------------------------
| Expectations
|--------------------------------------------------------------------------
|
| When you're writing tests, you often need to check that values meet certain conditions. The
| "expect()" function gives you access to a set of "expectations" methods that you can use
| to assert different things. Of course, you may extend the Expectation API at any time.
|
*/

expect()->extend('toBeOne', function () {
    return $this->toBe(1);
});

/*
|--------------------------------------------------------------------------
| Functions
|--------------------------------------------------------------------------
|
| While Pest is very powerful out-of-the-box, you may have some testing code specific to your
| project that you don't want to repeat in every file. Here you can also expose helpers as
| global functions to help you to reduce the number of lines of code in your test files.
|
*/

function validAiAssistantSettingsPayload(array $overrides = []): array
{
    return array_merge([
        'token_limit' => 100_000,
        'reset_period' => 'monthly',
        'provider' => 'openrouter',
        'model' => 'openai/gpt-4o-mini',
        'api_key' => 'sk-or-v1-test'.str_repeat('a', 40),
    ], $overrides);
}

/**
 * @param  array<string, mixed>  $fieldOverrides
 */
function seedAiAssistantSetting(array $fieldOverrides = []): Setting
{
    return Setting::query()->updateOrCreate(
        ['type' => 'ai_assistant', 'sub_type' => null],
        [
            'title' => 'AI Assistant Settings',
            'fields' => array_merge([
                'token_limit' => 100_000,
                'reset_period' => 'monthly',
                'provider' => null,
                'model' => null,
                'api_key' => null,
                'is_active' => false,
                'restricted_instructor_ids' => [],
            ], $fieldOverrides),
        ],
    );
}

/**
 * @param  array<string, mixed>  $fieldOverrides
 */
function seedMetaPixelSetting(array $fieldOverrides = []): Setting
{
    return Setting::query()->updateOrCreate(
        ['type' => 'meta_pixel', 'sub_type' => null],
        [
            'title' => 'Meta Pixel Settings',
            'fields' => array_merge([
                'pixel_enabled' => false,
                'pixel_id' => '',
                'capi_enabled' => false,
                'access_token' => '',
                'test_event_code' => '',
            ], $fieldOverrides),
        ],
    );
}

/**
 * @param  array<string, mixed>  $fieldOverrides
 */
function seedGoogleAnalyticsSetting(array $fieldOverrides = []): Setting
{
    return Setting::query()->updateOrCreate(
        ['type' => 'google_analytics', 'sub_type' => null],
        [
            'title' => 'Google Analytics Settings',
            'fields' => array_merge([
                'analytics_enabled' => false,
                'measurement_id' => '',
                'mp_enabled' => false,
                'api_secret' => '',
                'debug_mode' => false,
            ], $fieldOverrides),
        ],
    );
}
