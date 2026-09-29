<?php

use App\Models\ChunkedUpload;
use App\Models\Instructor;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;

uses(RefreshDatabase::class);

beforeEach(function () {
    // These routes make real HTTP requests through the full middleware
    // stack, and AppConfig reads Bunny credentials from the settings table
    // on every request — a bare config() call here would just be
    // overwritten (to empty) by AppConfig before the controller runs,
    // since no storage setting exists otherwise in a fresh test database.
    Setting::query()->create([
        'type' => 'storage',
        'sub_type' => null,
        'title' => 'Storage Settings',
        'fields' => [
            'storage_driver' => 'bunny',
            'bunny_library_id' => '12345',
            'bunny_api_key' => 'test-api-key',
            'bunny_token_auth_key' => 'test-token-auth-key',
        ],
    ]);

    $this->instructorUser = User::factory()->create(['role' => 'instructor']);
    Instructor::create([
        'user_id' => $this->instructorUser->id,
        'status' => 'approved',
        'skills' => [],
        'biography' => 'Test biography',
        'resume' => '',
        'designation' => 'Instructor',
    ]);
});

it('creates a bunny video and a matching upload record with valid tus credentials', function () {
    Http::fake([
        'https://video.bunnycdn.com/library/12345/videos' => Http::response(['guid' => 'bunny-guid-1'], 200),
    ]);

    $response = $this->actingAs($this->instructorUser)
        ->postJson(route('bunny.upload.initiate'), ['title' => 'my-lesson.mp4'])
        ->assertOk()
        ->assertJson(['success' => true, 'video_id' => 'bunny-guid-1', 'library_id' => '12345']);

    $upload = ChunkedUpload::find($response->json('upload_id'));

    expect($upload)->not->toBeNull()
        ->and($upload->disk)->toBe('bunny')
        ->and($upload->key)->toBe('bunny-guid-1')
        ->and($upload->status)->toBe('initialized');

    $expectedSignature = hash(
        'sha256',
        '12345'.'test-api-key'.$response->json('expire').'bunny-guid-1'
    );

    expect($response->json('signature'))->toBe($expectedSignature);

    Http::assertSent(function ($request) {
        return $request->url() === 'https://video.bunnycdn.com/library/12345/videos'
            && $request->hasHeader('AccessKey', 'test-api-key')
            && $request['title'] === 'my-lesson.mp4';
    });
});

it('rejects an unauthenticated initiate request', function () {
    $this->postJson(route('bunny.upload.initiate'), ['title' => 'x.mp4'])
        ->assertUnauthorized();
});

it('rejects a student from initiating a bunny upload', function () {
    // The app's `role` middleware always redirects back with a flash error
    // rather than a JSON 403, even for XHR requests — consistent with every
    // other role-gated route in this app, not specific to this endpoint.
    $student = User::factory()->create(['role' => 'student']);

    $this->actingAs($student)
        ->postJson(route('bunny.upload.initiate'), ['title' => 'x.mp4'])
        ->assertRedirect();
});

it('marks the upload completed', function () {
    $upload = ChunkedUpload::create([
        'user_id' => $this->instructorUser->id,
        'filename' => 'bunny-guid-2',
        'original_filename' => 'lesson.mp4',
        'file_path' => 'bunny-guid-2',
        'disk' => 'bunny',
        'mime_type' => 'video/mp4',
        'size' => 0,
        'key' => 'bunny-guid-2',
        'status' => 'initialized',
    ]);

    $this->actingAs($this->instructorUser)
        ->postJson(route('bunny.upload.complete', $upload->id))
        ->assertOk()
        ->assertJson(['success' => true, 'file_url' => null]);

    expect($upload->fresh()->status)->toBe('completed');
});

it('deletes the video from bunny and the local row on abort', function () {
    Http::fake([
        'https://video.bunnycdn.com/library/12345/videos/bunny-guid-3' => Http::response(['success' => true], 200),
    ]);

    $upload = ChunkedUpload::create([
        'user_id' => $this->instructorUser->id,
        'filename' => 'bunny-guid-3',
        'original_filename' => 'lesson.mp4',
        'file_path' => 'bunny-guid-3',
        'disk' => 'bunny',
        'mime_type' => 'video/mp4',
        'size' => 0,
        'key' => 'bunny-guid-3',
        'status' => 'initialized',
    ]);

    $this->actingAs($this->instructorUser)
        ->deleteJson(route('bunny.upload.abort', $upload->id))
        ->assertOk()
        ->assertJson(['success' => true]);

    expect(ChunkedUpload::find($upload->id))->toBeNull();

    Http::assertSent(function ($request) {
        return $request->url() === 'https://video.bunnycdn.com/library/12345/videos/bunny-guid-3'
            && $request->method() === 'DELETE';
    });
});
