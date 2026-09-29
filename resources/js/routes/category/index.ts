import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\CourseController::courses
 * @see Modules/Course/app/Http/Controllers/CourseController.php:66
 * @route '/courses/{category}/{category_child?}'
 */
export const courses = (args: { category: string | number, category_child?: string | number } | [category: string | number, category_child: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: courses.url(args, options),
    method: 'get',
})

courses.definition = {
    methods: ["get","head"],
    url: '/courses/{category}/{category_child?}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\CourseController::courses
 * @see Modules/Course/app/Http/Controllers/CourseController.php:66
 * @route '/courses/{category}/{category_child?}'
 */
courses.url = (args: { category: string | number, category_child?: string | number } | [category: string | number, category_child: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                    category_child: args[1],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "category_child",
        ])

    const parsedArgs = {
                        category: args.category,
                                category_child: args.category_child,
                }

    return courses.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace('{category_child?}', parsedArgs.category_child?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseController::courses
 * @see Modules/Course/app/Http/Controllers/CourseController.php:66
 * @route '/courses/{category}/{category_child?}'
 */
courses.get = (args: { category: string | number, category_child?: string | number } | [category: string | number, category_child: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: courses.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\CourseController::courses
 * @see Modules/Course/app/Http/Controllers/CourseController.php:66
 * @route '/courses/{category}/{category_child?}'
 */
courses.head = (args: { category: string | number, category_child?: string | number } | [category: string | number, category_child: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: courses.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseController::courses
 * @see Modules/Course/app/Http/Controllers/CourseController.php:66
 * @route '/courses/{category}/{category_child?}'
 */
    const coursesForm = (args: { category: string | number, category_child?: string | number } | [category: string | number, category_child: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: courses.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseController::courses
 * @see Modules/Course/app/Http/Controllers/CourseController.php:66
 * @route '/courses/{category}/{category_child?}'
 */
        coursesForm.get = (args: { category: string | number, category_child?: string | number } | [category: string | number, category_child: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: courses.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\CourseController::courses
 * @see Modules/Course/app/Http/Controllers/CourseController.php:66
 * @route '/courses/{category}/{category_child?}'
 */
        coursesForm.head = (args: { category: string | number, category_child?: string | number } | [category: string | number, category_child: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: courses.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    courses.form = coursesForm
/**
* @see \Modules\Exam\Http\Controllers\ExamController::exams
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:59
 * @route '/exams/{category?}'
 */
export const exams = (args?: { category?: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exams.url(args, options),
    method: 'get',
})

exams.definition = {
    methods: ["get","head"],
    url: '/exams/{category?}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamController::exams
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:59
 * @route '/exams/{category?}'
 */
exams.url = (args?: { category?: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "category",
        ])

    const parsedArgs = {
                        category: args?.category,
                }

    return exams.definition.url
            .replace('{category?}', parsedArgs.category?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamController::exams
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:59
 * @route '/exams/{category?}'
 */
exams.get = (args?: { category?: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: exams.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Exam\Http\Controllers\ExamController::exams
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:59
 * @route '/exams/{category?}'
 */
exams.head = (args?: { category?: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: exams.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamController::exams
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:59
 * @route '/exams/{category?}'
 */
    const examsForm = (args?: { category?: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: exams.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamController::exams
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:59
 * @route '/exams/{category?}'
 */
        examsForm.get = (args?: { category?: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exams.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Exam\Http\Controllers\ExamController::exams
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:59
 * @route '/exams/{category?}'
 */
        examsForm.head = (args?: { category?: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: exams.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    exams.form = examsForm
const category = {
    courses: Object.assign(courses, courses),
exams: Object.assign(exams, exams),
}

export default category