import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\Payout\SslCommerzController::index
 * @see Modules/Billing/app/Http/Controllers/Payout/SslCommerzController.php:20
 * @route '/payouts/sslcommerz/payment'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: index.url(options),
    method: 'post',
})

index.definition = {
    methods: ["post"],
    url: '/payouts/sslcommerz/payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payout\SslCommerzController::index
 * @see Modules/Billing/app/Http/Controllers/Payout/SslCommerzController.php:20
 * @route '/payouts/sslcommerz/payment'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payout\SslCommerzController::index
 * @see Modules/Billing/app/Http/Controllers/Payout/SslCommerzController.php:20
 * @route '/payouts/sslcommerz/payment'
 */
index.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: index.url(options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payout\SslCommerzController::index
 * @see Modules/Billing/app/Http/Controllers/Payout/SslCommerzController.php:20
 * @route '/payouts/sslcommerz/payment'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: index.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payout\SslCommerzController::index
 * @see Modules/Billing/app/Http/Controllers/Payout/SslCommerzController.php:20
 * @route '/payouts/sslcommerz/payment'
 */
        indexForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: index.url(options),
            method: 'post',
        })
    
    index.form = indexForm
/**
* @see \Modules\Billing\Http\Controllers\Payout\SslCommerzController::success
 * @see Modules/Billing/app/Http/Controllers/Payout/SslCommerzController.php:63
 * @route '/payouts/sslcommerz/success'
 */
export const success = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: success.url(options),
    method: 'post',
})

success.definition = {
    methods: ["post"],
    url: '/payouts/sslcommerz/success',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payout\SslCommerzController::success
 * @see Modules/Billing/app/Http/Controllers/Payout/SslCommerzController.php:63
 * @route '/payouts/sslcommerz/success'
 */
success.url = (options?: RouteQueryOptions) => {
    return success.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payout\SslCommerzController::success
 * @see Modules/Billing/app/Http/Controllers/Payout/SslCommerzController.php:63
 * @route '/payouts/sslcommerz/success'
 */
success.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: success.url(options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payout\SslCommerzController::success
 * @see Modules/Billing/app/Http/Controllers/Payout/SslCommerzController.php:63
 * @route '/payouts/sslcommerz/success'
 */
    const successForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: success.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payout\SslCommerzController::success
 * @see Modules/Billing/app/Http/Controllers/Payout/SslCommerzController.php:63
 * @route '/payouts/sslcommerz/success'
 */
        successForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: success.url(options),
            method: 'post',
        })
    
    success.form = successForm
/**
* @see \Modules\Billing\Http\Controllers\Payout\SslCommerzController::fail
 * @see Modules/Billing/app/Http/Controllers/Payout/SslCommerzController.php:106
 * @route '/payouts/sslcommerz/fail'
 */
export const fail = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: fail.url(options),
    method: 'post',
})

fail.definition = {
    methods: ["post"],
    url: '/payouts/sslcommerz/fail',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payout\SslCommerzController::fail
 * @see Modules/Billing/app/Http/Controllers/Payout/SslCommerzController.php:106
 * @route '/payouts/sslcommerz/fail'
 */
fail.url = (options?: RouteQueryOptions) => {
    return fail.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payout\SslCommerzController::fail
 * @see Modules/Billing/app/Http/Controllers/Payout/SslCommerzController.php:106
 * @route '/payouts/sslcommerz/fail'
 */
fail.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: fail.url(options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payout\SslCommerzController::fail
 * @see Modules/Billing/app/Http/Controllers/Payout/SslCommerzController.php:106
 * @route '/payouts/sslcommerz/fail'
 */
    const failForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: fail.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payout\SslCommerzController::fail
 * @see Modules/Billing/app/Http/Controllers/Payout/SslCommerzController.php:106
 * @route '/payouts/sslcommerz/fail'
 */
        failForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: fail.url(options),
            method: 'post',
        })
    
    fail.form = failForm
/**
* @see \Modules\Billing\Http\Controllers\Payout\SslCommerzController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payout/SslCommerzController.php:122
 * @route '/payouts/sslcommerz/cancel'
 */
export const cancel = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/payouts/sslcommerz/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payout\SslCommerzController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payout/SslCommerzController.php:122
 * @route '/payouts/sslcommerz/cancel'
 */
cancel.url = (options?: RouteQueryOptions) => {
    return cancel.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payout\SslCommerzController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payout/SslCommerzController.php:122
 * @route '/payouts/sslcommerz/cancel'
 */
cancel.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payout\SslCommerzController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payout/SslCommerzController.php:122
 * @route '/payouts/sslcommerz/cancel'
 */
    const cancelForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancel.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payout\SslCommerzController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payout/SslCommerzController.php:122
 * @route '/payouts/sslcommerz/cancel'
 */
        cancelForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancel.url(options),
            method: 'post',
        })
    
    cancel.form = cancelForm
/**
* @see \Modules\Billing\Http\Controllers\Payout\SslCommerzController::ipn
 * @see Modules/Billing/app/Http/Controllers/Payout/SslCommerzController.php:138
 * @route '/payouts/sslcommerz/ipn'
 */
export const ipn = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ipn.url(options),
    method: 'post',
})

ipn.definition = {
    methods: ["post"],
    url: '/payouts/sslcommerz/ipn',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payout\SslCommerzController::ipn
 * @see Modules/Billing/app/Http/Controllers/Payout/SslCommerzController.php:138
 * @route '/payouts/sslcommerz/ipn'
 */
ipn.url = (options?: RouteQueryOptions) => {
    return ipn.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payout\SslCommerzController::ipn
 * @see Modules/Billing/app/Http/Controllers/Payout/SslCommerzController.php:138
 * @route '/payouts/sslcommerz/ipn'
 */
ipn.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ipn.url(options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payout\SslCommerzController::ipn
 * @see Modules/Billing/app/Http/Controllers/Payout/SslCommerzController.php:138
 * @route '/payouts/sslcommerz/ipn'
 */
    const ipnForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: ipn.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payout\SslCommerzController::ipn
 * @see Modules/Billing/app/Http/Controllers/Payout/SslCommerzController.php:138
 * @route '/payouts/sslcommerz/ipn'
 */
        ipnForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: ipn.url(options),
            method: 'post',
        })
    
    ipn.form = ipnForm
const SslCommerzController = { index, success, fail, cancel, ipn }

export default SslCommerzController