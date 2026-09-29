import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\QuizController::result
 * @see Modules/Course/app/Http/Controllers/QuizController.php:0
 * @route '/dashboard/section/quiz/participant/result'
 */
export const result = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: result.url(options),
    method: 'get',
})

result.definition = {
    methods: ["get","head"],
    url: '/dashboard/section/quiz/participant/result',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\QuizController::result
 * @see Modules/Course/app/Http/Controllers/QuizController.php:0
 * @route '/dashboard/section/quiz/participant/result'
 */
result.url = (options?: RouteQueryOptions) => {
    return result.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\QuizController::result
 * @see Modules/Course/app/Http/Controllers/QuizController.php:0
 * @route '/dashboard/section/quiz/participant/result'
 */
result.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: result.url(options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\QuizController::result
 * @see Modules/Course/app/Http/Controllers/QuizController.php:0
 * @route '/dashboard/section/quiz/participant/result'
 */
result.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: result.url(options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\QuizController::result
 * @see Modules/Course/app/Http/Controllers/QuizController.php:0
 * @route '/dashboard/section/quiz/participant/result'
 */
    const resultForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: result.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\QuizController::result
 * @see Modules/Course/app/Http/Controllers/QuizController.php:0
 * @route '/dashboard/section/quiz/participant/result'
 */
        resultForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: result.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\QuizController::result
 * @see Modules/Course/app/Http/Controllers/QuizController.php:0
 * @route '/dashboard/section/quiz/participant/result'
 */
        resultForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: result.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    result.form = resultForm
const participant = {
    result: Object.assign(result, result),
}

export default participant