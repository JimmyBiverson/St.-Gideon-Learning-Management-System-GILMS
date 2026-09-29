import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Exam\Http\Controllers\ExamQuestionController::store
 * @see Modules/Exam/app/Http/Controllers/ExamQuestionController.php:20
 * @route '/dashboard/exam-questions'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/exam-questions',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamQuestionController::store
 * @see Modules/Exam/app/Http/Controllers/ExamQuestionController.php:20
 * @route '/dashboard/exam-questions'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamQuestionController::store
 * @see Modules/Exam/app/Http/Controllers/ExamQuestionController.php:20
 * @route '/dashboard/exam-questions'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamQuestionController::store
 * @see Modules/Exam/app/Http/Controllers/ExamQuestionController.php:20
 * @route '/dashboard/exam-questions'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamQuestionController::store
 * @see Modules/Exam/app/Http/Controllers/ExamQuestionController.php:20
 * @route '/dashboard/exam-questions'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Exam\Http\Controllers\ExamQuestionController::update
 * @see Modules/Exam/app/Http/Controllers/ExamQuestionController.php:30
 * @route '/dashboard/exam-questions/{exam_question}'
 */
export const update = (args: { exam_question: string | number } | [exam_question: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/exam-questions/{exam_question}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamQuestionController::update
 * @see Modules/Exam/app/Http/Controllers/ExamQuestionController.php:30
 * @route '/dashboard/exam-questions/{exam_question}'
 */
update.url = (args: { exam_question: string | number } | [exam_question: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { exam_question: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    exam_question: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        exam_question: args.exam_question,
                }

    return update.definition.url
            .replace('{exam_question}', parsedArgs.exam_question.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamQuestionController::update
 * @see Modules/Exam/app/Http/Controllers/ExamQuestionController.php:30
 * @route '/dashboard/exam-questions/{exam_question}'
 */
update.put = (args: { exam_question: string | number } | [exam_question: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Exam\Http\Controllers\ExamQuestionController::update
 * @see Modules/Exam/app/Http/Controllers/ExamQuestionController.php:30
 * @route '/dashboard/exam-questions/{exam_question}'
 */
update.patch = (args: { exam_question: string | number } | [exam_question: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamQuestionController::update
 * @see Modules/Exam/app/Http/Controllers/ExamQuestionController.php:30
 * @route '/dashboard/exam-questions/{exam_question}'
 */
    const updateForm = (args: { exam_question: string | number } | [exam_question: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamQuestionController::update
 * @see Modules/Exam/app/Http/Controllers/ExamQuestionController.php:30
 * @route '/dashboard/exam-questions/{exam_question}'
 */
        updateForm.put = (args: { exam_question: string | number } | [exam_question: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Exam\Http\Controllers\ExamQuestionController::update
 * @see Modules/Exam/app/Http/Controllers/ExamQuestionController.php:30
 * @route '/dashboard/exam-questions/{exam_question}'
 */
        updateForm.patch = (args: { exam_question: string | number } | [exam_question: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Exam\Http\Controllers\ExamQuestionController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamQuestionController.php:40
 * @route '/dashboard/exam-questions/{exam_question}'
 */
export const destroy = (args: { exam_question: string | number } | [exam_question: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/exam-questions/{exam_question}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamQuestionController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamQuestionController.php:40
 * @route '/dashboard/exam-questions/{exam_question}'
 */
destroy.url = (args: { exam_question: string | number } | [exam_question: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { exam_question: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    exam_question: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        exam_question: args.exam_question,
                }

    return destroy.definition.url
            .replace('{exam_question}', parsedArgs.exam_question.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamQuestionController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamQuestionController.php:40
 * @route '/dashboard/exam-questions/{exam_question}'
 */
destroy.delete = (args: { exam_question: string | number } | [exam_question: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamQuestionController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamQuestionController.php:40
 * @route '/dashboard/exam-questions/{exam_question}'
 */
    const destroyForm = (args: { exam_question: string | number } | [exam_question: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamQuestionController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamQuestionController.php:40
 * @route '/dashboard/exam-questions/{exam_question}'
 */
        destroyForm.delete = (args: { exam_question: string | number } | [exam_question: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Exam\Http\Controllers\ExamQuestionController::reorder
 * @see Modules/Exam/app/Http/Controllers/ExamQuestionController.php:50
 * @route '/dashboard/exam-questions/reorder'
 */
export const reorder = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

reorder.definition = {
    methods: ["post"],
    url: '/dashboard/exam-questions/reorder',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamQuestionController::reorder
 * @see Modules/Exam/app/Http/Controllers/ExamQuestionController.php:50
 * @route '/dashboard/exam-questions/reorder'
 */
reorder.url = (options?: RouteQueryOptions) => {
    return reorder.definition.url + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamQuestionController::reorder
 * @see Modules/Exam/app/Http/Controllers/ExamQuestionController.php:50
 * @route '/dashboard/exam-questions/reorder'
 */
reorder.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamQuestionController::reorder
 * @see Modules/Exam/app/Http/Controllers/ExamQuestionController.php:50
 * @route '/dashboard/exam-questions/reorder'
 */
    const reorderForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reorder.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamQuestionController::reorder
 * @see Modules/Exam/app/Http/Controllers/ExamQuestionController.php:50
 * @route '/dashboard/exam-questions/reorder'
 */
        reorderForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reorder.url(options),
            method: 'post',
        })
    
    reorder.form = reorderForm
/**
* @see \Modules\Exam\Http\Controllers\ExamQuestionController::duplicate
 * @see Modules/Exam/app/Http/Controllers/ExamQuestionController.php:60
 * @route '/dashboard/exam-questions/{question}/duplicate'
 */
export const duplicate = (args: { question: number | { id: number } } | [question: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: duplicate.url(args, options),
    method: 'post',
})

duplicate.definition = {
    methods: ["post"],
    url: '/dashboard/exam-questions/{question}/duplicate',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamQuestionController::duplicate
 * @see Modules/Exam/app/Http/Controllers/ExamQuestionController.php:60
 * @route '/dashboard/exam-questions/{question}/duplicate'
 */
duplicate.url = (args: { question: number | { id: number } } | [question: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { question: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { question: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    question: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        question: typeof args.question === 'object'
                ? args.question.id
                : args.question,
                }

    return duplicate.definition.url
            .replace('{question}', parsedArgs.question.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamQuestionController::duplicate
 * @see Modules/Exam/app/Http/Controllers/ExamQuestionController.php:60
 * @route '/dashboard/exam-questions/{question}/duplicate'
 */
duplicate.post = (args: { question: number | { id: number } } | [question: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: duplicate.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamQuestionController::duplicate
 * @see Modules/Exam/app/Http/Controllers/ExamQuestionController.php:60
 * @route '/dashboard/exam-questions/{question}/duplicate'
 */
    const duplicateForm = (args: { question: number | { id: number } } | [question: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: duplicate.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamQuestionController::duplicate
 * @see Modules/Exam/app/Http/Controllers/ExamQuestionController.php:60
 * @route '/dashboard/exam-questions/{question}/duplicate'
 */
        duplicateForm.post = (args: { question: number | { id: number } } | [question: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: duplicate.url(args, options),
            method: 'post',
        })
    
    duplicate.form = duplicateForm
const ExamQuestionController = { store, update, destroy, reorder, duplicate }

export default ExamQuestionController