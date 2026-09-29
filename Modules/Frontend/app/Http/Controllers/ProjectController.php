<?php

namespace Modules\Frontend\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\MediaService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Frontend\Http\Requests\ProjectRequest;
use Modules\Frontend\Http\Requests\StoreImageRequest;
use Modules\Frontend\Models\Project;
use Modules\Frontend\Services\ProjectPageService;
use Modules\Frontend\Services\ProjectService;

class ProjectController extends Controller
{
    protected MediaService $mediaService;

    protected ProjectService $projectService;

    protected ProjectPageService $projectPageService;

    public function __construct()
    {
        $this->mediaService = new MediaService;
        $this->projectService = new ProjectService;
        $this->projectPageService = new ProjectPageService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $projects = $this->projectService->getProjects($request->all());

        return Inertia::render('projects/index', compact('projects'));
    }

    public function show(Project $project)
    {
        $project->load('pages');

        return Inertia::render('projects/show', compact('project'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProjectRequest $request)
    {
        $project = $this->projectService->createProject($request->validated());

        $this->projectPageService->createPage([
            'title' => 'Home',
            'project_id' => $project->id,
        ]);

        return back()->with('success', 'A Project is successfully created.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProjectRequest $request, Project $project)
    {
        $this->projectService->updateProject($project, $request->validated());

        return back()->with('success', 'Project color system is successfully changed.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->delete();

        return back()->with('success', 'A Project is successfully deleted.');
    }

    /**
     * Store multiple images for a project.
     */
    public function storeImage(StoreImageRequest $request)
    {
        $project = Project::findOrFail($request->project_id);
        $uploadedImages = [];

        foreach ($request->file('images') as $image) {
            $media = $project->addMedia($image)->toMediaCollection('images');

            $uploadedImages[] = [
                'id' => $media->id,
                'name' => $media->file_name,
                'url' => $media->getUrl(),
                'size' => $media->size,
                'mime_type' => $media->mime_type,
            ];
        }

        return back()->with([
            'success' => count($uploadedImages).' image(s) successfully uploaded.',
            'uploaded_images' => $uploadedImages,
        ]);
    }

    /**
     * Change the specified resource position.
     */
    public function destroyImage(Project $project, string $image)
    {
        $project->getMedia('*')->find($image)->delete();

        return back()->with(
            'warning',
            'An image successfully deleted. Please remove the image URL path from your project component image source'
        );
    }
}
