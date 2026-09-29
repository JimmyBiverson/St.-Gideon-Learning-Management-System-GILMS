import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Exam\Http\Controllers\ExamReviewController::index
 * @see Modules/Exam/app/Http/Controllers/ExamReviewController.php:15
 * @route '/student/exams/{exam}/reviews'
 */
export const index = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/student/exams/{exam}/reviews',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamReviewController::index
 * @see Modules/Exam/app/Http/Controllers/ExamReviewController.php:15
 * @route '/student/exams/{exam}/reviews'
 */
index.url = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { exam: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { exam: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    exam: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        exam: typeof args.exam === 'object'
                ? args.exam.id
                : args.exam,
                }

    return index.definition.url
            .replace('{exam}', parsedArgs.exam.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamReviewController::index
 * @see Modules/Exam/app/Http/Controllers/ExamReviewController.php:15
 * @route '/student/exams/{exam}/reviews'
 */
index.get = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Exam\Http\Controllers\ExamReviewController::index
 * @see Modules/Exam/app/Http/Controllers/ExamReviewController.php:15
 * @route '/student/exams/{exam}/reviews'
 */
index.head = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamReviewController::index
 * @see Modules/Exam/app/Http/Controllers/ExamReviewController.php:15
 * @route '/student/exams/{exam}/reviews'
 */
    const indexForm = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamReviewController::index
 * @see Modules/Exam/app/Http/Controllers/ExamReviewController.php:15
 * @route '/student/exams/{exam}/reviews'
 */
        indexForm.get = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Exam\Http\Controllers\ExamReviewController::index
 * @see Modules/Exam/app/Http/Controllers/ExamReviewController.php:15
 * @route '/student/exams/{exam}/reviews'
 */
        indexForm.head = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \Modules\Exam\Http\Controllers\ExamReviewController::store
 * @see Modules/Exam/app/Http/Controllers/ExamReviewController.php:30
 * @route '/student/exam-reviews'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/student/exam-reviews',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamReviewController::store
 * @see Modules/Exam/app/Http/Controllers/ExamReviewController.php:30
 * @route '/student/exam-reviews'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamReviewController::store
 * @see Modules/Exam/app/Http/Controllers/ExamReviewController.php:30
 * @route '/student/exam-reviews'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamReviewController::store
 * @see Modules/Exam/app/Http/Controllers/ExamReviewController.php:30
 * @route '/student/exam-reviews'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamReviewController::store
 * @see Modules/Exam/app/Http/Controllers/ExamReviewController.php:30
 * @route '/student/exam-reviews'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Exam\Http\Controllers\ExamReviewController::update
 * @see Modules/Exam/app/Http/Controllers/ExamReviewController.php:52
 * @route '/student/exam-reviews/{review}'
 */
export const update = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/student/exam-reviews/{review}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamReviewController::update
 * @see Modules/Exam/app/Http/Controllers/ExamReviewController.php:52
 * @route '/student/exam-reviews/{review}'
 */
update.url = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { review: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { review: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    review: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        review: typeof args.review === 'object'
                ? args.review.id
                : args.review,
                }

    return update.definition.url
            .replace('{review}', parsedArgs.review.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamReviewController::update
 * @see Modules/Exam/app/Http/Controllers/ExamReviewController.php:52
 * @route '/student/exam-reviews/{review}'
 */
update.put = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamReviewController::update
 * @see Modules/Exam/app/Http/Controllers/ExamReviewController.php:52
 * @route '/student/exam-reviews/{review}'
 */
    const updateForm = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamReviewController::update
 * @see Modules/Exam/app/Http/Controllers/ExamReviewController.php:52
 * @route '/student/exam-reviews/{review}'
 */
        updateForm.put = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \Modules\Exam\Http\Controllers\ExamReviewController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamReviewController.php:67
 * @route '/student/exam-reviews/{review}'
 */
export const destroy = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/student/exam-reviews/{review}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamReviewController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamReviewController.php:67
 * @route '/student/exam-reviews/{review}'
 */
destroy.url = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { review: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { review: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    review: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        review: typeof args.review === 'object'
                ? args.review.id
                : args.review,
                }

    return destroy.definition.url
            .replace('{review}', parsedArgs.review.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamReviewController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamReviewController.php:67
 * @route '/student/exam-reviews/{review}'
 */
destroy.delete = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamReviewController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamReviewController.php:67
 * @route '/student/exam-reviews/{review}'
 */
    const destroyForm = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamReviewController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamReviewController.php:67
 * @route '/student/exam-reviews/{review}'
 */
        destroyForm.delete = (args: { review: number | { id: number } } | [review: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ExamReviewController = { index, store, update, destroy }

export default ExamReviewController