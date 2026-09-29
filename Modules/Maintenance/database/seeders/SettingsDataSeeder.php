<?php

namespace Modules\Maintenance\Database\Seeders;

use App\Models\Instructor;
use App\Models\Setting;
use Illuminate\Database\Seeder;
use Modules\Language\Models\LanguageProperty;

class SettingsDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // New Settings Data
        $settings = [
            [
                'type' => 'auth',
                'sub_type' => 'recaptcha',
                'title' => 'Google Recaptcha',
                'fields' => [
                    'active' => false,
                    'site_key' => '',
                    'secret_key' => '',
                ],
            ],
        ];

        foreach ($settings as $setting) {
            Setting::firstOrCreate(
                ['type' => $setting['type'], 'sub_type' => $setting['sub_type']], // Search by sub_type
                $setting                              // Find or insert
            );
        }

        $system = Setting::where('type', 'system')->first();

        if ($system && !array_key_exists('selling_currency', $system->fields)) {
            $system->fields = array_merge($system->fields, ['selling_currency' => 'USD']);
            $system->save();
        }

        if ($system && !array_key_exists('global_style', $system->fields)) {
            $system->fields = array_merge($system->fields, ['global_style' => '']);
            $system->save();
        }

        if ($system && !array_key_exists('direction', $system->fields)) {
            $system->fields = array_merge($system->fields, ['direction' => 'none']);
            $system->save();
        }

        if ($system && !array_key_exists('theme', $system->fields)) {
            $system->fields = array_merge($system->fields, ['theme' => 'system']);
            $system->save();
        }

        if ($system && !array_key_exists('language_selector', $system->fields)) {
            $system->fields = array_merge($system->fields, ['language_selector' => true]);
            $system->save();
        }

        if ($system && !array_key_exists('frontend', $system->fields)) {
            $system->fields = array_merge($system->fields, ['frontend' => false]);
            $system->save();
        }

        if ($system && !array_key_exists('auth_banner', $system->fields)) {
            $system->fields = array_merge($system->fields, ['auth_banner' => '/assets/auth/lms-illustration.png']);
            $system->save();
        }

        // Bunny Stream is an opt-in storage_driver option (alongside
        // local/s3/r2) a customer connects with their own account via
        // Storage Settings — this only backfills the blank fields so the
        // settings form has something to bind to after an update. It must
        // never carry real credentials: this seeder runs for every existing
        // install on update, so any real value here would ship to every
        // customer's database at once. storage_driver itself is left
        // untouched — an existing install keeps whatever driver it already
        // had (never becomes 'bunny' on its own).
        $storage = Setting::where('type', 'storage')->first();

        if ($storage && ! array_key_exists('bunny_library_id', $storage->fields)) {
            $storage->fields = array_merge($storage->fields, [
                'bunny_library_id' => '',
                'bunny_api_key' => '',
                'bunny_token_auth_key' => '',
            ]);
            $storage->save();
        }

        // Add new payout methods for instructors
        $instructors = Instructor::all();
        $newMethods = [
            [
                'type' => 'payout',
                'sub_type' => 'sslcommerz',
                'title' => 'SSLCommerz Settings',
                'fields' => [
                    'active' => false,
                    'test_mode' => true,
                    'currency' => 'BDT',
                    'store_id' => '',
                    'store_password' => '',
                ],
            ],
            [
                'type' => 'payout',
                'sub_type' => 'razorpay',
                'title' => 'Razorpay Settings',
                'fields' => [
                    'active' => false,
                    'test_mode' => true,
                    'currency' => 'INR',
                    'api_key' => '',
                    'api_secret' => '',
                ],
            ],
        ];

        foreach ($instructors as $instructor) {
            $currentMethods = $instructor->payout_methods ?? [];

            // Ensure payout_methods is an array
            if (!is_array($currentMethods)) {
                $currentMethods = (array) $currentMethods;
            }

            $existingSubTypes = array_map(
                fn($method) => $method['sub_type'] ?? null,
                $currentMethods
            );

            $hasChanges = false;

            foreach ($newMethods as $newMethod) {
                if (!in_array($newMethod['sub_type'], $existingSubTypes, true)) {
                    $currentMethods[] = $newMethod;
                    $existingSubTypes[] = $newMethod['sub_type'];
                    $hasChanges = true;
                }
            }

            if ($hasChanges) {
                $instructor->payout_methods = $currentMethods;
                $instructor->save();
            }
        }

        // 'Summery' Spelling issue
        $properties = LanguageProperty::all();
        foreach ($properties as $property) {
            if (
                $property->properties && is_array($property->properties) &&
                array_key_exists('summery', $property->properties) &&
                $property->properties['summery'] == 'Summery'
            ) {
                $property->properties = [...$property->properties, 'summery' => 'Summary'];
                $property->save();
            }
        }
    }
}
