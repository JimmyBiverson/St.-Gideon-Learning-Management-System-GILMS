import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\Payment\XenditController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/XenditController.php:28
 * @route '/payments/xendit/payment'
 */
export const payment = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payment.url(options),
    method: 'post',
})

payment.definition = {
    methods: ["post"],
    url: '/payments/xendit/payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\XenditController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/XenditController.php:28
 * @route '/payments/xendit/payment'
 */
payment.url = (options?: RouteQueryOptions) => {
    return payment.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\XenditController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/XenditController.php:28
 * @route '/payments/xendit/payment'
 */
payment.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payment.url(options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\XenditController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/XenditController.php:28
 * @route '/payments/xendit/payment'
 */
    const paymentForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: payment.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\XenditController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/XenditController.php:28
 * @route '/payments/xendit/payment'
 */
        paymentForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: payment.url(options),
            method: 'post',
        })
    
    payment.form = paymentForm
/**
* @see \Modules\Billing\Http\Controllers\Payment\XenditController::callback
 * @see Modules/Billing/app/Http/Controllers/Payment/XenditController.php:76
 * @route '/payments/xendit/callback'
 */
export const callback = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

callback.definition = {
    methods: ["get","head"],
    url: '/payments/xendit/callback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\XenditController::callback
 * @see Modules/Billing/app/Http/Controllers/Payment/XenditController.php:76
 * @route '/payments/xendit/callback'
 */
callback.url = (options?: RouteQueryOptions) => {
    return callback.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\XenditController::callback
 * @see Modules/Billing/app/Http/Controllers/Payment/XenditController.php:76
 * @route '/payments/xendit/callback'
 */
callback.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payment\XenditController::callback
 * @see Modules/Billing/app/Http/Controllers/Payment/XenditController.php:76
 * @route '/payments/xendit/callback'
 */
callback.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: callback.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\XenditController::callback
 * @see Modules/Billing/app/Http/Controllers/Payment/XenditController.php:76
 * @route '/payments/xendit/callback'
 */
    const callbackForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: callback.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\XenditController::callback
 * @see Modules/Billing/app/Http/Controllers/Payment/XenditController.php:76
 * @route '/payments/xendit/callback'
 */
        callbackForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: callback.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payment\XenditController::callback
 * @see Modules/Billing/app/Http/Controllers/Payment/XenditController.php:76
 * @route '/payments/xendit/callback'
 */
        callbackForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: callback.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    callback.form = callbackForm
/**
* @see \Modules\Billing\Http\Controllers\Payment\XenditController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/XenditController.php:124
 * @route '/payments/xendit/cancel'
 */
export const cancel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cancel.url(options),
    method: 'get',
})

cancel.definition = {
    methods: ["get","head"],
    url: '/payments/xendit/cancel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\XenditController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/XenditController.php:124
 * @route '/payments/xendit/cancel'
 */
cancel.url = (options?: RouteQueryOptions) => {
    return cancel.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\XenditController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/XenditController.php:124
 * @route '/payments/xendit/cancel'
 */
cancel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cancel.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payment\XenditController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/XenditController.php:124
 * @route '/payments/xendit/cancel'
 */
cancel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cancel.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\XenditController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/XenditController.php:124
 * @route '/payments/xendit/cancel'
 */
    const cancelForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: cancel.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\XenditController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/XenditController.php:124
 * @route '/payments/xendit/cancel'
 */
        cancelForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: cancel.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payment\XenditController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/XenditController.php:124
 * @route '/payments/xendit/cancel'
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
const XenditController = { payment, callback, cancel }

export default XenditController