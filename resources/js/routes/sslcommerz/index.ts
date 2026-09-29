import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:27
 * @route '/payments/sslcommerz/payment'
 */
export const payment = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payment.url(options),
    method: 'post',
})

payment.definition = {
    methods: ["post"],
    url: '/payments/sslcommerz/payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:27
 * @route '/payments/sslcommerz/payment'
 */
payment.url = (options?: RouteQueryOptions) => {
    return payment.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:27
 * @route '/payments/sslcommerz/payment'
 */
payment.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payment.url(options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:27
 * @route '/payments/sslcommerz/payment'
 */
    const paymentForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: payment.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:27
 * @route '/payments/sslcommerz/payment'
 */
        paymentForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: payment.url(options),
            method: 'post',
        })
    
    payment.form = paymentForm
const sslcommerz = {
    payment: Object.assign(payment, payment),
}

export default sslcommerz