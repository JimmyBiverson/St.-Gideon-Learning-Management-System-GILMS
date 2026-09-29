import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Store\Http\Controllers\ProductWishlistController::store
 * @see Modules/Store/app/Http/Controllers/ProductWishlistController.php:16
 * @route '/product-wishlists'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/product-wishlists',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Store\Http\Controllers\ProductWishlistController::store
 * @see Modules/Store/app/Http/Controllers/ProductWishlistController.php:16
 * @route '/product-wishlists'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductWishlistController::store
 * @see Modules/Store/app/Http/Controllers/ProductWishlistController.php:16
 * @route '/product-wishlists'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductWishlistController::store
 * @see Modules/Store/app/Http/Controllers/ProductWishlistController.php:16
 * @route '/product-wishlists'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductWishlistController::store
 * @see Modules/Store/app/Http/Controllers/ProductWishlistController.php:16
 * @route '/product-wishlists'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Store\Http\Controllers\ProductWishlistController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductWishlistController.php:26
 * @route '/product-wishlists/{product_wishlist}'
 */
export const destroy = (args: { product_wishlist: string | number } | [product_wishlist: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/product-wishlists/{product_wishlist}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Store\Http\Controllers\ProductWishlistController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductWishlistController.php:26
 * @route '/product-wishlists/{product_wishlist}'
 */
destroy.url = (args: { product_wishlist: string | number } | [product_wishlist: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { product_wishlist: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    product_wishlist: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        product_wishlist: args.product_wishlist,
                }

    return destroy.definition.url
            .replace('{product_wishlist}', parsedArgs.product_wishlist.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductWishlistController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductWishlistController.php:26
 * @route '/product-wishlists/{product_wishlist}'
 */
destroy.delete = (args: { product_wishlist: string | number } | [product_wishlist: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductWishlistController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductWishlistController.php:26
 * @route '/product-wishlists/{product_wishlist}'
 */
    const destroyForm = (args: { product_wishlist: string | number } | [product_wishlist: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductWishlistController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductWishlistController.php:26
 * @route '/product-wishlists/{product_wishlist}'
 */
        destroyForm.delete = (args: { product_wishlist: string | number } | [product_wishlist: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const productWishlists = {
    store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
}

export default productWishlists