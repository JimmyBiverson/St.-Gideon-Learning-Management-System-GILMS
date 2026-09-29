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
    $this->user = User::factory()->create(['role' => 'instructor']);
    $this->instructor = Instructor::create([
        'user_id' => $this->user->id,
        'status' => 'approved',
        'skills' => [],
        'biography' => 'Test biography',
        'resume' => '',
        'designation' => 'Instructor',
    ]);
    $this->user->update(['instructor_id' => $this->instructor->id]);

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
        'user_id' => $this->user->id,
        'instructor_id' => $this->instructor->id,
        'course_category_id' => $category->id,
        'course_type' => 'general',
    ]);

    $this->section = CourseSection::create([
        'title' => 'Introduction',
        'course_id' => $this->course->id,
    ]);
});

function uploadSingleChunkFile(User $user, string $filetype, string $filename, string $mimetype, string $content): array
{
    $init = test()->actingAs($user)
        ->postJson(route('chunked.upload.initialize'), [
            'filename' => $filename,
            'filesize' => strlen($content),
            'mimetype' => $mimetype,
            'filetype' => $filetype,
            'total_chunks' => 1,
        ])
        ->assertOk()
        ->assertJson(['success' => true]);

    $uploadId = $init->json('upload_id');

    $uri = route('chunked.upload.chunk', $uploadId).'?'.http_build_query([
        'part_number' => 1,
        'filename' => $filename,
        'mimetype' => $mimetype,
    ]);

    test()->actingAs($user)
        ->call('POST', $uri, [], [], [], ['HTTP_ACCEPT' => 'application/json'], $content)
        ->assertOk();

    $complete = test()->actingAs($user)
        ->postJson(route('chunked.upload.complete', $uploadId))
        ->assertOk()
        ->assertJson(['success' => true]);

    return $complete->json();
}

it('stores an uploaded lesson video on the private local disk with no public url', function () {
    $content = str_repeat('V', 2048);

    $result = uploadSingleChunkFile($this->user, 'lesson_video', 'lesson.mp4', 'video/mp4', $content);

    $upload = ChunkedUpload::find($result['upload_id']);

    expect($upload->disk)->toBe('local')
        ->and($upload->file_url)->toBeNull()
        ->and(Storage::disk('local')->exists($upload->key))->toBeTrue()
        ->and(Storage::disk('public')->exists($upload->key))->toBeFalse();
});

it('still stores a course preview video upload on the public disk', function () {
    $content = str_repeat('P', 2048);

    $result = uploadSingleChunkFile($this->user, 'video', 'preview.mp4', 'video/mp4', $content);

    $upload = ChunkedUpload::find($result['upload_id']);

    expect($upload->disk)->toBe('public')
        ->and($upload->file_url)->not->toBeNull()
        ->and(Storage::disk('public')->exists($upload->key))->toBeTrue();
});

it('links a newly uploaded video to the lesson and clears lesson_src', function () {
    $content = str_repeat('V', 2048);
    $result = uploadSingleChunkFile($this->user, 'lesson_video', 'lesson.mp4', 'video/mp4', $content);

    $this->actingAs($this->user)
        ->post(route('lesson.store'), [
            'title' => 'Video lesson',
            'course_id' => $this->course->id,
            'course_section_id' => $this->section->id,
            'lesson_type' => 'video',
            'chunked_upload_id_new' => $result['upload_id'],
            'duration' => '00:05:00',
            'is_free' => 0,
        ])
        ->assertRedirect();

    $lesson = SectionLesson::query()->where('lesson_type', 'video')->firstOrFail();

    expect($lesson->chunked_upload_id)->toBe($result['upload_id'])
        ->and($lesson->lesson_src)->toBeNull();
});

it('does not delete the video file when updating a lesson without touching its video', function () {
    $content = str_repeat('V', 2048);
    $result = uploadSingleChunkFile($this->user, 'lesson_video', 'lesson.mp4', 'video/mp4', $content);
    $upload = ChunkedUpload::find($result['upload_id']);

    $lesson = SectionLesson::create([
        'title' => 'Video lesson',
        'lesson_type' => 'video',
        'chunked_upload_id' => $upload->id,
        'course_id' => $this->course->id,
        'course_section_id' => $this->section->id,
        'is_free' => 0,
        'duration' => '00:05:00',
    ]);

    $this->actingAs($this->user)
        ->put(route('lesson.update', $lesson->id), [
            'title' => 'Renamed video lesson',
            'course_id' => $this->course->id,
            'course_section_id' => $this->section->id,
            'lesson_type' => 'video',
            'duration' => '00:05:00',
            'is_free' => 0,
        ])
        ->assertRedirect();

    $lesson->refresh();

    expect($lesson->title)->toBe('Renamed video lesson')
        ->and($lesson->chunked_upload_id)->toBe($upload->id)
        ->and(Storage::disk('local')->exists($upload->fresh()->key))->toBeTrue();
});
