<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Index the columns the notification bell actually queries.
 *
 * `morphs('notifiable')` in the create migration already indexes
 * (notifiable_type, notifiable_id), but both bell queries also filter on
 * `read_at IS NULL`:
 *
 *   $user->unreadNotifications()->latest()->limit($limit)->get();
 *   $user->unreadNotifications()->count();
 *
 * With only the two-column index, MySQL has to fetch every notification that
 * user has ever received and discard the read ones in memory. That cost grows
 * with each user's notification history, and the COUNT pays it on every poll —
 * the bell refreshes for every logged-in user, so this is the query that
 * degrades first as the user base grows.
 *
 * A composite index on (notifiable_type, notifiable_id, read_at) answers both
 * queries directly and also serves the existing notification list page.
 *
 * This is a new migration rather than an edit to the create migration because
 * the table already exists on any deployed site: altering the original file
 * would only apply to a brand new install.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('notifications', function (Blueprint $table) {
            $table->index(
                ['notifiable_type', 'notifiable_id', 'read_at'],
                'notifications_unread_index'
            );
        });
    }

    public function down(): void
    {
        Schema::table('notifications', function (Blueprint $table) {
            $table->dropIndex('notifications_unread_index');
        });
    }
};
