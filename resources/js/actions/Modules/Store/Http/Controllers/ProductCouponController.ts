import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Store\Http\Controllers\ProductCouponController::index
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:24
 * @route '/dashboard/store/products/product/coupons'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/store/products/product/coupons',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Store\Http\Controllers\ProductCouponController::index
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:24
 * @route '/dashboard/store/products/product/coupons'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductCouponController::index
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:24
 * @route '/dashboard/store/products/product/coupons'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Store\Http\Controllers\ProductCouponController::index
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:24
 * @route '/dashboard/store/products/product/coupons'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductCouponController::index
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:24
 * @route '/dashboard/store/products/product/coupons'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductCouponController::index
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:24
 * @route '/dashboard/store/products/product/coupons'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Store\Http\Controllers\ProductCouponController::index
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:24
 * @route '/dashboard/store/products/product/coupons'
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
* @see \Modules\Store\Http\Controllers\ProductCouponController::store
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:38
 * @route '/dashboard/store/products/product/coupons'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/store/products/product/coupons',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Store\Http\Controllers\ProductCouponController::store
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:38
 * @route '/dashboard/store/products/product/coupons'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductCouponController::store
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:38
 * @route '/dashboard/store/products/product/coupons'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductCouponController::store
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:38
 * @route '/dashboard/store/products/product/coupons'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductCouponController::store
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:38
 * @route '/dashboard/store/products/product/coupons'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Store\Http\Controllers\ProductCouponController::update
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:50
 * @route '/dashboard/store/products/product/coupons/{coupon}'
 */
export const update = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/store/products/product/coupons/{coupon}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Store\Http\Controllers\ProductCouponController::update
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:50
 * @route '/dashboard/store/products/product/coupons/{coupon}'
 */
update.url = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { coupon: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { coupon: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    coupon: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        coupon: typeof args.coupon === 'object'
                ? args.coupon.id
                : args.coupon,
                }

    return update.definition.url
            .replace('{coupon}', parsedArgs.coupon.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductCouponController::update
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:50
 * @route '/dashboard/store/products/product/coupons/{coupon}'
 */
update.put = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Store\Http\Controllers\ProductCouponController::update
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:50
 * @route '/dashboard/store/products/product/coupons/{coupon}'
 */
update.patch = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductCouponController::update
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:50
 * @route '/dashboard/store/products/product/coupons/{coupon}'
 */
    const updateForm = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductCouponController::update
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:50
 * @route '/dashboard/store/products/product/coupons/{coupon}'
 */
        updateForm.put = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Store\Http\Controllers\ProductCouponController::update
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:50
 * @route '/dashboard/store/products/product/coupons/{coupon}'
 */
        updateForm.patch = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Store\Http\Controllers\ProductCouponController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:62
 * @route '/dashboard/store/products/product/coupons/{coupon}'
 */
export const destroy = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/store/products/product/coupons/{coupon}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Store\Http\Controllers\ProductCouponController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:62
 * @route '/dashboard/store/products/product/coupons/{coupon}'
 */
destroy.url = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { coupon: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { coupon: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    coupon: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        coupon: typeof args.coupon === 'object'
                ? args.coupon.id
                : args.coupon,
                }

    return destroy.definition.url
            .replace('{coupon}', parsedArgs.coupon.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductCouponController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:62
 * @route '/dashboard/store/products/product/coupons/{coupon}'
 */
destroy.delete = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductCouponController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:62
 * @route '/dashboard/store/products/product/coupons/{coupon}'
 */
    const destroyForm = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductCouponController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:62
 * @route '/dashboard/store/products/product/coupons/{coupon}'
 */
        destroyForm.delete = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \Modules\Store\Http\Controllers\ProductCouponController::verify
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:74
 * @route '/products/coupons/verify'
 */
export const verify = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(options),
    method: 'post',
})

verify.definition = {
    methods: ["post"],
    url: '/products/coupons/verify',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Store\Http\Controllers\ProductCouponController::verify
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:74
 * @route '/products/coupons/verify'
 */
verify.url = (options?: RouteQueryOptions) => {
    return verify.definition.url + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductCouponController::verify
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:74
 * @route '/products/coupons/verify'
 */
verify.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(options),
    method: 'post',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductCouponController::verify
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:74
 * @route '/products/coupons/verify'
 */
    const verifyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: verify.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductCouponController::verify
 * @see Modules/Store/app/Http/Controllers/ProductCouponController.php:74
 * @route '/products/coupons/verify'
 */
        verifyForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: verify.url(options),
            method: 'post',
        })
    
    verify.form = verifyForm
const ProductCouponController = { index, store, update, destroy, verify }

export default ProductCouponController