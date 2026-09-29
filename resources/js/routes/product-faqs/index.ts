import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Store\Http\Controllers\ProductFaqController::store
 * @see Modules/Store/app/Http/Controllers/ProductFaqController.php:19
 * @route '/dashboard/store/product-faqs'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/store/product-faqs',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Store\Http\Controllers\ProductFaqController::store
 * @see Modules/Store/app/Http/Controllers/ProductFaqController.php:19
 * @route '/dashboard/store/product-faqs'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductFaqController::store
 * @see Modules/Store/app/Http/Controllers/ProductFaqController.php:19
 * @route '/dashboard/store/product-faqs'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductFaqController::store
 * @see Modules/Store/app/Http/Controllers/ProductFaqController.php:19
 * @route '/dashboard/store/product-faqs'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductFaqController::store
 * @see Modules/Store/app/Http/Controllers/ProductFaqController.php:19
 * @route '/dashboard/store/product-faqs'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Store\Http\Controllers\ProductFaqController::update
 * @see Modules/Store/app/Http/Controllers/ProductFaqController.php:29
 * @route '/dashboard/store/product-faqs/{product_faq}'
 */
export const update = (args: { product_faq: string | number } | [product_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/store/product-faqs/{product_faq}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Store\Http\Controllers\ProductFaqController::update
 * @see Modules/Store/app/Http/Controllers/ProductFaqController.php:29
 * @route '/dashboard/store/product-faqs/{product_faq}'
 */
update.url = (args: { product_faq: string | number } | [product_faq: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { product_faq: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    product_faq: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        product_faq: args.product_faq,
                }

    return update.definition.url
            .replace('{product_faq}', parsedArgs.product_faq.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductFaqController::update
 * @see Modules/Store/app/Http/Controllers/ProductFaqController.php:29
 * @route '/dashboard/store/product-faqs/{product_faq}'
 */
update.put = (args: { product_faq: string | number } | [product_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Store\Http\Controllers\ProductFaqController::update
 * @see Modules/Store/app/Http/Controllers/ProductFaqController.php:29
 * @route '/dashboard/store/product-faqs/{product_faq}'
 */
update.patch = (args: { product_faq: string | number } | [product_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductFaqController::update
 * @see Modules/Store/app/Http/Controllers/ProductFaqController.php:29
 * @route '/dashboard/store/product-faqs/{product_faq}'
 */
    const updateForm = (args: { product_faq: string | number } | [product_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductFaqController::update
 * @see Modules/Store/app/Http/Controllers/ProductFaqController.php:29
 * @route '/dashboard/store/product-faqs/{product_faq}'
 */
        updateForm.put = (args: { product_faq: string | number } | [product_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Store\Http\Controllers\ProductFaqController::update
 * @see Modules/Store/app/Http/Controllers/ProductFaqController.php:29
 * @route '/dashboard/store/product-faqs/{product_faq}'
 */
        updateForm.patch = (args: { product_faq: string | number } | [product_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \Modules\Store\Http\Controllers\ProductFaqController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductFaqController.php:39
 * @route '/dashboard/store/product-faqs/{product_faq}'
 */
export const destroy = (args: { product_faq: string | number } | [product_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/store/product-faqs/{product_faq}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Store\Http\Controllers\ProductFaqController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductFaqController.php:39
 * @route '/dashboard/store/product-faqs/{product_faq}'
 */
destroy.url = (args: { product_faq: string | number } | [product_faq: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { product_faq: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    product_faq: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        product_faq: args.product_faq,
                }

    return destroy.definition.url
            .replace('{product_faq}', parsedArgs.product_faq.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductFaqController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductFaqController.php:39
 * @route '/dashboard/store/product-faqs/{product_faq}'
 */
destroy.delete = (args: { product_faq: string | number } | [product_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductFaqController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductFaqController.php:39
 * @route '/dashboard/store/product-faqs/{product_faq}'
 */
    const destroyForm = (args: { product_faq: string | number } | [product_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductFaqController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductFaqController.php:39
 * @route '/dashboard/store/product-faqs/{product_faq}'
 */
        destroyForm.delete = (args: { product_faq: string | number } | [product_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const productFaqs = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default productFaqs