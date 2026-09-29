import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::store
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:58
 * @route '/dashboard/section/assignments'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/section/assignments',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::store
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:58
 * @route '/dashboard/section/assignments'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::store
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:58
 * @route '/dashboard/section/assignments'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::store
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:58
 * @route '/dashboard/section/assignments'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::store
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:58
 * @route '/dashboard/section/assignments'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::update
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:68
 * @route '/dashboard/section/assignments/{assignment}'
 */
export const update = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/section/assignments/{assignment}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::update
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:68
 * @route '/dashboard/section/assignments/{assignment}'
 */
update.url = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    assignment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assignment: args.assignment,
                }

    return update.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::update
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:68
 * @route '/dashboard/section/assignments/{assignment}'
 */
update.put = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::update
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:68
 * @route '/dashboard/section/assignments/{assignment}'
 */
update.patch = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::update
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:68
 * @route '/dashboard/section/assignments/{assignment}'
 */
    const updateForm = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::update
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:68
 * @route '/dashboard/section/assignments/{assignment}'
 */
        updateForm.put = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::update
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:68
 * @route '/dashboard/section/assignments/{assignment}'
 */
        updateForm.patch = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:78
 * @route '/dashboard/section/assignments/{assignment}'
 */
export const destroy = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/section/assignments/{assignment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:78
 * @route '/dashboard/section/assignments/{assignment}'
 */
destroy.url = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignment: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    assignment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assignment: args.assignment,
                }

    return destroy.definition.url
            .replace('{assignment}', parsedArgs.assignment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:78
 * @route '/dashboard/section/assignments/{assignment}'
 */
destroy.delete = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:78
 * @route '/dashboard/section/assignments/{assignment}'
 */
    const destroyForm = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:78
 * @route '/dashboard/section/assignments/{assignment}'
 */
        destroyForm.delete = (args: { assignment: string | number } | [assignment: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const assignments = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default assignments