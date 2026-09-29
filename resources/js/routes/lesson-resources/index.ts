import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\LessonResourceController::store
 * @see Modules/Course/app/Http/Controllers/LessonResourceController.php:17
 * @route '/dashboard/lesson-resources'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/lesson-resources',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\LessonResourceController::store
 * @see Modules/Course/app/Http/Controllers/LessonResourceController.php:17
 * @route '/dashboard/lesson-resources'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\LessonResourceController::store
 * @see Modules/Course/app/Http/Controllers/LessonResourceController.php:17
 * @route '/dashboard/lesson-resources'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\LessonResourceController::store
 * @see Modules/Course/app/Http/Controllers/LessonResourceController.php:17
 * @route '/dashboard/lesson-resources'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\LessonResourceController::store
 * @see Modules/Course/app/Http/Controllers/LessonResourceController.php:17
 * @route '/dashboard/lesson-resources'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Course\Http\Controllers\LessonResourceController::update
 * @see Modules/Course/app/Http/Controllers/LessonResourceController.php:27
 * @route '/dashboard/lesson-resources/{lesson_resource}'
 */
export const update = (args: { lesson_resource: string | number } | [lesson_resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/lesson-resources/{lesson_resource}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Course\Http\Controllers\LessonResourceController::update
 * @see Modules/Course/app/Http/Controllers/LessonResourceController.php:27
 * @route '/dashboard/lesson-resources/{lesson_resource}'
 */
update.url = (args: { lesson_resource: string | number } | [lesson_resource: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lesson_resource: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    lesson_resource: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        lesson_resource: args.lesson_resource,
                }

    return update.definition.url
            .replace('{lesson_resource}', parsedArgs.lesson_resource.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\LessonResourceController::update
 * @see Modules/Course/app/Http/Controllers/LessonResourceController.php:27
 * @route '/dashboard/lesson-resources/{lesson_resource}'
 */
update.put = (args: { lesson_resource: string | number } | [lesson_resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Course\Http\Controllers\LessonResourceController::update
 * @see Modules/Course/app/Http/Controllers/LessonResourceController.php:27
 * @route '/dashboard/lesson-resources/{lesson_resource}'
 */
update.patch = (args: { lesson_resource: string | number } | [lesson_resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Course\Http\Controllers\LessonResourceController::update
 * @see Modules/Course/app/Http/Controllers/LessonResourceController.php:27
 * @route '/dashboard/lesson-resources/{lesson_resource}'
 */
    const updateForm = (args: { lesson_resource: string | number } | [lesson_resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\LessonResourceController::update
 * @see Modules/Course/app/Http/Controllers/LessonResourceController.php:27
 * @route '/dashboard/lesson-resources/{lesson_resource}'
 */
        updateForm.put = (args: { lesson_resource: string | number } | [lesson_resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Course\Http\Controllers\LessonResourceController::update
 * @see Modules/Course/app/Http/Controllers/LessonResourceController.php:27
 * @route '/dashboard/lesson-resources/{lesson_resource}'
 */
        updateForm.patch = (args: { lesson_resource: string | number } | [lesson_resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Course\Http\Controllers\LessonResourceController::destroy
 * @see Modules/Course/app/Http/Controllers/LessonResourceController.php:39
 * @route '/dashboard/lesson-resources/{lesson_resource}'
 */
export const destroy = (args: { lesson_resource: string | number } | [lesson_resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/lesson-resources/{lesson_resource}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Course\Http\Controllers\LessonResourceController::destroy
 * @see Modules/Course/app/Http/Controllers/LessonResourceController.php:39
 * @route '/dashboard/lesson-resources/{lesson_resource}'
 */
destroy.url = (args: { lesson_resource: string | number } | [lesson_resource: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { lesson_resource: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    lesson_resource: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        lesson_resource: args.lesson_resource,
                }

    return destroy.definition.url
            .replace('{lesson_resource}', parsedArgs.lesson_resource.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\LessonResourceController::destroy
 * @see Modules/Course/app/Http/Controllers/LessonResourceController.php:39
 * @route '/dashboard/lesson-resources/{lesson_resource}'
 */
destroy.delete = (args: { lesson_resource: string | number } | [lesson_resource: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Course\Http\Controllers\LessonResourceController::destroy
 * @see Modules/Course/app/Http/Controllers/LessonResourceController.php:39
 * @route '/dashboard/lesson-resources/{lesson_resource}'
 */
    const destroyForm = (args: { lesson_resource: string | number } | [lesson_resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\LessonResourceController::destroy
 * @see Modules/Course/app/Http/Controllers/LessonResourceController.php:39
 * @route '/dashboard/lesson-resources/{lesson_resource}'
 */
        destroyForm.delete = (args: { lesson_resource: string | number } | [lesson_resource: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const lessonResources = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default lessonResources