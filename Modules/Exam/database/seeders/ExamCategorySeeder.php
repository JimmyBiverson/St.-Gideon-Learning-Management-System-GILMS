<?php

namespace Modules\Exam\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Modules\Exam\Models\ExamCategory;

class ExamCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'title' => 'Default',
                'icon' => 'recycle',
            ],
        ];

        foreach ($categories as $category) {
            $slug = Str::slug($category['title']);
            ExamCategory::updateOrCreate(
                ['slug' => $slug],
                [
                    ...$category,
                    'slug' => $slug,
                ]
            );
        }
    }
}
