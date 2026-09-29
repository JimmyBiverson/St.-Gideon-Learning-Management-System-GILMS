import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::index
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:22
 * @route '/forgot-password'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/forgot-password',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::index
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:22
 * @route '/forgot-password'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::index
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:22
 * @route '/forgot-password'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::index
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:22
 * @route '/forgot-password'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::index
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:22
 * @route '/forgot-password'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::index
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:22
 * @route '/forgot-password'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::index
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:22
 * @route '/forgot-password'
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
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::store
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:34
 * @route '/forgot-password'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/forgot-password',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::store
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:34
 * @route '/forgot-password'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::store
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:34
 * @route '/forgot-password'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::store
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:34
 * @route '/forgot-password'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::store
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:34
 * @route '/forgot-password'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const forgotPassword = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
}

export default forgotPassword