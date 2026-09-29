<?php

namespace Modules\Maintenance\Database\Seeders;

use Database\Seeders\NavbarSeeder;
use Illuminate\Database\Seeder;

class MaintenanceDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            PagesDataSeeder::class,
            SettingsDataSeeder::class,
            NavbarSeeder::class,
            LanguagePropertiesSyncSeeder::class,
        ]);
    }
}
