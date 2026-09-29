<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Included directories
    |--------------------------------------------------------------------------
    |
    | Top-level project directories copied into a customer release ZIP by
    | `php artisan make:version {version}`. vendor/ and public/build/ must
    | already be built for production before running the command — it does
    | not run composer/npm itself.
    |
    */

    'directories' => [
        'app',
        'bootstrap',
        'config',
        'database',
        'docker',
        'lang',
        'Modules',
        'public',
        'resources',
        'routes',
        'storage',
        'vendor',
    ],

    /*
    |--------------------------------------------------------------------------
    | Included files
    |--------------------------------------------------------------------------
    |
    | Top-level project files copied into a customer release ZIP.
    |
    */

    'files' => [
        'artisan',
        '.htaccess',
        '.env.example',
        'modules_statuses.json',
        'version.txt',
        'composer.json',
        'composer.lock',
        'package.json',
        'package-lock.json',
        'vite.config.ts',
        'vite-module-aliases.js',
        'vite-module-loader.js',
        'tsconfig.json',
        'eslint.config.js',
        '.prettierrc',
        '.prettierignore',
        'components.json',
        '.dockerignore',
        'Dockerfile',
        'docker-compose.yaml',
        'docker-compose.prod.yaml',
        'docker.env',
    ],

    /*
    |--------------------------------------------------------------------------
    | Excluded paths
    |--------------------------------------------------------------------------
    |
    | Specific paths removed from the staged release even though their
    | parent directory is included wholesale — dev clutter that shouldn't
    | reach a customer.
    |
    */

    'exclude_paths' => [
        'public/build.zip',
        'public/test.html',
    ],

    /*
    |--------------------------------------------------------------------------
    | Emptied directories
    |--------------------------------------------------------------------------
    |
    | Directories that must exist in the release (Laravel/the app expects
    | them at boot) but whose *contents* are always local/dev state and
    | must never ship: cached compiled views, sessions, logs, staging
    | scratch space used by the plugin installer, etc.
    |
    | Each path maps to the exact filenames to leave in place directly
    | inside it (usually just the .gitignore placeholder, sometimes
    | nothing). Only files/subdirectories directly inside the path are
    | affected — a subdirectory that has its own entry here (e.g.
    | storage/framework/cache/data under storage/framework/cache) is
    | cleaned by its own rule instead of being deleted by its parent's.
    |
    */

    'empty_directories' => [
        // Machine-generated manifests. Shipping them overwrites the customer's
        // own compiled state — most damagingly modules.php, which lists the
        // plugins they have installed.
        'bootstrap/cache' => ['.gitignore'],
        'storage/app/backups' => [],
        'storage/app/plugins' => [],
        'storage/app/private' => [],
        'storage/app/releases' => [],
        'storage/app/public' => ['.htaccess'],
        'storage/framework/cache' => ['.gitignore'],
        'storage/framework/cache/data' => ['.gitignore'],
        'storage/framework/sessions' => ['.gitignore'],
        'storage/framework/testing' => [],
        'storage/framework/views' => ['.gitignore'],
        'storage/logs' => ['.gitignore'],
    ],

    /*
    |--------------------------------------------------------------------------
    | Excluded directories
    |--------------------------------------------------------------------------
    |
    | Directories removed from the staged release entirely — unlike
    | empty_directories above, these don't ship even as an empty folder.
    |
    */

    'excluded_directories' => [
        'storage/pail',
        'public/storage',
    ],

    /*
    |--------------------------------------------------------------------------
    | Output
    |--------------------------------------------------------------------------
    */

    'output_path' => storage_path('app/releases'),

    /*
    |--------------------------------------------------------------------------
    | Release manifest archive
    |--------------------------------------------------------------------------
    |
    | Every build records its full file index here (path => sha1). Nothing
    | reads it yet, but it is what a future incremental release needs in order
    | to work out which files changed and which were deleted since the
    | previous version.
    |
    */

    'manifest_archive_path' => storage_path('app/releases/manifests'),

    /*
    |--------------------------------------------------------------------------
    | Update package contract
    |--------------------------------------------------------------------------
    |
    | What a valid Mentor LMS package looks like. Used both when building one
    | (`php artisan make:version` self-validates its own output) and when a
    | customer uploads one, so a package that would fail on their server can
    | never leave the build machine.
    |
    */

    'package' => [

        'product' => 'mentor-lms',

        // How many uploaded packages the maintenance area keeps before pruning
        // the oldest. Each is tens of megabytes, and disk is the scarce
        // resource on shared hosting.
        'retention' => 3,

        // How long a single resumable install step may work for before it
        // returns. Kept well under the shortest request timeout a shared host
        // is likely to enforce, so no step can ever be cut off mid-write.
        'step_seconds' => 10,

        // Entries handed to ZipArchive::extractTo() per batch within a step.
        'extract_batch' => 250,

        // Snapshot the files an update replaces so it can be rolled back.
        // Skipped automatically when the disk has no room for the copy.
        'snapshot' => true,

        'manifest_file' => 'update-manifest.json',

        // Manifest schema versions this application knows how to read.
        'supported_schemas' => [1],

        // Oldest installed version an update package may be applied on top of.
        // Recorded into each package's manifest at build time.
        'min_upgradable_from' => '5.0.0',

        // First path segment of every entry must be one of these.
        'allowed_roots' => [
            'app', 'bootstrap', 'config', 'database', 'docker', 'lang',
            'Modules', 'public', 'resources', 'routes', 'storage', 'vendor',
        ],

        // Files permitted at the top level of the archive.
        'allowed_root_files' => [
            'artisan', '.htaccess', '.env.example', 'update-manifest.json',
            'modules_statuses.json', 'modules_statuses.dist.json', 'version.txt',
            'composer.json', 'composer.lock', 'package.json', 'package-lock.json',
            'vite.config.ts', 'vite-module-aliases.js', 'vite-module-loader.js',
            'tsconfig.json', 'eslint.config.js', '.prettierrc', '.prettierignore',
            'components.json', '.dockerignore', 'Dockerfile',
            'docker-compose.yaml', 'docker-compose.prod.yaml', 'docker.env',
        ],

        // Proof the archive is this application and not some other ZIP.
        'marker_files' => [
            'artisan',
            'version.txt',
            'composer.json',
            'bootstrap/app.php',
            'public/index.php',
            'app/Providers/AppServiceProvider.php',
        ],

        // Proof `npm run build` ran before packaging.
        'build_files' => [
            'public/build/manifest.json',
        ],

        // Proof `composer install` ran, checked only when vendor/ is included.
        'vendor_files' => [
            'vendor/autoload.php',
            'vendor/composer/installed.json',
        ],

        // Dev dependencies must never reach a customer.
        'dev_dependency_paths' => [
            'vendor/phpunit/', 'vendor/pestphp/', 'vendor/mockery/',
            'vendor/fakerphp/', 'vendor/laravel/pail/', 'vendor/laravel/sail/',
            'vendor/laravel/boost/', 'vendor/laravel/pint/',
            'vendor/nunomaduro/collision/',
        ],

        // Entries that make a package invalid outright.
        //
        // A pattern ending in "/" is anchored to the root of the archive and
        // matches files beneath it — never the directory entry itself, nor a
        // .gitignore placeholder, because several of these directories must
        // ship empty for the application to boot (bootstrap/cache, the storage
        // sub-trees). Anything else matches a full path or a bare filename at
        // any depth.
        'forbidden_paths' => [
            '.env',
            '.git/', '.github/', '.idea/', '.vscode/', 'node_modules/',
            'public/storage/',
            'storage/app/backups/', 'storage/app/releases/',
            'storage/framework/maintenance.php',
            'bootstrap/cache/',
        ],

        // Directory names that must not appear at *any* depth — unlike the
        // root-anchored rules above, a vendor package carrying one of these is
        // still a packaging mistake.
        'forbidden_nested_directories' => ['node_modules', '.git'],

        // Entries that are merely suspicious — reported, not fatal.
        'discouraged_paths' => [
            '.DS_Store', 'Thumbs.db', 'storage/logs/', 'storage/app/plugins/',
            '.phpunit.result.cache', 'auth.json',
        ],

        // Files this size or larger are called out; a release should not
        // contain a stray database dump or video.
        'large_file_warning_bytes' => 25 * 1024 * 1024,
    ],

];
