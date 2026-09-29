<?php

namespace Database\Seeders;

use App\Models\Page;
use App\Models\PageSection;
use App\Models\Setting;
use Database\Data\PageData;
use Illuminate\Database\Seeder;
use Illuminate\Support\Arr;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get page data from organized data class
        $pagesData = PageData::getAllPages();

        // First create or update the page
        foreach ($pagesData as $pageData) {
            $page = Page::updateOrCreate(
                ['slug' => $pageData['slug']],
                Arr::except($pageData, ['sections'])
            );

            // Then create or update all sections for this page
            foreach ($pageData['sections'] as $section) {
                $slug = $section['slug'] ?? null;
                if (! $slug) {
                    continue;
                }

                PageSection::updateOrCreate(
                    [
                        'page_id' => $page->id,
                        'slug' => $slug,
                    ],
                    array_merge($section, ['page_id' => $page->id])
                );
            }
        }

        // Set default home page
        $page = Page::query()->where('slug', 'home-1')->first();

        if ($page) {
            Setting::firstOrCreate(
                [
                    'type' => 'home_page',
                    'sub_type' => null,
                ],
                [
                    'title' => 'Select Home Page',
                    'fields' => [
                        'page_id' => $page->id,
                        'page_name' => $page->name,
                        'page_slug' => $page->slug,
                    ],
                ]
            );
        }
    }
}
