import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\PlayerController::intWatchHistory
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:27
 * @route '/player/init/watch-history'
 */
export const intWatchHistory = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: intWatchHistory.url(options),
    method: 'post',
})

intWatchHistory.definition = {
    methods: ["post"],
    url: '/player/init/watch-history',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\PlayerController::intWatchHistory
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:27
 * @route '/player/init/watch-history'
 */
intWatchHistory.url = (options?: RouteQueryOptions) => {
    return intWatchHistory.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\PlayerController::intWatchHistory
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:27
 * @route '/player/init/watch-history'
 */
intWatchHistory.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: intWatchHistory.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\PlayerController::intWatchHistory
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:27
 * @route '/player/init/watch-history'
 */
    const intWatchHistoryForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: intWatchHistory.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\PlayerController::intWatchHistory
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:27
 * @route '/player/init/watch-history'
 */
        intWatchHistoryForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: intWatchHistory.url(options),
            method: 'post',
        })
    
    intWatchHistory.form = intWatchHistoryForm
/**
* @see \Modules\Course\Http\Controllers\PlayerController::course_player
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:39
 * @route '/play-course/{type}/{watch_history}/{lesson_id}'
 */
export const course_player = (args: { type: string | number, watch_history: number | { id: number }, lesson_id: string | number } | [type: string | number, watch_history: number | { id: number }, lesson_id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: course_player.url(args, options),
    method: 'get',
})

course_player.definition = {
    methods: ["get","head"],
    url: '/play-course/{type}/{watch_history}/{lesson_id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\PlayerController::course_player
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:39
 * @route '/play-course/{type}/{watch_history}/{lesson_id}'
 */
course_player.url = (args: { type: string | number, watch_history: number | { id: number }, lesson_id: string | number } | [type: string | number, watch_history: number | { id: number }, lesson_id: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    type: args[0],
                    watch_history: args[1],
                    lesson_id: args[2],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        type: args.type,
                                watch_history: typeof args.watch_history === 'object'
                ? args.watch_history.id
                : args.watch_history,
                                lesson_id: args.lesson_id,
                }

    return course_player.definition.url
            .replace('{type}', parsedArgs.type.toString())
            .replace('{watch_history}', parsedArgs.watch_history.toString())
            .replace('{lesson_id}', parsedArgs.lesson_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\PlayerController::course_player
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:39
 * @route '/play-course/{type}/{watch_history}/{lesson_id}'
 */
course_player.get = (args: { type: string | number, watch_history: number | { id: number }, lesson_id: string | number } | [type: string | number, watch_history: number | { id: number }, lesson_id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: course_player.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\PlayerController::course_player
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:39
 * @route '/play-course/{type}/{watch_history}/{lesson_id}'
 */
course_player.head = (args: { type: string | number, watch_history: number | { id: number }, lesson_id: string | number } | [type: string | number, watch_history: number | { id: number }, lesson_id: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: course_player.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\PlayerController::course_player
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:39
 * @route '/play-course/{type}/{watch_history}/{lesson_id}'
 */
    const course_playerForm = (args: { type: string | number, watch_history: number | { id: number }, lesson_id: string | number } | [type: string | number, watch_history: number | { id: number }, lesson_id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: course_player.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\PlayerController::course_player
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:39
 * @route '/play-course/{type}/{watch_history}/{lesson_id}'
 */
        course_playerForm.get = (args: { type: string | number, watch_history: number | { id: number }, lesson_id: string | number } | [type: string | number, watch_history: number | { id: number }, lesson_id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: course_player.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\PlayerController::course_player
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:39
 * @route '/play-course/{type}/{watch_history}/{lesson_id}'
 */
        course_playerForm.head = (args: { type: string | number, watch_history: number | { id: number }, lesson_id: string | number } | [type: string | number, watch_history: number | { id: number }, lesson_id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: course_player.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    course_player.form = course_playerForm
/**
* @see \Modules\Course\Http\Controllers\PlayerController::finish_course
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:101
 * @route '/play-course/finish/{watch_history}'
 */
export const finish_course = (args: { watch_history: number | { id: number } } | [watch_history: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: finish_course.url(args, options),
    method: 'get',
})

finish_course.definition = {
    methods: ["get","head"],
    url: '/play-course/finish/{watch_history}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\PlayerController::finish_course
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:101
 * @route '/play-course/finish/{watch_history}'
 */
finish_course.url = (args: { watch_history: number | { id: number } } | [watch_history: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { watch_history: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { watch_history: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    watch_history: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        watch_history: typeof args.watch_history === 'object'
                ? args.watch_history.id
                : args.watch_history,
                }

    return finish_course.definition.url
            .replace('{watch_history}', parsedArgs.watch_history.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\PlayerController::finish_course
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:101
 * @route '/play-course/finish/{watch_history}'
 */
finish_course.get = (args: { watch_history: number | { id: number } } | [watch_history: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: finish_course.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\PlayerController::finish_course
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:101
 * @route '/play-course/finish/{watch_history}'
 */
finish_course.head = (args: { watch_history: number | { id: number } } | [watch_history: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: finish_course.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\PlayerController::finish_course
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:101
 * @route '/play-course/finish/{watch_history}'
 */
    const finish_courseForm = (args: { watch_history: number | { id: number } } | [watch_history: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: finish_course.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\PlayerController::finish_course
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:101
 * @route '/play-course/finish/{watch_history}'
 */
        finish_courseForm.get = (args: { watch_history: number | { id: number } } | [watch_history: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: finish_course.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\PlayerController::finish_course
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:101
 * @route '/play-course/finish/{watch_history}'
 */
        finish_courseForm.head = (args: { watch_history: number | { id: number } } | [watch_history: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: finish_course.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    finish_course.form = finish_courseForm
const PlayerController = { intWatchHistory, course_player, finish_course }

export default PlayerController