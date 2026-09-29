<?php

namespace Modules\Billing\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Services\SettingsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Modules\Billing\Services\PaymentService;

class BkashController extends Controller
{
    private $bkash;

    private $appKey;

    private $appSecret;

    private $username;

    private $password;

    private $baseUrl;

    public function __construct(
        private PaymentService $payment,
        private SettingsService $settingsService,
    ) {
        $this->bkash = $this->settingsService->getSetting(['type' => 'payment', 'sub_type' => 'bkash']);

        $isTest = $this->bkash->fields['test_mode'];

        $this->appKey = $isTest ? $this->bkash->fields['test_app_key'] : $this->bkash->fields['live_app_key'];
        $this->appSecret = $isTest ? $this->bkash->fields['test_app_secret'] : $this->bkash->fields['live_app_secret'];
        $this->username = $isTest ? $this->bkash->fields['test_username'] : $this->bkash->fields['live_username'];
        $this->password = $isTest ? $this->bkash->fields['test_password'] : $this->bkash->fields['live_password'];
        $this->baseUrl = $isTest
            ? 'https://tokenized.sandbox.bka.sh/v1.2.0-beta/tokenized/checkout'
            : 'https://tokenized.pay.bka.sh/v1.2.0-beta/tokenized/checkout';
    }

    private function grantToken(): ?string
    {
        $response = Http::withHeaders([
            'username' => $this->username,
            'password' => $this->password,
        ])->post("{$this->baseUrl}/token/grant", [
            'app_key' => $this->appKey,
            'app_secret' => $this->appSecret,
        ]);

        return $response->json('id_token');
    }

    public function payment(Request $request)
    {
        $user = Auth::user();
        $checkoutItem = $this->payment->getCheckoutItem(
            $request->item_type,
            $request->item_id,
            $request->coupon
        );

        $token = $this->grantToken();

        if (! $token) {
            return redirect()
                ->route('payments.index', ['from' => $request->from, 'item' => $request->item_type, 'id' => $request->item_id])
                ->with('error', 'bKash authentication failed. Please try again.');
        }

        $invoiceNo = 'INV-'.uniqid();

        $response = Http::withHeaders([
            'Authorization' => 'Bearer '.$token,
            'X-APP-Key' => $this->appKey,
        ])->post("{$this->baseUrl}/create", [
            'mode' => '0011',
            'payerReference' => $user->email,
            'callbackURL' => route('payments.bkash.callback'),
            'amount' => (string) round($checkoutItem['finalPrice'], 2),
            'currency' => 'BDT',
            'intent' => 'sale',
            'merchantInvoiceNumber' => $invoiceNo,
        ]);

        $body = $response->json();

        if (isset($body['bkashURL'])) {
            setTempStore([
                'user_id' => $user->id,
                'properties' => [
                    'from' => $request->from,
                    'item_type' => $request->item_type,
                    'item_id' => $request->item_id,
                    'payment_id' => $body['paymentID'],
                    'token' => $token,
                    'tax_amount' => $checkoutItem['taxAmount'],
                    'coupon_code' => $checkoutItem['coupon'] ? $checkoutItem['coupon']->code : null,
                ],
            ]);

            return redirect()->away($body['bkashURL']);
        }

        return redirect()
            ->route('payments.index', ['from' => $request->from, 'item' => $request->item_type, 'id' => $request->item_id])
            ->with('error', $body['statusMessage'] ?? 'Could not initiate bKash payment. Please try again.');
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
        $paymentId = $temp->properties['payment_id'];
        $token = $temp->properties['token'];

        if ($request->status !== 'success') {
            return redirect()
                ->route('payments.index', ['from' => $from, 'item' => $item_type, 'id' => $item_id])
                ->with('error', 'bKash payment was cancelled or failed.');
        }

        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer '.$token,
                'X-APP-Key' => $this->appKey,
            ])->post("{$this->baseUrl}/execute", [
                'paymentID' => $paymentId,
            ]);

            $data = $response->json();

            if (($data['statusCode'] ?? '') === '0000') {
                $this->payment->coursesBuy(
                    'bkash',
                    $item_type,
                    $item_id,
                    $data['trxID'],
                    $tax_amount,
                    (float) $data['amount'],
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
                ->with('error', $data['statusMessage'] ?? 'bKash payment execution failed. Please try again.');
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
            ->with('error', 'bKash payment was cancelled.');
    }
}
