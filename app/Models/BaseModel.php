<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class BaseModel extends Model
{
    /**
     * The "booted" method of the model.
     * Apply global scope to order by created_at DESC
     */
    protected static function booted(): void
    {
        static::addGlobalScope('order', function (Builder $builder) {
            $builder->orderBy('created_at', 'desc');
        });
    }

    /**
     * Scope to search categories by title
     */
    public function scopeSearch(Builder $query, string $column, string $value): Builder
    {
        return $query->where($column, 'LIKE', '%'.$value.'%');
    }

    /**
     * Scope to search categories by title
     */
    public function scopeSearchWhen(Builder $query, string $column, array $values, string $key): Builder
    {
        return $query->when(array_key_exists($key, $values) && ! empty($values[$key]), function ($query) use ($values, $key, $column) {
            return $query->where($column, 'LIKE', '%'.$values[$key].'%');
        });
    }
}
