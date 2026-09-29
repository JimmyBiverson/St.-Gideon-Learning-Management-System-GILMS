<?php

namespace Modules\Certification\Database\Seeders;

use Illuminate\Database\Seeder;

class CertificationDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            CertificateTemplateSeeder::class,
            MarksheetTemplateSeeder::class,
        ]);

        // php artisan module:seed Certificate --class=CertificateDatabaseSeeder
    }
}
