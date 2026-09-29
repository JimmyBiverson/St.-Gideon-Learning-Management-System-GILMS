import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\QuizController::preview
 * @see Modules/Course/app/Http/Controllers/QuizController.php:0
 * @route '/dashboard/section/quiz/result/preview'
 */
export const preview = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview.url(options),
    method: 'get',
})

preview.definition = {
    methods: ["get","head"],
    url: '/dashboard/section/quiz/result/preview',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\QuizController::preview
 * @see Modules/Course/app/Http/Controllers/QuizController.php:0
 * @route '/dashboard/section/quiz/result/preview'
 */
preview.url = (options?: RouteQueryOptions) => {
    return preview.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\QuizController::preview
 * @see Modules/Course/app/Http/Controllers/QuizController.php:0
 * @route '/dashboard/section/quiz/result/preview'
 */
preview.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: preview.url(options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\QuizController::preview
 * @see Modules/Course/app/Http/Controllers/QuizController.php:0
 * @route '/dashboard/section/quiz/result/preview'
 */
preview.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: preview.url(options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\QuizController::preview
 * @see Modules/Course/app/Http/Controllers/QuizController.php:0
 * @route '/dashboard/section/quiz/result/preview'
 */
    const previewForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: preview.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\QuizController::preview
 * @see Modules/Course/app/Http/Controllers/QuizController.php:0
 * @route '/dashboard/section/quiz/result/preview'
 */
        previewForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: preview.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\QuizController::preview
 * @see Modules/Course/app/Http/Controllers/QuizController.php:0
 * @route '/dashboard/section/quiz/result/preview'
 */
        previewForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: preview.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    preview.form = previewForm
const result = {
    preview: Object.assign(preview, preview),
}

export default result