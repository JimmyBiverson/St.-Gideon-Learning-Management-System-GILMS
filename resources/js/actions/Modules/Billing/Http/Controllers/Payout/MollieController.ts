import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\Payout\MollieController::payment
 * @see Modules/Billing/app/Http/Controllers/Payout/MollieController.php:17
 * @route '/payouts/mollie/payment'
 */
export const payment = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payment.url(options),
    method: 'post',
})

payment.definition = {
    methods: ["post"],
    url: '/payouts/mollie/payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payout\MollieController::payment
 * @see Modules/Billing/app/Http/Controllers/Payout/MollieController.php:17
 * @route '/payouts/mollie/payment'
 */
payment.url = (options?: RouteQueryOptions) => {
    return payment.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payout\MollieController::payment
 * @see Modules/Billing/app/Http/Controllers/Payout/MollieController.php:17
 * @route '/payouts/mollie/payment'
 */
payment.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payment.url(options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payout\MollieController::payment
 * @see Modules/Billing/app/Http/Controllers/Payout/MollieController.php:17
 * @route '/payouts/mollie/payment'
 */
    const paymentForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: payment.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payout\MollieController::payment
 * @see Modules/Billing/app/Http/Controllers/Payout/MollieController.php:17
 * @route '/payouts/mollie/payment'
 */
        paymentForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: payment.url(options),
            method: 'post',
        })
    
    payment.form = paymentForm
/**
* @see \Modules\Billing\Http\Controllers\Payout\MollieController::success
 * @see Modules/Billing/app/Http/Controllers/Payout/MollieController.php:51
 * @route '/payouts/mollie/success'
 */
export const success = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: success.url(options),
    method: 'get',
})

success.definition = {
    methods: ["get","head"],
    url: '/payouts/mollie/success',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payout\MollieController::success
 * @see Modules/Billing/app/Http/Controllers/Payout/MollieController.php:51
 * @route '/payouts/mollie/success'
 */
success.url = (options?: RouteQueryOptions) => {
    return success.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payout\MollieController::success
 * @see Modules/Billing/app/Http/Controllers/Payout/MollieController.php:51
 * @route '/payouts/mollie/success'
 */
success.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: success.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payout\MollieController::success
 * @see Modules/Billing/app/Http/Controllers/Payout/MollieController.php:51
 * @route '/payouts/mollie/success'
 */
success.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: success.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payout\MollieController::success
 * @see Modules/Billing/app/Http/Controllers/Payout/MollieController.php:51
 * @route '/payouts/mollie/success'
 */
    const successForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: success.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payout\MollieController::success
 * @see Modules/Billing/app/Http/Controllers/Payout/MollieController.php:51
 * @route '/payouts/mollie/success'
 */
        successForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: success.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payout\MollieController::success
 * @see Modules/Billing/app/Http/Controllers/Payout/MollieController.php:51
 * @route '/payouts/mollie/success'
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
const MollieController = { payment, success }

export default MollieController