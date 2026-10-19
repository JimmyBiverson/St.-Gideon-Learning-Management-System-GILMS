<?php

use App\Models\Instructor;
use App\Models\Setting;
use App\Models\User;
use App\Services\AccountService;
use App\Services\LocalFileUploadService;
use App\Services\SettingsService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Modules\Course\Models\Course;
use Modules\Course\Models\CourseCategory;
use Modules\Course\Models\CourseLiveClass;
use Modules\Course\Models\CourseSection;
use Modules\Course\Services\CourseSectionService;
use Modules\Course\Services\CourseService;

uses(RefreshDatabase::class);

function createCourseForMediaUploadTest(User $user, ?UploadedFile $thumbnail = null): Course
{
    $instructor = Instructor::create([
        'skills' => [],
        'biography' => 'Upload test instructor',
        'resume' => '',
        'designation' => 'Instructor',
        'payout_methods' => [],
        'user_id' => $user->id,
    ]);
    $category = CourseCategory::create([
        'title' => 'Upload Test Subject',
        'slug' => 'upload-test-subject',
    ]);

    Auth::login($user);

    return app(CourseService::class)->createCourse([
        'title' => 'Upload test subject',
        'status' => 'draft',
        'level' => 'beginner',
        'short_description' => 'A test subject for upload coverage.',
        'instructor_id' => $instructor->id,
        'course_category_id' => $category->id,
        'thumbnail' => $thumbnail,
    ]);
}

test('profile, system branding, and course thumbnail images are stored and remain reachable', function () {
    Storage::fake('public');
    $user = User::factory()->create(['role' => 'instructor']);

    app(AccountService::class)->updateProfile([
        'name' => $user->name,
        'social_links' => [],
        'photo' => UploadedFile::fake()->image('profile.png'),
    ], (string) $user->id);

    $user->refresh();
    $profileMedia = $user->getMedia('*', ['name' => 'profile'])->first();

    expect($profileMedia)->not->toBeNull();
    expect($user->photo)->toBe($profileMedia->getFullUrl());
    Storage::disk('public')->assertExists($profileMedia->getPathRelativeToRoot());

    $setting = Setting::create([
        'type' => 'system',
        'title' => 'System',
        'fields' => [],
    ]);

    app(SettingsService::class)->systemUpdate([
        'new_logo_dark' => UploadedFile::fake()->image('dark-logo.png'),
        'new_logo_light' => UploadedFile::fake()->image('light-logo.png'),
        'new_favicon' => UploadedFile::fake()->image('favicon.png'),
    ], (string) $setting->id);

    $setting->refresh();
    expect($setting->fields)->toHaveKeys(['logo_dark', 'logo_light', 'favicon']);
    expect($setting->fields)->not->toHaveKeys(['new_logo_dark', 'new_logo_light', 'new_favicon']);
    foreach (['logo_dark', 'logo_light', 'favicon'] as $mediaName) {
        $media = $setting->getMedia('*', ['name' => $mediaName])->first();
        expect($media)->not->toBeNull();
        expect($setting->fields[$mediaName])->toBe($media->getFullUrl());
        Storage::disk('public')->assertExists($media->getPathRelativeToRoot());
    }

    $course = createCourseForMediaUploadTest($user, UploadedFile::fake()->image('subject.png'));
    $course = $course->fresh();
    $thumbnail = $course->getMedia('*', ['name' => 'thumbnail'])->first();

    expect($thumbnail)->not->toBeNull();
    expect($course->thumbnail)->toBe($thumbnail->getFullUrl());
    Storage::disk('public')->assertExists($thumbnail->getPathRelativeToRoot());
});

test('completed local lesson uploads are reachable and persist with lesson and live class records', function () {
    Storage::fake('public');
    $user = User::factory()->create(['role' => 'instructor']);
    $course = createCourseForMediaUploadTest($user);
    $content = 'lesson-content';
    $uploader = new LocalFileUploadService;
    $upload = $uploader->initiateUpload('lesson.pdf', 'application/pdf', strlen($content), (int) $user->id);
    $part = $uploader->uploadPart($upload, 1, $content);

    expect($uploader->completeUpload($upload, [$part]))->toBeTrue();

    $upload->refresh();
    expect($upload->status)->toBe('completed');
    expect(parse_url($upload->file_url, PHP_URL_PATH))->toBe('/storage/'.$upload->key);
    expect(Storage::disk('public')->get($upload->key))->toBe($content);

    $section = CourseSection::create([
        'title' => 'Upload test section',
        'course_id' => $course->id,
    ]);
    $lesson = app(CourseSectionService::class)->createSectionLesson([
        'title' => 'Uploaded lesson',
        'lesson_type' => 'document',
        'lesson_src_new' => $upload->file_url,
        'course_id' => $course->id,
        'course_section_id' => $section->id,
    ], (string) $user->id);

    expect($lesson->refresh()->lesson_src)->toBe($upload->file_url);

    $liveClass = CourseLiveClass::create([
        'provider' => 'zoom',
        'class_topic' => 'Upload test live class',
        'class_date_and_time' => now()->addDay(),
        'course_id' => $course->id,
    ]);

    expect($liveClass)->toBeInstanceOf(CourseLiveClass::class);
    expect($liveClass->fresh()->course_id)->toBe($course->id);
});

test('incomplete local lesson uploads fail instead of being marked complete', function () {
    Storage::fake('public');
    $user = User::factory()->create(['role' => 'instructor']);
    $uploader = new LocalFileUploadService;
    $upload = $uploader->initiateUpload('missing-chunk.mp4', 'video/mp4', 10, (int) $user->id);

    expect(fn () => $uploader->completeUpload($upload, [['PartNumber' => 1]]))
        ->toThrow(RuntimeException::class);

    expect($upload->refresh()->status)->toBe('failed');
    Storage::disk('public')->assertMissing($upload->key);
});
