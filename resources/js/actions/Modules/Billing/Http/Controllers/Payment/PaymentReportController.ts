import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::online_index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:32
 * @route '/dashboard/billings/payment-reports/online'
 */
export const online_index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: online_index.url(options),
    method: 'get',
})

online_index.definition = {
    methods: ["get","head"],
    url: '/dashboard/billings/payment-reports/online',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::online_index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:32
 * @route '/dashboard/billings/payment-reports/online'
 */
online_index.url = (options?: RouteQueryOptions) => {
    return online_index.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::online_index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:32
 * @route '/dashboard/billings/payment-reports/online'
 */
online_index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: online_index.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::online_index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:32
 * @route '/dashboard/billings/payment-reports/online'
 */
online_index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: online_index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::online_index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:32
 * @route '/dashboard/billings/payment-reports/online'
 */
    const online_indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: online_index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::online_index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:32
 * @route '/dashboard/billings/payment-reports/online'
 */
        online_indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: online_index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::online_index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:32
 * @route '/dashboard/billings/payment-reports/online'
 */
        online_indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: online_index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    online_index.form = online_indexForm
/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::offline_index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:47
 * @route '/dashboard/billings/payment-reports/offline'
 */
export const offline_index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: offline_index.url(options),
    method: 'get',
})

offline_index.definition = {
    methods: ["get","head"],
    url: '/dashboard/billings/payment-reports/offline',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::offline_index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:47
 * @route '/dashboard/billings/payment-reports/offline'
 */
offline_index.url = (options?: RouteQueryOptions) => {
    return offline_index.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::offline_index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:47
 * @route '/dashboard/billings/payment-reports/offline'
 */
offline_index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: offline_index.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::offline_index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:47
 * @route '/dashboard/billings/payment-reports/offline'
 */
offline_index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: offline_index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::offline_index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:47
 * @route '/dashboard/billings/payment-reports/offline'
 */
    const offline_indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: offline_index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::offline_index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:47
 * @route '/dashboard/billings/payment-reports/offline'
 */
        offline_indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: offline_index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::offline_index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:47
 * @route '/dashboard/billings/payment-reports/offline'
 */
        offline_indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: offline_index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    offline_index.form = offline_indexForm
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
const PaymentReportController = { online_index, offline_index, verify, reject }

export default PaymentReportController