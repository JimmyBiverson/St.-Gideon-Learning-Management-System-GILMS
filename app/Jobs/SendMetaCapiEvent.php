<?php

namespace App\Jobs;

use App\Services\MetaConversionsApiService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendMetaCapiEvent implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;

    /**
     * @param  array<string, mixed>  $userData
     * @param  array<string, mixed>  $customData
     */
    public function __construct(
        private readonly string $eventName,
        private readonly string $eventId,
        private readonly array $userData,
        private readonly array $customData = [],
        private readonly ?string $eventSourceUrl = null,
    ) {}

    public function handle(MetaConversionsApiService $metaConversionsApi): void
    {
        $metaConversionsApi->send(
            $this->eventName,
            $this->eventId,
            $this->userData,
            $this->customData,
            $this->eventSourceUrl,
        );
    }
}
