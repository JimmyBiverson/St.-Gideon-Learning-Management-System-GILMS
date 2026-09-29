<?php

namespace Modules\Billing\Http\Middleware;

use App\Services\SettingsService;
use Closure;
use Illuminate\Http\Request;

class EpsConfigMiddleware
{
    private $eps;

    public function __construct(private SettingsService $settingsService)
    {
        $this->eps = $this->settingsService->getSetting(['type' => 'payment', 'sub_type' => 'eps']);
    }

    public function handle(Request $request, Closure $next)
    {
        $testMode = (bool) ($this->eps->fields['test_mode'] ?? false);

        $apiDomain = $testMode
            ? 'https://sandboxpgapi.eps.com.bd'
            : 'https://pgapi.eps.com.bd';

        config([
            'paymentgateways.eps.apiDomain' => $apiDomain,
            'paymentgateways.eps.apiCredentials.username' => $this->eps->fields['username'] ?? null,
            'paymentgateways.eps.apiCredentials.password' => $this->eps->fields['password'] ?? null,
            'paymentgateways.eps.apiCredentials.hashkey' => $this->eps->fields['hashkey'] ?? null,
            'paymentgateways.eps.apiCredentials.merchant_id' => $this->eps->fields['merchant_id'] ?? null,
            'paymentgateways.eps.apiCredentials.store_id' => $this->eps->fields['store_id'] ?? null,
            'paymentgateways.eps.apiCredentials.device_type_id' => $this->eps->fields['device_type_id'] ?? 1,
        ]);

        return $next($request);
    }
}
