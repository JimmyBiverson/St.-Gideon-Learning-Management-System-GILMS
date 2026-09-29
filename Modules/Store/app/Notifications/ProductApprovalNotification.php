<?php

namespace Modules\Store\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Modules\Store\Models\Product;

class ProductApprovalNotification extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    public function __construct(private Product $product, private array $data)
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
        return ['mail', 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Product Approval Status Update')
            ->view('store::mail.product-approval', [
                'user' => $notifiable,
                'product' => $this->product,
                'status' => $this->data['status'],
                'feedback' => $this->data['feedback'],
            ]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        $id = $this->product->id;
        $slug = $this->product->slug;

        $url = route('products.details', [$slug, $id]);

        return [
            'title' => $this->product->status.': '.$this->product->title,
            'body' => $this->data['feedback'],
            'url' => $url,
        ];
    }
}
