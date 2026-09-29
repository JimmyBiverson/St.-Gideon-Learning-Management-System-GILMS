<?php

namespace Modules\Frontend\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Frontend\Models\ProjectPage;
use Modules\Frontend\Services\PageTranslationService;

class FrontendTranslationSeeder extends Seeder
{
    /**
     * Spanish translations for every default Web Builder page, stored one
     * JSON file per page at storage/app/page-data-es/{slug}.json, matching
     * the English source files at storage/app/page-data/{slug}.json.
     *
     * @var array<int, string>
     */
    private const SLUGS = [
        'home-1', 'home-2', 'home-3', 'home-4', 'home-5',
        'about-us', 'contact-us', 'our-team', 'cookie-policy',
        'terms-and-conditions', 'privacy-policy', 'refund-policy',
    ];

    public function run(): void
    {
        $service = app(PageTranslationService::class);

        foreach (self::SLUGS as $slug) {
            $page = ProjectPage::where('slug', $slug)->first();

            if (! $page) {
                continue;
            }

            $path = storage_path("app/page-data-es/{$slug}.json");

            if (! file_exists($path)) {
                continue;
            }

            $nested = json_decode(file_get_contents($path), true) ?? [];
            $translations = [];

            foreach ($nested as $elementId => $fields) {
                foreach ($fields as $field => $value) {
                    $translations[] = ['element_id' => $elementId, 'field' => $field, 'value' => $value];
                }
            }

            $service->saveMap($page, 'es', $translations);
        }

        // php artisan module:seed Frontend --class=FrontendTranslationSeeder
    }
}
