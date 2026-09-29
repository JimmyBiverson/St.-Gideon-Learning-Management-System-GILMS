<?php

namespace Modules\Maintenance\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Language\Models\Language;
use Modules\Language\Models\LanguageProperty;

class LanguagePropertiesSyncSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->removeUnusedProperties();
        $this->addNewProperties();
    }

    /**
     * Remove unused language properties that no longer exist in the language files
     */
    protected function removeUnusedProperties(): void
    {
        $groups = [
            'auth' => require storage_path('app/lang/groups/auth.php'),
            'button' => require storage_path('app/lang/groups/button.php'),
            'common' => require storage_path('app/lang/groups/common.php'),
            'dashboard' => require storage_path('app/lang/groups/dashboard.php'),
            'frontend' => require storage_path('app/lang/groups/frontend.php'),
            'input' => require storage_path('app/lang/groups/input.php'),
            'table' => require storage_path('app/lang/groups/table.php'),
            'settings' => require storage_path('app/lang/groups/settings.php'),
        ];

        // Build a list of all valid property keys from the current language files
        $validPropertyKeys = [];
        foreach ($groups as $groupKey => $groupData) {
            foreach ($groupData as $section) {
                if (isset($section['properties'])) {
                    foreach (array_keys($section['properties']) as $propertyKey) {
                        $validPropertyKeys[] = $groupKey . '.' . $propertyKey;
                    }
                }
            }
        }

        // Get all languages
        $languages = Language::all();

        foreach ($languages as $language) {
            // Get all language properties for this language
            $languageProperties = LanguageProperty::where('language_id', $language->id)->get();

            foreach ($languageProperties as $property) {
                // Parse the existing properties JSON
                $properties = is_string($property->properties)
                    ? json_decode($property->properties, true)
                    : $property->properties;

                if (! is_array($properties)) {
                    continue;
                }

                $updatedProperties = [];
                $removedCount = 0;

                // Filter out properties that are not in the valid list
                foreach ($properties as $key => $value) {
                    $fullKey = $property->group . '.' . $key;
                    if (in_array($fullKey, $validPropertyKeys)) {
                        $updatedProperties[$key] = $value;
                    } else {
                        $removedCount++;
                    }
                }

                // Update the property if any keys were removed
                if ($removedCount > 0) {
                    $property->update(['properties' => $updatedProperties]);
                }
            }
        }
    }

    /**
     * Add new language properties that were added to the language files
     */
    protected function addNewProperties(): void
    {
        $groups = [
            'auth' => require storage_path('app/lang/groups/auth.php'),
            'button' => require storage_path('app/lang/groups/button.php'),
            'common' => require storage_path('app/lang/groups/common.php'),
            'dashboard' => require storage_path('app/lang/groups/dashboard.php'),
            'frontend' => require storage_path('app/lang/groups/frontend.php'),
            'input' => require storage_path('app/lang/groups/input.php'),
            'table' => require storage_path('app/lang/groups/table.php'),
            'settings' => require storage_path('app/lang/groups/settings.php'),
        ];

        // Get all languages
        $languages = Language::all();

        foreach ($languages as $language) {
            foreach ($groups as $groupKey => $groupData) {
                foreach ($groupData as $section) {
                    // Find or create the language property record
                    $languageProperty = LanguageProperty::firstOrCreate(
                        [
                            'slug' => $section['slug'],
                            'group' => $groupKey,
                            'language_id' => $language->id,
                        ],
                        [
                            'name' => $section['name'],
                            'properties' => [],
                        ]
                    );

                    // Get existing properties
                    $existingProperties = is_string($languageProperty->properties)
                        ? json_decode($languageProperty->properties, true)
                        : $languageProperty->properties;

                    if (! is_array($existingProperties)) {
                        $existingProperties = [];
                    }

                    // Merge with new properties (only add keys that don't exist)
                    $newProperties = $section['properties'];
                    $addedCount = 0;

                    foreach ($newProperties as $key => $value) {
                        if (! isset($existingProperties[$key])) {
                            // For default language (English), use the value from the file
                            // For other languages, use the English value as placeholder
                            $existingProperties[$key] = $language->is_default ? $value : $value;
                            $addedCount++;
                        }
                    }

                    // Update if new properties were added
                    if ($addedCount > 0) {
                        $languageProperty->update(['properties' => $existingProperties]);
                    }
                }
            }
        }
    }
}
