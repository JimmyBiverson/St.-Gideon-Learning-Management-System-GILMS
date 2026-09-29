<?php

namespace App\Services;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Modules\Billing\Models\PaymentHistory;
use Modules\Billing\Models\PayoutHistory;
use Modules\Course\Models\Course;
use Modules\Course\Models\CourseEnrollment;
use Modules\Course\Models\SectionLesson;

class DashboardService extends MediaService
{
    public function getDashboard(User $user, $currentYear)
    {
        $isAdmin = $user->role === 'admin';
        $isInstructor = $user->role === 'instructor';

        // Fetch only IDs — no need for full model hydration
        $courses_ids = Course::withoutGlobalScopes()
            ->select('id')
            ->when($isInstructor && $user->instructor_id, function ($query) use ($user) {
                return $query->where('instructor_id', $user->instructor_id);
            })
            ->pluck('id')
            ->toArray();

        // Basic statistics — courses count comes free from the IDs array
        $statistics = [
            'courses' => count($courses_ids),
            'lessons' => SectionLesson::whereIn('course_id', $courses_ids)->count(),
            'enrollments' => CourseEnrollment::whereIn('course_id', $courses_ids)->count(),
            'students' => CourseEnrollment::whereIn('course_id', $courses_ids)->distinct('user_id')->count('user_id'),
            'instructors' => $isAdmin ? User::instructors()->count() : 0,
        ];

        // Whitelist the revenue column to prevent SQL injection from $user->role
        $revenueColumn = match ($user->role) {
            'admin' => 'admin_revenue',
            'instructor' => 'instructor_revenue',
            default => 'platform_revenue',
        };

        // Revenue for current year (monthly breakdown)
        // groupByRaw is used instead of groupBy('month') to avoid ONLY_FULL_GROUP_BY
        // strict mode failures on shared hosting MySQL servers.
        $yearlyRevenue = PaymentHistory::query()
            ->selectRaw("MONTH(created_at) as month, SUM({$revenueColumn}) as revenue")
            ->whereYear('created_at', $currentYear)
            ->where('purchase_type', Course::class)
            ->whereIn('purchase_id', $courses_ids)
            ->groupByRaw('MONTH(created_at)')
            ->orderByRaw('MONTH(created_at)')
            ->get()
            ->keyBy('month')
            ->map(fn ($item) => $item->revenue)
            ->toArray();

        // Fill in missing months with zero revenue
        $revenueData = [];
        for ($month = 1; $month <= 12; $month++) {
            $monthName = Carbon::create($currentYear, $month, 1)->format('F');
            $revenueData[$monthName] = $yearlyRevenue[$month] ?? 0;
        }

        // Course status distribution
        $courseStatusDistribution = $this->getCourseStatusDistribution($courses_ids);

        // Pending withdrawal requests — only columns the UI renders
        $pendingWithdrawals = PayoutHistory::with(['user:id,name,email,photo'])
            ->select('id', 'user_id', 'amount', 'status', 'payout_method', 'created_at', 'updated_at')
            ->when($isInstructor, fn ($q) => $q->where('user_id', $user->id))
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return [
            'statistics' => $statistics,
            'revenueData' => $revenueData,
            'courseStatusDistribution' => $courseStatusDistribution,
            'pendingWithdrawals' => $pendingWithdrawals,
        ];
    }

    public function getCourseStatusDistribution($courses_ids)
    {
        $distribution = Course::withoutGlobalScopes()
            ->select('status', DB::raw('count(*) as count'))
            ->whereIn('id', $courses_ids)
            ->groupBy('status')
            ->get()
            ->mapWithKeys(function ($item) {
                // Map string status values to standardized display names
                $statusLabels = [
                    'approved' => 'Approved',
                    'upcoming' => 'Upcoming',
                    'pending' => 'Pending',
                    'private' => 'Private',
                    'draft' => 'Draft',
                ];

                // For backward compatibility, also handle numeric status if present
                if (is_numeric($item->status)) {
                    $numericLabels = [
                        1 => 'Active',
                        2 => 'Upcoming',
                        3 => 'Pending',
                        4 => 'Private',
                        5 => 'Draft',
                    ];
                    $status = $numericLabels[$item->status] ?? 'Unknown';
                } else {
                    // Handle string status values
                    $status = $statusLabels[$item->status] ?? ucfirst($item->status);
                }

                return [$status => $item->count];
            })
            ->toArray();

        // Ensure all status types are included
        $allStatuses = ['Approved', 'Upcoming', 'Pending', 'Private', 'Draft'];
        foreach ($allStatuses as $status) {
            if (! isset($distribution[$status])) {
                $distribution[$status] = 0;
            }
        }

        return $distribution;
    }
}
