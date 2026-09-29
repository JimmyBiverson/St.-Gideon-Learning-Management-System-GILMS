import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Exam\Http\Controllers\ExamWishlistController::store
 * @see Modules/Exam/app/Http/Controllers/ExamWishlistController.php:19
 * @route '/student/exam-wishlists'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/student/exam-wishlists',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamWishlistController::store
 * @see Modules/Exam/app/Http/Controllers/ExamWishlistController.php:19
 * @route '/student/exam-wishlists'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamWishlistController::store
 * @see Modules/Exam/app/Http/Controllers/ExamWishlistController.php:19
 * @route '/student/exam-wishlists'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamWishlistController::store
 * @see Modules/Exam/app/Http/Controllers/ExamWishlistController.php:19
 * @route '/student/exam-wishlists'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamWishlistController::store
 * @see Modules/Exam/app/Http/Controllers/ExamWishlistController.php:19
 * @route '/student/exam-wishlists'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Exam\Http\Controllers\ExamWishlistController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamWishlistController.php:32
 * @route '/student/exam-wishlists/{exam_wishlist}'
 */
export const destroy = (args: { exam_wishlist: string | number } | [exam_wishlist: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/student/exam-wishlists/{exam_wishlist}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamWishlistController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamWishlistController.php:32
 * @route '/student/exam-wishlists/{exam_wishlist}'
 */
destroy.url = (args: { exam_wishlist: string | number } | [exam_wishlist: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { exam_wishlist: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    exam_wishlist: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        exam_wishlist: args.exam_wishlist,
                }

    return destroy.definition.url
            .replace('{exam_wishlist}', parsedArgs.exam_wishlist.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamWishlistController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamWishlistController.php:32
 * @route '/student/exam-wishlists/{exam_wishlist}'
 */
destroy.delete = (args: { exam_wishlist: string | number } | [exam_wishlist: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamWishlistController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamWishlistController.php:32
 * @route '/student/exam-wishlists/{exam_wishlist}'
 */
    const destroyForm = (args: { exam_wishlist: string | number } | [exam_wishlist: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamWishlistController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamWishlistController.php:32
 * @route '/student/exam-wishlists/{exam_wishlist}'
 */
        destroyForm.delete = (args: { exam_wishlist: string | number } | [exam_wishlist: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ExamWishlistController = { store, destroy }

export default ExamWishlistController