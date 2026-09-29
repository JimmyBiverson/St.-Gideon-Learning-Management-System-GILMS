import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\Payment\OfflineController::redirect
 * @see Modules/Billing/app/Http/Controllers/Payment/OfflineController.php:32
 * @route '/payments/offline/redirect'
 */
export const redirect = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: redirect.url(options),
    method: 'get',
})

redirect.definition = {
    methods: ["get","head"],
    url: '/payments/offline/redirect',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payment\OfflineController::redirect
 * @see Modules/Billing/app/Http/Controllers/Payment/OfflineController.php:32
 * @route '/payments/offline/redirect'
 */
redirect.url = (options?: RouteQueryOptions) => {
    return redirect.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payment\OfflineController::redirect
 * @see Modules/Billing/app/Http/Controllers/Payment/OfflineController.php:32
 * @route '/payments/offline/redirect'
 */
redirect.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: redirect.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payment\OfflineController::redirect
 * @see Modules/Billing/app/Http/Controllers/Payment/OfflineController.php:32
 * @route '/payments/offline/redirect'
 */
redirect.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: redirect.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payment\OfflineController::redirect
 * @see Modules/Billing/app/Http/Controllers/Payment/OfflineController.php:32
 * @route '/payments/offline/redirect'
 */
    const redirectForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: redirect.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payment\OfflineController::redirect
 * @see Modules/Billing/app/Http/Controllers/Payment/OfflineController.php:32
 * @route '/payments/offline/redirect'
 */
        redirectForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: redirect.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payment\OfflineController::redirect
 * @see Modules/Billing/app/Http/Controllers/Payment/OfflineController.php:32
 * @route '/payments/offline/redirect'
 */
        redirectForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: redirect.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    redirect.form = redirectForm
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
const offline = {
    redirect: Object.assign(redirect, redirect),
submit: Object.assign(submit, submit),
cancel: Object.assign(cancel, cancel),
}

export default offline