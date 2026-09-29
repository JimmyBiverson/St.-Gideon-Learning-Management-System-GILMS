import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:47
 * @route '/dashboard/billings/payment-reports/offline'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/billings/payment-reports/offline',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:47
 * @route '/dashboard/billings/payment-reports/offline'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:47
 * @route '/dashboard/billings/payment-reports/offline'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:47
 * @route '/dashboard/billings/payment-reports/offline'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:47
 * @route '/dashboard/billings/payment-reports/offline'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:47
 * @route '/dashboard/billings/payment-reports/offline'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:47
 * @route '/dashboard/billings/payment-reports/offline'
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
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::verify
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:62
 * @route '/dashboard/billings/payment-reports/offline/{id}/verify'
 */
export const verify = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(args, options),
    method: 'post',
})

verify.definition = {
    methods: ["post"],
    url: '/dashboard/billings/payment-reports/offline/{id}/verify',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::verify
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:62
 * @route '/dashboard/billings/payment-reports/offline/{id}/verify'
 */
verify.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return verify.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::verify
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:62
 * @route '/dashboard/billings/payment-reports/offline/{id}/verify'
 */
verify.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::verify
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:62
 * @route '/dashboard/billings/payment-reports/offline/{id}/verify'
 */
    const verifyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: verify.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::verify
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:62
 * @route '/dashboard/billings/payment-reports/offline/{id}/verify'
 */
        verifyForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: verify.url(args, options),
            method: 'post',
        })
    
    verify.form = verifyForm
/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::reject
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:139
 * @route '/dashboard/billings/payment-reports/offline/{id}/reject'
 */
export const reject = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

reject.definition = {
    methods: ["post"],
    url: '/dashboard/billings/payment-reports/offline/{id}/reject',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::reject
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:139
 * @route '/dashboard/billings/payment-reports/offline/{id}/reject'
 */
reject.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return reject.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::reject
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:139
 * @route '/dashboard/billings/payment-reports/offline/{id}/reject'
 */
reject.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reject.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::reject
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:139
 * @route '/dashboard/billings/payment-reports/offline/{id}/reject'
 */
    const rejectForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reject.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::reject
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:139
 * @route '/dashboard/billings/payment-reports/offline/{id}/reject'
 */
        rejectForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reject.url(args, options),
            method: 'post',
        })
    
    reject.form = rejectForm
const offline = {
    index: Object.assign(index, index),
verify: Object.assign(verify, verify),
reject: Object.assign(reject, reject),
}

export default offline