<?php

namespace Modules\Certification\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

class CertificateTemplate extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

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
}
