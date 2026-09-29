import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PluginController::index
 * @see app/Http/Controllers/PluginController.php:19
 * @route '/dashboard/settings/plugins'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/settings/plugins',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PluginController::index
 * @see app/Http/Controllers/PluginController.php:19
 * @route '/dashboard/settings/plugins'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PluginController::index
 * @see app/Http/Controllers/PluginController.php:19
 * @route '/dashboard/settings/plugins'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PluginController::index
 * @see app/Http/Controllers/PluginController.php:19
 * @route '/dashboard/settings/plugins'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PluginController::index
 * @see app/Http/Controllers/PluginController.php:19
 * @route '/dashboard/settings/plugins'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PluginController::index
 * @see app/Http/Controllers/PluginController.php:19
 * @route '/dashboard/settings/plugins'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PluginController::index
 * @see app/Http/Controllers/PluginController.php:19
 * @route '/dashboard/settings/plugins'
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
* @see \App\Http\Controllers\PluginController::store
 * @see app/Http/Controllers/PluginController.php:26
 * @route '/dashboard/settings/plugins'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/settings/plugins',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PluginController::store
 * @see app/Http/Controllers/PluginController.php:26
 * @route '/dashboard/settings/plugins'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\PluginController::store
 * @see app/Http/Controllers/PluginController.php:26
 * @route '/dashboard/settings/plugins'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PluginController::store
 * @see app/Http/Controllers/PluginController.php:26
 * @route '/dashboard/settings/plugins'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PluginController::store
 * @see app/Http/Controllers/PluginController.php:26
 * @route '/dashboard/settings/plugins'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\PluginController::toggle
 * @see app/Http/Controllers/PluginController.php:43
 * @route '/dashboard/settings/plugins/{module}/toggle'
 */
export const toggle = (args: { module: string | number } | [module: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: toggle.url(args, options),
    method: 'put',
})

toggle.definition = {
    methods: ["put"],
    url: '/dashboard/settings/plugins/{module}/toggle',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\PluginController::toggle
 * @see app/Http/Controllers/PluginController.php:43
 * @route '/dashboard/settings/plugins/{module}/toggle'
 */
toggle.url = (args: { module: string | number } | [module: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { module: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    module: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        module: args.module,
                }

    return toggle.definition.url
            .replace('{module}', parsedArgs.module.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PluginController::toggle
 * @see app/Http/Controllers/PluginController.php:43
 * @route '/dashboard/settings/plugins/{module}/toggle'
 */
toggle.put = (args: { module: string | number } | [module: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: toggle.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\PluginController::toggle
 * @see app/Http/Controllers/PluginController.php:43
 * @route '/dashboard/settings/plugins/{module}/toggle'
 */
    const toggleForm = (args: { module: string | number } | [module: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggle.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PluginController::toggle
 * @see app/Http/Controllers/PluginController.php:43
 * @route '/dashboard/settings/plugins/{module}/toggle'
 */
        toggleForm.put = (args: { module: string | number } | [module: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggle.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggle.form = toggleForm
/**
* @see \App\Http\Controllers\PluginController::seeder
 * @see app/Http/Controllers/PluginController.php:60
 * @route '/dashboard/settings/plugins/{module}/seeder'
 */
export const seeder = (args: { module: string | number } | [module: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: seeder.url(args, options),
    method: 'post',
})

seeder.definition = {
    methods: ["post"],
    url: '/dashboard/settings/plugins/{module}/seeder',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PluginController::seeder
 * @see app/Http/Controllers/PluginController.php:60
 * @route '/dashboard/settings/plugins/{module}/seeder'
 */
seeder.url = (args: { module: string | number } | [module: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { module: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    module: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        module: args.module,
                }

    return seeder.definition.url
            .replace('{module}', parsedArgs.module.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PluginController::seeder
 * @see app/Http/Controllers/PluginController.php:60
 * @route '/dashboard/settings/plugins/{module}/seeder'
 */
seeder.post = (args: { module: string | number } | [module: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: seeder.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PluginController::seeder
 * @see app/Http/Controllers/PluginController.php:60
 * @route '/dashboard/settings/plugins/{module}/seeder'
 */
    const seederForm = (args: { module: string | number } | [module: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: seeder.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PluginController::seeder
 * @see app/Http/Controllers/PluginController.php:60
 * @route '/dashboard/settings/plugins/{module}/seeder'
 */
        seederForm.post = (args: { module: string | number } | [module: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: seeder.url(args, options),
            method: 'post',
        })
    
    seeder.form = seederForm
const PluginController = { index, store, toggle, seeder }

export default PluginController