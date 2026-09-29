import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\CourseFaqController::store
 * @see Modules/Course/app/Http/Controllers/CourseFaqController.php:19
 * @route '/dashboard/course-faqs'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/course-faqs',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\CourseFaqController::store
 * @see Modules/Course/app/Http/Controllers/CourseFaqController.php:19
 * @route '/dashboard/course-faqs'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseFaqController::store
 * @see Modules/Course/app/Http/Controllers/CourseFaqController.php:19
 * @route '/dashboard/course-faqs'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseFaqController::store
 * @see Modules/Course/app/Http/Controllers/CourseFaqController.php:19
 * @route '/dashboard/course-faqs'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseFaqController::store
 * @see Modules/Course/app/Http/Controllers/CourseFaqController.php:19
 * @route '/dashboard/course-faqs'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Course\Http\Controllers\CourseFaqController::update
 * @see Modules/Course/app/Http/Controllers/CourseFaqController.php:29
 * @route '/dashboard/course-faqs/{course_faq}'
 */
export const update = (args: { course_faq: string | number } | [course_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/course-faqs/{course_faq}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Course\Http\Controllers\CourseFaqController::update
 * @see Modules/Course/app/Http/Controllers/CourseFaqController.php:29
 * @route '/dashboard/course-faqs/{course_faq}'
 */
update.url = (args: { course_faq: string | number } | [course_faq: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course_faq: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    course_faq: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course_faq: args.course_faq,
                }

    return update.definition.url
            .replace('{course_faq}', parsedArgs.course_faq.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseFaqController::update
 * @see Modules/Course/app/Http/Controllers/CourseFaqController.php:29
 * @route '/dashboard/course-faqs/{course_faq}'
 */
update.put = (args: { course_faq: string | number } | [course_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Course\Http\Controllers\CourseFaqController::update
 * @see Modules/Course/app/Http/Controllers/CourseFaqController.php:29
 * @route '/dashboard/course-faqs/{course_faq}'
 */
update.patch = (args: { course_faq: string | number } | [course_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseFaqController::update
 * @see Modules/Course/app/Http/Controllers/CourseFaqController.php:29
 * @route '/dashboard/course-faqs/{course_faq}'
 */
    const updateForm = (args: { course_faq: string | number } | [course_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseFaqController::update
 * @see Modules/Course/app/Http/Controllers/CourseFaqController.php:29
 * @route '/dashboard/course-faqs/{course_faq}'
 */
        updateForm.put = (args: { course_faq: string | number } | [course_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Course\Http\Controllers\CourseFaqController::update
 * @see Modules/Course/app/Http/Controllers/CourseFaqController.php:29
 * @route '/dashboard/course-faqs/{course_faq}'
 */
        updateForm.patch = (args: { course_faq: string | number } | [course_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Course\Http\Controllers\CourseFaqController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseFaqController.php:39
 * @route '/dashboard/course-faqs/{course_faq}'
 */
export const destroy = (args: { course_faq: string | number } | [course_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/course-faqs/{course_faq}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Course\Http\Controllers\CourseFaqController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseFaqController.php:39
 * @route '/dashboard/course-faqs/{course_faq}'
 */
destroy.url = (args: { course_faq: string | number } | [course_faq: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course_faq: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    course_faq: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course_faq: args.course_faq,
                }

    return destroy.definition.url
            .replace('{course_faq}', parsedArgs.course_faq.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseFaqController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseFaqController.php:39
 * @route '/dashboard/course-faqs/{course_faq}'
 */
destroy.delete = (args: { course_faq: string | number } | [course_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseFaqController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseFaqController.php:39
 * @route '/dashboard/course-faqs/{course_faq}'
 */
    const destroyForm = (args: { course_faq: string | number } | [course_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseFaqController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseFaqController.php:39
 * @route '/dashboard/course-faqs/{course_faq}'
 */
        destroyForm.delete = (args: { course_faq: string | number } | [course_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const CourseFaqController = { store, update, destroy }

export default CourseFaqController