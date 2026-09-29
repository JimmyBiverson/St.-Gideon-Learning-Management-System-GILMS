import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:32
 * @route '/dashboard/billings/payment-reports/online'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/billings/payment-reports/online',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:32
 * @route '/dashboard/billings/payment-reports/online'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:32
 * @route '/dashboard/billings/payment-reports/online'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:32
 * @route '/dashboard/billings/payment-reports/online'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:32
 * @route '/dashboard/billings/payment-reports/online'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:32
 * @route '/dashboard/billings/payment-reports/online'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payment\PaymentReportController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/PaymentReportController.php:32
 * @route '/dashboard/billings/payment-reports/online'
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
const online = {
    index: Object.assign(index, index),
}

export default online