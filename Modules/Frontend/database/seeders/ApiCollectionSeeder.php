<?php

namespace Modules\Frontend\Database\Seeders;

use App\Models\FrontendCollection;
use Illuminate\Database\Seeder;

class ApiCollectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $collections = [
            [
                'type' => 'courses',
                'best' => '1',
                'top' => [1, 2, 3, 4, 5, 6, 7, 8],
                'new' => [16, 15, 14, 13, 12, 11, 10, 9],
                'featured' => null,
                'trending' => null,
                'popular' => null,
            ],
            [
                'type' => 'exams',
                'best' => '1',
                'top' => [1, 2, 3],
                'new' => [3, 2, 1],
                'featured' => null,
                'trending' => null,
                'popular' => null,
            ],
            [
                'type' => 'blogs',
                'best' => '1',
                'top' => [1, 2, 3, 4, 5, 6, 7, 8],
                'new' => [16, 15, 14, 13, 12, 11, 10, 9],
                'featured' => null,
                'trending' => null,
                'popular' => null,
            ],
            [
                'type' => 'instructors',
                'best' => '2',
                'top' => [2, 3, 4, 5, 6, 7],
                'new' => [12, 11, 10, 9, 8, 7],
                'featured' => null,
                'trending' => null,
                'popular' => null,
            ],
            [
                'type' => 'course_categories',
                'best' => '2',
                'top' => [2, 3, 4, 5, 6, 7, 8, 9],
                'new' => [9, 8, 7, 6, 5, 4, 3, 2],
                'featured' => [2, 3, 4, 5, 6, 7, 8, 9],
                'trending' => null,
                'popular' => null,
            ],
            [
                'type' => 'exam_categories',
                'best' => '2',
                'top' => [2, 3, 4],
                'new' => [4, 3, 2],
                'featured' => null,
                'trending' => null,
                'popular' => null,
            ],
            [
                'type' => 'blog_categories',
                'best' => '2',
                'top' => [2, 3, 4, 5],
                'new' => [5, 4, 3, 2],
                'featured' => null,
                'trending' => null,
                'popular' => null,
            ],
            [
                'type' => 'testimonials',
                'best' => null,
                'top' => [
                    [
                        'name' => 'John Smith',
                        'image' => '/assets/images/users/user-1.jpg',
                        'rating' => 5,
                        'description' => 'This platform has completely transformed my learning journey. The courses are well-structured and the instructors are incredibly knowledgeable.',
                    ],
                    [
                        'name' => 'Emma Johnson',
                        'image' => '/assets/images/users/user-2.jpg',
                        'rating' => 5,
                        'description' => 'I\'ve tried many online learning platforms, but this one stands out. The quality of content and support is exceptional.',
                    ],
                    [
                        'name' => 'Michael Chen',
                        'image' => '/assets/images/users/user-3.jpg',
                        'rating' => 5,
                        'description' => 'The best investment I\'ve made in my career. The skills I learned here helped me land my dream job.',
                    ],
                    [
                        'name' => 'Sarah Williams',
                        'image' => '/assets/images/users/user-4.jpg',
                        'rating' => 4,
                        'description' => 'Great platform with excellent course variety. The interactive lessons make learning engaging and fun.',
                    ],
                    [
                        'name' => 'David Rodriguez',
                        'image' => '/assets/images/users/user-5.jpg',
                        'rating' => 5,
                        'description' => 'Outstanding learning experience! The instructors are responsive and the community is very supportive.',
                    ],
                ],
                'new' => [
                    [
                        'name' => 'Sarah Williams',
                        'image' => '/assets/images/users/user-4.jpg',
                        'rating' => 4,
                        'description' => 'Great platform with excellent course variety. The interactive lessons make learning engaging and fun.',
                    ],
                    [
                        'name' => 'David Rodriguez',
                        'image' => '/assets/images/users/user-5.jpg',
                        'rating' => 5,
                        'description' => 'Outstanding learning experience! The instructors are responsive and the community is very supportive.',
                    ],
                ],
                'featured' => null,
                'trending' => null,
                'popular' => null,
            ],
            [
                'type' => 'sponsors',
                'best' => null,
                'top' => [
                    [
                        'image' => '/assets/logos/logo-1.png',
                        'url' => '',
                    ],
                    [
                        'image' => '/assets/logos/logo-2.png',
                        'url' => '',
                    ],
                    [
                        'image' => '/assets/logos/logo-3.png',
                        'url' => '',
                    ],
                    [
                        'image' => '/assets/logos/logo-4.png',
                        'url' => '',
                    ],
                    [
                        'image' => '/assets/logos/logo-5.png',
                        'url' => '',
                    ],
                    [
                        'image' => '/assets/logos/logo-6.png',
                        'url' => '',
                    ],
                    [
                        'image' => '/assets/logos/logo-7.png',
                        'url' => '',
                    ],
                ],
                'new' => [
                    [
                        'image' => '/assets/logos/logo-5.png',
                        'url' => '',
                    ],
                    [
                        'image' => '/assets/logos/logo-7.png',
                        'url' => '',
                    ],
                    [
                        'image' => '/assets/logos/logo-8.png',
                        'url' => '',
                    ],
                ],
                'featured' => null,
                'trending' => null,
                'popular' => null,
            ],
        ];

        foreach ($collections as $collection) {
            FrontendCollection::firstOrCreate(
                ['type' => $collection['type']],
                $collection
            );
        }
    }
}
