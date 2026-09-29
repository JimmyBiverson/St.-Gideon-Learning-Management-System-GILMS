import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\QuizController::store
 * @see Modules/Course/app/Http/Controllers/QuizController.php:18
 * @route '/dashboard/section/quiz'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/section/quiz',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\QuizController::store
 * @see Modules/Course/app/Http/Controllers/QuizController.php:18
 * @route '/dashboard/section/quiz'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\QuizController::store
 * @see Modules/Course/app/Http/Controllers/QuizController.php:18
 * @route '/dashboard/section/quiz'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\QuizController::store
 * @see Modules/Course/app/Http/Controllers/QuizController.php:18
 * @route '/dashboard/section/quiz'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\QuizController::store
 * @see Modules/Course/app/Http/Controllers/QuizController.php:18
 * @route '/dashboard/section/quiz'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Course\Http\Controllers\QuizController::update
 * @see Modules/Course/app/Http/Controllers/QuizController.php:31
 * @route '/dashboard/section/quiz/{quiz}'
 */
export const update = (args: { quiz: string | number } | [quiz: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/section/quiz/{quiz}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Course\Http\Controllers\QuizController::update
 * @see Modules/Course/app/Http/Controllers/QuizController.php:31
 * @route '/dashboard/section/quiz/{quiz}'
 */
update.url = (args: { quiz: string | number } | [quiz: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { quiz: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    quiz: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        quiz: args.quiz,
                }

    return update.definition.url
            .replace('{quiz}', parsedArgs.quiz.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\QuizController::update
 * @see Modules/Course/app/Http/Controllers/QuizController.php:31
 * @route '/dashboard/section/quiz/{quiz}'
 */
update.put = (args: { quiz: string | number } | [quiz: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Course\Http\Controllers\QuizController::update
 * @see Modules/Course/app/Http/Controllers/QuizController.php:31
 * @route '/dashboard/section/quiz/{quiz}'
 */
update.patch = (args: { quiz: string | number } | [quiz: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Course\Http\Controllers\QuizController::update
 * @see Modules/Course/app/Http/Controllers/QuizController.php:31
 * @route '/dashboard/section/quiz/{quiz}'
 */
    const updateForm = (args: { quiz: string | number } | [quiz: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\QuizController::update
 * @see Modules/Course/app/Http/Controllers/QuizController.php:31
 * @route '/dashboard/section/quiz/{quiz}'
 */
        updateForm.put = (args: { quiz: string | number } | [quiz: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Course\Http\Controllers\QuizController::update
 * @see Modules/Course/app/Http/Controllers/QuizController.php:31
 * @route '/dashboard/section/quiz/{quiz}'
 */
        updateForm.patch = (args: { quiz: string | number } | [quiz: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Course\Http\Controllers\QuizController::destroy
 * @see Modules/Course/app/Http/Controllers/QuizController.php:38
 * @route '/dashboard/section/quiz/{quiz}'
 */
export const destroy = (args: { quiz: string | number } | [quiz: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/section/quiz/{quiz}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Course\Http\Controllers\QuizController::destroy
 * @see Modules/Course/app/Http/Controllers/QuizController.php:38
 * @route '/dashboard/section/quiz/{quiz}'
 */
destroy.url = (args: { quiz: string | number } | [quiz: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { quiz: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    quiz: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        quiz: args.quiz,
                }

    return destroy.definition.url
            .replace('{quiz}', parsedArgs.quiz.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\QuizController::destroy
 * @see Modules/Course/app/Http/Controllers/QuizController.php:38
 * @route '/dashboard/section/quiz/{quiz}'
 */
destroy.delete = (args: { quiz: string | number } | [quiz: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Course\Http\Controllers\QuizController::destroy
 * @see Modules/Course/app/Http/Controllers/QuizController.php:38
 * @route '/dashboard/section/quiz/{quiz}'
 */
    const destroyForm = (args: { quiz: string | number } | [quiz: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\QuizController::destroy
 * @see Modules/Course/app/Http/Controllers/QuizController.php:38
 * @route '/dashboard/section/quiz/{quiz}'
 */
        destroyForm.delete = (args: { quiz: string | number } | [quiz: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const quiz = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default quiz