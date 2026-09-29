<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Core modules
    |--------------------------------------------------------------------------
    |
    | Bundled modules that cannot be disabled, deleted, or overwritten via the
    | plugins dashboard.
    |
    */

    'core_modules' => [
        'Store',
        'Installer',
        'Maintenance',
        'Language',
        'Frontend',
        'Course',
        'Blog',
        'Billing',
        'Exam',
        'Certification',
    ],

    /*
    |--------------------------------------------------------------------------
    | Upload settings
    |--------------------------------------------------------------------------
    */

    'upload' => [
        'max_size_kb' => (int) env('PLUGIN_UPLOAD_MAX_KB', 51200),
        'disk' => 'local',
        'path' => 'plugins/uploads',
    ],

    /*
    |--------------------------------------------------------------------------
    | Plugin package layout
    |--------------------------------------------------------------------------
    |
    | ZIPs produced by `php artisan plugin:package {Module}` contain:
    | - Modules/{Module}/
    | - public/build/
    | - bootstrap/ssr/
    |
    | Installation extracts these paths over the application root.
    |
    */

    'package' => [
        'module_path' => 'Modules/{module}',
        'build_path' => 'public/build',
        'ssr_path' => 'bootstrap/ssr',
        'required_files' => [
            'public/build/manifest.json',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Registry
    |--------------------------------------------------------------------------
    */

    'registry_path' => storage_path('app/plugins/registry.json'),

    /*
    |--------------------------------------------------------------------------
    | Backups
    |--------------------------------------------------------------------------
    */

    'backup_path' => storage_path('app/plugins/backups'),

    /*
    |--------------------------------------------------------------------------
    | Excluded paths when extracting module source from ZIP
    |--------------------------------------------------------------------------
    */

    'extract_excludes' => [
        'node_modules',
        'vendor',
        '.git',
        '.env',
        '.env.example',
    ],

];
