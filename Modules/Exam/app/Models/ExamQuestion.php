<?php

namespace Modules\Exam\Models;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;

/**
 * @property int $exam_id
 * @property string $title
 * @property string $question_type
 * @property float $marks
 */
class ExamQuestion extends BaseModel implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $fillable = [
        'exam_id',
        'question_type',
        'title',
        'description',
        'marks',
        'sort',
        'options',
    ];

    protected $casts = [
        'marks' => 'decimal:2',
        'sort' => 'integer',
        'options' => 'array',
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

    public function exam(): BelongsTo
    {
        return $this->belongsTo(Exam::class);
    }

    public function question_options(): HasMany
    {
        return $this->hasMany(ExamQuestionOption::class);
    }

    public function attempt_answers(): HasMany
    {
        return $this->hasMany(ExamAttemptAnswer::class);
    }
}
