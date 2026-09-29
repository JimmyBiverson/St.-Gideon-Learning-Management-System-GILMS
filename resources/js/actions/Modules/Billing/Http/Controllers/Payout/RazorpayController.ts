import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\Payout\RazorpayController::index
 * @see Modules/Billing/app/Http/Controllers/Payout/RazorpayController.php:18
 * @route '/payouts/razorpay/redirect'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: index.url(options),
    method: 'post',
})

index.definition = {
    methods: ["post"],
    url: '/payouts/razorpay/redirect',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payout\RazorpayController::index
 * @see Modules/Billing/app/Http/Controllers/Payout/RazorpayController.php:18
 * @route '/payouts/razorpay/redirect'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payout\RazorpayController::index
 * @see Modules/Billing/app/Http/Controllers/Payout/RazorpayController.php:18
 * @route '/payouts/razorpay/redirect'
 */
index.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: index.url(options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payout\RazorpayController::index
 * @see Modules/Billing/app/Http/Controllers/Payout/RazorpayController.php:18
 * @route '/payouts/razorpay/redirect'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: index.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payout\RazorpayController::index
 * @see Modules/Billing/app/Http/Controllers/Payout/RazorpayController.php:18
 * @route '/payouts/razorpay/redirect'
 */
        indexForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: index.url(options),
            method: 'post',
        })
    
    index.form = indexForm
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
const RazorpayController = { index, payment }

export default RazorpayController