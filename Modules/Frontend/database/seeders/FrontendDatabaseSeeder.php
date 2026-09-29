<?php

namespace Modules\Frontend\Database\Seeders;

use Illuminate\Database\Seeder;

class FrontendDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            ApiCollectionSeeder::class,
            FrontendPageSeeder::class,
            FrontendPageUpdateSeeder::class,
            FrontendTranslationSeeder::class,
        ]);

        // php artisan module:seed Frontend --class=FrontendDatabaseSeeder
    }
}
