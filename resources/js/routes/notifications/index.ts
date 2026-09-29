import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\NotificationController::index
 * @see app/Http/Controllers/NotificationController.php:16
 * @route '/notifications'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/notifications',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\NotificationController::index
 * @see app/Http/Controllers/NotificationController.php:16
 * @route '/notifications'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NotificationController::index
 * @see app/Http/Controllers/NotificationController.php:16
 * @route '/notifications'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\NotificationController::index
 * @see app/Http/Controllers/NotificationController.php:16
 * @route '/notifications'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\NotificationController::index
 * @see app/Http/Controllers/NotificationController.php:16
 * @route '/notifications'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\NotificationController::index
 * @see app/Http/Controllers/NotificationController.php:16
 * @route '/notifications'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\NotificationController::index
 * @see app/Http/Controllers/NotificationController.php:16
 * @route '/notifications'
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
* @see \App\Http\Controllers\NotificationController::show
 * @see app/Http/Controllers/NotificationController.php:26
 * @route '/notifications/{notification}'
 */
export const show = (args: { notification: string | number } | [notification: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/notifications/{notification}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\NotificationController::show
 * @see app/Http/Controllers/NotificationController.php:26
 * @route '/notifications/{notification}'
 */
show.url = (args: { notification: string | number } | [notification: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { notification: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    notification: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        notification: args.notification,
                }

    return show.definition.url
            .replace('{notification}', parsedArgs.notification.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\NotificationController::show
 * @see app/Http/Controllers/NotificationController.php:26
 * @route '/notifications/{notification}'
 */
show.get = (args: { notification: string | number } | [notification: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\NotificationController::show
 * @see app/Http/Controllers/NotificationController.php:26
 * @route '/notifications/{notification}'
 */
show.head = (args: { notification: string | number } | [notification: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\NotificationController::show
 * @see app/Http/Controllers/NotificationController.php:26
 * @route '/notifications/{notification}'
 */
    const showForm = (args: { notification: string | number } | [notification: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\NotificationController::show
 * @see app/Http/Controllers/NotificationController.php:26
 * @route '/notifications/{notification}'
 */
        showForm.get = (args: { notification: string | number } | [notification: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\NotificationController::show
 * @see app/Http/Controllers/NotificationController.php:26
 * @route '/notifications/{notification}'
 */
        showForm.head = (args: { notification: string | number } | [notification: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\NotificationController::readAll
 * @see app/Http/Controllers/NotificationController.php:36
 * @route '/notifications/read/all'
 */
export const readAll = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: readAll.url(options),
    method: 'put',
})

readAll.definition = {
    methods: ["put"],
    url: '/notifications/read/all',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\NotificationController::readAll
 * @see app/Http/Controllers/NotificationController.php:36
 * @route '/notifications/read/all'
 */
readAll.url = (options?: RouteQueryOptions) => {
    return readAll.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\NotificationController::readAll
 * @see app/Http/Controllers/NotificationController.php:36
 * @route '/notifications/read/all'
 */
readAll.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: readAll.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\NotificationController::readAll
 * @see app/Http/Controllers/NotificationController.php:36
 * @route '/notifications/read/all'
 */
    const readAllForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: readAll.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\NotificationController::readAll
 * @see app/Http/Controllers/NotificationController.php:36
 * @route '/notifications/read/all'
 */
        readAllForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: readAll.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    readAll.form = readAllForm
const notifications = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
readAll: Object.assign(readAll, readAll),
}

export default notifications