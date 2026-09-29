import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\CourseWishlistController::store
 * @see Modules/Course/app/Http/Controllers/CourseWishlistController.php:16
 * @route '/course-wishlists'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/course-wishlists',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\CourseWishlistController::store
 * @see Modules/Course/app/Http/Controllers/CourseWishlistController.php:16
 * @route '/course-wishlists'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseWishlistController::store
 * @see Modules/Course/app/Http/Controllers/CourseWishlistController.php:16
 * @route '/course-wishlists'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseWishlistController::store
 * @see Modules/Course/app/Http/Controllers/CourseWishlistController.php:16
 * @route '/course-wishlists'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseWishlistController::store
 * @see Modules/Course/app/Http/Controllers/CourseWishlistController.php:16
 * @route '/course-wishlists'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Course\Http\Controllers\CourseWishlistController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseWishlistController.php:26
 * @route '/course-wishlists/{course_wishlist}'
 */
export const destroy = (args: { course_wishlist: string | number } | [course_wishlist: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/course-wishlists/{course_wishlist}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Course\Http\Controllers\CourseWishlistController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseWishlistController.php:26
 * @route '/course-wishlists/{course_wishlist}'
 */
destroy.url = (args: { course_wishlist: string | number } | [course_wishlist: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course_wishlist: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    course_wishlist: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course_wishlist: args.course_wishlist,
                }

    return destroy.definition.url
            .replace('{course_wishlist}', parsedArgs.course_wishlist.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseWishlistController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseWishlistController.php:26
 * @route '/course-wishlists/{course_wishlist}'
 */
destroy.delete = (args: { course_wishlist: string | number } | [course_wishlist: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseWishlistController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseWishlistController.php:26
 * @route '/course-wishlists/{course_wishlist}'
 */
    const destroyForm = (args: { course_wishlist: string | number } | [course_wishlist: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseWishlistController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseWishlistController.php:26
 * @route '/course-wishlists/{course_wishlist}'
 */
        destroyForm.delete = (args: { course_wishlist: string | number } | [course_wishlist: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const CourseWishlistController = { store, destroy }

export default CourseWishlistController