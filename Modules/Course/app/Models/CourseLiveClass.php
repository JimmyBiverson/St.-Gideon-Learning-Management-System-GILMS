<?php

namespace Modules\Course\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property Course $course
 */
class CourseLiveClass extends Model
{
    use HasFactory;

    protected $fillable = [
        'provider',
        'class_topic',
        'class_date_and_time',
        'class_note',
        'additional_info',
        'course_id',
    ];

    protected $casts = [
        'class_date_and_time' => 'datetime',
        'additional_info' => 'array',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get additional_info as array regardless of storage format
     */
    public function getAdditionalInfoArray()
    {
        if (is_string($this->additional_info)) {
            return $this->additional_info ?: [];
        } elseif (is_array($this->additional_info)) {
            return $this->additional_info;
        }

        return [];
    }

    /**
     * Check if the class is upcoming
     */
    public function isUpcoming()
    {
        return $this->class_date_and_time > now();
    }

    /**
     * Check if the class has started but not ended (assuming 1 hour duration)
     */
    public function isLive()
    {
        $now = now();
        $classStart = $this->class_date_and_time;
        $classEnd = $classStart->copy()->addHour();

        return $now >= $classStart && $now <= $classEnd;
    }

    /**
     * Check if the class has ended
     */
    public function hasEnded()
    {
        return $this->class_date_and_time->addHour() < now();
    }

    // ==================== Query Scopes ====================

    public function scopeUpcoming(Builder $query): Builder
    {
        return $query->where('class_date_and_time', '>', now());
    }

    public function scopePast(Builder $query): Builder
    {
        return $query->where('class_date_and_time', '<', now()->subHour());
    }

    public function scopeOfCourse(Builder $query, int $courseId): Builder
    {
        return $query->where('course_id', $courseId);
    }

    public function scopeWithRelatedData(Builder $query): Builder
    {
        return $query->with('course');
    }
}
