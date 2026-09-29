import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\CourseReviewController::store
 * @see Modules/Course/app/Http/Controllers/CourseReviewController.php:19
 * @route '/course-reviews'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/course-reviews',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\CourseReviewController::store
 * @see Modules/Course/app/Http/Controllers/CourseReviewController.php:19
 * @route '/course-reviews'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseReviewController::store
 * @see Modules/Course/app/Http/Controllers/CourseReviewController.php:19
 * @route '/course-reviews'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseReviewController::store
 * @see Modules/Course/app/Http/Controllers/CourseReviewController.php:19
 * @route '/course-reviews'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseReviewController::store
 * @see Modules/Course/app/Http/Controllers/CourseReviewController.php:19
 * @route '/course-reviews'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Course\Http\Controllers\CourseReviewController::update
 * @see Modules/Course/app/Http/Controllers/CourseReviewController.php:29
 * @route '/course-reviews/{course_review}'
 */
export const update = (args: { course_review: string | number } | [course_review: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/course-reviews/{course_review}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Course\Http\Controllers\CourseReviewController::update
 * @see Modules/Course/app/Http/Controllers/CourseReviewController.php:29
 * @route '/course-reviews/{course_review}'
 */
update.url = (args: { course_review: string | number } | [course_review: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course_review: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    course_review: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course_review: args.course_review,
                }

    return update.definition.url
            .replace('{course_review}', parsedArgs.course_review.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseReviewController::update
 * @see Modules/Course/app/Http/Controllers/CourseReviewController.php:29
 * @route '/course-reviews/{course_review}'
 */
update.put = (args: { course_review: string | number } | [course_review: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Course\Http\Controllers\CourseReviewController::update
 * @see Modules/Course/app/Http/Controllers/CourseReviewController.php:29
 * @route '/course-reviews/{course_review}'
 */
update.patch = (args: { course_review: string | number } | [course_review: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseReviewController::update
 * @see Modules/Course/app/Http/Controllers/CourseReviewController.php:29
 * @route '/course-reviews/{course_review}'
 */
    const updateForm = (args: { course_review: string | number } | [course_review: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseReviewController::update
 * @see Modules/Course/app/Http/Controllers/CourseReviewController.php:29
 * @route '/course-reviews/{course_review}'
 */
        updateForm.put = (args: { course_review: string | number } | [course_review: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Course\Http\Controllers\CourseReviewController::update
 * @see Modules/Course/app/Http/Controllers/CourseReviewController.php:29
 * @route '/course-reviews/{course_review}'
 */
        updateForm.patch = (args: { course_review: string | number } | [course_review: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Course\Http\Controllers\CourseReviewController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseReviewController.php:39
 * @route '/course-reviews/{course_review}'
 */
export const destroy = (args: { course_review: string | number } | [course_review: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/course-reviews/{course_review}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Course\Http\Controllers\CourseReviewController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseReviewController.php:39
 * @route '/course-reviews/{course_review}'
 */
destroy.url = (args: { course_review: string | number } | [course_review: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course_review: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    course_review: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course_review: args.course_review,
                }

    return destroy.definition.url
            .replace('{course_review}', parsedArgs.course_review.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseReviewController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseReviewController.php:39
 * @route '/course-reviews/{course_review}'
 */
destroy.delete = (args: { course_review: string | number } | [course_review: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseReviewController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseReviewController.php:39
 * @route '/course-reviews/{course_review}'
 */
    const destroyForm = (args: { course_review: string | number } | [course_review: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseReviewController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseReviewController.php:39
 * @route '/course-reviews/{course_review}'
 */
        destroyForm.delete = (args: { course_review: string | number } | [course_review: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const CourseReviewController = { store, update, destroy }

export default CourseReviewController