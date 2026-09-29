import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\CourseOutcomeController::store
 * @see Modules/Course/app/Http/Controllers/CourseOutcomeController.php:19
 * @route '/dashboard/course-outcomes'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/course-outcomes',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\CourseOutcomeController::store
 * @see Modules/Course/app/Http/Controllers/CourseOutcomeController.php:19
 * @route '/dashboard/course-outcomes'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseOutcomeController::store
 * @see Modules/Course/app/Http/Controllers/CourseOutcomeController.php:19
 * @route '/dashboard/course-outcomes'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseOutcomeController::store
 * @see Modules/Course/app/Http/Controllers/CourseOutcomeController.php:19
 * @route '/dashboard/course-outcomes'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseOutcomeController::store
 * @see Modules/Course/app/Http/Controllers/CourseOutcomeController.php:19
 * @route '/dashboard/course-outcomes'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Course\Http\Controllers\CourseOutcomeController::update
 * @see Modules/Course/app/Http/Controllers/CourseOutcomeController.php:29
 * @route '/dashboard/course-outcomes/{course_outcome}'
 */
export const update = (args: { course_outcome: string | number } | [course_outcome: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/course-outcomes/{course_outcome}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Course\Http\Controllers\CourseOutcomeController::update
 * @see Modules/Course/app/Http/Controllers/CourseOutcomeController.php:29
 * @route '/dashboard/course-outcomes/{course_outcome}'
 */
update.url = (args: { course_outcome: string | number } | [course_outcome: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course_outcome: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    course_outcome: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course_outcome: args.course_outcome,
                }

    return update.definition.url
            .replace('{course_outcome}', parsedArgs.course_outcome.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseOutcomeController::update
 * @see Modules/Course/app/Http/Controllers/CourseOutcomeController.php:29
 * @route '/dashboard/course-outcomes/{course_outcome}'
 */
update.put = (args: { course_outcome: string | number } | [course_outcome: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Course\Http\Controllers\CourseOutcomeController::update
 * @see Modules/Course/app/Http/Controllers/CourseOutcomeController.php:29
 * @route '/dashboard/course-outcomes/{course_outcome}'
 */
update.patch = (args: { course_outcome: string | number } | [course_outcome: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseOutcomeController::update
 * @see Modules/Course/app/Http/Controllers/CourseOutcomeController.php:29
 * @route '/dashboard/course-outcomes/{course_outcome}'
 */
    const updateForm = (args: { course_outcome: string | number } | [course_outcome: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseOutcomeController::update
 * @see Modules/Course/app/Http/Controllers/CourseOutcomeController.php:29
 * @route '/dashboard/course-outcomes/{course_outcome}'
 */
        updateForm.put = (args: { course_outcome: string | number } | [course_outcome: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Course\Http\Controllers\CourseOutcomeController::update
 * @see Modules/Course/app/Http/Controllers/CourseOutcomeController.php:29
 * @route '/dashboard/course-outcomes/{course_outcome}'
 */
        updateForm.patch = (args: { course_outcome: string | number } | [course_outcome: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Course\Http\Controllers\CourseOutcomeController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseOutcomeController.php:39
 * @route '/dashboard/course-outcomes/{course_outcome}'
 */
export const destroy = (args: { course_outcome: string | number } | [course_outcome: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/course-outcomes/{course_outcome}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Course\Http\Controllers\CourseOutcomeController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseOutcomeController.php:39
 * @route '/dashboard/course-outcomes/{course_outcome}'
 */
destroy.url = (args: { course_outcome: string | number } | [course_outcome: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course_outcome: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    course_outcome: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course_outcome: args.course_outcome,
                }

    return destroy.definition.url
            .replace('{course_outcome}', parsedArgs.course_outcome.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseOutcomeController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseOutcomeController.php:39
 * @route '/dashboard/course-outcomes/{course_outcome}'
 */
destroy.delete = (args: { course_outcome: string | number } | [course_outcome: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseOutcomeController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseOutcomeController.php:39
 * @route '/dashboard/course-outcomes/{course_outcome}'
 */
    const destroyForm = (args: { course_outcome: string | number } | [course_outcome: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseOutcomeController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseOutcomeController.php:39
 * @route '/dashboard/course-outcomes/{course_outcome}'
 */
        destroyForm.delete = (args: { course_outcome: string | number } | [course_outcome: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const courseOutcomes = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default courseOutcomes