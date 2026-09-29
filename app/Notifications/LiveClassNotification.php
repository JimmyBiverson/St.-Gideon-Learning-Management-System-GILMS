<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class LiveClassNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * Only plain values are carried here so the payload can be serialised
     * safely if the project is ever moved onto a queue worker.
     */
    public function __construct(private array $data, private ?bool $emailOverride = null) {}

    /**
     * Determine the action label used in the title and email subject.
     */
    private function actionLabel(): string
    {
        return match ($this->data['action']) {
            'updated' => 'updated',
            'deleted' => 'cancelled',
            default => 'scheduled',
        };
    }

    /**
     * Get the notification's delivery channels.
     *
     * The database channel is always present because it is what the in-app
     * notification bell renders. Email is opt-in per audience so that a large
     * student cohort can never slow down the request that scheduled the class.
     *
     * The database channel is listed first on purpose: should a mail server
     * reject an address, the in-app notification is already recorded and the
     * bell keeps working.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        $channels = ['database'];

        $emailAllowed = $this->emailOverride ?? (match ($notifiable->role) {
            'admin' => (bool) config('notifications.email_admins'),
            'instructor' => (bool) config('notifications.email_instructors'),
            default => (bool) config('notifications.email_students'),
        });

        if ($emailAllowed) {
            $channels[] = 'mail';
        }

        return $channels;
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $verb = $this->actionLabel();
        $isCancelled = $this->data['action'] === 'deleted';

        $message = (new MailMessage)
            ->subject('Live class '.$verb.': '.$this->data['course_title'])
            ->greeting('Hello '.$notifiable->name.',')
            ->line($this->data['actor'].' has '.$verb.' the live class "'.$this->data['topic'].'" on '.$this->data['course_title'].'.');

        if (! $isCancelled) {
            $message->line('It is scheduled for '.$this->data['start_at'].'.');
        }

        if (filled($this->data['note'] ?? null)) {
            $message->line($this->data['note']);
        }

        // A cancelled class has no page left to open, so the button is labelled
        // for what it actually leads to. Mail buttons need an absolute URL.
        $isCancelled
            ? $message->action('View course', $this->urlFor($notifiable, absolute: true))
            : $message->action('View live class', $this->urlFor($notifiable, absolute: true));

        return $message;
    }

    /**
     * Build the destination for the given recipient.
     *
     * Students are sent to the player page for the class, while admins and
     * instructors are sent to the course screen where live classes are managed.
     * In-app links stay relative so Inertia can resolve them without a round
     * trip; email links are absolute because mail clients cannot use them.
     */
    private function urlFor(object $notifiable, bool $absolute = false): string
    {
        if ($notifiable->role === 'student') {
            // A cancelled live class has been deleted, so its own page would
            // return a 404. Fall back to the course it belonged to.
            if ($this->data['action'] === 'deleted') {
                return route('course.details', [
                    'slug' => $this->data['course_slug'],
                    'id' => $this->data['course_id'],
                ], absolute: $absolute);
            }

            return route('live-class.start', $this->data['live_class_id'], absolute: $absolute);
        }

        return route('courses.edit', $this->data['course_id'], absolute: $absolute);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'title' => 'Live class '.$this->actionLabel().': '.$this->data['topic'],
            'body' => $this->body(),
            'url' => $this->urlFor($notifiable),
        ];
    }

    /**
     * Describe what actually happened, so an update is never reported as a
     * first-time scheduling.
     */
    private function body(): string
    {
        $actor = $this->data['actor'];
        $when = $this->data['start_at'];
        $course = $this->data['course_title'];

        return match ($this->data['action']) {
            'updated' => $actor.' updated this live class. It now starts on '.$when.'.',
            'deleted' => $actor.' cancelled this live class on '.$course.'.',
            default => $actor.' scheduled this live class for '.$when.'.',
        };
    }
}
