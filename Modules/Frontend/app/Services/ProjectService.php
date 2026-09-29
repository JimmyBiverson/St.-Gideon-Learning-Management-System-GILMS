<?php

namespace Modules\Frontend\Services;

use App\Models\User;
use App\Services\MediaService;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Modules\Frontend\Models\Project;

class ProjectService extends MediaService
{
    private ?User $user;

    protected ProjectPageService $projectPageService;

    public function __construct()
    {
        $this->user = Auth::user();
        $this->projectPageService = new ProjectPageService;
    }

    public function getProject(?string $id): ?Project
    {
        return DB::transaction(function () use ($id) {
            return Project::query()
                ->where('id', $id)
                ->with('pages')
                ->with('media', function ($query) {
                    return $query->orderBy('created_at', 'desc');
                })
                ->first();
        }, 5);
    }

    public function getProjects(array $data): LengthAwarePaginator
    {
        return DB::transaction(function () use ($data) {
            $page = array_key_exists('per_page', $data) ? intval($data['per_page']) : 10;

            $links = Project::when(array_key_exists('search', $data), function ($query) use ($data) {
                return $query->where('name', 'LIKE', '%'.$data['search'].'%');
            })
                ->where('user_id', $this->user->id)
                ->orderBy('created_at', 'desc')
                ->with('pages')
                ->paginate($page);

            return $links;
        }, 5);
    }

    public function createProject(array $data): Project
    {
        return DB::transaction(function () use ($data) {
            return Project::create([
                ...$data,
                'type' => $this->user ? 'real' : 'temporary',
                'user_id' => $this->user ? $this->user->id : null,
            ]);
        }, 5);
    }

    public function updateProject(Project $project, array $data): Project
    {
        return DB::transaction(function () use ($project, $data) {
            if (array_key_exists('favicon', $data) && $data['favicon']) {
                $data['favicon'] = $this->addNewDeletePrev($project, $data['favicon'], 'favicon');
            }

            $project->update($data);

            return $project;
        }, 5);
    }

    public function createProjectLanding(array $data)
    {
        return DB::transaction(function () use ($data) {
            $project = $this->createProject($data);
            $page = $this->projectPageService->createPage([
                'title' => 'Home',
                'project_id' => $project->id,
            ]);

            return "http://localhost:8000/builder/editor?page={$page->id}&project={$project->id}";
        }, 5);
    }
}
