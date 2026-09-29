import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SettingController::auth0
 * @see app/Http/Controllers/SettingController.php:264
 * @route '/dashboard/settings/auth0'
 */
export const auth0 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: auth0.url(options),
    method: 'get',
})

auth0.definition = {
    methods: ["get","head"],
    url: '/dashboard/settings/auth0',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::auth0
 * @see app/Http/Controllers/SettingController.php:264
 * @route '/dashboard/settings/auth0'
 */
auth0.url = (options?: RouteQueryOptions) => {
    return auth0.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::auth0
 * @see app/Http/Controllers/SettingController.php:264
 * @route '/dashboard/settings/auth0'
 */
auth0.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: auth0.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SettingController::auth0
 * @see app/Http/Controllers/SettingController.php:264
 * @route '/dashboard/settings/auth0'
 */
auth0.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: auth0.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SettingController::auth0
 * @see app/Http/Controllers/SettingController.php:264
 * @route '/dashboard/settings/auth0'
 */
    const auth0Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: auth0.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SettingController::auth0
 * @see app/Http/Controllers/SettingController.php:264
 * @route '/dashboard/settings/auth0'
 */
        auth0Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: auth0.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SettingController::auth0
 * @see app/Http/Controllers/SettingController.php:264
 * @route '/dashboard/settings/auth0'
 */
        auth0Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: auth0.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    auth0.form = auth0Form
/**
* @see \App\Http\Controllers\SettingController::auth0_update
 * @see app/Http/Controllers/SettingController.php:274
 * @route '/dashboard/settings/auth0/{id}'
 */
export const auth0_update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: auth0_update.url(args, options),
    method: 'post',
})

auth0_update.definition = {
    methods: ["post"],
    url: '/dashboard/settings/auth0/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SettingController::auth0_update
 * @see app/Http/Controllers/SettingController.php:274
 * @route '/dashboard/settings/auth0/{id}'
 */
auth0_update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return auth0_update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::auth0_update
 * @see app/Http/Controllers/SettingController.php:274
 * @route '/dashboard/settings/auth0/{id}'
 */
auth0_update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: auth0_update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SettingController::auth0_update
 * @see app/Http/Controllers/SettingController.php:274
 * @route '/dashboard/settings/auth0/{id}'
 */
    const auth0_updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: auth0_update.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::auth0_update
 * @see app/Http/Controllers/SettingController.php:274
 * @route '/dashboard/settings/auth0/{id}'
 */
        auth0_updateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: auth0_update.url(args, options),
            method: 'post',
        })
    
    auth0_update.form = auth0_updateForm
/**
* @see \App\Http\Controllers\SettingController::system
 * @see app/Http/Controllers/SettingController.php:67
 * @route '/dashboard/settings/system'
 */
export const system = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: system.url(options),
    method: 'get',
})

system.definition = {
    methods: ["get","head"],
    url: '/dashboard/settings/system',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::system
 * @see app/Http/Controllers/SettingController.php:67
 * @route '/dashboard/settings/system'
 */
system.url = (options?: RouteQueryOptions) => {
    return system.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::system
 * @see app/Http/Controllers/SettingController.php:67
 * @route '/dashboard/settings/system'
 */
system.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: system.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SettingController::system
 * @see app/Http/Controllers/SettingController.php:67
 * @route '/dashboard/settings/system'
 */
system.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: system.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SettingController::system
 * @see app/Http/Controllers/SettingController.php:67
 * @route '/dashboard/settings/system'
 */
    const systemForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: system.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SettingController::system
 * @see app/Http/Controllers/SettingController.php:67
 * @route '/dashboard/settings/system'
 */
        systemForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: system.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SettingController::system
 * @see app/Http/Controllers/SettingController.php:67
 * @route '/dashboard/settings/system'
 */
        systemForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: system.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    system.form = systemForm
/**
* @see \App\Http\Controllers\SettingController::system_update
 * @see app/Http/Controllers/SettingController.php:95
 * @route '/dashboard/settings/system/{id}'
 */
export const system_update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: system_update.url(args, options),
    method: 'post',
})

system_update.definition = {
    methods: ["post"],
    url: '/dashboard/settings/system/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SettingController::system_update
 * @see app/Http/Controllers/SettingController.php:95
 * @route '/dashboard/settings/system/{id}'
 */
system_update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return system_update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::system_update
 * @see app/Http/Controllers/SettingController.php:95
 * @route '/dashboard/settings/system/{id}'
 */
system_update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: system_update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SettingController::system_update
 * @see app/Http/Controllers/SettingController.php:95
 * @route '/dashboard/settings/system/{id}'
 */
    const system_updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: system_update.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::system_update
 * @see app/Http/Controllers/SettingController.php:95
 * @route '/dashboard/settings/system/{id}'
 */
        system_updateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: system_update.url(args, options),
            method: 'post',
        })
    
    system_update.form = system_updateForm
/**
* @see \App\Http\Controllers\SettingController::system_translations
 * @see app/Http/Controllers/SettingController.php:105
 * @route '/dashboard/settings/system/translations/{locale}'
 */
export const system_translations = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: system_translations.url(args, options),
    method: 'get',
})

system_translations.definition = {
    methods: ["get","head"],
    url: '/dashboard/settings/system/translations/{locale}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::system_translations
 * @see app/Http/Controllers/SettingController.php:105
 * @route '/dashboard/settings/system/translations/{locale}'
 */
system_translations.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { locale: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                }

    return system_translations.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::system_translations
 * @see app/Http/Controllers/SettingController.php:105
 * @route '/dashboard/settings/system/translations/{locale}'
 */
system_translations.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: system_translations.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SettingController::system_translations
 * @see app/Http/Controllers/SettingController.php:105
 * @route '/dashboard/settings/system/translations/{locale}'
 */
system_translations.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: system_translations.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SettingController::system_translations
 * @see app/Http/Controllers/SettingController.php:105
 * @route '/dashboard/settings/system/translations/{locale}'
 */
    const system_translationsForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: system_translations.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SettingController::system_translations
 * @see app/Http/Controllers/SettingController.php:105
 * @route '/dashboard/settings/system/translations/{locale}'
 */
        system_translationsForm.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: system_translations.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SettingController::system_translations
 * @see app/Http/Controllers/SettingController.php:105
 * @route '/dashboard/settings/system/translations/{locale}'
 */
        system_translationsForm.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: system_translations.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    system_translations.form = system_translationsForm
/**
* @see \App\Http\Controllers\SettingController::system_translations_update
 * @see app/Http/Controllers/SettingController.php:119
 * @route '/dashboard/settings/system/translations/{locale}'
 */
export const system_translations_update = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: system_translations_update.url(args, options),
    method: 'put',
})

system_translations_update.definition = {
    methods: ["put"],
    url: '/dashboard/settings/system/translations/{locale}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SettingController::system_translations_update
 * @see app/Http/Controllers/SettingController.php:119
 * @route '/dashboard/settings/system/translations/{locale}'
 */
system_translations_update.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { locale: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                }

    return system_translations_update.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::system_translations_update
 * @see app/Http/Controllers/SettingController.php:119
 * @route '/dashboard/settings/system/translations/{locale}'
 */
system_translations_update.put = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: system_translations_update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\SettingController::system_translations_update
 * @see app/Http/Controllers/SettingController.php:119
 * @route '/dashboard/settings/system/translations/{locale}'
 */
    const system_translations_updateForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: system_translations_update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::system_translations_update
 * @see app/Http/Controllers/SettingController.php:119
 * @route '/dashboard/settings/system/translations/{locale}'
 */
        system_translations_updateForm.put = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: system_translations_update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    system_translations_update.form = system_translations_updateForm
/**
* @see \App\Http\Controllers\SettingController::pages
 * @see app/Http/Controllers/SettingController.php:142
 * @route '/dashboard/settings/pages'
 */
export const pages = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pages.url(options),
    method: 'get',
})

pages.definition = {
    methods: ["get","head"],
    url: '/dashboard/settings/pages',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::pages
 * @see app/Http/Controllers/SettingController.php:142
 * @route '/dashboard/settings/pages'
 */
pages.url = (options?: RouteQueryOptions) => {
    return pages.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::pages
 * @see app/Http/Controllers/SettingController.php:142
 * @route '/dashboard/settings/pages'
 */
pages.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: pages.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SettingController::pages
 * @see app/Http/Controllers/SettingController.php:142
 * @route '/dashboard/settings/pages'
 */
pages.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: pages.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SettingController::pages
 * @see app/Http/Controllers/SettingController.php:142
 * @route '/dashboard/settings/pages'
 */
    const pagesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: pages.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SettingController::pages
 * @see app/Http/Controllers/SettingController.php:142
 * @route '/dashboard/settings/pages'
 */
        pagesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pages.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SettingController::pages
 * @see app/Http/Controllers/SettingController.php:142
 * @route '/dashboard/settings/pages'
 */
        pagesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: pages.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    pages.form = pagesForm
/**
* @see \App\Http\Controllers\SettingController::home_pages_update
 * @see app/Http/Controllers/SettingController.php:153
 * @route '/dashboard/settings/home-page/{id}'
 */
export const home_pages_update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: home_pages_update.url(args, options),
    method: 'post',
})

home_pages_update.definition = {
    methods: ["post"],
    url: '/dashboard/settings/home-page/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SettingController::home_pages_update
 * @see app/Http/Controllers/SettingController.php:153
 * @route '/dashboard/settings/home-page/{id}'
 */
home_pages_update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return home_pages_update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::home_pages_update
 * @see app/Http/Controllers/SettingController.php:153
 * @route '/dashboard/settings/home-page/{id}'
 */
home_pages_update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: home_pages_update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SettingController::home_pages_update
 * @see app/Http/Controllers/SettingController.php:153
 * @route '/dashboard/settings/home-page/{id}'
 */
    const home_pages_updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: home_pages_update.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::home_pages_update
 * @see app/Http/Controllers/SettingController.php:153
 * @route '/dashboard/settings/home-page/{id}'
 */
        home_pages_updateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: home_pages_update.url(args, options),
            method: 'post',
        })
    
    home_pages_update.form = home_pages_updateForm
/**
* @see \App\Http\Controllers\SettingController::system_type_update
 * @see app/Http/Controllers/SettingController.php:166
 * @route '/dashboard/settings/system-type'
 */
export const system_type_update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: system_type_update.url(options),
    method: 'post',
})

system_type_update.definition = {
    methods: ["post"],
    url: '/dashboard/settings/system-type',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SettingController::system_type_update
 * @see app/Http/Controllers/SettingController.php:166
 * @route '/dashboard/settings/system-type'
 */
system_type_update.url = (options?: RouteQueryOptions) => {
    return system_type_update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::system_type_update
 * @see app/Http/Controllers/SettingController.php:166
 * @route '/dashboard/settings/system-type'
 */
system_type_update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: system_type_update.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SettingController::system_type_update
 * @see app/Http/Controllers/SettingController.php:166
 * @route '/dashboard/settings/system-type'
 */
    const system_type_updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: system_type_update.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::system_type_update
 * @see app/Http/Controllers/SettingController.php:166
 * @route '/dashboard/settings/system-type'
 */
        system_type_updateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: system_type_update.url(options),
            method: 'post',
        })
    
    system_type_update.form = system_type_updateForm
/**
* @see \App\Http\Controllers\SettingController::custom_pages_edit
 * @see app/Http/Controllers/SettingController.php:177
 * @route '/dashboard/settings/custom-page/{id}'
 */
export const custom_pages_edit = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: custom_pages_edit.url(args, options),
    method: 'get',
})

custom_pages_edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/settings/custom-page/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::custom_pages_edit
 * @see app/Http/Controllers/SettingController.php:177
 * @route '/dashboard/settings/custom-page/{id}'
 */
custom_pages_edit.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return custom_pages_edit.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::custom_pages_edit
 * @see app/Http/Controllers/SettingController.php:177
 * @route '/dashboard/settings/custom-page/{id}'
 */
custom_pages_edit.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: custom_pages_edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SettingController::custom_pages_edit
 * @see app/Http/Controllers/SettingController.php:177
 * @route '/dashboard/settings/custom-page/{id}'
 */
custom_pages_edit.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: custom_pages_edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SettingController::custom_pages_edit
 * @see app/Http/Controllers/SettingController.php:177
 * @route '/dashboard/settings/custom-page/{id}'
 */
    const custom_pages_editForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: custom_pages_edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SettingController::custom_pages_edit
 * @see app/Http/Controllers/SettingController.php:177
 * @route '/dashboard/settings/custom-page/{id}'
 */
        custom_pages_editForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: custom_pages_edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SettingController::custom_pages_edit
 * @see app/Http/Controllers/SettingController.php:177
 * @route '/dashboard/settings/custom-page/{id}'
 */
        custom_pages_editForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: custom_pages_edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    custom_pages_edit.form = custom_pages_editForm
/**
* @see \App\Http\Controllers\SettingController::custom_pages_store
 * @see app/Http/Controllers/SettingController.php:184
 * @route '/dashboard/settings/custom-page'
 */
export const custom_pages_store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: custom_pages_store.url(options),
    method: 'post',
})

custom_pages_store.definition = {
    methods: ["post"],
    url: '/dashboard/settings/custom-page',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SettingController::custom_pages_store
 * @see app/Http/Controllers/SettingController.php:184
 * @route '/dashboard/settings/custom-page'
 */
custom_pages_store.url = (options?: RouteQueryOptions) => {
    return custom_pages_store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::custom_pages_store
 * @see app/Http/Controllers/SettingController.php:184
 * @route '/dashboard/settings/custom-page'
 */
custom_pages_store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: custom_pages_store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SettingController::custom_pages_store
 * @see app/Http/Controllers/SettingController.php:184
 * @route '/dashboard/settings/custom-page'
 */
    const custom_pages_storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: custom_pages_store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::custom_pages_store
 * @see app/Http/Controllers/SettingController.php:184
 * @route '/dashboard/settings/custom-page'
 */
        custom_pages_storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: custom_pages_store.url(options),
            method: 'post',
        })
    
    custom_pages_store.form = custom_pages_storeForm
/**
* @see \App\Http\Controllers\SettingController::custom_pages_update
 * @see app/Http/Controllers/SettingController.php:191
 * @route '/dashboard/settings/custom-page/{id}'
 */
export const custom_pages_update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: custom_pages_update.url(args, options),
    method: 'put',
})

custom_pages_update.definition = {
    methods: ["put"],
    url: '/dashboard/settings/custom-page/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SettingController::custom_pages_update
 * @see app/Http/Controllers/SettingController.php:191
 * @route '/dashboard/settings/custom-page/{id}'
 */
custom_pages_update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return custom_pages_update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::custom_pages_update
 * @see app/Http/Controllers/SettingController.php:191
 * @route '/dashboard/settings/custom-page/{id}'
 */
custom_pages_update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: custom_pages_update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\SettingController::custom_pages_update
 * @see app/Http/Controllers/SettingController.php:191
 * @route '/dashboard/settings/custom-page/{id}'
 */
    const custom_pages_updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: custom_pages_update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::custom_pages_update
 * @see app/Http/Controllers/SettingController.php:191
 * @route '/dashboard/settings/custom-page/{id}'
 */
        custom_pages_updateForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: custom_pages_update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    custom_pages_update.form = custom_pages_updateForm
/**
* @see \App\Http\Controllers\SettingController::custom_pages_destroy
 * @see app/Http/Controllers/SettingController.php:198
 * @route '/dashboard/settings/custom-page/{id}'
 */
export const custom_pages_destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: custom_pages_destroy.url(args, options),
    method: 'delete',
})

custom_pages_destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/settings/custom-page/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SettingController::custom_pages_destroy
 * @see app/Http/Controllers/SettingController.php:198
 * @route '/dashboard/settings/custom-page/{id}'
 */
custom_pages_destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return custom_pages_destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::custom_pages_destroy
 * @see app/Http/Controllers/SettingController.php:198
 * @route '/dashboard/settings/custom-page/{id}'
 */
custom_pages_destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: custom_pages_destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\SettingController::custom_pages_destroy
 * @see app/Http/Controllers/SettingController.php:198
 * @route '/dashboard/settings/custom-page/{id}'
 */
    const custom_pages_destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: custom_pages_destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::custom_pages_destroy
 * @see app/Http/Controllers/SettingController.php:198
 * @route '/dashboard/settings/custom-page/{id}'
 */
        custom_pages_destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: custom_pages_destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    custom_pages_destroy.form = custom_pages_destroyForm
/**
* @see \App\Http\Controllers\SettingController::storage
 * @see app/Http/Controllers/SettingController.php:218
 * @route '/dashboard/settings/storage'
 */
export const storage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: storage.url(options),
    method: 'get',
})

storage.definition = {
    methods: ["get","head"],
    url: '/dashboard/settings/storage',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::storage
 * @see app/Http/Controllers/SettingController.php:218
 * @route '/dashboard/settings/storage'
 */
storage.url = (options?: RouteQueryOptions) => {
    return storage.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::storage
 * @see app/Http/Controllers/SettingController.php:218
 * @route '/dashboard/settings/storage'
 */
storage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: storage.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SettingController::storage
 * @see app/Http/Controllers/SettingController.php:218
 * @route '/dashboard/settings/storage'
 */
storage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: storage.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SettingController::storage
 * @see app/Http/Controllers/SettingController.php:218
 * @route '/dashboard/settings/storage'
 */
    const storageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: storage.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SettingController::storage
 * @see app/Http/Controllers/SettingController.php:218
 * @route '/dashboard/settings/storage'
 */
        storageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: storage.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SettingController::storage
 * @see app/Http/Controllers/SettingController.php:218
 * @route '/dashboard/settings/storage'
 */
        storageForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: storage.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    storage.form = storageForm
/**
* @see \App\Http\Controllers\SettingController::storage_update
 * @see app/Http/Controllers/SettingController.php:229
 * @route '/dashboard/settings/storage/{id}'
 */
export const storage_update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storage_update.url(args, options),
    method: 'post',
})

storage_update.definition = {
    methods: ["post"],
    url: '/dashboard/settings/storage/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SettingController::storage_update
 * @see app/Http/Controllers/SettingController.php:229
 * @route '/dashboard/settings/storage/{id}'
 */
storage_update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return storage_update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::storage_update
 * @see app/Http/Controllers/SettingController.php:229
 * @route '/dashboard/settings/storage/{id}'
 */
storage_update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storage_update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SettingController::storage_update
 * @see app/Http/Controllers/SettingController.php:229
 * @route '/dashboard/settings/storage/{id}'
 */
    const storage_updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storage_update.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::storage_update
 * @see app/Http/Controllers/SettingController.php:229
 * @route '/dashboard/settings/storage/{id}'
 */
        storage_updateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storage_update.url(args, options),
            method: 'post',
        })
    
    storage_update.form = storage_updateForm
/**
* @see \App\Http\Controllers\SettingController::smtp
 * @see app/Http/Controllers/SettingController.php:240
 * @route '/dashboard/settings/smtp'
 */
export const smtp = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: smtp.url(options),
    method: 'get',
})

smtp.definition = {
    methods: ["get","head"],
    url: '/dashboard/settings/smtp',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::smtp
 * @see app/Http/Controllers/SettingController.php:240
 * @route '/dashboard/settings/smtp'
 */
smtp.url = (options?: RouteQueryOptions) => {
    return smtp.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::smtp
 * @see app/Http/Controllers/SettingController.php:240
 * @route '/dashboard/settings/smtp'
 */
smtp.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: smtp.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SettingController::smtp
 * @see app/Http/Controllers/SettingController.php:240
 * @route '/dashboard/settings/smtp'
 */
smtp.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: smtp.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SettingController::smtp
 * @see app/Http/Controllers/SettingController.php:240
 * @route '/dashboard/settings/smtp'
 */
    const smtpForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: smtp.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SettingController::smtp
 * @see app/Http/Controllers/SettingController.php:240
 * @route '/dashboard/settings/smtp'
 */
        smtpForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: smtp.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SettingController::smtp
 * @see app/Http/Controllers/SettingController.php:240
 * @route '/dashboard/settings/smtp'
 */
        smtpForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: smtp.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    smtp.form = smtpForm
/**
* @see \App\Http\Controllers\SettingController::smtp_update
 * @see app/Http/Controllers/SettingController.php:250
 * @route '/dashboard/settings/smtp/{id}'
 */
export const smtp_update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: smtp_update.url(args, options),
    method: 'post',
})

smtp_update.definition = {
    methods: ["post"],
    url: '/dashboard/settings/smtp/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SettingController::smtp_update
 * @see app/Http/Controllers/SettingController.php:250
 * @route '/dashboard/settings/smtp/{id}'
 */
smtp_update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return smtp_update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::smtp_update
 * @see app/Http/Controllers/SettingController.php:250
 * @route '/dashboard/settings/smtp/{id}'
 */
smtp_update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: smtp_update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SettingController::smtp_update
 * @see app/Http/Controllers/SettingController.php:250
 * @route '/dashboard/settings/smtp/{id}'
 */
    const smtp_updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: smtp_update.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::smtp_update
 * @see app/Http/Controllers/SettingController.php:250
 * @route '/dashboard/settings/smtp/{id}'
 */
        smtp_updateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: smtp_update.url(args, options),
            method: 'post',
        })
    
    smtp_update.form = smtp_updateForm
/**
* @see \App\Http\Controllers\SettingController::maintenance
 * @see app/Http/Controllers/SettingController.php:284
 * @route '/dashboard/settings/maintenance'
 */
export const maintenance = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: maintenance.url(options),
    method: 'get',
})

maintenance.definition = {
    methods: ["get","head"],
    url: '/dashboard/settings/maintenance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::maintenance
 * @see app/Http/Controllers/SettingController.php:284
 * @route '/dashboard/settings/maintenance'
 */
maintenance.url = (options?: RouteQueryOptions) => {
    return maintenance.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::maintenance
 * @see app/Http/Controllers/SettingController.php:284
 * @route '/dashboard/settings/maintenance'
 */
maintenance.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: maintenance.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SettingController::maintenance
 * @see app/Http/Controllers/SettingController.php:284
 * @route '/dashboard/settings/maintenance'
 */
maintenance.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: maintenance.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SettingController::maintenance
 * @see app/Http/Controllers/SettingController.php:284
 * @route '/dashboard/settings/maintenance'
 */
    const maintenanceForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: maintenance.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SettingController::maintenance
 * @see app/Http/Controllers/SettingController.php:284
 * @route '/dashboard/settings/maintenance'
 */
        maintenanceForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: maintenance.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SettingController::maintenance
 * @see app/Http/Controllers/SettingController.php:284
 * @route '/dashboard/settings/maintenance'
 */
        maintenanceForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: maintenance.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    maintenance.form = maintenanceForm
/**
* @see \App\Http\Controllers\SettingController::live_class
 * @see app/Http/Controllers/SettingController.php:294
 * @route '/dashboard/settings/live-class'
 */
export const live_class = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: live_class.url(options),
    method: 'get',
})

live_class.definition = {
    methods: ["get","head"],
    url: '/dashboard/settings/live-class',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::live_class
 * @see app/Http/Controllers/SettingController.php:294
 * @route '/dashboard/settings/live-class'
 */
live_class.url = (options?: RouteQueryOptions) => {
    return live_class.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::live_class
 * @see app/Http/Controllers/SettingController.php:294
 * @route '/dashboard/settings/live-class'
 */
live_class.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: live_class.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SettingController::live_class
 * @see app/Http/Controllers/SettingController.php:294
 * @route '/dashboard/settings/live-class'
 */
live_class.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: live_class.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SettingController::live_class
 * @see app/Http/Controllers/SettingController.php:294
 * @route '/dashboard/settings/live-class'
 */
    const live_classForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: live_class.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SettingController::live_class
 * @see app/Http/Controllers/SettingController.php:294
 * @route '/dashboard/settings/live-class'
 */
        live_classForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: live_class.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SettingController::live_class
 * @see app/Http/Controllers/SettingController.php:294
 * @route '/dashboard/settings/live-class'
 */
        live_classForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: live_class.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    live_class.form = live_classForm
/**
* @see \App\Http\Controllers\SettingController::live_class_update
 * @see app/Http/Controllers/SettingController.php:304
 * @route '/dashboard/settings/live-class/{id}'
 */
export const live_class_update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: live_class_update.url(args, options),
    method: 'post',
})

live_class_update.definition = {
    methods: ["post"],
    url: '/dashboard/settings/live-class/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SettingController::live_class_update
 * @see app/Http/Controllers/SettingController.php:304
 * @route '/dashboard/settings/live-class/{id}'
 */
live_class_update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return live_class_update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::live_class_update
 * @see app/Http/Controllers/SettingController.php:304
 * @route '/dashboard/settings/live-class/{id}'
 */
live_class_update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: live_class_update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SettingController::live_class_update
 * @see app/Http/Controllers/SettingController.php:304
 * @route '/dashboard/settings/live-class/{id}'
 */
    const live_class_updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: live_class_update.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::live_class_update
 * @see app/Http/Controllers/SettingController.php:304
 * @route '/dashboard/settings/live-class/{id}'
 */
        live_class_updateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: live_class_update.url(args, options),
            method: 'post',
        })
    
    live_class_update.form = live_class_updateForm
/**
* @see \App\Http\Controllers\SettingController::meta_pixel
 * @see app/Http/Controllers/SettingController.php:318
 * @route '/dashboard/settings/meta-pixel'
 */
export const meta_pixel = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: meta_pixel.url(options),
    method: 'get',
})

meta_pixel.definition = {
    methods: ["get","head"],
    url: '/dashboard/settings/meta-pixel',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::meta_pixel
 * @see app/Http/Controllers/SettingController.php:318
 * @route '/dashboard/settings/meta-pixel'
 */
meta_pixel.url = (options?: RouteQueryOptions) => {
    return meta_pixel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::meta_pixel
 * @see app/Http/Controllers/SettingController.php:318
 * @route '/dashboard/settings/meta-pixel'
 */
meta_pixel.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: meta_pixel.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SettingController::meta_pixel
 * @see app/Http/Controllers/SettingController.php:318
 * @route '/dashboard/settings/meta-pixel'
 */
meta_pixel.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: meta_pixel.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SettingController::meta_pixel
 * @see app/Http/Controllers/SettingController.php:318
 * @route '/dashboard/settings/meta-pixel'
 */
    const meta_pixelForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: meta_pixel.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SettingController::meta_pixel
 * @see app/Http/Controllers/SettingController.php:318
 * @route '/dashboard/settings/meta-pixel'
 */
        meta_pixelForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: meta_pixel.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SettingController::meta_pixel
 * @see app/Http/Controllers/SettingController.php:318
 * @route '/dashboard/settings/meta-pixel'
 */
        meta_pixelForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: meta_pixel.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    meta_pixel.form = meta_pixelForm
/**
* @see \App\Http\Controllers\SettingController::meta_pixel_update
 * @see app/Http/Controllers/SettingController.php:328
 * @route '/dashboard/settings/meta-pixel/{id}'
 */
export const meta_pixel_update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: meta_pixel_update.url(args, options),
    method: 'post',
})

meta_pixel_update.definition = {
    methods: ["post"],
    url: '/dashboard/settings/meta-pixel/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SettingController::meta_pixel_update
 * @see app/Http/Controllers/SettingController.php:328
 * @route '/dashboard/settings/meta-pixel/{id}'
 */
meta_pixel_update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return meta_pixel_update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::meta_pixel_update
 * @see app/Http/Controllers/SettingController.php:328
 * @route '/dashboard/settings/meta-pixel/{id}'
 */
meta_pixel_update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: meta_pixel_update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SettingController::meta_pixel_update
 * @see app/Http/Controllers/SettingController.php:328
 * @route '/dashboard/settings/meta-pixel/{id}'
 */
    const meta_pixel_updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: meta_pixel_update.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::meta_pixel_update
 * @see app/Http/Controllers/SettingController.php:328
 * @route '/dashboard/settings/meta-pixel/{id}'
 */
        meta_pixel_updateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: meta_pixel_update.url(args, options),
            method: 'post',
        })
    
    meta_pixel_update.form = meta_pixel_updateForm
/**
* @see \App\Http\Controllers\SettingController::google_analytics
 * @see app/Http/Controllers/SettingController.php:338
 * @route '/dashboard/settings/google-analytics'
 */
export const google_analytics = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: google_analytics.url(options),
    method: 'get',
})

google_analytics.definition = {
    methods: ["get","head"],
    url: '/dashboard/settings/google-analytics',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::google_analytics
 * @see app/Http/Controllers/SettingController.php:338
 * @route '/dashboard/settings/google-analytics'
 */
google_analytics.url = (options?: RouteQueryOptions) => {
    return google_analytics.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::google_analytics
 * @see app/Http/Controllers/SettingController.php:338
 * @route '/dashboard/settings/google-analytics'
 */
google_analytics.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: google_analytics.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SettingController::google_analytics
 * @see app/Http/Controllers/SettingController.php:338
 * @route '/dashboard/settings/google-analytics'
 */
google_analytics.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: google_analytics.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SettingController::google_analytics
 * @see app/Http/Controllers/SettingController.php:338
 * @route '/dashboard/settings/google-analytics'
 */
    const google_analyticsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: google_analytics.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SettingController::google_analytics
 * @see app/Http/Controllers/SettingController.php:338
 * @route '/dashboard/settings/google-analytics'
 */
        google_analyticsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: google_analytics.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SettingController::google_analytics
 * @see app/Http/Controllers/SettingController.php:338
 * @route '/dashboard/settings/google-analytics'
 */
        google_analyticsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: google_analytics.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    google_analytics.form = google_analyticsForm
/**
* @see \App\Http\Controllers\SettingController::google_analytics_update
 * @see app/Http/Controllers/SettingController.php:348
 * @route '/dashboard/settings/google-analytics/{id}'
 */
export const google_analytics_update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: google_analytics_update.url(args, options),
    method: 'post',
})

google_analytics_update.definition = {
    methods: ["post"],
    url: '/dashboard/settings/google-analytics/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SettingController::google_analytics_update
 * @see app/Http/Controllers/SettingController.php:348
 * @route '/dashboard/settings/google-analytics/{id}'
 */
google_analytics_update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return google_analytics_update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::google_analytics_update
 * @see app/Http/Controllers/SettingController.php:348
 * @route '/dashboard/settings/google-analytics/{id}'
 */
google_analytics_update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: google_analytics_update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SettingController::google_analytics_update
 * @see app/Http/Controllers/SettingController.php:348
 * @route '/dashboard/settings/google-analytics/{id}'
 */
    const google_analytics_updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: google_analytics_update.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::google_analytics_update
 * @see app/Http/Controllers/SettingController.php:348
 * @route '/dashboard/settings/google-analytics/{id}'
 */
        google_analytics_updateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: google_analytics_update.url(args, options),
            method: 'post',
        })
    
    google_analytics_update.form = google_analytics_updateForm
/**
* @see \App\Http\Controllers\SettingController::navbar_items_store
 * @see app/Http/Controllers/SettingController.php:358
 * @route '/dashboard/settings/navbar/{navbar}/items'
 */
export const navbar_items_store = (args: { navbar: number | { id: number } } | [navbar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: navbar_items_store.url(args, options),
    method: 'post',
})

navbar_items_store.definition = {
    methods: ["post"],
    url: '/dashboard/settings/navbar/{navbar}/items',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SettingController::navbar_items_store
 * @see app/Http/Controllers/SettingController.php:358
 * @route '/dashboard/settings/navbar/{navbar}/items'
 */
navbar_items_store.url = (args: { navbar: number | { id: number } } | [navbar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return navbar_items_store.definition.url
            .replace('{navbar}', parsedArgs.navbar.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::navbar_items_store
 * @see app/Http/Controllers/SettingController.php:358
 * @route '/dashboard/settings/navbar/{navbar}/items'
 */
navbar_items_store.post = (args: { navbar: number | { id: number } } | [navbar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: navbar_items_store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SettingController::navbar_items_store
 * @see app/Http/Controllers/SettingController.php:358
 * @route '/dashboard/settings/navbar/{navbar}/items'
 */
    const navbar_items_storeForm = (args: { navbar: number | { id: number } } | [navbar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: navbar_items_store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::navbar_items_store
 * @see app/Http/Controllers/SettingController.php:358
 * @route '/dashboard/settings/navbar/{navbar}/items'
 */
        navbar_items_storeForm.post = (args: { navbar: number | { id: number } } | [navbar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: navbar_items_store.url(args, options),
            method: 'post',
        })
    
    navbar_items_store.form = navbar_items_storeForm
/**
* @see \App\Http\Controllers\SettingController::navbar_items_update
 * @see app/Http/Controllers/SettingController.php:372
 * @route '/dashboard/settings/navbar-items/{item}'
 */
export const navbar_items_update = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: navbar_items_update.url(args, options),
    method: 'put',
})

navbar_items_update.definition = {
    methods: ["put"],
    url: '/dashboard/settings/navbar-items/{item}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SettingController::navbar_items_update
 * @see app/Http/Controllers/SettingController.php:372
 * @route '/dashboard/settings/navbar-items/{item}'
 */
navbar_items_update.url = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return navbar_items_update.definition.url
            .replace('{item}', parsedArgs.item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::navbar_items_update
 * @see app/Http/Controllers/SettingController.php:372
 * @route '/dashboard/settings/navbar-items/{item}'
 */
navbar_items_update.put = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: navbar_items_update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\SettingController::navbar_items_update
 * @see app/Http/Controllers/SettingController.php:372
 * @route '/dashboard/settings/navbar-items/{item}'
 */
    const navbar_items_updateForm = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: navbar_items_update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::navbar_items_update
 * @see app/Http/Controllers/SettingController.php:372
 * @route '/dashboard/settings/navbar-items/{item}'
 */
        navbar_items_updateForm.put = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: navbar_items_update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    navbar_items_update.form = navbar_items_updateForm
/**
* @see \App\Http\Controllers\SettingController::navbar_items_destroy
 * @see app/Http/Controllers/SettingController.php:386
 * @route '/dashboard/settings/navbar-items/{item}'
 */
export const navbar_items_destroy = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: navbar_items_destroy.url(args, options),
    method: 'delete',
})

navbar_items_destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/settings/navbar-items/{item}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SettingController::navbar_items_destroy
 * @see app/Http/Controllers/SettingController.php:386
 * @route '/dashboard/settings/navbar-items/{item}'
 */
navbar_items_destroy.url = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return navbar_items_destroy.definition.url
            .replace('{item}', parsedArgs.item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::navbar_items_destroy
 * @see app/Http/Controllers/SettingController.php:386
 * @route '/dashboard/settings/navbar-items/{item}'
 */
navbar_items_destroy.delete = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: navbar_items_destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\SettingController::navbar_items_destroy
 * @see app/Http/Controllers/SettingController.php:386
 * @route '/dashboard/settings/navbar-items/{item}'
 */
    const navbar_items_destroyForm = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: navbar_items_destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::navbar_items_destroy
 * @see app/Http/Controllers/SettingController.php:386
 * @route '/dashboard/settings/navbar-items/{item}'
 */
        navbar_items_destroyForm.delete = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: navbar_items_destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    navbar_items_destroy.form = navbar_items_destroyForm
/**
* @see \App\Http\Controllers\SettingController::navbar_items_reorder
 * @see app/Http/Controllers/SettingController.php:400
 * @route '/dashboard/settings/navbar-items/reorder'
 */
export const navbar_items_reorder = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: navbar_items_reorder.url(options),
    method: 'post',
})

navbar_items_reorder.definition = {
    methods: ["post"],
    url: '/dashboard/settings/navbar-items/reorder',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SettingController::navbar_items_reorder
 * @see app/Http/Controllers/SettingController.php:400
 * @route '/dashboard/settings/navbar-items/reorder'
 */
navbar_items_reorder.url = (options?: RouteQueryOptions) => {
    return navbar_items_reorder.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::navbar_items_reorder
 * @see app/Http/Controllers/SettingController.php:400
 * @route '/dashboard/settings/navbar-items/reorder'
 */
navbar_items_reorder.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: navbar_items_reorder.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SettingController::navbar_items_reorder
 * @see app/Http/Controllers/SettingController.php:400
 * @route '/dashboard/settings/navbar-items/reorder'
 */
    const navbar_items_reorderForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: navbar_items_reorder.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::navbar_items_reorder
 * @see app/Http/Controllers/SettingController.php:400
 * @route '/dashboard/settings/navbar-items/reorder'
 */
        navbar_items_reorderForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: navbar_items_reorder.url(options),
            method: 'post',
        })
    
    navbar_items_reorder.form = navbar_items_reorderForm
/**
* @see \App\Http\Controllers\SettingController::footer_items_store
 * @see app/Http/Controllers/SettingController.php:414
 * @route '/dashboard/settings/footer/{footer}/items'
 */
export const footer_items_store = (args: { footer: number | { id: number } } | [footer: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: footer_items_store.url(args, options),
    method: 'post',
})

footer_items_store.definition = {
    methods: ["post"],
    url: '/dashboard/settings/footer/{footer}/items',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SettingController::footer_items_store
 * @see app/Http/Controllers/SettingController.php:414
 * @route '/dashboard/settings/footer/{footer}/items'
 */
footer_items_store.url = (args: { footer: number | { id: number } } | [footer: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return footer_items_store.definition.url
            .replace('{footer}', parsedArgs.footer.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::footer_items_store
 * @see app/Http/Controllers/SettingController.php:414
 * @route '/dashboard/settings/footer/{footer}/items'
 */
footer_items_store.post = (args: { footer: number | { id: number } } | [footer: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: footer_items_store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SettingController::footer_items_store
 * @see app/Http/Controllers/SettingController.php:414
 * @route '/dashboard/settings/footer/{footer}/items'
 */
    const footer_items_storeForm = (args: { footer: number | { id: number } } | [footer: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: footer_items_store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::footer_items_store
 * @see app/Http/Controllers/SettingController.php:414
 * @route '/dashboard/settings/footer/{footer}/items'
 */
        footer_items_storeForm.post = (args: { footer: number | { id: number } } | [footer: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: footer_items_store.url(args, options),
            method: 'post',
        })
    
    footer_items_store.form = footer_items_storeForm
/**
* @see \App\Http\Controllers\SettingController::footer_items_update
 * @see app/Http/Controllers/SettingController.php:428
 * @route '/dashboard/settings/footer-items/{item}'
 */
export const footer_items_update = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: footer_items_update.url(args, options),
    method: 'put',
})

footer_items_update.definition = {
    methods: ["put"],
    url: '/dashboard/settings/footer-items/{item}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SettingController::footer_items_update
 * @see app/Http/Controllers/SettingController.php:428
 * @route '/dashboard/settings/footer-items/{item}'
 */
footer_items_update.url = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return footer_items_update.definition.url
            .replace('{item}', parsedArgs.item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::footer_items_update
 * @see app/Http/Controllers/SettingController.php:428
 * @route '/dashboard/settings/footer-items/{item}'
 */
footer_items_update.put = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: footer_items_update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\SettingController::footer_items_update
 * @see app/Http/Controllers/SettingController.php:428
 * @route '/dashboard/settings/footer-items/{item}'
 */
    const footer_items_updateForm = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: footer_items_update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::footer_items_update
 * @see app/Http/Controllers/SettingController.php:428
 * @route '/dashboard/settings/footer-items/{item}'
 */
        footer_items_updateForm.put = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: footer_items_update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    footer_items_update.form = footer_items_updateForm
/**
* @see \App\Http\Controllers\SettingController::footer_items_destroy
 * @see app/Http/Controllers/SettingController.php:442
 * @route '/dashboard/settings/footer-items/{item}'
 */
export const footer_items_destroy = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: footer_items_destroy.url(args, options),
    method: 'delete',
})

footer_items_destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/settings/footer-items/{item}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SettingController::footer_items_destroy
 * @see app/Http/Controllers/SettingController.php:442
 * @route '/dashboard/settings/footer-items/{item}'
 */
footer_items_destroy.url = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return footer_items_destroy.definition.url
            .replace('{item}', parsedArgs.item.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::footer_items_destroy
 * @see app/Http/Controllers/SettingController.php:442
 * @route '/dashboard/settings/footer-items/{item}'
 */
footer_items_destroy.delete = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: footer_items_destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\SettingController::footer_items_destroy
 * @see app/Http/Controllers/SettingController.php:442
 * @route '/dashboard/settings/footer-items/{item}'
 */
    const footer_items_destroyForm = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: footer_items_destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::footer_items_destroy
 * @see app/Http/Controllers/SettingController.php:442
 * @route '/dashboard/settings/footer-items/{item}'
 */
        footer_items_destroyForm.delete = (args: { item: number | { id: number } } | [item: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: footer_items_destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    footer_items_destroy.form = footer_items_destroyForm
/**
* @see \App\Http\Controllers\SettingController::footer_items_reorder
 * @see app/Http/Controllers/SettingController.php:456
 * @route '/dashboard/settings/footer-items/reorder'
 */
export const footer_items_reorder = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: footer_items_reorder.url(options),
    method: 'post',
})

footer_items_reorder.definition = {
    methods: ["post"],
    url: '/dashboard/settings/footer-items/reorder',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SettingController::footer_items_reorder
 * @see app/Http/Controllers/SettingController.php:456
 * @route '/dashboard/settings/footer-items/reorder'
 */
footer_items_reorder.url = (options?: RouteQueryOptions) => {
    return footer_items_reorder.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::footer_items_reorder
 * @see app/Http/Controllers/SettingController.php:456
 * @route '/dashboard/settings/footer-items/reorder'
 */
footer_items_reorder.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: footer_items_reorder.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SettingController::footer_items_reorder
 * @see app/Http/Controllers/SettingController.php:456
 * @route '/dashboard/settings/footer-items/reorder'
 */
    const footer_items_reorderForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: footer_items_reorder.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::footer_items_reorder
 * @see app/Http/Controllers/SettingController.php:456
 * @route '/dashboard/settings/footer-items/reorder'
 */
        footer_items_reorderForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: footer_items_reorder.url(options),
            method: 'post',
        })
    
    footer_items_reorder.form = footer_items_reorderForm
/**
* @see \App\Http\Controllers\SettingController::navbar_translations
 * @see app/Http/Controllers/SettingController.php:470
 * @route '/dashboard/settings/navbar/translations/{locale}'
 */
export const navbar_translations = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: navbar_translations.url(args, options),
    method: 'get',
})

navbar_translations.definition = {
    methods: ["get","head"],
    url: '/dashboard/settings/navbar/translations/{locale}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::navbar_translations
 * @see app/Http/Controllers/SettingController.php:470
 * @route '/dashboard/settings/navbar/translations/{locale}'
 */
navbar_translations.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { locale: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                }

    return navbar_translations.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::navbar_translations
 * @see app/Http/Controllers/SettingController.php:470
 * @route '/dashboard/settings/navbar/translations/{locale}'
 */
navbar_translations.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: navbar_translations.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SettingController::navbar_translations
 * @see app/Http/Controllers/SettingController.php:470
 * @route '/dashboard/settings/navbar/translations/{locale}'
 */
navbar_translations.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: navbar_translations.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SettingController::navbar_translations
 * @see app/Http/Controllers/SettingController.php:470
 * @route '/dashboard/settings/navbar/translations/{locale}'
 */
    const navbar_translationsForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: navbar_translations.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SettingController::navbar_translations
 * @see app/Http/Controllers/SettingController.php:470
 * @route '/dashboard/settings/navbar/translations/{locale}'
 */
        navbar_translationsForm.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: navbar_translations.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SettingController::navbar_translations
 * @see app/Http/Controllers/SettingController.php:470
 * @route '/dashboard/settings/navbar/translations/{locale}'
 */
        navbar_translationsForm.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: navbar_translations.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    navbar_translations.form = navbar_translationsForm
/**
* @see \App\Http\Controllers\SettingController::navbar_translations_update
 * @see app/Http/Controllers/SettingController.php:480
 * @route '/dashboard/settings/navbar/translations/{locale}'
 */
export const navbar_translations_update = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: navbar_translations_update.url(args, options),
    method: 'put',
})

navbar_translations_update.definition = {
    methods: ["put"],
    url: '/dashboard/settings/navbar/translations/{locale}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SettingController::navbar_translations_update
 * @see app/Http/Controllers/SettingController.php:480
 * @route '/dashboard/settings/navbar/translations/{locale}'
 */
navbar_translations_update.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { locale: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                }

    return navbar_translations_update.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::navbar_translations_update
 * @see app/Http/Controllers/SettingController.php:480
 * @route '/dashboard/settings/navbar/translations/{locale}'
 */
navbar_translations_update.put = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: navbar_translations_update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\SettingController::navbar_translations_update
 * @see app/Http/Controllers/SettingController.php:480
 * @route '/dashboard/settings/navbar/translations/{locale}'
 */
    const navbar_translations_updateForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: navbar_translations_update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::navbar_translations_update
 * @see app/Http/Controllers/SettingController.php:480
 * @route '/dashboard/settings/navbar/translations/{locale}'
 */
        navbar_translations_updateForm.put = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: navbar_translations_update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    navbar_translations_update.form = navbar_translations_updateForm
/**
* @see \App\Http\Controllers\SettingController::footer_translations
 * @see app/Http/Controllers/SettingController.php:492
 * @route '/dashboard/settings/footer/translations/{locale}'
 */
export const footer_translations = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: footer_translations.url(args, options),
    method: 'get',
})

footer_translations.definition = {
    methods: ["get","head"],
    url: '/dashboard/settings/footer/translations/{locale}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::footer_translations
 * @see app/Http/Controllers/SettingController.php:492
 * @route '/dashboard/settings/footer/translations/{locale}'
 */
footer_translations.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { locale: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                }

    return footer_translations.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::footer_translations
 * @see app/Http/Controllers/SettingController.php:492
 * @route '/dashboard/settings/footer/translations/{locale}'
 */
footer_translations.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: footer_translations.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SettingController::footer_translations
 * @see app/Http/Controllers/SettingController.php:492
 * @route '/dashboard/settings/footer/translations/{locale}'
 */
footer_translations.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: footer_translations.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SettingController::footer_translations
 * @see app/Http/Controllers/SettingController.php:492
 * @route '/dashboard/settings/footer/translations/{locale}'
 */
    const footer_translationsForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: footer_translations.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SettingController::footer_translations
 * @see app/Http/Controllers/SettingController.php:492
 * @route '/dashboard/settings/footer/translations/{locale}'
 */
        footer_translationsForm.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: footer_translations.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SettingController::footer_translations
 * @see app/Http/Controllers/SettingController.php:492
 * @route '/dashboard/settings/footer/translations/{locale}'
 */
        footer_translationsForm.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: footer_translations.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    footer_translations.form = footer_translationsForm
/**
* @see \App\Http\Controllers\SettingController::footer_translations_update
 * @see app/Http/Controllers/SettingController.php:502
 * @route '/dashboard/settings/footer/translations/{locale}'
 */
export const footer_translations_update = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: footer_translations_update.url(args, options),
    method: 'put',
})

footer_translations_update.definition = {
    methods: ["put"],
    url: '/dashboard/settings/footer/translations/{locale}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\SettingController::footer_translations_update
 * @see app/Http/Controllers/SettingController.php:502
 * @route '/dashboard/settings/footer/translations/{locale}'
 */
footer_translations_update.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { locale: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                }

    return footer_translations_update.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::footer_translations_update
 * @see app/Http/Controllers/SettingController.php:502
 * @route '/dashboard/settings/footer/translations/{locale}'
 */
footer_translations_update.put = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: footer_translations_update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\SettingController::footer_translations_update
 * @see app/Http/Controllers/SettingController.php:502
 * @route '/dashboard/settings/footer/translations/{locale}'
 */
    const footer_translations_updateForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: footer_translations_update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::footer_translations_update
 * @see app/Http/Controllers/SettingController.php:502
 * @route '/dashboard/settings/footer/translations/{locale}'
 */
        footer_translations_updateForm.put = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: footer_translations_update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    footer_translations_update.form = footer_translations_updateForm
/**
* @see \App\Http\Controllers\SettingController::account
 * @see app/Http/Controllers/SettingController.php:42
 * @route '/dashboard/settings/account'
 */
export const account = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: account.url(options),
    method: 'get',
})

account.definition = {
    methods: ["get","head"],
    url: '/dashboard/settings/account',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::account
 * @see app/Http/Controllers/SettingController.php:42
 * @route '/dashboard/settings/account'
 */
account.url = (options?: RouteQueryOptions) => {
    return account.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::account
 * @see app/Http/Controllers/SettingController.php:42
 * @route '/dashboard/settings/account'
 */
account.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: account.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SettingController::account
 * @see app/Http/Controllers/SettingController.php:42
 * @route '/dashboard/settings/account'
 */
account.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: account.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SettingController::account
 * @see app/Http/Controllers/SettingController.php:42
 * @route '/dashboard/settings/account'
 */
    const accountForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: account.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SettingController::account
 * @see app/Http/Controllers/SettingController.php:42
 * @route '/dashboard/settings/account'
 */
        accountForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: account.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SettingController::account
 * @see app/Http/Controllers/SettingController.php:42
 * @route '/dashboard/settings/account'
 */
        accountForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: account.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    account.form = accountForm
/**
* @see \App\Http\Controllers\SettingController::profile_update
 * @see app/Http/Controllers/SettingController.php:55
 * @route '/dashboard/settings/account/profile'
 */
export const profile_update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: profile_update.url(options),
    method: 'post',
})

profile_update.definition = {
    methods: ["post"],
    url: '/dashboard/settings/account/profile',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SettingController::profile_update
 * @see app/Http/Controllers/SettingController.php:55
 * @route '/dashboard/settings/account/profile'
 */
profile_update.url = (options?: RouteQueryOptions) => {
    return profile_update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::profile_update
 * @see app/Http/Controllers/SettingController.php:55
 * @route '/dashboard/settings/account/profile'
 */
profile_update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: profile_update.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SettingController::profile_update
 * @see app/Http/Controllers/SettingController.php:55
 * @route '/dashboard/settings/account/profile'
 */
    const profile_updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: profile_update.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::profile_update
 * @see app/Http/Controllers/SettingController.php:55
 * @route '/dashboard/settings/account/profile'
 */
        profile_updateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: profile_update.url(options),
            method: 'post',
        })
    
    profile_update.form = profile_updateForm
const SettingController = { auth0, auth0_update, system, system_update, system_translations, system_translations_update, pages, home_pages_update, system_type_update, custom_pages_edit, custom_pages_store, custom_pages_update, custom_pages_destroy, storage, storage_update, smtp, smtp_update, maintenance, live_class, live_class_update, meta_pixel, meta_pixel_update, google_analytics, google_analytics_update, navbar_items_store, navbar_items_update, navbar_items_destroy, navbar_items_reorder, footer_items_store, footer_items_update, footer_items_destroy, footer_items_reorder, navbar_translations, navbar_translations_update, footer_translations, footer_translations_update, account, profile_update }

export default SettingController