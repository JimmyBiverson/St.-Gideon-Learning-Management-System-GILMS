<?php

namespace Modules\Billing\Services\Eps;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class EpsPayment
{
    protected string $baseUrl;

    protected string $username;

    protected string $password;

    protected string $hashKey;

    public function __construct()
    {
        $this->baseUrl = (string) config('paymentgateways.eps.apiDomain');
        $this->username = (string) config('paymentgateways.eps.apiCredentials.username');
        $this->password = (string) config('paymentgateways.eps.apiCredentials.password');
        $this->hashKey = (string) config('paymentgateways.eps.apiCredentials.hashkey');
    }

    protected function hash(string $value): string
    {
        return base64_encode(hash_hmac('sha512', $value, $this->hashKey, true));
    }

    public function getToken(): ?string
    {
        $response = Http::acceptJson()
            ->withHeaders(['x-hash' => $this->hash($this->username)])
            ->post("{$this->baseUrl}/v1/Auth/GetToken", [
                'userName' => $this->username,
                'password' => $this->password,
            ]);

        if (! $response->successful()) {
            Log::error('EPS GetToken failed', ['status' => $response->status(), 'body' => $response->body()]);

            return null;
        }

        return $response->json('token');
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array{success: bool, redirect_url?: string, error?: string}
     */
    public function initialize(array $data): array
    {
        $token = $this->getToken();
        if (! $token) {
            return ['success' => false, 'error' => 'Unable to authenticate with EPS.'];
        }

        $merchantTransactionId = $data['merchantTransactionId'];

        $response = Http::acceptJson()
            ->withToken($token)
            ->withHeaders(['x-hash' => $this->hash($merchantTransactionId)])
            ->post("{$this->baseUrl}/v1/EPSEngine/InitializeEPS", [
                'merchantId' => config('paymentgateways.eps.apiCredentials.merchant_id'),
                'storeId' => config('paymentgateways.eps.apiCredentials.store_id'),
                'deviceTypeId' => (int) config('paymentgateways.eps.apiCredentials.device_type_id', 1),
                'transactionTypeId' => 1,
                'merchantTransactionId' => $merchantTransactionId,
                'totalAmount' => $data['totalAmount'],
                'successUrl' => $data['successUrl'],
                'failUrl' => $data['failUrl'],
                'cancelUrl' => $data['cancelUrl'],
                'customerName' => $data['customerName'],
                'customerEmail' => $data['customerEmail'],
                'customerAddress' => $data['customerAddress'] ?? 'N/A',
                'customerCity' => $data['customerCity'] ?? 'Dhaka',
                'customerState' => $data['customerState'] ?? 'Dhaka',
                'customerPostcode' => $data['customerPostcode'] ?? '1200',
                'customerCountry' => $data['customerCountry'] ?? 'Bangladesh',
                'customerPhone' => $data['customerPhone'],
                'productName' => $data['productName'],
                'productProfile' => $data['productProfile'] ?? 'general',
                'productCategory' => $data['productCategory'] ?? 'General',
            ]);

        $body = $response->json() ?? [];

        if ($response->successful() && ! empty($body['RedirectURL'])) {
            return ['success' => true, 'redirect_url' => $body['RedirectURL']];
        }

        Log::error('EPS InitializeEPS failed', ['status' => $response->status(), 'body' => $body]);

        return ['success' => false, 'error' => $body['ErrorMessage'] ?? 'EPS payment initialization failed.'];
    }

    /**
     * @return array{success: bool, status: ?string, raw: array<string, mixed>}
     */
    public function checkStatus(string $merchantTransactionId): array
    {
        $token = $this->getToken();
        if (! $token) {
            return ['success' => false, 'status' => null, 'raw' => []];
        }

        $response = Http::acceptJson()
            ->withToken($token)
            ->withHeaders(['x-hash' => $this->hash($merchantTransactionId)])
            ->get("{$this->baseUrl}/v1/EPSEngine/CheckMerchantTransactionStatus", [
                'merchantTransactionId' => $merchantTransactionId,
            ]);

        $body = $response->json() ?? [];
        $status = strtoupper((string) ($body['transactionStatus'] ?? $body['status'] ?? ''));

        return ['success' => $response->successful(), 'status' => $status, 'raw' => $body];
    }
}
