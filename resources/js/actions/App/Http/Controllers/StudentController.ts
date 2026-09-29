import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\StudentController::index
 * @see app/Http/Controllers/StudentController.php:30
 * @route '/student/{tab}'
 */
export const index = (args: { tab: string | number } | [tab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/student/{tab}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StudentController::index
 * @see app/Http/Controllers/StudentController.php:30
 * @route '/student/{tab}'
 */
index.url = (args: { tab: string | number } | [tab: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tab: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    tab: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tab: args.tab,
                }

    return index.definition.url
            .replace('{tab}', parsedArgs.tab.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StudentController::index
 * @see app/Http/Controllers/StudentController.php:30
 * @route '/student/{tab}'
 */
index.get = (args: { tab: string | number } | [tab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StudentController::index
 * @see app/Http/Controllers/StudentController.php:30
 * @route '/student/{tab}'
 */
index.head = (args: { tab: string | number } | [tab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StudentController::index
 * @see app/Http/Controllers/StudentController.php:30
 * @route '/student/{tab}'
 */
    const indexForm = (args: { tab: string | number } | [tab: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StudentController::index
 * @see app/Http/Controllers/StudentController.php:30
 * @route '/student/{tab}'
 */
        indexForm.get = (args: { tab: string | number } | [tab: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StudentController::index
 * @see app/Http/Controllers/StudentController.php:30
 * @route '/student/{tab}'
 */
        indexForm.head = (args: { tab: string | number } | [tab: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\StudentController::show_course
 * @see app/Http/Controllers/StudentController.php:47
 * @route '/student/courses/{id}/{tab}'
 */
export const show_course = (args: { id: string | number, tab: string | number } | [id: string | number, tab: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show_course.url(args, options),
    method: 'get',
})

show_course.definition = {
    methods: ["get","head"],
    url: '/student/courses/{id}/{tab}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StudentController::show_course
 * @see app/Http/Controllers/StudentController.php:47
 * @route '/student/courses/{id}/{tab}'
 */
show_course.url = (args: { id: string | number, tab: string | number } | [id: string | number, tab: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                    tab: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                                tab: args.tab,
                }

    return show_course.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace('{tab}', parsedArgs.tab.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StudentController::show_course
 * @see app/Http/Controllers/StudentController.php:47
 * @route '/student/courses/{id}/{tab}'
 */
show_course.get = (args: { id: string | number, tab: string | number } | [id: string | number, tab: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show_course.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StudentController::show_course
 * @see app/Http/Controllers/StudentController.php:47
 * @route '/student/courses/{id}/{tab}'
 */
show_course.head = (args: { id: string | number, tab: string | number } | [id: string | number, tab: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show_course.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StudentController::show_course
 * @see app/Http/Controllers/StudentController.php:47
 * @route '/student/courses/{id}/{tab}'
 */
    const show_courseForm = (args: { id: string | number, tab: string | number } | [id: string | number, tab: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show_course.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StudentController::show_course
 * @see app/Http/Controllers/StudentController.php:47
 * @route '/student/courses/{id}/{tab}'
 */
        show_courseForm.get = (args: { id: string | number, tab: string | number } | [id: string | number, tab: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show_course.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StudentController::show_course
 * @see app/Http/Controllers/StudentController.php:47
 * @route '/student/courses/{id}/{tab}'
 */
        show_courseForm.head = (args: { id: string | number, tab: string | number } | [id: string | number, tab: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show_course.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show_course.form = show_courseForm
/**
* @see \App\Http\Controllers\StudentController::show_exam
 * @see app/Http/Controllers/StudentController.php:66
 * @route '/student/exams/{id}/{tab}'
 */
export const show_exam = (args: { id: string | number, tab: string | number } | [id: string | number, tab: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show_exam.url(args, options),
    method: 'get',
})

show_exam.definition = {
    methods: ["get","head"],
    url: '/student/exams/{id}/{tab}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StudentController::show_exam
 * @see app/Http/Controllers/StudentController.php:66
 * @route '/student/exams/{id}/{tab}'
 */
show_exam.url = (args: { id: string | number, tab: string | number } | [id: string | number, tab: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                    tab: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                                tab: args.tab,
                }

    return show_exam.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace('{tab}', parsedArgs.tab.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StudentController::show_exam
 * @see app/Http/Controllers/StudentController.php:66
 * @route '/student/exams/{id}/{tab}'
 */
show_exam.get = (args: { id: string | number, tab: string | number } | [id: string | number, tab: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show_exam.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StudentController::show_exam
 * @see app/Http/Controllers/StudentController.php:66
 * @route '/student/exams/{id}/{tab}'
 */
show_exam.head = (args: { id: string | number, tab: string | number } | [id: string | number, tab: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show_exam.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StudentController::show_exam
 * @see app/Http/Controllers/StudentController.php:66
 * @route '/student/exams/{id}/{tab}'
 */
    const show_examForm = (args: { id: string | number, tab: string | number } | [id: string | number, tab: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show_exam.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StudentController::show_exam
 * @see app/Http/Controllers/StudentController.php:66
 * @route '/student/exams/{id}/{tab}'
 */
        show_examForm.get = (args: { id: string | number, tab: string | number } | [id: string | number, tab: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show_exam.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StudentController::show_exam
 * @see app/Http/Controllers/StudentController.php:66
 * @route '/student/exams/{id}/{tab}'
 */
        show_examForm.head = (args: { id: string | number, tab: string | number } | [id: string | number, tab: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show_exam.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show_exam.form = show_examForm
/**
* @see \App\Http\Controllers\StudentController::update_profile
 * @see app/Http/Controllers/StudentController.php:98
 * @route '/student/profile'
 */
export const update_profile = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update_profile.url(options),
    method: 'post',
})

update_profile.definition = {
    methods: ["post"],
    url: '/student/profile',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\StudentController::update_profile
 * @see app/Http/Controllers/StudentController.php:98
 * @route '/student/profile'
 */
update_profile.url = (options?: RouteQueryOptions) => {
    return update_profile.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\StudentController::update_profile
 * @see app/Http/Controllers/StudentController.php:98
 * @route '/student/profile'
 */
update_profile.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update_profile.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\StudentController::update_profile
 * @see app/Http/Controllers/StudentController.php:98
 * @route '/student/profile'
 */
    const update_profileForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update_profile.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\StudentController::update_profile
 * @see app/Http/Controllers/StudentController.php:98
 * @route '/student/profile'
 */
        update_profileForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update_profile.url(options),
            method: 'post',
        })
    
    update_profile.form = update_profileForm
const StudentController = { index, show_course, show_exam, update_profile }

export default StudentController