<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Modules\Course\Models\Course;
use Modules\Exam\Models\Exam;
use Modules\Store\Models\Product;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

/**
 * @property float|null $average_rating
 * @property int $enrollments_count
 * @property int $total_reviews
 * @property array|null $social_links
 * @property string|null $name
 * @property User $user
 * @property Collection<int, Course> $courses
 */
class Instructor extends Model implements HasMedia
{
    use InteractsWithMedia;

    protected $fillable = [
        'skills',
        'biography',
        'resume',
        'status',
        'designation',
        'payout_methods',
        'user_id',
    ];

    protected $casts = [
        'skills' => 'array',
        'payout_methods' => 'array',
    ];

    protected $attributes = [
        'payout_methods' => '[
            {
                "type": "payout",
                "sub_type": "paypal",
                "title": "Paypal Settings",
                "fields": {
                    "active": false,
                    "test_mode": false,
                    "currency": "USD",
                    "sandbox_client_id": "",
                    "sandbox_secret_key": "",
                    "production_client_id": "",
                    "production_secret_key": ""
                }
            },
            {
                "type": "payout",
                "sub_type": "stripe",
                "title": "Stripe Settings",
                "fields": {
                    "active": false,
                    "test_mode": false,
                    "currency": "USD",
                    "test_public_key": "",
                    "test_secret_key": "",
                    "live_public_key": "",
                    "live_secret_key": "",
                    "webhook_secret": ""
                }
            },
            {
                "type": "payout",
                "sub_type": "mollie",
                "title": "Mollie Settings",
                "fields": {
                    "active": false,
                    "test_mode": false,
                    "currency": "USD",
                    "test_api_key": "",
                    "live_api_key": ""
                }
            },
            {
                "type": "payout",
                "sub_type": "paystack",
                "title": "Paystack Settings",
                "fields": {
                    "active": false,
                    "test_mode": false,
                    "currency": "USD",
                    "test_public_key": "",
                    "test_secret_key": "",
                    "live_public_key": "",
                    "live_secret_key": ""
                }
            },
            {
                "type": "payout",
                "sub_type": "sslcommerz",
                "title": "SSLCommerz Settings",
                "fields": {
                    "active": false,
                    "test_mode": true,
                    "currency": "BDT",
                    "store_id": "",
                    "store_password": ""
                }
            },
            {
                "type": "payout",
                "sub_type": "razorpay",
                "title": "Razorpay Settings",
                "fields": {
                    "active": false,
                    "test_mode": true,
                    "currency": "INR",
                    "api_key": "",
                    "api_secret": ""
                }
            }
        ]',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function courses(): HasMany
    {
        return $this->hasMany(Course::class)->orderBy('created_at', 'desc');
    }

    public function exams(): HasMany
    {
        return $this->hasMany(Exam::class)->orderBy('created_at', 'desc');
    }

    public function products(): HasMany
    {
        return $this->hasMany(Product::class)->orderBy('created_at', 'desc');
    }

    // ==================== Query Scopes ====================

    /**
     * Scope to filter approved instructors
     */
    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope to filter pending instructors
     */
    public function scopePending(Builder $query): Builder
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope to filter rejected instructors
     */
    public function scopeRejected(Builder $query): Builder
    {
        return $query->where('status', 'rejected');
    }

    /**
     * Scope to filter by status
     */
    public function scopeOfStatus(Builder $query, string $status): Builder
    {
        return $query->where('status', $status);
    }

    /**
     * Scope to filter instructors with resume
     */
    public function scopeWithResume(Builder $query): Builder
    {
        return $query->whereNotNull('resume');
    }

    public function scopeByUserId(Builder $query, int $userId): Builder
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope to search instructors by designation or biography
     */
    public function scopeSearch(Builder $query, string $searchTerm): Builder
    {
        return $query->where(function ($q) use ($searchTerm) {
            $q->where('designation', 'LIKE', '%'.$searchTerm.'%')
                ->orWhere('biography', 'LIKE', '%'.$searchTerm.'%');
        });
    }

    /**
     * Scope to load commonly used relationships
     */
    public function scopeWithRelatedData(Builder $query): Builder
    {
        return $query->with([
            'user',
            'courses',
        ])
            ->withCount('courses');
    }

    /**
     * Scope for instructors with active courses
     */
    public function scopeWithActiveCourses(Builder $query): Builder
    {
        return $query->whereHas('courses', function ($q) {
            $q->where('status', 'approved');
        });
    }
}
