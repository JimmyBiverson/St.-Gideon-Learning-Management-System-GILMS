<?php

namespace Modules\Billing\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Services\SettingsService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Billing\Http\Requests\GatewayRequest;
use Modules\Billing\Services\PaymentService;

class PaymentController extends Controller
{
    public function __construct(
        private PaymentService $payment,
        private SettingsService $settings,
    ) {}

    public function index(Request $request, string $from, string $item_type, string $id)
    {
        $payments = $this->settings->getSettings(['type' => 'payment']);
        $currency = app('system')->fields['selling_currency'] ?? 'USD';
        $checkoutItem = $this->payment->getCheckoutItem($item_type, $id, $request->coupon);
        $itemCoupons = $this->payment->validateExamCoupons($item_type, $id);

        return view('billing::payment', [
            'id' => $id,
            'from' => $from,
            'coupon' => $request->coupon,
            'item_type' => $item_type,
            'payments' => $payments,
            'currency' => $currency,
            'itemCoupons' => $itemCoupons,
            ...$checkoutItem,
        ]);
    }

    /**
     * Display a listing of the resource.
     */
    public function payment(Request $request)
    {
        $payments = $this->settings->getSettings(['type' => 'payment']);

        return Inertia::render('Billing/configuration', compact('payments'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function payment_update(GatewayRequest $request, string $id)
    {
        $this->settings->paymentUpdate($request->validated(), $id);

        return back()->with('success', 'Payment gateway settings updated successfully');
    }
}
