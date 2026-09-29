import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\Payment\MollieController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/MollieController.php:27
 * @route '/payments/mollie/payment'
 */
export const payment = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payment.url(options),
    method: 'post',
})

payment.definition = {
    methods: ["post"],
    url: '/payments/mollie/payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\MollieController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/MollieController.php:27
 * @route '/payments/mollie/payment'
 */
payment.url = (options?: RouteQueryOptions) => {
    return payment.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\MollieController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/MollieController.php:27
 * @route '/payments/mollie/payment'
 */
payment.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payment.url(options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\MollieController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/MollieController.php:27
 * @route '/payments/mollie/payment'
 */
    const paymentForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: payment.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\MollieController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/MollieController.php:27
 * @route '/payments/mollie/payment'
 */
        paymentForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: payment.url(options),
            method: 'post',
        })
    
    payment.form = paymentForm
/**
* @see \Modules\Billing\Http\Controllers\Payment\MollieController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/MollieController.php:67
 * @route '/payments/mollie/success'
 */
export const success = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: success.url(options),
    method: 'get',
})

success.definition = {
    methods: ["get","head"],
    url: '/payments/mollie/success',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\MollieController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/MollieController.php:67
 * @route '/payments/mollie/success'
 */
success.url = (options?: RouteQueryOptions) => {
    return success.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\MollieController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/MollieController.php:67
 * @route '/payments/mollie/success'
 */
success.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: success.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payment\MollieController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/MollieController.php:67
 * @route '/payments/mollie/success'
 */
success.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: success.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\MollieController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/MollieController.php:67
 * @route '/payments/mollie/success'
 */
    const successForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: success.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\MollieController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/MollieController.php:67
 * @route '/payments/mollie/success'
 */
        successForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: success.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payment\MollieController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/MollieController.php:67
 * @route '/payments/mollie/success'
 */
        successForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: success.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    success.form = successForm
const mollie = {
    payment: Object.assign(payment, payment),
success: Object.assign(success, success),
}

export default mollie