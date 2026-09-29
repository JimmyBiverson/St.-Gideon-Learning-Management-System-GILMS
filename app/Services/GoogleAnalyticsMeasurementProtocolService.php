<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GoogleAnalyticsMeasurementProtocolService
{
    private const ENDPOINT = 'https://www.google-analytics.com/mp/collect';

    private const DEBUG_ENDPOINT = 'https://www.google-analytics.com/debug/mp/collect';

    public function __construct(private readonly GoogleAnalyticsService $googleAnalytics) {}

    /**
     * Send a server-side event to the GA4 Measurement Protocol.
     *
     * GA4 does not accept PII (no email/name) — only client_id, an
     * optional numeric user_id, and non-personal event params.
     *
     * @param  array<string, mixed>  $params
     */
    public function send(string $eventName, ?string $clientId, ?string $userId, array $params = []): void
    {
        if (! $this->googleAnalytics->isMpEnabled()) {
            return;
        }

        // Measurement Protocol requires a client_id; synthesize a stable one
        // from the user id when the _ga cookie wasn't present on the request
        // (e.g. gtag disabled, blocked, or the very first server-only event).
        $clientId = $clientId ?: ('server.'.($userId ?: (string) now()->timestamp));

        $payload = [
            'client_id' => $clientId,
            'events' => [
                [
                    'name' => $eventName,
                    'params' => $params,
                ],
            ],
        ];

        if ($userId) {
            $payload['user_id'] = $userId;
        }

        $baseUrl = $this->googleAnalytics->isDebugMode() ? self::DEBUG_ENDPOINT : self::ENDPOINT;
        $endpoint = $baseUrl.'?'.http_build_query([
            'measurement_id' => $this->googleAnalytics->measurementId(),
            'api_secret' => $this->googleAnalytics->apiSecret(),
        ]);

        try {
            $response = Http::timeout(10)->post($endpoint, $payload);

            if ($response->failed() || $this->googleAnalytics->isDebugMode()) {
                $level = $response->failed() ? 'warning' : 'debug';
                Log::{$level}('Google Analytics MP event', [
                    'event_name' => $eventName,
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
            }
        } catch (\Throwable $e) {
            Log::warning('Google Analytics MP event errored', [
                'event_name' => $eventName,
                'message' => $e->getMessage(),
            ]);
        }
    }
}
