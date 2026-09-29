<?php

namespace Modules\Billing\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Services\SettingsService;
use Braintree\Gateway;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\Billing\Services\PaymentService;

class BraintreeController extends Controller
{
    private $braintree;

    private Gateway $gateway;

    public function __construct(
        private PaymentService $payment,
        private SettingsService $settingsService,
    ) {
        $this->braintree = $this->settingsService->getSetting(['type' => 'payment', 'sub_type' => 'braintree']);

        $isTest = $this->braintree->fields['test_mode'];

        $this->gateway = new Gateway([
            'environment' => $isTest ? 'sandbox' : 'production',
            'merchantId' => $isTest ? $this->braintree->fields['test_merchant_id'] : $this->braintree->fields['live_merchant_id'],
            'publicKey' => $isTest ? $this->braintree->fields['test_public_key'] : $this->braintree->fields['live_public_key'],
            'privateKey' => $isTest ? $this->braintree->fields['test_private_key'] : $this->braintree->fields['live_private_key'],
        ]);
    }

    public function redirect(Request $request)
    {
        $user = Auth::user();
        $checkoutItem = $this->payment->getCheckoutItem(
            $request->item_type,
            $request->item_id,
            $request->coupon
        );

        $clientToken = $this->gateway->clientToken()->generate();

        setTempStore([
            'user_id' => $user->id,
            'properties' => [
                'from' => $request->from,
                'item_type' => $request->item_type,
                'item_id' => $request->item_id,
                'tax_amount' => $checkoutItem['taxAmount'],
                'coupon_code' => $checkoutItem['coupon'] ? $checkoutItem['coupon']->code : null,
                'amount' => $checkoutItem['finalPrice'],
            ],
        ]);

        return view('paymentgateways::gateways.braintree', [
            'clientToken' => $clientToken,
            'amount' => $checkoutItem['finalPrice'],
            'currency' => $this->braintree->fields['currency'],
            'user' => $user,
            'action' => route('payments.braintree.payment'),
            'cancelUrl' => route('payments.braintree.cancel'),
            'item' => $checkoutItem['item'],
        ]);
    }

    public function payment(Request $request)
    {
        $request->validate([
            'payment_method_nonce' => ['required', 'string'],
        ]);

        $user = Auth::user();
        $temp = getTempStore($user->id);

        $from = $temp->properties['from'];
        $item_type = $temp->properties['item_type'];
        $item_id = $temp->properties['item_id'];
        $tax_amount = $temp->properties['tax_amount'];
        $coupon_code = $temp->properties['coupon_code'];
        $amount = $temp->properties['amount'];

        try {
            $result = $this->gateway->transaction()->sale([
                'amount' => number_format($amount, 2, '.', ''),
                'paymentMethodNonce' => $request->payment_method_nonce,
                'options' => ['submitForSettlement' => true],
            ]);

            if ($result->success) {
                $this->payment->coursesBuy(
                    'braintree',
                    $item_type,
                    $item_id,
                    $result->transaction->id,
                    $tax_amount,
                    (float) $amount,
                    $coupon_code
                );

                if ($from === 'api') {
                    return redirect()->to(env('FRONTEND_URL').'/student');
                }

                return redirect()
                    ->route('student.index', ['tab' => 'courses'])
                    ->with('success', 'Congratulation! Your payment have completed');
            }

            $errorMessage = $result->message ?? 'Braintree payment failed. Please try again.';

            return redirect()
                ->route('payments.index', ['from' => $from, 'item' => $item_type, 'id' => $item_id])
                ->with('error', $errorMessage);
        } catch (\Throwable $th) {
            return redirect()
                ->route('payments.index', ['from' => $from, 'item' => $item_type, 'id' => $item_id])
                ->with('error', $th->getMessage());
        }
    }

    public function cancel()
    {
        $user = Auth::user();
        $temp = getTempStore($user->id);

        $from = $temp->properties['from'];
        $item_type = $temp->properties['item_type'];
        $item_id = $temp->properties['item_id'];

        return redirect()
            ->route('payments.index', ['from' => $from, 'item' => $item_type, 'id' => $item_id])
            ->with('error', 'Braintree payment was cancelled.');
    }
}
