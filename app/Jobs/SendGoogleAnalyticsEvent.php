<?php

namespace App\Jobs;

use App\Services\GoogleAnalyticsMeasurementProtocolService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class SendGoogleAnalyticsEvent implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;

    /**
     * @param  array<string, mixed>  $params
     */
    public function __construct(
        private readonly string $eventName,
        private readonly ?string $clientId,
        private readonly ?string $userId,
        private readonly array $params = [],
    ) {}

    public function handle(GoogleAnalyticsMeasurementProtocolService $googleAnalyticsMp): void
    {
        $googleAnalyticsMp->send($this->eventName, $this->clientId, $this->userId, $this->params);
    }
}
