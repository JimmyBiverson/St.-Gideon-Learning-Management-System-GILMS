import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../../wayfinder'
/**
* @see \Modules\Billing\Http\Controllers\Payout\PaystackController::paystack_redirect
 * @see Modules/Billing/app/Http/Controllers/Payout/PaystackController.php:17
 * @route '/payouts/paystack/redirect'
 */
export const paystack_redirect = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: paystack_redirect.url(options),
    method: 'get',
})

paystack_redirect.definition = {
    methods: ["get","head"],
    url: '/payouts/paystack/redirect',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payout\PaystackController::paystack_redirect
 * @see Modules/Billing/app/Http/Controllers/Payout/PaystackController.php:17
 * @route '/payouts/paystack/redirect'
 */
paystack_redirect.url = (options?: RouteQueryOptions) => {
    return paystack_redirect.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payout\PaystackController::paystack_redirect
 * @see Modules/Billing/app/Http/Controllers/Payout/PaystackController.php:17
 * @route '/payouts/paystack/redirect'
 */
paystack_redirect.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: paystack_redirect.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payout\PaystackController::paystack_redirect
 * @see Modules/Billing/app/Http/Controllers/Payout/PaystackController.php:17
 * @route '/payouts/paystack/redirect'
 */
paystack_redirect.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: paystack_redirect.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payout\PaystackController::paystack_redirect
 * @see Modules/Billing/app/Http/Controllers/Payout/PaystackController.php:17
 * @route '/payouts/paystack/redirect'
 */
    const paystack_redirectForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: paystack_redirect.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payout\PaystackController::paystack_redirect
 * @see Modules/Billing/app/Http/Controllers/Payout/PaystackController.php:17
 * @route '/payouts/paystack/redirect'
 */
        paystack_redirectForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: paystack_redirect.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payout\PaystackController::paystack_redirect
 * @see Modules/Billing/app/Http/Controllers/Payout/PaystackController.php:17
 * @route '/payouts/paystack/redirect'
 */
        paystack_redirectForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: paystack_redirect.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    paystack_redirect.form = paystack_redirectForm
/**
* @see \Modules\Billing\Http\Controllers\Payout\PaystackController::verify_transaction
 * @see Modules/Billing/app/Http/Controllers/Payout/PaystackController.php:41
 * @route '/payouts/paystack/callback'
 */
export const verify_transaction = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verify_transaction.url(options),
    method: 'get',
})

verify_transaction.definition = {
    methods: ["get","head"],
    url: '/payouts/paystack/callback',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Billing\Http\Controllers\Payout\PaystackController::verify_transaction
 * @see Modules/Billing/app/Http/Controllers/Payout/PaystackController.php:41
 * @route '/payouts/paystack/callback'
 */
verify_transaction.url = (options?: RouteQueryOptions) => {
    return verify_transaction.definition.url + queryParams(options)
}

/**
* @see \Modules\Billing\Http\Controllers\Payout\PaystackController::verify_transaction
 * @see Modules/Billing/app/Http/Controllers/Payout/PaystackController.php:41
 * @route '/payouts/paystack/callback'
 */
verify_transaction.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verify_transaction.url(options),
    method: 'get',
})
/**
* @see \Modules\Billing\Http\Controllers\Payout\PaystackController::verify_transaction
 * @see Modules/Billing/app/Http/Controllers/Payout/PaystackController.php:41
 * @route '/payouts/paystack/callback'
 */
verify_transaction.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: verify_transaction.url(options),
    method: 'head',
})

    /**
* @see \Modules\Billing\Http\Controllers\Payout\PaystackController::verify_transaction
 * @see Modules/Billing/app/Http/Controllers/Payout/PaystackController.php:41
 * @route '/payouts/paystack/callback'
 */
    const verify_transactionForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: verify_transaction.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Billing\Http\Controllers\Payout\PaystackController::verify_transaction
 * @see Modules/Billing/app/Http/Controllers/Payout/PaystackController.php:41
 * @route '/payouts/paystack/callback'
 */
        verify_transactionForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: verify_transaction.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Billing\Http\Controllers\Payout\PaystackController::verify_transaction
 * @see Modules/Billing/app/Http/Controllers/Payout/PaystackController.php:41
 * @route '/payouts/paystack/callback'
 */
        verify_transactionForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: verify_transaction.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    verify_transaction.form = verify_transactionForm
const PaystackController = { paystack_redirect, verify_transaction }

export default PaystackController