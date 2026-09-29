import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\Payment\EpsController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/EpsController.php:23
 * @route '/payments/eps/payment'
 */
export const payment = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payment.url(options),
    method: 'post',
})

payment.definition = {
    methods: ["post"],
    url: '/payments/eps/payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\EpsController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/EpsController.php:23
 * @route '/payments/eps/payment'
 */
payment.url = (options?: RouteQueryOptions) => {
    return payment.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\EpsController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/EpsController.php:23
 * @route '/payments/eps/payment'
 */
payment.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payment.url(options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\EpsController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/EpsController.php:23
 * @route '/payments/eps/payment'
 */
    const paymentForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: payment.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\EpsController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/EpsController.php:23
 * @route '/payments/eps/payment'
 */
        paymentForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: payment.url(options),
            method: 'post',
        })
    
    payment.form = paymentForm
/**
* @see \Modules\Billing\Http\Controllers\Payment\EpsController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/EpsController.php:93
 * @route '/payments/eps/success'
 */
export const success = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: success.url(options),
    method: 'get',
})

success.definition = {
    methods: ["get","head"],
    url: '/payments/eps/success',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\EpsController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/EpsController.php:93
 * @route '/payments/eps/success'
 */
success.url = (options?: RouteQueryOptions) => {
    return success.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\EpsController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/EpsController.php:93
 * @route '/payments/eps/success'
 */
success.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: success.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payment\EpsController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/EpsController.php:93
 * @route '/payments/eps/success'
 */
success.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: success.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\EpsController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/EpsController.php:93
 * @route '/payments/eps/success'
 */
    const successForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: success.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\EpsController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/EpsController.php:93
 * @route '/payments/eps/success'
 */
        successForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: success.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payment\EpsController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/EpsController.php:93
 * @route '/payments/eps/success'
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
* @see \Modules\Billing\Http\Controllers\Payment\EpsController::fail
 * @see Modules/Billing/app/Http/Controllers/Payment/EpsController.php:152
 * @route '/payments/eps/fail'
 */
export const fail = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: fail.url(options),
    method: 'get',
})

fail.definition = {
    methods: ["get","head"],
    url: '/payments/eps/fail',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\EpsController::fail
 * @see Modules/Billing/app/Http/Controllers/Payment/EpsController.php:152
 * @route '/payments/eps/fail'
 */
fail.url = (options?: RouteQueryOptions) => {
    return fail.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\EpsController::fail
 * @see Modules/Billing/app/Http/Controllers/Payment/EpsController.php:152
 * @route '/payments/eps/fail'
 */
fail.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: fail.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payment\EpsController::fail
 * @see Modules/Billing/app/Http/Controllers/Payment/EpsController.php:152
 * @route '/payments/eps/fail'
 */
fail.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: fail.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\EpsController::fail
 * @see Modules/Billing/app/Http/Controllers/Payment/EpsController.php:152
 * @route '/payments/eps/fail'
 */
    const failForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: fail.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\EpsController::fail
 * @see Modules/Billing/app/Http/Controllers/Payment/EpsController.php:152
 * @route '/payments/eps/fail'
 */
        failForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: fail.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payment\EpsController::fail
 * @see Modules/Billing/app/Http/Controllers/Payment/EpsController.php:152
 * @route '/payments/eps/fail'
 */
        failForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: fail.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    fail.form = failForm
/**
* @see \Modules\Billing\Http\Controllers\Payment\EpsController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/EpsController.php:159
 * @route '/payments/eps/cancel'
 */
export const cancel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cancel.url(options),
    method: 'get',
})

cancel.definition = {
    methods: ["get","head"],
    url: '/payments/eps/cancel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\EpsController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/EpsController.php:159
 * @route '/payments/eps/cancel'
 */
cancel.url = (options?: RouteQueryOptions) => {
    return cancel.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\EpsController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/EpsController.php:159
 * @route '/payments/eps/cancel'
 */
cancel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cancel.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payment\EpsController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/EpsController.php:159
 * @route '/payments/eps/cancel'
 */
cancel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cancel.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\EpsController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/EpsController.php:159
 * @route '/payments/eps/cancel'
 */
    const cancelForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: cancel.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\EpsController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/EpsController.php:159
 * @route '/payments/eps/cancel'
 */
        cancelForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: cancel.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payment\EpsController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/EpsController.php:159
 * @route '/payments/eps/cancel'
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
const eps = {
    payment: Object.assign(payment, payment),
success: Object.assign(success, success),
fail: Object.assign(fail, fail),
cancel: Object.assign(cancel, cancel),
}

export default eps