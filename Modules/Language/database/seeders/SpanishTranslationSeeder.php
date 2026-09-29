<?php

namespace Modules\Language\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Language\Models\Language;
use Modules\Language\Models\LanguageProperty;
use Modules\Language\Services\LanguageService;

class SpanishTranslationSeeder extends Seeder
{
    /**
     * Populates real Spanish text for every key currently seeded with the
     * English placeholder value (see LanguageDatabaseSeeder). Source of
     * truth is lang/es/{group}.php — flat key => translated value, one file
     * per group, covering the exact key set in storage/app/lang/groups/.
     *
     * @var array<int, string>
     */
    private const GROUPS = [
        'auth', 'button', 'common', 'dashboard',
        'frontend', 'input', 'settings', 'table',
    ];

    public function run(): void
    {
        $language = Language::where('code', 'es')->first();

        if (! $language) {
            return;
        }

        foreach (self::GROUPS as $group) {
            $path = lang_path("es/{$group}.php");

            if (! file_exists($path)) {
                continue;
            }

            $translations = require $path;

            LanguageProperty::where('language_id', $language->id)
                ->where('group', $group)
                ->get()
                ->each(function (LanguageProperty $property) use ($translations) {
                    $properties = (array) $property->properties;

                    foreach ($properties as $key => $value) {
                        if (isset($translations[$key])) {
                            $properties[$key] = $translations[$key];
                        }
                    }

                    $property->update(['properties' => $properties]);
                });
        }

        // Rows are written directly, bypassing LanguageController::update_property()
        // (which normally forgets this on save) — clear it here so a customer
        // who already loaded a Spanish page doesn't see stale text for an hour.
        app(LanguageService::class)->forgetCache('es');

        // php artisan module:seed Language --class=SpanishTranslationSeeder
    }
}
