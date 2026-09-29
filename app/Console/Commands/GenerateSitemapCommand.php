<?php

namespace App\Console\Commands;

use App\Services\SitemapBuilder;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;

class GenerateSitemapCommand extends Command
{
    protected $signature = 'sitemap:generate';

    protected $description = 'Generate the XML sitemap at public/sitemap.xml';

    public function handle(SitemapBuilder $sitemapBuilder): int
    {
        $path = config('sitemap.path');

        $sitemapBuilder->writeToFile($path);

        Cache::forget(config('sitemap.cache_key'));

        $this->components->info('Sitemap written to '.$path);

        return self::SUCCESS;
    }
}
