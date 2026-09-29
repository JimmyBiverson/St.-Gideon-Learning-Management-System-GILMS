import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \Modules\Language\Http\Controllers\LanguageController::lang
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:137
 * @route '/change-lang'
 */
export const lang = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: lang.url(options),
    method: 'post',
})

lang.definition = {
    methods: ["post"],
    url: '/change-lang',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Language\Http\Controllers\LanguageController::lang
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:137
 * @route '/change-lang'
 */
lang.url = (options?: RouteQueryOptions) => {
    return lang.definition.url + queryParams(options)
}

/**
* @see \Modules\Language\Http\Controllers\LanguageController::lang
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:137
 * @route '/change-lang'
 */
lang.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: lang.url(options),
    method: 'post',
})

    /**
* @see \Modules\Language\Http\Controllers\LanguageController::lang
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:137
 * @route '/change-lang'
 */
    const langForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: lang.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Language\Http\Controllers\LanguageController::lang
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:137
 * @route '/change-lang'
 */
        langForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: lang.url(options),
            method: 'post',
        })
    
    lang.form = langForm
/**
* @see \Modules\Language\Http\Controllers\LanguageController::direction
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:116
 * @route '/change-direction'
 */
export const direction = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: direction.url(options),
    method: 'post',
})

direction.definition = {
    methods: ["post"],
    url: '/change-direction',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Language\Http\Controllers\LanguageController::direction
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:116
 * @route '/change-direction'
 */
direction.url = (options?: RouteQueryOptions) => {
    return direction.definition.url + queryParams(options)
}

/**
* @see \Modules\Language\Http\Controllers\LanguageController::direction
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:116
 * @route '/change-direction'
 */
direction.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: direction.url(options),
    method: 'post',
})

    /**
* @see \Modules\Language\Http\Controllers\LanguageController::direction
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:116
 * @route '/change-direction'
 */
    const directionForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: direction.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Language\Http\Controllers\LanguageController::direction
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:116
 * @route '/change-direction'
 */
        directionForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: direction.url(options),
            method: 'post',
        })
    
    direction.form = directionForm
/**
* @see \Modules\Language\Http\Controllers\LanguageController::fontFamily
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:123
 * @route '/change-font-family'
 */
export const fontFamily = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: fontFamily.url(options),
    method: 'post',
})

fontFamily.definition = {
    methods: ["post"],
    url: '/change-font-family',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Language\Http\Controllers\LanguageController::fontFamily
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:123
 * @route '/change-font-family'
 */
fontFamily.url = (options?: RouteQueryOptions) => {
    return fontFamily.definition.url + queryParams(options)
}

/**
* @see \Modules\Language\Http\Controllers\LanguageController::fontFamily
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:123
 * @route '/change-font-family'
 */
fontFamily.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: fontFamily.url(options),
    method: 'post',
})

    /**
* @see \Modules\Language\Http\Controllers\LanguageController::fontFamily
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:123
 * @route '/change-font-family'
 */
    const fontFamilyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: fontFamily.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Language\Http\Controllers\LanguageController::fontFamily
 * @see Modules/Language/app/Http/Controllers/LanguageController.php:123
 * @route '/change-font-family'
 */
        fontFamilyForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: fontFamily.url(options),
            method: 'post',
        })
    
    fontFamily.form = fontFamilyForm
const change = {
    lang: Object.assign(lang, lang),
direction: Object.assign(direction, direction),
fontFamily: Object.assign(fontFamily, fontFamily),
}

export default change