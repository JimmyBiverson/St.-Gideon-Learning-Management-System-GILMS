import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\Payout\RazorpayController::redirect
 * @see Modules/Billing/app/Http/Controllers/Payout/RazorpayController.php:18
 * @route '/payouts/razorpay/redirect'
 */
export const redirect = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: redirect.url(options),
    method: 'post',
})

redirect.definition = {
    methods: ["post"],
    url: '/payouts/razorpay/redirect',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payout\RazorpayController::redirect
 * @see Modules/Billing/app/Http/Controllers/Payout/RazorpayController.php:18
 * @route '/payouts/razorpay/redirect'
 */
redirect.url = (options?: RouteQueryOptions) => {
    return redirect.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payout\RazorpayController::redirect
 * @see Modules/Billing/app/Http/Controllers/Payout/RazorpayController.php:18
 * @route '/payouts/razorpay/redirect'
 */
redirect.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: redirect.url(options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payout\RazorpayController::redirect
 * @see Modules/Billing/app/Http/Controllers/Payout/RazorpayController.php:18
 * @route '/payouts/razorpay/redirect'
 */
    const redirectForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: redirect.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payout\RazorpayController::redirect
 * @see Modules/Billing/app/Http/Controllers/Payout/RazorpayController.php:18
 * @route '/payouts/razorpay/redirect'
 */
        redirectForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: redirect.url(options),
            method: 'post',
        })
    
    redirect.form = redirectForm
/**
* @see \Modules\Billing\Http\Controllers\Payout\RazorpayController::payment
 * @see Modules/Billing/app/Http/Controllers/Payout/RazorpayController.php:47
 * @route '/payouts/razorpay/payment'
 */
export const payment = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payment.url(options),
    method: 'post',
})

payment.definition = {
    methods: ["post"],
    url: '/payouts/razorpay/payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payout\RazorpayController::payment
 * @see Modules/Billing/app/Http/Controllers/Payout/RazorpayController.php:47
 * @route '/payouts/razorpay/payment'
 */
payment.url = (options?: RouteQueryOptions) => {
    return payment.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payout\RazorpayController::payment
 * @see Modules/Billing/app/Http/Controllers/Payout/RazorpayController.php:47
 * @route '/payouts/razorpay/payment'
 */
payment.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payment.url(options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payout\RazorpayController::payment
 * @see Modules/Billing/app/Http/Controllers/Payout/RazorpayController.php:47
 * @route '/payouts/razorpay/payment'
 */
    const paymentForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: payment.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payout\RazorpayController::payment
 * @see Modules/Billing/app/Http/Controllers/Payout/RazorpayController.php:47
 * @route '/payouts/razorpay/payment'
 */
        paymentForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: payment.url(options),
            method: 'post',
        })
    
    payment.form = paymentForm
const razorpay = {
    redirect: Object.assign(redirect, redirect),
payment: Object.assign(payment, payment),
}

export default razorpay