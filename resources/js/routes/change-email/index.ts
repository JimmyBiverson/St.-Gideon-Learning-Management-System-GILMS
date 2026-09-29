import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\EmailVerificationNotificationController::update
 * @see app/Http/Controllers/Auth/EmailVerificationNotificationController.php:33
 * @route '/change-email'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/change-email',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\EmailVerificationNotificationController::update
 * @see app/Http/Controllers/Auth/EmailVerificationNotificationController.php:33
 * @route '/change-email'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\EmailVerificationNotificationController::update
 * @see app/Http/Controllers/Auth/EmailVerificationNotificationController.php:33
 * @route '/change-email'
 */
update.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\EmailVerificationNotificationController::update
 * @see app/Http/Controllers/Auth/EmailVerificationNotificationController.php:33
 * @route '/change-email'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\EmailVerificationNotificationController::update
 * @see app/Http/Controllers/Auth/EmailVerificationNotificationController.php:33
 * @route '/change-email'
 */
        updateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(options),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Auth\EmailVerificationNotificationController::save
 * @see app/Http/Controllers/Auth/EmailVerificationNotificationController.php:43
 * @route '/change-email/save'
 */
export const save = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: save.url(options),
    method: 'get',
})

save.definition = {
    methods: ["get","head"],
    url: '/change-email/save',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\EmailVerificationNotificationController::save
 * @see app/Http/Controllers/Auth/EmailVerificationNotificationController.php:43
 * @route '/change-email/save'
 */
save.url = (options?: RouteQueryOptions) => {
    return save.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\EmailVerificationNotificationController::save
 * @see app/Http/Controllers/Auth/EmailVerificationNotificationController.php:43
 * @route '/change-email/save'
 */
save.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: save.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\EmailVerificationNotificationController::save
 * @see app/Http/Controllers/Auth/EmailVerificationNotificationController.php:43
 * @route '/change-email/save'
 */
save.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: save.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\EmailVerificationNotificationController::save
 * @see app/Http/Controllers/Auth/EmailVerificationNotificationController.php:43
 * @route '/change-email/save'
 */
    const saveForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: save.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\EmailVerificationNotificationController::save
 * @see app/Http/Controllers/Auth/EmailVerificationNotificationController.php:43
 * @route '/change-email/save'
 */
        saveForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: save.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\EmailVerificationNotificationController::save
 * @see app/Http/Controllers/Auth/EmailVerificationNotificationController.php:43
 * @route '/change-email/save'
 */
        saveForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: save.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    save.form = saveForm
const changeEmail = {
    update: Object.assign(update, update),
save: Object.assign(save, save),
}

export default changeEmail