import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import property from './property'
/**
* @see \Modules\Language\Http\Controllers\LanguageController::index
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:22
 * @route '/dashboard/language'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/language',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Language\Http\Controllers\LanguageController::index
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:22
 * @route '/dashboard/language'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Language\Http\Controllers\LanguageController::index
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:22
 * @route '/dashboard/language'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Language\Http\Controllers\LanguageController::index
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:22
 * @route '/dashboard/language'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Language\Http\Controllers\LanguageController::index
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:22
 * @route '/dashboard/language'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Language\Http\Controllers\LanguageController::index
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:22
 * @route '/dashboard/language'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Language\Http\Controllers\LanguageController::index
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:22
 * @route '/dashboard/language'
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
* @see \Modules\Language\Http\Controllers\LanguageController::store
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:29
 * @route '/dashboard/language'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/language',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Language\Http\Controllers\LanguageController::store
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:29
 * @route '/dashboard/language'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Language\Http\Controllers\LanguageController::store
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:29
 * @route '/dashboard/language'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Language\Http\Controllers\LanguageController::store
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:29
 * @route '/dashboard/language'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Language\Http\Controllers\LanguageController::store
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:29
 * @route '/dashboard/language'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Language\Http\Controllers\LanguageController::show
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:0
 * @route '/dashboard/language/{language}'
 */
export const show = (args: { language: string | number } | [language: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/dashboard/language/{language}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Language\Http\Controllers\LanguageController::show
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:0
 * @route '/dashboard/language/{language}'
 */
show.url = (args: { language: string | number } | [language: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { language: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    language: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        language: args.language,
                }

    return show.definition.url
            .replace('{language}', parsedArgs.language.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Language\Http\Controllers\LanguageController::show
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:0
 * @route '/dashboard/language/{language}'
 */
show.get = (args: { language: string | number } | [language: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Language\Http\Controllers\LanguageController::show
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:0
 * @route '/dashboard/language/{language}'
 */
show.head = (args: { language: string | number } | [language: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Language\Http\Controllers\LanguageController::show
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:0
 * @route '/dashboard/language/{language}'
 */
    const showForm = (args: { language: string | number } | [language: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Language\Http\Controllers\LanguageController::show
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:0
 * @route '/dashboard/language/{language}'
 */
        showForm.get = (args: { language: string | number } | [language: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Language\Http\Controllers\LanguageController::show
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:0
 * @route '/dashboard/language/{language}'
 */
        showForm.head = (args: { language: string | number } | [language: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Language\Http\Controllers\LanguageController::edit
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:43
 * @route '/dashboard/language/{language}/edit'
 */
export const edit = (args: { language: string | number } | [language: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/language/{language}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Language\Http\Controllers\LanguageController::edit
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:43
 * @route '/dashboard/language/{language}/edit'
 */
edit.url = (args: { language: string | number } | [language: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { language: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    language: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        language: args.language,
                }

    return edit.definition.url
            .replace('{language}', parsedArgs.language.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Language\Http\Controllers\LanguageController::edit
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:43
 * @route '/dashboard/language/{language}/edit'
 */
edit.get = (args: { language: string | number } | [language: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Language\Http\Controllers\LanguageController::edit
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:43
 * @route '/dashboard/language/{language}/edit'
 */
edit.head = (args: { language: string | number } | [language: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Language\Http\Controllers\LanguageController::edit
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:43
 * @route '/dashboard/language/{language}/edit'
 */
    const editForm = (args: { language: string | number } | [language: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Language\Http\Controllers\LanguageController::edit
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:43
 * @route '/dashboard/language/{language}/edit'
 */
        editForm.get = (args: { language: string | number } | [language: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Language\Http\Controllers\LanguageController::edit
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:43
 * @route '/dashboard/language/{language}/edit'
 */
        editForm.head = (args: { language: string | number } | [language: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Language\Http\Controllers\LanguageController::update
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:36
 * @route '/dashboard/language/{language}'
 */
export const update = (args: { language: string | number } | [language: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/language/{language}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Language\Http\Controllers\LanguageController::update
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:36
 * @route '/dashboard/language/{language}'
 */
update.url = (args: { language: string | number } | [language: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { language: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    language: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        language: args.language,
                }

    return update.definition.url
            .replace('{language}', parsedArgs.language.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Language\Http\Controllers\LanguageController::update
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:36
 * @route '/dashboard/language/{language}'
 */
update.put = (args: { language: string | number } | [language: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Language\Http\Controllers\LanguageController::update
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:36
 * @route '/dashboard/language/{language}'
 */
update.patch = (args: { language: string | number } | [language: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Language\Http\Controllers\LanguageController::update
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:36
 * @route '/dashboard/language/{language}'
 */
    const updateForm = (args: { language: string | number } | [language: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Language\Http\Controllers\LanguageController::update
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:36
 * @route '/dashboard/language/{language}'
 */
        updateForm.put = (args: { language: string | number } | [language: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Language\Http\Controllers\LanguageController::update
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:36
 * @route '/dashboard/language/{language}'
 */
        updateForm.patch = (args: { language: string | number } | [language: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Language\Http\Controllers\LanguageController::destroy
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:50
 * @route '/dashboard/language/{language}'
 */
export const destroy = (args: { language: string | number } | [language: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/language/{language}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Language\Http\Controllers\LanguageController::destroy
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:50
 * @route '/dashboard/language/{language}'
 */
destroy.url = (args: { language: string | number } | [language: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { language: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    language: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        language: args.language,
                }

    return destroy.definition.url
            .replace('{language}', parsedArgs.language.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Language\Http\Controllers\LanguageController::destroy
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:50
 * @route '/dashboard/language/{language}'
 */
destroy.delete = (args: { language: string | number } | [language: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Language\Http\Controllers\LanguageController::destroy
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:50
 * @route '/dashboard/language/{language}'
 */
    const destroyForm = (args: { language: string | number } | [language: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Language\Http\Controllers\LanguageController::destroy
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:50
 * @route '/dashboard/language/{language}'
 */
        destroyForm.delete = (args: { language: string | number } | [language: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Language\Http\Controllers\LanguageController::defaultMethod
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:144
 * @route '/dashboard/language/default/{id}'
 */
export const defaultMethod = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: defaultMethod.url(args, options),
    method: 'post',
})

defaultMethod.definition = {
    methods: ["post"],
    url: '/dashboard/language/default/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Language\Http\Controllers\LanguageController::defaultMethod
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:144
 * @route '/dashboard/language/default/{id}'
 */
defaultMethod.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return defaultMethod.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Language\Http\Controllers\LanguageController::defaultMethod
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:144
 * @route '/dashboard/language/default/{id}'
 */
defaultMethod.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: defaultMethod.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Language\Http\Controllers\LanguageController::defaultMethod
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:144
 * @route '/dashboard/language/default/{id}'
 */
    const defaultMethodForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: defaultMethod.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Language\Http\Controllers\LanguageController::defaultMethod
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:144
 * @route '/dashboard/language/default/{id}'
 */
        defaultMethodForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: defaultMethod.url(args, options),
            method: 'post',
        })
    
    defaultMethod.form = defaultMethodForm
const language = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
default: Object.assign(defaultMethod, defaultMethod),
property: Object.assign(property, property),
}

export default language