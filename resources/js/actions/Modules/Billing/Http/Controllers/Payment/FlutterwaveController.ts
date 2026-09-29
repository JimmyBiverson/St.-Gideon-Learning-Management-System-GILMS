import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\Payment\FlutterwaveController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/FlutterwaveController.php:30
 * @route '/payments/flutterwave/payment'
 */
export const payment = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payment.url(options),
    method: 'post',
})

payment.definition = {
    methods: ["post"],
    url: '/payments/flutterwave/payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\FlutterwaveController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/FlutterwaveController.php:30
 * @route '/payments/flutterwave/payment'
 */
payment.url = (options?: RouteQueryOptions) => {
    return payment.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\FlutterwaveController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/FlutterwaveController.php:30
 * @route '/payments/flutterwave/payment'
 */
payment.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payment.url(options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\FlutterwaveController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/FlutterwaveController.php:30
 * @route '/payments/flutterwave/payment'
 */
    const paymentForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: payment.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\FlutterwaveController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/FlutterwaveController.php:30
 * @route '/payments/flutterwave/payment'
 */
        paymentForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: payment.url(options),
            method: 'post',
        })
    
    payment.form = paymentForm
/**
* @see \Modules\Billing\Http\Controllers\Payment\FlutterwaveController::callback
 * @see Modules/Billing/app/Http/Controllers/Payment/FlutterwaveController.php:80
 * @route '/payments/flutterwave/callback'
 */
export const callback = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

callback.definition = {
    methods: ["get","head"],
    url: '/payments/flutterwave/callback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\FlutterwaveController::callback
 * @see Modules/Billing/app/Http/Controllers/Payment/FlutterwaveController.php:80
 * @route '/payments/flutterwave/callback'
 */
callback.url = (options?: RouteQueryOptions) => {
    return callback.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\FlutterwaveController::callback
 * @see Modules/Billing/app/Http/Controllers/Payment/FlutterwaveController.php:80
 * @route '/payments/flutterwave/callback'
 */
callback.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payment\FlutterwaveController::callback
 * @see Modules/Billing/app/Http/Controllers/Payment/FlutterwaveController.php:80
 * @route '/payments/flutterwave/callback'
 */
callback.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: callback.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\FlutterwaveController::callback
 * @see Modules/Billing/app/Http/Controllers/Payment/FlutterwaveController.php:80
 * @route '/payments/flutterwave/callback'
 */
    const callbackForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: callback.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\FlutterwaveController::callback
 * @see Modules/Billing/app/Http/Controllers/Payment/FlutterwaveController.php:80
 * @route '/payments/flutterwave/callback'
 */
        callbackForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: callback.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payment\FlutterwaveController::callback
 * @see Modules/Billing/app/Http/Controllers/Payment/FlutterwaveController.php:80
 * @route '/payments/flutterwave/callback'
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
const FlutterwaveController = { payment, callback }

export default FlutterwaveController