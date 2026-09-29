<?php

namespace Modules\Exam\Models;

use App\Models\BaseModel;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $user_id
 * @property int $exam_id
 * @property string $enrollment_type
 * @property \Carbon\Carbon|null $entry_date
 * @property \Carbon\Carbon|null $expiry_date
 * @property \Modules\Exam\Models\Exam|null $exam
 */
class ExamEnrollment extends BaseModel
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'exam_id',
        'enrollment_type',
        'entry_date',
        'expiry_date',
    ];

    protected $casts = [
        'entry_date' => 'datetime',
        'expiry_date' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function exam(): BelongsTo
    {
        return $this->belongsTo(Exam::class);
    }

    public function isActive(): bool
    {
        return $this->enrollment_type === 'lifetime' ||
           ($this->expiry_date && now()->lt($this->expiry_date));
    }

    // ==================== Query Scopes ====================

    /**
     * Scope to filter lifetime enrollments
     */
    public function scopeLifetime(Builder $query): Builder
    {
        return $query->where('enrollment_type', 'lifetime');
    }

    /**
     * Scope to filter time-limited enrollments
     */
    public function scopeLimitedTime(Builder $query): Builder
    {
        return $query->where('enrollment_type', '!=', 'lifetime');
    }

    /**
     * Scope to filter active enrollments
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where(function ($q) {
            $q->where('enrollment_type', 'lifetime')
                ->orWhere(function ($subQ) {
                    $subQ->whereNotNull('expiry_date')
                        ->where('expiry_date', '>', now());
                });
        });
    }

    /**
     * Scope to filter expired enrollments
     */
    public function scopeExpired(Builder $query): Builder
    {
        return $query->where('enrollment_type', '!=', 'lifetime')
            ->where(function ($q) {
                $q->whereNull('expiry_date')
                    ->orWhere('expiry_date', '<=', now());
            });
    }

    /**
     * Scope to filter enrollments by user
     */
    public function scopeOfUser(Builder $query, int $userId): Builder
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope to filter enrollments by exam
     */
    public function scopeOfExam(Builder $query, int $examId): Builder
    {
        return $query->where('exam_id', $examId);
    }

    /**
     * Scope to filter enrollments by instructor (via exam)
     */
    public function scopeByInstructor(Builder $query, int $instructorId): Builder
    {
        return $query->whereHas('exam', function (Builder $q) use ($instructorId) {
            $q->where('instructor_id', $instructorId);
        });
    }
}
