<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class MetaConversionsApiService
{
    private const GRAPH_API_VERSION = 'v21.0';

    public function __construct(private readonly MetaPixelService $metaPixel) {}

    /**
     * Send a server-side event to the Meta Conversions API.
     *
     * @param  array<string, mixed>  $userData  email, first_name, last_name, phone, external_id, ip, user_agent, fbc, fbp
     * @param  array<string, mixed>  $customData
     */
    public function send(
        string $eventName,
        string $eventId,
        array $userData,
        array $customData = [],
        ?string $eventSourceUrl = null,
    ): void {
        if (! $this->metaPixel->isCapiEnabled()) {
            return;
        }

        $payload = [
            'data' => [
                [
                    'event_name' => $eventName,
                    'event_time' => now()->timestamp,
                    'event_id' => $eventId,
                    'event_source_url' => $eventSourceUrl,
                    'action_source' => 'website',
                    'user_data' => $this->hashUserData($userData),
                    'custom_data' => $customData,
                ],
            ],
            'access_token' => $this->metaPixel->accessToken(),
        ];

        if (Str::of((string) $this->metaPixel->testEventCode())->trim()->isNotEmpty()) {
            $payload['test_event_code'] = $this->metaPixel->testEventCode();
        }

        try {
            $response = Http::timeout(10)->post(
                sprintf('https://graph.facebook.com/%s/%s/events', self::GRAPH_API_VERSION, $this->metaPixel->pixelId()),
                $payload,
            );

            if ($response->failed()) {
                Log::warning('Meta CAPI event failed', [
                    'event_name' => $eventName,
                    'event_id' => $eventId,
                    'status' => $response->status(),
                    'body' => $response->body(),
                ]);
            }
        } catch (\Throwable $e) {
            Log::warning('Meta CAPI event errored', [
                'event_name' => $eventName,
                'event_id' => $eventId,
                'message' => $e->getMessage(),
            ]);
        }
    }

    /**
     * @param  array<string, mixed>  $userData
     * @return array<string, mixed>
     */
    private function hashUserData(array $userData): array
    {
        $hashed = [];

        if (Str::of((string) ($userData['email'] ?? ''))->trim()->isNotEmpty()) {
            $hashed['em'] = [$this->hash($userData['email'])];
        }

        if (Str::of((string) ($userData['phone'] ?? ''))->trim()->isNotEmpty()) {
            $hashed['ph'] = [$this->hash(preg_replace('/[^0-9]/', '', (string) $userData['phone']))];
        }

        if (Str::of((string) ($userData['first_name'] ?? ''))->trim()->isNotEmpty()) {
            $hashed['fn'] = [$this->hash($userData['first_name'])];
        }

        if (Str::of((string) ($userData['last_name'] ?? ''))->trim()->isNotEmpty()) {
            $hashed['ln'] = [$this->hash($userData['last_name'])];
        }

        if (Str::of((string) ($userData['external_id'] ?? ''))->trim()->isNotEmpty()) {
            $hashed['external_id'] = [$this->hash($userData['external_id'])];
        }

        foreach (['ip' => 'client_ip_address', 'user_agent' => 'client_user_agent', 'fbc' => 'fbc', 'fbp' => 'fbp'] as $inputKey => $metaKey) {
            if (Str::of((string) ($userData[$inputKey] ?? ''))->trim()->isNotEmpty()) {
                $hashed[$metaKey] = $userData[$inputKey];
            }
        }

        return $hashed;
    }

    private function hash(string $value): string
    {
        return hash('sha256', Str::of($value)->trim()->lower()->toString());
    }
}
