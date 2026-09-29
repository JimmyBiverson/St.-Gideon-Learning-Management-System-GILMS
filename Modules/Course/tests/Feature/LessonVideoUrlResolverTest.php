<?php

use App\Models\ChunkedUpload;
use App\Models\Instructor;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Modules\Course\Models\Course;
use Modules\Course\Models\CourseCategory;
use Modules\Course\Models\CourseSection;
use Modules\Course\Models\SectionLesson;
use Modules\Course\Services\LessonVideoUrlResolver;

uses(RefreshDatabase::class);

beforeEach(function () {
    $user = User::factory()->create(['role' => 'instructor']);
    $instructor = Instructor::create([
        'user_id' => $user->id,
        'status' => 'approved',
        'skills' => [],
        'biography' => 'Test biography',
        'resume' => '',
        'designation' => 'Instructor',
    ]);
    $user->update(['instructor_id' => $instructor->id]);

    $category = CourseCategory::create(['title' => 'Dev', 'slug' => 'dev']);

    $course = Course::create([
        'title' => 'Test Course',
        'slug' => 'test-course',
        'short_description' => 'Short.',
        'level' => 'beginner',
        'language' => 'en',
        'pricing_type' => 'free',
        'status' => 'draft',
        'expiry_type' => 'lifetime',
        'drip_content' => false,
        'user_id' => $user->id,
        'instructor_id' => $instructor->id,
        'course_category_id' => $category->id,
        'course_type' => 'general',
    ]);

    $this->section = CourseSection::create([
        'title' => 'Introduction',
        'course_id' => $course->id,
    ]);
    $this->course = $course;
    $this->uploaderId = $user->id;
});

it('resolves a signed streaming route for a video on the local disk', function () {
    $upload = ChunkedUpload::create([
        'user_id' => $this->uploaderId,
        'filename' => 'lessons/a.mp4',
        'original_filename' => 'a.mp4',
        'file_path' => 'lessons/a.mp4',
        'disk' => 'local',
        'mime_type' => 'video/mp4',
        'size' => 10,
        'key' => 'lessons/a.mp4',
        'status' => 'completed',
    ]);

    $lesson = SectionLesson::create([
        'title' => 'Video lesson',
        'lesson_type' => 'video',
        'chunked_upload_id' => $upload->id,
        'course_id' => $this->course->id,
        'course_section_id' => $this->section->id,
        'is_free' => 0,
        'duration' => '00:05:00',
    ]);

    $videoUrl = app(LessonVideoUrlResolver::class)->resolve($lesson);

    expect($videoUrl->url)->toContain(route('lesson.video.stream', $lesson->id, false))
        ->and($videoUrl->url)->toContain('signature=')
        ->and($videoUrl->expiresInSeconds)->toBe(config('course.video_url_ttl_minutes') * 60);
});

it('resolves a signed bunny embed iframe url for a video on the bunny disk', function () {
    config([
        'services.bunny.library_id' => '12345',
        'services.bunny.token_auth_key' => 'test-token-auth-key',
    ]);

    $upload = ChunkedUpload::create([
        'user_id' => $this->uploaderId,
        'filename' => 'bunny-video-guid',
        'original_filename' => 'a.mp4',
        'file_path' => 'bunny-video-guid',
        'disk' => 'bunny',
        'mime_type' => 'video/mp4',
        'size' => 0,
        'key' => 'bunny-video-guid',
        'status' => 'completed',
    ]);

    $lesson = SectionLesson::create([
        'title' => 'Video lesson',
        'lesson_type' => 'video',
        'chunked_upload_id' => $upload->id,
        'course_id' => $this->course->id,
        'course_section_id' => $this->section->id,
        'is_free' => 0,
        'duration' => '00:05:00',
    ]);

    $videoUrl = app(LessonVideoUrlResolver::class)->resolve($lesson);

    expect($videoUrl->type)->toBe('iframe')
        ->and($videoUrl->expiresInSeconds)->toBeNull()
        ->and($videoUrl->url)->toStartWith('https://iframe.mediadelivery.net/embed/12345/bunny-video-guid?token=')
        ->and($videoUrl->url)->toMatch('/[?&]expires=\d+/');

    parse_str((string) parse_url($videoUrl->url, PHP_URL_QUERY), $query);
    $expectedToken = hash('sha256', 'test-token-auth-key'.'bunny-video-guid'.$query['expires']);

    expect($query['token'])->toBe($expectedToken);
});

it('falls back to the legacy lesson_src when the upload has not been backfilled yet', function () {
    $lesson = SectionLesson::create([
        'title' => 'Legacy video lesson',
        'lesson_type' => 'video',
        'lesson_src' => 'https://legacy.example.com/lessons/old.mp4',
        'course_id' => $this->course->id,
        'course_section_id' => $this->section->id,
        'is_free' => 0,
        'duration' => '00:05:00',
    ]);

    $videoUrl = app(LessonVideoUrlResolver::class)->resolve($lesson);

    expect($videoUrl->url)->toBe('https://legacy.example.com/lessons/old.mp4')
        ->and($videoUrl->expiresInSeconds)->toBeNull();
});
