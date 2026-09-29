<?php

namespace Modules\Course\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QuestionAnswer extends Model
{
    use HasFactory;

    protected $fillable = [
        'answers',
        'is_correct',
        'user_id',
        'quiz_question_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function quiz_question()
    {
        return $this->belongsTo(QuizQuestion::class);
    }

    // ==================== Query Scopes ====================

    public function scopeCorrect(Builder $query): Builder
    {
        return $query->where('is_correct', 1);
    }

    public function scopeIncorrect(Builder $query): Builder
    {
        return $query->where('is_correct', 0);
    }

    public function scopeOfUser(Builder $query, int $userId): Builder
    {
        return $query->where('user_id', $userId);
    }

    public function scopeOfQuestion(Builder $query, int $questionId): Builder
    {
        return $query->where('quiz_question_id', $questionId);
    }

    public function scopeWithRelatedData(Builder $query): Builder
    {
        return $query->with(['user', 'quiz_question']);
    }
}
