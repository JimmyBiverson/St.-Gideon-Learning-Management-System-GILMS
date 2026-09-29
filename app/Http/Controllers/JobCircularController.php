<?php

namespace App\Http\Controllers;

use App\Http\Requests\JobCircularRequest;
use App\Models\JobCircular;
use App\Services\JobCircularService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JobCircularController extends Controller
{
    public function __construct(
        private JobCircularService $jobCircularService
    ) {}

    /**
     * Display a listing of job circulars.
     */
    public function index(Request $request): Response
    {
        $jobCirculars = $this->jobCircularService->getJobCirculars(array_merge($request->all(), [
            'paginate' => true,
            'select' => 'id,uuid,title,status,location,job_type,work_type,experience_level,positions_available,application_deadline',
        ]));

        return Inertia::render('dashboard/job-circulars/index', [
            'jobCirculars' => $jobCirculars,
            'jobTypes' => JobCircular::getJobTypes(),
            'workTypes' => JobCircular::getWorkTypes(),
            'experienceLevels' => JobCircular::getExperienceLevels(),
            'statuses' => JobCircular::getStatuses(),
        ]);
    }

    /**
     * Show the form for creating a new job circular.
     */
    public function create(): Response
    {
        return Inertia::render('dashboard/job-circulars/create-edit', [
            'jobTypes' => JobCircular::getJobTypes(),
            'workTypes' => JobCircular::getWorkTypes(),
            'experienceLevels' => JobCircular::getExperienceLevels(),
            'statuses' => JobCircular::getStatuses(),
        ]);
    }

    /**
     * Store a newly created job circular.
     */
    public function store(JobCircularRequest $request): RedirectResponse
    {
        try {
            $this->jobCircularService->createJobCircular($request->validated());

            return redirect()
                ->route('job-circulars.index')
                ->with('success', 'Job circular created successfully.');
        } catch (\Exception $e) {
            return back()
                ->withInput()
                ->with('error', 'Failed to create job circular: '.$e->getMessage());
        }
    }

    /**
     * Display the specified job circular.
     */
    public function show(JobCircular $jobCircular): Response
    {
        return Inertia::render('job-circulars/show', [
            'jobCircular' => $jobCircular,
        ]);
    }

    /**
     * Show the form for editing the specified job circular.
     */
    public function edit(JobCircular $jobCircular): Response
    {
        return Inertia::render('dashboard/job-circulars/create-edit', [
            'jobCircular' => $jobCircular,
            'jobTypes' => JobCircular::getJobTypes(),
            'workTypes' => JobCircular::getWorkTypes(),
            'experienceLevels' => JobCircular::getExperienceLevels(),
            'statuses' => JobCircular::getStatuses(),
        ]);
    }

    /**
     * Update the specified job circular.
     */
    public function update(JobCircularRequest $request, JobCircular $jobCircular): RedirectResponse
    {
        try {
            $this->jobCircularService->updateJobCircular($jobCircular, $request->validated());

            return redirect()
                ->route('job-circulars.index')
                ->with('success', 'Job circular updated successfully.');
        } catch (\Exception $e) {
            return back()
                ->withInput()
                ->with('error', 'Failed to update job circular: '.$e->getMessage());
        }
    }

    /**
     * Remove the specified job circular.
     */
    public function destroy(JobCircular $jobCircular): RedirectResponse
    {
        try {
            $this->jobCircularService->deleteJobCircular($jobCircular);

            return redirect()
                ->route('job-circulars.index')
                ->with('success', 'Job circular deleted successfully.');
        } catch (\Exception $e) {
            return back()
                ->with('error', 'Failed to delete job circular: '.$e->getMessage());
        }
    }

    /**
     * Toggle job circular status.
     */
    public function toggleStatus(JobCircular $jobCircular): RedirectResponse
    {
        try {
            $updatedJob = $this->jobCircularService->toggleStatus($jobCircular);

            $statusMessage = $updatedJob->status === 'active' ? 'activated' : 'deactivated';

            return back()
                ->with('success', "Job circular {$statusMessage} successfully.");
        } catch (\Exception $e) {
            return back()
                ->with('error', 'Failed to toggle job status: '.$e->getMessage());
        }
    }
}
