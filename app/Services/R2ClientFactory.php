<?php

namespace App\Services;

use Aws\S3\S3Client;

class R2ClientFactory
{
    /**
     * Build an S3-compatible client configured for the app's Cloudflare R2
     * settings. R2 has no registered Laravel filesystem disk (see
     * AppConfig middleware), so every R2 operation goes through this raw
     * client rather than the Storage facade.
     */
    public static function make(): S3Client
    {
        return new S3Client([
            'credentials' => [
                'key' => config('filesystems.disks.r2.key'),
                'secret' => config('filesystems.disks.r2.secret'),
            ],
            'region' => config('filesystems.disks.r2.region', 'auto'),
            'version' => 'latest',
            'endpoint' => config('filesystems.disks.r2.endpoint'),
            'use_path_style_endpoint' => true,
        ]);
    }

    public static function bucket(): string
    {
        return (string) config('filesystems.disks.r2.bucket');
    }
}
