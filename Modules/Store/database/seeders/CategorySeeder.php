<?php

namespace Modules\Store\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Modules\Store\Models\ProductCategory;

class CategorySeeder extends Seeder
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

        foreach ($categories as $key => $category) {
            $slug = Str::slug($category['title']);

            ProductCategory::updateOrCreate(
                ['slug' => $slug],
                [
                    'title' => $category['title'],
                    'slug' => $slug,
                    'icon' => $category['icon'],
                    'sort' => $key + 1,
                    'status' => 1,
                ]
            );
        }
    }
}
