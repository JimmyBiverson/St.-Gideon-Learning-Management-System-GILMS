import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::update
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:53
 * @route '/change-password'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/change-password',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::update
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:53
 * @route '/change-password'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::update
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:53
 * @route '/change-password'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::update
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:53
 * @route '/change-password'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\PasswordResetLinkController::update
 * @see app/Http/Controllers/Auth/PasswordResetLinkController.php:53
 * @route '/change-password'
 */
        updateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const changePassword = {
    update: Object.assign(update, update),
}

export default changePassword