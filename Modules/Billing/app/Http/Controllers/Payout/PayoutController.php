<?php

namespace Modules\Billing\Http\Controllers\Payout;

use App\Http\Controllers\Controller;
use App\Models\Instructor;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Modules\Billing\Http\Requests\GatewayRequest;
use Modules\Billing\Http\Requests\StorePayoutRequest;
use Modules\Billing\Services\PayoutService;

class PayoutController extends Controller
{
    public function __construct(
        private PayoutService $payoutService,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $stats = $this->payoutService->getPayoutStatus($user);
        $payouts = $this->payoutService->getPayouts(array_merge($request->all(), [
            'user_id' => $user->id,
            'select' => ['id', 'amount', 'created_at', 'status', 'payout_method', 'updated_at'],
            'paginate' => true,
        ]));

        return Inertia::render('Billing/payouts/index', [
            ...$stats,
            'payouts' => $payouts,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePayoutRequest $request)
    {
        $user = Auth::user();
        $stats = $this->payoutService->getPayoutStatus($user);

        if ($request->amount > $stats['availableForWithdrawal']) {
            return back()->with('error', 'Insufficient balance');
        }

        $this->payoutService->createPayout($request->validated(), $user->id);

        return back()->with('success', 'Payout request created successfully');
    }

    /**
     * Display a listing of the resource.
     */
    public function settings()
    {
        /** @var Instructor $instructor */
        $instructor = Auth::user()->instructor;

        return Inertia::render('Billing/payouts/settings', compact('instructor'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(GatewayRequest $request)
    {
        /** @var Instructor $instructor */
        $instructor = Auth::user()->instructor;
        $this->payoutService->updatePayoutGateway($request->validated(), $instructor->id);

        return back()->with('success', 'Payout gateway updated successfully');
    }

    /**
     * Display a listing of the resource.
     */
    public function request(Request $request)
    {
        $payouts = $this->payoutService->getPayouts(array_merge($request->all(), [
            'status' => 'pending',
            'select' => ['id', 'amount', 'status', 'user_id'],
            'relations' => ['user:id,name,email,photo'],
            'paginate' => true,
        ]));

        return Inertia::render('Billing/payouts/request', compact('payouts'));
    }

    /**
     * Display a listing of the resource.
     */
    public function history(Request $request)
    {
        $payouts = $this->payoutService->getPayouts(array_merge($request->all(), [
            'status' => 'paid',
            'select' => ['id', 'amount', 'payout_method', 'status', 'updated_at', 'user_id'],
            'relations' => ['user:id,name,email,photo'],
            'paginate' => true,
        ]));

        return Inertia::render('Billing/payouts/history', compact('payouts'));
    }

    public function checkout(string $slug, string $request_id)
    {
        $payouts = $this->payoutService->getPayoutGateways($request_id);

        return view('billing::payout', [
            ...$payouts,
            'slug' => $slug,
            'request_id' => $request_id,
        ]);
    }
}
