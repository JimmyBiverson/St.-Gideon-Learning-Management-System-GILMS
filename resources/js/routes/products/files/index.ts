import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Store\Http\Controllers\ProductController::store
 * @see Modules/Store/app/Http/Controllers/ProductController.php:242
 * @route '/dashboard/store/products/files'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/store/products/files',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Store\Http\Controllers\ProductController::store
 * @see Modules/Store/app/Http/Controllers/ProductController.php:242
 * @route '/dashboard/store/products/files'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductController::store
 * @see Modules/Store/app/Http/Controllers/ProductController.php:242
 * @route '/dashboard/store/products/files'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductController::store
 * @see Modules/Store/app/Http/Controllers/ProductController.php:242
 * @route '/dashboard/store/products/files'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductController::store
 * @see Modules/Store/app/Http/Controllers/ProductController.php:242
 * @route '/dashboard/store/products/files'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Store\Http\Controllers\ProductController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductController.php:258
 * @route '/dashboard/store/products/{product}/files/{media}'
 */
export const destroy = (args: { product: number | { id: number }, media: string | number } | [product: number | { id: number }, media: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/store/products/{product}/files/{media}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Store\Http\Controllers\ProductController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductController.php:258
 * @route '/dashboard/store/products/{product}/files/{media}'
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
 * @see Modules/Store/app/Http/Controllers/ProductController.php:258
 * @route '/dashboard/store/products/{product}/files/{media}'
 */
destroy.delete = (args: { product: number | { id: number }, media: string | number } | [product: number | { id: number }, media: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductController.php:258
 * @route '/dashboard/store/products/{product}/files/{media}'
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
 * @see Modules/Store/app/Http/Controllers/ProductController.php:258
 * @route '/dashboard/store/products/{product}/files/{media}'
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
/**
* @see \Modules\Store\Http\Controllers\ProductFileController::download
 * @see Modules/Store/app/Http/Controllers/ProductFileController.php:16
 * @route '/products/{product}/files/{media}/download'
 */
export const download = (args: { product: number | { id: number }, media: string | number } | [product: number | { id: number }, media: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/products/{product}/files/{media}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Store\Http\Controllers\ProductFileController::download
 * @see Modules/Store/app/Http/Controllers/ProductFileController.php:16
 * @route '/products/{product}/files/{media}/download'
 */
download.url = (args: { product: number | { id: number }, media: string | number } | [product: number | { id: number }, media: string | number ], options?: RouteQueryOptions) => {
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

    return download.definition.url
            .replace('{product}', parsedArgs.product.toString())
            .replace('{media}', parsedArgs.media.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductFileController::download
 * @see Modules/Store/app/Http/Controllers/ProductFileController.php:16
 * @route '/products/{product}/files/{media}/download'
 */
download.get = (args: { product: number | { id: number }, media: string | number } | [product: number | { id: number }, media: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Store\Http\Controllers\ProductFileController::download
 * @see Modules/Store/app/Http/Controllers/ProductFileController.php:16
 * @route '/products/{product}/files/{media}/download'
 */
download.head = (args: { product: number | { id: number }, media: string | number } | [product: number | { id: number }, media: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductFileController::download
 * @see Modules/Store/app/Http/Controllers/ProductFileController.php:16
 * @route '/products/{product}/files/{media}/download'
 */
    const downloadForm = (args: { product: number | { id: number }, media: string | number } | [product: number | { id: number }, media: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: download.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductFileController::download
 * @see Modules/Store/app/Http/Controllers/ProductFileController.php:16
 * @route '/products/{product}/files/{media}/download'
 */
        downloadForm.get = (args: { product: number | { id: number }, media: string | number } | [product: number | { id: number }, media: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Store\Http\Controllers\ProductFileController::download
 * @see Modules/Store/app/Http/Controllers/ProductFileController.php:16
 * @route '/products/{product}/files/{media}/download'
 */
        downloadForm.head = (args: { product: number | { id: number }, media: string | number } | [product: number | { id: number }, media: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    download.form = downloadForm
const files = {
    store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
download: Object.assign(download, download),
}

export default files