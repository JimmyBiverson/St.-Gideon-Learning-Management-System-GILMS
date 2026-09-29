import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\CourseForumReplyController::store
 * @see Modules/Course/app/Http/Controllers/CourseForumReplyController.php:20
 * @route '/course-forum-replies'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/course-forum-replies',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\CourseForumReplyController::store
 * @see Modules/Course/app/Http/Controllers/CourseForumReplyController.php:20
 * @route '/course-forum-replies'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseForumReplyController::store
 * @see Modules/Course/app/Http/Controllers/CourseForumReplyController.php:20
 * @route '/course-forum-replies'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseForumReplyController::store
 * @see Modules/Course/app/Http/Controllers/CourseForumReplyController.php:20
 * @route '/course-forum-replies'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseForumReplyController::store
 * @see Modules/Course/app/Http/Controllers/CourseForumReplyController.php:20
 * @route '/course-forum-replies'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Course\Http\Controllers\CourseForumReplyController::update
 * @see Modules/Course/app/Http/Controllers/CourseForumReplyController.php:30
 * @route '/course-forum-replies/{course_forum_reply}'
 */
export const update = (args: { course_forum_reply: string | number } | [course_forum_reply: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/course-forum-replies/{course_forum_reply}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Course\Http\Controllers\CourseForumReplyController::update
 * @see Modules/Course/app/Http/Controllers/CourseForumReplyController.php:30
 * @route '/course-forum-replies/{course_forum_reply}'
 */
update.url = (args: { course_forum_reply: string | number } | [course_forum_reply: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course_forum_reply: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    course_forum_reply: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course_forum_reply: args.course_forum_reply,
                }

    return update.definition.url
            .replace('{course_forum_reply}', parsedArgs.course_forum_reply.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseForumReplyController::update
 * @see Modules/Course/app/Http/Controllers/CourseForumReplyController.php:30
 * @route '/course-forum-replies/{course_forum_reply}'
 */
update.put = (args: { course_forum_reply: string | number } | [course_forum_reply: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Course\Http\Controllers\CourseForumReplyController::update
 * @see Modules/Course/app/Http/Controllers/CourseForumReplyController.php:30
 * @route '/course-forum-replies/{course_forum_reply}'
 */
update.patch = (args: { course_forum_reply: string | number } | [course_forum_reply: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseForumReplyController::update
 * @see Modules/Course/app/Http/Controllers/CourseForumReplyController.php:30
 * @route '/course-forum-replies/{course_forum_reply}'
 */
    const updateForm = (args: { course_forum_reply: string | number } | [course_forum_reply: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseForumReplyController::update
 * @see Modules/Course/app/Http/Controllers/CourseForumReplyController.php:30
 * @route '/course-forum-replies/{course_forum_reply}'
 */
        updateForm.put = (args: { course_forum_reply: string | number } | [course_forum_reply: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Course\Http\Controllers\CourseForumReplyController::update
 * @see Modules/Course/app/Http/Controllers/CourseForumReplyController.php:30
 * @route '/course-forum-replies/{course_forum_reply}'
 */
        updateForm.patch = (args: { course_forum_reply: string | number } | [course_forum_reply: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Course\Http\Controllers\CourseForumReplyController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseForumReplyController.php:40
 * @route '/course-forum-replies/{course_forum_reply}'
 */
export const destroy = (args: { course_forum_reply: string | number } | [course_forum_reply: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/course-forum-replies/{course_forum_reply}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Course\Http\Controllers\CourseForumReplyController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseForumReplyController.php:40
 * @route '/course-forum-replies/{course_forum_reply}'
 */
destroy.url = (args: { course_forum_reply: string | number } | [course_forum_reply: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course_forum_reply: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    course_forum_reply: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course_forum_reply: args.course_forum_reply,
                }

    return destroy.definition.url
            .replace('{course_forum_reply}', parsedArgs.course_forum_reply.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseForumReplyController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseForumReplyController.php:40
 * @route '/course-forum-replies/{course_forum_reply}'
 */
destroy.delete = (args: { course_forum_reply: string | number } | [course_forum_reply: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseForumReplyController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseForumReplyController.php:40
 * @route '/course-forum-replies/{course_forum_reply}'
 */
    const destroyForm = (args: { course_forum_reply: string | number } | [course_forum_reply: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseForumReplyController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseForumReplyController.php:40
 * @route '/course-forum-replies/{course_forum_reply}'
 */
        destroyForm.delete = (args: { course_forum_reply: string | number } | [course_forum_reply: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const CourseForumReplyController = { store, update, destroy }

export default CourseForumReplyController