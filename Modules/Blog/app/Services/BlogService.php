<?php

namespace Modules\Blog\Services;

use App\Models\User;
use App\Services\MediaService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Blog\Models\Blog;

class BlogService extends MediaService
{
    public function getBlogs(array $data, ?User $user = null): LengthAwarePaginator|Collection
    {
        $pageNumber = array_key_exists('blogs_page', $data) ? intval($data['blogs_page']) : 1;
        $perPage = array_key_exists('blogs_per_page', $data) ? intval($data['blogs_per_page']) : 10;

        $blogs = Blog::searchWhen('title', $data, 'blogs_search')
            ->when(array_key_exists('relations', $data) && $data['relations'], function ($query) use ($data) {
                return $query->with($data['relations']);
            })
            ->when(array_key_exists('select', $data), function ($query) use ($data) {
                $columns = is_array($data['select']) ? $data['select'] : explode(',', $data['select']);

                return $query->select($columns);
            })
            ->when(array_key_exists('category', $data) && $data['category'] && $data['category'] !== 'all', function ($query) use ($data) {
                return $query->inCategory($data['category']);
            })
            ->when(array_key_exists('status', $data) && $data['status'] && $data['status'] !== 'all', function ($query) use ($data) {
                return $query->where('status', $data['status']);
            })
            ->when($user && $user->role === 'instructor', function ($query) use ($user) {
                return $query->byAuthor($user->id);
            });

        if (array_key_exists('paginate', $data) && $data['paginate']) {
            return $blogs->paginate($perPage, ['*'], 'blogs_page', $pageNumber);
        }

        return $blogs->get();
    }

    public function getBlog(string $id, array $data): ?Blog
    {
        return Blog::when(array_key_exists('with', $data) && $data['with'], function ($query) use ($data) {
            return $query->with($data['with']);
        })
            ->when(array_key_exists('status', $data) && $data['status'] && $data['status'] !== 'all', function ($query) use ($data) {
                return $query->where('status', $data['status']);
            })
            ->find($id);
    }

    public function getBlogsStats()
    {
        // Get statistics
        $statistics = [
            'total' => Blog::count(),
            'published' => Blog::published()->count(),
            'draft' => Blog::where('status', 'draft')->count(),
            'archived' => Blog::where('status', 'archived')->count(),
        ];

        return [
            'statistics' => $statistics,
            'statuses' => Blog::getStatuses(),
        ];
    }

    public function storeBlog(array $data): Blog
    {
        $data['slug'] = getModelUniqueSlug(Blog::class, $data['title']) ?? '';
        $blog = Blog::create($data);

        if (array_key_exists('thumbnail', $data) && $data['thumbnail']) {
            $blog->update([
                'thumbnail' => $this->addNewDeletePrev($blog, $data['thumbnail'], 'thumbnail'),
            ]);
        }

        if (array_key_exists('banner', $data) && $data['banner']) {
            $blog->update([
                'banner' => $this->addNewDeletePrev($blog, $data['banner'], 'banner'),
            ]);
        }

        return $blog;
    }

    public function updateBlog(string $id, array $data): ?Blog
    {
        $blog = Blog::findOrFail($id);

        if (array_key_exists('thumbnail', $data) && $data['thumbnail']) {
            $data['thumbnail'] = $this->addNewDeletePrev($blog, $data['thumbnail'], 'thumbnail');
        }

        if (array_key_exists('banner', $data) && $data['banner']) {
            $data['banner'] = $this->addNewDeletePrev($blog, $data['banner'], 'banner');
        }

        $blog->update(removeNullProperties($data));

        return $blog;
    }
}
