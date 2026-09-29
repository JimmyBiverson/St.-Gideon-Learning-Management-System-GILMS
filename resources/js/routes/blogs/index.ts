import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import categories from './categories'
import comments from './comments'
/**
* @see \Modules\Blog\Http\Controllers\BlogController::visit
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:44
 * @route '/blogs/{category}'
 */
export const visit = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: visit.url(args, options),
    method: 'get',
})

visit.definition = {
    methods: ["get","head"],
    url: '/blogs/{category}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Blog\Http\Controllers\BlogController::visit
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:44
 * @route '/blogs/{category}'
 */
visit.url = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: args.category,
                }

    return visit.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Blog\Http\Controllers\BlogController::visit
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:44
 * @route '/blogs/{category}'
 */
visit.get = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: visit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Blog\Http\Controllers\BlogController::visit
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:44
 * @route '/blogs/{category}'
 */
visit.head = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: visit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Blog\Http\Controllers\BlogController::visit
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:44
 * @route '/blogs/{category}'
 */
    const visitForm = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: visit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Blog\Http\Controllers\BlogController::visit
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:44
 * @route '/blogs/{category}'
 */
        visitForm.get = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: visit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Blog\Http\Controllers\BlogController::visit
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:44
 * @route '/blogs/{category}'
 */
        visitForm.head = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: visit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    visit.form = visitForm
/**
* @see \Modules\Blog\Http\Controllers\BlogController::read
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:99
 * @route '/read/blogs/{uuid}'
 */
export const read = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: read.url(args, options),
    method: 'get',
})

read.definition = {
    methods: ["get","head"],
    url: '/read/blogs/{uuid}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Blog\Http\Controllers\BlogController::read
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:99
 * @route '/read/blogs/{uuid}'
 */
read.url = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { uuid: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    uuid: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        uuid: args.uuid,
                }

    return read.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Blog\Http\Controllers\BlogController::read
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:99
 * @route '/read/blogs/{uuid}'
 */
read.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: read.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Blog\Http\Controllers\BlogController::read
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:99
 * @route '/read/blogs/{uuid}'
 */
read.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: read.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Blog\Http\Controllers\BlogController::read
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:99
 * @route '/read/blogs/{uuid}'
 */
    const readForm = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: read.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Blog\Http\Controllers\BlogController::read
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:99
 * @route '/read/blogs/{uuid}'
 */
        readForm.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: read.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Blog\Http\Controllers\BlogController::read
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:99
 * @route '/read/blogs/{uuid}'
 */
        readForm.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: read.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    read.form = readForm
/**
* @see \Modules\Blog\Http\Controllers\BlogController::index
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:29
 * @route '/dashboard/blogs'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/blogs',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Blog\Http\Controllers\BlogController::index
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:29
 * @route '/dashboard/blogs'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Blog\Http\Controllers\BlogController::index
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:29
 * @route '/dashboard/blogs'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Blog\Http\Controllers\BlogController::index
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:29
 * @route '/dashboard/blogs'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Blog\Http\Controllers\BlogController::index
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:29
 * @route '/dashboard/blogs'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Blog\Http\Controllers\BlogController::index
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:29
 * @route '/dashboard/blogs'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Blog\Http\Controllers\BlogController::index
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:29
 * @route '/dashboard/blogs'
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
* @see \Modules\Blog\Http\Controllers\BlogController::create
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:74
 * @route '/dashboard/blogs/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/dashboard/blogs/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Blog\Http\Controllers\BlogController::create
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:74
 * @route '/dashboard/blogs/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Blog\Http\Controllers\BlogController::create
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:74
 * @route '/dashboard/blogs/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Blog\Http\Controllers\BlogController::create
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:74
 * @route '/dashboard/blogs/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Blog\Http\Controllers\BlogController::create
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:74
 * @route '/dashboard/blogs/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Blog\Http\Controllers\BlogController::create
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:74
 * @route '/dashboard/blogs/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Blog\Http\Controllers\BlogController::create
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:74
 * @route '/dashboard/blogs/create'
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
* @see \Modules\Blog\Http\Controllers\BlogController::store
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:89
 * @route '/dashboard/blogs'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/blogs',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Blog\Http\Controllers\BlogController::store
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:89
 * @route '/dashboard/blogs'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Blog\Http\Controllers\BlogController::store
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:89
 * @route '/dashboard/blogs'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Blog\Http\Controllers\BlogController::store
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:89
 * @route '/dashboard/blogs'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Blog\Http\Controllers\BlogController::store
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:89
 * @route '/dashboard/blogs'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Blog\Http\Controllers\BlogController::edit
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:149
 * @route '/dashboard/blogs/{blog}/edit'
 */
export const edit = (args: { blog: number | { id: number } } | [blog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/blogs/{blog}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Blog\Http\Controllers\BlogController::edit
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:149
 * @route '/dashboard/blogs/{blog}/edit'
 */
edit.url = (args: { blog: number | { id: number } } | [blog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { blog: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { blog: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    blog: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        blog: typeof args.blog === 'object'
                ? args.blog.id
                : args.blog,
                }

    return edit.definition.url
            .replace('{blog}', parsedArgs.blog.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Blog\Http\Controllers\BlogController::edit
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:149
 * @route '/dashboard/blogs/{blog}/edit'
 */
edit.get = (args: { blog: number | { id: number } } | [blog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Blog\Http\Controllers\BlogController::edit
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:149
 * @route '/dashboard/blogs/{blog}/edit'
 */
edit.head = (args: { blog: number | { id: number } } | [blog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Blog\Http\Controllers\BlogController::edit
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:149
 * @route '/dashboard/blogs/{blog}/edit'
 */
    const editForm = (args: { blog: number | { id: number } } | [blog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Blog\Http\Controllers\BlogController::edit
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:149
 * @route '/dashboard/blogs/{blog}/edit'
 */
        editForm.get = (args: { blog: number | { id: number } } | [blog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Blog\Http\Controllers\BlogController::edit
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:149
 * @route '/dashboard/blogs/{blog}/edit'
 */
        editForm.head = (args: { blog: number | { id: number } } | [blog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Blog\Http\Controllers\BlogController::destroy
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:173
 * @route '/dashboard/blogs/{blog}'
 */
export const destroy = (args: { blog: number | { id: number } } | [blog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/blogs/{blog}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Blog\Http\Controllers\BlogController::destroy
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:173
 * @route '/dashboard/blogs/{blog}'
 */
destroy.url = (args: { blog: number | { id: number } } | [blog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { blog: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { blog: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    blog: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        blog: typeof args.blog === 'object'
                ? args.blog.id
                : args.blog,
                }

    return destroy.definition.url
            .replace('{blog}', parsedArgs.blog.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Blog\Http\Controllers\BlogController::destroy
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:173
 * @route '/dashboard/blogs/{blog}'
 */
destroy.delete = (args: { blog: number | { id: number } } | [blog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Blog\Http\Controllers\BlogController::destroy
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:173
 * @route '/dashboard/blogs/{blog}'
 */
    const destroyForm = (args: { blog: number | { id: number } } | [blog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Blog\Http\Controllers\BlogController::destroy
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:173
 * @route '/dashboard/blogs/{blog}'
 */
        destroyForm.delete = (args: { blog: number | { id: number } } | [blog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Blog\Http\Controllers\BlogController::update
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:163
 * @route '/dashboard/blogs/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/dashboard/blogs/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Blog\Http\Controllers\BlogController::update
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:163
 * @route '/dashboard/blogs/{id}'
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
* @see \Modules\Blog\Http\Controllers\BlogController::update
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:163
 * @route '/dashboard/blogs/{id}'
 */
update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Blog\Http\Controllers\BlogController::update
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:163
 * @route '/dashboard/blogs/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Blog\Http\Controllers\BlogController::update
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:163
 * @route '/dashboard/blogs/{id}'
 */
        updateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \Modules\Blog\Http\Controllers\BlogController::preview
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:139
 * @route '/preview/blogs/{uuid}'
 */
export const preview = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview.url(args, options),
    method: 'get',
})

preview.definition = {
    methods: ["get","head"],
    url: '/preview/blogs/{uuid}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Blog\Http\Controllers\BlogController::preview
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:139
 * @route '/preview/blogs/{uuid}'
 */
preview.url = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { uuid: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    uuid: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        uuid: args.uuid,
                }

    return preview.definition.url
            .replace('{uuid}', parsedArgs.uuid.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Blog\Http\Controllers\BlogController::preview
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:139
 * @route '/preview/blogs/{uuid}'
 */
preview.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Blog\Http\Controllers\BlogController::preview
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:139
 * @route '/preview/blogs/{uuid}'
 */
preview.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: preview.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Blog\Http\Controllers\BlogController::preview
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:139
 * @route '/preview/blogs/{uuid}'
 */
    const previewForm = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: preview.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Blog\Http\Controllers\BlogController::preview
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:139
 * @route '/preview/blogs/{uuid}'
 */
        previewForm.get = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: preview.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Blog\Http\Controllers\BlogController::preview
 * @see Modules/Blog/app/Http/Controllers/BlogController.php:139
 * @route '/preview/blogs/{uuid}'
 */
        previewForm.head = (args: { uuid: string | number } | [uuid: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: preview.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    preview.form = previewForm
/**
* @see \Modules\Blog\Http\Controllers\BlogLikeDislikeController::likeDislike
 * @see Modules/Blog/app/Http/Controllers/BlogLikeDislikeController.php:16
 * @route '/blogs/like-dislike/toggle'
 */
export const likeDislike = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: likeDislike.url(options),
    method: 'post',
})

likeDislike.definition = {
    methods: ["post"],
    url: '/blogs/like-dislike/toggle',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Blog\Http\Controllers\BlogLikeDislikeController::likeDislike
 * @see Modules/Blog/app/Http/Controllers/BlogLikeDislikeController.php:16
 * @route '/blogs/like-dislike/toggle'
 */
likeDislike.url = (options?: RouteQueryOptions) => {
    return likeDislike.definition.url + queryParams(options)
}

/**
* @see \Modules\Blog\Http\Controllers\BlogLikeDislikeController::likeDislike
 * @see Modules/Blog/app/Http/Controllers/BlogLikeDislikeController.php:16
 * @route '/blogs/like-dislike/toggle'
 */
likeDislike.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: likeDislike.url(options),
    method: 'post',
})

    /**
* @see \Modules\Blog\Http\Controllers\BlogLikeDislikeController::likeDislike
 * @see Modules/Blog/app/Http/Controllers/BlogLikeDislikeController.php:16
 * @route '/blogs/like-dislike/toggle'
 */
    const likeDislikeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: likeDislike.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Blog\Http\Controllers\BlogLikeDislikeController::likeDislike
 * @see Modules/Blog/app/Http/Controllers/BlogLikeDislikeController.php:16
 * @route '/blogs/like-dislike/toggle'
 */
        likeDislikeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: likeDislike.url(options),
            method: 'post',
        })
    
    likeDislike.form = likeDislikeForm
const blogs = {
    visit: Object.assign(visit, visit),
read: Object.assign(read, read),
categories: Object.assign(categories, categories),
index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
destroy: Object.assign(destroy, destroy),
update: Object.assign(update, update),
preview: Object.assign(preview, preview),
likeDislike: Object.assign(likeDislike, likeDislike),
comments: Object.assign(comments, comments),
}

export default blogs