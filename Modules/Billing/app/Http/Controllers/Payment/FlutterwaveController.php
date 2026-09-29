<?php

namespace Modules\Billing\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Services\SettingsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Modules\Billing\Services\PaymentService;

class FlutterwaveController extends Controller
{
    private $flutterwave;

    private $secretKey;

    public function __construct(
        private PaymentService $payment,
        private SettingsService $settingsService,
    ) {
        $this->flutterwave = $this->settingsService->getSetting(['type' => 'payment', 'sub_type' => 'flutterwave']);
        $isTest = $this->flutterwave->fields['test_mode'];

        $this->secretKey = $isTest
            ? $this->flutterwave->fields['test_secret_key']
            : $this->flutterwave->fields['live_secret_key'];
    }

    public function payment(Request $request)
    {
        $user = Auth::user();
        $checkoutItem = $this->payment->getCheckoutItem(
            $request->item_type,
            $request->item_id,
            $request->coupon
        );

        $txRef = 'FLW-'.uniqid();

        $response = Http::withToken($this->secretKey)
            ->post('https://api.flutterwave.com/v3/payments', [
                'tx_ref' => $txRef,
                'amount' => round($checkoutItem['finalPrice'], 2),
                'currency' => $this->flutterwave->fields['currency'],
                'redirect_url' => route('payments.flutterwave.callback'),
                'customer' => [
                    'email' => $user->email,
                    'name' => $user->name,
                ],
                'customizations' => [
                    'title' => 'Course Purchase',
                    'description' => $checkoutItem['item']->title,
                ],
            ]);

        $body = $response->json();

        if (($body['status'] ?? '') === 'success' && isset($body['data']['link'])) {
            setTempStore([
                'user_id' => $user->id,
                'properties' => [
                    'from' => $request->from,
                    'item_type' => $request->item_type,
                    'item_id' => $request->item_id,
                    'tx_ref' => $txRef,
                    'tax_amount' => $checkoutItem['taxAmount'],
                    'coupon_code' => $checkoutItem['coupon'] ? $checkoutItem['coupon']->code : null,
                ],
            ]);

            return redirect()->away($body['data']['link']);
        }

        return redirect()
            ->route('payments.index', ['from' => $request->from, 'item' => $request->item_type, 'id' => $request->item_id])
            ->with('error', $body['message'] ?? 'Could not initiate Flutterwave payment. Please try again.');
    }

    public function callback(Request $request)
    {
        $user = Auth::user();
        $temp = getTempStore($user->id);

        $from = $temp->properties['from'];
        $item_type = $temp->properties['item_type'];
        $item_id = $temp->properties['item_id'];
        $tax_amount = $temp->properties['tax_amount'];
        $coupon_code = $temp->properties['coupon_code'];

        if ($request->status !== 'successful') {
            return redirect()
                ->route('payments.index', ['from' => $from, 'item' => $item_type, 'id' => $item_id])
                ->with('error', 'Flutterwave payment was not successful. Please try again.');
        }

        try {
            $transactionId = $request->transaction_id;

            $verify = Http::withToken($this->secretKey)
                ->get("https://api.flutterwave.com/v3/transactions/{$transactionId}/verify");

            $data = $verify->json();

            if (($data['status'] ?? '') === 'success' && ($data['data']['status'] ?? '') === 'successful') {
                $amount = $data['data']['amount'];

                $this->payment->coursesBuy(
                    'flutterwave',
                    $item_type,
                    $item_id,
                    (string) $transactionId,
                    $tax_amount,
                    $amount,
                    $coupon_code
                );

                if ($from === 'api') {
                    return redirect()->to(env('FRONTEND_URL').'/student');
                }

                return redirect()
                    ->route('student.index', ['tab' => 'courses'])
                    ->with('success', 'Congratulation! Your payment have completed');
            }

            return redirect()
                ->route('payments.index', ['from' => $from, 'item' => $item_type, 'id' => $item_id])
                ->with('error', 'Flutterwave payment verification failed. Please try again.');
        } catch (\Throwable $th) {
            return redirect()
                ->route('payments.index', ['from' => $from, 'item' => $item_type, 'id' => $item_id])
                ->with('error', $th->getMessage());
        }
    }
}
