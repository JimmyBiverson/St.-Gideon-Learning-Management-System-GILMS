<?php

use App\Http\Middleware\SmtpConfig;
use App\Http\Middleware\SystemCollaborative;
use App\Models\Instructor;
use App\Models\User;
use App\Notifications\InstructorApprovalNotification;
use App\Services\InstructorService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;

uses(RefreshDatabase::class);

beforeEach(function () {
    Notification::fake();
    $this->withoutMiddleware([SmtpConfig::class, SystemCollaborative::class]);
    $this->applicant = User::factory()->create();
    $this->application = Instructor::create([
        'user_id' => $this->applicant->id, 'status' => 'pending',
        'skills' => [], 'biography' => 'Teaching experience', 'resume' => 'resume.pdf', 'designation' => 'Teacher',
    ]);
    $this->applicant->update(['instructor_id' => $this->application->id]);
});

it('rejects applications submitted for another account', function () {
    $this->actingAs(User::factory()->create())->postJson(route('become-instructor.store'), ['user_id' => $this->applicant->id])
        ->assertForbidden();
});

it('rejects changes to another applicants profile', function () {
    $this->actingAs(User::factory()->create())->postJson(route('become-instructor.update', $this->application->id), [])
        ->assertForbidden();
});

it('approves once and records reviewer context', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $this->actingAs($admin);
    $service = app(InstructorService::class);
    $service->decideApplication(['status' => 'approved'], (string) $this->application->id);
    $service->decideApplication(['status' => 'approved'], (string) $this->application->id);

    expect($this->applicant->fresh()->role)->toBe('instructor');
    Notification::assertSentToTimes($this->applicant, InstructorApprovalNotification::class, 1);
    Notification::assertSentTo($this->applicant, InstructorApprovalNotification::class, function ($notification) use ($admin) {
        $data = $notification->toArray($this->applicant->fresh());

        return $data['reviewer_id'] === $admin->id && $data['previous_status'] === 'pending';
    });
});

it('allows a rejection without feedback', function () {
    $this->actingAs(User::factory()->create(['role' => 'admin']))
        ->putJson(route('instructors.status', $this->application->id), ['status' => 'rejected'])
        ->assertRedirect()->assertSessionHasNoErrors();

    expect($this->application->fresh()->status)->toBe('rejected');
    Notification::assertSentToTimes($this->applicant, InstructorApprovalNotification::class, 1);
});

it('does not reopen an approved application when its owner updates a profile', function () {
    $this->application->update(['status' => 'approved']);
    $this->actingAs($this->applicant);
    app(InstructorService::class)->updateInstructor(['biography' => 'Updated teaching experience'], (string) $this->application->id);

    expect($this->application->fresh()->status)->toBe('approved');
    Notification::assertNothingSent();
});

it('prevents duplicate applications before modifying files or records', function () {
    $this->actingAs($this->applicant);
    expect(fn () => app(InstructorService::class)->createInstructor(['user_id' => $this->applicant->id]))
        ->toThrow(ValidationException::class);

    expect(Instructor::where('user_id', $this->applicant->id)->count())->toBe(1);
});

it('does not permit applicants to decide applications', function () {
    $this->actingAs($this->applicant);
    expect(fn () => app(InstructorService::class)->decideApplication(['status' => 'approved'], (string) $this->application->id))
        ->toThrow(HttpException::class);
    expect($this->application->fresh()->status)->toBe('pending');
});
