<?php

namespace Modules\Frontend\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $project_page_id
 * @property string $locale
 * @property string $element_id
 * @property string $field
 * @property string $value
 */
class PageTranslation extends Model
{
    protected $fillable = [
        'project_page_id',
        'locale',
        'element_id',
        'field',
        'value',
    ];

    public function page()
    {
        return $this->belongsTo(ProjectPage::class, 'project_page_id');
    }
}
