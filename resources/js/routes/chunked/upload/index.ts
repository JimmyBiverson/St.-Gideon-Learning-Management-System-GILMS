import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\ChunkedUploadController::initialize
 * @see app/Http/Controllers/ChunkedUploadController.php:36
 * @route '/dashboard/uploads/chunked/initialize'
 */
export const initialize = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: initialize.url(options),
    method: 'post',
})

initialize.definition = {
    methods: ["post"],
    url: '/dashboard/uploads/chunked/initialize',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ChunkedUploadController::initialize
 * @see app/Http/Controllers/ChunkedUploadController.php:36
 * @route '/dashboard/uploads/chunked/initialize'
 */
initialize.url = (options?: RouteQueryOptions) => {
    return initialize.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChunkedUploadController::initialize
 * @see app/Http/Controllers/ChunkedUploadController.php:36
 * @route '/dashboard/uploads/chunked/initialize'
 */
initialize.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: initialize.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ChunkedUploadController::initialize
 * @see app/Http/Controllers/ChunkedUploadController.php:36
 * @route '/dashboard/uploads/chunked/initialize'
 */
    const initializeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: initialize.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ChunkedUploadController::initialize
 * @see app/Http/Controllers/ChunkedUploadController.php:36
 * @route '/dashboard/uploads/chunked/initialize'
 */
        initializeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: initialize.url(options),
            method: 'post',
        })
    
    initialize.form = initializeForm
/**
* @see \App\Http\Controllers\ChunkedUploadController::chunk
 * @see app/Http/Controllers/ChunkedUploadController.php:99
 * @route '/dashboard/uploads/chunked/{id}/chunk'
 */
export const chunk = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: chunk.url(args, options),
    method: 'post',
})

chunk.definition = {
    methods: ["post"],
    url: '/dashboard/uploads/chunked/{id}/chunk',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ChunkedUploadController::chunk
 * @see app/Http/Controllers/ChunkedUploadController.php:99
 * @route '/dashboard/uploads/chunked/{id}/chunk'
 */
chunk.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return chunk.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChunkedUploadController::chunk
 * @see app/Http/Controllers/ChunkedUploadController.php:99
 * @route '/dashboard/uploads/chunked/{id}/chunk'
 */
chunk.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: chunk.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ChunkedUploadController::chunk
 * @see app/Http/Controllers/ChunkedUploadController.php:99
 * @route '/dashboard/uploads/chunked/{id}/chunk'
 */
    const chunkForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: chunk.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ChunkedUploadController::chunk
 * @see app/Http/Controllers/ChunkedUploadController.php:99
 * @route '/dashboard/uploads/chunked/{id}/chunk'
 */
        chunkForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: chunk.url(args, options),
            method: 'post',
        })
    
    chunk.form = chunkForm
/**
* @see \App\Http\Controllers\ChunkedUploadController::complete
 * @see app/Http/Controllers/ChunkedUploadController.php:162
 * @route '/dashboard/uploads/chunked/{id}/complete'
 */
export const complete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

complete.definition = {
    methods: ["post"],
    url: '/dashboard/uploads/chunked/{id}/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ChunkedUploadController::complete
 * @see app/Http/Controllers/ChunkedUploadController.php:162
 * @route '/dashboard/uploads/chunked/{id}/complete'
 */
complete.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return complete.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChunkedUploadController::complete
 * @see app/Http/Controllers/ChunkedUploadController.php:162
 * @route '/dashboard/uploads/chunked/{id}/complete'
 */
complete.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ChunkedUploadController::complete
 * @see app/Http/Controllers/ChunkedUploadController.php:162
 * @route '/dashboard/uploads/chunked/{id}/complete'
 */
    const completeForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: complete.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ChunkedUploadController::complete
 * @see app/Http/Controllers/ChunkedUploadController.php:162
 * @route '/dashboard/uploads/chunked/{id}/complete'
 */
        completeForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: complete.url(args, options),
            method: 'post',
        })
    
    complete.form = completeForm
/**
* @see \App\Http\Controllers\ChunkedUploadController::status
 * @see app/Http/Controllers/ChunkedUploadController.php:266
 * @route '/dashboard/uploads/chunked/{id}/status'
 */
export const status = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(args, options),
    method: 'get',
})

status.definition = {
    methods: ["get","head"],
    url: '/dashboard/uploads/chunked/{id}/status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ChunkedUploadController::status
 * @see app/Http/Controllers/ChunkedUploadController.php:266
 * @route '/dashboard/uploads/chunked/{id}/status'
 */
status.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return status.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChunkedUploadController::status
 * @see app/Http/Controllers/ChunkedUploadController.php:266
 * @route '/dashboard/uploads/chunked/{id}/status'
 */
status.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: status.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ChunkedUploadController::status
 * @see app/Http/Controllers/ChunkedUploadController.php:266
 * @route '/dashboard/uploads/chunked/{id}/status'
 */
status.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: status.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ChunkedUploadController::status
 * @see app/Http/Controllers/ChunkedUploadController.php:266
 * @route '/dashboard/uploads/chunked/{id}/status'
 */
    const statusForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: status.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ChunkedUploadController::status
 * @see app/Http/Controllers/ChunkedUploadController.php:266
 * @route '/dashboard/uploads/chunked/{id}/status'
 */
        statusForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: status.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ChunkedUploadController::status
 * @see app/Http/Controllers/ChunkedUploadController.php:266
 * @route '/dashboard/uploads/chunked/{id}/status'
 */
        statusForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: status.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    status.form = statusForm
/**
* @see \App\Http\Controllers\ChunkedUploadController::abort
 * @see app/Http/Controllers/ChunkedUploadController.php:299
 * @route '/dashboard/uploads/chunked/{id}/abort'
 */
export const abort = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: abort.url(args, options),
    method: 'delete',
})

abort.definition = {
    methods: ["delete"],
    url: '/dashboard/uploads/chunked/{id}/abort',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ChunkedUploadController::abort
 * @see app/Http/Controllers/ChunkedUploadController.php:299
 * @route '/dashboard/uploads/chunked/{id}/abort'
 */
abort.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return abort.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ChunkedUploadController::abort
 * @see app/Http/Controllers/ChunkedUploadController.php:299
 * @route '/dashboard/uploads/chunked/{id}/abort'
 */
abort.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: abort.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ChunkedUploadController::abort
 * @see app/Http/Controllers/ChunkedUploadController.php:299
 * @route '/dashboard/uploads/chunked/{id}/abort'
 */
    const abortForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: abort.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ChunkedUploadController::abort
 * @see app/Http/Controllers/ChunkedUploadController.php:299
 * @route '/dashboard/uploads/chunked/{id}/abort'
 */
        abortForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: abort.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    abort.form = abortForm
const upload = {
    initialize: Object.assign(initialize, initialize),
chunk: Object.assign(chunk, chunk),
complete: Object.assign(complete, complete),
status: Object.assign(status, status),
abort: Object.assign(abort, abort),
}

export default upload