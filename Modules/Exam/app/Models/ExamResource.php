<?php

namespace Modules\Exam\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $exam_id
 * @property string|null $title
 * @property string|null $resource
 */
class ExamResource extends Model
{
    protected $fillable = [
        'title',
        'type',
        'resource',
        'exam_id',
    ];

    public function exam()
    {
        return $this->belongsTo(Exam::class);
    }
}
