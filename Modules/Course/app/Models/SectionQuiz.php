<?php

namespace Modules\Course\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property Collection<int, QuizQuestion> $quiz_questions
 * @property Collection<int, QuizSubmission> $quiz_submissions
 * @property int $quiz_questions_count
 * @property int $quiz_submissions_count
 * @property int $total_mark
 */
class SectionQuiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'duration',
        'hours',
        'minutes',
        'seconds',
        'total_mark',
        'pass_mark',
        'retake',
        'drip_rule',
        'summary',
        'num_questions',
        'course_id',
        'course_section_id',
    ];

    // Relationships
    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function course_section()
    {
        return $this->belongsTo(CourseSection::class);
    }

    public function quiz_questions()
    {
        return $this->hasMany(QuizQuestion::class);
    }

    public function quiz_submissions()
    {
        return $this->hasMany(QuizSubmission::class);
    }

    // ==================== Query Scopes ====================

    public function scopeOfCourse(Builder $query, int $courseId): Builder
    {
        return $query->where('course_id', $courseId);
    }

    public function scopeOfSection(Builder $query, int $sectionId): Builder
    {
        return $query->where('course_section_id', $sectionId);
    }

    public function scopeWithRelatedData(Builder $query): Builder
    {
        return $query->with(['course_section', 'quiz_questions', 'quiz_submissions'])
            ->withCount(['quiz_questions', 'quiz_submissions']);
    }
}
