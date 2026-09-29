<?php

namespace Modules\Course\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QuizSubmission extends Model
{
    protected $fillable = [
        'user_id',
        'section_quiz_id',
        'attempts',
        'correct_answers',
        'incorrect_answers',
        'total_marks',
        'is_passed',
    ];

    protected $casts = [
        'is_passed' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function section_quiz(): BelongsTo
    {
        return $this->belongsTo(SectionQuiz::class);
    }

    // ==================== Query Scopes ====================

    public function scopePassed(Builder $query): Builder
    {
        return $query->where('is_passed', 1);
    }

    public function scopeFailed(Builder $query): Builder
    {
        return $query->where('is_passed', 0);
    }

    public function scopeOfUser(Builder $query, int $userId): Builder
    {
        return $query->where('user_id', $userId);
    }

    public function scopeOfQuiz(Builder $query, int $quizId): Builder
    {
        return $query->where('section_quiz_id', $quizId);
    }

    public function scopeWithRelatedData(Builder $query): Builder
    {
        return $query->with(['user', 'section_quiz']);
    }
}
