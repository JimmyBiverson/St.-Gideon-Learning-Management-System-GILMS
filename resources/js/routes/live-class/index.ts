import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\SettingController::index
 * @see app/Http/Controllers/SettingController.php:294
 * @route '/dashboard/settings/live-class'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/settings/live-class',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::index
 * @see app/Http/Controllers/SettingController.php:294
 * @route '/dashboard/settings/live-class'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::index
 * @see app/Http/Controllers/SettingController.php:294
 * @route '/dashboard/settings/live-class'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SettingController::index
 * @see app/Http/Controllers/SettingController.php:294
 * @route '/dashboard/settings/live-class'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SettingController::index
 * @see app/Http/Controllers/SettingController.php:294
 * @route '/dashboard/settings/live-class'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SettingController::index
 * @see app/Http/Controllers/SettingController.php:294
 * @route '/dashboard/settings/live-class'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SettingController::index
 * @see app/Http/Controllers/SettingController.php:294
 * @route '/dashboard/settings/live-class'
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
 * @see app/Http/Controllers/SettingController.php:304
 * @route '/dashboard/settings/live-class/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/dashboard/settings/live-class/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SettingController::update
 * @see app/Http/Controllers/SettingController.php:304
 * @route '/dashboard/settings/live-class/{id}'
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
 * @see app/Http/Controllers/SettingController.php:304
 * @route '/dashboard/settings/live-class/{id}'
 */
update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SettingController::update
 * @see app/Http/Controllers/SettingController.php:304
 * @route '/dashboard/settings/live-class/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::update
 * @see app/Http/Controllers/SettingController.php:304
 * @route '/dashboard/settings/live-class/{id}'
 */
        updateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \Modules\Course\Http\Controllers\LiveClassController::start
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:23
 * @route '/live-classes/start/{id}'
 */
export const start = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: start.url(args, options),
    method: 'get',
})

start.definition = {
    methods: ["get","head"],
    url: '/live-classes/start/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\LiveClassController::start
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:23
 * @route '/live-classes/start/{id}'
 */
start.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return start.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\LiveClassController::start
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:23
 * @route '/live-classes/start/{id}'
 */
start.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: start.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\LiveClassController::start
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:23
 * @route '/live-classes/start/{id}'
 */
start.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: start.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\LiveClassController::start
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:23
 * @route '/live-classes/start/{id}'
 */
    const startForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: start.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\LiveClassController::start
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:23
 * @route '/live-classes/start/{id}'
 */
        startForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: start.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\LiveClassController::start
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:23
 * @route '/live-classes/start/{id}'
 */
        startForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: start.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    start.form = startForm
/**
* @see \Modules\Course\Http\Controllers\LiveClassController::signature
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:109
 * @route '/live-classes/signature/{id}'
 */
export const signature = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: signature.url(args, options),
    method: 'get',
})

signature.definition = {
    methods: ["get","head"],
    url: '/live-classes/signature/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\LiveClassController::signature
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:109
 * @route '/live-classes/signature/{id}'
 */
signature.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return signature.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\LiveClassController::signature
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:109
 * @route '/live-classes/signature/{id}'
 */
signature.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: signature.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\LiveClassController::signature
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:109
 * @route '/live-classes/signature/{id}'
 */
signature.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: signature.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\LiveClassController::signature
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:109
 * @route '/live-classes/signature/{id}'
 */
    const signatureForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: signature.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\LiveClassController::signature
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:109
 * @route '/live-classes/signature/{id}'
 */
        signatureForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: signature.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\LiveClassController::signature
 * @see Modules/Course/app/Http/Controllers/LiveClassController.php:109
 * @route '/live-classes/signature/{id}'
 */
        signatureForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: signature.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    signature.form = signatureForm
const liveClass = {
    index: Object.assign(index, index),
update: Object.assign(update, update),
start: Object.assign(start, start),
signature: Object.assign(signature, signature),
}

export default liveClass