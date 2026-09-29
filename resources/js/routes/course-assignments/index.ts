import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::index
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:26
 * @route '/dashboard/courses/{course_id}/assignments'
 */
export const index = (args: { course_id: string | number } | [course_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/courses/{course_id}/assignments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::index
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:26
 * @route '/dashboard/courses/{course_id}/assignments'
 */
index.url = (args: { course_id: string | number } | [course_id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course_id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    course_id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course_id: args.course_id,
                }

    return index.definition.url
            .replace('{course_id}', parsedArgs.course_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::index
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:26
 * @route '/dashboard/courses/{course_id}/assignments'
 */
index.get = (args: { course_id: string | number } | [course_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::index
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:26
 * @route '/dashboard/courses/{course_id}/assignments'
 */
index.head = (args: { course_id: string | number } | [course_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::index
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:26
 * @route '/dashboard/courses/{course_id}/assignments'
 */
    const indexForm = (args: { course_id: string | number } | [course_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::index
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:26
 * @route '/dashboard/courses/{course_id}/assignments'
 */
        indexForm.get = (args: { course_id: string | number } | [course_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::index
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:26
 * @route '/dashboard/courses/{course_id}/assignments'
 */
        indexForm.head = (args: { course_id: string | number } | [course_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::submissions
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:38
 * @route '/dashboard/courses/{course_id}/assignments/{assignment_id}/submissions'
 */
export const submissions = (args: { course_id: string | number, assignment_id: string | number } | [course_id: string | number, assignment_id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: submissions.url(args, options),
    method: 'get',
})

submissions.definition = {
    methods: ["get","head"],
    url: '/dashboard/courses/{course_id}/assignments/{assignment_id}/submissions',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::submissions
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:38
 * @route '/dashboard/courses/{course_id}/assignments/{assignment_id}/submissions'
 */
submissions.url = (args: { course_id: string | number, assignment_id: string | number } | [course_id: string | number, assignment_id: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    course_id: args[0],
                    assignment_id: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course_id: args.course_id,
                                assignment_id: args.assignment_id,
                }

    return submissions.definition.url
            .replace('{course_id}', parsedArgs.course_id.toString())
            .replace('{assignment_id}', parsedArgs.assignment_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::submissions
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:38
 * @route '/dashboard/courses/{course_id}/assignments/{assignment_id}/submissions'
 */
submissions.get = (args: { course_id: string | number, assignment_id: string | number } | [course_id: string | number, assignment_id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: submissions.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::submissions
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:38
 * @route '/dashboard/courses/{course_id}/assignments/{assignment_id}/submissions'
 */
submissions.head = (args: { course_id: string | number, assignment_id: string | number } | [course_id: string | number, assignment_id: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: submissions.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::submissions
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:38
 * @route '/dashboard/courses/{course_id}/assignments/{assignment_id}/submissions'
 */
    const submissionsForm = (args: { course_id: string | number, assignment_id: string | number } | [course_id: string | number, assignment_id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: submissions.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::submissions
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:38
 * @route '/dashboard/courses/{course_id}/assignments/{assignment_id}/submissions'
 */
        submissionsForm.get = (args: { course_id: string | number, assignment_id: string | number } | [course_id: string | number, assignment_id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: submissions.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\CourseAssignmentController::submissions
 * @see Modules/Course/app/Http/Controllers/CourseAssignmentController.php:38
 * @route '/dashboard/courses/{course_id}/assignments/{assignment_id}/submissions'
 */
        submissionsForm.head = (args: { course_id: string | number, assignment_id: string | number } | [course_id: string | number, assignment_id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: submissions.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    submissions.form = submissionsForm
const courseAssignments = {
    index: Object.assign(index, index),
submissions: Object.assign(submissions, submissions),
}

export default courseAssignments