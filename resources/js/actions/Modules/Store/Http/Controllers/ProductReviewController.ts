import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Store\Http\Controllers\ProductReviewController::store
 * @see Modules/Store/app/Http/Controllers/ProductReviewController.php:19
 * @route '/product-reviews'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/product-reviews',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Store\Http\Controllers\ProductReviewController::store
 * @see Modules/Store/app/Http/Controllers/ProductReviewController.php:19
 * @route '/product-reviews'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductReviewController::store
 * @see Modules/Store/app/Http/Controllers/ProductReviewController.php:19
 * @route '/product-reviews'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductReviewController::store
 * @see Modules/Store/app/Http/Controllers/ProductReviewController.php:19
 * @route '/product-reviews'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductReviewController::store
 * @see Modules/Store/app/Http/Controllers/ProductReviewController.php:19
 * @route '/product-reviews'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Store\Http\Controllers\ProductReviewController::update
 * @see Modules/Store/app/Http/Controllers/ProductReviewController.php:29
 * @route '/product-reviews/{product_review}'
 */
export const update = (args: { product_review: string | number } | [product_review: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/product-reviews/{product_review}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Store\Http\Controllers\ProductReviewController::update
 * @see Modules/Store/app/Http/Controllers/ProductReviewController.php:29
 * @route '/product-reviews/{product_review}'
 */
update.url = (args: { product_review: string | number } | [product_review: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { product_review: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    product_review: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        product_review: args.product_review,
                }

    return update.definition.url
            .replace('{product_review}', parsedArgs.product_review.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductReviewController::update
 * @see Modules/Store/app/Http/Controllers/ProductReviewController.php:29
 * @route '/product-reviews/{product_review}'
 */
update.put = (args: { product_review: string | number } | [product_review: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Store\Http\Controllers\ProductReviewController::update
 * @see Modules/Store/app/Http/Controllers/ProductReviewController.php:29
 * @route '/product-reviews/{product_review}'
 */
update.patch = (args: { product_review: string | number } | [product_review: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductReviewController::update
 * @see Modules/Store/app/Http/Controllers/ProductReviewController.php:29
 * @route '/product-reviews/{product_review}'
 */
    const updateForm = (args: { product_review: string | number } | [product_review: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductReviewController::update
 * @see Modules/Store/app/Http/Controllers/ProductReviewController.php:29
 * @route '/product-reviews/{product_review}'
 */
        updateForm.put = (args: { product_review: string | number } | [product_review: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Store\Http\Controllers\ProductReviewController::update
 * @see Modules/Store/app/Http/Controllers/ProductReviewController.php:29
 * @route '/product-reviews/{product_review}'
 */
        updateForm.patch = (args: { product_review: string | number } | [product_review: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Store\Http\Controllers\ProductReviewController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductReviewController.php:39
 * @route '/product-reviews/{product_review}'
 */
export const destroy = (args: { product_review: string | number } | [product_review: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/product-reviews/{product_review}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Store\Http\Controllers\ProductReviewController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductReviewController.php:39
 * @route '/product-reviews/{product_review}'
 */
destroy.url = (args: { product_review: string | number } | [product_review: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { product_review: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    product_review: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        product_review: args.product_review,
                }

    return destroy.definition.url
            .replace('{product_review}', parsedArgs.product_review.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductReviewController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductReviewController.php:39
 * @route '/product-reviews/{product_review}'
 */
destroy.delete = (args: { product_review: string | number } | [product_review: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductReviewController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductReviewController.php:39
 * @route '/product-reviews/{product_review}'
 */
    const destroyForm = (args: { product_review: string | number } | [product_review: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductReviewController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductReviewController.php:39
 * @route '/product-reviews/{product_review}'
 */
        destroyForm.delete = (args: { product_review: string | number } | [product_review: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ProductReviewController = { store, update, destroy }

export default ProductReviewController