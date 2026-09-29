import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\CourseRequirementController::store
 * @see Modules/Course/app/Http/Controllers/CourseRequirementController.php:19
 * @route '/dashboard/course-requirements'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/course-requirements',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\CourseRequirementController::store
 * @see Modules/Course/app/Http/Controllers/CourseRequirementController.php:19
 * @route '/dashboard/course-requirements'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseRequirementController::store
 * @see Modules/Course/app/Http/Controllers/CourseRequirementController.php:19
 * @route '/dashboard/course-requirements'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseRequirementController::store
 * @see Modules/Course/app/Http/Controllers/CourseRequirementController.php:19
 * @route '/dashboard/course-requirements'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseRequirementController::store
 * @see Modules/Course/app/Http/Controllers/CourseRequirementController.php:19
 * @route '/dashboard/course-requirements'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Course\Http\Controllers\CourseRequirementController::update
 * @see Modules/Course/app/Http/Controllers/CourseRequirementController.php:29
 * @route '/dashboard/course-requirements/{course_requirement}'
 */
export const update = (args: { course_requirement: string | number } | [course_requirement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/course-requirements/{course_requirement}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Course\Http\Controllers\CourseRequirementController::update
 * @see Modules/Course/app/Http/Controllers/CourseRequirementController.php:29
 * @route '/dashboard/course-requirements/{course_requirement}'
 */
update.url = (args: { course_requirement: string | number } | [course_requirement: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course_requirement: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    course_requirement: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course_requirement: args.course_requirement,
                }

    return update.definition.url
            .replace('{course_requirement}', parsedArgs.course_requirement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseRequirementController::update
 * @see Modules/Course/app/Http/Controllers/CourseRequirementController.php:29
 * @route '/dashboard/course-requirements/{course_requirement}'
 */
update.put = (args: { course_requirement: string | number } | [course_requirement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Course\Http\Controllers\CourseRequirementController::update
 * @see Modules/Course/app/Http/Controllers/CourseRequirementController.php:29
 * @route '/dashboard/course-requirements/{course_requirement}'
 */
update.patch = (args: { course_requirement: string | number } | [course_requirement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseRequirementController::update
 * @see Modules/Course/app/Http/Controllers/CourseRequirementController.php:29
 * @route '/dashboard/course-requirements/{course_requirement}'
 */
    const updateForm = (args: { course_requirement: string | number } | [course_requirement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseRequirementController::update
 * @see Modules/Course/app/Http/Controllers/CourseRequirementController.php:29
 * @route '/dashboard/course-requirements/{course_requirement}'
 */
        updateForm.put = (args: { course_requirement: string | number } | [course_requirement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Course\Http\Controllers\CourseRequirementController::update
 * @see Modules/Course/app/Http/Controllers/CourseRequirementController.php:29
 * @route '/dashboard/course-requirements/{course_requirement}'
 */
        updateForm.patch = (args: { course_requirement: string | number } | [course_requirement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Course\Http\Controllers\CourseRequirementController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseRequirementController.php:39
 * @route '/dashboard/course-requirements/{course_requirement}'
 */
export const destroy = (args: { course_requirement: string | number } | [course_requirement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/course-requirements/{course_requirement}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Course\Http\Controllers\CourseRequirementController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseRequirementController.php:39
 * @route '/dashboard/course-requirements/{course_requirement}'
 */
destroy.url = (args: { course_requirement: string | number } | [course_requirement: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course_requirement: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    course_requirement: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course_requirement: args.course_requirement,
                }

    return destroy.definition.url
            .replace('{course_requirement}', parsedArgs.course_requirement.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseRequirementController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseRequirementController.php:39
 * @route '/dashboard/course-requirements/{course_requirement}'
 */
destroy.delete = (args: { course_requirement: string | number } | [course_requirement: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseRequirementController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseRequirementController.php:39
 * @route '/dashboard/course-requirements/{course_requirement}'
 */
    const destroyForm = (args: { course_requirement: string | number } | [course_requirement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseRequirementController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseRequirementController.php:39
 * @route '/dashboard/course-requirements/{course_requirement}'
 */
        destroyForm.delete = (args: { course_requirement: string | number } | [course_requirement: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const CourseRequirementController = { store, update, destroy }

export default CourseRequirementController