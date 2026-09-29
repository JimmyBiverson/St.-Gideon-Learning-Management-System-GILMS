<?php

namespace Modules\Billing\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Services\SettingsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Modules\Billing\Services\PaymentService;

class PaytabsController extends Controller
{
    private $paytabs;

    private $profileId;

    private $serverKey;

    private $apiUrl;

    private const REGION_URLS = [
        'UAE' => 'https://secure.paytabs.com',
        'SAU' => 'https://secure.paytabs.sa',
        'EGY' => 'https://secure-egypt.paytabs.com',
        'OMN' => 'https://secure-oman.paytabs.com',
        'JOR' => 'https://secure-jordan.paytabs.com',
        'IRQ' => 'https://secure-iraq.paytabs.com',
        'GLOBAL' => 'https://secure.paytabs.com',
    ];

    public function __construct(
        private PaymentService $payment,
        private SettingsService $settingsService,
    ) {
        $this->paytabs = $this->settingsService->getSetting(['type' => 'payment', 'sub_type' => 'paytabs']);

        $isTest = $this->paytabs->fields['test_mode'];

        $this->profileId = $isTest ? $this->paytabs->fields['test_profile_id'] : $this->paytabs->fields['live_profile_id'];
        $this->serverKey = $isTest ? $this->paytabs->fields['test_server_key'] : $this->paytabs->fields['live_server_key'];

        $region = $this->paytabs->fields['region'] ?? 'UAE';
        $this->apiUrl = self::REGION_URLS[$region] ?? self::REGION_URLS['UAE'];
    }

    public function payment(Request $request)
    {
        $user = Auth::user();
        $checkoutItem = $this->payment->getCheckoutItem(
            $request->item_type,
            $request->item_id,
            $request->coupon
        );

        $cartId = 'PT-'.uniqid();

        $response = Http::withHeaders([
            'Authorization' => $this->serverKey,
            'Content-Type' => 'application/json',
        ])->post("{$this->apiUrl}/payment/request", [
            'profile_id' => (int) $this->profileId,
            'tran_type' => 'sale',
            'tran_class' => 'ecom',
            'cart_id' => $cartId,
            'cart_currency' => $this->paytabs->fields['currency'],
            'cart_amount' => round($checkoutItem['finalPrice'], 2),
            'cart_description' => $checkoutItem['item']->title,
            'return' => route('payments.paytabs.return'),
            'callback' => route('payments.paytabs.callback'),
            'customer_details' => [
                'name' => $user->name,
                'email' => $user->email,
                'phone' => '0000000000',
                'country' => 'AE',
            ],
        ]);

        $body = $response->json();

        if (isset($body['redirect_url'])) {
            setTempStore([
                'user_id' => $user->id,
                'properties' => [
                    'from' => $request->from,
                    'item_type' => $request->item_type,
                    'item_id' => $request->item_id,
                    'cart_id' => $cartId,
                    'tran_ref' => $body['tran_ref'] ?? null,
                    'tax_amount' => $checkoutItem['taxAmount'],
                    'coupon_code' => $checkoutItem['coupon'] ? $checkoutItem['coupon']->code : null,
                ],
            ]);

            return redirect()->away($body['redirect_url']);
        }

        return redirect()
            ->route('payments.index', ['from' => $request->from, 'item' => $request->item_type, 'id' => $request->item_id])
            ->with('error', $body['message'] ?? 'Could not initiate Paytabs payment. Please try again.');
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
        $tranRef = $request->tranRef ?? $temp->properties['tran_ref'];

        if (! $tranRef) {
            return redirect()
                ->route('payments.index', ['from' => $from, 'item' => $item_type, 'id' => $item_id])
                ->with('error', 'Payment reference missing. Please try again.');
        }

        try {
            $verify = Http::withHeaders([
                'Authorization' => $this->serverKey,
                'Content-Type' => 'application/json',
            ])->post("{$this->apiUrl}/payment/query", [
                'profile_id' => (int) $this->profileId,
                'tran_ref' => $tranRef,
            ]);

            $data = $verify->json();

            if (($data['payment_result']['response_status'] ?? '') === 'A') {
                $amount = $data['cart_amount'];

                $this->payment->coursesBuy(
                    'paytabs',
                    $item_type,
                    $item_id,
                    $tranRef,
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
                ->with('error', $data['payment_result']['response_message'] ?? 'Paytabs payment failed. Please try again.');
        } catch (\Throwable $th) {
            return redirect()
                ->route('payments.index', ['from' => $from, 'item' => $item_type, 'id' => $item_id])
                ->with('error', $th->getMessage());
        }
    }

    public function callback(Request $request)
    {
        Log::info('Paytabs IPN', $request->all());

        return response()->json(['status' => 'ok']);
    }
}
