import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\SettingController::store
 * @see app/Http/Controllers/SettingController.php:414
 * @route '/dashboard/settings/footer/{footer}/items'
 */
export const store = (args: { footer: number | { id: number } } | [footer: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/settings/footer/{footer}/items',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SettingController::store
 * @see app/Http/Controllers/SettingController.php:414
 * @route '/dashboard/settings/footer/{footer}/items'
 */
store.url = (args: { footer: number | { id: number } } | [footer: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { footer: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { footer: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    footer: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        footer: typeof args.footer === 'object'
                ? args.footer.id
                : args.footer,
                }

    return store.definition.url
            .replace('{footer}', parsedArgs.footer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::store
 * @see app/Http/Controllers/SettingController.php:414
 * @route '/dashboard/settings/footer/{footer}/items'
 */
store.post = (args: { footer: number | { id: number } } | [footer: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SettingController::store
 * @see app/Http/Controllers/SettingController.php:414
 * @route '/dashboard/settings/footer/{footer}/items'
 */
    const storeForm = (args: { footer: number | { id: number } } | [footer: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::store
 * @see app/Http/Controllers/SettingController.php:414
 * @route '/dashboard/settings/footer/{footer}/items'
 */
        storeForm.post = (args: { footer: number | { id: number } } | [footer: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\SettingController::update
 * @see app/Http/Controllers/SettingController.php:428
 * @route '/dashboard/settings/footer-items/{item}'
 */
export const update = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/settings/footer-items/{item}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SettingController::update
 * @see app/Http/Controllers/SettingController.php:428
 * @route '/dashboard/settings/footer-items/{item}'
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
 * @see app/Http/Controllers/SettingController.php:428
 * @route '/dashboard/settings/footer-items/{item}'
 */
update.put = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\SettingController::update
 * @see app/Http/Controllers/SettingController.php:428
 * @route '/dashboard/settings/footer-items/{item}'
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
 * @see app/Http/Controllers/SettingController.php:428
 * @route '/dashboard/settings/footer-items/{item}'
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
 * @see app/Http/Controllers/SettingController.php:442
 * @route '/dashboard/settings/footer-items/{item}'
 */
export const destroy = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/settings/footer-items/{item}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SettingController::destroy
 * @see app/Http/Controllers/SettingController.php:442
 * @route '/dashboard/settings/footer-items/{item}'
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
 * @see app/Http/Controllers/SettingController.php:442
 * @route '/dashboard/settings/footer-items/{item}'
 */
destroy.delete = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\SettingController::destroy
 * @see app/Http/Controllers/SettingController.php:442
 * @route '/dashboard/settings/footer-items/{item}'
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
 * @see app/Http/Controllers/SettingController.php:442
 * @route '/dashboard/settings/footer-items/{item}'
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
 * @see app/Http/Controllers/SettingController.php:456
 * @route '/dashboard/settings/footer-items/reorder'
 */
export const reorder = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

reorder.definition = {
    methods: ["post"],
    url: '/dashboard/settings/footer-items/reorder',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SettingController::reorder
 * @see app/Http/Controllers/SettingController.php:456
 * @route '/dashboard/settings/footer-items/reorder'
 */
reorder.url = (options?: RouteQueryOptions) => {
    return reorder.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::reorder
 * @see app/Http/Controllers/SettingController.php:456
 * @route '/dashboard/settings/footer-items/reorder'
 */
reorder.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reorder.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SettingController::reorder
 * @see app/Http/Controllers/SettingController.php:456
 * @route '/dashboard/settings/footer-items/reorder'
 */
    const reorderForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reorder.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::reorder
 * @see app/Http/Controllers/SettingController.php:456
 * @route '/dashboard/settings/footer-items/reorder'
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