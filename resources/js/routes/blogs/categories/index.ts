import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::index
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:20
 * @route '/dashboard/blogs/categories'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/blogs/categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::index
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:20
 * @route '/dashboard/blogs/categories'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::index
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:20
 * @route '/dashboard/blogs/categories'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::index
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:20
 * @route '/dashboard/blogs/categories'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::index
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:20
 * @route '/dashboard/blogs/categories'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::index
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:20
 * @route '/dashboard/blogs/categories'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::index
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:20
 * @route '/dashboard/blogs/categories'
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
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::store
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:33
 * @route '/dashboard/blogs/categories'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/blogs/categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::store
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:33
 * @route '/dashboard/blogs/categories'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::store
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:33
 * @route '/dashboard/blogs/categories'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::store
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:33
 * @route '/dashboard/blogs/categories'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::store
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:33
 * @route '/dashboard/blogs/categories'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::update
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:43
 * @route '/dashboard/blogs/categories/{category}'
 */
export const update = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/blogs/categories/{category}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::update
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:43
 * @route '/dashboard/blogs/categories/{category}'
 */
update.url = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: args.category,
                }

    return update.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::update
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:43
 * @route '/dashboard/blogs/categories/{category}'
 */
update.put = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::update
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:43
 * @route '/dashboard/blogs/categories/{category}'
 */
update.patch = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::update
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:43
 * @route '/dashboard/blogs/categories/{category}'
 */
    const updateForm = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::update
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:43
 * @route '/dashboard/blogs/categories/{category}'
 */
        updateForm.put = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::update
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:43
 * @route '/dashboard/blogs/categories/{category}'
 */
        updateForm.patch = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::destroy
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:57
 * @route '/dashboard/blogs/categories/{category}'
 */
export const destroy = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/blogs/categories/{category}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::destroy
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:57
 * @route '/dashboard/blogs/categories/{category}'
 */
destroy.url = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: args.category,
                }

    return destroy.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::destroy
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:57
 * @route '/dashboard/blogs/categories/{category}'
 */
destroy.delete = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::destroy
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:57
 * @route '/dashboard/blogs/categories/{category}'
 */
    const destroyForm = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::destroy
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:57
 * @route '/dashboard/blogs/categories/{category}'
 */
        destroyForm.delete = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::sort
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:64
 * @route '/dashboard/blogs/categories/sort'
 */
export const sort = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sort.url(options),
    method: 'post',
})

sort.definition = {
    methods: ["post"],
    url: '/dashboard/blogs/categories/sort',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::sort
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:64
 * @route '/dashboard/blogs/categories/sort'
 */
sort.url = (options?: RouteQueryOptions) => {
    return sort.definition.url + queryParams(options)
}

/**
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::sort
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:64
 * @route '/dashboard/blogs/categories/sort'
 */
sort.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sort.url(options),
    method: 'post',
})

    /**
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::sort
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:64
 * @route '/dashboard/blogs/categories/sort'
 */
    const sortForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sort.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Blog\Http\Controllers\BlogCategoryController::sort
 * @see Modules/Blog/app/Http/Controllers/BlogCategoryController.php:64
 * @route '/dashboard/blogs/categories/sort'
 */
        sortForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sort.url(options),
            method: 'post',
        })
    
    sort.form = sortForm
const categories = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
sort: Object.assign(sort, sort),
}

export default categories