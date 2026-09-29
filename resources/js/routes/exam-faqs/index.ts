import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Exam\Http\Controllers\ExamFaqController::store
 * @see Modules/Exam/app/Http/Controllers/ExamFaqController.php:19
 * @route '/dashboard/exam-faqs'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/exam-faqs',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamFaqController::store
 * @see Modules/Exam/app/Http/Controllers/ExamFaqController.php:19
 * @route '/dashboard/exam-faqs'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamFaqController::store
 * @see Modules/Exam/app/Http/Controllers/ExamFaqController.php:19
 * @route '/dashboard/exam-faqs'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamFaqController::store
 * @see Modules/Exam/app/Http/Controllers/ExamFaqController.php:19
 * @route '/dashboard/exam-faqs'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamFaqController::store
 * @see Modules/Exam/app/Http/Controllers/ExamFaqController.php:19
 * @route '/dashboard/exam-faqs'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Exam\Http\Controllers\ExamFaqController::update
 * @see Modules/Exam/app/Http/Controllers/ExamFaqController.php:29
 * @route '/dashboard/exam-faqs/{exam_faq}'
 */
export const update = (args: { exam_faq: string | number } | [exam_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/exam-faqs/{exam_faq}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamFaqController::update
 * @see Modules/Exam/app/Http/Controllers/ExamFaqController.php:29
 * @route '/dashboard/exam-faqs/{exam_faq}'
 */
update.url = (args: { exam_faq: string | number } | [exam_faq: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { exam_faq: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    exam_faq: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        exam_faq: args.exam_faq,
                }

    return update.definition.url
            .replace('{exam_faq}', parsedArgs.exam_faq.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamFaqController::update
 * @see Modules/Exam/app/Http/Controllers/ExamFaqController.php:29
 * @route '/dashboard/exam-faqs/{exam_faq}'
 */
update.put = (args: { exam_faq: string | number } | [exam_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Exam\Http\Controllers\ExamFaqController::update
 * @see Modules/Exam/app/Http/Controllers/ExamFaqController.php:29
 * @route '/dashboard/exam-faqs/{exam_faq}'
 */
update.patch = (args: { exam_faq: string | number } | [exam_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamFaqController::update
 * @see Modules/Exam/app/Http/Controllers/ExamFaqController.php:29
 * @route '/dashboard/exam-faqs/{exam_faq}'
 */
    const updateForm = (args: { exam_faq: string | number } | [exam_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamFaqController::update
 * @see Modules/Exam/app/Http/Controllers/ExamFaqController.php:29
 * @route '/dashboard/exam-faqs/{exam_faq}'
 */
        updateForm.put = (args: { exam_faq: string | number } | [exam_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Exam\Http\Controllers\ExamFaqController::update
 * @see Modules/Exam/app/Http/Controllers/ExamFaqController.php:29
 * @route '/dashboard/exam-faqs/{exam_faq}'
 */
        updateForm.patch = (args: { exam_faq: string | number } | [exam_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Exam\Http\Controllers\ExamFaqController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamFaqController.php:39
 * @route '/dashboard/exam-faqs/{exam_faq}'
 */
export const destroy = (args: { exam_faq: string | number } | [exam_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/exam-faqs/{exam_faq}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamFaqController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamFaqController.php:39
 * @route '/dashboard/exam-faqs/{exam_faq}'
 */
destroy.url = (args: { exam_faq: string | number } | [exam_faq: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { exam_faq: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    exam_faq: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        exam_faq: args.exam_faq,
                }

    return destroy.definition.url
            .replace('{exam_faq}', parsedArgs.exam_faq.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamFaqController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamFaqController.php:39
 * @route '/dashboard/exam-faqs/{exam_faq}'
 */
destroy.delete = (args: { exam_faq: string | number } | [exam_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamFaqController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamFaqController.php:39
 * @route '/dashboard/exam-faqs/{exam_faq}'
 */
    const destroyForm = (args: { exam_faq: string | number } | [exam_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamFaqController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamFaqController.php:39
 * @route '/dashboard/exam-faqs/{exam_faq}'
 */
        destroyForm.delete = (args: { exam_faq: string | number } | [exam_faq: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const examFaqs = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default examFaqs