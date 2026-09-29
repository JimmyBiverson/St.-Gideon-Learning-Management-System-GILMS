import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Exam\Http\Controllers\ExamEnrollmentController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamEnrollmentController.php:67
 * @route '/dashboard/exams/exam/enrollments/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/exams/exam/enrollments/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamEnrollmentController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamEnrollmentController.php:67
 * @route '/dashboard/exams/exam/enrollments/{id}'
 */
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamEnrollmentController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamEnrollmentController.php:67
 * @route '/dashboard/exams/exam/enrollments/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamEnrollmentController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamEnrollmentController.php:67
 * @route '/dashboard/exams/exam/enrollments/{id}'
 */
    const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamEnrollmentController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamEnrollmentController.php:67
 * @route '/dashboard/exams/exam/enrollments/{id}'
 */
        destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Exam\Http\Controllers\ExamEnrollmentController::index
 * @see Modules/Exam/app/Http/Controllers/ExamEnrollmentController.php:27
 * @route '/dashboard/exams/exam/enrollments'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/exams/exam/enrollments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamEnrollmentController::index
 * @see Modules/Exam/app/Http/Controllers/ExamEnrollmentController.php:27
 * @route '/dashboard/exams/exam/enrollments'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamEnrollmentController::index
 * @see Modules/Exam/app/Http/Controllers/ExamEnrollmentController.php:27
 * @route '/dashboard/exams/exam/enrollments'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Exam\Http\Controllers\ExamEnrollmentController::index
 * @see Modules/Exam/app/Http/Controllers/ExamEnrollmentController.php:27
 * @route '/dashboard/exams/exam/enrollments'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamEnrollmentController::index
 * @see Modules/Exam/app/Http/Controllers/ExamEnrollmentController.php:27
 * @route '/dashboard/exams/exam/enrollments'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamEnrollmentController::index
 * @see Modules/Exam/app/Http/Controllers/ExamEnrollmentController.php:27
 * @route '/dashboard/exams/exam/enrollments'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Exam\Http\Controllers\ExamEnrollmentController::index
 * @see Modules/Exam/app/Http/Controllers/ExamEnrollmentController.php:27
 * @route '/dashboard/exams/exam/enrollments'
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
* @see \Modules\Exam\Http\Controllers\ExamEnrollmentController::store
 * @see Modules/Exam/app/Http/Controllers/ExamEnrollmentController.php:57
 * @route '/student/exams/exam/enrollments'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/student/exams/exam/enrollments',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamEnrollmentController::store
 * @see Modules/Exam/app/Http/Controllers/ExamEnrollmentController.php:57
 * @route '/student/exams/exam/enrollments'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamEnrollmentController::store
 * @see Modules/Exam/app/Http/Controllers/ExamEnrollmentController.php:57
 * @route '/student/exams/exam/enrollments'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamEnrollmentController::store
 * @see Modules/Exam/app/Http/Controllers/ExamEnrollmentController.php:57
 * @route '/student/exams/exam/enrollments'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamEnrollmentController::store
 * @see Modules/Exam/app/Http/Controllers/ExamEnrollmentController.php:57
 * @route '/student/exams/exam/enrollments'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const ExamEnrollmentController = { destroy, index, store }

export default ExamEnrollmentController