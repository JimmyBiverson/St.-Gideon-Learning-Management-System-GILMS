import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\SettingController::index
 * @see app/Http/Controllers/SettingController.php:240
 * @route '/dashboard/settings/smtp'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/settings/smtp',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::index
 * @see app/Http/Controllers/SettingController.php:240
 * @route '/dashboard/settings/smtp'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::index
 * @see app/Http/Controllers/SettingController.php:240
 * @route '/dashboard/settings/smtp'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SettingController::index
 * @see app/Http/Controllers/SettingController.php:240
 * @route '/dashboard/settings/smtp'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SettingController::index
 * @see app/Http/Controllers/SettingController.php:240
 * @route '/dashboard/settings/smtp'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SettingController::index
 * @see app/Http/Controllers/SettingController.php:240
 * @route '/dashboard/settings/smtp'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SettingController::index
 * @see app/Http/Controllers/SettingController.php:240
 * @route '/dashboard/settings/smtp'
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
* @see \App\Http\Controllers\SettingController::update
 * @see app/Http/Controllers/SettingController.php:250
 * @route '/dashboard/settings/smtp/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/dashboard/settings/smtp/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SettingController::update
 * @see app/Http/Controllers/SettingController.php:250
 * @route '/dashboard/settings/smtp/{id}'
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
* @see \App\Http\Controllers\SettingController::update
 * @see app/Http/Controllers/SettingController.php:250
 * @route '/dashboard/settings/smtp/{id}'
 */
update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SettingController::update
 * @see app/Http/Controllers/SettingController.php:250
 * @route '/dashboard/settings/smtp/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::update
 * @see app/Http/Controllers/SettingController.php:250
 * @route '/dashboard/settings/smtp/{id}'
 */
        updateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
const smtp = {
    index: Object.assign(index, index),
update: Object.assign(update, update),
}

export default smtp