<?php

namespace Modules\Course\Actions;

use Modules\Course\Models\Course;
use Modules\Course\Models\CourseCategory;
use Modules\Course\Models\CourseCategoryChild;

class GenerateCourseMetaTagsAction
{
    /**
     * Generate meta tags for course listing page
     *
     * @param  object  $courses  Course collection/paginator
     * @return array Meta tags for SEO
     */
    public function forCourseListing($courses, ?CourseCategory $category = null, ?CourseCategoryChild $categoryChild = null): array
    {
        $system = app('system');
        $siteName = $system->fields['name'] ?? 'Mentor Learning Management System';
        $siteUrl = request()->url();

        // Get course count with proper fallback
        $totalCourses = $this->getCoursesCount($courses);

        // Get first course image (prioritize over category image)
        $firstCourseImage = $this->getFirstCourseImage($courses);

        // Generate context-specific meta tags
        if ($category && $categoryChild) {
            return $this->generateCategoryChildMetaTags(
                $category,
                $categoryChild,
                $totalCourses,
                $firstCourseImage,
                $siteName,
                $siteUrl,
                $system
            );
        }

        if ($category) {
            return $this->generateCategoryMetaTags(
                $category,
                $totalCourses,
                $firstCourseImage,
                $siteName,
                $siteUrl,
                $system
            );
        }

        // Default course listing meta tags
        return $this->generateDefaultListingMetaTags(
            $totalCourses,
            $siteName,
            $siteUrl,
            $system
        );
    }

    /**
     * Generate meta tags for single course page
     *
     * @return array Meta tags for SEO
     */
    public function forSingleCourse(Course $course): array
    {
        $system = app('system');
        $siteName = $system->fields['name'] ?? 'Mentor Learning Management System';
        $siteUrl = request()->url();

        $pageTitle = $course->meta_title ?? ($course->title.' | '.$siteName);
        $pageDescription = $course->meta_description
            ?? $course->short_description
            ?? $course->description
            ?? 'Learn with our comprehensive course';

        $pageKeywords = $course->meta_keywords
            ?? ($course->title.', online course, learning, '.($system->fields['keywords'] ?? 'LMS'));

        $ogTitle = $course->og_title ?? $course->title;
        $ogDescription = $course->og_description ?? $pageDescription;

        // Prioritize course images: thumbnail > banner > system banner
        $courseImage = $course->thumbnail ?? $course->banner ?? $system->fields['banner'] ?? '';

        return [
            'metaTitle' => $pageTitle,
            'metaDescription' => $pageDescription,
            'metaKeywords' => $pageKeywords,
            'ogTitle' => $ogTitle,
            'ogDescription' => $ogDescription,
            'ogImage' => $courseImage,
            'ogUrl' => $siteUrl,
            'ogType' => 'article',
            'twitterCard' => 'summary_large_image',
            'twitterTitle' => $ogTitle,
            'twitterDescription' => $ogDescription,
            'twitterImage' => $courseImage,
        ];
    }

    /**
     * Get total courses count from collection or paginator
     */
    private function getCoursesCount($courses): int
    {
        if (isset($courses->total)) {
            return $courses->total;
        }

        if (isset($courses->data) && is_array($courses->data)) {
            return count($courses->data);
        }

        return 0;
    }

    /**
     * Get first course image from collection
     */
    private function getFirstCourseImage($courses): ?string
    {
        if (empty($courses->data) || ! is_array($courses->data) || count($courses->data) === 0) {
            return null;
        }

        $firstCourse = $courses->data[0];

        return $firstCourse->thumbnail ?? $firstCourse->banner ?? null;
    }

    /**
     * Generate meta tags for category child page
     */
    private function generateCategoryChildMetaTags(
        CourseCategory $category,
        CourseCategoryChild $categoryChild,
        int $totalCourses,
        ?string $firstCourseImage,
        string $siteName,
        string $siteUrl,
        $system
    ): array {
        $pageTitle = $categoryChild->title.' Courses in '.$category->title;
        $ogTitle = $categoryChild->title.' - '.$category->title.' Courses';

        $pageDescription = $totalCourses > 0
            ? 'Learn '.strtolower($categoryChild->title)." with $totalCourses specialized courses in ".strtolower($category->title).'. Expert instructors, practical projects, and industry-relevant curriculum.'
            : 'Learn '.strtolower($categoryChild->title).' with specialized courses in '.strtolower($category->title).'. Expert instructors, practical projects, and industry-relevant curriculum.';

        $pageKeywords = strtolower($categoryChild->title).', '.strtolower($category->title).', courses, training, '.$categoryChild->title.' certification, '.$category->title.' skills';

        $categoryImage = $category->thumbnail ?? null;
        $ogImage = $firstCourseImage ?? $categoryImage ?? $system->fields['banner'] ?? '';
        $fullTitle = $pageTitle.' | '.$siteName;

        return [
            'metaTitle' => $fullTitle,
            'metaDescription' => $pageDescription,
            'metaKeywords' => $pageKeywords,
            'ogTitle' => $ogTitle,
            'ogDescription' => $pageDescription,
            'ogImage' => $ogImage,
            'ogUrl' => $siteUrl,
            'ogType' => 'website',
            'twitterCard' => 'summary_large_image',
            'twitterTitle' => $ogTitle,
            'twitterDescription' => $pageDescription,
            'twitterImage' => $ogImage,
        ];
    }

    /**
     * Generate meta tags for category page
     */
    private function generateCategoryMetaTags(
        CourseCategory $category,
        int $totalCourses,
        ?string $firstCourseImage,
        string $siteName,
        string $siteUrl,
        $system
    ): array {
        $pageTitle = $category->title.' Courses';
        $ogTitle = $category->title.' Courses';

        $pageDescription = $totalCourses > 0
            ? "Explore $totalCourses ".strtolower($category->title).' courses taught by industry experts. Master '.strtolower($category->title).' skills with hands-on projects and comprehensive curriculum.'
            : 'Explore '.strtolower($category->title).' courses taught by industry experts. Master '.strtolower($category->title).' skills with hands-on projects and comprehensive curriculum.';

        $pageKeywords = strtolower($category->title).', courses, training, online learning, '.$category->title.' certification, '.$category->title.' skills';

        $categoryImage = $category->thumbnail ?? null;
        $ogImage = $firstCourseImage ?? $categoryImage ?? $system->fields['banner'] ?? '';
        $fullTitle = $pageTitle.' | '.$siteName;

        return [
            'metaTitle' => $fullTitle,
            'metaDescription' => $pageDescription,
            'metaKeywords' => $pageKeywords,
            'ogTitle' => $ogTitle,
            'ogDescription' => $pageDescription,
            'ogImage' => $ogImage,
            'ogUrl' => $siteUrl,
            'ogType' => 'website',
            'twitterCard' => 'summary_large_image',
            'twitterTitle' => $ogTitle,
            'twitterDescription' => $pageDescription,
            'twitterImage' => $ogImage,
        ];
    }

    /**
     * Generate default meta tags for course listing
     */
    private function generateDefaultListingMetaTags(
        int $totalCourses,
        string $siteName,
        string $siteUrl,
        $system
    ): array {
        $pageTitle = 'All Courses';
        $pageDescription = $totalCourses > 0
            ? "Browse $totalCourses+ online courses from expert instructors. Learn new skills with our comprehensive course catalog."
            : 'Browse online courses from expert instructors. Learn new skills with our comprehensive course catalog.';

        $pageKeywords = 'online courses, learning platform, education, skills, training, e-learning';
        $ogTitle = 'Online Courses';
        $fullTitle = $pageTitle.' | '.$siteName;
        $ogImage = $system->fields['banner'] ?? '';

        return [
            'metaTitle' => $fullTitle,
            'metaDescription' => $pageDescription,
            'metaKeywords' => $pageKeywords,
            'ogTitle' => $ogTitle,
            'ogDescription' => $pageDescription,
            'ogImage' => $ogImage,
            'ogUrl' => $siteUrl,
            'ogType' => 'website',
            'twitterCard' => 'summary_large_image',
            'twitterTitle' => $ogTitle,
            'twitterDescription' => $pageDescription,
            'twitterImage' => $ogImage,
        ];
    }
}
