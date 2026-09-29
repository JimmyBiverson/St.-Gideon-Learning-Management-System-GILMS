import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\SubscribeController::store
 * @see app/Http/Controllers/SubscribeController.php:21
 * @route '/subscribes'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/subscribes',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SubscribeController::store
 * @see app/Http/Controllers/SubscribeController.php:21
 * @route '/subscribes'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SubscribeController::store
 * @see app/Http/Controllers/SubscribeController.php:21
 * @route '/subscribes'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SubscribeController::store
 * @see app/Http/Controllers/SubscribeController.php:21
 * @route '/subscribes'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SubscribeController::store
 * @see app/Http/Controllers/SubscribeController.php:21
 * @route '/subscribes'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const subscribes = {
    store: Object.assign(store, store),
}

export default subscribes