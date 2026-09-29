import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\Payment\RazorpayController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/RazorpayController.php:24
 * @route '/payments/razorpay/redirect'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: index.url(options),
    method: 'post',
})

index.definition = {
    methods: ["post"],
    url: '/payments/razorpay/redirect',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\RazorpayController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/RazorpayController.php:24
 * @route '/payments/razorpay/redirect'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\RazorpayController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/RazorpayController.php:24
 * @route '/payments/razorpay/redirect'
 */
index.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: index.url(options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\RazorpayController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/RazorpayController.php:24
 * @route '/payments/razorpay/redirect'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: index.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\RazorpayController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/RazorpayController.php:24
 * @route '/payments/razorpay/redirect'
 */
        indexForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: index.url(options),
            method: 'post',
        })
    
    index.form = indexForm
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
const RazorpayController = { index, payment }

export default RazorpayController