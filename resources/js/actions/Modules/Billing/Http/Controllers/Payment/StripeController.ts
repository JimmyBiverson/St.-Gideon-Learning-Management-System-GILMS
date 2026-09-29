import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\Payment\StripeController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/StripeController.php:28
 * @route '/payments/stripe/payment'
 */
export const payment = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payment.url(options),
    method: 'post',
})

payment.definition = {
    methods: ["post"],
    url: '/payments/stripe/payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\StripeController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/StripeController.php:28
 * @route '/payments/stripe/payment'
 */
payment.url = (options?: RouteQueryOptions) => {
    return payment.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\StripeController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/StripeController.php:28
 * @route '/payments/stripe/payment'
 */
payment.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payment.url(options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\StripeController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/StripeController.php:28
 * @route '/payments/stripe/payment'
 */
    const paymentForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: payment.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\StripeController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/StripeController.php:28
 * @route '/payments/stripe/payment'
 */
        paymentForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: payment.url(options),
            method: 'post',
        })
    
    payment.form = paymentForm
/**
* @see \Modules\Billing\Http\Controllers\Payment\StripeController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/StripeController.php:72
 * @route '/payments/stripe/success'
 */
export const success = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: success.url(options),
    method: 'get',
})

success.definition = {
    methods: ["get","head"],
    url: '/payments/stripe/success',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\StripeController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/StripeController.php:72
 * @route '/payments/stripe/success'
 */
success.url = (options?: RouteQueryOptions) => {
    return success.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\StripeController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/StripeController.php:72
 * @route '/payments/stripe/success'
 */
success.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: success.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payment\StripeController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/StripeController.php:72
 * @route '/payments/stripe/success'
 */
success.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: success.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\StripeController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/StripeController.php:72
 * @route '/payments/stripe/success'
 */
    const successForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: success.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\StripeController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/StripeController.php:72
 * @route '/payments/stripe/success'
 */
        successForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: success.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payment\StripeController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/StripeController.php:72
 * @route '/payments/stripe/success'
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
* @see \Modules\Billing\Http\Controllers\Payment\StripeController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/StripeController.php:118
 * @route '/payments/stripe/cancel'
 */
export const cancel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cancel.url(options),
    method: 'get',
})

cancel.definition = {
    methods: ["get","head"],
    url: '/payments/stripe/cancel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\StripeController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/StripeController.php:118
 * @route '/payments/stripe/cancel'
 */
cancel.url = (options?: RouteQueryOptions) => {
    return cancel.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\StripeController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/StripeController.php:118
 * @route '/payments/stripe/cancel'
 */
cancel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cancel.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payment\StripeController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/StripeController.php:118
 * @route '/payments/stripe/cancel'
 */
cancel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cancel.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\StripeController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/StripeController.php:118
 * @route '/payments/stripe/cancel'
 */
    const cancelForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: cancel.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\StripeController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/StripeController.php:118
 * @route '/payments/stripe/cancel'
 */
        cancelForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: cancel.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payment\StripeController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/StripeController.php:118
 * @route '/payments/stripe/cancel'
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
const StripeController = { payment, success, cancel }

export default StripeController