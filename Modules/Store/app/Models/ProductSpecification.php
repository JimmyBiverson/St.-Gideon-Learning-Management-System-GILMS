<?php

namespace Modules\Store\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductSpecification extends Model
{
    protected $fillable = [
        'product_id',
        'title',
        'value',
        'sort',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    public function scopeOfProduct(Builder $query, int $productId): Builder
    {
        return $query->where('product_id', $productId)->orderBy('sort');
    }
}
