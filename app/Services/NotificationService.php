<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;

class NotificationService extends MediaService
{
    public function notifications(array $data): LengthAwarePaginator|Collection
    {
        $user = Auth::user();
        $page = array_key_exists('per_page', $data) ? intval($data['per_page']) : 10;

        if (array_key_exists('unread', $data) && $data['unread']) {
            $notifications = $user->unreadNotifications;
        } else {
            $notifications = $user->notifications()->paginate($page);
        }

        return $notifications;
    }

    public function markAllAsRead(): void
    {
        Auth::user()->unreadNotifications->markAsRead();
    }

    /**
     * The unread notifications hydrated into a page for the notification bell.
     *
     * Only the most recent entries are returned. Returning the entire unread
     * history makes every page load slower as notifications accumulate.
     */
    public function unreadFeed(?int $limit = null): Collection
    {
        $user = Auth::user();

        if (! $user) {
            return new Collection;
        }

        $limit = $limit ?? (int) config('notifications.unread_limit');

        return $user->unreadNotifications()->latest()->limit($limit)->get();
    }

    /**
     * Total number of unread notifications, used for the bell badge.
     *
     * This is a cheap COUNT rather than the size of the hydrated feed, so the
     * badge stays accurate even when the feed itself is capped.
     */
    public function unreadCount(): int
    {
        $user = Auth::user();

        if (! $user) {
            return 0;
        }

        return $user->unreadNotifications()->count();
    }

    // I want to return the read notification
    public function markAsRead(string $id)
    {
        $notification = Auth::user()->notifications->find($id);

        if ($notification) {
            $notification->markAsRead();
        }

        return $notification;
    }
}
