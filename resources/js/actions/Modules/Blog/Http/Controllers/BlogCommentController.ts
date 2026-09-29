import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Blog\Http\Controllers\BlogCommentController::store
 * @see Modules/Blog/app/Http/Controllers/BlogCommentController.php:16
 * @route '/blogs/comments'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/blogs/comments',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Blog\Http\Controllers\BlogCommentController::store
 * @see Modules/Blog/app/Http/Controllers/BlogCommentController.php:16
 * @route '/blogs/comments'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Blog\Http\Controllers\BlogCommentController::store
 * @see Modules/Blog/app/Http/Controllers/BlogCommentController.php:16
 * @route '/blogs/comments'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Blog\Http\Controllers\BlogCommentController::store
 * @see Modules/Blog/app/Http/Controllers/BlogCommentController.php:16
 * @route '/blogs/comments'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Blog\Http\Controllers\BlogCommentController::store
 * @see Modules/Blog/app/Http/Controllers/BlogCommentController.php:16
 * @route '/blogs/comments'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Blog\Http\Controllers\BlogCommentController::update
 * @see Modules/Blog/app/Http/Controllers/BlogCommentController.php:39
 * @route '/blogs/comments/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/blogs/comments/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Blog\Http\Controllers\BlogCommentController::update
 * @see Modules/Blog/app/Http/Controllers/BlogCommentController.php:39
 * @route '/blogs/comments/{id}'
 */
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Blog\Http\Controllers\BlogCommentController::update
 * @see Modules/Blog/app/Http/Controllers/BlogCommentController.php:39
 * @route '/blogs/comments/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \Modules\Blog\Http\Controllers\BlogCommentController::update
 * @see Modules/Blog/app/Http/Controllers/BlogCommentController.php:39
 * @route '/blogs/comments/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Blog\Http\Controllers\BlogCommentController::update
 * @see Modules/Blog/app/Http/Controllers/BlogCommentController.php:39
 * @route '/blogs/comments/{id}'
 */
        updateForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \Modules\Blog\Http\Controllers\BlogCommentController::destroy
 * @see Modules/Blog/app/Http/Controllers/BlogCommentController.php:66
 * @route '/blogs/comments/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/blogs/comments/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Blog\Http\Controllers\BlogCommentController::destroy
 * @see Modules/Blog/app/Http/Controllers/BlogCommentController.php:66
 * @route '/blogs/comments/{id}'
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
* @see \Modules\Blog\Http\Controllers\BlogCommentController::destroy
 * @see Modules/Blog/app/Http/Controllers/BlogCommentController.php:66
 * @route '/blogs/comments/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Blog\Http\Controllers\BlogCommentController::destroy
 * @see Modules/Blog/app/Http/Controllers/BlogCommentController.php:66
 * @route '/blogs/comments/{id}'
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
* @see \Modules\Blog\Http\Controllers\BlogCommentController::destroy
 * @see Modules/Blog/app/Http/Controllers/BlogCommentController.php:66
 * @route '/blogs/comments/{id}'
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
const BlogCommentController = { store, update, destroy }

export default BlogCommentController