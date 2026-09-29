import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:41
 * @route '/dashboard/billings/payment'
 */
export const payment = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: payment.url(options),
    method: 'get',
})

payment.definition = {
    methods: ["get","head"],
    url: '/dashboard/billings/payment',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:41
 * @route '/dashboard/billings/payment'
 */
payment.url = (options?: RouteQueryOptions) => {
    return payment.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:41
 * @route '/dashboard/billings/payment'
 */
payment.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: payment.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:41
 * @route '/dashboard/billings/payment'
 */
payment.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: payment.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:41
 * @route '/dashboard/billings/payment'
 */
    const paymentForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: payment.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:41
 * @route '/dashboard/billings/payment'
 */
        paymentForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: payment.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::payment
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:41
 * @route '/dashboard/billings/payment'
 */
        paymentForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: payment.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    payment.form = paymentForm
/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::payment_update
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:51
 * @route '/dashboard/billings/payment/{id}'
 */
export const payment_update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payment_update.url(args, options),
    method: 'post',
})

payment_update.definition = {
    methods: ["post"],
    url: '/dashboard/billings/payment/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::payment_update
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:51
 * @route '/dashboard/billings/payment/{id}'
 */
payment_update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return payment_update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::payment_update
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:51
 * @route '/dashboard/billings/payment/{id}'
 */
payment_update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payment_update.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::payment_update
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:51
 * @route '/dashboard/billings/payment/{id}'
 */
    const payment_updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: payment_update.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::payment_update
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:51
 * @route '/dashboard/billings/payment/{id}'
 */
        payment_updateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: payment_update.url(args, options),
            method: 'post',
        })
    
    payment_update.form = payment_updateForm
/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:19
 * @route '/payments/{from}/{item}/{id}'
 */
export const index = (args: { from: string | number, item: string | number, id: string | number } | [from: string | number, item: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/payments/{from}/{item}/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:19
 * @route '/payments/{from}/{item}/{id}'
 */
index.url = (args: { from: string | number, item: string | number, id: string | number } | [from: string | number, item: string | number, id: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    from: args[0],
                    item: args[1],
                    id: args[2],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        from: args.from,
                                item: args.item,
                                id: args.id,
                }

    return index.definition.url
            .replace('{from}', parsedArgs.from.toString())
            .replace('{item}', parsedArgs.item.toString())
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:19
 * @route '/payments/{from}/{item}/{id}'
 */
index.get = (args: { from: string | number, item: string | number, id: string | number } | [from: string | number, item: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:19
 * @route '/payments/{from}/{item}/{id}'
 */
index.head = (args: { from: string | number, item: string | number, id: string | number } | [from: string | number, item: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:19
 * @route '/payments/{from}/{item}/{id}'
 */
    const indexForm = (args: { from: string | number, item: string | number, id: string | number } | [from: string | number, item: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:19
 * @route '/payments/{from}/{item}/{id}'
 */
        indexForm.get = (args: { from: string | number, item: string | number, id: string | number } | [from: string | number, item: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:19
 * @route '/payments/{from}/{item}/{id}'
 */
        indexForm.head = (args: { from: string | number, item: string | number, id: string | number } | [from: string | number, item: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
const PaymentController = { payment, payment_update, index }

export default PaymentController