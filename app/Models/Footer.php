<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Footer extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    /**
     * Get all footer items for this footer
     */
    public function footerItems(): HasMany
    {
        return $this->hasMany(FooterItem::class);
    }

    // ==================== Query Scopes ====================

    public function scopeActive(Builder $query): Builder
    {
        return $query->where('active', 1);
    }

    public function scopeBySlug(Builder $query, string $slug): Builder
    {
        return $query->where('slug', $slug);
    }

    public function scopeWithRelatedData(Builder $query): Builder
    {
        return $query->with('footerItems')->withCount('footerItems');
    }
}
