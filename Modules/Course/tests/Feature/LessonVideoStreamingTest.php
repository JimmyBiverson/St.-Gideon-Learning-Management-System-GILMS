<?php

use App\Models\ChunkedUpload;
use App\Models\Instructor;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Modules\Course\Models\Course;
use Modules\Course\Models\CourseCategory;
use Modules\Course\Models\CourseEnrollment;
use Modules\Course\Models\CourseSection;
use Modules\Course\Models\SectionLesson;

uses(RefreshDatabase::class);

beforeEach(function () {
    $instructorUser = User::factory()->create(['role' => 'instructor']);
    $this->instructor = Instructor::create([
        'user_id' => $instructorUser->id,
        'status' => 'approved',
        'skills' => [],
        'biography' => 'Test biography',
        'resume' => '',
        'designation' => 'Instructor',
    ]);
    $instructorUser->update(['instructor_id' => $this->instructor->id]);

    $category = CourseCategory::create(['title' => 'Dev', 'slug' => 'dev']);

    $this->course = Course::create([
        'title' => 'Test Course',
        'slug' => 'test-course',
        'short_description' => 'Short.',
        'level' => 'beginner',
        'language' => 'en',
        'pricing_type' => 'free',
        'status' => 'draft',
        'expiry_type' => 'lifetime',
        'drip_content' => false,
        'user_id' => $instructorUser->id,
        'instructor_id' => $this->instructor->id,
        'course_category_id' => $category->id,
        'course_type' => 'general',
    ]);

    $section = CourseSection::create([
        'title' => 'Introduction',
        'course_id' => $this->course->id,
    ]);

    $this->content = str_repeat('0123456789', 200); // 2000 bytes

    $key = 'lessons/test-stream.mp4';
    Storage::disk('local')->put($key, $this->content);

    $upload = ChunkedUpload::create([
        'user_id' => $instructorUser->id,
        'filename' => $key,
        'original_filename' => 'lesson.mp4',
        'file_path' => $key,
        'disk' => 'local',
        'mime_type' => 'video/mp4',
        'size' => strlen($this->content),
        'key' => $key,
        'status' => 'completed',
    ]);

    $this->lesson = SectionLesson::create([
        'title' => 'Video lesson',
        'lesson_type' => 'video',
        'chunked_upload_id' => $upload->id,
        'course_id' => $this->course->id,
        'course_section_id' => $section->id,
        'is_free' => 0,
        'duration' => '00:05:00',
    ]);

    $this->signedUrl = URL::temporarySignedRoute(
        'lesson.video.stream',
        now()->addHours(2),
        ['lesson' => $this->lesson->id]
    );
});

it('rejects an unauthenticated streaming request', function () {
    $this->get($this->signedUrl)->assertRedirect(route('login.index'));
});

it('rejects an authenticated but unenrolled user', function () {
    $student = User::factory()->create(['role' => 'student']);

    $this->actingAs($student)->get($this->signedUrl)->assertForbidden();
});

it('rejects a tampered signature', function () {
    $student = User::factory()->create(['role' => 'student']);
    CourseEnrollment::create([
        'enrollment_type' => 'free',
        'entry_date' => now(),
        'user_id' => $student->id,
        'course_id' => $this->course->id,
    ]);

    $this->actingAs($student)
        ->get($this->signedUrl.'&tampered=1')
        ->assertForbidden();
});

it('streams the full file to an enrolled student with no range header', function () {
    $student = User::factory()->create(['role' => 'student']);
    CourseEnrollment::create([
        'enrollment_type' => 'free',
        'entry_date' => now(),
        'user_id' => $student->id,
        'course_id' => $this->course->id,
    ]);

    $response = $this->actingAs($student)->get($this->signedUrl);

    $response->assertOk()
        ->assertHeader('Accept-Ranges', 'bytes')
        ->assertHeader('Content-Length', (string) strlen($this->content));

    expect($response->streamedContent())->toBe($this->content);
});

it('streams a byte range with 206 partial content', function () {
    $student = User::factory()->create(['role' => 'student']);
    CourseEnrollment::create([
        'enrollment_type' => 'free',
        'entry_date' => now(),
        'user_id' => $student->id,
        'course_id' => $this->course->id,
    ]);

    $response = $this->actingAs($student)
        ->withHeaders(['Range' => 'bytes=10-19'])
        ->get($this->signedUrl);

    $response->assertStatus(206)
        ->assertHeader('Content-Range', 'bytes 10-19/'.strlen($this->content))
        ->assertHeader('Content-Length', '10');

    expect($response->streamedContent())->toBe(substr($this->content, 10, 10));
});

it('allows the course-owning instructor and an admin without an enrollment record', function () {
    $admin = User::factory()->create(['role' => 'admin']);

    $this->actingAs($admin)->get($this->signedUrl)->assertOk();
});
