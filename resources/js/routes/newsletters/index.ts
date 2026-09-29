import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\NewsletterController::index
 * @see app/Http/Controllers/NewsletterController.php:19
 * @route '/dashboard/newsletters'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/newsletters',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\NewsletterController::index
 * @see app/Http/Controllers/NewsletterController.php:19
 * @route '/dashboard/newsletters'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NewsletterController::index
 * @see app/Http/Controllers/NewsletterController.php:19
 * @route '/dashboard/newsletters'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\NewsletterController::index
 * @see app/Http/Controllers/NewsletterController.php:19
 * @route '/dashboard/newsletters'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\NewsletterController::index
 * @see app/Http/Controllers/NewsletterController.php:19
 * @route '/dashboard/newsletters'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\NewsletterController::index
 * @see app/Http/Controllers/NewsletterController.php:19
 * @route '/dashboard/newsletters'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\NewsletterController::index
 * @see app/Http/Controllers/NewsletterController.php:19
 * @route '/dashboard/newsletters'
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
* @see \App\Http\Controllers\NewsletterController::store
 * @see app/Http/Controllers/NewsletterController.php:29
 * @route '/dashboard/newsletters'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/newsletters',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\NewsletterController::store
 * @see app/Http/Controllers/NewsletterController.php:29
 * @route '/dashboard/newsletters'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NewsletterController::store
 * @see app/Http/Controllers/NewsletterController.php:29
 * @route '/dashboard/newsletters'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\NewsletterController::store
 * @see app/Http/Controllers/NewsletterController.php:29
 * @route '/dashboard/newsletters'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\NewsletterController::store
 * @see app/Http/Controllers/NewsletterController.php:29
 * @route '/dashboard/newsletters'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\NewsletterController::update
 * @see app/Http/Controllers/NewsletterController.php:39
 * @route '/dashboard/newsletters/{newsletter}'
 */
export const update = (args: { newsletter: string | number } | [newsletter: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/newsletters/{newsletter}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\NewsletterController::update
 * @see app/Http/Controllers/NewsletterController.php:39
 * @route '/dashboard/newsletters/{newsletter}'
 */
update.url = (args: { newsletter: string | number } | [newsletter: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { newsletter: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    newsletter: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        newsletter: args.newsletter,
                }

    return update.definition.url
            .replace('{newsletter}', parsedArgs.newsletter.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\NewsletterController::update
 * @see app/Http/Controllers/NewsletterController.php:39
 * @route '/dashboard/newsletters/{newsletter}'
 */
update.put = (args: { newsletter: string | number } | [newsletter: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\NewsletterController::update
 * @see app/Http/Controllers/NewsletterController.php:39
 * @route '/dashboard/newsletters/{newsletter}'
 */
update.patch = (args: { newsletter: string | number } | [newsletter: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\NewsletterController::update
 * @see app/Http/Controllers/NewsletterController.php:39
 * @route '/dashboard/newsletters/{newsletter}'
 */
    const updateForm = (args: { newsletter: string | number } | [newsletter: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\NewsletterController::update
 * @see app/Http/Controllers/NewsletterController.php:39
 * @route '/dashboard/newsletters/{newsletter}'
 */
        updateForm.put = (args: { newsletter: string | number } | [newsletter: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\NewsletterController::update
 * @see app/Http/Controllers/NewsletterController.php:39
 * @route '/dashboard/newsletters/{newsletter}'
 */
        updateForm.patch = (args: { newsletter: string | number } | [newsletter: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\NewsletterController::destroy
 * @see app/Http/Controllers/NewsletterController.php:49
 * @route '/dashboard/newsletters/{newsletter}'
 */
export const destroy = (args: { newsletter: string | number } | [newsletter: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/newsletters/{newsletter}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\NewsletterController::destroy
 * @see app/Http/Controllers/NewsletterController.php:49
 * @route '/dashboard/newsletters/{newsletter}'
 */
destroy.url = (args: { newsletter: string | number } | [newsletter: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { newsletter: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    newsletter: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        newsletter: args.newsletter,
                }

    return destroy.definition.url
            .replace('{newsletter}', parsedArgs.newsletter.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\NewsletterController::destroy
 * @see app/Http/Controllers/NewsletterController.php:49
 * @route '/dashboard/newsletters/{newsletter}'
 */
destroy.delete = (args: { newsletter: string | number } | [newsletter: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\NewsletterController::destroy
 * @see app/Http/Controllers/NewsletterController.php:49
 * @route '/dashboard/newsletters/{newsletter}'
 */
    const destroyForm = (args: { newsletter: string | number } | [newsletter: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\NewsletterController::destroy
 * @see app/Http/Controllers/NewsletterController.php:49
 * @route '/dashboard/newsletters/{newsletter}'
 */
        destroyForm.delete = (args: { newsletter: string | number } | [newsletter: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\NewsletterController::send
 * @see app/Http/Controllers/NewsletterController.php:59
 * @route '/dashboard/newsletters/send'
 */
export const send = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(options),
    method: 'post',
})

send.definition = {
    methods: ["post"],
    url: '/dashboard/newsletters/send',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\NewsletterController::send
 * @see app/Http/Controllers/NewsletterController.php:59
 * @route '/dashboard/newsletters/send'
 */
send.url = (options?: RouteQueryOptions) => {
    return send.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NewsletterController::send
 * @see app/Http/Controllers/NewsletterController.php:59
 * @route '/dashboard/newsletters/send'
 */
send.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\NewsletterController::send
 * @see app/Http/Controllers/NewsletterController.php:59
 * @route '/dashboard/newsletters/send'
 */
    const sendForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: send.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\NewsletterController::send
 * @see app/Http/Controllers/NewsletterController.php:59
 * @route '/dashboard/newsletters/send'
 */
        sendForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: send.url(options),
            method: 'post',
        })
    
    send.form = sendForm
const newsletters = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
send: Object.assign(send, send),
}

export default newsletters