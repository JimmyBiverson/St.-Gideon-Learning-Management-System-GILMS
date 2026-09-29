import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\PlayerController::init
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:27
 * @route '/player/init/watch-history'
 */
export const init = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: init.url(options),
    method: 'post',
})

init.definition = {
    methods: ["post"],
    url: '/player/init/watch-history',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\PlayerController::init
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:27
 * @route '/player/init/watch-history'
 */
init.url = (options?: RouteQueryOptions) => {
    return init.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\PlayerController::init
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:27
 * @route '/player/init/watch-history'
 */
init.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: init.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\PlayerController::init
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:27
 * @route '/player/init/watch-history'
 */
    const initForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: init.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\PlayerController::init
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:27
 * @route '/player/init/watch-history'
 */
        initForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: init.url(options),
            method: 'post',
        })
    
    init.form = initForm
/**
* @see \Modules\Course\Http\Controllers\PlayerController::start
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:39
 * @route '/play-course/{type}/{watch_history}/{lesson_id}'
 */
export const start = (args: { type: string | number, watch_history: number | { id: number }, lesson_id: string | number } | [type: string | number, watch_history: number | { id: number }, lesson_id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: start.url(args, options),
    method: 'get',
})

start.definition = {
    methods: ["get","head"],
    url: '/play-course/{type}/{watch_history}/{lesson_id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\PlayerController::start
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:39
 * @route '/play-course/{type}/{watch_history}/{lesson_id}'
 */
start.url = (args: { type: string | number, watch_history: number | { id: number }, lesson_id: string | number } | [type: string | number, watch_history: number | { id: number }, lesson_id: string | number ], options?: RouteQueryOptions) => {
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

    return start.definition.url
            .replace('{type}', parsedArgs.type.toString())
            .replace('{watch_history}', parsedArgs.watch_history.toString())
            .replace('{lesson_id}', parsedArgs.lesson_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\PlayerController::start
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:39
 * @route '/play-course/{type}/{watch_history}/{lesson_id}'
 */
start.get = (args: { type: string | number, watch_history: number | { id: number }, lesson_id: string | number } | [type: string | number, watch_history: number | { id: number }, lesson_id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: start.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\PlayerController::start
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:39
 * @route '/play-course/{type}/{watch_history}/{lesson_id}'
 */
start.head = (args: { type: string | number, watch_history: number | { id: number }, lesson_id: string | number } | [type: string | number, watch_history: number | { id: number }, lesson_id: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: start.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\PlayerController::start
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:39
 * @route '/play-course/{type}/{watch_history}/{lesson_id}'
 */
    const startForm = (args: { type: string | number, watch_history: number | { id: number }, lesson_id: string | number } | [type: string | number, watch_history: number | { id: number }, lesson_id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: start.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\PlayerController::start
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:39
 * @route '/play-course/{type}/{watch_history}/{lesson_id}'
 */
        startForm.get = (args: { type: string | number, watch_history: number | { id: number }, lesson_id: string | number } | [type: string | number, watch_history: number | { id: number }, lesson_id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: start.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\PlayerController::start
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:39
 * @route '/play-course/{type}/{watch_history}/{lesson_id}'
 */
        startForm.head = (args: { type: string | number, watch_history: number | { id: number }, lesson_id: string | number } | [type: string | number, watch_history: number | { id: number }, lesson_id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: start.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    start.form = startForm
/**
* @see \Modules\Course\Http\Controllers\PlayerController::finish
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:101
 * @route '/play-course/finish/{watch_history}'
 */
export const finish = (args: { watch_history: number | { id: number } } | [watch_history: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: finish.url(args, options),
    method: 'get',
})

finish.definition = {
    methods: ["get","head"],
    url: '/play-course/finish/{watch_history}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\PlayerController::finish
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:101
 * @route '/play-course/finish/{watch_history}'
 */
finish.url = (args: { watch_history: number | { id: number } } | [watch_history: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return finish.definition.url
            .replace('{watch_history}', parsedArgs.watch_history.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\PlayerController::finish
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:101
 * @route '/play-course/finish/{watch_history}'
 */
finish.get = (args: { watch_history: number | { id: number } } | [watch_history: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: finish.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\PlayerController::finish
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:101
 * @route '/play-course/finish/{watch_history}'
 */
finish.head = (args: { watch_history: number | { id: number } } | [watch_history: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: finish.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\PlayerController::finish
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:101
 * @route '/play-course/finish/{watch_history}'
 */
    const finishForm = (args: { watch_history: number | { id: number } } | [watch_history: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: finish.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\PlayerController::finish
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:101
 * @route '/play-course/finish/{watch_history}'
 */
        finishForm.get = (args: { watch_history: number | { id: number } } | [watch_history: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: finish.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\PlayerController::finish
 * @see Modules/Course/app/Http/Controllers/PlayerController.php:101
 * @route '/play-course/finish/{watch_history}'
 */
        finishForm.head = (args: { watch_history: number | { id: number } } | [watch_history: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: finish.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    finish.form = finishForm
const play = {
    init: Object.assign(init, init),
start: Object.assign(start, start),
finish: Object.assign(finish, finish),
}

export default play