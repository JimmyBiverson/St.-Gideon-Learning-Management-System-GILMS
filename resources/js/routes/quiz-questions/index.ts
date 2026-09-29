import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\QuestionController::store
 * @see Modules/Course/app/Http/Controllers/QuestionController.php:17
 * @route '/dashboard/quiz-questions'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/quiz-questions',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\QuestionController::store
 * @see Modules/Course/app/Http/Controllers/QuestionController.php:17
 * @route '/dashboard/quiz-questions'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\QuestionController::store
 * @see Modules/Course/app/Http/Controllers/QuestionController.php:17
 * @route '/dashboard/quiz-questions'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\QuestionController::store
 * @see Modules/Course/app/Http/Controllers/QuestionController.php:17
 * @route '/dashboard/quiz-questions'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\QuestionController::store
 * @see Modules/Course/app/Http/Controllers/QuestionController.php:17
 * @route '/dashboard/quiz-questions'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Course\Http\Controllers\QuestionController::update
 * @see Modules/Course/app/Http/Controllers/QuestionController.php:24
 * @route '/dashboard/quiz-questions/{quiz_question}'
 */
export const update = (args: { quiz_question: string | number } | [quiz_question: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/quiz-questions/{quiz_question}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Course\Http\Controllers\QuestionController::update
 * @see Modules/Course/app/Http/Controllers/QuestionController.php:24
 * @route '/dashboard/quiz-questions/{quiz_question}'
 */
update.url = (args: { quiz_question: string | number } | [quiz_question: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { quiz_question: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    quiz_question: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        quiz_question: args.quiz_question,
                }

    return update.definition.url
            .replace('{quiz_question}', parsedArgs.quiz_question.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\QuestionController::update
 * @see Modules/Course/app/Http/Controllers/QuestionController.php:24
 * @route '/dashboard/quiz-questions/{quiz_question}'
 */
update.put = (args: { quiz_question: string | number } | [quiz_question: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Course\Http\Controllers\QuestionController::update
 * @see Modules/Course/app/Http/Controllers/QuestionController.php:24
 * @route '/dashboard/quiz-questions/{quiz_question}'
 */
update.patch = (args: { quiz_question: string | number } | [quiz_question: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Course\Http\Controllers\QuestionController::update
 * @see Modules/Course/app/Http/Controllers/QuestionController.php:24
 * @route '/dashboard/quiz-questions/{quiz_question}'
 */
    const updateForm = (args: { quiz_question: string | number } | [quiz_question: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\QuestionController::update
 * @see Modules/Course/app/Http/Controllers/QuestionController.php:24
 * @route '/dashboard/quiz-questions/{quiz_question}'
 */
        updateForm.put = (args: { quiz_question: string | number } | [quiz_question: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Course\Http\Controllers\QuestionController::update
 * @see Modules/Course/app/Http/Controllers/QuestionController.php:24
 * @route '/dashboard/quiz-questions/{quiz_question}'
 */
        updateForm.patch = (args: { quiz_question: string | number } | [quiz_question: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Course\Http\Controllers\QuestionController::destroy
 * @see Modules/Course/app/Http/Controllers/QuestionController.php:31
 * @route '/dashboard/quiz-questions/{quiz_question}'
 */
export const destroy = (args: { quiz_question: string | number } | [quiz_question: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/quiz-questions/{quiz_question}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Course\Http\Controllers\QuestionController::destroy
 * @see Modules/Course/app/Http/Controllers/QuestionController.php:31
 * @route '/dashboard/quiz-questions/{quiz_question}'
 */
destroy.url = (args: { quiz_question: string | number } | [quiz_question: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { quiz_question: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    quiz_question: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        quiz_question: args.quiz_question,
                }

    return destroy.definition.url
            .replace('{quiz_question}', parsedArgs.quiz_question.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\QuestionController::destroy
 * @see Modules/Course/app/Http/Controllers/QuestionController.php:31
 * @route '/dashboard/quiz-questions/{quiz_question}'
 */
destroy.delete = (args: { quiz_question: string | number } | [quiz_question: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Course\Http\Controllers\QuestionController::destroy
 * @see Modules/Course/app/Http/Controllers/QuestionController.php:31
 * @route '/dashboard/quiz-questions/{quiz_question}'
 */
    const destroyForm = (args: { quiz_question: string | number } | [quiz_question: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\QuestionController::destroy
 * @see Modules/Course/app/Http/Controllers/QuestionController.php:31
 * @route '/dashboard/quiz-questions/{quiz_question}'
 */
        destroyForm.delete = (args: { quiz_question: string | number } | [quiz_question: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Course\Http\Controllers\QuestionController::sort
 * @see Modules/Course/app/Http/Controllers/QuestionController.php:38
 * @route '/dashboard/quiz-questions/sort'
 */
export const sort = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sort.url(options),
    method: 'post',
})

sort.definition = {
    methods: ["post"],
    url: '/dashboard/quiz-questions/sort',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\QuestionController::sort
 * @see Modules/Course/app/Http/Controllers/QuestionController.php:38
 * @route '/dashboard/quiz-questions/sort'
 */
sort.url = (options?: RouteQueryOptions) => {
    return sort.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\QuestionController::sort
 * @see Modules/Course/app/Http/Controllers/QuestionController.php:38
 * @route '/dashboard/quiz-questions/sort'
 */
sort.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sort.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\QuestionController::sort
 * @see Modules/Course/app/Http/Controllers/QuestionController.php:38
 * @route '/dashboard/quiz-questions/sort'
 */
    const sortForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sort.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\QuestionController::sort
 * @see Modules/Course/app/Http/Controllers/QuestionController.php:38
 * @route '/dashboard/quiz-questions/sort'
 */
        sortForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sort.url(options),
            method: 'post',
        })
    
    sort.form = sortForm
const quizQuestions = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
sort: Object.assign(sort, sort),
}

export default quizQuestions