<?php

use App\Models\User;
use App\Services\NotificationService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;

uses(RefreshDatabase::class);

it('keeps the unread count accurate while bounding the private feed', function () {
    $user = User::factory()->create();
    $other = User::factory()->create();
    foreach (range(1, 18) as $number) {
        $user->notifications()->create(['id' => Str::uuid(), 'type' => 'test', 'data' => ['title' => 'Update '.$number]]);
    }
    $other->notifications()->create(['id' => Str::uuid(), 'type' => 'test', 'data' => ['title' => 'Private']]);
    $this->actingAs($user);
    $service = app(NotificationService::class);
    expect($service->unreadCount())->toBe(18)
        ->and($service->unreadFeed())->toHaveCount(15)
        ->and($service->unreadFeed()->pluck('notifiable_id')->unique()->all())->toBe([$user->id]);
    $service->markAsRead($service->unreadFeed()->first()->id);
    expect($service->unreadCount())->toBe(17);
    $this->getJson(route('notifications.feed'))->assertOk()
        ->assertJsonPath('unreadNotificationsCount', 17)
        ->assertJsonCount(15, 'notificationFeed')
        ->assertHeader('Cache-Control', 'no-store, private');
});

it('does not expose another users notification', function () {
    $owner = User::factory()->create();
    $notification = $owner->notifications()->create(['id' => Str::uuid(), 'type' => 'test', 'data' => ['title' => 'Private']]);
    $this->actingAs(User::factory()->create());
    expect(fn () => app(NotificationService::class)->markAsRead($notification->id))
        ->toThrow(ModelNotFoundException::class);
    expect($notification->fresh()->read_at)->toBeNull();
});

it('returns an empty feed for guests', function () {
    expect(app(NotificationService::class)->unreadFeed())->toHaveCount(0)
        ->and(app(NotificationService::class)->unreadCount())->toBe(0);
});
