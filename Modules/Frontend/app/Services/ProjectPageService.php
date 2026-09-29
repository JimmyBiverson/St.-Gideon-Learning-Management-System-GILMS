<?php

namespace Modules\Frontend\Services;

use App\Services\MediaService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Modules\Frontend\Models\ProjectPage;

class ProjectPageService extends MediaService
{
    public function getPage(?string $id): ?ProjectPage
    {
        return DB::transaction(function () use ($id) {
            return ProjectPage::query()
                ->where('id', $id)
                ->with(['components' => function ($query) {
                    $query->orderBy('position', 'asc');
                }])
                ->first();

            // if ($page) {
            //     // Loop through each component to order their media by created_at
            //     foreach ($page->components as $component) {
            //         $component->setRelation('media', $component->media()->orderBy('created_at', 'desc')->get());
            //     }
            // }

        }, 5);
    }

    public function createPage(array $data): ProjectPage
    {
        $slug = Str::of($data['title'])->slug('-')->value();

        return DB::transaction(function () use ($data, $slug) {
            return ProjectPage::create([
                'slug' => $slug,
                ...$data,
            ]);
        }, 5);
    }

    public function updatePage(ProjectPage $page, array $data)
    {
        return DB::transaction(function () use ($page, $data) {
            if (array_key_exists('banner', $data) && $data['banner']) {
                $data['banner'] = $this->addNewDeletePrev($page, $data['banner'], $page->id.'banner');
            }

            if ($page->title !== $data['title']) {
                $data['slug'] = Str::of($data['title'])->slug('-')->value();
            }

            if ($data['type'] === 'home') {
                ProjectPage::where('type', 'home')->where('id', '!=', $page->id)->update([
                    'status' => false,
                ]);
            }

            return $page->update($data);
        }, 5);
    }
}
