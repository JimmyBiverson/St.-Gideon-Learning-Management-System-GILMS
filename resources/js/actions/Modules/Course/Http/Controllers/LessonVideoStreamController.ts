import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\LessonVideoStreamController::__invoke
 * @see Modules/Course/app/Http/Controllers/LessonVideoStreamController.php:26
 * @route '/lessons/{lesson}/stream'
 */
const LessonVideoStreamController = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LessonVideoStreamController.url(args, options),
    method: 'get',
})

LessonVideoStreamController.definition = {
    methods: ["get","head"],
    url: '/lessons/{lesson}/stream',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\LessonVideoStreamController::__invoke
 * @see Modules/Course/app/Http/Controllers/LessonVideoStreamController.php:26
 * @route '/lessons/{lesson}/stream'
 */
LessonVideoStreamController.url = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return LessonVideoStreamController.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\LessonVideoStreamController::__invoke
 * @see Modules/Course/app/Http/Controllers/LessonVideoStreamController.php:26
 * @route '/lessons/{lesson}/stream'
 */
LessonVideoStreamController.get = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LessonVideoStreamController.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\LessonVideoStreamController::__invoke
 * @see Modules/Course/app/Http/Controllers/LessonVideoStreamController.php:26
 * @route '/lessons/{lesson}/stream'
 */
LessonVideoStreamController.head = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: LessonVideoStreamController.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\LessonVideoStreamController::__invoke
 * @see Modules/Course/app/Http/Controllers/LessonVideoStreamController.php:26
 * @route '/lessons/{lesson}/stream'
 */
    const LessonVideoStreamControllerForm = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: LessonVideoStreamController.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\LessonVideoStreamController::__invoke
 * @see Modules/Course/app/Http/Controllers/LessonVideoStreamController.php:26
 * @route '/lessons/{lesson}/stream'
 */
        LessonVideoStreamControllerForm.get = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: LessonVideoStreamController.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\LessonVideoStreamController::__invoke
 * @see Modules/Course/app/Http/Controllers/LessonVideoStreamController.php:26
 * @route '/lessons/{lesson}/stream'
 */
        LessonVideoStreamControllerForm.head = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: LessonVideoStreamController.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    LessonVideoStreamController.form = LessonVideoStreamControllerForm
export default LessonVideoStreamController