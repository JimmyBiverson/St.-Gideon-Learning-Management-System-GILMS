import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\InstructorController::show
 * @see app/Http/Controllers/InstructorController.php:60
 * @route '/instructors/{instructor}'
 */
export const show = (args: { instructor: string | number } | [instructor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/instructors/{instructor}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InstructorController::show
 * @see app/Http/Controllers/InstructorController.php:60
 * @route '/instructors/{instructor}'
 */
show.url = (args: { instructor: string | number } | [instructor: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { instructor: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    instructor: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        instructor: args.instructor,
                }

    return show.definition.url
            .replace('{instructor}', parsedArgs.instructor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InstructorController::show
 * @see app/Http/Controllers/InstructorController.php:60
 * @route '/instructors/{instructor}'
 */
show.get = (args: { instructor: string | number } | [instructor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\InstructorController::show
 * @see app/Http/Controllers/InstructorController.php:60
 * @route '/instructors/{instructor}'
 */
show.head = (args: { instructor: string | number } | [instructor: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\InstructorController::show
 * @see app/Http/Controllers/InstructorController.php:60
 * @route '/instructors/{instructor}'
 */
    const showForm = (args: { instructor: string | number } | [instructor: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\InstructorController::show
 * @see app/Http/Controllers/InstructorController.php:60
 * @route '/instructors/{instructor}'
 */
        showForm.get = (args: { instructor: string | number } | [instructor: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\InstructorController::show
 * @see app/Http/Controllers/InstructorController.php:60
 * @route '/instructors/{instructor}'
 */
        showForm.head = (args: { instructor: string | number } | [instructor: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\InstructorController::applications
 * @see app/Http/Controllers/InstructorController.php:121
 * @route '/dashboard/instructors/applications'
 */
export const applications = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: applications.url(options),
    method: 'get',
})

applications.definition = {
    methods: ["get","head"],
    url: '/dashboard/instructors/applications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InstructorController::applications
 * @see app/Http/Controllers/InstructorController.php:121
 * @route '/dashboard/instructors/applications'
 */
applications.url = (options?: RouteQueryOptions) => {
    return applications.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InstructorController::applications
 * @see app/Http/Controllers/InstructorController.php:121
 * @route '/dashboard/instructors/applications'
 */
applications.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: applications.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\InstructorController::applications
 * @see app/Http/Controllers/InstructorController.php:121
 * @route '/dashboard/instructors/applications'
 */
applications.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: applications.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\InstructorController::applications
 * @see app/Http/Controllers/InstructorController.php:121
 * @route '/dashboard/instructors/applications'
 */
    const applicationsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: applications.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\InstructorController::applications
 * @see app/Http/Controllers/InstructorController.php:121
 * @route '/dashboard/instructors/applications'
 */
        applicationsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: applications.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\InstructorController::applications
 * @see app/Http/Controllers/InstructorController.php:121
 * @route '/dashboard/instructors/applications'
 */
        applicationsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: applications.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    applications.form = applicationsForm
/**
* @see \App\Http\Controllers\InstructorController::status
 * @see app/Http/Controllers/InstructorController.php:133
 * @route '/dashboard/instructors/status/{id}'
 */
export const status = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: status.url(args, options),
    method: 'put',
})

status.definition = {
    methods: ["put"],
    url: '/dashboard/instructors/status/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\InstructorController::status
 * @see app/Http/Controllers/InstructorController.php:133
 * @route '/dashboard/instructors/status/{id}'
 */
status.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return status.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InstructorController::status
 * @see app/Http/Controllers/InstructorController.php:133
 * @route '/dashboard/instructors/status/{id}'
 */
status.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: status.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\InstructorController::status
 * @see app/Http/Controllers/InstructorController.php:133
 * @route '/dashboard/instructors/status/{id}'
 */
    const statusForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: status.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\InstructorController::status
 * @see app/Http/Controllers/InstructorController.php:133
 * @route '/dashboard/instructors/status/{id}'
 */
        statusForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: status.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    status.form = statusForm
/**
* @see \App\Http\Controllers\InstructorController::index
 * @see app/Http/Controllers/InstructorController.php:24
 * @route '/dashboard/instructors'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/instructors',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InstructorController::index
 * @see app/Http/Controllers/InstructorController.php:24
 * @route '/dashboard/instructors'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InstructorController::index
 * @see app/Http/Controllers/InstructorController.php:24
 * @route '/dashboard/instructors'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\InstructorController::index
 * @see app/Http/Controllers/InstructorController.php:24
 * @route '/dashboard/instructors'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\InstructorController::index
 * @see app/Http/Controllers/InstructorController.php:24
 * @route '/dashboard/instructors'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\InstructorController::index
 * @see app/Http/Controllers/InstructorController.php:24
 * @route '/dashboard/instructors'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\InstructorController::index
 * @see app/Http/Controllers/InstructorController.php:24
 * @route '/dashboard/instructors'
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
* @see \App\Http\Controllers\InstructorController::create
 * @see app/Http/Controllers/InstructorController.php:40
 * @route '/dashboard/instructors/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/dashboard/instructors/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InstructorController::create
 * @see app/Http/Controllers/InstructorController.php:40
 * @route '/dashboard/instructors/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InstructorController::create
 * @see app/Http/Controllers/InstructorController.php:40
 * @route '/dashboard/instructors/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\InstructorController::create
 * @see app/Http/Controllers/InstructorController.php:40
 * @route '/dashboard/instructors/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\InstructorController::create
 * @see app/Http/Controllers/InstructorController.php:40
 * @route '/dashboard/instructors/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\InstructorController::create
 * @see app/Http/Controllers/InstructorController.php:40
 * @route '/dashboard/instructors/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\InstructorController::create
 * @see app/Http/Controllers/InstructorController.php:40
 * @route '/dashboard/instructors/create'
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
* @see \App\Http\Controllers\InstructorController::store
 * @see app/Http/Controllers/InstructorController.php:50
 * @route '/dashboard/instructors'
 */
const store6d11adff626201276890d585fcb1c945 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store6d11adff626201276890d585fcb1c945.url(options),
    method: 'post',
})

store6d11adff626201276890d585fcb1c945.definition = {
    methods: ["post"],
    url: '/dashboard/instructors',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InstructorController::store
 * @see app/Http/Controllers/InstructorController.php:50
 * @route '/dashboard/instructors'
 */
store6d11adff626201276890d585fcb1c945.url = (options?: RouteQueryOptions) => {
    return store6d11adff626201276890d585fcb1c945.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InstructorController::store
 * @see app/Http/Controllers/InstructorController.php:50
 * @route '/dashboard/instructors'
 */
store6d11adff626201276890d585fcb1c945.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store6d11adff626201276890d585fcb1c945.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\InstructorController::store
 * @see app/Http/Controllers/InstructorController.php:50
 * @route '/dashboard/instructors'
 */
    const store6d11adff626201276890d585fcb1c945Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store6d11adff626201276890d585fcb1c945.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\InstructorController::store
 * @see app/Http/Controllers/InstructorController.php:50
 * @route '/dashboard/instructors'
 */
        store6d11adff626201276890d585fcb1c945Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store6d11adff626201276890d585fcb1c945.url(options),
            method: 'post',
        })
    
    store6d11adff626201276890d585fcb1c945.form = store6d11adff626201276890d585fcb1c945Form
    /**
* @see \App\Http\Controllers\InstructorController::store
 * @see app/Http/Controllers/InstructorController.php:50
 * @route '/become-instructor'
 */
const store5f0ac880426f14f2e7634bda919b1f43 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store5f0ac880426f14f2e7634bda919b1f43.url(options),
    method: 'post',
})

store5f0ac880426f14f2e7634bda919b1f43.definition = {
    methods: ["post"],
    url: '/become-instructor',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InstructorController::store
 * @see app/Http/Controllers/InstructorController.php:50
 * @route '/become-instructor'
 */
store5f0ac880426f14f2e7634bda919b1f43.url = (options?: RouteQueryOptions) => {
    return store5f0ac880426f14f2e7634bda919b1f43.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InstructorController::store
 * @see app/Http/Controllers/InstructorController.php:50
 * @route '/become-instructor'
 */
store5f0ac880426f14f2e7634bda919b1f43.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store5f0ac880426f14f2e7634bda919b1f43.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\InstructorController::store
 * @see app/Http/Controllers/InstructorController.php:50
 * @route '/become-instructor'
 */
    const store5f0ac880426f14f2e7634bda919b1f43Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store5f0ac880426f14f2e7634bda919b1f43.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\InstructorController::store
 * @see app/Http/Controllers/InstructorController.php:50
 * @route '/become-instructor'
 */
        store5f0ac880426f14f2e7634bda919b1f43Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store5f0ac880426f14f2e7634bda919b1f43.url(options),
            method: 'post',
        })
    
    store5f0ac880426f14f2e7634bda919b1f43.form = store5f0ac880426f14f2e7634bda919b1f43Form

export const store = {
    '/dashboard/instructors': store6d11adff626201276890d585fcb1c945,
    '/become-instructor': store5f0ac880426f14f2e7634bda919b1f43,
}

/**
* @see \App\Http\Controllers\InstructorController::edit
 * @see app/Http/Controllers/InstructorController.php:94
 * @route '/dashboard/instructors/{instructor}/edit'
 */
export const edit = (args: { instructor: number | { id: number } } | [instructor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/instructors/{instructor}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\InstructorController::edit
 * @see app/Http/Controllers/InstructorController.php:94
 * @route '/dashboard/instructors/{instructor}/edit'
 */
edit.url = (args: { instructor: number | { id: number } } | [instructor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { instructor: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { instructor: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    instructor: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        instructor: typeof args.instructor === 'object'
                ? args.instructor.id
                : args.instructor,
                }

    return edit.definition.url
            .replace('{instructor}', parsedArgs.instructor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InstructorController::edit
 * @see app/Http/Controllers/InstructorController.php:94
 * @route '/dashboard/instructors/{instructor}/edit'
 */
edit.get = (args: { instructor: number | { id: number } } | [instructor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\InstructorController::edit
 * @see app/Http/Controllers/InstructorController.php:94
 * @route '/dashboard/instructors/{instructor}/edit'
 */
edit.head = (args: { instructor: number | { id: number } } | [instructor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\InstructorController::edit
 * @see app/Http/Controllers/InstructorController.php:94
 * @route '/dashboard/instructors/{instructor}/edit'
 */
    const editForm = (args: { instructor: number | { id: number } } | [instructor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\InstructorController::edit
 * @see app/Http/Controllers/InstructorController.php:94
 * @route '/dashboard/instructors/{instructor}/edit'
 */
        editForm.get = (args: { instructor: number | { id: number } } | [instructor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\InstructorController::edit
 * @see app/Http/Controllers/InstructorController.php:94
 * @route '/dashboard/instructors/{instructor}/edit'
 */
        editForm.head = (args: { instructor: number | { id: number } } | [instructor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\InstructorController::destroy
 * @see app/Http/Controllers/InstructorController.php:114
 * @route '/dashboard/instructors/{instructor}'
 */
export const destroy = (args: { instructor: number | { id: number } } | [instructor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/instructors/{instructor}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\InstructorController::destroy
 * @see app/Http/Controllers/InstructorController.php:114
 * @route '/dashboard/instructors/{instructor}'
 */
destroy.url = (args: { instructor: number | { id: number } } | [instructor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { instructor: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { instructor: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    instructor: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        instructor: typeof args.instructor === 'object'
                ? args.instructor.id
                : args.instructor,
                }

    return destroy.definition.url
            .replace('{instructor}', parsedArgs.instructor.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\InstructorController::destroy
 * @see app/Http/Controllers/InstructorController.php:114
 * @route '/dashboard/instructors/{instructor}'
 */
destroy.delete = (args: { instructor: number | { id: number } } | [instructor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\InstructorController::destroy
 * @see app/Http/Controllers/InstructorController.php:114
 * @route '/dashboard/instructors/{instructor}'
 */
    const destroyForm = (args: { instructor: number | { id: number } } | [instructor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\InstructorController::destroy
 * @see app/Http/Controllers/InstructorController.php:114
 * @route '/dashboard/instructors/{instructor}'
 */
        destroyForm.delete = (args: { instructor: number | { id: number } } | [instructor: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\InstructorController::update
 * @see app/Http/Controllers/InstructorController.php:104
 * @route '/become-instructor/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/become-instructor/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InstructorController::update
 * @see app/Http/Controllers/InstructorController.php:104
 * @route '/become-instructor/{id}'
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
* @see \App\Http\Controllers\InstructorController::update
 * @see app/Http/Controllers/InstructorController.php:104
 * @route '/become-instructor/{id}'
 */
update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\InstructorController::update
 * @see app/Http/Controllers/InstructorController.php:104
 * @route '/become-instructor/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\InstructorController::update
 * @see app/Http/Controllers/InstructorController.php:104
 * @route '/become-instructor/{id}'
 */
        updateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
const InstructorController = { show, applications, status, index, create, store, edit, destroy, update }

export default InstructorController