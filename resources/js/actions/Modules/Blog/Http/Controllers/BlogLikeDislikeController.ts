import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\Blog\Http\Controllers\BlogLikeDislikeController::toggle
 * @see Modules/Blog/app/Http/Controllers/BlogLikeDislikeController.php:16
 * @route '/blogs/like-dislike/toggle'
 */
export const toggle = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(options),
    method: 'post',
})

toggle.definition = {
    methods: ["post"],
    url: '/blogs/like-dislike/toggle',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Blog\Http\Controllers\BlogLikeDislikeController::toggle
 * @see Modules/Blog/app/Http/Controllers/BlogLikeDislikeController.php:16
 * @route '/blogs/like-dislike/toggle'
 */
toggle.url = (options?: RouteQueryOptions) => {
    return toggle.definition.url + queryParams(options)
}

/**
* @see \Modules\Blog\Http\Controllers\BlogLikeDislikeController::toggle
 * @see Modules/Blog/app/Http/Controllers/BlogLikeDislikeController.php:16
 * @route '/blogs/like-dislike/toggle'
 */
toggle.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(options),
    method: 'post',
})

    /**
* @see \Modules\Blog\Http\Controllers\BlogLikeDislikeController::toggle
 * @see Modules/Blog/app/Http/Controllers/BlogLikeDislikeController.php:16
 * @route '/blogs/like-dislike/toggle'
 */
    const toggleForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggle.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Blog\Http\Controllers\BlogLikeDislikeController::toggle
 * @see Modules/Blog/app/Http/Controllers/BlogLikeDislikeController.php:16
 * @route '/blogs/like-dislike/toggle'
 */
        toggleForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggle.url(options),
            method: 'post',
        })
    
    toggle.form = toggleForm
const BlogLikeDislikeController = { toggle }

export default BlogLikeDislikeController