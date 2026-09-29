import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Store\Http\Controllers\ProductSpecificationController::store
 * @see Modules/Store/app/Http/Controllers/ProductSpecificationController.php:19
 * @route '/dashboard/store/product-specifications'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/store/product-specifications',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Store\Http\Controllers\ProductSpecificationController::store
 * @see Modules/Store/app/Http/Controllers/ProductSpecificationController.php:19
 * @route '/dashboard/store/product-specifications'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductSpecificationController::store
 * @see Modules/Store/app/Http/Controllers/ProductSpecificationController.php:19
 * @route '/dashboard/store/product-specifications'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductSpecificationController::store
 * @see Modules/Store/app/Http/Controllers/ProductSpecificationController.php:19
 * @route '/dashboard/store/product-specifications'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductSpecificationController::store
 * @see Modules/Store/app/Http/Controllers/ProductSpecificationController.php:19
 * @route '/dashboard/store/product-specifications'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Store\Http\Controllers\ProductSpecificationController::update
 * @see Modules/Store/app/Http/Controllers/ProductSpecificationController.php:29
 * @route '/dashboard/store/product-specifications/{product_specification}'
 */
export const update = (args: { product_specification: string | number } | [product_specification: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/store/product-specifications/{product_specification}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Store\Http\Controllers\ProductSpecificationController::update
 * @see Modules/Store/app/Http/Controllers/ProductSpecificationController.php:29
 * @route '/dashboard/store/product-specifications/{product_specification}'
 */
update.url = (args: { product_specification: string | number } | [product_specification: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { product_specification: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    product_specification: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        product_specification: args.product_specification,
                }

    return update.definition.url
            .replace('{product_specification}', parsedArgs.product_specification.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductSpecificationController::update
 * @see Modules/Store/app/Http/Controllers/ProductSpecificationController.php:29
 * @route '/dashboard/store/product-specifications/{product_specification}'
 */
update.put = (args: { product_specification: string | number } | [product_specification: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Store\Http\Controllers\ProductSpecificationController::update
 * @see Modules/Store/app/Http/Controllers/ProductSpecificationController.php:29
 * @route '/dashboard/store/product-specifications/{product_specification}'
 */
update.patch = (args: { product_specification: string | number } | [product_specification: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductSpecificationController::update
 * @see Modules/Store/app/Http/Controllers/ProductSpecificationController.php:29
 * @route '/dashboard/store/product-specifications/{product_specification}'
 */
    const updateForm = (args: { product_specification: string | number } | [product_specification: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductSpecificationController::update
 * @see Modules/Store/app/Http/Controllers/ProductSpecificationController.php:29
 * @route '/dashboard/store/product-specifications/{product_specification}'
 */
        updateForm.put = (args: { product_specification: string | number } | [product_specification: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Store\Http\Controllers\ProductSpecificationController::update
 * @see Modules/Store/app/Http/Controllers/ProductSpecificationController.php:29
 * @route '/dashboard/store/product-specifications/{product_specification}'
 */
        updateForm.patch = (args: { product_specification: string | number } | [product_specification: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Store\Http\Controllers\ProductSpecificationController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductSpecificationController.php:39
 * @route '/dashboard/store/product-specifications/{product_specification}'
 */
export const destroy = (args: { product_specification: string | number } | [product_specification: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/store/product-specifications/{product_specification}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Store\Http\Controllers\ProductSpecificationController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductSpecificationController.php:39
 * @route '/dashboard/store/product-specifications/{product_specification}'
 */
destroy.url = (args: { product_specification: string | number } | [product_specification: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { product_specification: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    product_specification: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        product_specification: args.product_specification,
                }

    return destroy.definition.url
            .replace('{product_specification}', parsedArgs.product_specification.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductSpecificationController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductSpecificationController.php:39
 * @route '/dashboard/store/product-specifications/{product_specification}'
 */
destroy.delete = (args: { product_specification: string | number } | [product_specification: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductSpecificationController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductSpecificationController.php:39
 * @route '/dashboard/store/product-specifications/{product_specification}'
 */
    const destroyForm = (args: { product_specification: string | number } | [product_specification: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductSpecificationController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductSpecificationController.php:39
 * @route '/dashboard/store/product-specifications/{product_specification}'
 */
        destroyForm.delete = (args: { product_specification: string | number } | [product_specification: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ProductSpecificationController = { store, update, destroy }

export default ProductSpecificationController