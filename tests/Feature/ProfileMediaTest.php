<?php

use App\Models\Instructor;
use App\Models\User;
use App\Services\MediaService;
use App\Services\PageSectionService;
use App\Services\StudentService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Modules\Frontend\Models\FrontendCollection;
use Spatie\MediaLibrary\MediaCollections\Exceptions\FileDoesNotExist;

uses(RefreshDatabase::class);

beforeEach(function () {
    Storage::fake('public');
    config(['media-library.disk_name' => 'public']);
});

it('serializes legacy profile images on the current host without changing stored data', function () {
    Storage::disk('public')->put('42/profile.png', 'image');
    $user = User::factory()->create(['photo' => 'http://old-host.test/storage/42/profile.png']);
    expect($user->toArray()['photo'])->toStartWith(asset('storage/42/profile.png').'?v=')
        ->and($user->getRawOriginal('photo'))->toBe('http://old-host.test/storage/42/profile.png');
});

it('shows the latest profile upload in the experts query', function () {
    $user = User::factory()->create(['role' => 'instructor']);
    $instructor = Instructor::create([
        'user_id' => $user->id, 'status' => 'approved', 'skills' => [],
        'biography' => 'Teacher', 'resume' => 'resume.pdf', 'designation' => 'Teacher',
    ]);
    $service = app(StudentService::class);
    $service->updateProfile(['photo' => UploadedFile::fake()->image('first.png')], (string) $user->id);
    $old = $user->fresh()->photo;
    $service->updateProfile(['photo' => UploadedFile::fake()->image('second.png')], (string) $user->id);
    $expert = app(PageSectionService::class)->getTopInstructors([$instructor->id])->first();
    expect($expert->user->photo)->toBe($user->fresh()->photo)->not->toBe($old)
        ->and($expert->user->photo)->toContain('second.png?v=')
        ->and($user->fresh()->getMedia())->toHaveCount(1);
    FrontendCollection::create(['type' => 'instructors', 'top' => [$instructor->id]]);
    $this->getJson('/api/collections/instructors/top')->assertOk()
        ->assertJsonPath('collection.0.user.photo', $user->fresh()->photo)
        ->assertHeader('Cache-Control', 'no-store, private');
});

it('preserves the previous image if storing the replacement fails', function () {
    $user = User::factory()->create();
    $service = app(MediaService::class);
    $service->addNewDeletePrev($user, UploadedFile::fake()->image('first.png'), 'profile');
    $old = $user->fresh()->getMedia()->first();
    $upload = UploadedFile::fake()->image('missing.png');
    unlink($upload->getPathname());
    try {
        $service->addNewDeletePrev($user->fresh(), $upload, 'profile');
        $this->fail('Expected the missing upload to fail');
    } catch (FileDoesNotExist) {
        Storage::disk('public')->assertExists($old->getPathRelativeToRoot());
        expect($old->fresh())->not->toBeNull();
    }
});

it('preserves externally hosted profile photos', function () {
    $user = User::factory()->create(['photo' => 'https://example.com/avatar.png']);
    expect($user->photo)->toBe('https://example.com/avatar.png');
});
