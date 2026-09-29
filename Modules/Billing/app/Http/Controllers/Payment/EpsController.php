<?php

namespace Modules\Billing\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\TempStore;
use App\Models\User;
use App\Services\SettingsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Modules\Billing\Services\Eps\EpsPayment;
use Modules\Billing\Services\PaymentService;

class EpsController extends Controller
{
    public function __construct(
        private PaymentService $payment,
        private SettingsService $settingsService,
    ) {}

    // EPS payment (initiate)
    public function index(Request $request)
    {
        $request->validate([
            'phone' => ['required', 'string'],
            'item_type' => ['required', 'string'],
            'item_id' => ['required'],
        ]);

        $user = Auth::user();

        $checkoutItem = $this->payment->getCheckoutItem(
            $request->item_type,
            $request->item_id,
            $request->coupon
        );

        $item = $checkoutItem['item'];

        $redirectUrl = route('student.index', ['tab' => 'courses']);

        if ($request->item_type === 'course' && isset($item->slug, $item->id)) {
            $redirectUrl = url("/courses/details/{$item->slug}/{$item->id}");
        } elseif ($request->item_type === 'exam' && isset($item->slug, $item->id)) {
            $redirectUrl = url("/exams/details/{$item->slug}/{$item->id}");
        } elseif ($request->item_type === 'product' && isset($item->slug, $item->id)) {
            $redirectUrl = url("/products/details/{$item->slug}/{$item->id}");
        }

        $finalAmount = round((float) ($checkoutItem['finalPrice'] ?? 0), 2);
        if ($finalAmount <= 0) {
            return redirect()->to($redirectUrl)->with('error', 'Invalid payment amount.');
        }

        $tranId = uniqid('eps_');

        setTempStore([
            'key' => $tranId,
            'user_id' => $user->id,
            'properties' => [
                'item_type' => $request->item_type,
                'item_id' => $request->item_id,
                'tax_amount' => (float) ($checkoutItem['taxAmount'] ?? 0),
                'coupon_code' => $checkoutItem['coupon'] ? $checkoutItem['coupon']->code : null,
                'redirect_url' => $redirectUrl,
                'final_amount' => $finalAmount,
            ],
        ]);

        $eps = new EpsPayment;
        $result = $eps->initialize([
            'merchantTransactionId' => $tranId,
            'totalAmount' => $finalAmount,
            'successUrl' => route('payments.eps.success', ['tran_id' => $tranId]),
            'failUrl' => route('payments.eps.fail', ['tran_id' => $tranId]),
            'cancelUrl' => route('payments.eps.cancel', ['tran_id' => $tranId]),
            'customerName' => $user->name ?? 'Customer',
            'customerEmail' => $user->email ?? 'customer@example.com',
            'customerPhone' => (string) $request->phone,
            'productName' => $item->title ?? 'Course Purchase',
        ]);

        if (! $result['success']) {
            Log::error('EPS init failed', $result);

            return redirect()->to($redirectUrl)->with('error', $result['error'] ?? 'Payment failed. Please try again.');
        }

        return redirect()->away($result['redirect_url']);
    }

    public function success(Request $request)
    {
        Log::info('EPS SUCCESS', $request->all());

        $tranId = (string) ($request->query('tran_id')
            ?? $request->query('MerchantTransactionId')
            ?? $request->query('merchantTransactionId')
            ?? '');

        if (! $tranId) {
            return redirect()->route('student.index', ['tab' => 'courses'])
                ->with('error', 'Missing transaction id.');
        }

        $temp = TempStore::where('key', $tranId)->first();
        $redirectUrl = $temp->properties['redirect_url'] ?? route('student.index', ['tab' => 'courses']);

        if (! $temp) {
            Log::warning('EPS SUCCESS temp missing', ['tran_id' => $tranId]);

            return redirect()->to($redirectUrl)->with('error', 'Transaction session not found.');
        }

        $eps = new EpsPayment;
        $status = $eps->checkStatus($tranId)['status'] ?? '';

        if (! in_array($status, ['SUCCESS', 'COMPLETED'], true)) {
            Log::warning('EPS verification failed', ['tran_id' => $tranId, 'status' => $status]);
            $temp->delete();

            return redirect()->to($redirectUrl)->with('error', 'Payment verification failed. Please contact support.');
        }

        $userId = $temp->user_id;
        $itemType = $temp->properties['item_type'] ?? 'course';
        $itemId = $temp->properties['item_id'] ?? null;
        $taxAmount = (float) ($temp->properties['tax_amount'] ?? 0);
        $finalAmount = (float) ($temp->properties['final_amount'] ?? 0);
        $couponCode = $temp->properties['coupon_code'] ?? null;

        if ($userId) {
            Auth::login(User::findOrFail($userId));
        }

        $this->payment->coursesBuy(
            'eps',
            $itemType,
            $itemId,
            $tranId,
            $taxAmount,
            $finalAmount,
            $couponCode
        );

        $temp->delete();

        return redirect()->to($redirectUrl)->with('success', 'Enrollment is successfully done in this course');
    }

    public function fail(Request $request)
    {
        Log::info('EPS FAIL', $request->all());

        return $this->cancelOrFail($request, 'Payment failed. Please try again.');
    }

    public function cancel(Request $request)
    {
        Log::info('EPS CANCEL', $request->all());

        return $this->cancelOrFail($request, 'Payment cancelled.');
    }

    private function cancelOrFail(Request $request, string $message)
    {
        $tranId = (string) ($request->query('tran_id') ?? $request->query('MerchantTransactionId') ?? '');
        $temp = $tranId ? TempStore::where('key', $tranId)->first() : null;

        $redirectUrl = $temp->properties['redirect_url']
            ?? url()->previous()
            ?? route('student.index', ['tab' => 'courses']);

        if ($temp && $temp->user_id) {
            Auth::login(User::findOrFail($temp->user_id), true);
        }

        if ($temp) {
            $temp->delete();
        }

        return redirect()->to($redirectUrl)->with('error', $message);
    }
}
