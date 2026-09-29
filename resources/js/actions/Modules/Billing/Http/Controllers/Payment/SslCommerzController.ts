import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:27
 * @route '/payments/sslcommerz/payment'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: index.url(options),
    method: 'post',
})

index.definition = {
    methods: ["post"],
    url: '/payments/sslcommerz/payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:27
 * @route '/payments/sslcommerz/payment'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:27
 * @route '/payments/sslcommerz/payment'
 */
index.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: index.url(options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:27
 * @route '/payments/sslcommerz/payment'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: index.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:27
 * @route '/payments/sslcommerz/payment'
 */
        indexForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: index.url(options),
            method: 'post',
        })
    
    index.form = indexForm
/**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:118
 * @route '/payments/sslcommerz/success'
 */
export const success = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: success.url(options),
    method: 'post',
})

success.definition = {
    methods: ["post"],
    url: '/payments/sslcommerz/success',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:118
 * @route '/payments/sslcommerz/success'
 */
success.url = (options?: RouteQueryOptions) => {
    return success.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:118
 * @route '/payments/sslcommerz/success'
 */
success.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: success.url(options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:118
 * @route '/payments/sslcommerz/success'
 */
    const successForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: success.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::success
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:118
 * @route '/payments/sslcommerz/success'
 */
        successForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: success.url(options),
            method: 'post',
        })
    
    success.form = successForm
/**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::fail
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:180
 * @route '/payments/sslcommerz/fail'
 */
export const fail = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: fail.url(options),
    method: 'post',
})

fail.definition = {
    methods: ["post"],
    url: '/payments/sslcommerz/fail',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::fail
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:180
 * @route '/payments/sslcommerz/fail'
 */
fail.url = (options?: RouteQueryOptions) => {
    return fail.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::fail
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:180
 * @route '/payments/sslcommerz/fail'
 */
fail.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: fail.url(options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::fail
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:180
 * @route '/payments/sslcommerz/fail'
 */
    const failForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: fail.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::fail
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:180
 * @route '/payments/sslcommerz/fail'
 */
        failForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: fail.url(options),
            method: 'post',
        })
    
    fail.form = failForm
/**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:207
 * @route '/payments/sslcommerz/cancel'
 */
export const cancel = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/payments/sslcommerz/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:207
 * @route '/payments/sslcommerz/cancel'
 */
cancel.url = (options?: RouteQueryOptions) => {
    return cancel.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:207
 * @route '/payments/sslcommerz/cancel'
 */
cancel.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:207
 * @route '/payments/sslcommerz/cancel'
 */
    const cancelForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancel.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:207
 * @route '/payments/sslcommerz/cancel'
 */
        cancelForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancel.url(options),
            method: 'post',
        })
    
    cancel.form = cancelForm
/**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::ipn
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:234
 * @route '/payments/sslcommerz/ipn'
 */
export const ipn = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ipn.url(options),
    method: 'post',
})

ipn.definition = {
    methods: ["post"],
    url: '/payments/sslcommerz/ipn',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::ipn
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:234
 * @route '/payments/sslcommerz/ipn'
 */
ipn.url = (options?: RouteQueryOptions) => {
    return ipn.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::ipn
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:234
 * @route '/payments/sslcommerz/ipn'
 */
ipn.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ipn.url(options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::ipn
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:234
 * @route '/payments/sslcommerz/ipn'
 */
    const ipnForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: ipn.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\SslCommerzController::ipn
 * @see Modules/Billing/app/Http/Controllers/Payment/SslCommerzController.php:234
 * @route '/payments/sslcommerz/ipn'
 */
        ipnForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: ipn.url(options),
            method: 'post',
        })
    
    ipn.form = ipnForm
const SslCommerzController = { index, success, fail, cancel, ipn }

export default SslCommerzController