<?php

namespace Modules\Exam\Models;

use App\Models\BaseModel;
use App\Models\Instructor;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

/**
 * @property int $id
 * @property int $instructor_id
 * @property string $title
 * @property string $slug
 * @property string|null $description
 * @property string $status
 * @property int $total_marks
 * @property int $pass_mark
 * @property int|null $max_attempts
 * @property string|null $expiry_type
 * @property int|null $expiry_duration
 * @property float|null $average_rating
 * @property int $reviews_count
 * @property int $enrollments_count
 * @property \App\Models\Instructor|null $instructor
 * @property \Illuminate\Database\Eloquent\Collection $questions
 * @property \Illuminate\Database\Eloquent\Collection $enrollments
 * @property \Illuminate\Database\Eloquent\Collection $attempts
 * @property \Illuminate\Database\Eloquent\Collection $reviews
 */
class Exam extends BaseModel implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'title',
        'slug',
        'short_description',
        'description',
        'instructor_id',
        'exam_category_id',
        'pricing_type',
        'price',
        'discount',
        'discount_price',
        'duration_hours',
        'duration_minutes',
        'pass_mark',
        'total_marks',
        'max_attempts',
        'total_questions',
        'status',
        'level',
        'thumbnail',
        'banner',
        'expiry_type',
        'expiry_duration',
        'meta_title',
        'meta_keywords',
        'meta_description',
        'og_title',
        'og_description',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'discount' => 'boolean',
        'discount_price' => 'decimal:2',
        'pass_mark' => 'decimal:2',
        'total_marks' => 'decimal:2',
        'duration_hours' => 'integer',
        'duration_minutes' => 'integer',
        'max_attempts' => 'integer',
        'total_questions' => 'integer',
    ];

    public function instructor(): BelongsTo
    {
        return $this->belongsTo(Instructor::class);
    }

    public function exam_category(): BelongsTo
    {
        return $this->belongsTo(ExamCategory::class);
    }

    public function questions(): HasMany
    {
        return $this->hasMany(ExamQuestion::class);
    }

    public function enrollments(): HasMany
    {
        return $this->hasMany(ExamEnrollment::class)->orderBy('created_at', 'desc');
    }

    public function attempts(): HasMany
    {
        return $this->hasMany(ExamAttempt::class)->orderBy('created_at', 'desc');
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(ExamReview::class)->orderBy('created_at', 'desc');
    }

    public function coupons(): HasMany
    {
        return $this->hasMany(ExamCoupon::class)->orderBy('created_at', 'desc');
    }

    public function resources(): HasMany
    {
        return $this->hasMany(ExamResource::class)->orderBy('created_at', 'desc');
    }

    public function wishlists(): HasMany
    {
        return $this->hasMany(ExamWishlist::class)->orderBy('created_at', 'desc');
    }

    public function faqs(): HasMany
    {
        return $this->hasMany(ExamFaq::class);
    }

    public function requirements(): HasMany
    {
        return $this->hasMany(ExamRequirement::class);
    }

    public function outcomes(): HasMany
    {
        return $this->hasMany(ExamOutcome::class);
    }

    // ==================== Query Scopes ====================

    /**
     * Scope to filter published exams
     */
    public function scopePublished(Builder $query): Builder
    {
        return $query->where('status', 'published');
    }

    /**
     * Scope to filter free exams
     */
    public function scopeFree(Builder $query): Builder
    {
        return $query->where('pricing_type', 'free');
    }

    /**
     * Scope to filter paid exams
     */
    public function scopePaid(Builder $query): Builder
    {
        return $query->where('pricing_type', 'paid');
    }

    /**
     * Scope to filter exams by category
     */
    public function scopeInCategory(Builder $query, string $categoryId): Builder
    {
        return $query->where('exam_category_id', $categoryId);
    }

    /**
     * Scope to filter exams owned by a specific instructor
     */
    public function scopeOwnedBy(Builder $query, int $instructorId): Builder
    {
        return $query->where('instructor_id', $instructorId);
    }

    /**
     * Scope for featured exams (published, ordered by popularity and rating)
     */
    public function scopeFeatured(Builder $query): Builder
    {
        return $query->published()
            ->orderBy('enrollments_count', 'desc')
            ->orderBy('average_rating', 'desc');
    }
}
