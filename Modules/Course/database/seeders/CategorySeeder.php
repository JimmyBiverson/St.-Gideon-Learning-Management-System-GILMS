<?php

namespace Modules\Course\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Modules\Course\Models\CourseCategory;
use Modules\Course\Models\CourseCategoryChild;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $category = [
            [
                'title' => 'Default',
                'icon' => 'recycle',
            ],
        ];

        foreach ($category as $key => $cat) {
            $slug = Str::slug($cat['title']);
            CourseCategory::updateOrCreate(
                ['slug' => $slug],
                [
                    'title' => $cat['title'],
                    'slug' => $slug,
                    'icon' => $cat['icon'],
                    'sort' => $key + 1,
                    'status' => 1,
                ]
            );
        }
    }
}
