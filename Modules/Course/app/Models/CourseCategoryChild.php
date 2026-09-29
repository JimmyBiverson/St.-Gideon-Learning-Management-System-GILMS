<?php

namespace Modules\Course\Models;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CourseCategoryChild extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'icon',
        'sort',
        'status',
        'description',
        'course_category_id',
    ];

    /**
     * Boot the model and set up event listeners
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $maxSort = self::max('sort');
            $model->sort = $maxSort ? (int) $maxSort + 1 : 1;
        });
    }

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::addGlobalScope('order', function (Builder $builder) {
            $builder->orderBy('sort', 'asc');
        });
    }

    public function course_category()
    {
        return $this->belongsTo(CourseCategory::class);
    }

    public function courses()
    {
        return $this->hasMany(Course::class);
    }

    // ==================== Query Scopes ====================

    /**
     * Scope to filter active subcategories
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', 1);
    }

    /**
     * Scope to filter by parent category
     */
    public function scopeOfCategory(Builder $query, int $categoryId): Builder
    {
        return $query->where('course_category_id', $categoryId);
    }

    /**
     * Scope to filter by slug
     */
    public function scopeBySlug(Builder $query, ?string $slug): Builder
    {
        return $query->where('slug', $slug);
    }

    /**
     * Scope to count courses in each subcategory
     */
    public function scopeCountCourses(Builder $query, ?string $status = null): Builder
    {
        return $query->withCount(['courses' => function ($query) use ($status) {
            if ($status) {
                $query->where('status', $status);
            }
        }]);
    }
}
