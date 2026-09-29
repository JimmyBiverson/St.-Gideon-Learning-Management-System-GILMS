<?php

namespace Modules\Frontend\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

/**
 * @property int $id
 * @property int $project_id
 * @property string $title
 * @property string|null $slug
 * @property string|null $url
 * @property string $type
 * @property string $status
 */
class ProjectPage extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'title',
        'slug',
        'url',
        'type',
        'status',
        'description',
        'content',
        'banner',
        'project_id',
    ];

    protected $casts = [
        'status' => 'boolean',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }

    public function translations()
    {
        return $this->hasMany(PageTranslation::class);
    }
}
