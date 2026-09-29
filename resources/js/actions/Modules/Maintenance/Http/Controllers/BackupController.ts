import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Maintenance\Http\Controllers\BackupController::store
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:23
 * @route '/system/backup'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/system/backup',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Maintenance\Http\Controllers\BackupController::store
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:23
 * @route '/system/backup'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\BackupController::store
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:23
 * @route '/system/backup'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\BackupController::store
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:23
 * @route '/system/backup'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\BackupController::store
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:23
 * @route '/system/backup'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Maintenance\Http\Controllers\BackupController::destroy
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:63
 * @route '/system/backup/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/system/backup/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Maintenance\Http\Controllers\BackupController::destroy
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:63
 * @route '/system/backup/{id}'
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
* @see \Modules\Maintenance\Http\Controllers\BackupController::destroy
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:63
 * @route '/system/backup/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\BackupController::destroy
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:63
 * @route '/system/backup/{id}'
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
* @see \Modules\Maintenance\Http\Controllers\BackupController::destroy
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:63
 * @route '/system/backup/{id}'
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
/**
* @see \Modules\Maintenance\Http\Controllers\BackupController::restore
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:82
 * @route '/system/backup/{id}/restore'
 */
export const restore = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restore.url(args, options),
    method: 'post',
})

restore.definition = {
    methods: ["post"],
    url: '/system/backup/{id}/restore',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Maintenance\Http\Controllers\BackupController::restore
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:82
 * @route '/system/backup/{id}/restore'
 */
restore.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return restore.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\BackupController::restore
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:82
 * @route '/system/backup/{id}/restore'
 */
restore.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: restore.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\BackupController::restore
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:82
 * @route '/system/backup/{id}/restore'
 */
    const restoreForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: restore.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\BackupController::restore
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:82
 * @route '/system/backup/{id}/restore'
 */
        restoreForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: restore.url(args, options),
            method: 'post',
        })
    
    restore.form = restoreForm
/**
* @see \Modules\Maintenance\Http\Controllers\BackupController::download
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:145
 * @route '/system/backup/{id}/download'
 */
export const download = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})

download.definition = {
    methods: ["get","head"],
    url: '/system/backup/{id}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Maintenance\Http\Controllers\BackupController::download
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:145
 * @route '/system/backup/{id}/download'
 */
download.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return download.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\BackupController::download
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:145
 * @route '/system/backup/{id}/download'
 */
download.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: download.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Maintenance\Http\Controllers\BackupController::download
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:145
 * @route '/system/backup/{id}/download'
 */
download.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: download.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\BackupController::download
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:145
 * @route '/system/backup/{id}/download'
 */
    const downloadForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: download.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\BackupController::download
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:145
 * @route '/system/backup/{id}/download'
 */
        downloadForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Maintenance\Http\Controllers\BackupController::download
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:145
 * @route '/system/backup/{id}/download'
 */
        downloadForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: download.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    download.form = downloadForm
const BackupController = { store, destroy, restore, download }

export default BackupController