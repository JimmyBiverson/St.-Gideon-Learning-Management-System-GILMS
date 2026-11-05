<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class InstructorApprovalNotification extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public int $tries = 3;

    public int $timeout = 30;

    /** @param array{status: string, feedback?: string|null, instructor_id?: int, reviewer_id?: int|null, previous_status?: string|null} $data */
    public function __construct(private array $data)
    {
        $this->afterCommit();
    }

    /** @return array<string, string> */
    public function viaConnections(): array
    {
        return ['database' => 'sync', 'mail' => config('queue.default')];
    }

    /** @return array<int, int> */
    public function backoff(): array
    {
        return [60, 300, 900];
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database', 'mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        if ($notifiable->role === 'admin') {
            return (new MailMessage)
                ->subject('Instructor application awaiting review')
                ->greeting('Hello '.$notifiable->name.',')
                ->line('An instructor application is awaiting your review.')
                ->action('Review applications', route('instructors.applications'));
        }

        return (new MailMessage)
            ->subject('Instructor Application Status Update')
            ->view('mail.instructor-approval', [
                'user' => $notifiable,
                'status' => $this->data['status'],
                'feedback' => $this->data['feedback'] ?? '',
            ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        $url = $notifiable->role !== 'admin'
            ? ($this->data['status'] === 'approved'
                ? route('dashboard')
                : route('student.index', ['tab' => 'instructor']))
            : route('instructors.applications');

        $feedback = $notifiable->role === 'student' || $notifiable->role === 'instructor'
            ? ($this->data['feedback'] ?? '')
            : 'Instructor application is submitted for admin approval';

        return [
            'title' => 'Instructor Application is '.$this->data['status'],
            'body' => $feedback,
            'url' => $url,
            'instructor_id' => $this->data['instructor_id'] ?? null,
            'reviewer_id' => $this->data['reviewer_id'] ?? null,
            'previous_status' => $this->data['previous_status'] ?? null,
            'status' => $this->data['status'],
        ];
    }
}
