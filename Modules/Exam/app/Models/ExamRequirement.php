<?php

namespace Modules\Exam\Models;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExamRequirement extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'exam_id',
        'requirement',
        'sort',
    ];

    protected $casts = [
        'sort' => 'integer',
    ];

    /**
     * Boot the model and set up event listeners
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $maxSort = self::max('sort');
            $model->sort = $maxSort ? (int) $maxSort + 1 : 1;
        });
    }

    public function exam(): BelongsTo
    {
        return $this->belongsTo(Exam::class);
    }
}
