<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Modules\Blog\Models\Blog;
use Modules\Blog\Models\BlogCategory;
use Modules\Course\Models\Course;
use Modules\Course\Models\CourseCategory;
use Modules\Exam\Models\Exam;
use Modules\Exam\Models\ExamCategory;

class FrontendCollection extends Model
{
    protected $fillable = [
        'type',
        'best',
        'top',
        'new',
        'featured',
        'trending',
        'popular',
    ];

    protected $casts = [
        'best' => 'string',
        'top' => 'array',
        'new' => 'array',
        'featured' => 'array',
        'trending' => 'array',
        'popular' => 'array',
    ];

    /**
     * Map collection types to their corresponding models
     */
    protected static function getModelClass(string $type): ?string
    {
        $modelMap = [
            'courses' => Course::class,
            'exams' => Exam::class,
            'blogs' => Blog::class,
            'instructors' => Instructor::class,
            'course_categories' => CourseCategory::class,
            'exam_categories' => ExamCategory::class,
            'blog_categories' => BlogCategory::class,
            'testimonials' => null, // Testimonials are stored as static data, not models
            'sponsors' => null, // Sponsors are stored as static data, not models
        ];

        return $modelMap[$type] ?? null;
    }

    /**
     * Get relationships to eager load based on type
     */
    protected static function getEagerLoadRelations(string $type): array
    {
        $relationsMap = [
            'courses' => [
                'course_category',
                'sections.section_lessons',
                'sections.section_quizzes',
            ],
            'exams' => [],
            'blogs' => ['user'],
            'instructors' => [
                'user',
                'courses',
            ],
            'course_categories' => [],
            'exam_categories' => [],
            'blog_categories' => [],
            'testimonials' => [],
            'sponsors' => [],
        ];

        return $relationsMap[$type] ?? [];
    }

    /**
     * Get relationships to eager load for featured items only
     */
    protected static function getFeaturedEagerLoadRelations(string $type): array
    {
        $relationsMap = [
            'courses' => [],
            'exams' => [],
            'blogs' => [],
            'instructors' => [],
            'course_categories' => [
                'courses.instructor.user',
                'courses.course_category:id,slug,title',
                'courses.sections.section_lessons',
                'courses.sections.section_quizzes',
            ],
            'exam_categories' => [],
            'blog_categories' => [],
            'testimonials' => [],
            'sponsors' => [],
        ];

        return $relationsMap[$type] ?? [];
    }

    /**
     * Get relationship counts to load based on type
     */
    protected static function getCountRelations(string $type): array
    {
        $countsMap = [
            'courses' => [
                'enrollments',
            ],
            'exams' => [],
            'blogs' => [],
            'instructors' => [
                'courses',
            ],
            'course_categories' => [
                'courses',
            ],
            'exam_categories' => [
                'exams',
            ],
            'blog_categories' => [
                'blogs',
            ],
            'testimonials' => [],
            'sponsors' => [],
        ];

        return $countsMap[$type] ?? [];
    }

    /**
     * Get the collection data with model instances
     */
    public function getBestData()
    {
        if (! $this->best) {
            return null;
        }

        $modelClass = self::getModelClass($this->type);
        if (! $modelClass) {
            return null;
        }

        $relations = self::getEagerLoadRelations($this->type);
        $counts = self::getCountRelations($this->type);
        $query = $modelClass::query();

        if (! empty($relations)) {
            $query->with($relations);
        }

        if (! empty($counts)) {
            $query->withCount($counts);
        }

        return $query->find($this->best);
    }

    /**
     * Get top collection data with model instances
     */
    public function getTopData()
    {
        if (! $this->top || empty($this->top)) {
            return collect([]);
        }

        $modelClass = self::getModelClass($this->type);
        if (! $modelClass) {
            return collect([]);
        }

        $relations = self::getEagerLoadRelations($this->type);
        $counts = self::getCountRelations($this->type);
        $query = $modelClass::whereIn('id', $this->top);

        if (! empty($relations)) {
            $query->with($relations);
        }

        if (! empty($counts)) {
            $query->withCount($counts);
        }

        return $query->orderByRaw('FIELD(id, '.implode(',', $this->top).')')
            ->get();
    }

    /**
     * Get new collection data with model instances
     */
    public function getNewData()
    {
        if (! $this->new || empty($this->new)) {
            return collect([]);
        }

        $modelClass = self::getModelClass($this->type);
        if (! $modelClass) {
            return collect([]);
        }

        $relations = self::getEagerLoadRelations($this->type);
        $counts = self::getCountRelations($this->type);
        $query = $modelClass::whereIn('id', $this->new);

        if (! empty($relations)) {
            $query->with($relations);
        }

        if (! empty($counts)) {
            $query->withCount($counts);
        }

        return $query->orderByRaw('FIELD(id, '.implode(',', $this->new).')')
            ->get();
    }

    /**
     * Get featured collection data with model instances
     */
    public function getFeaturedData()
    {
        if (! $this->featured || empty($this->featured)) {
            return collect([]);
        }

        $modelClass = self::getModelClass($this->type);
        if (! $modelClass) {
            return collect([]);
        }

        // Use featured-specific relations for enhanced data loading
        $relations = self::getFeaturedEagerLoadRelations($this->type);
        $counts = self::getCountRelations($this->type);
        $query = $modelClass::whereIn('id', $this->featured);

        if (! empty($relations)) {
            $query->with($relations);
        }

        if (! empty($counts)) {
            $query->withCount($counts);
        }

        return $query->orderByRaw('FIELD(id, '.implode(',', $this->featured).')')
            ->get();
    }

    /**
     * Get trending collection data with model instances
     */
    public function getTrendingData()
    {
        if (! $this->trending || empty($this->trending)) {
            return collect([]);
        }

        $modelClass = self::getModelClass($this->type);
        if (! $modelClass) {
            return collect([]);
        }

        $relations = self::getEagerLoadRelations($this->type);
        $counts = self::getCountRelations($this->type);
        $query = $modelClass::whereIn('id', $this->trending);

        if (! empty($relations)) {
            $query->with($relations);
        }

        if (! empty($counts)) {
            $query->withCount($counts);
        }

        return $query->orderByRaw('FIELD(id, '.implode(',', $this->trending).')')
            ->get();
    }

    /**
     * Get popular collection data with model instances
     */
    public function getPopularData()
    {
        if (! $this->popular || empty($this->popular)) {
            return collect([]);
        }

        $modelClass = self::getModelClass($this->type);
        if (! $modelClass) {
            return collect([]);
        }

        $relations = self::getEagerLoadRelations($this->type);
        $counts = self::getCountRelations($this->type);
        $query = $modelClass::whereIn('id', $this->popular);

        if (! empty($relations)) {
            $query->with($relations);
        }

        if (! empty($counts)) {
            $query->withCount($counts);
        }

        return $query->orderByRaw('FIELD(id, '.implode(',', $this->popular).')')
            ->get();
    }

    // ==================== Query Scopes ====================

    public function scopeOfType(Builder $query, string $type): Builder
    {
        return $query->where('type', $type);
    }
}
