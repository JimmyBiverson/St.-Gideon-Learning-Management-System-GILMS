<?php

namespace App\Http\Controllers;

use App\Services\SitemapBuilder;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use Spatie\Sitemap\Sitemap;

class SitemapController extends Controller
{
    public function __invoke(SitemapBuilder $sitemapBuilder): Response
    {
        $sitemap = Cache::remember(
            config('sitemap.cache_key'),
            now()->addMinutes(config('sitemap.cache_ttl')),
            fn (): Sitemap => $sitemapBuilder->build(),
        );

        return $sitemap->toResponse(request());
    }
}
