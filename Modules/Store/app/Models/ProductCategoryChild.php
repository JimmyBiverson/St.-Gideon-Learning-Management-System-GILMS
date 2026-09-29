<?php

namespace Modules\Store\Models;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductCategoryChild extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'icon',
        'sort',
        'status',
        'description',
        'product_category_id',
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

    public function product_category()
    {
        return $this->belongsTo(ProductCategory::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
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
        return $query->where('product_category_id', $categoryId);
    }

    /**
     * Scope to filter by slug
     */
    public function scopeBySlug(Builder $query, ?string $slug): Builder
    {
        return $query->where('slug', $slug);
    }

    /**
     * Scope to count products in each subcategory
     */
    public function scopeCountProducts(Builder $query, ?string $status = null): Builder
    {
        return $query->withCount(['products' => function ($query) use ($status) {
            if ($status) {
                $query->where('status', $status);
            }
        }]);
    }
}
