import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Store\Http\Controllers\ProductCategoryChildController::store
 * @see Modules/Store/app/Http/Controllers/ProductCategoryChildController.php:21
 * @route '/dashboard/store/category-child'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/store/category-child',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Store\Http\Controllers\ProductCategoryChildController::store
 * @see Modules/Store/app/Http/Controllers/ProductCategoryChildController.php:21
 * @route '/dashboard/store/category-child'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductCategoryChildController::store
 * @see Modules/Store/app/Http/Controllers/ProductCategoryChildController.php:21
 * @route '/dashboard/store/category-child'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductCategoryChildController::store
 * @see Modules/Store/app/Http/Controllers/ProductCategoryChildController.php:21
 * @route '/dashboard/store/category-child'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductCategoryChildController::store
 * @see Modules/Store/app/Http/Controllers/ProductCategoryChildController.php:21
 * @route '/dashboard/store/category-child'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Store\Http\Controllers\ProductCategoryChildController::update
 * @see Modules/Store/app/Http/Controllers/ProductCategoryChildController.php:31
 * @route '/dashboard/store/category-child/{category_child}'
 */
export const update = (args: { category_child: string | number } | [category_child: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/store/category-child/{category_child}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Store\Http\Controllers\ProductCategoryChildController::update
 * @see Modules/Store/app/Http/Controllers/ProductCategoryChildController.php:31
 * @route '/dashboard/store/category-child/{category_child}'
 */
update.url = (args: { category_child: string | number } | [category_child: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category_child: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    category_child: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category_child: args.category_child,
                }

    return update.definition.url
            .replace('{category_child}', parsedArgs.category_child.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductCategoryChildController::update
 * @see Modules/Store/app/Http/Controllers/ProductCategoryChildController.php:31
 * @route '/dashboard/store/category-child/{category_child}'
 */
update.put = (args: { category_child: string | number } | [category_child: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Store\Http\Controllers\ProductCategoryChildController::update
 * @see Modules/Store/app/Http/Controllers/ProductCategoryChildController.php:31
 * @route '/dashboard/store/category-child/{category_child}'
 */
update.patch = (args: { category_child: string | number } | [category_child: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductCategoryChildController::update
 * @see Modules/Store/app/Http/Controllers/ProductCategoryChildController.php:31
 * @route '/dashboard/store/category-child/{category_child}'
 */
    const updateForm = (args: { category_child: string | number } | [category_child: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductCategoryChildController::update
 * @see Modules/Store/app/Http/Controllers/ProductCategoryChildController.php:31
 * @route '/dashboard/store/category-child/{category_child}'
 */
        updateForm.put = (args: { category_child: string | number } | [category_child: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Store\Http\Controllers\ProductCategoryChildController::update
 * @see Modules/Store/app/Http/Controllers/ProductCategoryChildController.php:31
 * @route '/dashboard/store/category-child/{category_child}'
 */
        updateForm.patch = (args: { category_child: string | number } | [category_child: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Store\Http\Controllers\ProductCategoryChildController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductCategoryChildController.php:38
 * @route '/dashboard/store/category-child/{category_child}'
 */
export const destroy = (args: { category_child: string | number } | [category_child: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/store/category-child/{category_child}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Store\Http\Controllers\ProductCategoryChildController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductCategoryChildController.php:38
 * @route '/dashboard/store/category-child/{category_child}'
 */
destroy.url = (args: { category_child: string | number } | [category_child: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category_child: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    category_child: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category_child: args.category_child,
                }

    return destroy.definition.url
            .replace('{category_child}', parsedArgs.category_child.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductCategoryChildController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductCategoryChildController.php:38
 * @route '/dashboard/store/category-child/{category_child}'
 */
destroy.delete = (args: { category_child: string | number } | [category_child: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductCategoryChildController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductCategoryChildController.php:38
 * @route '/dashboard/store/category-child/{category_child}'
 */
    const destroyForm = (args: { category_child: string | number } | [category_child: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductCategoryChildController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductCategoryChildController.php:38
 * @route '/dashboard/store/category-child/{category_child}'
 */
        destroyForm.delete = (args: { category_child: string | number } | [category_child: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Store\Http\Controllers\ProductCategoryChildController::sort
 * @see Modules/Store/app/Http/Controllers/ProductCategoryChildController.php:45
 * @route '/dashboard/store/category-child/sort'
 */
export const sort = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sort.url(options),
    method: 'post',
})

sort.definition = {
    methods: ["post"],
    url: '/dashboard/store/category-child/sort',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Store\Http\Controllers\ProductCategoryChildController::sort
 * @see Modules/Store/app/Http/Controllers/ProductCategoryChildController.php:45
 * @route '/dashboard/store/category-child/sort'
 */
sort.url = (options?: RouteQueryOptions) => {
    return sort.definition.url + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductCategoryChildController::sort
 * @see Modules/Store/app/Http/Controllers/ProductCategoryChildController.php:45
 * @route '/dashboard/store/category-child/sort'
 */
sort.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sort.url(options),
    method: 'post',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductCategoryChildController::sort
 * @see Modules/Store/app/Http/Controllers/ProductCategoryChildController.php:45
 * @route '/dashboard/store/category-child/sort'
 */
    const sortForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sort.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductCategoryChildController::sort
 * @see Modules/Store/app/Http/Controllers/ProductCategoryChildController.php:45
 * @route '/dashboard/store/category-child/sort'
 */
        sortForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sort.url(options),
            method: 'post',
        })
    
    sort.form = sortForm
const productCategoryChild = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
sort: Object.assign(sort, sort),
}

export default productCategoryChild