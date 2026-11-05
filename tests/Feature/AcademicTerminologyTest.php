<?php

use App\Models\Setting;
use App\Models\User;
use App\Services\AcademicTerminology;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('defaults to school terminology', function () {
    expect(app(AcademicTerminology::class)->labels())->toBe(['singular' => 'Subject', 'plural' => 'Subjects']);
});

it('persists terminology and invalidates cached labels without changing other settings', function (string $singular, string $plural) {
    $branding = Setting::create(['type' => 'system', 'title' => 'System', 'fields' => ['name' => 'My School']]);
    $service = app(AcademicTerminology::class);
    $service->labels();
    $service->save(compact('singular', 'plural'));

    expect($service->labels())->toBe(compact('singular', 'plural'))
        ->and($service->text('Add Subject; view courses; SUBJECTS'))->toBe('Add '.$singular.'; view '.strtolower($plural).'; '.strtoupper($plural))
        ->and($branding->fresh()->fields)->toBe(['name' => 'My School']);
})->with([
    ['Subject', 'Subjects'], ['Course', 'Courses'], ['Module', 'Modules'], ['Unit', 'Units'], ['Learning Path', 'Learning Paths'],
]);

it('changes only academic translation labels', function () {
    $service = app(AcademicTerminology::class);
    $service->save(['singular' => 'Module', 'plural' => 'Modules']);

    expect($service->translations(['course_title' => 'Subject title', 'email_subject' => 'Email subject', 'name' => 'Subject Smith']))
        ->toBe(['course_title' => 'Module title', 'email_subject' => 'Email subject', 'name' => 'Subject Smith']);
});

it('allows administrators to save terminology', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $this->actingAs($admin)->put(route('academic-terminology.update'), ['singular' => 'Unit', 'plural' => 'Units'])
        ->assertRedirect()->assertSessionHasNoErrors();

    expect(app(AcademicTerminology::class)->label(true))->toBe('Units');
});

it('rejects invalid terminology', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $this->actingAs($admin)->putJson(route('academic-terminology.update'), ['singular' => '<script>', 'plural' => ''])
        ->assertUnprocessable()->assertJsonValidationErrors(['singular', 'plural']);
});

it('does not allow students to change terminology', function () {
    $this->actingAs(User::factory()->create())->put(route('academic-terminology.update'), ['singular' => 'Unit', 'plural' => 'Units']);

    expect(Setting::where('type', 'academic_terminology')->exists())->toBeFalse();
});
