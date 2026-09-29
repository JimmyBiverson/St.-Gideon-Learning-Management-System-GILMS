import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import templates from './templates'
/**
* @see \Modules\Certification\Http\Controllers\CertificationController::index
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/certificates',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Certification\Http\Controllers\CertificationController::index
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Certification\Http\Controllers\CertificationController::index
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Certification\Http\Controllers\CertificationController::index
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Certification\Http\Controllers\CertificationController::index
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Certification\Http\Controllers\CertificationController::index
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Certification\Http\Controllers\CertificationController::index
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates'
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
* @see \Modules\Certification\Http\Controllers\CertificationController::create
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/certificates/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Certification\Http\Controllers\CertificationController::create
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Certification\Http\Controllers\CertificationController::create
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Certification\Http\Controllers\CertificationController::create
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Certification\Http\Controllers\CertificationController::create
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Certification\Http\Controllers\CertificationController::create
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Certification\Http\Controllers\CertificationController::create
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates/create'
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
* @see \Modules\Certification\Http\Controllers\CertificationController::store
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/certificates',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Certification\Http\Controllers\CertificationController::store
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Certification\Http\Controllers\CertificationController::store
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Certification\Http\Controllers\CertificationController::store
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Certification\Http\Controllers\CertificationController::store
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Certification\Http\Controllers\CertificationController::show
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:14
 * @route '/certificates/{certificate}'
 */
export const show = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/certificates/{certificate}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Certification\Http\Controllers\CertificationController::show
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:14
 * @route '/certificates/{certificate}'
 */
show.url = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { certificate: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    certificate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        certificate: args.certificate,
                }

    return show.definition.url
            .replace('{certificate}', parsedArgs.certificate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Certification\Http\Controllers\CertificationController::show
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:14
 * @route '/certificates/{certificate}'
 */
show.get = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Certification\Http\Controllers\CertificationController::show
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:14
 * @route '/certificates/{certificate}'
 */
show.head = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Certification\Http\Controllers\CertificationController::show
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:14
 * @route '/certificates/{certificate}'
 */
    const showForm = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Certification\Http\Controllers\CertificationController::show
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:14
 * @route '/certificates/{certificate}'
 */
        showForm.get = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Certification\Http\Controllers\CertificationController::show
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:14
 * @route '/certificates/{certificate}'
 */
        showForm.head = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \Modules\Certification\Http\Controllers\CertificationController::edit
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates/{certificate}/edit'
 */
export const edit = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/certificates/{certificate}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Certification\Http\Controllers\CertificationController::edit
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates/{certificate}/edit'
 */
edit.url = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { certificate: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    certificate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        certificate: args.certificate,
                }

    return edit.definition.url
            .replace('{certificate}', parsedArgs.certificate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Certification\Http\Controllers\CertificationController::edit
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates/{certificate}/edit'
 */
edit.get = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Certification\Http\Controllers\CertificationController::edit
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates/{certificate}/edit'
 */
edit.head = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Certification\Http\Controllers\CertificationController::edit
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates/{certificate}/edit'
 */
    const editForm = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Certification\Http\Controllers\CertificationController::edit
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates/{certificate}/edit'
 */
        editForm.get = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Certification\Http\Controllers\CertificationController::edit
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates/{certificate}/edit'
 */
        editForm.head = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Certification\Http\Controllers\CertificationController::update
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates/{certificate}'
 */
export const update = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/certificates/{certificate}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Certification\Http\Controllers\CertificationController::update
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates/{certificate}'
 */
update.url = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { certificate: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    certificate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        certificate: args.certificate,
                }

    return update.definition.url
            .replace('{certificate}', parsedArgs.certificate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Certification\Http\Controllers\CertificationController::update
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates/{certificate}'
 */
update.put = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Certification\Http\Controllers\CertificationController::update
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates/{certificate}'
 */
update.patch = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Certification\Http\Controllers\CertificationController::update
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates/{certificate}'
 */
    const updateForm = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Certification\Http\Controllers\CertificationController::update
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates/{certificate}'
 */
        updateForm.put = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Certification\Http\Controllers\CertificationController::update
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates/{certificate}'
 */
        updateForm.patch = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \Modules\Certification\Http\Controllers\CertificationController::destroy
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates/{certificate}'
 */
export const destroy = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/certificates/{certificate}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Certification\Http\Controllers\CertificationController::destroy
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates/{certificate}'
 */
destroy.url = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { certificate: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    certificate: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        certificate: args.certificate,
                }

    return destroy.definition.url
            .replace('{certificate}', parsedArgs.certificate.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Certification\Http\Controllers\CertificationController::destroy
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates/{certificate}'
 */
destroy.delete = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Certification\Http\Controllers\CertificationController::destroy
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates/{certificate}'
 */
    const destroyForm = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Certification\Http\Controllers\CertificationController::destroy
 * @see Modules/Certification/app/Http/Controllers/CertificationController.php:0
 * @route '/certificates/{certificate}'
 */
        destroyForm.delete = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const certificate = {
    templates: Object.assign(templates, templates),
index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default certificate