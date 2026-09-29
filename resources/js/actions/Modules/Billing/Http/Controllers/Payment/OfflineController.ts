import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\Payment\OfflineController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/OfflineController.php:32
 * @route '/payments/offline/redirect'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/payments/offline/redirect',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\OfflineController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/OfflineController.php:32
 * @route '/payments/offline/redirect'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\OfflineController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/OfflineController.php:32
 * @route '/payments/offline/redirect'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payment\OfflineController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/OfflineController.php:32
 * @route '/payments/offline/redirect'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\OfflineController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/OfflineController.php:32
 * @route '/payments/offline/redirect'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\OfflineController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/OfflineController.php:32
 * @route '/payments/offline/redirect'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payment\OfflineController::index
 * @see Modules/Billing/app/Http/Controllers/Payment/OfflineController.php:32
 * @route '/payments/offline/redirect'
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
* @see \Modules\Billing\Http\Controllers\Payment\OfflineController::submit
 * @see Modules/Billing/app/Http/Controllers/Payment/OfflineController.php:67
 * @route '/payments/offline/submit'
 */
export const submit = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(options),
    method: 'post',
})

submit.definition = {
    methods: ["post"],
    url: '/payments/offline/submit',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\OfflineController::submit
 * @see Modules/Billing/app/Http/Controllers/Payment/OfflineController.php:67
 * @route '/payments/offline/submit'
 */
submit.url = (options?: RouteQueryOptions) => {
    return submit.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\OfflineController::submit
 * @see Modules/Billing/app/Http/Controllers/Payment/OfflineController.php:67
 * @route '/payments/offline/submit'
 */
submit.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(options),
    method: 'post',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\OfflineController::submit
 * @see Modules/Billing/app/Http/Controllers/Payment/OfflineController.php:67
 * @route '/payments/offline/submit'
 */
    const submitForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submit.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\OfflineController::submit
 * @see Modules/Billing/app/Http/Controllers/Payment/OfflineController.php:67
 * @route '/payments/offline/submit'
 */
        submitForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submit.url(options),
            method: 'post',
        })
    
    submit.form = submitForm
/**
* @see \Modules\Billing\Http\Controllers\Payment\OfflineController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/OfflineController.php:155
 * @route '/payments/offline/cancel'
 */
export const cancel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cancel.url(options),
    method: 'get',
})

cancel.definition = {
    methods: ["get","head"],
    url: '/payments/offline/cancel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\OfflineController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/OfflineController.php:155
 * @route '/payments/offline/cancel'
 */
cancel.url = (options?: RouteQueryOptions) => {
    return cancel.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\OfflineController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/OfflineController.php:155
 * @route '/payments/offline/cancel'
 */
cancel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: cancel.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payment\OfflineController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/OfflineController.php:155
 * @route '/payments/offline/cancel'
 */
cancel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: cancel.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\OfflineController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/OfflineController.php:155
 * @route '/payments/offline/cancel'
 */
    const cancelForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: cancel.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\OfflineController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/OfflineController.php:155
 * @route '/payments/offline/cancel'
 */
        cancelForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: cancel.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payment\OfflineController::cancel
 * @see Modules/Billing/app/Http/Controllers/Payment/OfflineController.php:155
 * @route '/payments/offline/cancel'
 */
        cancelForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: cancel.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    cancel.form = cancelForm
const OfflineController = { index, submit, cancel }

export default OfflineController