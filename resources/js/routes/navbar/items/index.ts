import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\SettingController::store
 * @see app/Http/Controllers/SettingController.php:358
 * @route '/dashboard/settings/navbar/{navbar}/items'
 */
export const store = (args: { navbar: number | { id: number } } | [navbar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/settings/navbar/{navbar}/items',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SettingController::store
 * @see app/Http/Controllers/SettingController.php:358
 * @route '/dashboard/settings/navbar/{navbar}/items'
 */
store.url = (args: { navbar: number | { id: number } } | [navbar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { navbar: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { navbar: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    navbar: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        navbar: typeof args.navbar === 'object'
                ? args.navbar.id
                : args.navbar,
                }

    return store.definition.url
            .replace('{navbar}', parsedArgs.navbar.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::store
 * @see app/Http/Controllers/SettingController.php:358
 * @route '/dashboard/settings/navbar/{navbar}/items'
 */
store.post = (args: { navbar: number | { id: number } } | [navbar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SettingController::store
 * @see app/Http/Controllers/SettingController.php:358
 * @route '/dashboard/settings/navbar/{navbar}/items'
 */
    const storeForm = (args: { navbar: number | { id: number } } | [navbar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::store
 * @see app/Http/Controllers/SettingController.php:358
 * @route '/dashboard/settings/navbar/{navbar}/items'
 */
        storeForm.post = (args: { navbar: number | { id: number } } | [navbar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\SettingController::update
 * @see app/Http/Controllers/SettingController.php:372
 * @route '/dashboard/settings/navbar-items/{item}'
 */
export const update = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/settings/navbar-items/{item}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SettingController::update
 * @see app/Http/Controllers/SettingController.php:372
 * @route '/dashboard/settings/navbar-items/{item}'
 */
update.url = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { item: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { item: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    item: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        item: typeof args.item === 'object'
                ? args.item.id
                : args.item,
                }

    return update.definition.url
            .replace('{item}', parsedArgs.item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::update
 * @see app/Http/Controllers/SettingController.php:372
 * @route '/dashboard/settings/navbar-items/{item}'
 */
update.put = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\SettingController::update
 * @see app/Http/Controllers/SettingController.php:372
 * @route '/dashboard/settings/navbar-items/{item}'
 */
    const updateForm = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::update
 * @see app/Http/Controllers/SettingController.php:372
 * @route '/dashboard/settings/navbar-items/{item}'
 */
        updateForm.put = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\SettingController::destroy
 * @see app/Http/Controllers/SettingController.php:386
 * @route '/dashboard/settings/navbar-items/{item}'
 */
export const destroy = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/settings/navbar-items/{item}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SettingController::destroy
 * @see app/Http/Controllers/SettingController.php:386
 * @route '/dashboard/settings/navbar-items/{item}'
 */
destroy.url = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { item: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { item: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    item: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        item: typeof args.item === 'object'
                ? args.item.id
                : args.item,
                }

    return destroy.definition.url
            .replace('{item}', parsedArgs.item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::destroy
 * @see app/Http/Controllers/SettingController.php:386
 * @route '/dashboard/settings/navbar-items/{item}'
 */
destroy.delete = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\SettingController::destroy
 * @see app/Http/Controllers/SettingController.php:386
 * @route '/dashboard/settings/navbar-items/{item}'
 */
    const destroyForm = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::destroy
 * @see app/Http/Controllers/SettingController.php:386
 * @route '/dashboard/settings/navbar-items/{item}'
 */
        destroyForm.delete = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\SettingController::reorder
 * @see app/Http/Controllers/SettingController.php:400
 * @route '/dashboard/settings/navbar-items/reorder'
 */
export const reorder = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

reorder.definition = {
    methods: ["post"],
    url: '/dashboard/settings/navbar-items/reorder',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SettingController::reorder
 * @see app/Http/Controllers/SettingController.php:400
 * @route '/dashboard/settings/navbar-items/reorder'
 */
reorder.url = (options?: RouteQueryOptions) => {
    return reorder.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::reorder
 * @see app/Http/Controllers/SettingController.php:400
 * @route '/dashboard/settings/navbar-items/reorder'
 */
reorder.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SettingController::reorder
 * @see app/Http/Controllers/SettingController.php:400
 * @route '/dashboard/settings/navbar-items/reorder'
 */
    const reorderForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reorder.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::reorder
 * @see app/Http/Controllers/SettingController.php:400
 * @route '/dashboard/settings/navbar-items/reorder'
 */
        reorderForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reorder.url(options),
            method: 'post',
        })
    
    reorder.form = reorderForm
const items = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
reorder: Object.assign(reorder, reorder),
}

export default items