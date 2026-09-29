<?php

use App\Models\ChunkedUpload;
use App\Models\Instructor;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
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

    $upload = ChunkedUpload::create([
        'user_id' => $instructorUser->id,
        'filename' => 'lessons/refresh-test.mp4',
        'original_filename' => 'lesson.mp4',
        'file_path' => 'lessons/refresh-test.mp4',
        'disk' => 'local',
        'mime_type' => 'video/mp4',
        'size' => 10,
        'key' => 'lessons/refresh-test.mp4',
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

    $this->refreshUrl = route('lesson.video.stream-url', $this->lesson->id);
});

it('rejects an unauthenticated refresh request', function () {
    $this->getJson($this->refreshUrl)->assertUnauthorized();
});

it('rejects an authenticated but unenrolled user', function () {
    $student = User::factory()->create(['role' => 'student']);

    $this->actingAs($student)->getJson($this->refreshUrl)->assertForbidden();
});

it('returns a fresh signed url and its ttl for an enrolled student', function () {
    $student = User::factory()->create(['role' => 'student']);
    CourseEnrollment::create([
        'enrollment_type' => 'free',
        'entry_date' => now(),
        'user_id' => $student->id,
        'course_id' => $this->course->id,
    ]);

    $this->actingAs($student)
        ->getJson($this->refreshUrl)
        ->assertOk()
        ->assertJson([
            'expires_in' => config('course.video_url_ttl_minutes') * 60,
        ])
        ->assertJsonPath('url', fn ($url) => str_contains($url, route('lesson.video.stream', $this->lesson->id, false)));
});

it('404s for a lesson that is not a video', function () {
    $textLesson = SectionLesson::create([
        'title' => 'Text lesson',
        'lesson_type' => 'text',
        'lesson_src' => '<p>hello</p>',
        'course_id' => $this->course->id,
        'course_section_id' => $this->lesson->course_section_id,
        'is_free' => 0,
    ]);

    $admin = User::factory()->create(['role' => 'admin']);

    $this->actingAs($admin)
        ->getJson(route('lesson.video.stream-url', $textLesson->id))
        ->assertNotFound();
});
