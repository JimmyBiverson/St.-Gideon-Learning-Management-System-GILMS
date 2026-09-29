import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
/**
* @see \Modules\Course\Http\Controllers\QuizController::result
 * @see Modules/Course/app/Http/Controllers/QuizController.php:0
 * @route '/dashboard/section/quiz/participant/result'
 */
export const result = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: result.url(options),
    method: 'get',
})

result.definition = {
    methods: ["get","head"],
    url: '/dashboard/section/quiz/participant/result',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\QuizController::result
 * @see Modules/Course/app/Http/Controllers/QuizController.php:0
 * @route '/dashboard/section/quiz/participant/result'
 */
result.url = (options?: RouteQueryOptions) => {
    return result.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\QuizController::result
 * @see Modules/Course/app/Http/Controllers/QuizController.php:0
 * @route '/dashboard/section/quiz/participant/result'
 */
result.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: result.url(options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\QuizController::result
 * @see Modules/Course/app/Http/Controllers/QuizController.php:0
 * @route '/dashboard/section/quiz/participant/result'
 */
result.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: result.url(options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\QuizController::result
 * @see Modules/Course/app/Http/Controllers/QuizController.php:0
 * @route '/dashboard/section/quiz/participant/result'
 */
    const resultForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: result.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\QuizController::result
 * @see Modules/Course/app/Http/Controllers/QuizController.php:0
 * @route '/dashboard/section/quiz/participant/result'
 */
        resultForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: result.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\QuizController::result
 * @see Modules/Course/app/Http/Controllers/QuizController.php:0
 * @route '/dashboard/section/quiz/participant/result'
 */
        resultForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: result.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    result.form = resultForm
/**
* @see \Modules\Course\Http\Controllers\QuizController::result_preview
 * @see Modules/Course/app/Http/Controllers/QuizController.php:0
 * @route '/dashboard/section/quiz/result/preview'
 */
export const result_preview = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: result_preview.url(options),
    method: 'get',
})

result_preview.definition = {
    methods: ["get","head"],
    url: '/dashboard/section/quiz/result/preview',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\QuizController::result_preview
 * @see Modules/Course/app/Http/Controllers/QuizController.php:0
 * @route '/dashboard/section/quiz/result/preview'
 */
result_preview.url = (options?: RouteQueryOptions) => {
    return result_preview.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\QuizController::result_preview
 * @see Modules/Course/app/Http/Controllers/QuizController.php:0
 * @route '/dashboard/section/quiz/result/preview'
 */
result_preview.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: result_preview.url(options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\QuizController::result_preview
 * @see Modules/Course/app/Http/Controllers/QuizController.php:0
 * @route '/dashboard/section/quiz/result/preview'
 */
result_preview.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: result_preview.url(options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\QuizController::result_preview
 * @see Modules/Course/app/Http/Controllers/QuizController.php:0
 * @route '/dashboard/section/quiz/result/preview'
 */
    const result_previewForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: result_preview.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\QuizController::result_preview
 * @see Modules/Course/app/Http/Controllers/QuizController.php:0
 * @route '/dashboard/section/quiz/result/preview'
 */
        result_previewForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: result_preview.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\QuizController::result_preview
 * @see Modules/Course/app/Http/Controllers/QuizController.php:0
 * @route '/dashboard/section/quiz/result/preview'
 */
        result_previewForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: result_preview.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    result_preview.form = result_previewForm
const QuizController = { store, update, destroy, result, result_preview }

export default QuizController