<?php

namespace Modules\Blog\Actions;

use Modules\Blog\Models\Blog;
use Modules\Blog\Models\BlogCategory;

class GenerateBlogMetaTagsAction
{
    /**
     * Generate meta tags for the blog listing page.
     */
    public function forBlogListing($blogs, ?BlogCategory $category = null): array
    {
        $system = app('system');
        $siteName = $system->fields['name'] ?? 'Mentor Learning Management System';
        $siteUrl = request()->url();

        $totalBlogs = $this->getBlogsCount($blogs);
        $firstBlogImage = $this->getFirstBlogImage($blogs);

        if ($category) {
            return $this->generateCategoryMetaTags(
                $category,
                $totalBlogs,
                $firstBlogImage,
                $siteName,
                $siteUrl,
                $system
            );
        }

        return $this->generateDefaultListingMetaTags(
            $totalBlogs,
            $siteName,
            $siteUrl,
            $system
        );
    }

    /**
     * Generate meta tags for a single blog post page.
     */
    public function forSingleBlog(Blog $blog): array
    {
        $system = app('system');
        $siteName = $system->fields['name'] ?? 'Mentor Learning Management System';
        $siteUrl = request()->url();

        $plainDescription = trim(preg_replace('/\s+/', ' ', strip_tags($blog->description ?? '')));
        $pageDescription = strlen($plainDescription) > 160
            ? substr($plainDescription, 0, 157).'...'
            : $plainDescription;

        $pageTitle = $blog->title.' | '.$siteName;
        $pageKeywords = $blog->keywords ?? ($blog->title.', blog, '.($system->fields['keywords'] ?? 'LMS'));
        $ogImage = $blog->banner ?? $blog->thumbnail ?? $system->fields['banner'] ?? '';

        return [
            'metaTitle' => $pageTitle,
            'metaDescription' => $pageDescription,
            'metaKeywords' => $pageKeywords,
            'ogTitle' => $blog->title,
            'ogDescription' => $pageDescription,
            'ogImage' => $ogImage,
            'ogUrl' => $siteUrl,
            'ogType' => 'article',
            'twitterCard' => 'summary_large_image',
            'twitterTitle' => $blog->title,
            'twitterDescription' => $pageDescription,
            'twitterImage' => $ogImage,
        ];
    }

    /**
     * Get total blogs count from a paginator or collection.
     */
    private function getBlogsCount($blogs): int
    {
        if (isset($blogs->total)) {
            return $blogs->total;
        }

        if (isset($blogs->data) && is_array($blogs->data)) {
            return count($blogs->data);
        }

        return 0;
    }

    /**
     * Get the first blog image from the collection.
     */
    private function getFirstBlogImage($blogs): ?string
    {
        if (empty($blogs->data) || ! is_array($blogs->data) || count($blogs->data) === 0) {
            return null;
        }

        $first = $blogs->data[0];

        return $first->thumbnail ?? $first->banner ?? null;
    }

    /**
     * Generate meta tags for a category-filtered blog listing.
     */
    private function generateCategoryMetaTags(
        BlogCategory $category,
        int $totalBlogs,
        ?string $firstBlogImage,
        string $siteName,
        string $siteUrl,
        $system
    ): array {
        $pageTitle = $category->name.' Blogs';
        $ogTitle = $category->name.' Blog Posts';

        $pageDescription = $totalBlogs > 0
            ? "Read $totalBlogs ".strtolower($category->name).' blog posts from our expert authors. Stay up to date with the latest insights and articles.'
            : 'Read '.strtolower($category->name).' blog posts from our expert authors. Stay up to date with the latest insights and articles.';

        $pageKeywords = strtolower($category->name).', blog, articles, '.($system->fields['keywords'] ?? 'LMS');
        $ogImage = $firstBlogImage ?? $system->fields['banner'] ?? '';
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
     * Generate default meta tags for the blog listing.
     */
    private function generateDefaultListingMetaTags(
        int $totalBlogs,
        string $siteName,
        string $siteUrl,
        $system
    ): array {
        $pageTitle = 'All Blogs';
        $pageDescription = $totalBlogs > 0
            ? "Browse $totalBlogs+ blog posts from our expert authors. Discover insights, tutorials, and the latest updates."
            : 'Browse blog posts from our expert authors. Discover insights, tutorials, and the latest updates.';

        $pageKeywords = 'blogs, articles, tutorials, insights, learning, '.($system->fields['keywords'] ?? 'LMS');
        $ogTitle = 'Latest Blog Posts';
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
