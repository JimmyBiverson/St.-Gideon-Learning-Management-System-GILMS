<?php

namespace Modules\Blog\Models;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

class BlogCategory extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'icon',
        'sort',
        'description',
        'status',
    ];

    protected $attributes = [
        'status' => 'active',
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

    public function blogs(): HasMany
    {
        return $this->hasMany(Blog::class, 'blog_category_id');
    }

    // ==================== Query Scopes ====================

    /**
     * Scope to filter active categories
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope to filter inactive categories
     */
    public function scopeInactive(Builder $query): Builder
    {
        return $query->where('status', 'inactive');
    }

    /**
     * Scope to filter by slug
     */
    public function scopeBySlug(Builder $query, string $slug): Builder
    {
        return $query->where('slug', $slug);
    }

    /**
     * Scope to count blogs in each category
     */
    public function scopeCountBlogs(Builder $query, ?string $status = null): Builder
    {
        return $query->withCount(['blogs' => function ($query) use ($status) {
            if ($status) {
                $query->where('status', $status);
            }
        }]);
    }

    /**
     * Get available statuses.
     */
    public static function getStatuses(): array
    {
        return [
            'active' => 'Active',
            'inactive' => 'Inactive',
        ];
    }
}
