import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\BunnyVideoUploadController::initiate
 * @see Modules/Course/app/Http/Controllers/BunnyVideoUploadController.php:21
 * @route '/dashboard/uploads/bunny/initiate'
 */
export const initiate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: initiate.url(options),
    method: 'post',
})

initiate.definition = {
    methods: ["post"],
    url: '/dashboard/uploads/bunny/initiate',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\BunnyVideoUploadController::initiate
 * @see Modules/Course/app/Http/Controllers/BunnyVideoUploadController.php:21
 * @route '/dashboard/uploads/bunny/initiate'
 */
initiate.url = (options?: RouteQueryOptions) => {
    return initiate.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\BunnyVideoUploadController::initiate
 * @see Modules/Course/app/Http/Controllers/BunnyVideoUploadController.php:21
 * @route '/dashboard/uploads/bunny/initiate'
 */
initiate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: initiate.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\BunnyVideoUploadController::initiate
 * @see Modules/Course/app/Http/Controllers/BunnyVideoUploadController.php:21
 * @route '/dashboard/uploads/bunny/initiate'
 */
    const initiateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: initiate.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\BunnyVideoUploadController::initiate
 * @see Modules/Course/app/Http/Controllers/BunnyVideoUploadController.php:21
 * @route '/dashboard/uploads/bunny/initiate'
 */
        initiateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: initiate.url(options),
            method: 'post',
        })
    
    initiate.form = initiateForm
/**
* @see \Modules\Course\Http\Controllers\BunnyVideoUploadController::complete
 * @see Modules/Course/app/Http/Controllers/BunnyVideoUploadController.php:48
 * @route '/dashboard/uploads/bunny/{upload}/complete'
 */
export const complete = (args: { upload: number | { id: number } } | [upload: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

complete.definition = {
    methods: ["post"],
    url: '/dashboard/uploads/bunny/{upload}/complete',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\BunnyVideoUploadController::complete
 * @see Modules/Course/app/Http/Controllers/BunnyVideoUploadController.php:48
 * @route '/dashboard/uploads/bunny/{upload}/complete'
 */
complete.url = (args: { upload: number | { id: number } } | [upload: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { upload: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { upload: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    upload: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        upload: typeof args.upload === 'object'
                ? args.upload.id
                : args.upload,
                }

    return complete.definition.url
            .replace('{upload}', parsedArgs.upload.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\BunnyVideoUploadController::complete
 * @see Modules/Course/app/Http/Controllers/BunnyVideoUploadController.php:48
 * @route '/dashboard/uploads/bunny/{upload}/complete'
 */
complete.post = (args: { upload: number | { id: number } } | [upload: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: complete.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\BunnyVideoUploadController::complete
 * @see Modules/Course/app/Http/Controllers/BunnyVideoUploadController.php:48
 * @route '/dashboard/uploads/bunny/{upload}/complete'
 */
    const completeForm = (args: { upload: number | { id: number } } | [upload: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: complete.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\BunnyVideoUploadController::complete
 * @see Modules/Course/app/Http/Controllers/BunnyVideoUploadController.php:48
 * @route '/dashboard/uploads/bunny/{upload}/complete'
 */
        completeForm.post = (args: { upload: number | { id: number } } | [upload: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: complete.url(args, options),
            method: 'post',
        })
    
    complete.form = completeForm
/**
* @see \Modules\Course\Http\Controllers\BunnyVideoUploadController::abort
 * @see Modules/Course/app/Http/Controllers/BunnyVideoUploadController.php:64
 * @route '/dashboard/uploads/bunny/{upload}/abort'
 */
export const abort = (args: { upload: number | { id: number } } | [upload: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: abort.url(args, options),
    method: 'delete',
})

abort.definition = {
    methods: ["delete"],
    url: '/dashboard/uploads/bunny/{upload}/abort',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Course\Http\Controllers\BunnyVideoUploadController::abort
 * @see Modules/Course/app/Http/Controllers/BunnyVideoUploadController.php:64
 * @route '/dashboard/uploads/bunny/{upload}/abort'
 */
abort.url = (args: { upload: number | { id: number } } | [upload: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { upload: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { upload: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    upload: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        upload: typeof args.upload === 'object'
                ? args.upload.id
                : args.upload,
                }

    return abort.definition.url
            .replace('{upload}', parsedArgs.upload.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\BunnyVideoUploadController::abort
 * @see Modules/Course/app/Http/Controllers/BunnyVideoUploadController.php:64
 * @route '/dashboard/uploads/bunny/{upload}/abort'
 */
abort.delete = (args: { upload: number | { id: number } } | [upload: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: abort.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Course\Http\Controllers\BunnyVideoUploadController::abort
 * @see Modules/Course/app/Http/Controllers/BunnyVideoUploadController.php:64
 * @route '/dashboard/uploads/bunny/{upload}/abort'
 */
    const abortForm = (args: { upload: number | { id: number } } | [upload: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: abort.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\BunnyVideoUploadController::abort
 * @see Modules/Course/app/Http/Controllers/BunnyVideoUploadController.php:64
 * @route '/dashboard/uploads/bunny/{upload}/abort'
 */
        abortForm.delete = (args: { upload: number | { id: number } } | [upload: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: abort.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    abort.form = abortForm
const BunnyVideoUploadController = { initiate, complete, abort }

export default BunnyVideoUploadController