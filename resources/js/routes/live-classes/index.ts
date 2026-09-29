import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\LiveClassController::store
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:41
 * @route '/dashboard/live-classes'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/live-classes',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\LiveClassController::store
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:41
 * @route '/dashboard/live-classes'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\LiveClassController::store
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:41
 * @route '/dashboard/live-classes'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\LiveClassController::store
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:41
 * @route '/dashboard/live-classes'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\LiveClassController::store
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:41
 * @route '/dashboard/live-classes'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Course\Http\Controllers\LiveClassController::update
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:66
 * @route '/dashboard/live-classes/{live_class}'
 */
export const update = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/live-classes/{live_class}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Course\Http\Controllers\LiveClassController::update
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:66
 * @route '/dashboard/live-classes/{live_class}'
 */
update.url = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { live_class: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    live_class: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        live_class: args.live_class,
                }

    return update.definition.url
            .replace('{live_class}', parsedArgs.live_class.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\LiveClassController::update
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:66
 * @route '/dashboard/live-classes/{live_class}'
 */
update.put = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Course\Http\Controllers\LiveClassController::update
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:66
 * @route '/dashboard/live-classes/{live_class}'
 */
update.patch = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Course\Http\Controllers\LiveClassController::update
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:66
 * @route '/dashboard/live-classes/{live_class}'
 */
    const updateForm = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\LiveClassController::update
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:66
 * @route '/dashboard/live-classes/{live_class}'
 */
        updateForm.put = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Course\Http\Controllers\LiveClassController::update
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:66
 * @route '/dashboard/live-classes/{live_class}'
 */
        updateForm.patch = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \Modules\Course\Http\Controllers\LiveClassController::destroy
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:88
 * @route '/dashboard/live-classes/{live_class}'
 */
export const destroy = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/live-classes/{live_class}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Course\Http\Controllers\LiveClassController::destroy
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:88
 * @route '/dashboard/live-classes/{live_class}'
 */
destroy.url = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { live_class: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    live_class: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        live_class: args.live_class,
                }

    return destroy.definition.url
            .replace('{live_class}', parsedArgs.live_class.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\LiveClassController::destroy
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:88
 * @route '/dashboard/live-classes/{live_class}'
 */
destroy.delete = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Course\Http\Controllers\LiveClassController::destroy
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:88
 * @route '/dashboard/live-classes/{live_class}'
 */
    const destroyForm = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\LiveClassController::destroy
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:88
 * @route '/dashboard/live-classes/{live_class}'
 */
        destroyForm.delete = (args: { live_class: string | number } | [live_class: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const liveClasses = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default liveClasses