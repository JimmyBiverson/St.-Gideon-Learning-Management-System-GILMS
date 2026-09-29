import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Store\Http\Controllers\ProductController::status
 * @see Modules/Store/app/Http/Controllers/ProductController.php:201
 * @route '/dashboard/store/product/status/{id}'
 */
export const status = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: status.url(args, options),
    method: 'put',
})

status.definition = {
    methods: ["put"],
    url: '/dashboard/store/product/status/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Store\Http\Controllers\ProductController::status
 * @see Modules/Store/app/Http/Controllers/ProductController.php:201
 * @route '/dashboard/store/product/status/{id}'
 */
status.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return status.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductController::status
 * @see Modules/Store/app/Http/Controllers/ProductController.php:201
 * @route '/dashboard/store/product/status/{id}'
 */
status.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: status.url(args, options),
    method: 'put',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductController::status
 * @see Modules/Store/app/Http/Controllers/ProductController.php:201
 * @route '/dashboard/store/product/status/{id}'
 */
    const statusForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: status.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductController::status
 * @see Modules/Store/app/Http/Controllers/ProductController.php:201
 * @route '/dashboard/store/product/status/{id}'
 */
        statusForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: status.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    status.form = statusForm
const product = {
    status: Object.assign(status, status),
}

export default product