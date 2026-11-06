<?php

use App\Models\Setting;
use App\Services\BrandingService;
use App\Services\SettingsService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

uses(RefreshDatabase::class);

it('resolves uploaded branding on the current host after deployment', function () {
    Storage::fake('public');
    Storage::disk('public')->put('42/logo.png', 'image');
    $url = app(BrandingService::class)->url('http://localhost:8000/storage/42/logo.png');
    expect($url)->toStartWith(asset('storage/42/logo.png').'?v=');
});

it('preserves external branding URLs', function () {
    Storage::fake('public');
    expect(app(BrandingService::class)->url('https://cdn.example.com/logo.png'))->toBe('https://cdn.example.com/logo.png');
});

it('updates uploaded branding without dropping other settings or serializing files', function () {
    Storage::fake('public');
    config(['media-library.disk_name' => 'public']);
    $setting = Setting::create(['type' => 'system', 'title' => 'System', 'fields' => ['name' => 'My School', 'logo_light' => '/light.png']]);
    app()->instance('system', $setting);
    app(SettingsService::class)->systemUpdate([
        'new_logo_dark' => UploadedFile::fake()->image('logo.png'),
        'new_favicon' => UploadedFile::fake()->image('icon.png'),
        '_method' => 'PUT',
    ], (string) $setting->id);
    $fields = $setting->fresh()->fields;
    expect($fields['name'])->toBe('My School')
        ->and($fields['logo_light'])->toBe('/light.png')
        ->and($fields)->not->toHaveKeys(['new_logo_dark', 'new_favicon', '_method'])
        ->and(app()->resolved('system'))->toBeFalse();
    foreach ($setting->fresh()->getMedia() as $media) {
        Storage::disk('public')->assertExists($media->getPathRelativeToRoot());
    }
});
