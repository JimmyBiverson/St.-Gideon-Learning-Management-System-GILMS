import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
const ProductFileController = { download }

export default ProductFileController