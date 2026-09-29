import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
/**
* @see \Modules\Course\Http\Controllers\LiveClassController::index
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:23
 * @route '/live-classes/start/{id}'
 */
export const index = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/live-classes/start/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\LiveClassController::index
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:23
 * @route '/live-classes/start/{id}'
 */
index.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return index.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\LiveClassController::index
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:23
 * @route '/live-classes/start/{id}'
 */
index.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\LiveClassController::index
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:23
 * @route '/live-classes/start/{id}'
 */
index.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\LiveClassController::index
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:23
 * @route '/live-classes/start/{id}'
 */
    const indexForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\LiveClassController::index
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:23
 * @route '/live-classes/start/{id}'
 */
        indexForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\LiveClassController::index
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:23
 * @route '/live-classes/start/{id}'
 */
        indexForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \Modules\Course\Http\Controllers\LiveClassController::signature
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:109
 * @route '/live-classes/signature/{id}'
 */
export const signature = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: signature.url(args, options),
    method: 'get',
})

signature.definition = {
    methods: ["get","head"],
    url: '/live-classes/signature/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\LiveClassController::signature
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:109
 * @route '/live-classes/signature/{id}'
 */
signature.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return signature.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\LiveClassController::signature
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:109
 * @route '/live-classes/signature/{id}'
 */
signature.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: signature.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\LiveClassController::signature
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:109
 * @route '/live-classes/signature/{id}'
 */
signature.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: signature.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\LiveClassController::signature
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:109
 * @route '/live-classes/signature/{id}'
 */
    const signatureForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: signature.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\LiveClassController::signature
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:109
 * @route '/live-classes/signature/{id}'
 */
        signatureForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: signature.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\LiveClassController::signature
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:109
 * @route '/live-classes/signature/{id}'
 */
        signatureForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: signature.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    signature.form = signatureForm
const LiveClassController = { store, update, destroy, index, signature }

export default LiveClassController