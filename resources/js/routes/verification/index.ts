import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\EmailVerificationNotificationController::send
 * @see app/Http/Controllers/Auth/EmailVerificationNotificationController.php:19
 * @route '/email/verification-notification'
 */
export const send = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(options),
    method: 'post',
})

send.definition = {
    methods: ["post"],
    url: '/email/verification-notification',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\EmailVerificationNotificationController::send
 * @see app/Http/Controllers/Auth/EmailVerificationNotificationController.php:19
 * @route '/email/verification-notification'
 */
send.url = (options?: RouteQueryOptions) => {
    return send.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\EmailVerificationNotificationController::send
 * @see app/Http/Controllers/Auth/EmailVerificationNotificationController.php:19
 * @route '/email/verification-notification'
 */
send.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: send.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\EmailVerificationNotificationController::send
 * @see app/Http/Controllers/Auth/EmailVerificationNotificationController.php:19
 * @route '/email/verification-notification'
 */
    const sendForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: send.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\EmailVerificationNotificationController::send
 * @see app/Http/Controllers/Auth/EmailVerificationNotificationController.php:19
 * @route '/email/verification-notification'
 */
        sendForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: send.url(options),
            method: 'post',
        })
    
    send.form = sendForm
const verification = {
    send: Object.assign(send, send),
}

export default verification