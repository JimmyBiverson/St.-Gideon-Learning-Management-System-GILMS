import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::index
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:16
 * @route '/dashboard/certification/marksheet'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/certification/marksheet',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::index
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:16
 * @route '/dashboard/certification/marksheet'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::index
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:16
 * @route '/dashboard/certification/marksheet'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::index
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:16
 * @route '/dashboard/certification/marksheet'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::index
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:16
 * @route '/dashboard/certification/marksheet'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::index
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:16
 * @route '/dashboard/certification/marksheet'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::index
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:16
 * @route '/dashboard/certification/marksheet'
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
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::store
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:36
 * @route '/dashboard/certification/marksheet'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/certification/marksheet',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::store
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:36
 * @route '/dashboard/certification/marksheet'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::store
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:36
 * @route '/dashboard/certification/marksheet'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::store
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:36
 * @route '/dashboard/certification/marksheet'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::store
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:36
 * @route '/dashboard/certification/marksheet'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::edit
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:63
 * @route '/dashboard/certification/marksheet/{marksheet}/edit'
 */
export const edit = (args: { marksheet: string | number } | [marksheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/certification/marksheet/{marksheet}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::edit
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:63
 * @route '/dashboard/certification/marksheet/{marksheet}/edit'
 */
edit.url = (args: { marksheet: string | number } | [marksheet: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { marksheet: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    marksheet: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        marksheet: args.marksheet,
                }

    return edit.definition.url
            .replace('{marksheet}', parsedArgs.marksheet.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::edit
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:63
 * @route '/dashboard/certification/marksheet/{marksheet}/edit'
 */
edit.get = (args: { marksheet: string | number } | [marksheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::edit
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:63
 * @route '/dashboard/certification/marksheet/{marksheet}/edit'
 */
edit.head = (args: { marksheet: string | number } | [marksheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::edit
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:63
 * @route '/dashboard/certification/marksheet/{marksheet}/edit'
 */
    const editForm = (args: { marksheet: string | number } | [marksheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::edit
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:63
 * @route '/dashboard/certification/marksheet/{marksheet}/edit'
 */
        editForm.get = (args: { marksheet: string | number } | [marksheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::edit
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:63
 * @route '/dashboard/certification/marksheet/{marksheet}/edit'
 */
        editForm.head = (args: { marksheet: string | number } | [marksheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::destroy
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:123
 * @route '/dashboard/certification/marksheet/{marksheet}'
 */
export const destroy = (args: { marksheet: string | number } | [marksheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/certification/marksheet/{marksheet}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::destroy
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:123
 * @route '/dashboard/certification/marksheet/{marksheet}'
 */
destroy.url = (args: { marksheet: string | number } | [marksheet: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { marksheet: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    marksheet: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        marksheet: args.marksheet,
                }

    return destroy.definition.url
            .replace('{marksheet}', parsedArgs.marksheet.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::destroy
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:123
 * @route '/dashboard/certification/marksheet/{marksheet}'
 */
destroy.delete = (args: { marksheet: string | number } | [marksheet: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::destroy
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:123
 * @route '/dashboard/certification/marksheet/{marksheet}'
 */
    const destroyForm = (args: { marksheet: string | number } | [marksheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::destroy
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:123
 * @route '/dashboard/certification/marksheet/{marksheet}'
 */
        destroyForm.delete = (args: { marksheet: string | number } | [marksheet: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::create
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:28
 * @route '/dashboard/certification/marksheet/create-marksheet'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/dashboard/certification/marksheet/create-marksheet',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::create
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:28
 * @route '/dashboard/certification/marksheet/create-marksheet'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::create
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:28
 * @route '/dashboard/certification/marksheet/create-marksheet'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::create
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:28
 * @route '/dashboard/certification/marksheet/create-marksheet'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::create
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:28
 * @route '/dashboard/certification/marksheet/create-marksheet'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::create
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:28
 * @route '/dashboard/certification/marksheet/create-marksheet'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::create
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:28
 * @route '/dashboard/certification/marksheet/create-marksheet'
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
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::update
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:75
 * @route '/dashboard/certification/marksheet/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/dashboard/certification/marksheet/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::update
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:75
 * @route '/dashboard/certification/marksheet/{id}'
 */
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::update
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:75
 * @route '/dashboard/certification/marksheet/{id}'
 */
update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::update
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:75
 * @route '/dashboard/certification/marksheet/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::update
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:75
 * @route '/dashboard/certification/marksheet/{id}'
 */
        updateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::activate
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:107
 * @route '/dashboard/certification/marksheet/{id}/activate'
 */
export const activate = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: activate.url(args, options),
    method: 'post',
})

activate.definition = {
    methods: ["post"],
    url: '/dashboard/certification/marksheet/{id}/activate',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::activate
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:107
 * @route '/dashboard/certification/marksheet/{id}/activate'
 */
activate.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return activate.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::activate
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:107
 * @route '/dashboard/certification/marksheet/{id}/activate'
 */
activate.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: activate.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::activate
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:107
 * @route '/dashboard/certification/marksheet/{id}/activate'
 */
    const activateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: activate.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Certification\Http\Controllers\MarksheetTemplateController::activate
 * @see Modules/Certification/app/Http/Controllers/MarksheetTemplateController.php:107
 * @route '/dashboard/certification/marksheet/{id}/activate'
 */
        activateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: activate.url(args, options),
            method: 'post',
        })
    
    activate.form = activateForm
const templates = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
destroy: Object.assign(destroy, destroy),
create: Object.assign(create, create),
update: Object.assign(update, update),
activate: Object.assign(activate, activate),
}

export default templates