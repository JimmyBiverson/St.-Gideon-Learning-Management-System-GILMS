import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::index
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:39
 * @route '/system/maintenance'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/system/maintenance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::index
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:39
 * @route '/system/maintenance'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::index
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:39
 * @route '/system/maintenance'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::index
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:39
 * @route '/system/maintenance'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::index
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:39
 * @route '/system/maintenance'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::index
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:39
 * @route '/system/maintenance'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::index
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:39
 * @route '/system/maintenance'
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
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::store
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:119
 * @route '/system/maintenance'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/system/maintenance',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::store
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:119
 * @route '/system/maintenance'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::store
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:119
 * @route '/system/maintenance'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::store
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:119
 * @route '/system/maintenance'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::store
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:119
 * @route '/system/maintenance'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const maintenance = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
}

export default maintenance