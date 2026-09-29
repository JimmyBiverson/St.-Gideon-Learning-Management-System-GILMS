<?php

namespace Modules\Certification\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $type
 * @property string $name
 * @property string|null $logo_path
 * @property array|null $template_data
 * @property bool $is_active
 * @property bool $is_default
 */
class MarksheetTemplate extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'type',
        'name',
        'logo_path',
        'template_data',
        'is_active',
        'is_default',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'template_data' => 'array',
        'is_active' => 'boolean',
        'is_default' => 'boolean',
    ];

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        // Ensure only one template is active at a time
        static::saving(function ($template) {
            if ($template->is_active) {
                static::where('id', '!=', $template->id)
                    ->update(['is_active' => false]);
            }
        });
    }

    // protected static function newFactory(): MarksheetTemplateFactory
    // {
    //     // return MarksheetTemplateFactory::new();
    // }
}
