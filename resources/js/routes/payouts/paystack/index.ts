import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\Payout\PaystackController::redirect
 * @see Modules/Billing/app/Http/Controllers/Payout/PaystackController.php:17
 * @route '/payouts/paystack/redirect'
 */
export const redirect = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: redirect.url(options),
    method: 'get',
})

redirect.definition = {
    methods: ["get","head"],
    url: '/payouts/paystack/redirect',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payout\PaystackController::redirect
 * @see Modules/Billing/app/Http/Controllers/Payout/PaystackController.php:17
 * @route '/payouts/paystack/redirect'
 */
redirect.url = (options?: RouteQueryOptions) => {
    return redirect.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payout\PaystackController::redirect
 * @see Modules/Billing/app/Http/Controllers/Payout/PaystackController.php:17
 * @route '/payouts/paystack/redirect'
 */
redirect.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: redirect.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payout\PaystackController::redirect
 * @see Modules/Billing/app/Http/Controllers/Payout/PaystackController.php:17
 * @route '/payouts/paystack/redirect'
 */
redirect.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: redirect.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payout\PaystackController::redirect
 * @see Modules/Billing/app/Http/Controllers/Payout/PaystackController.php:17
 * @route '/payouts/paystack/redirect'
 */
    const redirectForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: redirect.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payout\PaystackController::redirect
 * @see Modules/Billing/app/Http/Controllers/Payout/PaystackController.php:17
 * @route '/payouts/paystack/redirect'
 */
        redirectForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: redirect.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payout\PaystackController::redirect
 * @see Modules/Billing/app/Http/Controllers/Payout/PaystackController.php:17
 * @route '/payouts/paystack/redirect'
 */
        redirectForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: redirect.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    redirect.form = redirectForm
/**
* @see \Modules\Billing\Http\Controllers\Payout\PaystackController::callback
 * @see Modules/Billing/app/Http/Controllers/Payout/PaystackController.php:41
 * @route '/payouts/paystack/callback'
 */
export const callback = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})

callback.definition = {
    methods: ["get","head"],
    url: '/payouts/paystack/callback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payout\PaystackController::callback
 * @see Modules/Billing/app/Http/Controllers/Payout/PaystackController.php:41
 * @route '/payouts/paystack/callback'
 */
callback.url = (options?: RouteQueryOptions) => {
    return callback.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payout\PaystackController::callback
 * @see Modules/Billing/app/Http/Controllers/Payout/PaystackController.php:41
 * @route '/payouts/paystack/callback'
 */
callback.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: callback.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payout\PaystackController::callback
 * @see Modules/Billing/app/Http/Controllers/Payout/PaystackController.php:41
 * @route '/payouts/paystack/callback'
 */
callback.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: callback.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payout\PaystackController::callback
 * @see Modules/Billing/app/Http/Controllers/Payout/PaystackController.php:41
 * @route '/payouts/paystack/callback'
 */
    const callbackForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: callback.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payout\PaystackController::callback
 * @see Modules/Billing/app/Http/Controllers/Payout/PaystackController.php:41
 * @route '/payouts/paystack/callback'
 */
        callbackForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: callback.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payout\PaystackController::callback
 * @see Modules/Billing/app/Http/Controllers/Payout/PaystackController.php:41
 * @route '/payouts/paystack/callback'
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
const paystack = {
    redirect: Object.assign(redirect, redirect),
callback: Object.assign(callback, callback),
}

export default paystack