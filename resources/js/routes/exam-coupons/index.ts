import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Exam\Http\Controllers\ExamCouponController::index
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:24
 * @route '/dashboard/exams/exam/coupons'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/exams/exam/coupons',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamCouponController::index
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:24
 * @route '/dashboard/exams/exam/coupons'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamCouponController::index
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:24
 * @route '/dashboard/exams/exam/coupons'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Exam\Http\Controllers\ExamCouponController::index
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:24
 * @route '/dashboard/exams/exam/coupons'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamCouponController::index
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:24
 * @route '/dashboard/exams/exam/coupons'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamCouponController::index
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:24
 * @route '/dashboard/exams/exam/coupons'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Exam\Http\Controllers\ExamCouponController::index
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:24
 * @route '/dashboard/exams/exam/coupons'
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
* @see \Modules\Exam\Http\Controllers\ExamCouponController::store
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:38
 * @route '/dashboard/exams/exam/coupons'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/exams/exam/coupons',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamCouponController::store
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:38
 * @route '/dashboard/exams/exam/coupons'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamCouponController::store
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:38
 * @route '/dashboard/exams/exam/coupons'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamCouponController::store
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:38
 * @route '/dashboard/exams/exam/coupons'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamCouponController::store
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:38
 * @route '/dashboard/exams/exam/coupons'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Exam\Http\Controllers\ExamCouponController::update
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:50
 * @route '/dashboard/exams/exam/coupons/{coupon}'
 */
export const update = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/exams/exam/coupons/{coupon}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamCouponController::update
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:50
 * @route '/dashboard/exams/exam/coupons/{coupon}'
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
* @see \Modules\Exam\Http\Controllers\ExamCouponController::update
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:50
 * @route '/dashboard/exams/exam/coupons/{coupon}'
 */
update.put = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Exam\Http\Controllers\ExamCouponController::update
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:50
 * @route '/dashboard/exams/exam/coupons/{coupon}'
 */
update.patch = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamCouponController::update
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:50
 * @route '/dashboard/exams/exam/coupons/{coupon}'
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
* @see \Modules\Exam\Http\Controllers\ExamCouponController::update
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:50
 * @route '/dashboard/exams/exam/coupons/{coupon}'
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
* @see \Modules\Exam\Http\Controllers\ExamCouponController::update
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:50
 * @route '/dashboard/exams/exam/coupons/{coupon}'
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
* @see \Modules\Exam\Http\Controllers\ExamCouponController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:62
 * @route '/dashboard/exams/exam/coupons/{coupon}'
 */
export const destroy = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/exams/exam/coupons/{coupon}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamCouponController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:62
 * @route '/dashboard/exams/exam/coupons/{coupon}'
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
* @see \Modules\Exam\Http\Controllers\ExamCouponController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:62
 * @route '/dashboard/exams/exam/coupons/{coupon}'
 */
destroy.delete = (args: { coupon: number | { id: number } } | [coupon: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamCouponController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:62
 * @route '/dashboard/exams/exam/coupons/{coupon}'
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
* @see \Modules\Exam\Http\Controllers\ExamCouponController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:62
 * @route '/dashboard/exams/exam/coupons/{coupon}'
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
* @see \Modules\Exam\Http\Controllers\ExamCouponController::verify
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:74
 * @route '/dashboard/exams/exam/coupons/verify'
 */
export const verify = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(options),
    method: 'post',
})

verify.definition = {
    methods: ["post"],
    url: '/dashboard/exams/exam/coupons/verify',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamCouponController::verify
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:74
 * @route '/dashboard/exams/exam/coupons/verify'
 */
verify.url = (options?: RouteQueryOptions) => {
    return verify.definition.url + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamCouponController::verify
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:74
 * @route '/dashboard/exams/exam/coupons/verify'
 */
verify.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(options),
    method: 'post',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamCouponController::verify
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:74
 * @route '/dashboard/exams/exam/coupons/verify'
 */
    const verifyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: verify.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamCouponController::verify
 * @see Modules/Exam/app/Http/Controllers/ExamCouponController.php:74
 * @route '/dashboard/exams/exam/coupons/verify'
 */
        verifyForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: verify.url(options),
            method: 'post',
        })
    
    verify.form = verifyForm
const examCoupons = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
verify: Object.assign(verify, verify),
}

export default examCoupons