<?php

use App\Models\User;
use App\Services\AcademicTerminology;
use App\Services\MobileNavigation;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('has distinct navigation for each role', function () {
    $service = app(MobileNavigation::class);
    $admin = $service->forUser(new User(['role' => 'admin']));
    $teacher = $service->forUser(new User(['role' => 'instructor']));
    $student = $service->forUser(new User(['role' => 'student']));

    expect(array_column($admin['items'], 'label'))->toContain('Users')
        ->and(array_column($teacher['items'], 'label'))->toContain('My teaching')->not->toContain('Users')
        ->and(array_column($student['items'], 'label'))->toContain('Profile')->not->toContain('Users')
        ->and(array_column($student['more'], 'label'))->not->toContain('System settings');
});

it('does not expose role navigation to guests or unknown roles', function () {
    expect(app(MobileNavigation::class)->forUser(null)['items'])->toBe([])
        ->and(app(MobileNavigation::class)->forUser(new User(['role' => 'unknown']))['items'])->toBe([]);
});

it('uses the configured academic term in mobile navigation', function () {
    app(AcademicTerminology::class)->save(['singular' => 'Module', 'plural' => 'Modules']);
    $navigation = app(MobileNavigation::class)->forUser(new User(['role' => 'student']));

    expect(array_column($navigation['items'], 'label'))->toContain('Modules');
});
