import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\Payout\PaypalController::payment
 * @see Modules/Billing/app/Http/Controllers/Payout/PaypalController.php:18
 * @route '/payouts/paypal/payment'
 */
export const payment = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payment.url(options),
    method: 'post',
})

payment.definition = {
    methods: ["post"],
    url: '/payouts/paypal/payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payout\PaypalController::payment
 * @see Modules/Billing/app/Http/Controllers/Payout/PaypalController.php:18
 * @route '/payouts/paypal/payment'
 */
payment.url = (options?: RouteQueryOptions) => {
    return payment.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payout\PaypalController::payment
 * @see Modules/Billing/app/Http/Controllers/Payout/PaypalController.php:18
 * @route '/payouts/paypal/payment'
 */
payment.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payment.url(options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payout\PaypalController::payment
 * @see Modules/Billing/app/Http/Controllers/Payout/PaypalController.php:18
 * @route '/payouts/paypal/payment'
 */
    const paymentForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: payment.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payout\PaypalController::payment
 * @see Modules/Billing/app/Http/Controllers/Payout/PaypalController.php:18
 * @route '/payouts/paypal/payment'
 */
        paymentForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: payment.url(options),
            method: 'post',
        })
    
    payment.form = paymentForm
/**
* @see \Modules\Billing\Http\Controllers\Payout\PaypalController::success
 * @see Modules/Billing/app/Http/Controllers/Payout/PaypalController.php:70
 * @route '/payouts/paypal/success'
 */
export const success = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: success.url(options),
    method: 'get',
})

success.definition = {
    methods: ["get","head"],
    url: '/payouts/paypal/success',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payout\PaypalController::success
 * @see Modules/Billing/app/Http/Controllers/Payout/PaypalController.php:70
 * @route '/payouts/paypal/success'
 */
success.url = (options?: RouteQueryOptions) => {
    return success.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payout\PaypalController::success
 * @see Modules/Billing/app/Http/Controllers/Payout/PaypalController.php:70
 * @route '/payouts/paypal/success'
 */
success.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: success.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payout\PaypalController::success
 * @see Modules/Billing/app/Http/Controllers/Payout/PaypalController.php:70
 * @route '/payouts/paypal/success'
 */
success.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: success.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payout\PaypalController::success
 * @see Modules/Billing/app/Http/Controllers/Payout/PaypalController.php:70
 * @route '/payouts/paypal/success'
 */
    const successForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: success.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payout\PaypalController::success
 * @see Modules/Billing/app/Http/Controllers/Payout/PaypalController.php:70
 * @route '/payouts/paypal/success'
 */
        successForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: success.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payout\PaypalController::success
 * @see Modules/Billing/app/Http/Controllers/Payout/PaypalController.php:70
 * @route '/payouts/paypal/success'
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
/**
* @see \Modules\Billing\Http\Controllers\Payout\PaypalController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payout/PaypalController.php:113
 * @route '/payouts/paypal/cancel'
 */
export const cancel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cancel.url(options),
    method: 'get',
})

cancel.definition = {
    methods: ["get","head"],
    url: '/payouts/paypal/cancel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payout\PaypalController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payout/PaypalController.php:113
 * @route '/payouts/paypal/cancel'
 */
cancel.url = (options?: RouteQueryOptions) => {
    return cancel.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payout\PaypalController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payout/PaypalController.php:113
 * @route '/payouts/paypal/cancel'
 */
cancel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cancel.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payout\PaypalController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payout/PaypalController.php:113
 * @route '/payouts/paypal/cancel'
 */
cancel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cancel.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payout\PaypalController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payout/PaypalController.php:113
 * @route '/payouts/paypal/cancel'
 */
    const cancelForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: cancel.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payout\PaypalController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payout/PaypalController.php:113
 * @route '/payouts/paypal/cancel'
 */
        cancelForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: cancel.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payout\PaypalController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payout/PaypalController.php:113
 * @route '/payouts/paypal/cancel'
 */
        cancelForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: cancel.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    cancel.form = cancelForm
const paypal = {
    payment: Object.assign(payment, payment),
success: Object.assign(success, success),
cancel: Object.assign(cancel, cancel),
}

export default paypal