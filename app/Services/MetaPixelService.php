<?php

namespace App\Services;

use App\Models\Setting;
use Illuminate\Support\Str;

class MetaPixelService
{
    protected ?Setting $setting = null;

    protected function setting(): ?Setting
    {
        if ($this->setting === null) {
            $this->setting = Setting::where('type', 'meta_pixel')->first();
        }

        return $this->setting;
    }

    public function pixelId(): ?string
    {
        return $this->setting()?->getField('pixel_id');
    }

    public function accessToken(): ?string
    {
        return $this->setting()?->getField('access_token');
    }

    public function testEventCode(): ?string
    {
        return $this->setting()?->getField('test_event_code');
    }

    public function isPixelEnabled(): bool
    {
        return (bool) $this->setting()?->getField('pixel_enabled')
            && Str::of((string) $this->pixelId())->trim()->isNotEmpty();
    }

    public function isCapiEnabled(): bool
    {
        return (bool) $this->setting()?->getField('capi_enabled')
            && Str::of((string) $this->pixelId())->trim()->isNotEmpty()
            && Str::of((string) $this->accessToken())->trim()->isNotEmpty();
    }
}
