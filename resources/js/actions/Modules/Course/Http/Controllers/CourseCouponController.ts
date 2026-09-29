import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\CourseCouponController::index
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:24
 * @route '/dashboard/courses/course/coupons'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/courses/course/coupons',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\CourseCouponController::index
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:24
 * @route '/dashboard/courses/course/coupons'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseCouponController::index
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:24
 * @route '/dashboard/courses/course/coupons'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\CourseCouponController::index
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:24
 * @route '/dashboard/courses/course/coupons'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseCouponController::index
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:24
 * @route '/dashboard/courses/course/coupons'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseCouponController::index
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:24
 * @route '/dashboard/courses/course/coupons'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\CourseCouponController::index
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:24
 * @route '/dashboard/courses/course/coupons'
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
* @see \Modules\Course\Http\Controllers\CourseCouponController::store
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:38
 * @route '/dashboard/courses/course/coupons'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/courses/course/coupons',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\CourseCouponController::store
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:38
 * @route '/dashboard/courses/course/coupons'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseCouponController::store
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:38
 * @route '/dashboard/courses/course/coupons'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseCouponController::store
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:38
 * @route '/dashboard/courses/course/coupons'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseCouponController::store
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:38
 * @route '/dashboard/courses/course/coupons'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Course\Http\Controllers\CourseCouponController::update
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:50
 * @route '/dashboard/courses/course/coupons/{coupon}'
 */
export const update = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/courses/course/coupons/{coupon}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Course\Http\Controllers\CourseCouponController::update
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:50
 * @route '/dashboard/courses/course/coupons/{coupon}'
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
* @see \Modules\Course\Http\Controllers\CourseCouponController::update
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:50
 * @route '/dashboard/courses/course/coupons/{coupon}'
 */
update.put = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Course\Http\Controllers\CourseCouponController::update
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:50
 * @route '/dashboard/courses/course/coupons/{coupon}'
 */
update.patch = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseCouponController::update
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:50
 * @route '/dashboard/courses/course/coupons/{coupon}'
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
* @see \Modules\Course\Http\Controllers\CourseCouponController::update
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:50
 * @route '/dashboard/courses/course/coupons/{coupon}'
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
* @see \Modules\Course\Http\Controllers\CourseCouponController::update
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:50
 * @route '/dashboard/courses/course/coupons/{coupon}'
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
* @see \Modules\Course\Http\Controllers\CourseCouponController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:62
 * @route '/dashboard/courses/course/coupons/{coupon}'
 */
export const destroy = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/courses/course/coupons/{coupon}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Course\Http\Controllers\CourseCouponController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:62
 * @route '/dashboard/courses/course/coupons/{coupon}'
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
* @see \Modules\Course\Http\Controllers\CourseCouponController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:62
 * @route '/dashboard/courses/course/coupons/{coupon}'
 */
destroy.delete = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseCouponController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:62
 * @route '/dashboard/courses/course/coupons/{coupon}'
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
* @see \Modules\Course\Http\Controllers\CourseCouponController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:62
 * @route '/dashboard/courses/course/coupons/{coupon}'
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
* @see \Modules\Course\Http\Controllers\CourseCouponController::verify
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:74
 * @route '/dashboard/courses/coupons/verify'
 */
export const verify = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(options),
    method: 'post',
})

verify.definition = {
    methods: ["post"],
    url: '/dashboard/courses/coupons/verify',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\CourseCouponController::verify
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:74
 * @route '/dashboard/courses/coupons/verify'
 */
verify.url = (options?: RouteQueryOptions) => {
    return verify.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseCouponController::verify
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:74
 * @route '/dashboard/courses/coupons/verify'
 */
verify.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseCouponController::verify
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:74
 * @route '/dashboard/courses/coupons/verify'
 */
    const verifyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: verify.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseCouponController::verify
 * @see Modules/Course/app/Http/Controllers/CourseCouponController.php:74
 * @route '/dashboard/courses/coupons/verify'
 */
        verifyForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: verify.url(options),
            method: 'post',
        })
    
    verify.form = verifyForm
const CourseCouponController = { index, store, update, destroy, verify }

export default CourseCouponController