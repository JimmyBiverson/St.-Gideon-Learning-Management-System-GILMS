import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\CourseEnrollmentController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseEnrollmentController.php:67
 * @route '/dashboard/courses/course/enrollments/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/courses/course/enrollments/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Course\Http\Controllers\CourseEnrollmentController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseEnrollmentController.php:67
 * @route '/dashboard/courses/course/enrollments/{id}'
 */
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseEnrollmentController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseEnrollmentController.php:67
 * @route '/dashboard/courses/course/enrollments/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseEnrollmentController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseEnrollmentController.php:67
 * @route '/dashboard/courses/course/enrollments/{id}'
 */
    const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseEnrollmentController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseEnrollmentController.php:67
 * @route '/dashboard/courses/course/enrollments/{id}'
 */
        destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \Modules\Course\Http\Controllers\CourseEnrollmentController::index
 * @see Modules/Course/app/Http/Controllers/CourseEnrollmentController.php:27
 * @route '/dashboard/courses/course/enrollments'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/courses/course/enrollments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\CourseEnrollmentController::index
 * @see Modules/Course/app/Http/Controllers/CourseEnrollmentController.php:27
 * @route '/dashboard/courses/course/enrollments'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseEnrollmentController::index
 * @see Modules/Course/app/Http/Controllers/CourseEnrollmentController.php:27
 * @route '/dashboard/courses/course/enrollments'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\CourseEnrollmentController::index
 * @see Modules/Course/app/Http/Controllers/CourseEnrollmentController.php:27
 * @route '/dashboard/courses/course/enrollments'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseEnrollmentController::index
 * @see Modules/Course/app/Http/Controllers/CourseEnrollmentController.php:27
 * @route '/dashboard/courses/course/enrollments'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseEnrollmentController::index
 * @see Modules/Course/app/Http/Controllers/CourseEnrollmentController.php:27
 * @route '/dashboard/courses/course/enrollments'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\CourseEnrollmentController::index
 * @see Modules/Course/app/Http/Controllers/CourseEnrollmentController.php:27
 * @route '/dashboard/courses/course/enrollments'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \Modules\Course\Http\Controllers\CourseEnrollmentController::store
 * @see Modules/Course/app/Http/Controllers/CourseEnrollmentController.php:57
 * @route '/courses/course/enrollments'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/courses/course/enrollments',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\CourseEnrollmentController::store
 * @see Modules/Course/app/Http/Controllers/CourseEnrollmentController.php:57
 * @route '/courses/course/enrollments'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseEnrollmentController::store
 * @see Modules/Course/app/Http/Controllers/CourseEnrollmentController.php:57
 * @route '/courses/course/enrollments'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseEnrollmentController::store
 * @see Modules/Course/app/Http/Controllers/CourseEnrollmentController.php:57
 * @route '/courses/course/enrollments'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseEnrollmentController::store
 * @see Modules/Course/app/Http/Controllers/CourseEnrollmentController.php:57
 * @route '/courses/course/enrollments'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const CourseEnrollmentController = { destroy, index, store }

export default CourseEnrollmentController