<?php

namespace Modules\Billing\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Services\SettingsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Modules\Billing\Services\PaymentService;

class PayuController extends Controller
{
    private $payu;

    private $merchantPosId;

    private $signatureKey;

    private $baseUrl;

    public function __construct(
        private PaymentService $payment,
        private SettingsService $settingsService,
    ) {
        $this->payu = $this->settingsService->getSetting(['type' => 'payment', 'sub_type' => 'payu']);

        $isTest = $this->payu->fields['test_mode'];

        $this->merchantPosId = $isTest ? $this->payu->fields['test_merchant_pos_id'] : $this->payu->fields['live_merchant_pos_id'];
        $this->signatureKey = $isTest ? $this->payu->fields['test_signature_key'] : $this->payu->fields['live_signature_key'];
        $this->baseUrl = $isTest ? 'https://secure.snd.payu.com' : 'https://secure.payu.com';
    }

    private function getAccessToken(): ?string
    {
        $response = Http::asForm()->post("{$this->baseUrl}/pl/standard/user/oauth/authorize", [
            'grant_type' => 'client_credentials',
            'client_id' => $this->merchantPosId,
            'client_secret' => $this->signatureKey,
        ]);

        return $response->json('access_token');
    }

    public function payment(Request $request)
    {
        $user = Auth::user();
        $checkoutItem = $this->payment->getCheckoutItem(
            $request->item_type,
            $request->item_id,
            $request->coupon
        );

        $accessToken = $this->getAccessToken();

        if (! $accessToken) {
            return redirect()
                ->route('payments.index', ['from' => $request->from, 'item' => $request->item_type, 'id' => $request->item_id])
                ->with('error', 'PayU authentication failed. Please try again.');
        }

        $currency = $this->payu->fields['currency'];
        $totalAmount = (int) round($checkoutItem['finalPrice'] * 100);
        $extOrderId = 'PU-'.uniqid();

        $response = Http::withToken($accessToken)
            ->withoutRedirecting()
            ->post("{$this->baseUrl}/api/v2_1/orders", [
                'notifyUrl' => route('payments.payu.notify'),
                'continueUrl' => route('payments.payu.return'),
                'customerIp' => $request->ip(),
                'merchantPosId' => $this->merchantPosId,
                'description' => 'Course Purchase',
                'currencyCode' => $currency,
                'totalAmount' => (string) $totalAmount,
                'extOrderId' => $extOrderId,
                'buyer' => [
                    'email' => $user->email,
                    'firstName' => $user->name,
                    'language' => 'en',
                ],
                'products' => [
                    [
                        'name' => $checkoutItem['item']->title,
                        'unitPrice' => (string) $totalAmount,
                        'quantity' => '1',
                    ],
                ],
            ]);

        $redirectUri = $response->header('Location')
            ?? ($response->json('redirectUri') ?? null);

        if ($redirectUri) {
            setTempStore([
                'user_id' => $user->id,
                'properties' => [
                    'from' => $request->from,
                    'item_type' => $request->item_type,
                    'item_id' => $request->item_id,
                    'ext_order_id' => $extOrderId,
                    'tax_amount' => $checkoutItem['taxAmount'],
                    'coupon_code' => $checkoutItem['coupon'] ? $checkoutItem['coupon']->code : null,
                    'amount' => $checkoutItem['finalPrice'],
                ],
            ]);

            return redirect()->away($redirectUri);
        }

        return redirect()
            ->route('payments.index', ['from' => $request->from, 'item' => $request->item_type, 'id' => $request->item_id])
            ->with('error', 'Could not initiate PayU payment. Please try again.');
    }

    public function return(Request $request)
    {
        $user = Auth::user();
        $temp = getTempStore($user->id);

        $from = $temp->properties['from'];
        $item_type = $temp->properties['item_type'];
        $item_id = $temp->properties['item_id'];
        $tax_amount = $temp->properties['tax_amount'];
        $coupon_code = $temp->properties['coupon_code'];
        $amount = $temp->properties['amount'];

        $payuOrderId = $request->orderId ?? null;

        if (! $payuOrderId) {
            return redirect()
                ->route('payments.index', ['from' => $from, 'item' => $item_type, 'id' => $item_id])
                ->with('error', 'PayU order ID missing. Please try again.');
        }

        try {
            $accessToken = $this->getAccessToken();

            $verify = Http::withToken($accessToken)
                ->get("{$this->baseUrl}/api/v2_1/orders/{$payuOrderId}");

            $data = $verify->json();

            if (($data['status'] ?? '') === 'SUCCESS') {
                $this->payment->coursesBuy(
                    'payu',
                    $item_type,
                    $item_id,
                    $payuOrderId,
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

            return redirect()
                ->route('payments.index', ['from' => $from, 'item' => $item_type, 'id' => $item_id])
                ->with('error', 'PayU payment could not be confirmed. Please try again.');
        } catch (\Throwable $th) {
            return redirect()
                ->route('payments.index', ['from' => $from, 'item' => $item_type, 'id' => $item_id])
                ->with('error', $th->getMessage());
        }
    }

    public function notify(Request $request)
    {
        Log::info('PayU IPN', $request->all());

        return response()->json(['status' => 'ok']);
    }
}
