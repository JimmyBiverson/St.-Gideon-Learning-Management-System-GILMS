<?php

namespace Modules\Store\Models;

use App\Models\BaseModel;
use App\Models\Instructor;
use App\Rules\RejectsExecutableExtension;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\File as PendingFile;

/**
 * @property float|null $average_rating
 * @property int $reviews_count
 * @property int $orders_count
 * @property int $orders_sum_quantity
 * @property Instructor|null $instructor
 */
class Product extends BaseModel implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    /**
     * Media collection holding the buyer-facing gallery images.
     */
    public const IMAGES_COLLECTION = 'images';

    /**
     * Media collection holding the downloadable product files.
     */
    public const FILES_COLLECTION = 'files';

    /**
     * Guard the downloadable-files collection against executable uploads at
     * the media-library layer, independent of request-level validation —
     * "digital product" files can be almost any type, so this can't rely on
     * a `mimes:` allow-list the way the gallery images collection does.
     */
    public function registerMediaCollections(): void
    {
        $this->addMediaCollection(self::FILES_COLLECTION)
            ->acceptsFile(function (PendingFile $file) {
                return ! RejectsExecutableExtension::isDenied(pathinfo($file->name, PATHINFO_EXTENSION));
            });
    }

    protected $fillable = [
        'title',
        'slug',
        'status',
        'summary',
        'description',

        'pricing_type',
        'price',
        'discount',
        'discount_price',

        'inventory',
        'unlimited_inventory',

        'featured',
        'views',
        'thumbnail',

        'meta_title',
        'meta_keywords',
        'meta_description',
        'og_title',
        'og_description',

        'instructor_id',
        'product_category_id',
        'product_category_child_id',
    ];

    public function product_category(): BelongsTo
    {
        return $this->belongsTo(ProductCategory::class);
    }

    public function product_category_child(): BelongsTo
    {
        return $this->belongsTo(ProductCategoryChild::class);
    }

    public function instructor(): BelongsTo
    {
        return $this->belongsTo(Instructor::class);
    }

    public function specifications(): HasMany
    {
        return $this->hasMany(ProductSpecification::class);
    }

    public function faqs(): HasMany
    {
        return $this->hasMany(ProductFaq::class);
    }

    public function wishlists(): HasMany
    {
        return $this->hasMany(ProductWishlist::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(ProductReview::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(ProductOrder::class);
    }

    /**
     * Buyer-facing gallery images, shaped for the frontend.
     *
     * @return array<int, array<string, mixed>>
     */
    public function getImagesAttribute(): array
    {
        return $this->getMedia(self::IMAGES_COLLECTION)->map(fn ($media) => [
            'id' => $media->id,
            'name' => $media->file_name,
            'url' => $media->getUrl(),
            'size' => $media->size,
            'mime_type' => $media->mime_type,
        ])->all();
    }

    /**
     * Downloadable files, shaped for the frontend. Only expose this to
     * owners/purchasers — the file URL is not access-controlled on its own.
     *
     * @return array<int, array<string, mixed>>
     */
    public function getFilesAttribute(): array
    {
        return $this->getMedia(self::FILES_COLLECTION)->map(fn ($media) => [
            'id' => $media->id,
            'name' => $media->name ?: $media->file_name,
            'url' => $media->getUrl(),
            'size' => $media->size,
            'mime_type' => $media->mime_type,
        ])->all();
    }

    // ==================== Query Scopes ====================

    /**
     * Scope to filter approved products
     */
    public function scopeApproved(Builder $query): Builder
    {
        return $query->where('status', 'approved');
    }

    /**
     * Scope to filter free products
     */
    public function scopeFree(Builder $query): Builder
    {
        return $query->where('pricing_type', 'free');
    }

    /**
     * Scope to filter paid products
     */
    public function scopePaid(Builder $query): Builder
    {
        return $query->where('pricing_type', 'paid');
    }

    /**
     * Scope to filter products by category
     */
    public function scopeInCategory(Builder $query, string $categoryId): Builder
    {
        return $query->where('product_category_id', $categoryId);
    }

    /**
     * Scope to filter products by category child
     */
    public function scopeInCategoryChild(Builder $query, string $categoryChildId): Builder
    {
        return $query->where('product_category_child_id', $categoryChildId);
    }

    /**
     * Scope to filter products owned by specific instructor
     */
    public function scopeOwnedBy(Builder $query, int $instructorId): Builder
    {
        return $query->where('instructor_id', $instructorId);
    }

    /**
     * Scope for featured products
     */
    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('featured', true);
    }

    /**
     * Scope to filter products that are still in stock (or unlimited)
     */
    public function scopeInStock(Builder $query): Builder
    {
        return $query->where(function ($q) {
            $q->where('unlimited_inventory', true)
                ->orWhere('inventory', '>', 0);
        });
    }
}
