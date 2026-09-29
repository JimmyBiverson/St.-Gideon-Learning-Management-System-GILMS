<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * A generic per-locale text override for models that don't otherwise carry
 * a locale dimension (currently NavbarItem and FooterItem). Mirrors the
 * page_translations table used by the Web Builder — a missing row falls
 * back to the model's own (default-locale) column value.
 *
 * @property int $id
 * @property string $locale
 * @property string $translatable_type
 * @property int $translatable_id
 * @property string $field
 * @property string $value
 */
class SiteTranslation extends Model
{
    protected $fillable = [
        'locale',
        'translatable_type',
        'translatable_id',
        'field',
        'value',
    ];
}
