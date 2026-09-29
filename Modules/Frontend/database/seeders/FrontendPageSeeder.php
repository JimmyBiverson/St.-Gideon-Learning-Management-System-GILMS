<?php

namespace Modules\Frontend\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Modules\Frontend\Models\Project;
use Modules\Frontend\Models\ProjectPage;

class FrontendPageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $project = Project::firstOrCreate(
            ['type' => 'real', 'name' => 'Mentor LMS'],
            [
                'type' => 'real',
                'name' => 'Mentor LMS',
                'title' => 'Learning Management System',
                'description' => 'Transform your learning journey with Mentor LMS - a comprehensive online learning platform connecting expert instructors with passionate learners. Discover courses, build skills, and achieve your goals.',
                'favicon' => '/favicon.ico',
                'metadata' => [
                    'keywords' => 'LMS, Courses, Mentor',
                    'logo_dark' => '/assets/icons/logo-dark.png',
                    'logo_light' => '/assets/icons/logo-light.png',
                    'banner' => '/banner.png',
                    'author' => 'UiLib',
                    'slogan' => 'A course based video CMS',
                    'email' => 'admin@yourdomain.com',
                    'phone' => '+123 45 678 9201',
                ],
                'theme_color' => 'Zinc',
                'theme_config' => ':root {
--background: hsl(0 0% 100%);
--foreground: hsl(240 10% 3.9%);
--card: hsl(0 0% 100%);
--card-foreground: hsl(240 10% 3.9%);
--popover: hsl(0 0% 100%);
--popover-foreground: hsl(240 10% 3.9%);
--primary: hsl(240 5.9% 10%);
--primary-foreground: hsl(0 0% 98%);
--secondary: hsl(240 4.8% 95.9%);
--secondary-foreground: hsl(240 5.9% 10%);
--muted: hsl(240 4.8% 95.9%);
--muted-foreground: hsl(240 3.8% 46.1%);
--accent: hsl(240 4.8% 95.9%);
--accent-foreground: hsl(240 5.9% 10%);
--destructive: hsl(0 84.2% 60.2%);
--destructive-foreground: hsl(0 0% 98%);
--border: hsl(240 5.9% 90%);
--input: hsl(240 5.9% 90%);
--ring: hsl(240 5.9% 10%);
--chart1: hsl(12 76% 61%);
--chart2: hsl(173 58% 39%);
--chart3: hsl(197 37% 24%);
--chart4: hsl(43 74% 66%);
--chart5: hsl(27 87% 67%);
--sidebar: hsl(0 0% 98%);
--sidebar-foreground: hsl(240 5.3% 26.1%);
--sidebar-primary: hsl(240 5.9% 10%);
--sidebar-primary-foreground: hsl(0 0% 98%);
--sidebar-accent: hsl(240 4.8% 95.9%);
--sidebar-accent-foreground: hsl(240 5.9% 10%);
--sidebar-border: hsl(220 13% 91%);
--sidebar-ring: hsl(240 5.9% 10%);
}

.dark {
--background: hsl(240 10% 3.9%);
--foreground: hsl(0 0% 98%);
--card: hsl(240 10% 3.9%);
--card-foreground: hsl(0 0% 98%);
--popover: hsl(240 10% 3.9%);
--popover-foreground: hsl(0 0% 98%);
--primary: hsl(0 0% 98%);
--primary-foreground: hsl(240 5.9% 10%);
--secondary: hsl(240 3.7% 15.9%);
--secondary-foreground: hsl(0 0% 98%);
--muted: hsl(240 3.7% 15.9%);
--muted-foreground: hsl(240 5% 64.9%);
--accent: hsl(240 3.7% 15.9%);
--accent-foreground: hsl(0 0% 98%);
--destructive: hsl(0 62.8% 30.6%);
--destructive-foreground: hsl(0 0% 98%);
--border: hsl(240 3.7% 15.9%);
--input: hsl(240 3.7% 15.9%);
--ring: hsl(240 4.9% 83.9%);
--chart1: hsl(220 70% 50%);
--chart2: hsl(160 60% 45%);
--chart3: hsl(30 80% 55%);
--chart4: hsl(280 65% 60%);
--chart5: hsl(340 75% 55%);
--sidebar: hsl(240 10% 3.9%);
--sidebar-foreground: hsl(0 0% 98%);
--sidebar-primary: hsl(0 0% 98%);
--sidebar-primary-foreground: hsl(240 5.9% 10%);
--sidebar-accent: hsl(240 3.7% 15.9%);
--sidebar-accent-foreground: hsl(0 0% 98%);
--sidebar-border: hsl(240 3.7% 15.9%);
--sidebar-ring: hsl(240 4.9% 83.9%);
}',
            ]
        );

        $homePages = [
            // home pages
            [
                'title' => 'Home 1',
                'type' => 'home',
                'status' => true,
                'description' => 'Welcome to Mentor LMS - your gateway to transformative learning experiences. Discover expert-led courses, build new skills, and advance your career with our comprehensive online learning platform.',
            ],
            [
                'title' => 'Home 2',
                'type' => 'home',
                'status' => false,
                'description' => 'Explore our modern learning interface designed for maximum engagement. Connect with passionate instructors and join a thriving community of learners dedicated to personal and professional growth.',
            ],
            [
                'title' => 'Home 3',
                'type' => 'home',
                'status' => false,
                'description' => 'Experience education reimagined with interactive courses, real-time collaboration, and personalized learning paths. Your journey to mastery starts here with cutting-edge educational technology.',
            ],
            [
                'title' => 'Home 4',
                'type' => 'home',
                'status' => false,
                'description' => 'Discover a world of knowledge at your fingertips. From technical skills to creative arts, our diverse course catalog offers something for every learner seeking to expand their horizons.',
            ],
            [
                'title' => 'Home 5',
                'type' => 'home',
                'status' => false,
                'description' => 'Join thousands of successful learners who have transformed their careers through our innovative platform. Learn from industry experts, practice with real projects, and achieve your goals.',
            ],
            // inner pages
            [
                'title' => 'About Us',
                'type' => 'inner',
                'status' => true,
                'description' => 'Learn about our mission to democratize education and make quality learning accessible to everyone. Meet our dedicated team of educators and innovators committed to your success.',
            ],
            [
                'title' => 'Contact Us',
                'type' => 'inner',
                'status' => true,
                'description' => 'Get in touch with us for any questions or feedback. We are here to help you with your learning journey.',
            ],
            [
                'title' => 'Our Team',
                'type' => 'inner',
                'status' => true,
                'description' => 'Meet the passionate minds behind Mentor LMS. Our diverse team of educators, developers, and designers work tirelessly to create the best learning experience for you.',
            ],
            [
                'title' => 'Cookie Policy',
                'type' => 'inner',
                'status' => true,
                'description' => 'Understand how we use cookies to enhance your learning experience. This policy explains our cookie practices and your choices regarding data collection and personalization.',
            ],
            [
                'title' => 'Terms and Conditions',
                'type' => 'inner',
                'status' => true,
                'description' => 'Review our terms of service that govern your use of Mentor LMS. Understand your rights and responsibilities as a member of our learning community.',
            ],
            [
                'title' => 'Privacy Policy',
                'type' => 'inner',
                'status' => true,
                'description' => 'Learn how we protect your privacy and handle your personal information. We are committed to maintaining the highest standards of data security and transparency.',
            ],
            [
                'title' => 'Refund Policy',
                'type' => 'inner',
                'status' => true,
                'description' => 'Understand our fair and transparent refund policy. We want you to be confident in your learning investment and have clear guidelines for refund requests.',
            ],
        ];

        foreach ($homePages as $page) {
            $slug = Str::slug($page['title']);

            // Load JSON content from file if it exists
            $content = null;
            $jsonFilePath = storage_path('app/page-data/' . $slug . '.json');

            if (file_exists($jsonFilePath)) {
                $jsonContent = file_get_contents($jsonFilePath);
                $content = $jsonContent; // Store as JSON string
            }

            ProjectPage::firstOrCreate(
                ['slug' => $slug, 'url' => '/' . $slug],
                [
                    ...$page,
                    'slug' => $slug,
                    'url' => '/' . $slug,
                    'project_id' => $project->id,
                    'content' => $content,
                ]
            );
        }

        // php artisan module:seed PageEditor --class=PageEditorDatabaseSeeder
    }
}
