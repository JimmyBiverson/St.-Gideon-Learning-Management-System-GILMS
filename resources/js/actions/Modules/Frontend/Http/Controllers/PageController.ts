import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Frontend\Http\Controllers\PageController::index
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:23
 * @route '/dashboard/frontend/pages'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/frontend/pages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Frontend\Http\Controllers\PageController::index
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:23
 * @route '/dashboard/frontend/pages'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Frontend\Http\Controllers\PageController::index
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:23
 * @route '/dashboard/frontend/pages'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Frontend\Http\Controllers\PageController::index
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:23
 * @route '/dashboard/frontend/pages'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Frontend\Http\Controllers\PageController::index
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:23
 * @route '/dashboard/frontend/pages'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Frontend\Http\Controllers\PageController::index
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:23
 * @route '/dashboard/frontend/pages'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Frontend\Http\Controllers\PageController::index
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:23
 * @route '/dashboard/frontend/pages'
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
* @see \Modules\Frontend\Http\Controllers\PageController::store
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:44
 * @route '/dashboard/frontend/pages'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/frontend/pages',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Frontend\Http\Controllers\PageController::store
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:44
 * @route '/dashboard/frontend/pages'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Frontend\Http\Controllers\PageController::store
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:44
 * @route '/dashboard/frontend/pages'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Frontend\Http\Controllers\PageController::store
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:44
 * @route '/dashboard/frontend/pages'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Frontend\Http\Controllers\PageController::store
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:44
 * @route '/dashboard/frontend/pages'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Frontend\Http\Controllers\PageController::destroy
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:66
 * @route '/dashboard/frontend/pages/{page}'
 */
export const destroy = (args: { page: number | { id: number } } | [page: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/frontend/pages/{page}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Frontend\Http\Controllers\PageController::destroy
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:66
 * @route '/dashboard/frontend/pages/{page}'
 */
destroy.url = (args: { page: number | { id: number } } | [page: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { page: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { page: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    page: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        page: typeof args.page === 'object'
                ? args.page.id
                : args.page,
                }

    return destroy.definition.url
            .replace('{page}', parsedArgs.page.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Frontend\Http\Controllers\PageController::destroy
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:66
 * @route '/dashboard/frontend/pages/{page}'
 */
destroy.delete = (args: { page: number | { id: number } } | [page: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Frontend\Http\Controllers\PageController::destroy
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:66
 * @route '/dashboard/frontend/pages/{page}'
 */
    const destroyForm = (args: { page: number | { id: number } } | [page: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Frontend\Http\Controllers\PageController::destroy
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:66
 * @route '/dashboard/frontend/pages/{page}'
 */
        destroyForm.delete = (args: { page: number | { id: number } } | [page: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Frontend\Http\Controllers\PageController::update
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:54
 * @route '/dashboard/frontend/pages/{page}'
 */
export const update = (args: { page: number | { id: number } } | [page: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/dashboard/frontend/pages/{page}',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Frontend\Http\Controllers\PageController::update
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:54
 * @route '/dashboard/frontend/pages/{page}'
 */
update.url = (args: { page: number | { id: number } } | [page: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { page: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { page: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    page: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        page: typeof args.page === 'object'
                ? args.page.id
                : args.page,
                }

    return update.definition.url
            .replace('{page}', parsedArgs.page.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Frontend\Http\Controllers\PageController::update
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:54
 * @route '/dashboard/frontend/pages/{page}'
 */
update.post = (args: { page: number | { id: number } } | [page: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Frontend\Http\Controllers\PageController::update
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:54
 * @route '/dashboard/frontend/pages/{page}'
 */
    const updateForm = (args: { page: number | { id: number } } | [page: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Frontend\Http\Controllers\PageController::update
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:54
 * @route '/dashboard/frontend/pages/{page}'
 */
        updateForm.post = (args: { page: number | { id: number } } | [page: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \Modules\Frontend\Http\Controllers\PageController::editor
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:84
 * @route '/editor/{project}/{page}'
 */
export const editor = (args: { project: string | number, page: string | number } | [project: string | number, page: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editor.url(args, options),
    method: 'get',
})

editor.definition = {
    methods: ["get","head"],
    url: '/editor/{project}/{page}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Frontend\Http\Controllers\PageController::editor
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:84
 * @route '/editor/{project}/{page}'
 */
editor.url = (args: { project: string | number, page: string | number } | [project: string | number, page: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    project: args[0],
                    page: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project: args.project,
                                page: args.page,
                }

    return editor.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace('{page}', parsedArgs.page.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Frontend\Http\Controllers\PageController::editor
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:84
 * @route '/editor/{project}/{page}'
 */
editor.get = (args: { project: string | number, page: string | number } | [project: string | number, page: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: editor.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Frontend\Http\Controllers\PageController::editor
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:84
 * @route '/editor/{project}/{page}'
 */
editor.head = (args: { project: string | number, page: string | number } | [project: string | number, page: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: editor.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Frontend\Http\Controllers\PageController::editor
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:84
 * @route '/editor/{project}/{page}'
 */
    const editorForm = (args: { project: string | number, page: string | number } | [project: string | number, page: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: editor.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Frontend\Http\Controllers\PageController::editor
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:84
 * @route '/editor/{project}/{page}'
 */
        editorForm.get = (args: { project: string | number, page: string | number } | [project: string | number, page: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: editor.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Frontend\Http\Controllers\PageController::editor
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:84
 * @route '/editor/{project}/{page}'
 */
        editorForm.head = (args: { project: string | number, page: string | number } | [project: string | number, page: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: editor.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    editor.form = editorForm
/**
* @see \Modules\Frontend\Http\Controllers\PageController::content
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:131
 * @route '/editor/{project}/{page}'
 */
export const content = (args: { project: number | { id: number }, page: number | { id: number } } | [project: number | { id: number }, page: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: content.url(args, options),
    method: 'put',
})

content.definition = {
    methods: ["put"],
    url: '/editor/{project}/{page}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Frontend\Http\Controllers\PageController::content
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:131
 * @route '/editor/{project}/{page}'
 */
content.url = (args: { project: number | { id: number }, page: number | { id: number } } | [project: number | { id: number }, page: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    project: args[0],
                    page: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project: typeof args.project === 'object'
                ? args.project.id
                : args.project,
                                page: typeof args.page === 'object'
                ? args.page.id
                : args.page,
                }

    return content.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace('{page}', parsedArgs.page.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Frontend\Http\Controllers\PageController::content
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:131
 * @route '/editor/{project}/{page}'
 */
content.put = (args: { project: number | { id: number }, page: number | { id: number } } | [project: number | { id: number }, page: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: content.url(args, options),
    method: 'put',
})

    /**
* @see \Modules\Frontend\Http\Controllers\PageController::content
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:131
 * @route '/editor/{project}/{page}'
 */
    const contentForm = (args: { project: number | { id: number }, page: number | { id: number } } | [project: number | { id: number }, page: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: content.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Frontend\Http\Controllers\PageController::content
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:131
 * @route '/editor/{project}/{page}'
 */
        contentForm.put = (args: { project: number | { id: number }, page: number | { id: number } } | [project: number | { id: number }, page: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: content.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    content.form = contentForm
/**
* @see \Modules\Frontend\Http\Controllers\PageController::translate
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:107
 * @route '/editor/{project}/{page}/translate/{locale}'
 */
export const translate = (args: { project: string | number, page: string | number, locale: string | number } | [project: string | number, page: string | number, locale: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: translate.url(args, options),
    method: 'get',
})

translate.definition = {
    methods: ["get","head"],
    url: '/editor/{project}/{page}/translate/{locale}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Frontend\Http\Controllers\PageController::translate
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:107
 * @route '/editor/{project}/{page}/translate/{locale}'
 */
translate.url = (args: { project: string | number, page: string | number, locale: string | number } | [project: string | number, page: string | number, locale: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    project: args[0],
                    page: args[1],
                    locale: args[2],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project: args.project,
                                page: args.page,
                                locale: args.locale,
                }

    return translate.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace('{page}', parsedArgs.page.toString())
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Frontend\Http\Controllers\PageController::translate
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:107
 * @route '/editor/{project}/{page}/translate/{locale}'
 */
translate.get = (args: { project: string | number, page: string | number, locale: string | number } | [project: string | number, page: string | number, locale: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: translate.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Frontend\Http\Controllers\PageController::translate
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:107
 * @route '/editor/{project}/{page}/translate/{locale}'
 */
translate.head = (args: { project: string | number, page: string | number, locale: string | number } | [project: string | number, page: string | number, locale: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: translate.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Frontend\Http\Controllers\PageController::translate
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:107
 * @route '/editor/{project}/{page}/translate/{locale}'
 */
    const translateForm = (args: { project: string | number, page: string | number, locale: string | number } | [project: string | number, page: string | number, locale: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: translate.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Frontend\Http\Controllers\PageController::translate
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:107
 * @route '/editor/{project}/{page}/translate/{locale}'
 */
        translateForm.get = (args: { project: string | number, page: string | number, locale: string | number } | [project: string | number, page: string | number, locale: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: translate.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Frontend\Http\Controllers\PageController::translate
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:107
 * @route '/editor/{project}/{page}/translate/{locale}'
 */
        translateForm.head = (args: { project: string | number, page: string | number, locale: string | number } | [project: string | number, page: string | number, locale: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: translate.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    translate.form = translateForm
/**
* @see \Modules\Frontend\Http\Controllers\PageController::show
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:30
 * @route '/frontend/pages/{page}'
 */
export const show = (args: { page: number | { id: number } } | [page: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/frontend/pages/{page}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Frontend\Http\Controllers\PageController::show
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:30
 * @route '/frontend/pages/{page}'
 */
show.url = (args: { page: number | { id: number } } | [page: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { page: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { page: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    page: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        page: typeof args.page === 'object'
                ? args.page.id
                : args.page,
                }

    return show.definition.url
            .replace('{page}', parsedArgs.page.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Frontend\Http\Controllers\PageController::show
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:30
 * @route '/frontend/pages/{page}'
 */
show.get = (args: { page: number | { id: number } } | [page: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Frontend\Http\Controllers\PageController::show
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:30
 * @route '/frontend/pages/{page}'
 */
show.head = (args: { page: number | { id: number } } | [page: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Frontend\Http\Controllers\PageController::show
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:30
 * @route '/frontend/pages/{page}'
 */
    const showForm = (args: { page: number | { id: number } } | [page: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Frontend\Http\Controllers\PageController::show
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:30
 * @route '/frontend/pages/{page}'
 */
        showForm.get = (args: { page: number | { id: number } } | [page: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Frontend\Http\Controllers\PageController::show
 * @see Modules/Frontend/app/Http/Controllers/PageController.php:30
 * @route '/frontend/pages/{page}'
 */
        showForm.head = (args: { page: number | { id: number } } | [page: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const PageController = { index, store, destroy, update, editor, content, translate, show }

export default PageController