import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import play from './play'
/**
* @see \Modules\Course\Http\Controllers\CourseController::details
 * @see Modules/Course/app/Http/Controllers/CourseController.php:148
 * @route '/courses/details/{slug}/{id}'
 */
export const details = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: details.url(args, options),
    method: 'get',
})

details.definition = {
    methods: ["get","head"],
    url: '/courses/details/{slug}/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\CourseController::details
 * @see Modules/Course/app/Http/Controllers/CourseController.php:148
 * @route '/courses/details/{slug}/{id}'
 */
details.url = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    slug: args[0],
                    id: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        slug: args.slug,
                                id: args.id,
                }

    return details.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseController::details
 * @see Modules/Course/app/Http/Controllers/CourseController.php:148
 * @route '/courses/details/{slug}/{id}'
 */
details.get = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: details.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\CourseController::details
 * @see Modules/Course/app/Http/Controllers/CourseController.php:148
 * @route '/courses/details/{slug}/{id}'
 */
details.head = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: details.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseController::details
 * @see Modules/Course/app/Http/Controllers/CourseController.php:148
 * @route '/courses/details/{slug}/{id}'
 */
    const detailsForm = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: details.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseController::details
 * @see Modules/Course/app/Http/Controllers/CourseController.php:148
 * @route '/courses/details/{slug}/{id}'
 */
        detailsForm.get = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: details.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\CourseController::details
 * @see Modules/Course/app/Http/Controllers/CourseController.php:148
 * @route '/courses/details/{slug}/{id}'
 */
        detailsForm.head = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: details.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    details.form = detailsForm
/**
* @see \Modules\Course\Http\Controllers\CourseController::status
 * @see Modules/Course/app/Http/Controllers/CourseController.php:273
 * @route '/dashboard/course/status/{id}'
 */
export const status = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: status.url(args, options),
    method: 'put',
})

status.definition = {
    methods: ["put"],
    url: '/dashboard/course/status/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Course\Http\Controllers\CourseController::status
 * @see Modules/Course/app/Http/Controllers/CourseController.php:273
 * @route '/dashboard/course/status/{id}'
 */
status.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return status.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseController::status
 * @see Modules/Course/app/Http/Controllers/CourseController.php:273
 * @route '/dashboard/course/status/{id}'
 */
status.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: status.url(args, options),
    method: 'put',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseController::status
 * @see Modules/Course/app/Http/Controllers/CourseController.php:273
 * @route '/dashboard/course/status/{id}'
 */
    const statusForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: status.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseController::status
 * @see Modules/Course/app/Http/Controllers/CourseController.php:273
 * @route '/dashboard/course/status/{id}'
 */
        statusForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: status.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    status.form = statusForm
const course = {
    details: Object.assign(details, details),
status: Object.assign(status, status),
play: Object.assign(play, play),
}

export default course