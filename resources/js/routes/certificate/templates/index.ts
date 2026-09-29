import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::index
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:19
 * @route '/dashboard/certification/certificate'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/certification/certificate',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::index
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:19
 * @route '/dashboard/certification/certificate'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::index
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:19
 * @route '/dashboard/certification/certificate'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::index
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:19
 * @route '/dashboard/certification/certificate'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::index
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:19
 * @route '/dashboard/certification/certificate'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::index
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:19
 * @route '/dashboard/certification/certificate'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::index
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:19
 * @route '/dashboard/certification/certificate'
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
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::store
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:39
 * @route '/dashboard/certification/certificate'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/certification/certificate',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::store
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:39
 * @route '/dashboard/certification/certificate'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::store
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:39
 * @route '/dashboard/certification/certificate'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::store
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:39
 * @route '/dashboard/certification/certificate'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::store
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:39
 * @route '/dashboard/certification/certificate'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::edit
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:51
 * @route '/dashboard/certification/certificate/{certificate}/edit'
 */
export const edit = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/certification/certificate/{certificate}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::edit
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:51
 * @route '/dashboard/certification/certificate/{certificate}/edit'
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
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::edit
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:51
 * @route '/dashboard/certification/certificate/{certificate}/edit'
 */
edit.get = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::edit
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:51
 * @route '/dashboard/certification/certificate/{certificate}/edit'
 */
edit.head = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::edit
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:51
 * @route '/dashboard/certification/certificate/{certificate}/edit'
 */
    const editForm = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::edit
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:51
 * @route '/dashboard/certification/certificate/{certificate}/edit'
 */
        editForm.get = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::edit
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:51
 * @route '/dashboard/certification/certificate/{certificate}/edit'
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
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::destroy
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:83
 * @route '/dashboard/certification/certificate/{certificate}'
 */
export const destroy = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/certification/certificate/{certificate}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::destroy
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:83
 * @route '/dashboard/certification/certificate/{certificate}'
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
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::destroy
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:83
 * @route '/dashboard/certification/certificate/{certificate}'
 */
destroy.delete = (args: { certificate: string | number } | [certificate: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::destroy
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:83
 * @route '/dashboard/certification/certificate/{certificate}'
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
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::destroy
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:83
 * @route '/dashboard/certification/certificate/{certificate}'
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
/**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::create
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:31
 * @route '/dashboard/certification/certificate/create-certificate'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/dashboard/certification/certificate/create-certificate',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::create
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:31
 * @route '/dashboard/certification/certificate/create-certificate'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::create
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:31
 * @route '/dashboard/certification/certificate/create-certificate'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::create
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:31
 * @route '/dashboard/certification/certificate/create-certificate'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::create
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:31
 * @route '/dashboard/certification/certificate/create-certificate'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::create
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:31
 * @route '/dashboard/certification/certificate/create-certificate'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::create
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:31
 * @route '/dashboard/certification/certificate/create-certificate'
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
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::update
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:63
 * @route '/dashboard/certification/certificate/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/dashboard/certification/certificate/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::update
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:63
 * @route '/dashboard/certification/certificate/{id}'
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
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::update
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:63
 * @route '/dashboard/certification/certificate/{id}'
 */
update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::update
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:63
 * @route '/dashboard/certification/certificate/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::update
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:63
 * @route '/dashboard/certification/certificate/{id}'
 */
        updateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::activate
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:73
 * @route '/dashboard/certification/certificate/{id}/activate'
 */
export const activate = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: activate.url(args, options),
    method: 'post',
})

activate.definition = {
    methods: ["post"],
    url: '/dashboard/certification/certificate/{id}/activate',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::activate
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:73
 * @route '/dashboard/certification/certificate/{id}/activate'
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
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::activate
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:73
 * @route '/dashboard/certification/certificate/{id}/activate'
 */
activate.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: activate.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::activate
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:73
 * @route '/dashboard/certification/certificate/{id}/activate'
 */
    const activateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: activate.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Certification\Http\Controllers\CertificateTemplateController::activate
 * @see Modules/Certification/app/Http/Controllers/CertificateTemplateController.php:73
 * @route '/dashboard/certification/certificate/{id}/activate'
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