<?php

namespace Modules\Billing\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Models\TempStore;
use App\Services\SettingsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Modules\Billing\Services\PaymentService;

class PayhereController extends Controller
{
    private $payhere;

    private $merchantId;

    private $secret;

    private $actionUrl;

    public function __construct(
        private PaymentService $payment,
        private SettingsService $settingsService,
    ) {
        $this->payhere = $this->settingsService->getSetting(['type' => 'payment', 'sub_type' => 'payhere']);

        $isTest = $this->payhere->fields['test_mode'];

        $this->merchantId = $isTest ? $this->payhere->fields['test_merchant_id'] : $this->payhere->fields['live_merchant_id'];
        $this->secret = $isTest ? $this->payhere->fields['test_secret'] : $this->payhere->fields['live_secret'];
        $this->actionUrl = $isTest
            ? 'https://sandbox.payhere.lk/pay/checkout'
            : 'https://www.payhere.lk/pay/checkout';
    }

    private function generateHash(string $orderId, float $amount, string $currency): string
    {
        $hashedSecret = strtoupper(md5($this->secret));
        $amountFormatted = number_format($amount, 2, '.', '');

        return strtoupper(md5($this->merchantId.$orderId.$amountFormatted.$currency.$hashedSecret));
    }

    public function redirect(Request $request)
    {
        $user = Auth::user();
        $checkoutItem = $this->payment->getCheckoutItem(
            $request->item_type,
            $request->item_id,
            $request->coupon
        );

        $orderId = 'PH-'.uniqid();
        $amount = round($checkoutItem['finalPrice'], 2);
        $currency = $this->payhere->fields['currency'];
        $hash = $this->generateHash($orderId, $amount, $currency);

        setTempStore([
            'user_id' => $user->id,
            'properties' => [
                'from' => $request->from,
                'item_type' => $request->item_type,
                'item_id' => $request->item_id,
                'order_id' => $orderId,
                'tax_amount' => $checkoutItem['taxAmount'],
                'coupon_code' => $checkoutItem['coupon'] ? $checkoutItem['coupon']->code : null,
                'amount' => $amount,
            ],
        ]);

        $nameParts = explode(' ', $user->name, 2);

        return view('paymentgateways::gateways.payhere', [
            'actionUrl' => $this->actionUrl,
            'merchantId' => $this->merchantId,
            'orderId' => $orderId,
            'amount' => number_format($amount, 2, '.', ''),
            'currency' => $currency,
            'hash' => $hash,
            'returnUrl' => route('payments.payhere.return'),
            'notifyUrl' => route('payments.payhere.notify'),
            'firstName' => $nameParts[0],
            'lastName' => $nameParts[1] ?? '',
            'email' => $user->email,
            'itemName' => $checkoutItem['item']->title,
        ]);
    }

    public function return(Request $request)
    {
        $user = Auth::user();
        $temp = getTempStore($user->id);

        $from = $temp->properties['from'];
        $item_type = $temp->properties['item_type'];
        $item_id = $temp->properties['item_id'];

        return redirect()
            ->route('student.index', ['tab' => 'courses'])
            ->with('success', 'Payment submitted! Your enrollment will be confirmed shortly.');
    }

    public function notify(Request $request)
    {
        Log::info('Payhere IPN', $request->all());

        $statusCode = $request->status_code;
        if ($statusCode != 2) {
            return response()->json(['status' => 'ignored']);
        }

        $orderId = $request->order_id;
        $paymentId = $request->payment_id;
        $payhereAmount = $request->payhere_amount;
        $payhereCurrency = $request->payhere_currency;

        // Verify hash
        $hashedSecret = strtoupper(md5($this->secret));
        $localHash = strtoupper(
            md5($this->merchantId.$paymentId.$payhereAmount.$payhereCurrency.$statusCode.$hashedSecret)
        );

        if ($localHash !== strtoupper($request->md5sig)) {
            Log::warning('Payhere IPN hash mismatch', ['order_id' => $orderId]);

            return response()->json(['status' => 'invalid_hash'], 400);
        }

        try {
            // Look up temp store by order_id stored in custom_1
            $temp = TempStore::where('key', $orderId)->first();

            if (! $temp) {
                $temp = TempStore::where('properties->order_id', $orderId)->first();
            }

            if ($temp) {
                $this->payment->coursesBuy(
                    'payhere',
                    $temp->properties['item_type'],
                    $temp->properties['item_id'],
                    $paymentId,
                    (float) $temp->properties['tax_amount'],
                    (float) $payhereAmount,
                    $temp->properties['coupon_code'],
                    $temp->user_id
                );

                $temp->delete();
            }
        } catch (\Throwable $e) {
            Log::error('Payhere IPN processing error', ['error' => $e->getMessage()]);
        }

        return response()->json(['status' => 'ok']);
    }
}
