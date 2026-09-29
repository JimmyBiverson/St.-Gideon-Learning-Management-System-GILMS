<?php

use App\Models\ChunkedUpload;
use App\Models\Instructor;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Modules\Course\Models\Course;
use Modules\Course\Models\CourseCategory;
use Modules\Course\Models\CourseSection;
use Modules\Course\Models\SectionLesson;

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
        'user_id' => $user->id,
        'instructor_id' => $instructor->id,
        'course_category_id' => $category->id,
        'course_type' => 'general',
    ]);

    $this->section = CourseSection::create([
        'title' => 'Introduction',
        'course_id' => $this->course->id,
    ]);
    $this->uploaderId = $user->id;
});

function seedLegacyPublicVideoLesson(int $uploaderId, int $courseId, int $sectionId, string $key, string $content): SectionLesson
{
    Storage::disk('public')->put($key, $content);
    $fileUrl = asset('storage/'.$key);

    $upload = ChunkedUpload::create([
        'user_id' => $uploaderId,
        'filename' => $key,
        'original_filename' => 'legacy.mp4',
        'file_path' => $key,
        'file_url' => $fileUrl,
        'disk' => 'public',
        'mime_type' => 'video/mp4',
        'size' => strlen($content),
        'key' => $key,
        'status' => 'completed',
    ]);

    return SectionLesson::create([
        'title' => 'Legacy video lesson',
        'lesson_type' => 'video',
        'lesson_src' => $fileUrl,
        'course_id' => $courseId,
        'course_section_id' => $sectionId,
        'is_free' => 0,
        'duration' => '00:05:00',
    ]);
}

it('moves a legacy public video lesson file to private storage', function () {
    $lesson = seedLegacyPublicVideoLesson(
        $this->uploaderId, $this->course->id, $this->section->id,
        'lessons/legacy-1.mp4', 'legacy content'
    );

    $this->artisan('course:privatize-video-lessons', ['--seconds' => 5])
        ->assertExitCode(0);

    $lesson->refresh();
    $upload = ChunkedUpload::where('key', 'lessons/legacy-1.mp4')->firstOrFail();

    expect($lesson->chunked_upload_id)->toBe($upload->id)
        ->and($lesson->lesson_src)->toBeNull()
        ->and($upload->disk)->toBe('local')
        ->and($upload->file_url)->toBeNull()
        ->and(Storage::disk('local')->exists('lessons/legacy-1.mp4'))->toBeTrue()
        ->and(Storage::disk('public')->exists('lessons/legacy-1.mp4'))->toBeFalse()
        ->and(Storage::disk('local')->get('lessons/legacy-1.mp4'))->toBe('legacy content');
});

it('is idempotent when run a second time', function () {
    seedLegacyPublicVideoLesson(
        $this->uploaderId, $this->course->id, $this->section->id,
        'lessons/legacy-2.mp4', 'legacy content'
    );

    $this->artisan('course:privatize-video-lessons', ['--seconds' => 5])->assertExitCode(0);
    $this->artisan('course:privatize-video-lessons', ['--seconds' => 5])->assertExitCode(0);

    expect(SectionLesson::whereNull('chunked_upload_id')->where('lesson_type', 'video')->count())->toBe(0);
});

it('skips a lesson whose upload record is missing without aborting the batch', function () {
    // Broken row: lesson_src points at nothing resolvable.
    SectionLesson::create([
        'title' => 'Broken video lesson',
        'lesson_type' => 'video',
        'lesson_src' => 'https://example.com/storage/lessons/does-not-exist.mp4',
        'course_id' => $this->course->id,
        'course_section_id' => $this->section->id,
        'is_free' => 0,
        'duration' => '00:05:00',
    ]);

    $healthyLesson = seedLegacyPublicVideoLesson(
        $this->uploaderId, $this->course->id, $this->section->id,
        'lessons/legacy-3.mp4', 'legacy content'
    );

    $this->artisan('course:privatize-video-lessons', ['--seconds' => 1])
        ->assertExitCode(1); // the broken row is still pending

    $healthyLesson->refresh();

    expect($healthyLesson->chunked_upload_id)->not->toBeNull()
        ->and($healthyLesson->lesson_src)->toBeNull();
});
