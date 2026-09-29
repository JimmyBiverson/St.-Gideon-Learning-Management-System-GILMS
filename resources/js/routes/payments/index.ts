import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import paypal from './paypal'
import stripe from './stripe'
import mollie from './mollie'
import paystack from './paystack'
import offline from './offline'
import flutterwave from './flutterwave'
import xendit from './xendit'
import eps from './eps'
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
const payments = {
    index: Object.assign(index, index),
paypal: Object.assign(paypal, paypal),
stripe: Object.assign(stripe, stripe),
mollie: Object.assign(mollie, mollie),
paystack: Object.assign(paystack, paystack),
offline: Object.assign(offline, offline),
flutterwave: Object.assign(flutterwave, flutterwave),
xendit: Object.assign(xendit, xendit),
eps: Object.assign(eps, eps),
}

export default payments