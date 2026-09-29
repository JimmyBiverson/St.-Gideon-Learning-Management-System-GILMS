<?php

namespace Modules\Exam\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property int $user_id
 * @property int $exam_id
 * @property int $attempt_number
 * @property string|null $status
 * @property \Carbon\Carbon|null $start_time
 * @property \Carbon\Carbon|null $end_time
 * @property float $total_marks
 * @property float $obtained_marks
 * @property bool $is_passed
 * @property int $correct_answers
 * @property int $incorrect_answers
 * @property \Modules\Exam\Models\Exam|null $exam
 * @property \Illuminate\Database\Eloquent\Collection $attempt_answers
 */
class ExamAttempt extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'exam_id',
        'attempt_number',
        'start_time',
        'end_time',
        'total_marks',
        'obtained_marks',
        'correct_answers',
        'incorrect_answers',
        'is_passed',
        'status',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'total_marks' => 'decimal:2',
        'obtained_marks' => 'decimal:2',
        'correct_answers' => 'integer',
        'incorrect_answers' => 'integer',
        'is_passed' => 'boolean',
        'attempt_number' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function exam(): BelongsTo
    {
        return $this->belongsTo(Exam::class);
    }

    public function attempt_answers(): HasMany
    {
        return $this->hasMany(ExamAttemptAnswer::class);
    }

    public function getPercentageAttribute(): float
    {
        if ($this->total_marks == 0) {
            return 0;
        }

        return ($this->obtained_marks / $this->total_marks) * 100;
    }

    public function getDurationAttribute(): ?int
    {
        if ($this->start_time && $this->end_time) {
            return (int) $this->start_time->diffInMinutes($this->end_time);
        }

        return null;
    }
}
