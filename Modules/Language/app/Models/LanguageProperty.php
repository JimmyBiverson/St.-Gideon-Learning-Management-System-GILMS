<?php

namespace Modules\Language\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $group
 * @property string $name
 * @property string $slug
 * @property string|null $properties
 * @property int $language_id
 */
class LanguageProperty extends Model
{
    protected $fillable = [
        'group',
        'name',
        'slug',
        'properties',
        'language_id',
    ];

    protected $casts = [
        'properties' => 'array',
    ];

    public function language()
    {
        return $this->belongsTo(Language::class);
    }
}
