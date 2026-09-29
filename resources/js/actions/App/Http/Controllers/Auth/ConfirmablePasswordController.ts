import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\ConfirmablePasswordController::create
 * @see app/Http/Controllers/Auth/ConfirmablePasswordController.php:18
 * @route '/confirm-password/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/confirm-password/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\ConfirmablePasswordController::create
 * @see app/Http/Controllers/Auth/ConfirmablePasswordController.php:18
 * @route '/confirm-password/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\ConfirmablePasswordController::create
 * @see app/Http/Controllers/Auth/ConfirmablePasswordController.php:18
 * @route '/confirm-password/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\ConfirmablePasswordController::create
 * @see app/Http/Controllers/Auth/ConfirmablePasswordController.php:18
 * @route '/confirm-password/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\ConfirmablePasswordController::create
 * @see app/Http/Controllers/Auth/ConfirmablePasswordController.php:18
 * @route '/confirm-password/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\ConfirmablePasswordController::create
 * @see app/Http/Controllers/Auth/ConfirmablePasswordController.php:18
 * @route '/confirm-password/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\ConfirmablePasswordController::create
 * @see app/Http/Controllers/Auth/ConfirmablePasswordController.php:18
 * @route '/confirm-password/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Auth\ConfirmablePasswordController::store
 * @see app/Http/Controllers/Auth/ConfirmablePasswordController.php:26
 * @route '/confirm-password'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/confirm-password',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\ConfirmablePasswordController::store
 * @see app/Http/Controllers/Auth/ConfirmablePasswordController.php:26
 * @route '/confirm-password'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\ConfirmablePasswordController::store
 * @see app/Http/Controllers/Auth/ConfirmablePasswordController.php:26
 * @route '/confirm-password'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\ConfirmablePasswordController::store
 * @see app/Http/Controllers/Auth/ConfirmablePasswordController.php:26
 * @route '/confirm-password'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\ConfirmablePasswordController::store
 * @see app/Http/Controllers/Auth/ConfirmablePasswordController.php:26
 * @route '/confirm-password'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const ConfirmablePasswordController = { create, store }

export default ConfirmablePasswordController