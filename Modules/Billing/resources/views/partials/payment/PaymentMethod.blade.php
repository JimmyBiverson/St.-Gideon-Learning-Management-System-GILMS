<?php
$payment_methods = [
    [
        'name' => 'Stripe',
        'sub_type' => 'stripe',
        'method' => 'POST',
        'route' => '/payments/stripe/payment',
        'logo' => asset('assets/payment/stripe.png'),
    ],
    [
        'name' => 'Paypal',
        'sub_type' => 'paypal',
        'method' => 'POST',
        'route' => '/payments/paypal/payment',
        'logo' => asset('assets/payment/paypal.png'),
    ],
    [
        'name' => 'Razorpay',
        'sub_type' => 'razorpay',
        'method' => 'POST',
        'route' => '/payments/razorpay/redirect',
        'logo' => asset('assets/payment/razorpay.png'),
    ],
    [
        'name' => 'Mollie',
        'sub_type' => 'mollie',
        'method' => 'POST',
        'route' => '/payments/mollie/payment',
        'logo' => asset('assets/payment/mollie.png'),
    ],
    [
        'name' => 'Paystack',
        'sub_type' => 'paystack',
        'method' => 'GET',
        'route' => '/payments/paystack/redirect',
        'logo' => asset('assets/payment/paystack.png'),
    ],
    [
        'name' => 'SSLCommerz',
        'sub_type' => 'sslcommerz',
        'method' => 'POST',
        'route' => '/payments/sslcommerz/payment',
        'logo' => asset('assets/payment/sslcommerz.png'),
    ],
    [
        'name' => 'Offline Payment',
        'sub_type' => 'offline',
        'method' => 'GET',
        'route' => '/payments/offline/redirect',
        'logo' => asset('assets/payment/offline.svg'),
    ],
    [
        'name' => 'Flutterwave',
        'sub_type' => 'flutterwave',
        'method' => 'POST',
        'route' => '/payments/flutterwave/payment',
        'logo' => asset('assets/payment/flutterwave.svg'),
    ],
    [
        'name' => 'bKash',
        'sub_type' => 'bkash',
        'method' => 'POST',
        'route' => '/payments/bkash/payment',
        'logo' => asset('assets/payment/bkash.png'),
    ],
    [
        'name' => 'JazzCash',
        'sub_type' => 'jazzcash',
        'method' => 'POST',
        'route' => '/payments/jazzcash/redirect',
        'logo' => asset('assets/payment/jazzcash.svg'),
    ],
    [
        'name' => 'Payhere',
        'sub_type' => 'payhere',
        'method' => 'POST',
        'route' => '/payments/payhere/redirect',
        'logo' => asset('assets/payment/payhere.png'),
    ],
    [
        'name' => 'Toyyibpay',
        'sub_type' => 'toyyibpay',
        'method' => 'POST',
        'route' => '/payments/toyyibpay/payment',
        'logo' => asset('assets/payment/toyyibpay.svg'),
    ],
    [
        'name' => 'Xendit',
        'sub_type' => 'xendit',
        'method' => 'POST',
        'route' => '/payments/xendit/payment',
        'logo' => asset('assets/payment/xendit.svg'),
    ],
    [
        'name' => 'Paytabs',
        'sub_type' => 'paytabs',
        'method' => 'POST',
        'route' => '/payments/paytabs/payment',
        'logo' => asset('assets/payment/paytabs.svg'),
    ],
    [
        'name' => 'Mercado Pago',
        'sub_type' => 'mercadopago',
        'method' => 'POST',
        'route' => '/payments/mercadopago/payment',
        'logo' => asset('assets/payment/mercadopago.png'),
    ],
    [
        'name' => 'PayU',
        'sub_type' => 'payu',
        'method' => 'POST',
        'route' => '/payments/payu/payment',
        'logo' => asset('assets/payment/payu.svg'),
    ],
    [
        'name' => 'Braintree',
        'sub_type' => 'braintree',
        'method' => 'POST',
        'route' => '/payments/braintree/redirect',
        'logo' => asset('assets/payment/braintree.png'),
    ],
    [
        'name' => 'EPS',
        'sub_type' => 'eps',
        'method' => 'POST',
        'route' => '/payments/eps/payment',
        'logo' => asset('assets/payment/eps.png'),
    ],
];

foreach ($payments as $method) {
    foreach ($payment_methods as $item) {
        if ($item['sub_type'] == $method->sub_type) {
            $method['name'] = $item['name'];
            $method['route'] = $item['route'];
            $method['method'] = $item['method'];
            $method['logo'] = $item['logo'];
            break;
        }
    }
}
?>

<h6 class="mb-6 text-xl font-medium text-gray-600">
   {{ __('Available Payment methods') }}
</h6>

<div class="space-y-4">
   @foreach ($payments as $item)
      @if ($item->fields['active'])
         <div
            id="{{ $item['sub_type'] }}"
            data-info="{{ json_encode($item) }}"
            class="method payment_method h-14 cursor-pointer rounded-lg p-6 outline-1 hover:outline-2 hover:outline-blue-500"
         >
            <div class="flex h-full items-center justify-between">
               <p class="text-lg font-medium">{{ $item['name'] }}</p>
               <img
                  src="{{ $item['logo'] }}"
                  width="{{ $item['name'] == 'Paystack' || $item['name'] == 'SSLCommerz' || $item['name'] == 'Razorpay' || $item['name'] == 'Flutterwave' ? '100' : '80' }}"
                  alt="{{ $item['name'] }}"
               />
            </div>
         </div>
      @endif
   @endforeach

</div>
