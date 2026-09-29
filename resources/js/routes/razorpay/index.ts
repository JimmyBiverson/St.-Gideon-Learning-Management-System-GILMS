import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\Payment\RazorpayController::redirect
 * @see Modules/Billing/app/Http/Controllers/Payment/RazorpayController.php:24
 * @route '/payments/razorpay/redirect'
 */
export const redirect = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: redirect.url(options),
    method: 'post',
})

redirect.definition = {
    methods: ["post"],
    url: '/payments/razorpay/redirect',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\RazorpayController::redirect
 * @see Modules/Billing/app/Http/Controllers/Payment/RazorpayController.php:24
 * @route '/payments/razorpay/redirect'
 */
redirect.url = (options?: RouteQueryOptions) => {
    return redirect.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\RazorpayController::redirect
 * @see Modules/Billing/app/Http/Controllers/Payment/RazorpayController.php:24
 * @route '/payments/razorpay/redirect'
 */
redirect.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: redirect.url(options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\RazorpayController::redirect
 * @see Modules/Billing/app/Http/Controllers/Payment/RazorpayController.php:24
 * @route '/payments/razorpay/redirect'
 */
    const redirectForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: redirect.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\RazorpayController::redirect
 * @see Modules/Billing/app/Http/Controllers/Payment/RazorpayController.php:24
 * @route '/payments/razorpay/redirect'
 */
        redirectForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: redirect.url(options),
            method: 'post',
        })
    
    redirect.form = redirectForm
/**
* @see \Modules\Billing\Http\Controllers\Payment\RazorpayController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/RazorpayController.php:59
 * @route '/payments/razorpay/payment'
 */
export const payment = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payment.url(options),
    method: 'post',
})

payment.definition = {
    methods: ["post"],
    url: '/payments/razorpay/payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\RazorpayController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/RazorpayController.php:59
 * @route '/payments/razorpay/payment'
 */
payment.url = (options?: RouteQueryOptions) => {
    return payment.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\RazorpayController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/RazorpayController.php:59
 * @route '/payments/razorpay/payment'
 */
payment.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payment.url(options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\RazorpayController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/RazorpayController.php:59
 * @route '/payments/razorpay/payment'
 */
    const paymentForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: payment.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\RazorpayController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/RazorpayController.php:59
 * @route '/payments/razorpay/payment'
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