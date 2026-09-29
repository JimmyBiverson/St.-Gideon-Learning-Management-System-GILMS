import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import settings from './settings'
import paypal from './paypal'
import stripe from './stripe'
import mollie from './mollie'
import paystack from './paystack'
import razorpay from './razorpay'
import sslcommerz from './sslcommerz'
/**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::index
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:23
 * @route '/dashboard/billings/payouts'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/billings/payouts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::index
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:23
 * @route '/dashboard/billings/payouts'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::index
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:23
 * @route '/dashboard/billings/payouts'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::index
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:23
 * @route '/dashboard/billings/payouts'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::index
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:23
 * @route '/dashboard/billings/payouts'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::index
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:23
 * @route '/dashboard/billings/payouts'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::index
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:23
 * @route '/dashboard/billings/payouts'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::store
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:42
 * @route '/dashboard/billings/payouts'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/billings/payouts',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::store
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:42
 * @route '/dashboard/billings/payouts'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::store
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:42
 * @route '/dashboard/billings/payouts'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::store
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:42
 * @route '/dashboard/billings/payouts'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::store
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:42
 * @route '/dashboard/billings/payouts'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::destroy
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:0
 * @route '/dashboard/billings/payouts/{payout}'
 */
export const destroy = (args: { payout: string | number } | [payout: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/billings/payouts/{payout}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::destroy
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:0
 * @route '/dashboard/billings/payouts/{payout}'
 */
destroy.url = (args: { payout: string | number } | [payout: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { payout: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    payout: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        payout: args.payout,
                }

    return destroy.definition.url
            .replace('{payout}', parsedArgs.payout.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::destroy
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:0
 * @route '/dashboard/billings/payouts/{payout}'
 */
destroy.delete = (args: { payout: string | number } | [payout: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::destroy
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:0
 * @route '/dashboard/billings/payouts/{payout}'
 */
    const destroyForm = (args: { payout: string | number } | [payout: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::destroy
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:0
 * @route '/dashboard/billings/payouts/{payout}'
 */
        destroyForm.delete = (args: { payout: string | number } | [payout: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::request
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:82
 * @route '/dashboard/billings/payouts/request'
 */
export const request = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: request.url(options),
    method: 'get',
})

request.definition = {
    methods: ["get","head"],
    url: '/dashboard/billings/payouts/request',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::request
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:82
 * @route '/dashboard/billings/payouts/request'
 */
request.url = (options?: RouteQueryOptions) => {
    return request.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::request
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:82
 * @route '/dashboard/billings/payouts/request'
 */
request.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: request.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::request
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:82
 * @route '/dashboard/billings/payouts/request'
 */
request.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: request.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::request
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:82
 * @route '/dashboard/billings/payouts/request'
 */
    const requestForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: request.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::request
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:82
 * @route '/dashboard/billings/payouts/request'
 */
        requestForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: request.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::request
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:82
 * @route '/dashboard/billings/payouts/request'
 */
        requestForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: request.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    request.form = requestForm
/**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::history
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:97
 * @route '/dashboard/billings/payouts/history'
 */
export const history = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(options),
    method: 'get',
})

history.definition = {
    methods: ["get","head"],
    url: '/dashboard/billings/payouts/history',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::history
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:97
 * @route '/dashboard/billings/payouts/history'
 */
history.url = (options?: RouteQueryOptions) => {
    return history.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::history
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:97
 * @route '/dashboard/billings/payouts/history'
 */
history.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: history.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::history
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:97
 * @route '/dashboard/billings/payouts/history'
 */
history.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: history.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::history
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:97
 * @route '/dashboard/billings/payouts/history'
 */
    const historyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: history.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::history
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:97
 * @route '/dashboard/billings/payouts/history'
 */
        historyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::history
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:97
 * @route '/dashboard/billings/payouts/history'
 */
        historyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: history.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    history.form = historyForm
/**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::checkout
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:109
 * @route '/payouts/{slug}/{request_id}'
 */
export const checkout = (args: { slug: string | number, request_id: string | number } | [slug: string | number, request_id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkout.url(args, options),
    method: 'get',
})

checkout.definition = {
    methods: ["get","head"],
    url: '/payouts/{slug}/{request_id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::checkout
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:109
 * @route '/payouts/{slug}/{request_id}'
 */
checkout.url = (args: { slug: string | number, request_id: string | number } | [slug: string | number, request_id: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    slug: args[0],
                    request_id: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        slug: args.slug,
                                request_id: args.request_id,
                }

    return checkout.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace('{request_id}', parsedArgs.request_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::checkout
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:109
 * @route '/payouts/{slug}/{request_id}'
 */
checkout.get = (args: { slug: string | number, request_id: string | number } | [slug: string | number, request_id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: checkout.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::checkout
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:109
 * @route '/payouts/{slug}/{request_id}'
 */
checkout.head = (args: { slug: string | number, request_id: string | number } | [slug: string | number, request_id: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: checkout.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::checkout
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:109
 * @route '/payouts/{slug}/{request_id}'
 */
    const checkoutForm = (args: { slug: string | number, request_id: string | number } | [slug: string | number, request_id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: checkout.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::checkout
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:109
 * @route '/payouts/{slug}/{request_id}'
 */
        checkoutForm.get = (args: { slug: string | number, request_id: string | number } | [slug: string | number, request_id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: checkout.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::checkout
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:109
 * @route '/payouts/{slug}/{request_id}'
 */
        checkoutForm.head = (args: { slug: string | number, request_id: string | number } | [slug: string | number, request_id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: checkout.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    checkout.form = checkoutForm
const payouts = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
settings: Object.assign(settings, settings),
request: Object.assign(request, request),
history: Object.assign(history, history),
paypal: Object.assign(paypal, paypal),
stripe: Object.assign(stripe, stripe),
mollie: Object.assign(mollie, mollie),
paystack: Object.assign(paystack, paystack),
razorpay: Object.assign(razorpay, razorpay),
checkout: Object.assign(checkout, checkout),
sslcommerz: Object.assign(sslcommerz, sslcommerz),
}

export default payouts