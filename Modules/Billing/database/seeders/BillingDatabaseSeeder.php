<?php

namespace Modules\Billing\Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class BillingDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Payment Settings
        $settings = [
            [
                'type' => 'payment',
                'sub_type' => 'paypal',
                'title' => 'Paypal Settings',
                'fields' => [
                    'active' => false,
                    'test_mode' => true,
                    'currency' => 'USD',
                    'sandbox_client_id' => '',
                    'sandbox_secret_key' => '',
                    'production_client_id' => '',
                    'production_secret_key' => '',
                ],
            ],
            [
                'type' => 'payment',
                'sub_type' => 'stripe',
                'title' => 'Stripe Settings',
                'fields' => [
                    'active' => false,
                    'test_mode' => true,
                    'currency' => 'USD',
                    'test_public_key' => '',
                    'test_secret_key' => '',
                    'live_public_key' => '',
                    'live_secret_key' => '',
                    'webhook_secret' => '',
                ],
            ],
            [
                'type' => 'payment',
                'sub_type' => 'mollie',
                'title' => 'Mollie Settings',
                'fields' => [
                    'active' => false,
                    'test_mode' => true,
                    'currency' => 'USD',
                    'test_api_key' => '',
                    'live_api_key' => '',
                ],
            ],
            [
                'type' => 'payment',
                'sub_type' => 'paystack',
                'title' => 'Paystack Settings',
                'fields' => [
                    'active' => false,
                    'test_mode' => true,
                    'currency' => 'ZAR',
                    'test_public_key' => '',
                    'test_secret_key' => '',
                    'live_public_key' => '',
                    'live_secret_key' => '',
                ],
            ],
            [
                'type' => 'payment',
                'sub_type' => 'sslcommerz',
                'title' => 'SSLCommerz Settings',
                'fields' => [
                    'active' => false,
                    'test_mode' => true,
                    'currency' => 'BDT',
                    'store_id' => '',
                    'store_password' => '',
                ],
            ],
            [
                'type' => 'payment',
                'sub_type' => 'razorpay',
                'title' => 'Razorpay Settings',
                'fields' => [
                    'active' => false,
                    'test_mode' => true,
                    'currency' => 'INR',
                    'api_key' => '',
                    'api_secret' => '',
                ],
            ],

            // New Payment Settings
            [
                'type' => 'payment',
                'sub_type' => 'flutterwave',
                'title' => 'Flutterwave Settings',
                'fields' => [
                    'active' => false,
                    'test_mode' => true,
                    'currency' => 'NGN',
                    'test_public_key' => '',
                    'test_secret_key' => '',
                    'test_encryption_key' => '',
                    'live_public_key' => '',
                    'live_secret_key' => '',
                    'live_encryption_key' => '',
                ],
            ],
            [
                'type' => 'payment',
                'sub_type' => 'xendit',
                'title' => 'Xendit Settings',
                'fields' => [
                    'active' => false,
                    'test_mode' => true,
                    'currency' => 'IDR',
                    'test_secret_key' => '',
                    'live_secret_key' => '',
                ],
            ],
            [
                'type' => 'payment',
                'sub_type' => 'bkash',
                'title' => 'bKash Settings',
                'fields' => [
                    'active' => false,
                    'test_mode' => true,
                    'currency' => 'BDT',
                    'test_app_key' => '',
                    'test_app_secret' => '',
                    'test_username' => '',
                    'test_password' => '',
                    'live_app_key' => '',
                    'live_app_secret' => '',
                    'live_username' => '',
                    'live_password' => '',
                ],
            ],
            [
                'type' => 'payment',
                'sub_type' => 'jazzcash',
                'title' => 'JazzCash Settings',
                'fields' => [
                    'active' => false,
                    'test_mode' => true,
                    'currency' => 'PKR',
                    'test_merchant_id' => '',
                    'test_password' => '',
                    'test_integrity_salt' => '',
                    'live_merchant_id' => '',
                    'live_password' => '',
                    'live_integrity_salt' => '',
                ],
            ],
            [
                'type' => 'payment',
                'sub_type' => 'eps',
                'title' => 'EPS Settings',
                'fields' => [
                    'active' => false,
                    'test_mode' => true,
                    'currency' => 'BDT',
                    'username' => '',
                    'password' => '',
                    'hashkey' => '',
                    'merchant_id' => '',
                    'store_id' => '',
                    'device_type_id' => '',
                ],
            ],
            [
                'type' => 'payment',
                'sub_type' => 'payhere',
                'title' => 'Payhere Settings',
                'fields' => [
                    'active' => false,
                    'test_mode' => true,
                    'currency' => 'LKR',
                    'test_merchant_id' => '',
                    'test_secret' => '',
                    'live_merchant_id' => '',
                    'live_secret' => '',
                ],
            ],
            [
                'type' => 'payment',
                'sub_type' => 'toyyibpay',
                'title' => 'Toyyibpay Settings',
                'fields' => [
                    'active' => false,
                    'test_mode' => true,
                    'currency' => 'MYR',
                    'test_user_secret_key' => '',
                    'test_category_code' => '',
                    'live_user_secret_key' => '',
                    'live_category_code' => '',
                ],
            ],
            [
                'type' => 'payment',
                'sub_type' => 'paytabs',
                'title' => 'Paytabs Settings',
                'fields' => [
                    'active' => false,
                    'test_mode' => true,
                    'currency' => 'AED',
                    'region' => 'UAE',
                    'profile_id' => '',
                    'test_server_key' => '',
                    'live_server_key' => '',
                ],
            ],
            [
                'type' => 'payment',
                'sub_type' => 'mercadopago',
                'title' => 'Mercado Pago Settings',
                'fields' => [
                    'active' => false,
                    'test_mode' => true,
                    'currency' => 'BRL',
                    'test_access_token' => '',
                    'test_public_key' => '',
                    'live_access_token' => '',
                    'live_public_key' => '',
                ],
            ],
            [
                'type' => 'payment',
                'sub_type' => 'payu',
                'title' => 'PayU Settings',
                'fields' => [
                    'active' => false,
                    'test_mode' => true,
                    'currency' => 'PLN',
                    'test_merchant_pos_id' => '',
                    'test_signature_key' => '',
                    'live_merchant_pos_id' => '',
                    'live_signature_key' => '',
                ],
            ],
            [
                'type' => 'payment',
                'sub_type' => 'braintree',
                'title' => 'Braintree Settings',
                'fields' => [
                    'active' => false,
                    'test_mode' => true,
                    'currency' => 'USD',
                    'test_merchant_id' => '',
                    'test_public_key' => '',
                    'test_private_key' => '',
                    'live_merchant_id' => '',
                    'live_public_key' => '',
                    'live_private_key' => '',
                ],
            ],

            // Offline Payment Settings
            [
                'type' => 'payment',
                'sub_type' => 'offline',
                'title' => 'Offline Payment Settings',
                'fields' => [
                    'active' => true,
                    'payment_instructions' => 'Please complete your payment using one of the following payment details below. After making the payment, please submit your transaction details on the next page.',
                    'payment_details' => 'Please put your offline payment/bank information here',
                ],
            ],
        ];

        foreach ($settings as $setting) {
            Setting::firstOrCreate([
                'type' => $setting['type'],
                'sub_type' => $setting['sub_type'],
            ], $setting);
        }
    }
}
