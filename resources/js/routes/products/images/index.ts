import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Store\Http\Controllers\ProductController::store
 * @see Modules/Store/app/Http/Controllers/ProductController.php:218
 * @route '/dashboard/store/products/images'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/store/products/images',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Store\Http\Controllers\ProductController::store
 * @see Modules/Store/app/Http/Controllers/ProductController.php:218
 * @route '/dashboard/store/products/images'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductController::store
 * @see Modules/Store/app/Http/Controllers/ProductController.php:218
 * @route '/dashboard/store/products/images'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductController::store
 * @see Modules/Store/app/Http/Controllers/ProductController.php:218
 * @route '/dashboard/store/products/images'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductController::store
 * @see Modules/Store/app/Http/Controllers/ProductController.php:218
 * @route '/dashboard/store/products/images'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Store\Http\Controllers\ProductController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductController.php:232
 * @route '/dashboard/store/products/{product}/images/{media}'
 */
export const destroy = (args: { product: number | { id: number }, media: string | number } | [product: number | { id: number }, media: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/store/products/{product}/images/{media}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Store\Http\Controllers\ProductController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductController.php:232
 * @route '/dashboard/store/products/{product}/images/{media}'
 */
destroy.url = (args: { product: number | { id: number }, media: string | number } | [product: number | { id: number }, media: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    product: args[0],
                    media: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        product: typeof args.product === 'object'
                ? args.product.id
                : args.product,
                                media: args.media,
                }

    return destroy.definition.url
            .replace('{product}', parsedArgs.product.toString())
            .replace('{media}', parsedArgs.media.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductController.php:232
 * @route '/dashboard/store/products/{product}/images/{media}'
 */
destroy.delete = (args: { product: number | { id: number }, media: string | number } | [product: number | { id: number }, media: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductController.php:232
 * @route '/dashboard/store/products/{product}/images/{media}'
 */
    const destroyForm = (args: { product: number | { id: number }, media: string | number } | [product: number | { id: number }, media: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductController.php:232
 * @route '/dashboard/store/products/{product}/images/{media}'
 */
        destroyForm.delete = (args: { product: number | { id: number }, media: string | number } | [product: number | { id: number }, media: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const images = {
    store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
}

export default images