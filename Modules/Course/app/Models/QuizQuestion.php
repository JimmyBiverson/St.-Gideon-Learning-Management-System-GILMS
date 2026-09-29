<?php

namespace Modules\Course\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuizQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'type',
        'answer',
        'options',
        'sort',
        'section_quiz_id',
    ];

    /**
     * Boot the model and set up event listeners
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $maxSort = self::query()
                ->where('section_quiz_id', $model->section_quiz_id)
                ->max('sort');
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

    /**
     * Get the quiz that owns the question.
     */
    public function lesson_quiz()
    {
        return $this->belongsTo(SectionQuiz::class);
    }

    public function answers()
    {
        return $this->hasMany(QuestionAnswer::class);
    }

    // ==================== Query Scopes ====================

    public function scopeOfQuiz(Builder $query, int $quizId): Builder
    {
        return $query->where('section_quiz_id', $quizId);
    }

    public function scopeOfType(Builder $query, string $type): Builder
    {
        return $query->where('type', $type);
    }

    public function scopeWithRelatedData(Builder $query): Builder
    {
        return $query->with(['lesson_quiz', 'answers'])->withCount('answers');
    }
}
