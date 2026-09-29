<?php

namespace Modules\Course\Models;

use App\Models\BaseModel;
use App\Models\Instructor;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

/**
 * @property float|null $average_rating
 * @property int $reviews_count
 * @property int $total_lessons
 * @property int $total_quizzes
 * @property float $total_duration_hours
 * @property float $total_duration_minutes
 * @property string $formatted_duration
 * @property string $formatted_students
 * @property string $formatted_lessons
 * @property string $formatted_quizzes
 * @property int $count
 * @property Collection $section_lessons
 * @property Instructor|null $instructor
 */
class Course extends BaseModel implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'title',
        'slug',
        'course_type',
        'status',
        'level',
        'mode',
        'short_description',
        'description',
        'language',

        'pricing_type',
        'price',
        'discount',
        'discount_price',
        'drip_content',

        'thumbnail',
        'banner',
        'preview',

        'expiry_type',
        'expiry_duration',
        'created_from',

        'meta_title',
        'meta_keywords',
        'meta_description',
        'og_title',
        'og_description',

        'instructor_id',
        'course_category_id',
        'course_category_child_id',
    ];

    public function course_category(): BelongsTo
    {
        return $this->belongsTo(CourseCategory::class);
    }

    public function course_category_child(): BelongsTo
    {
        return $this->belongsTo(CourseCategoryChild::class);
    }

    public function live_classes(): HasMany
    {
        return $this->hasMany(CourseLiveClass::class)->orderBy('class_date_and_time', 'asc');
    }

    public function assignments(): HasMany
    {
        return $this->hasMany(CourseAssignment::class);
    }

    public function sections(): HasMany
    {
        return $this->hasMany(CourseSection::class);
    }

    public function lessons(): HasMany
    {
        return $this->hasMany(SectionLesson::class);
    }

    public function enrollments(): HasMany
    {
        return $this->hasMany(CourseEnrollment::class);
    }

    public function faqs(): HasMany
    {
        return $this->hasMany(CourseFaq::class);
    }

    public function requirements(): HasMany
    {
        return $this->hasMany(CourseRequirement::class);
    }

    public function outcomes(): HasMany
    {
        return $this->hasMany(CourseOutcome::class);
    }

    public function instructor(): BelongsTo
    {
        return $this->belongsTo(Instructor::class);
    }

    public function forums(): HasMany
    {
        return $this->hasMany(CourseForum::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(CourseReview::class);
    }

    public function coupons(): HasMany
    {
        return $this->hasMany(CourseCoupon::class);
    }

    // ==================== Query Scopes ====================

    /**
     * Scope to filter approved courses
     */
    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope to filter free courses
     */
    public function scopeFree(Builder $query): Builder
    {
        return $query->where('pricing_type', 'free');
    }

    /**
     * Scope to filter paid courses
     */
    public function scopePaid(Builder $query): Builder
    {
        return $query->where('pricing_type', 'paid');
    }

    /**
     * Scope to filter courses by category
     */
    public function scopeInCategory(Builder $query, string $categoryId): Builder
    {
        return $query->where('course_category_id', $categoryId);
    }

    /**
     * Scope to filter courses by category child
     */
    public function scopeInCategoryChild(Builder $query, string $categoryChildId): Builder
    {
        return $query->where('course_category_child_id', $categoryChildId);
    }

    /**
     * Scope to filter courses by language
     */
    public function scopeInLanguage(Builder $query, string $language): Builder
    {
        return $query->where('language', $language);
    }

    /**
     * Scope to filter courses owned by specific instructor
     */
    public function scopeOwnedBy(Builder $query, int $instructorId): Builder
    {
        return $query->where('instructor_id', $instructorId);
    }

    /**
     * Scope for featured courses
     */
    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('status', 'approved')
            ->orderBy('enrollments_count', 'desc')
            ->orderBy('average_rating', 'desc');
    }
}
