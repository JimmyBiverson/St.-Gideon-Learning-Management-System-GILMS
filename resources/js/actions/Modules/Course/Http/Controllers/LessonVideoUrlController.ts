import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\LessonVideoUrlController::__invoke
 * @see Modules/Course/app/Http/Controllers/LessonVideoUrlController.php:18
 * @route '/lessons/{lesson}/stream-url'
 */
const LessonVideoUrlController = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LessonVideoUrlController.url(args, options),
    method: 'get',
})

LessonVideoUrlController.definition = {
    methods: ["get","head"],
    url: '/lessons/{lesson}/stream-url',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\LessonVideoUrlController::__invoke
 * @see Modules/Course/app/Http/Controllers/LessonVideoUrlController.php:18
 * @route '/lessons/{lesson}/stream-url'
 */
LessonVideoUrlController.url = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return LessonVideoUrlController.definition.url
            .replace('{lesson}', parsedArgs.lesson.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\LessonVideoUrlController::__invoke
 * @see Modules/Course/app/Http/Controllers/LessonVideoUrlController.php:18
 * @route '/lessons/{lesson}/stream-url'
 */
LessonVideoUrlController.get = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: LessonVideoUrlController.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\LessonVideoUrlController::__invoke
 * @see Modules/Course/app/Http/Controllers/LessonVideoUrlController.php:18
 * @route '/lessons/{lesson}/stream-url'
 */
LessonVideoUrlController.head = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: LessonVideoUrlController.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\LessonVideoUrlController::__invoke
 * @see Modules/Course/app/Http/Controllers/LessonVideoUrlController.php:18
 * @route '/lessons/{lesson}/stream-url'
 */
    const LessonVideoUrlControllerForm = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: LessonVideoUrlController.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\LessonVideoUrlController::__invoke
 * @see Modules/Course/app/Http/Controllers/LessonVideoUrlController.php:18
 * @route '/lessons/{lesson}/stream-url'
 */
        LessonVideoUrlControllerForm.get = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: LessonVideoUrlController.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\LessonVideoUrlController::__invoke
 * @see Modules/Course/app/Http/Controllers/LessonVideoUrlController.php:18
 * @route '/lessons/{lesson}/stream-url'
 */
        LessonVideoUrlControllerForm.head = (args: { lesson: number | { id: number } } | [lesson: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: LessonVideoUrlController.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    LessonVideoUrlController.form = LessonVideoUrlControllerForm
export default LessonVideoUrlController