<?php

namespace Modules\Course\Models;

use App\Models\ChunkedUpload;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

/**
 * @property int $id
 * @property string|null $title
 * @property int $sort
 * @property string $status
 * @property string|null $lesson_type
 * @property string|null $lesson_src
 * @property int|null $chunked_upload_id
 * @property Collection $resources
 */
class SectionLesson extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'title',
        'sort',
        'status',
        'lesson_type',
        'lesson_provider',
        'lesson_src',
        'chunked_upload_id',
        'embed_source',
        'thumbnail',
        'duration',
        'is_free',
        'description',
        'summary',
        'course_id',
        'lesson_number',
        'course_section_id',
    ];

    /**
     * Boot the model and set up event listeners
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $sectionQuery = self::query()->where('course_section_id', $model->course_section_id);
            $maxSort = $sectionQuery->max('sort');
            $lastLesson = self::query()
                ->where('course_id', $model->course_id)
                ->orderByDesc('lesson_number')
                ->select('id', 'lesson_number')
                ->first();

            $model->sort = $maxSort ? (int) $maxSort + 1 : 1;
            $model->lesson_number = $lastLesson ? $lastLesson->lesson_number + 1 : 1;
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

    // Relationships
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function course_section()
    {
        return $this->belongsTo(CourseSection::class);
    }

    public function forums(): HasMany
    {
        return $this->hasMany(CourseForum::class)->orderBy('created_at', 'desc');
    }

    public function resources(): HasMany
    {
        return $this->hasMany(LessonResource::class)->orderBy('created_at', 'desc');
    }

    public function chunkedUpload(): BelongsTo
    {
        return $this->belongsTo(ChunkedUpload::class);
    }

    // ==================== Query Scopes ====================

    /**
     * Scope to filter active lessons
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', 1);
    }

    /**
     * Scope to filter free lessons
     */
    public function scopeFree(Builder $query): Builder
    {
        return $query->where('is_free', 1);
    }

    /**
     * Scope to filter paid lessons
     */
    public function scopePaid(Builder $query): Builder
    {
        return $query->where('is_free', 0);
    }

    /**
     * Scope to filter by lesson type
     */
    public function scopeOfType(Builder $query, string $type): Builder
    {
        return $query->where('lesson_type', $type);
    }

    /**
     * Scope to filter video lessons
     */
    public function scopeVideoLessons(Builder $query): Builder
    {
        return $query->whereIn('lesson_type', ['video', 'embed']);
    }

    /**
     * Scope to filter by section
     */
    public function scopeOfSection(Builder $query, int $sectionId): Builder
    {
        return $query->where('course_section_id', $sectionId);
    }

    /**
     * Scope to filter by course
     */
    public function scopeOfCourse(Builder $query, int $courseId): Builder
    {
        return $query->where('course_id', $courseId);
    }

    /**
     * Scope to order by sort value
     */
    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort', 'asc');
    }

    /**
     * Scope to search by title
     */
    public function scopeSearch(Builder $query, string $searchTerm): Builder
    {
        return $query->where('title', 'LIKE', '%'.$searchTerm.'%');
    }

    /**
     * Scope to load commonly used relationships
     */
    public function scopeWithRelatedData(Builder $query): Builder
    {
        return $query->with(['course_section', 'resources', 'forums'])
            ->withCount(['resources', 'forums']);
    }
}
