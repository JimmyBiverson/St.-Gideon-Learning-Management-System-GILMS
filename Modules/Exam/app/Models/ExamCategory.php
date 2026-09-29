<?php

namespace Modules\Exam\Models;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

/**
 * @property string $title
 * @property string|null $description
 * @property int $exams_count
 */
class ExamCategory extends BaseModel implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'title',
        'slug',
        'icon',
        'description',
        'sort',
        'status',
        'thumbnail',
    ];

    protected $casts = [
        'status' => 'boolean',
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

    public function exams(): HasMany
    {
        return $this->hasMany(Exam::class)->orderBy('created_at', 'desc');
    }

    // ==================== Query Scopes ====================

    /**
     * Scope to filter active categories
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', true);
    }

    /**
     * Scope to filter by slug
     */
    public function scopeBySlug(Builder $query, string $slug): Builder
    {
        return $query->where('slug', $slug);
    }

    /**
     * Scope to filter out default category
     */
    public function scopeNotDefault(Builder $query): Builder
    {
        return $query->where('slug', '!=', 'default');
    }

    /**
     * Scope to count exams in each category
     */
    public function scopeCountExams(Builder $query, ?string $status = null): Builder
    {
        return $query->withCount(['exams' => function ($query) use ($status) {
            if ($status) {
                $query->where('status', $status);
            }
        }]);
    }
}
