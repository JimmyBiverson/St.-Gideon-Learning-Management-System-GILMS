<?php

namespace Modules\Billing\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class OfflinePaymentNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(private array $data)
    {
        //
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $mail = (new MailMessage)
            ->subject($this->data['title'])
            ->line($this->data['title']);

        if (! empty($this->data['description'])) {
            $mail->line($this->data['description']);
        }

        if (! empty($this->data['url'])) {
            $mail->action('View Details', url($this->data['url']));
        }

        return $mail;
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        $payload = [
            'title' => $this->data['title'],
        ];

        if (! empty($this->data['description'])) {
            $payload['body'] = $this->data['description'];
        }

        if (! empty($this->data['url'])) {
            $payload['url'] = config('app.url').$this->data['url'];
        }

        return $payload;
    }
}
