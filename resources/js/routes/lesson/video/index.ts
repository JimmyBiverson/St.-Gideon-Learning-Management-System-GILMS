import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\LessonVideoStreamController::__invoke
 * @see Modules/Course/app/Http/Controllers/LessonVideoStreamController.php:26
 * @route '/lessons/{lesson}/stream'
 */
export const stream = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stream.url(args, options),
    method: 'get',
})

stream.definition = {
    methods: ["get","head"],
    url: '/lessons/{lesson}/stream',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\LessonVideoStreamController::__invoke
 * @see Modules/Course/app/Http/Controllers/LessonVideoStreamController.php:26
 * @route '/lessons/{lesson}/stream'
 */
stream.url = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lesson: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { lesson: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    lesson: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        lesson: typeof args.lesson === 'object'
                ? args.lesson.id
                : args.lesson,
                }

    return stream.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\LessonVideoStreamController::__invoke
 * @see Modules/Course/app/Http/Controllers/LessonVideoStreamController.php:26
 * @route '/lessons/{lesson}/stream'
 */
stream.get = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: stream.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\LessonVideoStreamController::__invoke
 * @see Modules/Course/app/Http/Controllers/LessonVideoStreamController.php:26
 * @route '/lessons/{lesson}/stream'
 */
stream.head = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: stream.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\LessonVideoStreamController::__invoke
 * @see Modules/Course/app/Http/Controllers/LessonVideoStreamController.php:26
 * @route '/lessons/{lesson}/stream'
 */
    const streamForm = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: stream.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\LessonVideoStreamController::__invoke
 * @see Modules/Course/app/Http/Controllers/LessonVideoStreamController.php:26
 * @route '/lessons/{lesson}/stream'
 */
        streamForm.get = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: stream.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\LessonVideoStreamController::__invoke
 * @see Modules/Course/app/Http/Controllers/LessonVideoStreamController.php:26
 * @route '/lessons/{lesson}/stream'
 */
        streamForm.head = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: stream.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    stream.form = streamForm
/**
* @see \Modules\Course\Http\Controllers\LessonVideoUrlController::__invoke
 * @see Modules/Course/app/Http/Controllers/LessonVideoUrlController.php:18
 * @route '/lessons/{lesson}/stream-url'
 */
export const streamUrl = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: streamUrl.url(args, options),
    method: 'get',
})

streamUrl.definition = {
    methods: ["get","head"],
    url: '/lessons/{lesson}/stream-url',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\LessonVideoUrlController::__invoke
 * @see Modules/Course/app/Http/Controllers/LessonVideoUrlController.php:18
 * @route '/lessons/{lesson}/stream-url'
 */
streamUrl.url = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lesson: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { lesson: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    lesson: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        lesson: typeof args.lesson === 'object'
                ? args.lesson.id
                : args.lesson,
                }

    return streamUrl.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\LessonVideoUrlController::__invoke
 * @see Modules/Course/app/Http/Controllers/LessonVideoUrlController.php:18
 * @route '/lessons/{lesson}/stream-url'
 */
streamUrl.get = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: streamUrl.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\LessonVideoUrlController::__invoke
 * @see Modules/Course/app/Http/Controllers/LessonVideoUrlController.php:18
 * @route '/lessons/{lesson}/stream-url'
 */
streamUrl.head = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: streamUrl.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\LessonVideoUrlController::__invoke
 * @see Modules/Course/app/Http/Controllers/LessonVideoUrlController.php:18
 * @route '/lessons/{lesson}/stream-url'
 */
    const streamUrlForm = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: streamUrl.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\LessonVideoUrlController::__invoke
 * @see Modules/Course/app/Http/Controllers/LessonVideoUrlController.php:18
 * @route '/lessons/{lesson}/stream-url'
 */
        streamUrlForm.get = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: streamUrl.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\LessonVideoUrlController::__invoke
 * @see Modules/Course/app/Http/Controllers/LessonVideoUrlController.php:18
 * @route '/lessons/{lesson}/stream-url'
 */
        streamUrlForm.head = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: streamUrl.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    streamUrl.form = streamUrlForm
const video = {
    stream: Object.assign(stream, stream),
streamUrl: Object.assign(streamUrl, streamUrl),
}

export default video