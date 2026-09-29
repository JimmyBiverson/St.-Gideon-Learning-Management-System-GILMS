<?php

namespace App\Services;

use App\Models\Instructor;
use App\Models\JobCircular;
use App\Models\Page;
use Illuminate\Support\Facades\Schema;
use Modules\Blog\Models\Blog;
use Modules\Blog\Models\BlogCategory;
use Modules\Course\Models\Course;
use Modules\Course\Models\CourseCategory;
use Modules\Course\Models\CourseCategoryChild;
use Modules\Exam\Models\Exam;
use Modules\Exam\Models\ExamCategory;
use Modules\Store\Models\Product;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;

class SitemapBuilder
{
    public function build(): Sitemap
    {
        $sitemap = Sitemap::create();

        $this->addStaticPaths($sitemap);
        $this->addPages($sitemap);
        $this->addCourses($sitemap);
        $this->addExams($sitemap);
        $this->addProducts($sitemap);
        $this->addBlogs($sitemap);
        $this->addInstructors($sitemap);
        $this->addJobCirculars($sitemap);
        $this->addCourseCategories($sitemap);
        $this->addExamCategories($sitemap);
        $this->addBlogCategories($sitemap);

        return $sitemap;
    }

    public function writeToFile(?string $path = null): void
    {
        $this->build()->writeToFile($path ?? config('sitemap.path'));
    }

    protected function addStaticPaths(Sitemap $sitemap): void
    {
        foreach (config('sitemap.static_paths', []) as $path) {
            $sitemap->add($this->urlTag(url($path)));
        }
    }

    protected function addPages(Sitemap $sitemap): void
    {
        if (! $this->tableExists('pages')) {
            return;
        }

        $excludedSlugs = config('sitemap.excluded_page_slugs', []);

        Page::query()
            ->active()
            ->when($excludedSlugs !== [], fn ($query) => $query->whereNotIn('slug', $excludedSlugs))
            ->orderBy('id')
            ->cursor()
            ->each(function (Page $page) use ($sitemap): void {
                if ($page->slug === '' || $page->slug === '/') {
                    return;
                }

                $sitemap->add(
                    $this->urlTag(route('inner.page', $page->slug), $page->updated_at)
                );
            });
    }

    protected function addCourses(Sitemap $sitemap): void
    {
        if (! $this->tableExists('courses')) {
            return;
        }

        Course::query()
            ->approved()
            ->select(['id', 'slug', 'updated_at'])
            ->orderBy('id')
            ->cursor()
            ->each(function (Course $course) use ($sitemap): void {
                $sitemap->add(
                    $this->urlTag(
                        route('course.details', ['slug' => $course->slug, 'id' => $course->id]),
                        $course->updated_at
                    )
                );
            });
    }

    protected function addExams(Sitemap $sitemap): void
    {
        if (! $this->tableExists('exams')) {
            return;
        }

        Exam::query()
            ->published()
            ->select(['id', 'slug', 'updated_at'])
            ->orderBy('id')
            ->cursor()
            ->each(function (Exam $exam) use ($sitemap): void {
                $sitemap->add(
                    $this->urlTag(
                        route('exams.details', ['slug' => $exam->slug, 'id' => $exam->id]),
                        $exam->updated_at
                    )
                );
            });
    }

    protected function addProducts(Sitemap $sitemap): void
    {
        if (! $this->tableExists('products')) {
            return;
        }

        Product::query()
            ->approved()
            ->select(['id', 'slug', 'updated_at'])
            ->orderBy('id')
            ->cursor()
            ->each(function (Product $product) use ($sitemap): void {
                $sitemap->add(
                    $this->urlTag(
                        route('products.details', ['slug' => $product->slug, 'id' => $product->id]),
                        $product->updated_at
                    )
                );
            });
    }

    protected function addBlogs(Sitemap $sitemap): void
    {
        if (! $this->tableExists('blogs')) {
            return;
        }

        Blog::query()
            ->published()
            ->select(['id', 'uuid', 'updated_at'])
            ->orderBy('id')
            ->cursor()
            ->each(function (Blog $blog) use ($sitemap): void {
                $sitemap->add(
                    $this->urlTag(route('blogs.read', $blog->uuid), $blog->updated_at)
                );
            });
    }

    protected function addInstructors(Sitemap $sitemap): void
    {
        if (! $this->tableExists('instructors')) {
            return;
        }

        Instructor::query()
            ->approved()
            ->select(['id', 'updated_at'])
            ->orderBy('id')
            ->cursor()
            ->each(function (Instructor $instructor) use ($sitemap): void {
                $sitemap->add(
                    $this->urlTag(route('instructors.show', $instructor->id), $instructor->updated_at)
                );
            });
    }

    protected function addJobCirculars(Sitemap $sitemap): void
    {
        if (! $this->tableExists('job_circulars')) {
            return;
        }

        JobCircular::query()
            ->published()
            ->notExpired()
            ->select(['id', 'uuid', 'updated_at'])
            ->orderBy('id')
            ->cursor()
            ->each(function (JobCircular $jobCircular) use ($sitemap): void {
                $sitemap->add(
                    $this->urlTag(route('job-circulars.show', $jobCircular->uuid), $jobCircular->updated_at)
                );
            });
    }

    protected function addCourseCategories(Sitemap $sitemap): void
    {
        if (! $this->tableExists('course_categories')) {
            return;
        }

        CourseCategory::query()
            ->active()
            ->select(['slug', 'updated_at'])
            ->orderBy('id')
            ->cursor()
            ->each(function (CourseCategory $category) use ($sitemap): void {
                $sitemap->add(
                    $this->urlTag(route('category.courses', $category->slug), $category->updated_at)
                );
            });

        if (! $this->tableExists('course_category_children')) {
            return;
        }

        CourseCategoryChild::query()
            ->active()
            ->with(['course_category:id,slug'])
            ->select(['slug', 'course_category_id', 'updated_at'])
            ->orderBy('id')
            ->cursor()
            ->each(function (CourseCategoryChild $child) use ($sitemap): void {
                if ($child->course_category === null) {
                    return;
                }

                $sitemap->add(
                    $this->urlTag(
                        route('category.courses', [
                            'category' => $child->course_category->slug,
                            'category_child' => $child->slug,
                        ]),
                        $child->updated_at
                    )
                );
            });
    }

    protected function addExamCategories(Sitemap $sitemap): void
    {
        if (! $this->tableExists('exam_categories')) {
            return;
        }

        ExamCategory::query()
            ->active()
            ->notDefault()
            ->select(['slug', 'updated_at'])
            ->orderBy('id')
            ->cursor()
            ->each(function (ExamCategory $category) use ($sitemap): void {
                $sitemap->add(
                    $this->urlTag(route('category.exams', $category->slug), $category->updated_at)
                );
            });
    }

    protected function addBlogCategories(Sitemap $sitemap): void
    {
        if (! $this->tableExists('blog_categories')) {
            return;
        }

        BlogCategory::query()
            ->active()
            ->select(['slug', 'updated_at'])
            ->orderBy('id')
            ->cursor()
            ->each(function (BlogCategory $category) use ($sitemap): void {
                $sitemap->add(
                    $this->urlTag(route('blogs.visit', $category->slug), $category->updated_at)
                );
            });
    }

    protected function urlTag(string $url, ?\DateTimeInterface $lastModified = null): Url
    {
        $tag = Url::create($url);

        if ($lastModified !== null) {
            $tag->setLastModificationDate($lastModified);
        }

        return $tag;
    }

    protected function tableExists(string $table): bool
    {
        return Schema::hasTable($table);
    }
}
