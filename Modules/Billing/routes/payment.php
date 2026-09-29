<?php

use Illuminate\Foundation\Http\Middleware\PreventRequestForgery;
use Illuminate\Support\Facades\Route;
use Modules\Billing\Http\Controllers\Payment\BkashController;
use Modules\Billing\Http\Controllers\Payment\BraintreeController;
use Modules\Billing\Http\Controllers\Payment\EpsController;
use Modules\Billing\Http\Controllers\Payment\FlutterwaveController;
use Modules\Billing\Http\Controllers\Payment\JazzCashController;
use Modules\Billing\Http\Controllers\Payment\MercadopagoController;
use Modules\Billing\Http\Controllers\Payment\MollieController;
use Modules\Billing\Http\Controllers\Payment\OfflineController;
use Modules\Billing\Http\Controllers\Payment\PayhereController;
use Modules\Billing\Http\Controllers\Payment\PaymentController;
use Modules\Billing\Http\Controllers\Payment\PaymentReportController;
use Modules\Billing\Http\Controllers\Payment\PaypalController;
use Modules\Billing\Http\Controllers\Payment\PaystackController;
use Modules\Billing\Http\Controllers\Payment\PaytabsController;
use Modules\Billing\Http\Controllers\Payment\PayuController;
use Modules\Billing\Http\Controllers\Payment\RazorpayController;
use Modules\Billing\Http\Controllers\Payment\SslCommerzController;
use Modules\Billing\Http\Controllers\Payment\StripeController;
use Modules\Billing\Http\Controllers\Payment\ToyyibpayController;
use Modules\Billing\Http\Controllers\Payment\XenditController;
use Modules\Billing\Http\Middleware\EpsConfigMiddleware;
use Modules\Billing\Http\Middleware\SSLConfigMiddleware;

Route::middleware(['auth', 'role:admin'])->prefix('dashboard')->group(function () {
    // payment gateway settings
    Route::controller(PaymentController::class)->prefix('billings/payment')->group(function () {
        Route::get('/', 'payment')->name('payment-gateways.index');
        Route::post('/{id}', 'payment_update')->name('payment-gateways.update');
    });

    // payment reports routes
    Route::controller(PaymentReportController::class)->prefix('billings/payment-reports')->group(function () {
        Route::get('online', 'online_index')->name('payment-reports.online.index');
        Route::get('offline', 'offline_index')->name('payment-reports.offline.index');
        Route::post('offline/{id}/verify', 'verify')->name('payment-reports.offline.verify');
        Route::post('offline/{id}/reject', 'reject')->name('payment-reports.offline.reject');
    });
});

Route::middleware(['auth', 'verified'])->prefix('payments')->group(function () {
    Route::get('{from}/{item}/{id}', [PaymentController::class, 'index'])->name('payments.index');

    Route::post('paypal/payment', [PaypalController::class, 'payment'])->name('payments.paypal.payment');
    Route::get('paypal/success', [PaypalController::class, 'success'])->name('payments.paypal.success');
    Route::get('paypal/cancel', [PaypalController::class, 'cancel'])->name('payments.paypal.cancel');

    Route::post('stripe/payment', [StripeController::class, 'payment'])->name('payments.stripe.payment');
    Route::get('stripe/success', [StripeController::class, 'success'])->name('payments.stripe.success');
    Route::get('stripe/cancel', [StripeController::class, 'cancel'])->name('payments.stripe.cancel');

    Route::post('mollie/payment', [MollieController::class, 'payment'])->name('payments.mollie.payment');
    Route::get('mollie/success', [MollieController::class, 'success'])->name('payments.mollie.success');

    Route::get('paystack/redirect', [PaystackController::class, 'paystack_redirect'])->name('payments.paystack.redirect');
    Route::get('paystack/callback', [PaystackController::class, 'verify_transaction'])->name('payments.paystack.callback');

    Route::post('razorpay/redirect', [RazorpayController::class, 'index'])->name('razorpay.redirect');
    Route::post('razorpay/payment', [RazorpayController::class, 'payment'])->name('razorpay.payment');

    Route::get('offline/redirect', [OfflineController::class, 'index'])->name('payments.offline.redirect');
    Route::post('offline/submit', [OfflineController::class, 'submit'])->name('payments.offline.submit');
    Route::get('offline/cancel', [OfflineController::class, 'cancel'])->name('payments.offline.cancel');

    // Flutterwave
    Route::post('flutterwave/payment', [FlutterwaveController::class, 'payment'])->name('payments.flutterwave.payment');
    Route::get('flutterwave/callback', [FlutterwaveController::class, 'callback'])->name('payments.flutterwave.callback');

    // Xendit
    Route::post('xendit/payment', [XenditController::class, 'payment'])->name('payments.xendit.payment');
    Route::get('xendit/callback', [XenditController::class, 'callback'])->name('payments.xendit.callback');
    Route::get('xendit/cancel', [XenditController::class, 'cancel'])->name('payments.xendit.cancel');

    // // bKash
    // Route::post('bkash/payment', [BkashController::class, 'payment'])->name('payments.bkash.payment');
    // Route::get('bkash/callback', [BkashController::class, 'callback'])->name('payments.bkash.callback');
    // Route::get('bkash/cancel', [BkashController::class, 'cancel'])->name('payments.bkash.cancel');

    // // JazzCash
    // Route::post('jazzcash/redirect', [JazzCashController::class, 'redirect'])->name('payments.jazzcash.redirect');

    // // Payhere
    // Route::post('payhere/redirect', [PayhereController::class, 'redirect'])->name('payments.payhere.redirect');
    // Route::get('payhere/return', [PayhereController::class, 'return'])->name('payments.payhere.return');

    // // Toyyibpay
    // Route::post('toyyibpay/payment', [ToyyibpayController::class, 'payment'])->name('payments.toyyibpay.payment');
    // Route::get('toyyibpay/callback', [ToyyibpayController::class, 'callback'])->name('payments.toyyibpay.callback');
    // Route::get('toyyibpay/cancel', [ToyyibpayController::class, 'cancel'])->name('payments.toyyibpay.cancel');

    // // Paytabs
    // Route::post('paytabs/payment', [PaytabsController::class, 'payment'])->name('payments.paytabs.payment');
    // Route::get('paytabs/return', [PaytabsController::class, 'return'])->name('payments.paytabs.return');

    // // Mercado Pago
    // Route::post('mercadopago/payment', [MercadopagoController::class, 'payment'])->name('payments.mercadopago.payment');
    // Route::get('mercadopago/success', [MercadopagoController::class, 'success'])->name('payments.mercadopago.success');
    // Route::get('mercadopago/cancel', [MercadopagoController::class, 'cancel'])->name('payments.mercadopago.cancel');

    // // PayU
    // Route::post('payu/payment', [PayuController::class, 'payment'])->name('payments.payu.payment');
    // Route::get('payu/return', [PayuController::class, 'return'])->name('payments.payu.return');

    // // Braintree
    // Route::post('braintree/redirect', [BraintreeController::class, 'redirect'])->name('payments.braintree.redirect');
    // Route::post('braintree/payment', [BraintreeController::class, 'payment'])->name('payments.braintree.payment');
    // Route::get('braintree/cancel', [BraintreeController::class, 'cancel'])->name('payments.braintree.cancel');
});

Route::withoutMiddleware([PreventRequestForgery::class])->middleware([SSLConfigMiddleware::class])->prefix('payments/sslcommerz')->group(function () {
    Route::post('/payment', [SslCommerzController::class, 'index'])->name('sslcommerz.payment');

    Route::post('/success', [SslCommerzController::class, 'success']);
    Route::post('/fail', [SslCommerzController::class, 'fail']);
    Route::post('/cancel', [SslCommerzController::class, 'cancel']);

    Route::post('/ipn', [SslCommerzController::class, 'ipn']);
});

Route::middleware([EpsConfigMiddleware::class])->prefix('payments/eps')->group(function () {
    Route::post('/payment', [EpsController::class, 'index'])->name('payments.eps.payment');
    Route::get('/success', [EpsController::class, 'success'])->name('payments.eps.success');
    Route::get('/fail', [EpsController::class, 'fail'])->name('payments.eps.fail');
    Route::get('/cancel', [EpsController::class, 'cancel'])->name('payments.eps.cancel');
});

// // IPN / server-to-server callbacks (CSRF excluded, no auth required)
// Route::withoutMiddleware([PreventRequestForgery::class])->prefix('payments')->group(function () {
//     Route::post('jazzcash/callback', [JazzCashController::class, 'callback'])->name('payments.jazzcash.callback');
//     Route::post('payhere/notify', [PayhereController::class, 'notify'])->name('payments.payhere.notify');
//     Route::post('paytabs/callback', [PaytabsController::class, 'callback'])->name('payments.paytabs.callback');
//     Route::post('payu/notify', [PayuController::class, 'notify'])->name('payments.payu.notify');
// });
