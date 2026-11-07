<?php

use App\Models\User;
use Database\Seeders\SettingsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('renders the admin workspace with long names and the independent notification feed', function () {
    $this->seed(SettingsSeeder::class);
    $user = User::factory()->create([
        'role' => 'admin',
        'name' => 'Dr. Alexandria '.str_repeat('LongInstitutionAdministratorName', 4),
    ]);
    $response = $this->actingAs($user)->get(route('dashboard'))->assertOk();
    $response->assertInertia(fn ($page) => $page->component('dashboard/index')
        ->where('auth.user.name', $user->name)
        ->has('notificationFeed', 0)
        ->has('mobileNavigation.items', 4));

    if (getenv('GILMS_CAPTURE_LAYOUT') === '1') {
        file_put_contents(sys_get_temp_dir().'/gilms-dashboard-fixture.html', $response->getContent());
    }
});
