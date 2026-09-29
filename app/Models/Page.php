<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $name
 * @property string $slug
 * @property string|null $title
 */
class Page extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'slug',
        'title',
        'banner',
        'favicon',
        'description',
        'meta_description',
        'meta_keywords',
        'active',
    ];

    protected $casts = [
        'active' => 'boolean',
    ];

    /**
     * Get all sections for this page
     */
    public function sections(): HasMany
    {
        return $this->hasMany(PageSection::class, 'page_id');
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
        return $query->with('sections')->withCount('sections');
    }
}
