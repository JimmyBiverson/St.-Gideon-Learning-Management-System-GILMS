<?php

namespace App\Services;

use App\Models\User;
use App\Notifications\LiveClassNotification;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use Modules\Course\Models\Course;
use Modules\Course\Models\CourseEnrollment;
use Modules\Course\Models\CourseLiveClass;

class NotificationAudienceService
{
    /**
     * Notify everyone concerned by a change to a live class.
     *
     * A live class always belongs to a course, so a single change concerns
     * three audiences:
     *   - administrators, who are responsible for the schedule
     *   - the instructor who owns the course, when an admin made the change
     *   - students who are actively enrolled on the course
     *
     * The actor is never notified about their own action. Each audience is
     * resolved and delivered independently so that a problem with one of them
     * can never stop the others, and can never prevent the live class itself
     * from being saved, rescheduled or cancelled.
     */
    public function liveClassChanged(CourseLiveClass $liveClass, string $action, ?User $actor = null): void
    {
        try {
            $course = $liveClass->course;

            if (! $course) {
                return;
            }

            $payload = $this->payload($liveClass, $course, $action, $actor);

            $this->deliver('admins', fn () => $this->adminsFor($actor), $payload);
            $this->deliver('instructors', fn () => $this->instructorsFor($course, $actor?->id), $payload);
            $this->deliver('students', fn () => $this->studentsFor($liveClass->course_id, $actor?->id), $payload);
        } catch (\Throwable $e) {
            Log::warning('Live class notification could not be built: '.$e->getMessage());
        }
    }

    /**
     * Resolve and notify a single audience, isolating any failure.
     */
    private function deliver(string $audience, callable $resolve, array $payload): void
    {
        try {
            $recipients = $resolve();

            if ($recipients->isEmpty()) {
                return;
            }

            // Student mail is synchronous, so it is only attempted while the
            // cohort is small enough to stay fast AND the environment explicitly
            // allows student email. Everyone still receives the in-app
            // notification regardless of the size of the cohort.
            $emailOverride = null;
            if ($audience === 'students') {
                $allowed = (bool) config('notifications.email_students');
                $withinLimit = $recipients->count() <= (int) config('notifications.student_email_limit');

                $emailOverride = $allowed && $withinLimit;
            }

            /*
             * Sent one recipient at a time, with a fresh notification instance
             * per recipient.
             *
             * A single `Notification::send($collection, ...)` aborts the whole
             * loop on the first recipient whose channel throws, so everyone
             * after that point silently received nothing. One bad mailbox could
             * therefore cost the rest of the audience their in-app notification
             * as well, which is the opposite of the isolation this class
             * promises. The database channel is still written first for each
             * recipient, so a mail failure never costs someone their in-app row.
             *
             * This is a synchronous send on a rare, staff-triggered action, so
             * the extra queries are not worth trading correctness for.
             */
            $failed = 0;

            foreach ($recipients as $recipient) {
                try {
                    Notification::send($recipient, new LiveClassNotification($payload, $emailOverride));
                } catch (\Throwable $e) {
                    $failed++;

                    Log::warning(sprintf(
                        'Live class notification delivery failed for %s to user #%s: %s',
                        $audience,
                        $recipient->getKey(),
                        $e->getMessage()
                    ));
                }
            }

            if ($failed > 0) {
                Log::warning(sprintf(
                    'Live class notification: %d of %d %s recipients failed to deliver.',
                    $failed,
                    $recipients->count(),
                    $audience
                ));
            }
        } catch (\Throwable $e) {
            Log::warning("Live class notification failed for {$audience}: ".$e->getMessage());
        }
    }

    /**
     * Build the notification payload.
     *
     * @return array<string, mixed>
     */
    private function payload(CourseLiveClass $liveClass, Course $course, string $action, ?User $actor): array
    {
        return [
            'action' => $action,
            'topic' => (string) $liveClass->class_topic,
            'course_title' => (string) $course->title,
            'course_id' => (int) $course->id,
            'live_class_id' => (int) $liveClass->id,
            'start_at' => $liveClass->class_date_and_time
                ? $liveClass->class_date_and_time->format('d M Y, g:i a')
                : '',
            'actor' => $actor?->name ?? 'An administrator',
            'course_slug' => (string) $course->slug,
            'note' => $liveClass->class_note,
        ];
    }

    /**
     * Every administrator except the one who made the change.
     *
     * @return Collection<int, User>
     */
    private function adminsFor(?User $actor): Collection
    {
        return User::admins()->active()
            ->where('id', '!=', $actor?->id ?? 0)
            ->get();
    }

    /**
     * The instructor who owns the course, resolved to their user account.
     *
     * @return Collection<int, User>
     */
    private function instructorsFor(Course $course, ?int $actorId): Collection
    {
        $userId = $course->instructor?->user_id;

        if (! $userId || $userId === $actorId) {
            return collect();
        }

        return User::instructors()->active()
            ->where('id', $userId)
            ->get();
    }

    /**
     * Students with an active enrollment on the course.
     *
     * The base model applies a global created_at ordering, which MySQL refuses
     * to combine with a SQL DISTINCT, so duplicates are collapsed in PHP.
     *
     * @return Collection<int, User>
     */
    private function studentsFor(int $courseId, ?int $actorId): Collection
    {
        $studentIds = CourseEnrollment::active()
            ->ofCourse($courseId)
            ->where('user_id', '!=', $actorId ?? 0)
            ->pluck('user_id')
            ->unique()
            ->values();

        if ($studentIds->isEmpty()) {
            return collect();
        }

        return User::students()->active()
            ->whereIn('id', $studentIds)
            ->get();
    }
}
