<?php

namespace Modules\Billing\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\TempStore;
use App\Models\User;
use App\Services\SettingsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Modules\Billing\Services\PaymentService;
use Modules\Billing\Services\SslCommerz\SslCommerzNotification;

class SslCommerzController extends Controller
{
    private $sslcommerz;

    public function __construct(
        private PaymentService $payment,
        private SettingsService $settingsService,
    ) {
        $this->sslcommerz = $this->settingsService->getSetting(['type' => 'payment', 'sub_type' => 'sslcommerz']);
    }

    // SSLCommerz payment (initiate)
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

        $productName = $item->title ?? 'Course Purchase';
        $productCategory = 'Online Course';
        if (isset($item->course_category) && $item->course_category) {
            $productCategory = $item->course_category->title ?? 'Online Course';
        } elseif (isset($item->exam_category) && $item->exam_category) {
            $productCategory = $item->exam_category->title ?? 'Online Course';
        }

        $tranId = uniqid();

        $finalAmount = round((float) ($checkoutItem['finalPrice'] ?? 0), 2);
        if ($finalAmount <= 0) {
            return redirect()->to($redirectUrl)->with('error', 'Invalid payment amount.');
        }

        $post_data = [];
        $post_data['total_amount'] = $finalAmount;
        $post_data['currency'] = $this->sslcommerz->fields['currency'] ?? 'BDT';
        $post_data['tran_id'] = $tranId;

        // CUSTOMER INFORMATION
        $post_data['cus_name'] = $user->name ?? 'Customer';
        $post_data['cus_email'] = $user->email ?? 'customer@example.com';
        $post_data['cus_phone'] = (string) $request->phone;

        $post_data['shipping_method'] = 'NO';
        $post_data['product_name'] = $productName;
        $post_data['product_category'] = $productCategory;
        $post_data['product_profile'] = 'online-course';

        $isSandbox = (bool) config('paymentgateways.sslcommerz.connect_from_localhost', false);

        setTempStore([
            'key' => $tranId,
            'user_id' => $user->id,
            'properties' => [
                'from' => $request->from ?? 'web',
                'item_type' => $request->item_type,
                'item_id' => $request->item_id,
                'tax_amount' => (float) ($checkoutItem['taxAmount'] ?? 0),
                'coupon_code' => $checkoutItem['coupon'] ? $checkoutItem['coupon']->code : null,
                'redirect_url' => $redirectUrl,
                'final_amount' => $finalAmount,
                'is_sandbox' => $isSandbox ? 1 : 0,
            ],
        ]);

        try {
            $sslc = new SslCommerzNotification;
            $payment_options = $sslc->makePayment($post_data, 'hosted');

            // makePayment with 'hosted' type calls header() + exit() on success,
            // so if we reach here it means the gateway returned an error string.
            Log::error('SSLCOMMERZ makePayment failed', ['response' => $payment_options]);

            return redirect()->to($redirectUrl)->with('error', 'Payment gateway error. Please try again.');
        } catch (\Throwable $e) {
            Log::error('SSLCOMMERZ makePayment exception', ['msg' => $e->getMessage(), 'trace' => $e->getTraceAsString()]);

            return redirect()->to($redirectUrl)->with('error', 'Payment failed. Please try again.');
        }
    }

    public function success(Request $request)
    {
        Log::info('SSLCOMMERZ SUCCESS', $request->all());

        $tranId = (string) ($request->input('tran_id') ?? $request->query('tran_id') ?? '');
        if (! $tranId) {
            return redirect()->route('student.index', ['tab' => 'courses'])
                ->with('error', 'Missing transaction id.');
        }

        $temp = TempStore::where('key', $tranId)->first();
        $redirectUrl = $temp->properties['redirect_url'] ?? route('student.index', ['tab' => 'courses']);

        if (! $temp) {
            Log::warning('SSLCOMMERZ SUCCESS temp missing', ['tran_id' => $tranId]);

            return redirect()->to($redirectUrl)->with('error', 'Transaction session not found.');
        }

        $amount = (float) ($request->input('amount') ?? $request->input('store_amount') ?? 0);
        if ($amount <= 0) {
            $amount = (float) ($temp->properties['final_amount'] ?? 0);
        }

        $currency = (string) ($request->input('currency') ?? $request->input('currency_type') ?? ($this->sslcommerz->fields['currency'] ?? 'BDT'));

        $sslc = new SslCommerzNotification;
        $validation = $sslc->orderValidate($request->all(), $tranId, $amount, $currency);

        if (! $validation) {
            Log::warning('SSLCOMMERZ validation failed', ['tran_id' => $tranId, 'amount' => $amount, 'currency' => $currency]);

            return redirect()->to($redirectUrl)->with('error', 'Payment verification failed. Please contact support.');
        }

        $userId = $temp->user_id;
        $from = $temp->properties['from'] ?? 'web';
        $itemType = $temp->properties['item_type'] ?? 'course';
        $itemId = $temp->properties['item_id'] ?? null;
        $taxAmount = (float) ($temp->properties['tax_amount'] ?? 0);
        $couponCode = $temp->properties['coupon_code'] ?? null;

        // Login user before processing payment
        if ($userId) {
            Auth::login(User::findOrFail($userId));
        }

        $this->payment->coursesBuy(
            'sslcommerz',
            $itemType,
            $itemId,
            $tranId,
            $taxAmount,
            $amount,
            $couponCode
        );

        $temp->delete();

        return redirect()->to($redirectUrl)->with('success', 'Enrollment is successfully done in this course');
    }

    public function fail(Request $request)
    {
        Log::info('SSLCOMMERZ FAIL', $request->all());

        $tranId = (string) ($request->input('tran_id') ?? $request->query('tran_id') ?? '');
        $temp = $tranId ? TempStore::where('key', $tranId)->first() : null;

        $redirectUrl = $temp->properties['redirect_url']
            ?? url()->previous()
            ?? route('student.index', ['tab' => 'courses']);

        if ($temp && $temp->user_id) {
            $user = User::findOrFail($temp->user_id);
            if ($user) {
                Auth::login($user, true); // remember=true
                // যদি তোমার student guard হয়: Auth::guard('student')->login($user, true);
            }
        }

        if ($temp) {
            $temp->delete();
        }

        return redirect()->to($redirectUrl)
            ->with('error', 'Payment failed. Please try again.');
    }

    public function cancel(Request $request)
    {
        Log::info('SSLCOMMERZ CANCEL', $request->all());

        $tranId = (string) ($request->input('tran_id') ?? $request->query('tran_id') ?? '');
        $temp = $tranId ? TempStore::where('key', $tranId)->first() : null;

        $redirectUrl = $temp->properties['redirect_url']
            ?? url()->previous()
            ?? route('student.index', ['tab' => 'courses']);

        if ($temp && $temp->user_id) {
            $user = User::findOrFail($temp->user_id);
            if ($user) {
                Auth::login($user, true);
                // student guard হলে: Auth::guard('student')->login($user, true);
            }
        }

        if ($temp) {
            $temp->delete();
        }

        return redirect()->to($redirectUrl)
            ->with('error', 'Payment cancelled.');
    }

    public function ipn(Request $request)
    {
        Log::info('SSLCOMMERZ IPN', $request->all());

        return response()->json(['ok' => true]);
    }
}
