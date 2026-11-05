<?php

use App\Models\Instructor;
use App\Models\User;
use App\Services\AcademicTerminology;
use App\Services\DashboardService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Modules\Course\Models\Course;
use Modules\Course\Models\CourseCategory;
use Modules\Course\Notifications\CourseApprovalNotification;

uses(RefreshDatabase::class);

beforeEach(function () {
    $owner = User::factory()->create(['role' => 'instructor']);
    $this->teacher = Instructor::create([
        'user_id' => $owner->id, 'status' => 'pending', 'skills' => [],
        'biography' => 'Teaching', 'resume' => 'resume.pdf', 'designation' => 'Teacher',
    ]);
    $category = CourseCategory::create(['title' => 'Learning', 'slug' => 'learning']);
    $this->course = Course::create([
        'title' => 'Original Academic Record', 'slug' => 'original', 'short_description' => 'Learning',
        'level' => 'beginner', 'language' => 'en', 'pricing_type' => 'free', 'status' => 'draft',
        'expiry_type' => 'lifetime', 'drip_content' => false, 'user_id' => $owner->id,
        'instructor_id' => $this->teacher->id, 'course_category_id' => $category->id, 'course_type' => 'general',
    ]);
});

it('shows real admin counts and a complete empty revenue series', function () {
    $admin = User::factory()->create(['role' => 'admin']);
    $this->actingAs($admin);
    $dashboard = app(DashboardService::class)->getDashboard($admin, 2026);

    expect($dashboard['statistics']['courses'])->toBe(1)
        ->and($dashboard['statistics']['pendingApplications'])->toBe(1)
        ->and($dashboard['revenueData'])->toHaveCount(12)
        ->and(array_sum($dashboard['revenueData']))->toBe(0);
});

it('does not expose institution counts to an instructor without a profile', function () {
    $teacher = User::factory()->create(['role' => 'instructor', 'instructor_id' => null]);
    $this->actingAs($teacher);
    $dashboard = app(DashboardService::class)->getDashboard($teacher, 2026);

    expect($dashboard['statistics']['courses'])->toBe(0)
        ->and($dashboard['statistics']['pendingApplications'])->toBe(0)
        ->and(array_sum($dashboard['courseStatusDistribution']))->toBe(0);
});

it('preserves academic records when terminology changes', function () {
    $before = $this->course->fresh()->getAttributes();
    app(AcademicTerminology::class)->save(['singular' => 'Module', 'plural' => 'Modules']);

    expect($this->course->fresh()->getAttributes())->toBe($before);
});

it('renders academic terminology in approval email without renaming the record', function () {
    app(AcademicTerminology::class)->save(['singular' => 'Unit', 'plural' => 'Units']);
    $user = User::factory()->create();
    $notification = new CourseApprovalNotification($this->course, ['status' => 'approved']);
    $mail = $notification->toMail($user);
    $html = view($mail->view, $mail->viewData)->render();

    expect($mail->subject)->toBe('Unit Approval Status Update')
        ->and($html)->toContain('View Unit', 'Your unit', 'Original Academic Record');
});
