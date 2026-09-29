import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\CourseForumController::store
 * @see Modules/Course/app/Http/Controllers/CourseForumController.php:19
 * @route '/course-forums'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/course-forums',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\CourseForumController::store
 * @see Modules/Course/app/Http/Controllers/CourseForumController.php:19
 * @route '/course-forums'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseForumController::store
 * @see Modules/Course/app/Http/Controllers/CourseForumController.php:19
 * @route '/course-forums'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseForumController::store
 * @see Modules/Course/app/Http/Controllers/CourseForumController.php:19
 * @route '/course-forums'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseForumController::store
 * @see Modules/Course/app/Http/Controllers/CourseForumController.php:19
 * @route '/course-forums'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Course\Http\Controllers\CourseForumController::update
 * @see Modules/Course/app/Http/Controllers/CourseForumController.php:29
 * @route '/course-forums/{course_forum}'
 */
export const update = (args: { course_forum: string | number } | [course_forum: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/course-forums/{course_forum}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Course\Http\Controllers\CourseForumController::update
 * @see Modules/Course/app/Http/Controllers/CourseForumController.php:29
 * @route '/course-forums/{course_forum}'
 */
update.url = (args: { course_forum: string | number } | [course_forum: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course_forum: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    course_forum: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course_forum: args.course_forum,
                }

    return update.definition.url
            .replace('{course_forum}', parsedArgs.course_forum.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseForumController::update
 * @see Modules/Course/app/Http/Controllers/CourseForumController.php:29
 * @route '/course-forums/{course_forum}'
 */
update.put = (args: { course_forum: string | number } | [course_forum: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Course\Http\Controllers\CourseForumController::update
 * @see Modules/Course/app/Http/Controllers/CourseForumController.php:29
 * @route '/course-forums/{course_forum}'
 */
update.patch = (args: { course_forum: string | number } | [course_forum: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseForumController::update
 * @see Modules/Course/app/Http/Controllers/CourseForumController.php:29
 * @route '/course-forums/{course_forum}'
 */
    const updateForm = (args: { course_forum: string | number } | [course_forum: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseForumController::update
 * @see Modules/Course/app/Http/Controllers/CourseForumController.php:29
 * @route '/course-forums/{course_forum}'
 */
        updateForm.put = (args: { course_forum: string | number } | [course_forum: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Course\Http\Controllers\CourseForumController::update
 * @see Modules/Course/app/Http/Controllers/CourseForumController.php:29
 * @route '/course-forums/{course_forum}'
 */
        updateForm.patch = (args: { course_forum: string | number } | [course_forum: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Course\Http\Controllers\CourseForumController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseForumController.php:39
 * @route '/course-forums/{course_forum}'
 */
export const destroy = (args: { course_forum: string | number } | [course_forum: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/course-forums/{course_forum}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Course\Http\Controllers\CourseForumController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseForumController.php:39
 * @route '/course-forums/{course_forum}'
 */
destroy.url = (args: { course_forum: string | number } | [course_forum: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course_forum: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    course_forum: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course_forum: args.course_forum,
                }

    return destroy.definition.url
            .replace('{course_forum}', parsedArgs.course_forum.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseForumController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseForumController.php:39
 * @route '/course-forums/{course_forum}'
 */
destroy.delete = (args: { course_forum: string | number } | [course_forum: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseForumController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseForumController.php:39
 * @route '/course-forums/{course_forum}'
 */
    const destroyForm = (args: { course_forum: string | number } | [course_forum: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseForumController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseForumController.php:39
 * @route '/course-forums/{course_forum}'
 */
        destroyForm.delete = (args: { course_forum: string | number } | [course_forum: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const CourseForumController = { store, update, destroy }

export default CourseForumController