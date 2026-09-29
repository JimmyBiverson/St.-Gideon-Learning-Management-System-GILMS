<?php

namespace Modules\Store\Models;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

/**
 * @property Collection<int, Product> $products
 * @property int $products_count
 */
class ProductCategory extends BaseModel implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'title',
        'slug',
        'icon',
        'sort',
        'status',
        'description',
        'thumbnail',
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

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function category_children()
    {
        return $this->hasMany(ProductCategoryChild::class);
    }

    // ==================== Query Scopes ====================

    /**
     * Scope to filter active categories
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', 1);
    }

    /**
     * Scope to filter categories by slug
     */
    public function scopeBySlug(Builder $query, ?string $slug): Builder
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
     * Scope to count products in each category
     */
    public function scopeCountProducts(Builder $query, ?string $status): Builder
    {
        return $query->withCount(['products' => function ($query) use ($status) {
            if ($status) {
                $query->where('status', $status);
            }
        }]);
    }
}
