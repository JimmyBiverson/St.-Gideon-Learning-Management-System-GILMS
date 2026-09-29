import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Exam\Http\Controllers\ExamRequirementController::store
 * @see Modules/Exam/app/Http/Controllers/ExamRequirementController.php:19
 * @route '/dashboard/exam-requirements'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/exam-requirements',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamRequirementController::store
 * @see Modules/Exam/app/Http/Controllers/ExamRequirementController.php:19
 * @route '/dashboard/exam-requirements'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamRequirementController::store
 * @see Modules/Exam/app/Http/Controllers/ExamRequirementController.php:19
 * @route '/dashboard/exam-requirements'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamRequirementController::store
 * @see Modules/Exam/app/Http/Controllers/ExamRequirementController.php:19
 * @route '/dashboard/exam-requirements'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamRequirementController::store
 * @see Modules/Exam/app/Http/Controllers/ExamRequirementController.php:19
 * @route '/dashboard/exam-requirements'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Exam\Http\Controllers\ExamRequirementController::update
 * @see Modules/Exam/app/Http/Controllers/ExamRequirementController.php:29
 * @route '/dashboard/exam-requirements/{exam_requirement}'
 */
export const update = (args: { exam_requirement: string | number } | [exam_requirement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/exam-requirements/{exam_requirement}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamRequirementController::update
 * @see Modules/Exam/app/Http/Controllers/ExamRequirementController.php:29
 * @route '/dashboard/exam-requirements/{exam_requirement}'
 */
update.url = (args: { exam_requirement: string | number } | [exam_requirement: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { exam_requirement: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    exam_requirement: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        exam_requirement: args.exam_requirement,
                }

    return update.definition.url
            .replace('{exam_requirement}', parsedArgs.exam_requirement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamRequirementController::update
 * @see Modules/Exam/app/Http/Controllers/ExamRequirementController.php:29
 * @route '/dashboard/exam-requirements/{exam_requirement}'
 */
update.put = (args: { exam_requirement: string | number } | [exam_requirement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Exam\Http\Controllers\ExamRequirementController::update
 * @see Modules/Exam/app/Http/Controllers/ExamRequirementController.php:29
 * @route '/dashboard/exam-requirements/{exam_requirement}'
 */
update.patch = (args: { exam_requirement: string | number } | [exam_requirement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamRequirementController::update
 * @see Modules/Exam/app/Http/Controllers/ExamRequirementController.php:29
 * @route '/dashboard/exam-requirements/{exam_requirement}'
 */
    const updateForm = (args: { exam_requirement: string | number } | [exam_requirement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamRequirementController::update
 * @see Modules/Exam/app/Http/Controllers/ExamRequirementController.php:29
 * @route '/dashboard/exam-requirements/{exam_requirement}'
 */
        updateForm.put = (args: { exam_requirement: string | number } | [exam_requirement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Exam\Http\Controllers\ExamRequirementController::update
 * @see Modules/Exam/app/Http/Controllers/ExamRequirementController.php:29
 * @route '/dashboard/exam-requirements/{exam_requirement}'
 */
        updateForm.patch = (args: { exam_requirement: string | number } | [exam_requirement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Exam\Http\Controllers\ExamRequirementController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamRequirementController.php:39
 * @route '/dashboard/exam-requirements/{exam_requirement}'
 */
export const destroy = (args: { exam_requirement: string | number } | [exam_requirement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/exam-requirements/{exam_requirement}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamRequirementController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamRequirementController.php:39
 * @route '/dashboard/exam-requirements/{exam_requirement}'
 */
destroy.url = (args: { exam_requirement: string | number } | [exam_requirement: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { exam_requirement: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    exam_requirement: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        exam_requirement: args.exam_requirement,
                }

    return destroy.definition.url
            .replace('{exam_requirement}', parsedArgs.exam_requirement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamRequirementController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamRequirementController.php:39
 * @route '/dashboard/exam-requirements/{exam_requirement}'
 */
destroy.delete = (args: { exam_requirement: string | number } | [exam_requirement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamRequirementController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamRequirementController.php:39
 * @route '/dashboard/exam-requirements/{exam_requirement}'
 */
    const destroyForm = (args: { exam_requirement: string | number } | [exam_requirement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamRequirementController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamRequirementController.php:39
 * @route '/dashboard/exam-requirements/{exam_requirement}'
 */
        destroyForm.delete = (args: { exam_requirement: string | number } | [exam_requirement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ExamRequirementController = { store, update, destroy }

export default ExamRequirementController