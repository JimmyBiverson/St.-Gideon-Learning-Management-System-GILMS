<?php

namespace Modules\Billing\Http\Middleware;

use App\Models\TempStore;
use App\Services\SettingsService;
use Closure;
use Illuminate\Http\Request;

class SSLConfigMiddleware
{
    private $sslcommerz;

    private const SANDBOX_TOKEN = 'PUT_A_RANDOM_SECRET_HERE';

    public function __construct(
        private SettingsService $settingsService,
    ) {
        $this->sslcommerz = $this->settingsService->getSetting(['type' => 'payment', 'sub_type' => 'sslcommerz']);
    }

    public function handle(Request $request, Closure $next)
    {

        $testMode = (bool) ($this->sslcommerz->fields['test_mode'] ?? false);

        $token = (string) $request->query('sandbox_token', '');
        $adminToken = (string) ($this->sslcommerz->fields['sandbox_token'] ?? '');

        $hardcodedOk = self::SANDBOX_TOKEN && self::SANDBOX_TOKEN !== 'PUT_A_RANDOM_SECRET_HERE';

        $expected = $hardcodedOk ? self::SANDBOX_TOKEN : $adminToken;

        if ($token && $expected && hash_equals($expected, $token)) {
            $testMode = true;
        }

        $tranId = $request->input('tran_id') ?: $request->query('tran_id');
        if ($tranId) {
            $temp = TempStore::where('key', $tranId)->first();
            if ($temp && ! empty($temp->properties['is_sandbox'])) {
                $testMode = true;
            }
        }

        $apiDomain = $testMode
            ? 'https://sandbox.sslcommerz.com'
            : 'https://securepay.sslcommerz.com';

        config([
            'paymentgateways.sslcommerz.apiCredentials.store_id' => $this->sslcommerz->fields['store_id'] ?? null,
            'paymentgateways.sslcommerz.apiCredentials.store_password' => $this->sslcommerz->fields['store_password'] ?? null,
            'paymentgateways.sslcommerz.apiDomain' => $apiDomain,
            'paymentgateways.sslcommerz.connect_from_localhost' => $testMode,
            'paymentgateways.sslcommerz.apiUrl.make_payment' => '/gwprocess/v4/api.php',
            'paymentgateways.sslcommerz.apiUrl.order_validate' => '/validator/api/validationserverAPI.php',
            'paymentgateways.sslcommerz.success_url' => '/payments/sslcommerz/success',
            'paymentgateways.sslcommerz.failed_url' => '/payments/sslcommerz/fail',
            'paymentgateways.sslcommerz.cancel_url' => '/payments/sslcommerz/cancel',
            'paymentgateways.sslcommerz.ipn_url' => '/payments/sslcommerz/ipn',
        ]);

        return $next($request);
    }
}
