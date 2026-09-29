import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Exam\Http\Controllers\ExamOutcomeController::store
 * @see Modules/Exam/app/Http/Controllers/ExamOutcomeController.php:19
 * @route '/dashboard/exam-outcomes'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/exam-outcomes',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamOutcomeController::store
 * @see Modules/Exam/app/Http/Controllers/ExamOutcomeController.php:19
 * @route '/dashboard/exam-outcomes'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamOutcomeController::store
 * @see Modules/Exam/app/Http/Controllers/ExamOutcomeController.php:19
 * @route '/dashboard/exam-outcomes'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamOutcomeController::store
 * @see Modules/Exam/app/Http/Controllers/ExamOutcomeController.php:19
 * @route '/dashboard/exam-outcomes'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamOutcomeController::store
 * @see Modules/Exam/app/Http/Controllers/ExamOutcomeController.php:19
 * @route '/dashboard/exam-outcomes'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Exam\Http\Controllers\ExamOutcomeController::update
 * @see Modules/Exam/app/Http/Controllers/ExamOutcomeController.php:29
 * @route '/dashboard/exam-outcomes/{exam_outcome}'
 */
export const update = (args: { exam_outcome: string | number } | [exam_outcome: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/exam-outcomes/{exam_outcome}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamOutcomeController::update
 * @see Modules/Exam/app/Http/Controllers/ExamOutcomeController.php:29
 * @route '/dashboard/exam-outcomes/{exam_outcome}'
 */
update.url = (args: { exam_outcome: string | number } | [exam_outcome: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { exam_outcome: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    exam_outcome: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        exam_outcome: args.exam_outcome,
                }

    return update.definition.url
            .replace('{exam_outcome}', parsedArgs.exam_outcome.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamOutcomeController::update
 * @see Modules/Exam/app/Http/Controllers/ExamOutcomeController.php:29
 * @route '/dashboard/exam-outcomes/{exam_outcome}'
 */
update.put = (args: { exam_outcome: string | number } | [exam_outcome: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Exam\Http\Controllers\ExamOutcomeController::update
 * @see Modules/Exam/app/Http/Controllers/ExamOutcomeController.php:29
 * @route '/dashboard/exam-outcomes/{exam_outcome}'
 */
update.patch = (args: { exam_outcome: string | number } | [exam_outcome: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamOutcomeController::update
 * @see Modules/Exam/app/Http/Controllers/ExamOutcomeController.php:29
 * @route '/dashboard/exam-outcomes/{exam_outcome}'
 */
    const updateForm = (args: { exam_outcome: string | number } | [exam_outcome: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamOutcomeController::update
 * @see Modules/Exam/app/Http/Controllers/ExamOutcomeController.php:29
 * @route '/dashboard/exam-outcomes/{exam_outcome}'
 */
        updateForm.put = (args: { exam_outcome: string | number } | [exam_outcome: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Exam\Http\Controllers\ExamOutcomeController::update
 * @see Modules/Exam/app/Http/Controllers/ExamOutcomeController.php:29
 * @route '/dashboard/exam-outcomes/{exam_outcome}'
 */
        updateForm.patch = (args: { exam_outcome: string | number } | [exam_outcome: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Exam\Http\Controllers\ExamOutcomeController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamOutcomeController.php:39
 * @route '/dashboard/exam-outcomes/{exam_outcome}'
 */
export const destroy = (args: { exam_outcome: string | number } | [exam_outcome: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/exam-outcomes/{exam_outcome}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamOutcomeController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamOutcomeController.php:39
 * @route '/dashboard/exam-outcomes/{exam_outcome}'
 */
destroy.url = (args: { exam_outcome: string | number } | [exam_outcome: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { exam_outcome: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    exam_outcome: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        exam_outcome: args.exam_outcome,
                }

    return destroy.definition.url
            .replace('{exam_outcome}', parsedArgs.exam_outcome.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamOutcomeController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamOutcomeController.php:39
 * @route '/dashboard/exam-outcomes/{exam_outcome}'
 */
destroy.delete = (args: { exam_outcome: string | number } | [exam_outcome: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamOutcomeController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamOutcomeController.php:39
 * @route '/dashboard/exam-outcomes/{exam_outcome}'
 */
    const destroyForm = (args: { exam_outcome: string | number } | [exam_outcome: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamOutcomeController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamOutcomeController.php:39
 * @route '/dashboard/exam-outcomes/{exam_outcome}'
 */
        destroyForm.delete = (args: { exam_outcome: string | number } | [exam_outcome: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const examOutcomes = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default examOutcomes