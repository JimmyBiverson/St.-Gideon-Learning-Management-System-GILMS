<?php

namespace Modules\Exam\Models;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $exam_question_id
 * @property string $option_text
 * @property bool $is_correct
 * @property int $sort
 */
class ExamQuestionOption extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'exam_question_id',
        'option_text',
        'is_correct',
        'sort',
    ];

    protected $casts = [
        'is_correct' => 'boolean',
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

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::addGlobalScope('order', function (Builder $builder) {
            $builder->orderBy('sort', 'asc');
        });
    }

    public function exam_question(): BelongsTo
    {
        return $this->belongsTo(ExamQuestion::class);
    }
}
