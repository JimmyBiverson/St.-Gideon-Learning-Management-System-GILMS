<?php

namespace App\Services;

use App\Models\JobCircular;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class JobCircularService
{
    /**
     * Get all job circulars with optional filters and pagination.
     */
    public function getJobCirculars(array $data): LengthAwarePaginator
    {

        return DB::transaction(function () use ($data) {
            $pageNumber = array_key_exists('jobs_page', $data) ? intval($data['jobs_page']) : 1;
            $perPage = array_key_exists('jobs_per_page', $data) ? intval($data['per_page']) : 10;

            $jobs = JobCircular::searchWhen('title', $data, 'jobs_search')
                ->when(array_key_exists('select', $data), function ($query) use ($data) {
                    $columns = is_array($data['select']) ? $data['select'] : explode(',', $data['select']);

                    return $query->select($columns);
                })
                ->when(array_key_exists('status', $data), function ($query) use ($data) {
                    return $query->where('status', $data['status']);
                })
                ->when(array_key_exists('job_type', $data), function ($query) use ($data) {
                    return $query->byJobType($data['job_type']);
                })
                ->when(array_key_exists('experience_level', $data), function ($query) use ($data) {
                    return $query->byExperienceLevel($data['experience_level']);
                })
                ->when(array_key_exists('work_type', $data), function ($query) use ($data) {
                    return $query->byWorkType($data['work_type']);
                });

            if (array_key_exists('paginate', $data) && $data['paginate']) {
                return $jobs->paginate($perPage, ['*'], 'jobs_page', $pageNumber);
            }

            return $jobs->get();
        }, 5);
    }

    /**
     * Get active job circulars for public display.
     */
    public function getActiveJobCirculars(array $data): LengthAwarePaginator
    {
        return DB::transaction(function () use ($data) {
            $per_page = array_key_exists('per_page', $data) ? intval($data['per_page']) : 10;

            $query = JobCircular::query()
                ->published()
                ->notExpired()
                ->when(array_key_exists('search', $data), function ($query) use ($data) {
                    return $query->where(function ($q) use ($data) {
                        $q->where('title', 'LIKE', "%{$data['search']}%");
                    });
                })
                ->when(array_key_exists('job_type', $data), function ($query) use ($data) {
                    return $query->byJobType($data['job_type']);
                })
                ->when(array_key_exists('experience_level', $data), function ($query) use ($data) {
                    return $query->byExperienceLevel($data['experience_level']);
                })
                ->when(array_key_exists('work_type', $data), function ($query) use ($data) {
                    return $query->byWorkType($data['work_type']);
                })
                ->orderBy('created_at', 'desc');

            return $query->paginate($per_page);
        }, 5);
    }

    /**
     * Create a new job circular.
     */
    public function createJobCircular(array $data): JobCircular
    {
        return DB::transaction(function () use ($data) {
            return JobCircular::create($data);
        }, 5);
    }

    /**
     * Update an existing job circular.
     */
    public function updateJobCircular(JobCircular $jobCircular, array $data): JobCircular
    {
        return DB::transaction(function () use ($jobCircular, $data) {
            // Set published_at if status is being changed to active for the first time
            if (
                $data['status'] === 'active' &&
                $jobCircular->status !== 'active' &&
                empty($data['published_at'])
            ) {
                $data['published_at'] = now();
            }

            // Clear published_at if status is being changed to draft
            if ($data['status'] === 'draft') {
                $data['published_at'] = null;
            }

            $jobCircular->update($data);

            return $jobCircular->fresh();
        }, 5);
    }

    /**
     * Delete a job circular.
     */
    public function deleteJobCircular(JobCircular $jobCircular): bool
    {
        return DB::transaction(function () use ($jobCircular) {
            return $jobCircular->delete();
        }, 5);
    }

    /**
     * Toggle job circular status between active and draft.
     */
    public function toggleStatus(JobCircular $jobCircular): JobCircular
    {
        return DB::transaction(function () use ($jobCircular) {
            $newStatus = $jobCircular->status === 'active' ? 'draft' : 'active';
            $jobCircular->update(['status' => $newStatus]);

            return $jobCircular->fresh();
        }, 5);
    }

    /**
     * Get job circular statistics.
     */
    public function getStatistics(): array
    {
        return DB::transaction(function () {
            $total = JobCircular::count();
            $active = JobCircular::active()->count();
            $draft = JobCircular::where('status', 'draft')->count();
            $closed = JobCircular::where('status', 'closed')->count();
            $expired = JobCircular::where('application_deadline', '<', now()->format('Y-m-d'))->count();

            return [
                'total' => $total,
                'active' => $active,
                'draft' => $draft,
                'closed' => $closed,
                'expired' => $expired,
            ];
        }, 5);
    }
}
