<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NavbarItem extends Model
{
    protected $fillable = [
        'sort',
        'type',
        'slug',
        'title',
        'value',
        'items',
        'active',
        'navbar_id',
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

    public function navbar(): BelongsTo
    {
        return $this->belongsTo(Navbar::class);
    }

    // ==================== Query Scopes ====================

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('active', 1);
    }

    public function scopeOfNavbar(Builder $query, int $navbarId): Builder
    {
        return $query->where('navbar_id', $navbarId);
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort', 'asc');
    }

    public function scopeWithRelatedData(Builder $query): Builder
    {
        return $query->with('navbar');
    }
}
