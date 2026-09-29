import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Store\Http\Controllers\ProductCategoryController::index
 * @see Modules/Store/app/Http/Controllers/ProductCategoryController.php:19
 * @route '/dashboard/store/categories'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/store/categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Store\Http\Controllers\ProductCategoryController::index
 * @see Modules/Store/app/Http/Controllers/ProductCategoryController.php:19
 * @route '/dashboard/store/categories'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductCategoryController::index
 * @see Modules/Store/app/Http/Controllers/ProductCategoryController.php:19
 * @route '/dashboard/store/categories'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Store\Http\Controllers\ProductCategoryController::index
 * @see Modules/Store/app/Http/Controllers/ProductCategoryController.php:19
 * @route '/dashboard/store/categories'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductCategoryController::index
 * @see Modules/Store/app/Http/Controllers/ProductCategoryController.php:19
 * @route '/dashboard/store/categories'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductCategoryController::index
 * @see Modules/Store/app/Http/Controllers/ProductCategoryController.php:19
 * @route '/dashboard/store/categories'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Store\Http\Controllers\ProductCategoryController::index
 * @see Modules/Store/app/Http/Controllers/ProductCategoryController.php:19
 * @route '/dashboard/store/categories'
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
* @see \Modules\Store\Http\Controllers\ProductCategoryController::store
 * @see Modules/Store/app/Http/Controllers/ProductCategoryController.php:29
 * @route '/dashboard/store/categories'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/store/categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Store\Http\Controllers\ProductCategoryController::store
 * @see Modules/Store/app/Http/Controllers/ProductCategoryController.php:29
 * @route '/dashboard/store/categories'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductCategoryController::store
 * @see Modules/Store/app/Http/Controllers/ProductCategoryController.php:29
 * @route '/dashboard/store/categories'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductCategoryController::store
 * @see Modules/Store/app/Http/Controllers/ProductCategoryController.php:29
 * @route '/dashboard/store/categories'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductCategoryController::store
 * @see Modules/Store/app/Http/Controllers/ProductCategoryController.php:29
 * @route '/dashboard/store/categories'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Store\Http\Controllers\ProductCategoryController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductCategoryController.php:43
 * @route '/dashboard/store/categories/{category}'
 */
export const destroy = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/store/categories/{category}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Store\Http\Controllers\ProductCategoryController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductCategoryController.php:43
 * @route '/dashboard/store/categories/{category}'
 */
destroy.url = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { category: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: typeof args.category === 'object'
                ? args.category.id
                : args.category,
                }

    return destroy.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductCategoryController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductCategoryController.php:43
 * @route '/dashboard/store/categories/{category}'
 */
destroy.delete = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductCategoryController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductCategoryController.php:43
 * @route '/dashboard/store/categories/{category}'
 */
    const destroyForm = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductCategoryController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductCategoryController.php:43
 * @route '/dashboard/store/categories/{category}'
 */
        destroyForm.delete = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Store\Http\Controllers\ProductCategoryController::update
 * @see Modules/Store/app/Http/Controllers/ProductCategoryController.php:36
 * @route '/dashboard/store/categories/update/{category}'
 */
export const update = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/dashboard/store/categories/update/{category}',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Store\Http\Controllers\ProductCategoryController::update
 * @see Modules/Store/app/Http/Controllers/ProductCategoryController.php:36
 * @route '/dashboard/store/categories/update/{category}'
 */
update.url = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { category: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: typeof args.category === 'object'
                ? args.category.id
                : args.category,
                }

    return update.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductCategoryController::update
 * @see Modules/Store/app/Http/Controllers/ProductCategoryController.php:36
 * @route '/dashboard/store/categories/update/{category}'
 */
update.post = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductCategoryController::update
 * @see Modules/Store/app/Http/Controllers/ProductCategoryController.php:36
 * @route '/dashboard/store/categories/update/{category}'
 */
    const updateForm = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductCategoryController::update
 * @see Modules/Store/app/Http/Controllers/ProductCategoryController.php:36
 * @route '/dashboard/store/categories/update/{category}'
 */
        updateForm.post = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \Modules\Store\Http\Controllers\ProductCategoryController::sort
 * @see Modules/Store/app/Http/Controllers/ProductCategoryController.php:50
 * @route '/dashboard/store/categories/sort'
 */
export const sort = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sort.url(options),
    method: 'post',
})

sort.definition = {
    methods: ["post"],
    url: '/dashboard/store/categories/sort',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Store\Http\Controllers\ProductCategoryController::sort
 * @see Modules/Store/app/Http/Controllers/ProductCategoryController.php:50
 * @route '/dashboard/store/categories/sort'
 */
sort.url = (options?: RouteQueryOptions) => {
    return sort.definition.url + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductCategoryController::sort
 * @see Modules/Store/app/Http/Controllers/ProductCategoryController.php:50
 * @route '/dashboard/store/categories/sort'
 */
sort.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sort.url(options),
    method: 'post',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductCategoryController::sort
 * @see Modules/Store/app/Http/Controllers/ProductCategoryController.php:50
 * @route '/dashboard/store/categories/sort'
 */
    const sortForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sort.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductCategoryController::sort
 * @see Modules/Store/app/Http/Controllers/ProductCategoryController.php:50
 * @route '/dashboard/store/categories/sort'
 */
        sortForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sort.url(options),
            method: 'post',
        })
    
    sort.form = sortForm
const ProductCategoryController = { index, store, destroy, update, sort }

export default ProductCategoryController