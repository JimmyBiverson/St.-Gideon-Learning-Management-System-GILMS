import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::store
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:30
 * @route '/system/update/packages'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/system/update/packages',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::store
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:30
 * @route '/system/update/packages'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::store
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:30
 * @route '/system/update/packages'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::store
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:30
 * @route '/system/update/packages'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::store
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:30
 * @route '/system/update/packages'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::verify
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:59
 * @route '/system/update/packages/{id}/verify'
 */
export const verify = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(args, options),
    method: 'post',
})

verify.definition = {
    methods: ["post"],
    url: '/system/update/packages/{id}/verify',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::verify
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:59
 * @route '/system/update/packages/{id}/verify'
 */
verify.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return verify.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::verify
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:59
 * @route '/system/update/packages/{id}/verify'
 */
verify.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::verify
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:59
 * @route '/system/update/packages/{id}/verify'
 */
    const verifyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: verify.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::verify
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:59
 * @route '/system/update/packages/{id}/verify'
 */
        verifyForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: verify.url(args, options),
            method: 'post',
        })
    
    verify.form = verifyForm
/**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::destroy
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:73
 * @route '/system/update/packages/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/system/update/packages/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::destroy
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:73
 * @route '/system/update/packages/{id}'
 */
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::destroy
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:73
 * @route '/system/update/packages/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::destroy
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:73
 * @route '/system/update/packages/{id}'
 */
    const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::destroy
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:73
 * @route '/system/update/packages/{id}'
 */
        destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const UpdatePackageController = { store, verify, destroy }

export default UpdatePackageController