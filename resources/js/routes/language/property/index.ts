import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Language\Http\Controllers\LanguageController::edit
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:57
 * @route '/dashboard/language/property/{property}'
 */
export const edit = (args: { property: string | number } | [property: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/language/property/{property}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Language\Http\Controllers\LanguageController::edit
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:57
 * @route '/dashboard/language/property/{property}'
 */
edit.url = (args: { property: string | number } | [property: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { property: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    property: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        property: args.property,
                }

    return edit.definition.url
            .replace('{property}', parsedArgs.property.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Language\Http\Controllers\LanguageController::edit
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:57
 * @route '/dashboard/language/property/{property}'
 */
edit.get = (args: { property: string | number } | [property: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Language\Http\Controllers\LanguageController::edit
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:57
 * @route '/dashboard/language/property/{property}'
 */
edit.head = (args: { property: string | number } | [property: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Language\Http\Controllers\LanguageController::edit
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:57
 * @route '/dashboard/language/property/{property}'
 */
    const editForm = (args: { property: string | number } | [property: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Language\Http\Controllers\LanguageController::edit
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:57
 * @route '/dashboard/language/property/{property}'
 */
        editForm.get = (args: { property: string | number } | [property: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Language\Http\Controllers\LanguageController::edit
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:57
 * @route '/dashboard/language/property/{property}'
 */
        editForm.head = (args: { property: string | number } | [property: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:64
 * @route '/dashboard/language/property/{property}'
 */
export const update = (args: { property: string | number } | [property: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/language/property/{property}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Language\Http\Controllers\LanguageController::update
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:64
 * @route '/dashboard/language/property/{property}'
 */
update.url = (args: { property: string | number } | [property: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { property: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    property: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        property: args.property,
                }

    return update.definition.url
            .replace('{property}', parsedArgs.property.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Language\Http\Controllers\LanguageController::update
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:64
 * @route '/dashboard/language/property/{property}'
 */
update.put = (args: { property: string | number } | [property: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \Modules\Language\Http\Controllers\LanguageController::update
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:64
 * @route '/dashboard/language/property/{property}'
 */
    const updateForm = (args: { property: string | number } | [property: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:64
 * @route '/dashboard/language/property/{property}'
 */
        updateForm.put = (args: { property: string | number } | [property: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const property = {
    edit: Object.assign(edit, edit),
update: Object.assign(update, update),
}

export default property