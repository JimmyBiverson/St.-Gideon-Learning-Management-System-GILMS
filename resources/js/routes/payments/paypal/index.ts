import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\Payment\PaypalController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/PaypalController.php:27
 * @route '/payments/paypal/payment'
 */
export const payment = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payment.url(options),
    method: 'post',
})

payment.definition = {
    methods: ["post"],
    url: '/payments/paypal/payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\PaypalController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/PaypalController.php:27
 * @route '/payments/paypal/payment'
 */
payment.url = (options?: RouteQueryOptions) => {
    return payment.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\PaypalController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/PaypalController.php:27
 * @route '/payments/paypal/payment'
 */
payment.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payment.url(options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\PaypalController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/PaypalController.php:27
 * @route '/payments/paypal/payment'
 */
    const paymentForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: payment.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\PaypalController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/PaypalController.php:27
 * @route '/payments/paypal/payment'
 */
        paymentForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: payment.url(options),
            method: 'post',
        })
    
    payment.form = paymentForm
/**
* @see \Modules\Billing\Http\Controllers\Payment\PaypalController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/PaypalController.php:82
 * @route '/payments/paypal/success'
 */
export const success = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: success.url(options),
    method: 'get',
})

success.definition = {
    methods: ["get","head"],
    url: '/payments/paypal/success',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\PaypalController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/PaypalController.php:82
 * @route '/payments/paypal/success'
 */
success.url = (options?: RouteQueryOptions) => {
    return success.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\PaypalController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/PaypalController.php:82
 * @route '/payments/paypal/success'
 */
success.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: success.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payment\PaypalController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/PaypalController.php:82
 * @route '/payments/paypal/success'
 */
success.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: success.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\PaypalController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/PaypalController.php:82
 * @route '/payments/paypal/success'
 */
    const successForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: success.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\PaypalController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/PaypalController.php:82
 * @route '/payments/paypal/success'
 */
        successForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: success.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payment\PaypalController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/PaypalController.php:82
 * @route '/payments/paypal/success'
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
* @see \Modules\Billing\Http\Controllers\Payment\PaypalController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/PaypalController.php:135
 * @route '/payments/paypal/cancel'
 */
export const cancel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cancel.url(options),
    method: 'get',
})

cancel.definition = {
    methods: ["get","head"],
    url: '/payments/paypal/cancel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\PaypalController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/PaypalController.php:135
 * @route '/payments/paypal/cancel'
 */
cancel.url = (options?: RouteQueryOptions) => {
    return cancel.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\PaypalController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/PaypalController.php:135
 * @route '/payments/paypal/cancel'
 */
cancel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cancel.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payment\PaypalController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/PaypalController.php:135
 * @route '/payments/paypal/cancel'
 */
cancel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cancel.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\PaypalController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/PaypalController.php:135
 * @route '/payments/paypal/cancel'
 */
    const cancelForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: cancel.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\PaypalController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/PaypalController.php:135
 * @route '/payments/paypal/cancel'
 */
        cancelForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: cancel.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payment\PaypalController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/PaypalController.php:135
 * @route '/payments/paypal/cancel'
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