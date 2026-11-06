<?php

namespace App\Services;

use App\Models\Setting;
use Illuminate\Support\Facades\Storage;

class BrandingService
{
    public function apply(?Setting $setting): ?Setting
    {
        if (! $setting || $setting->type !== 'system') {
            return $setting;
        }
        $fields = $setting->fields ?? [];
        foreach (['logo_dark', 'logo_light', 'favicon', 'banner', 'auth_banner'] as $key) {
            $fields[$key] = $this->url($fields[$key] ?? null);
        }
        $setting->fields = $fields;

        return $setting;
    }

    public function url(?string $url): ?string
    {
        if (! $url) {
            return $url;
        }
        $path = parse_url($url, PHP_URL_PATH);
        if (! is_string($path) || ! str_starts_with($path, '/storage/')) {
            return $url;
        }
        $relativePath = substr($path, strlen('/storage/'));
        $disk = Storage::disk('public');
        if (! $disk->exists($relativePath)) {
            return $url;
        }

        return asset('storage/'.$relativePath).'?v='.$disk->lastModified($relativePath);
    }
}
