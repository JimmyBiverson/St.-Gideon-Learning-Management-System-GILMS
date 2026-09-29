<?php

namespace Modules\Billing\Http\Controllers\Payment;

use App\Http\Controllers\Controller;
use App\Services\SettingsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Modules\Billing\Services\PaymentService;

class XenditController extends Controller
{
    private $xendit;

    private $secretKey;

    public function __construct(
        private PaymentService $payment,
        private SettingsService $settingsService,
    ) {
        $this->xendit = $this->settingsService->getSetting(['type' => 'payment', 'sub_type' => 'xendit']);
        $this->secretKey = $this->xendit->fields['test_mode']
            ? $this->xendit->fields['test_secret_key']
            : $this->xendit->fields['live_secret_key'];
    }

    public function payment(Request $request)
    {
        $user = Auth::user();
        $checkoutItem = $this->payment->getCheckoutItem(
            $request->item_type,
            $request->item_id,
            $request->coupon
        );

        $externalId = 'XND-'.uniqid();

        $response = Http::withBasicAuth($this->secretKey, '')
            ->post('https://api.xendit.co/v2/invoices', [
                'external_id' => $externalId,
                'amount' => round($checkoutItem['finalPrice'], 2),
                'currency' => $this->xendit->fields['currency'],
                'description' => $checkoutItem['item']->title,
                'success_redirect_url' => route('payments.xendit.callback'),
                'failure_redirect_url' => route('payments.xendit.cancel'),
                'customer' => [
                    'email' => $user->email,
                    'given_names' => $user->name,
                ],
            ]);

        $body = $response->json();

        if (isset($body['invoice_url'])) {
            setTempStore([
                'user_id' => $user->id,
                'properties' => [
                    'from' => $request->from,
                    'item_type' => $request->item_type,
                    'item_id' => $request->item_id,
                    'invoice_id' => $body['id'],
                    'tax_amount' => $checkoutItem['taxAmount'],
                    'coupon_code' => $checkoutItem['coupon'] ? $checkoutItem['coupon']->code : null,
                ],
            ]);

            return redirect()->away($body['invoice_url']);
        }

        return redirect()
            ->route('payments.index', ['from' => $request->from, 'item' => $request->item_type, 'id' => $request->item_id])
            ->with('error', $body['message'] ?? 'Could not create Xendit invoice. Please try again.');
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
        $invoiceId = $temp->properties['invoice_id'];

        try {
            $verify = Http::withBasicAuth($this->secretKey, '')
                ->get("https://api.xendit.co/v2/invoices/{$invoiceId}");

            $data = $verify->json();

            if (($data['status'] ?? '') === 'PAID') {
                $this->payment->coursesBuy(
                    'xendit',
                    $item_type,
                    $item_id,
                    $data['id'],
                    $tax_amount,
                    (float) $data['paid_amount'],
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
                ->with('error', 'Xendit payment not yet confirmed. Please try again.');
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
            ->with('error', 'Xendit payment was cancelled.');
    }
}
