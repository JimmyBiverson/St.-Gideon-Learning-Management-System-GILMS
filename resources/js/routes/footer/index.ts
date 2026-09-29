import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import items from './items'
import translations0c7b9f from './translations'
/**
* @see \App\Http\Controllers\SettingController::translations
 * @see app/Http/Controllers/SettingController.php:492
 * @route '/dashboard/settings/footer/translations/{locale}'
 */
export const translations = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: translations.url(args, options),
    method: 'get',
})

translations.definition = {
    methods: ["get","head"],
    url: '/dashboard/settings/footer/translations/{locale}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::translations
 * @see app/Http/Controllers/SettingController.php:492
 * @route '/dashboard/settings/footer/translations/{locale}'
 */
translations.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return translations.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::translations
 * @see app/Http/Controllers/SettingController.php:492
 * @route '/dashboard/settings/footer/translations/{locale}'
 */
translations.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: translations.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SettingController::translations
 * @see app/Http/Controllers/SettingController.php:492
 * @route '/dashboard/settings/footer/translations/{locale}'
 */
translations.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: translations.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SettingController::translations
 * @see app/Http/Controllers/SettingController.php:492
 * @route '/dashboard/settings/footer/translations/{locale}'
 */
    const translationsForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: translations.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SettingController::translations
 * @see app/Http/Controllers/SettingController.php:492
 * @route '/dashboard/settings/footer/translations/{locale}'
 */
        translationsForm.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: translations.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SettingController::translations
 * @see app/Http/Controllers/SettingController.php:492
 * @route '/dashboard/settings/footer/translations/{locale}'
 */
        translationsForm.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: translations.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    translations.form = translationsForm
const footer = {
    items: Object.assign(items, items),
translations: Object.assign(translations, translations0c7b9f),
}

export default footer