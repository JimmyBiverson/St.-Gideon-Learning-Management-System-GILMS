import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\JobCircularController::show
 * @see app/Http/Controllers/JobCircularController.php:72
 * @route '/job-circulars/{job_circular}'
 */
export const show = (args: { job_circular: string | number | { uuid: string | number } } | [job_circular: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/job-circulars/{job_circular}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JobCircularController::show
 * @see app/Http/Controllers/JobCircularController.php:72
 * @route '/job-circulars/{job_circular}'
 */
show.url = (args: { job_circular: string | number | { uuid: string | number } } | [job_circular: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { job_circular: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'uuid' in args) {
            args = { job_circular: args.uuid }
        }
    
    if (Array.isArray(args)) {
        args = {
                    job_circular: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        job_circular: typeof args.job_circular === 'object'
                ? args.job_circular.uuid
                : args.job_circular,
                }

    return show.definition.url
            .replace('{job_circular}', parsedArgs.job_circular.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JobCircularController::show
 * @see app/Http/Controllers/JobCircularController.php:72
 * @route '/job-circulars/{job_circular}'
 */
show.get = (args: { job_circular: string | number | { uuid: string | number } } | [job_circular: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\JobCircularController::show
 * @see app/Http/Controllers/JobCircularController.php:72
 * @route '/job-circulars/{job_circular}'
 */
show.head = (args: { job_circular: string | number | { uuid: string | number } } | [job_circular: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\JobCircularController::show
 * @see app/Http/Controllers/JobCircularController.php:72
 * @route '/job-circulars/{job_circular}'
 */
    const showForm = (args: { job_circular: string | number | { uuid: string | number } } | [job_circular: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\JobCircularController::show
 * @see app/Http/Controllers/JobCircularController.php:72
 * @route '/job-circulars/{job_circular}'
 */
        showForm.get = (args: { job_circular: string | number | { uuid: string | number } } | [job_circular: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\JobCircularController::show
 * @see app/Http/Controllers/JobCircularController.php:72
 * @route '/job-circulars/{job_circular}'
 */
        showForm.head = (args: { job_circular: string | number | { uuid: string | number } } | [job_circular: string | number | { uuid: string | number } ] | string | number | { uuid: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\JobCircularController::index
 * @see app/Http/Controllers/JobCircularController.php:22
 * @route '/dashboard/job-circulars'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/job-circulars',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JobCircularController::index
 * @see app/Http/Controllers/JobCircularController.php:22
 * @route '/dashboard/job-circulars'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JobCircularController::index
 * @see app/Http/Controllers/JobCircularController.php:22
 * @route '/dashboard/job-circulars'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\JobCircularController::index
 * @see app/Http/Controllers/JobCircularController.php:22
 * @route '/dashboard/job-circulars'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\JobCircularController::index
 * @see app/Http/Controllers/JobCircularController.php:22
 * @route '/dashboard/job-circulars'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\JobCircularController::index
 * @see app/Http/Controllers/JobCircularController.php:22
 * @route '/dashboard/job-circulars'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\JobCircularController::index
 * @see app/Http/Controllers/JobCircularController.php:22
 * @route '/dashboard/job-circulars'
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
* @see \App\Http\Controllers\JobCircularController::create
 * @see app/Http/Controllers/JobCircularController.php:41
 * @route '/dashboard/job-circulars/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/dashboard/job-circulars/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JobCircularController::create
 * @see app/Http/Controllers/JobCircularController.php:41
 * @route '/dashboard/job-circulars/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JobCircularController::create
 * @see app/Http/Controllers/JobCircularController.php:41
 * @route '/dashboard/job-circulars/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\JobCircularController::create
 * @see app/Http/Controllers/JobCircularController.php:41
 * @route '/dashboard/job-circulars/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\JobCircularController::create
 * @see app/Http/Controllers/JobCircularController.php:41
 * @route '/dashboard/job-circulars/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\JobCircularController::create
 * @see app/Http/Controllers/JobCircularController.php:41
 * @route '/dashboard/job-circulars/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\JobCircularController::create
 * @see app/Http/Controllers/JobCircularController.php:41
 * @route '/dashboard/job-circulars/create'
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
* @see \App\Http\Controllers\JobCircularController::store
 * @see app/Http/Controllers/JobCircularController.php:54
 * @route '/dashboard/job-circulars'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/job-circulars',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\JobCircularController::store
 * @see app/Http/Controllers/JobCircularController.php:54
 * @route '/dashboard/job-circulars'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\JobCircularController::store
 * @see app/Http/Controllers/JobCircularController.php:54
 * @route '/dashboard/job-circulars'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\JobCircularController::store
 * @see app/Http/Controllers/JobCircularController.php:54
 * @route '/dashboard/job-circulars'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\JobCircularController::store
 * @see app/Http/Controllers/JobCircularController.php:54
 * @route '/dashboard/job-circulars'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\JobCircularController::edit
 * @see app/Http/Controllers/JobCircularController.php:82
 * @route '/dashboard/job-circulars/{job_circular}/edit'
 */
export const edit = (args: { job_circular: string | number } | [job_circular: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/job-circulars/{job_circular}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\JobCircularController::edit
 * @see app/Http/Controllers/JobCircularController.php:82
 * @route '/dashboard/job-circulars/{job_circular}/edit'
 */
edit.url = (args: { job_circular: string | number } | [job_circular: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { job_circular: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    job_circular: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        job_circular: args.job_circular,
                }

    return edit.definition.url
            .replace('{job_circular}', parsedArgs.job_circular.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JobCircularController::edit
 * @see app/Http/Controllers/JobCircularController.php:82
 * @route '/dashboard/job-circulars/{job_circular}/edit'
 */
edit.get = (args: { job_circular: string | number } | [job_circular: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\JobCircularController::edit
 * @see app/Http/Controllers/JobCircularController.php:82
 * @route '/dashboard/job-circulars/{job_circular}/edit'
 */
edit.head = (args: { job_circular: string | number } | [job_circular: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\JobCircularController::edit
 * @see app/Http/Controllers/JobCircularController.php:82
 * @route '/dashboard/job-circulars/{job_circular}/edit'
 */
    const editForm = (args: { job_circular: string | number } | [job_circular: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\JobCircularController::edit
 * @see app/Http/Controllers/JobCircularController.php:82
 * @route '/dashboard/job-circulars/{job_circular}/edit'
 */
        editForm.get = (args: { job_circular: string | number } | [job_circular: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\JobCircularController::edit
 * @see app/Http/Controllers/JobCircularController.php:82
 * @route '/dashboard/job-circulars/{job_circular}/edit'
 */
        editForm.head = (args: { job_circular: string | number } | [job_circular: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\JobCircularController::update
 * @see app/Http/Controllers/JobCircularController.php:96
 * @route '/dashboard/job-circulars/{job_circular}'
 */
export const update = (args: { job_circular: string | number } | [job_circular: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/job-circulars/{job_circular}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\JobCircularController::update
 * @see app/Http/Controllers/JobCircularController.php:96
 * @route '/dashboard/job-circulars/{job_circular}'
 */
update.url = (args: { job_circular: string | number } | [job_circular: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { job_circular: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    job_circular: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        job_circular: args.job_circular,
                }

    return update.definition.url
            .replace('{job_circular}', parsedArgs.job_circular.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JobCircularController::update
 * @see app/Http/Controllers/JobCircularController.php:96
 * @route '/dashboard/job-circulars/{job_circular}'
 */
update.put = (args: { job_circular: string | number } | [job_circular: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\JobCircularController::update
 * @see app/Http/Controllers/JobCircularController.php:96
 * @route '/dashboard/job-circulars/{job_circular}'
 */
update.patch = (args: { job_circular: string | number } | [job_circular: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\JobCircularController::update
 * @see app/Http/Controllers/JobCircularController.php:96
 * @route '/dashboard/job-circulars/{job_circular}'
 */
    const updateForm = (args: { job_circular: string | number } | [job_circular: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\JobCircularController::update
 * @see app/Http/Controllers/JobCircularController.php:96
 * @route '/dashboard/job-circulars/{job_circular}'
 */
        updateForm.put = (args: { job_circular: string | number } | [job_circular: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\JobCircularController::update
 * @see app/Http/Controllers/JobCircularController.php:96
 * @route '/dashboard/job-circulars/{job_circular}'
 */
        updateForm.patch = (args: { job_circular: string | number } | [job_circular: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\JobCircularController::destroy
 * @see app/Http/Controllers/JobCircularController.php:114
 * @route '/dashboard/job-circulars/{job_circular}'
 */
export const destroy = (args: { job_circular: string | number } | [job_circular: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/job-circulars/{job_circular}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\JobCircularController::destroy
 * @see app/Http/Controllers/JobCircularController.php:114
 * @route '/dashboard/job-circulars/{job_circular}'
 */
destroy.url = (args: { job_circular: string | number } | [job_circular: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { job_circular: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    job_circular: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        job_circular: args.job_circular,
                }

    return destroy.definition.url
            .replace('{job_circular}', parsedArgs.job_circular.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JobCircularController::destroy
 * @see app/Http/Controllers/JobCircularController.php:114
 * @route '/dashboard/job-circulars/{job_circular}'
 */
destroy.delete = (args: { job_circular: string | number } | [job_circular: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\JobCircularController::destroy
 * @see app/Http/Controllers/JobCircularController.php:114
 * @route '/dashboard/job-circulars/{job_circular}'
 */
    const destroyForm = (args: { job_circular: string | number } | [job_circular: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\JobCircularController::destroy
 * @see app/Http/Controllers/JobCircularController.php:114
 * @route '/dashboard/job-circulars/{job_circular}'
 */
        destroyForm.delete = (args: { job_circular: string | number } | [job_circular: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\JobCircularController::toggleStatus
 * @see app/Http/Controllers/JobCircularController.php:131
 * @route '/dashboard/job-circulars/{job_circular}/toggle-status'
 */
export const toggleStatus = (args: { job_circular: string | number } | [job_circular: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: toggleStatus.url(args, options),
    method: 'put',
})

toggleStatus.definition = {
    methods: ["put"],
    url: '/dashboard/job-circulars/{job_circular}/toggle-status',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\JobCircularController::toggleStatus
 * @see app/Http/Controllers/JobCircularController.php:131
 * @route '/dashboard/job-circulars/{job_circular}/toggle-status'
 */
toggleStatus.url = (args: { job_circular: string | number } | [job_circular: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { job_circular: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    job_circular: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        job_circular: args.job_circular,
                }

    return toggleStatus.definition.url
            .replace('{job_circular}', parsedArgs.job_circular.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\JobCircularController::toggleStatus
 * @see app/Http/Controllers/JobCircularController.php:131
 * @route '/dashboard/job-circulars/{job_circular}/toggle-status'
 */
toggleStatus.put = (args: { job_circular: string | number } | [job_circular: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: toggleStatus.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\JobCircularController::toggleStatus
 * @see app/Http/Controllers/JobCircularController.php:131
 * @route '/dashboard/job-circulars/{job_circular}/toggle-status'
 */
    const toggleStatusForm = (args: { job_circular: string | number } | [job_circular: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggleStatus.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\JobCircularController::toggleStatus
 * @see app/Http/Controllers/JobCircularController.php:131
 * @route '/dashboard/job-circulars/{job_circular}/toggle-status'
 */
        toggleStatusForm.put = (args: { job_circular: string | number } | [job_circular: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggleStatus.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    toggleStatus.form = toggleStatusForm
const jobCirculars = {
    show: Object.assign(show, show),
index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
toggleStatus: Object.assign(toggleStatus, toggleStatus),
}

export default jobCirculars