<?php

namespace Database\Seeders;

use App\Enums\SystemType;
use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            [
                'type' => 'system',
                'sub_type' => SystemType::COLLABORATIVE->value,
                'title' => 'System Settings',
                'fields' => [
                    'name' => 'Mentor Learning Management System',
                    'title' => 'Mentor Learning Management System',
                    'keywords' => 'LMS, Learning Management System, Courses, Mentor, LMS',
                    'description' => 'Transform your learning journey with Mentor LMS - a comprehensive online learning platform connecting expert instructors with passionate learners. Discover courses, build skills, and achieve your goals.',
                    'logo_dark' => '/assets/icons/logo-dark.png',
                    'logo_light' => '/assets/icons/logo-light.png',
                    'favicon' => '/favicon.ico',
                    'banner' => '/banner.png',
                    'auth_banner' => '/assets/auth/lms-illustration.png',
                    'author' => 'UiLib',
                    'slogan' => 'A course based video CMS',
                    'email' => 'admin@yourdomain.com',
                    'phone' => '+123 45 678 9201',
                    'selling_tax' => 5,
                    'selling_currency' => 'USD',
                    'instructor_revenue' => 70,
                    'global_style' => '',
                    'direction' => 'none',
                    'font_family' => 'inter',
                    'language_selector' => true,
                    'frontend' => true,
                    'theme' => 'system',
                ],
            ],

            [
                'type' => 'smtp',
                'sub_type' => null,
                'title' => 'SMTP Settings',
                'fields' => [
                    'mail_mailer' => 'smtp',
                    'mail_host' => '',
                    'mail_port' => '465',
                    'mail_username' => '',
                    'mail_password' => '',
                    'mail_encryption' => 'ssl',
                    'mail_from_address' => '',
                    'mail_from_name' => 'Mentor LMS',
                ],
            ],
            [
                'type' => 'auth',
                'sub_type' => 'google',
                'title' => 'Google Auth',
                'fields' => [
                    'active' => false,
                    'client_id' => '',
                    'client_secret' => '',
                    'redirect' => 'http://localhost:8000/auth/google/callback',
                ],
            ],
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
            [
                'type' => 'storage',
                'sub_type' => null,
                'title' => 'Storage Settings',
                'fields' => [
                    'storage_driver' => 'local',

                    'aws_access_key_id' => '',
                    'aws_secret_access_key' => '',
                    'aws_default_region' => 'us-east-1',
                    'aws_bucket' => '',
                    'aws_use_path_style_endpoint' => false,

                    'r2_access_key_id' => '',
                    'r2_secret_access_key' => '',
                    'r2_bucket' => '',
                    'r2_endpoint' => '',
                    'r2_public_url' => '',
                    'r2_region' => 'auto',

                    'bunny_library_id' => '',
                    'bunny_api_key' => '',
                    'bunny_token_auth_key' => '',
                ],
            ],
            [
                'type' => 'live_class',
                'sub_type' => null,
                'title' => 'Live Class Settings',
                'fields' => [
                    'zoom_account_email' => '',
                    'zoom_account_id' => '',
                    'zoom_client_id' => '',
                    'zoom_client_secret' => '',
                    'zoom_web_sdk' => false,
                    'zoom_sdk_client_id' => '',
                    'zoom_sdk_client_secret' => '',
                ],
            ],
            [
                'type' => 'meta_pixel',
                'sub_type' => null,
                'title' => 'Meta Pixel Settings',
                'fields' => [
                    'pixel_enabled' => false,
                    'pixel_id' => '',
                    'capi_enabled' => false,
                    'access_token' => '',
                    'test_event_code' => '',
                ],
            ],
            [
                'type' => 'google_analytics',
                'sub_type' => null,
                'title' => 'Google Analytics Settings',
                'fields' => [
                    'analytics_enabled' => false,
                    'measurement_id' => '',
                    'mp_enabled' => false,
                    'api_secret' => '',
                    'debug_mode' => false,
                ],
            ],
        ];

        foreach ($settings as $setting) {
            Setting::firstOrCreate([
                'type' => $setting['type'],
                'sub_type' => $setting['sub_type'],
            ], $setting);
        }
    }
}
