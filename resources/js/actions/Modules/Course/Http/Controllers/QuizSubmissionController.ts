import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\QuizSubmissionController::store
 * @see Modules/Course/app/Http/Controllers/QuizSubmissionController.php:18
 * @route '/quiz-submissions'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/quiz-submissions',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\QuizSubmissionController::store
 * @see Modules/Course/app/Http/Controllers/QuizSubmissionController.php:18
 * @route '/quiz-submissions'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\QuizSubmissionController::store
 * @see Modules/Course/app/Http/Controllers/QuizSubmissionController.php:18
 * @route '/quiz-submissions'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\QuizSubmissionController::store
 * @see Modules/Course/app/Http/Controllers/QuizSubmissionController.php:18
 * @route '/quiz-submissions'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\QuizSubmissionController::store
 * @see Modules/Course/app/Http/Controllers/QuizSubmissionController.php:18
 * @route '/quiz-submissions'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const QuizSubmissionController = { store }

export default QuizSubmissionController