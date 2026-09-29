<?php

namespace Modules\Billing\Services;

use App\Models\Instructor;
use App\Models\User;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Modules\Billing\Models\PaymentHistory;
use Modules\Billing\Models\PayoutHistory;
use Modules\Course\Models\Course;

class PayoutService
{
    public function getPayouts(array $params): LengthAwarePaginator|Collection
    {
        $pageNumber = array_key_exists('payouts_page', $params) ? intval($params['payouts_page']) : 1;
        $perPage = array_key_exists('payouts_per_page', $params) ? intval($params['payouts_per_page']) : 10;

        $query = PayoutHistory::query()
            ->when(array_key_exists('select', $params), function ($query) use ($params) {
                $columns = is_array($params['select']) ? $params['select'] : explode(',', $params['select']);

                return $query->select($columns);
            })
            ->when(array_key_exists('relations', $params), function ($query) use ($params) {
                return $query->with($params['relations']);
            })
            ->when(array_key_exists('payouts_search', $params) && $params['payouts_search'], function ($query) use ($params) {
                return $query->where('amount', 'LIKE', '%'.$params['payouts_search'].'%')
                    ->orWhereHas('user', function ($user) use ($params) {
                        $user->where('name', 'LIKE', '%'.$params['payouts_search'].'%')
                            ->orWhere('email', 'LIKE', '%'.$params['payouts_search'].'%');
                    });
            })
            ->when(array_key_exists('status', $params), function ($query) use ($params) {
                return $query->where('status', $params['status']);
            })
            ->when(array_key_exists('user_id', $params), function ($query) use ($params) {
                return $query->where('user_id', $params['user_id']);
            })
            ->orderBy('created_at', 'desc');

        if (array_key_exists('paginate', $params) && $params['paginate']) {
            return $query->paginate($perPage, ['*'], 'payouts_page', $pageNumber);
        }

        return $query->get();
    }

    public function getPayoutRequest(string $request_id): PayoutHistory
    {
        return PayoutHistory::with(['user'])->find($request_id);
    }

    public function getPayoutStatus(User $user): array
    {
        // Get all courses for the current instructor
        $courses = Course::where('instructor_id', $user->instructor_id)->pluck('id');

        // Get all payment histories for these courses
        $paymentHistories = PaymentHistory::query()
            ->where('purchase_type', Course::class)
            ->whereIn('purchase_id', $courses)
            ->where('instructor_revenue', '>', 0)
            ->get();

        // Get all payouts for this user
        $payouts = PayoutHistory::where('user_id', $user->id)->get();

        // Calculate metrics
        $totalEarnings = number_format($paymentHistories->sum('instructor_revenue'), 2, '.', '');
        $totalPaidOut = number_format($payouts->where('status', 'paid')->sum('amount'), 2, '.', '');
        $pendingPayouts = number_format($payouts->where('status', 'pending')->sum('amount'), 2, '.', '');
        $availableForWithdrawal = number_format($totalEarnings - $totalPaidOut - $pendingPayouts, 2, '.', '');

        return [
            'totalEarnings' => $totalEarnings,
            'totalPayouts' => $totalPaidOut,
            'pendingPayouts' => $pendingPayouts,
            'availableForWithdrawal' => max(0, $availableForWithdrawal), // Ensure it's not negative
        ];
    }

    public function createPayout(array $data, string $userId)
    {
        DB::transaction(function () use ($data, $userId) {
            PayoutHistory::create([
                'user_id' => $userId,
                'amount' => $data['amount'],
            ]);
        }, 5);
    }

    public function updatePayoutGateway(array $data, string $id)
    {
        DB::transaction(function () use ($data, $id) {
            $instructor = Instructor::findOrFail($id);
            $payoutMethods = $instructor->payout_methods;

            foreach ($payoutMethods as $key => $method) {
                if ($method['sub_type'] === $data['type']) {
                    $dataWithoutType = array_filter($data, function ($key) {
                        return $key !== 'type';
                    }, ARRAY_FILTER_USE_KEY);

                    $payoutMethods[$key]['fields'] = array_merge($method['fields'], $dataWithoutType);

                    break;
                }
            }

            $instructor->update(['payout_methods' => $payoutMethods]);
        }, 5);
    }

    public function getPayoutGateway(string $instructorId, string $payoutMethod): array
    {
        return DB::transaction(function () use ($instructorId, $payoutMethod) {
            $instructor = Instructor::findOrFail($instructorId);
            $payoutMethods = $instructor->payout_methods;

            foreach ($payoutMethods as $key => $method) {
                if ($method['sub_type'] === $payoutMethod) {
                    return $method;
                }
            }
        }, 5);
    }

    public function getPayoutGateways(string $request_id): array
    {
        return DB::transaction(function () use ($request_id) {
            $payout = PayoutHistory::findOrFail($request_id);
            $user = User::findOrFail($payout->user_id);
            $instructor = Instructor::findOrFail($user->instructor_id);
            $payoutMethods = $instructor->payout_methods;

            return ['payout' => $payout, 'payoutMethods' => $payoutMethods];
        }, 5);
    }

    public function completePayoutRequest(string $payoutId, string $transactionId, string $payoutMethod)
    {
        DB::transaction(function () use ($payoutId, $transactionId, $payoutMethod) {
            PayoutHistory::where('id', $payoutId)->update([
                'status' => 'paid',
                'transaction_id' => $transactionId,
                'payout_method' => $payoutMethod,
            ]);
        }, 5);
    }
}
