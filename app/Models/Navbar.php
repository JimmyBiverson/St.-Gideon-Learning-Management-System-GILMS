<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Navbar extends Model
{
    protected $fillable = [
        'slug',
        'title',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    /**
     * Get all navbar items for this navbar
     */
    public function navbarItems(): HasMany
    {
        return $this->hasMany(NavbarItem::class)->orderBy('sort');
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
        return $query->with('navbarItems')->withCount('navbarItems');
    }
}
