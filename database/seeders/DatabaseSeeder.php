<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;
use Modules\Billing\Database\Seeders\BillingDatabaseSeeder;
use Modules\Blog\Database\Seeders\BlogDatabaseSeeder;
use Modules\Certification\Database\Seeders\CertificationDatabaseSeeder;
use Modules\Course\Database\Seeders\CourseDatabaseSeeder;
use Modules\Exam\Database\Seeders\ExamDatabaseSeeder;
use Modules\Frontend\Database\Seeders\FrontendDatabaseSeeder;
use Modules\Language\Database\Seeders\LanguageDatabaseSeeder;
use Modules\Store\Database\Seeders\StoreDatabaseSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            SettingsSeeder::class,
            NavbarSeeder::class,
            FooterSeeder::class,
            PageSeeder::class,
        ]);

        // Run data updates/seeders
        $this->moduleSeeder('Course', CourseDatabaseSeeder::class);
        $this->moduleSeeder('Frontend', FrontendDatabaseSeeder::class);
        $this->moduleSeeder('Blog', BlogDatabaseSeeder::class);
        $this->moduleSeeder('Exam', ExamDatabaseSeeder::class);
        $this->moduleSeeder('Billing', BillingDatabaseSeeder::class);
        $this->moduleSeeder('Certification', CertificationDatabaseSeeder::class);
        $this->moduleSeeder('Language', LanguageDatabaseSeeder::class);
        $this->moduleSeeder('Store', StoreDatabaseSeeder::class);
    }

    private function moduleSeeder(string $module, string $seederClass): void
    {
        try {
            $this->call([$seederClass]);
        } catch (\Throwable $th) {
            $this->command?->error("[FAILED] {$module} module seeding failed: {$th->getMessage()}");
            Log::error("Error running module:seed {$module}: " . $th->getMessage());
        }
    }
}
