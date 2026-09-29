<?php

namespace Modules\Store\Models;

use App\Models\BaseModel;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ProductReview extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'review',
        'rating',
        'user_id',
        'product_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    // ==================== Query Scopes ====================

    /**
     * Scope to filter reviews by user
     */
    public function scopeOfUser(Builder $query, int $userId): Builder
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope to filter reviews by product
     */
    public function scopeOfProduct(Builder $query, int $productId): Builder
    {
        return $query->where('product_id', $productId);
    }
}
