<?php

namespace Modules\Billing\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Services\SettingsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use MercadoPago\Client\Payment\PaymentClient;
use MercadoPago\Client\Preference\PreferenceClient;
use MercadoPago\MercadoPagoConfig;
use Modules\Billing\Services\PaymentService;

class MercadopagoController extends Controller
{
    private $mercadopago;

    private $accessToken;

    private $isTest;

    public function __construct(
        private PaymentService $payment,
        private SettingsService $settingsService,
    ) {
        $this->mercadopago = $this->settingsService->getSetting(['type' => 'payment', 'sub_type' => 'mercadopago']);
        $this->isTest = $this->mercadopago->fields['test_mode'];
        $this->accessToken = $this->isTest
            ? $this->mercadopago->fields['test_access_token']
            : $this->mercadopago->fields['live_access_token'];
    }

    public function payment(Request $request)
    {
        $user = Auth::user();
        $checkoutItem = $this->payment->getCheckoutItem(
            $request->item_type,
            $request->item_id,
            $request->coupon
        );

        setTempStore([
            'user_id' => $user->id,
            'properties' => [
                'from' => $request->from,
                'item_type' => $request->item_type,
                'item_id' => $request->item_id,
                'tax_amount' => $checkoutItem['taxAmount'],
                'coupon_code' => $checkoutItem['coupon'] ? $checkoutItem['coupon']->code : null,
            ],
        ]);

        MercadoPagoConfig::setAccessToken($this->accessToken);

        $client = new PreferenceClient;

        $preference = $client->create([
            'items' => [
                [
                    'title' => $checkoutItem['item']->title,
                    'quantity' => 1,
                    'unit_price' => round($checkoutItem['finalPrice'], 2),
                    'currency_id' => $this->mercadopago->fields['currency'],
                ],
            ],
            'payer' => [
                'name' => $user->name,
                'email' => $user->email,
            ],
            'back_urls' => [
                'success' => route('payments.mercadopago.success'),
                'failure' => route('payments.mercadopago.cancel'),
                'pending' => route('payments.mercadopago.cancel'),
            ],
            'auto_return' => 'approved',
        ]);

        $redirectUrl = $this->isTest ? $preference->sandbox_init_point : $preference->init_point;

        return redirect()->away($redirectUrl);
    }

    public function success(Request $request)
    {
        $user = Auth::user();
        $temp = getTempStore($user->id);

        $from = $temp->properties['from'];
        $item_type = $temp->properties['item_type'];
        $item_id = $temp->properties['item_id'];
        $tax_amount = $temp->properties['tax_amount'];
        $coupon_code = $temp->properties['coupon_code'];

        if ($request->status !== 'approved') {
            return redirect()
                ->route('payments.index', ['from' => $from, 'item' => $item_type, 'id' => $item_id])
                ->with('error', 'Mercado Pago payment was not approved. Please try again.');
        }

        try {
            MercadoPagoConfig::setAccessToken($this->accessToken);

            $paymentId = $request->payment_id;

            $mpPayment = (new PaymentClient)->get($paymentId);

            $this->payment->coursesBuy(
                'mercadopago',
                $item_type,
                $item_id,
                (string) $paymentId,
                $tax_amount,
                (float) $mpPayment->transaction_amount,
                $coupon_code
            );

            if ($from === 'api') {
                return redirect()->to(env('FRONTEND_URL').'/student');
            }

            return redirect()
                ->route('student.index', ['tab' => 'courses'])
                ->with('success', 'Congratulation! Your payment have completed');
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
            ->with('error', 'Mercado Pago payment was cancelled or failed.');
    }
}
