import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Exam\Http\Controllers\ExamResourceController::store
 * @see Modules/Exam/app/Http/Controllers/ExamResourceController.php:18
 * @route '/dashboard/exam-resources'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/exam-resources',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamResourceController::store
 * @see Modules/Exam/app/Http/Controllers/ExamResourceController.php:18
 * @route '/dashboard/exam-resources'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamResourceController::store
 * @see Modules/Exam/app/Http/Controllers/ExamResourceController.php:18
 * @route '/dashboard/exam-resources'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamResourceController::store
 * @see Modules/Exam/app/Http/Controllers/ExamResourceController.php:18
 * @route '/dashboard/exam-resources'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamResourceController::store
 * @see Modules/Exam/app/Http/Controllers/ExamResourceController.php:18
 * @route '/dashboard/exam-resources'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Exam\Http\Controllers\ExamResourceController::update
 * @see Modules/Exam/app/Http/Controllers/ExamResourceController.php:28
 * @route '/dashboard/exam-resources/{exam_resource}'
 */
export const update = (args: { exam_resource: string | number } | [exam_resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/exam-resources/{exam_resource}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamResourceController::update
 * @see Modules/Exam/app/Http/Controllers/ExamResourceController.php:28
 * @route '/dashboard/exam-resources/{exam_resource}'
 */
update.url = (args: { exam_resource: string | number } | [exam_resource: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { exam_resource: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    exam_resource: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        exam_resource: args.exam_resource,
                }

    return update.definition.url
            .replace('{exam_resource}', parsedArgs.exam_resource.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamResourceController::update
 * @see Modules/Exam/app/Http/Controllers/ExamResourceController.php:28
 * @route '/dashboard/exam-resources/{exam_resource}'
 */
update.put = (args: { exam_resource: string | number } | [exam_resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Exam\Http\Controllers\ExamResourceController::update
 * @see Modules/Exam/app/Http/Controllers/ExamResourceController.php:28
 * @route '/dashboard/exam-resources/{exam_resource}'
 */
update.patch = (args: { exam_resource: string | number } | [exam_resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamResourceController::update
 * @see Modules/Exam/app/Http/Controllers/ExamResourceController.php:28
 * @route '/dashboard/exam-resources/{exam_resource}'
 */
    const updateForm = (args: { exam_resource: string | number } | [exam_resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamResourceController::update
 * @see Modules/Exam/app/Http/Controllers/ExamResourceController.php:28
 * @route '/dashboard/exam-resources/{exam_resource}'
 */
        updateForm.put = (args: { exam_resource: string | number } | [exam_resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Exam\Http\Controllers\ExamResourceController::update
 * @see Modules/Exam/app/Http/Controllers/ExamResourceController.php:28
 * @route '/dashboard/exam-resources/{exam_resource}'
 */
        updateForm.patch = (args: { exam_resource: string | number } | [exam_resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Exam\Http\Controllers\ExamResourceController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamResourceController.php:40
 * @route '/dashboard/exam-resources/{exam_resource}'
 */
export const destroy = (args: { exam_resource: string | number } | [exam_resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/exam-resources/{exam_resource}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamResourceController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamResourceController.php:40
 * @route '/dashboard/exam-resources/{exam_resource}'
 */
destroy.url = (args: { exam_resource: string | number } | [exam_resource: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { exam_resource: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    exam_resource: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        exam_resource: args.exam_resource,
                }

    return destroy.definition.url
            .replace('{exam_resource}', parsedArgs.exam_resource.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamResourceController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamResourceController.php:40
 * @route '/dashboard/exam-resources/{exam_resource}'
 */
destroy.delete = (args: { exam_resource: string | number } | [exam_resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamResourceController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamResourceController.php:40
 * @route '/dashboard/exam-resources/{exam_resource}'
 */
    const destroyForm = (args: { exam_resource: string | number } | [exam_resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamResourceController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamResourceController.php:40
 * @route '/dashboard/exam-resources/{exam_resource}'
 */
        destroyForm.delete = (args: { exam_resource: string | number } | [exam_resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const examResources = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default examResources