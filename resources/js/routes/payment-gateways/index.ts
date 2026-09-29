import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:41
 * @route '/dashboard/billings/payment'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/billings/payment',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:41
 * @route '/dashboard/billings/payment'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:41
 * @route '/dashboard/billings/payment'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:41
 * @route '/dashboard/billings/payment'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:41
 * @route '/dashboard/billings/payment'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:41
 * @route '/dashboard/billings/payment'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:41
 * @route '/dashboard/billings/payment'
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
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::update
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:51
 * @route '/dashboard/billings/payment/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/dashboard/billings/payment/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::update
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:51
 * @route '/dashboard/billings/payment/{id}'
 */
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::update
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:51
 * @route '/dashboard/billings/payment/{id}'
 */
update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::update
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:51
 * @route '/dashboard/billings/payment/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentController::update
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentController.php:51
 * @route '/dashboard/billings/payment/{id}'
 */
        updateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
const paymentGateways = {
    index: Object.assign(index, index),
update: Object.assign(update, update),
}

export default paymentGateways