import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::index
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:59
 * @route '/dashboard/billings/payouts/settings'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/billings/payouts/settings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::index
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:59
 * @route '/dashboard/billings/payouts/settings'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::index
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:59
 * @route '/dashboard/billings/payouts/settings'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::index
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:59
 * @route '/dashboard/billings/payouts/settings'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::index
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:59
 * @route '/dashboard/billings/payouts/settings'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::index
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:59
 * @route '/dashboard/billings/payouts/settings'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::index
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:59
 * @route '/dashboard/billings/payouts/settings'
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
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::update
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:70
 * @route '/dashboard/billings/payouts/settings'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/dashboard/billings/payouts/settings',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::update
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:70
 * @route '/dashboard/billings/payouts/settings'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::update
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:70
 * @route '/dashboard/billings/payouts/settings'
 */
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::update
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:70
 * @route '/dashboard/billings/payouts/settings'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payout\PayoutController::update
 * @see Modules/Billing/app/Http/Controllers/Payout/PayoutController.php:70
 * @route '/dashboard/billings/payouts/settings'
 */
        updateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(options),
            method: 'post',
        })
    
    update.form = updateForm
const settings = {
    index: Object.assign(index, index),
update: Object.assign(update, update),
}

export default settings