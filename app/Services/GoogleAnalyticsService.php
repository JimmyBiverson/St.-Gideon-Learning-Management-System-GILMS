<?php

namespace App\Services;

use App\Models\Setting;
use Illuminate\Support\Str;

class GoogleAnalyticsService
{
    protected ?Setting $setting = null;

    protected function setting(): ?Setting
    {
        if ($this->setting === null) {
            $this->setting = Setting::where('type', 'google_analytics')->first();
        }

        return $this->setting;
    }

    public function measurementId(): ?string
    {
        return $this->setting()?->getField('measurement_id');
    }

    public function apiSecret(): ?string
    {
        return $this->setting()?->getField('api_secret');
    }

    public function isDebugMode(): bool
    {
        return (bool) $this->setting()?->getField('debug_mode');
    }

    public function isAnalyticsEnabled(): bool
    {
        return (bool) $this->setting()?->getField('analytics_enabled')
            && Str::of((string) $this->measurementId())->trim()->isNotEmpty();
    }

    public function isMpEnabled(): bool
    {
        return (bool) $this->setting()?->getField('mp_enabled')
            && Str::of((string) $this->measurementId())->trim()->isNotEmpty()
            && Str::of((string) $this->apiSecret())->trim()->isNotEmpty();
    }

    /**
     * Extract the GA client_id from the _ga cookie value.
     *
     * Format: GA<version>.<domain-depth>.<client_id part 1>.<client_id part 2>
     * e.g. "GA1.1.1053244267.1642015504" -> "1053244267.1642015504"
     */
    public function extractClientIdFromCookie(?string $gaCookie): ?string
    {
        if (! $gaCookie) {
            return null;
        }

        $parts = explode('.', $gaCookie);

        if (count($parts) >= 4 && str_starts_with($parts[0], 'GA')) {
            return $parts[2].'.'.$parts[3];
        }

        return null;
    }
}
