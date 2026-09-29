<?php

namespace App\Models;

use App\Notifications\VerifyEmailNotification;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\DatabaseNotificationCollection;
use Illuminate\Notifications\Notifiable;
use Modules\Course\Models\Course;
use Modules\Course\Models\CourseEnrollment;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

/**
 * @property DatabaseNotificationCollection $unreadNotifications
 * @property DatabaseNotificationCollection $notifications
 * @property string|null $user_type
 * @property int|null $instructor_id
 */
class User extends Authenticatable implements HasMedia, MustVerifyEmail
{
    use HasFactory, InteractsWithMedia, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'status',
        'photo',
        'google_id',
        'social_links',
        'email_verified_at',
        'instructor_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'social_links' => 'array',
        'status' => 'integer',
    ];

    public function instructor(): BelongsTo
    {
        return $this->belongsTo(Instructor::class);
    }

    public function instructorCourses(): HasManyThrough
    {
        return $this->hasManyThrough(Course::class, Instructor::class, 'user_id', 'instructor_id')
            ->where('courses.status', 'approved');
    }

    public function enrollments(): HasMany
    {
        return $this->hasMany(CourseEnrollment::class);
    }

    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmailNotification);
    }

    // ==================== Query Scopes ====================

    /**
     * Scope to filter admin users
     */
    public function scopeAdmins(Builder $query): Builder
    {
        return $query->where('role', 'admin');
    }

    /**
     * Scope to filter instructor users
     */
    public function scopeInstructors(Builder $query): Builder
    {
        return $query->where('role', 'instructor');
    }

    /**
     * Scope to filter student users
     */
    public function scopeStudents(Builder $query): Builder
    {
        return $query->where('role', 'student');
    }

    /**
     * Scope to filter active users
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', 1);
    }

    /**
     * Scope to filter inactive/suspended users
     */
    public function scopeInactive(Builder $query): Builder
    {
        return $query->where('status', 0);
    }

    /**
     * Scope to filter verified users
     */
    public function scopeVerified(Builder $query): Builder
    {
        return $query->whereNotNull('email_verified_at');
    }

    /**
     * Scope to filter unverified users
     */
    public function scopeUnverified(Builder $query): Builder
    {
        return $query->whereNull('email_verified_at');
    }

    /**
     * Scope to filter by role
     */
    public function scopeOfRole(Builder $query, string $role): Builder
    {
        return $query->where('role', $role);
    }
}
