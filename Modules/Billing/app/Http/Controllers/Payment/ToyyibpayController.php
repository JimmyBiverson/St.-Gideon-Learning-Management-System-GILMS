<?php

namespace Modules\Billing\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Services\SettingsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Modules\Billing\Services\PaymentService;

class ToyyibpayController extends Controller
{
    private $toyyibpay;

    private $userSecretKey;

    private $categoryCode;

    private $baseUrl;

    public function __construct(
        private PaymentService $payment,
        private SettingsService $settingsService,
    ) {
        $this->toyyibpay = $this->settingsService->getSetting(['type' => 'payment', 'sub_type' => 'toyyibpay']);

        $isTest = $this->toyyibpay->fields['test_mode'];

        $this->userSecretKey = $isTest ? $this->toyyibpay->fields['test_user_secret_key'] : $this->toyyibpay->fields['live_user_secret_key'];
        $this->categoryCode = $isTest ? $this->toyyibpay->fields['test_category_code'] : $this->toyyibpay->fields['live_category_code'];
        $this->baseUrl = $isTest
            ? 'https://dev.toyyibpay.com'
            : 'https://toyyibpay.com';
    }

    public function payment(Request $request)
    {
        $user = Auth::user();
        $checkoutItem = $this->payment->getCheckoutItem(
            $request->item_type,
            $request->item_id,
            $request->coupon
        );

        $billRef = 'TPY-'.uniqid();
        $amountSen = (int) round($checkoutItem['finalPrice'] * 100);

        $response = Http::asForm()->post("{$this->baseUrl}/index.php/api/createBill", [
            'userSecretKey' => $this->userSecretKey,
            'categoryCode' => $this->categoryCode,
            'billName' => 'Course Purchase',
            'billDescription' => $checkoutItem['item']->title,
            'billPriceSetting' => 1,
            'billPayorInfo' => 1,
            'billAmount' => $amountSen,
            'billReturnUrl' => route('payments.toyyibpay.callback'),
            'billCallbackUrl' => route('payments.toyyibpay.callback'),
            'billExternalReferenceNo' => $billRef,
            'billTo' => $user->name,
            'billEmail' => $user->email,
            'billPhone' => '0123456789',
            'billSplitPayment' => 0,
            'billSplitPaymentArgs' => '',
            'billPaymentChannel' => 0,
            'billDisplayMerchant' => 1,
            'billContentEmail' => 'Thank you for your purchase.',
            'billChargeToCustomer' => 1,
        ]);

        $body = $response->json();

        if (is_array($body) && isset($body[0]['BillCode'])) {
            $billCode = $body[0]['BillCode'];

            setTempStore([
                'user_id' => $user->id,
                'properties' => [
                    'from' => $request->from,
                    'item_type' => $request->item_type,
                    'item_id' => $request->item_id,
                    'bill_code' => $billCode,
                    'bill_ref' => $billRef,
                    'tax_amount' => $checkoutItem['taxAmount'],
                    'coupon_code' => $checkoutItem['coupon'] ? $checkoutItem['coupon']->code : null,
                    'amount' => $checkoutItem['finalPrice'],
                ],
            ]);

            return redirect()->away("{$this->baseUrl}/{$billCode}");
        }

        return redirect()
            ->route('payments.index', ['from' => $request->from, 'item' => $request->item_type, 'id' => $request->item_id])
            ->with('error', 'Could not create Toyyibpay bill. Please try again.');
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
        $amount = $temp->properties['amount'];

        // status_id: 1 = success, 2 = failed, 3 = pending
        if ((string) ($request->status_id ?? '') !== '1') {
            return redirect()
                ->route('payments.index', ['from' => $from, 'item' => $item_type, 'id' => $item_id])
                ->with('error', 'Toyyibpay payment was not successful. Please try again.');
        }

        try {
            $transactionId = $request->transaction_id ?? $request->billcode ?? uniqid('TPY-');

            $this->payment->coursesBuy(
                'toyyibpay',
                $item_type,
                $item_id,
                $transactionId,
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
            ->with('error', 'Toyyibpay payment was cancelled.');
    }
}
