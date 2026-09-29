<?php

namespace Modules\Billing\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Services\SettingsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\Billing\Services\PaymentService;

class JazzCashController extends Controller
{
    private $jazzcash;

    private $merchantId;

    private $password;

    private $integrityKey;

    private $actionUrl;

    public function __construct(
        private PaymentService $payment,
        private SettingsService $settingsService,
    ) {
        $this->jazzcash = $this->settingsService->getSetting(['type' => 'payment', 'sub_type' => 'jazzcash']);

        $isTest = $this->jazzcash->fields['test_mode'];

        $this->merchantId = $isTest ? $this->jazzcash->fields['test_merchant_id'] : $this->jazzcash->fields['live_merchant_id'];
        $this->password = $isTest ? $this->jazzcash->fields['test_password'] : $this->jazzcash->fields['live_password'];
        $this->integrityKey = $isTest ? $this->jazzcash->fields['test_integrity_salt'] : $this->jazzcash->fields['live_integrity_salt'];
        $this->actionUrl = $isTest
            ? 'https://sandbox.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/'
            : 'https://payments.jazzcash.com.pk/CustomerPortal/transactionmanagement/merchantform/';
    }

    private function generateHash(array $fields): string
    {
        ksort($fields);
        $values = array_filter(array_values($fields), fn ($v) => $v !== '');
        $stringToHash = $this->integrityKey.'&'.implode('&', $values);

        return hash_hmac('sha256', $stringToHash, $this->integrityKey);
    }

    public function redirect(Request $request)
    {
        $user = Auth::user();
        $checkoutItem = $this->payment->getCheckoutItem(
            $request->item_type,
            $request->item_id,
            $request->coupon
        );

        $txnDateTime = date('YmdHis');
        $txnExpiryDate = date('YmdHis', strtotime('+1 hour'));
        $txnRefNo = 'T'.uniqid();
        $amountInPaisa = (int) round($checkoutItem['finalPrice'] * 100);

        $fields = [
            'pp_Amount' => (string) $amountInPaisa,
            'pp_BillReference' => 'billRef',
            'pp_Description' => 'Course Purchase',
            'pp_Language' => 'EN',
            'pp_MerchantID' => $this->merchantId,
            'pp_Password' => $this->password,
            'pp_ReturnURL' => route('payments.jazzcash.callback'),
            'pp_TxnCurrency' => 'PKR',
            'pp_TxnDateTime' => $txnDateTime,
            'pp_TxnExpiryDateTime' => $txnExpiryDate,
            'pp_TxnRefNo' => $txnRefNo,
            'pp_TxnType' => 'MWALLET',
            'pp_Version' => '1.1',
            'ppmpf_1' => $user->name,
            'ppmpf_2' => '',
            'ppmpf_3' => '',
            'ppmpf_4' => '',
            'ppmpf_5' => '',
        ];

        $fields['pp_SecureHash'] = $this->generateHash($fields);

        setTempStore([
            'user_id' => $user->id,
            'properties' => [
                'from' => $request->from,
                'item_type' => $request->item_type,
                'item_id' => $request->item_id,
                'tx_ref' => $txnRefNo,
                'tax_amount' => $checkoutItem['taxAmount'],
                'coupon_code' => $checkoutItem['coupon'] ? $checkoutItem['coupon']->code : null,
                'amount' => $checkoutItem['finalPrice'],
            ],
        ]);

        return view('paymentgateways::gateways.jazzcash', [
            'actionUrl' => $this->actionUrl,
            'fields' => $fields,
        ]);
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

        if (($request->pp_ResponseCode ?? '') !== '000') {
            return redirect()
                ->route('payments.index', ['from' => $from, 'item' => $item_type, 'id' => $item_id])
                ->with('error', $request->pp_ResponseMessage ?? 'JazzCash payment failed. Please try again.');
        }

        try {
            $this->payment->coursesBuy(
                'jazzcash',
                $item_type,
                $item_id,
                $request->pp_TxnRefNo,
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
}
