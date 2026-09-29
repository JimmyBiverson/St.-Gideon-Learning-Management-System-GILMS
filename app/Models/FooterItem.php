<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FooterItem extends Model
{
    protected $fillable = [
        'sort',
        'type',
        'slug',
        'title',
        'items',
        'active',
        'footer_id',
    ];

    protected $casts = [
        'sort' => 'integer',
        'active' => 'boolean',
        'items' => 'array',
    ];

    protected $attributes = [
        'items' => '[]',
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

    public function footer(): BelongsTo
    {
        return $this->belongsTo(Footer::class);
    }

    // ==================== Query Scopes ====================

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('active', 1);
    }

    public function scopeOfFooter(Builder $query, int $footerId): Builder
    {
        return $query->where('footer_id', $footerId);
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort', 'asc');
    }

    public function scopeWithRelatedData(Builder $query): Builder
    {
        return $query->with('footer');
    }
}
