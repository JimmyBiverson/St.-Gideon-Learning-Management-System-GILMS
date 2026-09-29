import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::index
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:26
 * @route '/dashboard/exams/{exam_id}/attempts'
 */
export const index = (args: { exam_id: string | number } | [exam_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/exams/{exam_id}/attempts',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::index
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:26
 * @route '/dashboard/exams/{exam_id}/attempts'
 */
index.url = (args: { exam_id: string | number } | [exam_id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { exam_id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    exam_id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        exam_id: args.exam_id,
                }

    return index.definition.url
            .replace('{exam_id}', parsedArgs.exam_id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::index
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:26
 * @route '/dashboard/exams/{exam_id}/attempts'
 */
index.get = (args: { exam_id: string | number } | [exam_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::index
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:26
 * @route '/dashboard/exams/{exam_id}/attempts'
 */
index.head = (args: { exam_id: string | number } | [exam_id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::index
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:26
 * @route '/dashboard/exams/{exam_id}/attempts'
 */
    const indexForm = (args: { exam_id: string | number } | [exam_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::index
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:26
 * @route '/dashboard/exams/{exam_id}/attempts'
 */
        indexForm.get = (args: { exam_id: string | number } | [exam_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::index
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:26
 * @route '/dashboard/exams/{exam_id}/attempts'
 */
        indexForm.head = (args: { exam_id: string | number } | [exam_id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::review
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:43
 * @route '/dashboard/exams/{exam_id}/attempts/{id}'
 */
export const review = (args: { exam_id: string | number, id: string | number } | [exam_id: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: review.url(args, options),
    method: 'get',
})

review.definition = {
    methods: ["get","head"],
    url: '/dashboard/exams/{exam_id}/attempts/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::review
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:43
 * @route '/dashboard/exams/{exam_id}/attempts/{id}'
 */
review.url = (args: { exam_id: string | number, id: string | number } | [exam_id: string | number, id: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    exam_id: args[0],
                    id: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        exam_id: args.exam_id,
                                id: args.id,
                }

    return review.definition.url
            .replace('{exam_id}', parsedArgs.exam_id.toString())
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::review
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:43
 * @route '/dashboard/exams/{exam_id}/attempts/{id}'
 */
review.get = (args: { exam_id: string | number, id: string | number } | [exam_id: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: review.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::review
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:43
 * @route '/dashboard/exams/{exam_id}/attempts/{id}'
 */
review.head = (args: { exam_id: string | number, id: string | number } | [exam_id: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: review.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::review
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:43
 * @route '/dashboard/exams/{exam_id}/attempts/{id}'
 */
    const reviewForm = (args: { exam_id: string | number, id: string | number } | [exam_id: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: review.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::review
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:43
 * @route '/dashboard/exams/{exam_id}/attempts/{id}'
 */
        reviewForm.get = (args: { exam_id: string | number, id: string | number } | [exam_id: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: review.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::review
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:43
 * @route '/dashboard/exams/{exam_id}/attempts/{id}'
 */
        reviewForm.head = (args: { exam_id: string | number, id: string | number } | [exam_id: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: review.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    review.form = reviewForm
/**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::grade
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:133
 * @route '/dashboard/exams/attempts/{attempt}/grade'
 */
export const grade = (args: { attempt: number | { id: number } } | [attempt: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: grade.url(args, options),
    method: 'post',
})

grade.definition = {
    methods: ["post"],
    url: '/dashboard/exams/attempts/{attempt}/grade',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::grade
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:133
 * @route '/dashboard/exams/attempts/{attempt}/grade'
 */
grade.url = (args: { attempt: number | { id: number } } | [attempt: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attempt: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { attempt: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    attempt: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        attempt: typeof args.attempt === 'object'
                ? args.attempt.id
                : args.attempt,
                }

    return grade.definition.url
            .replace('{attempt}', parsedArgs.attempt.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::grade
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:133
 * @route '/dashboard/exams/attempts/{attempt}/grade'
 */
grade.post = (args: { attempt: number | { id: number } } | [attempt: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: grade.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::grade
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:133
 * @route '/dashboard/exams/attempts/{attempt}/grade'
 */
    const gradeForm = (args: { attempt: number | { id: number } } | [attempt: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: grade.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::grade
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:133
 * @route '/dashboard/exams/attempts/{attempt}/grade'
 */
        gradeForm.post = (args: { attempt: number | { id: number } } | [attempt: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: grade.url(args, options),
            method: 'post',
        })
    
    grade.form = gradeForm
/**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::start
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:62
 * @route '/student/exams/{exam}/attempts/start'
 */
export const start = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: start.url(args, options),
    method: 'post',
})

start.definition = {
    methods: ["post"],
    url: '/student/exams/{exam}/attempts/start',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::start
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:62
 * @route '/student/exams/{exam}/attempts/start'
 */
start.url = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return start.definition.url
            .replace('{exam}', parsedArgs.exam.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::start
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:62
 * @route '/student/exams/{exam}/attempts/start'
 */
start.post = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: start.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::start
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:62
 * @route '/student/exams/{exam}/attempts/start'
 */
    const startForm = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: start.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::start
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:62
 * @route '/student/exams/{exam}/attempts/start'
 */
        startForm.post = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: start.url(args, options),
            method: 'post',
        })
    
    start.form = startForm
/**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::take
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:79
 * @route '/student/exam-attempts/{attempt}/take'
 */
export const take = (args: { attempt: number | { id: number } } | [attempt: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: take.url(args, options),
    method: 'get',
})

take.definition = {
    methods: ["get","head"],
    url: '/student/exam-attempts/{attempt}/take',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::take
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:79
 * @route '/student/exam-attempts/{attempt}/take'
 */
take.url = (args: { attempt: number | { id: number } } | [attempt: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attempt: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { attempt: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    attempt: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        attempt: typeof args.attempt === 'object'
                ? args.attempt.id
                : args.attempt,
                }

    return take.definition.url
            .replace('{attempt}', parsedArgs.attempt.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::take
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:79
 * @route '/student/exam-attempts/{attempt}/take'
 */
take.get = (args: { attempt: number | { id: number } } | [attempt: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: take.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::take
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:79
 * @route '/student/exam-attempts/{attempt}/take'
 */
take.head = (args: { attempt: number | { id: number } } | [attempt: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: take.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::take
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:79
 * @route '/student/exam-attempts/{attempt}/take'
 */
    const takeForm = (args: { attempt: number | { id: number } } | [attempt: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: take.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::take
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:79
 * @route '/student/exam-attempts/{attempt}/take'
 */
        takeForm.get = (args: { attempt: number | { id: number } } | [attempt: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: take.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::take
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:79
 * @route '/student/exam-attempts/{attempt}/take'
 */
        takeForm.head = (args: { attempt: number | { id: number } } | [attempt: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: take.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    take.form = takeForm
/**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::submit
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:91
 * @route '/student/exam-attempts/{attempt}/submit'
 */
export const submit = (args: { attempt: number | { id: number } } | [attempt: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

submit.definition = {
    methods: ["post"],
    url: '/student/exam-attempts/{attempt}/submit',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::submit
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:91
 * @route '/student/exam-attempts/{attempt}/submit'
 */
submit.url = (args: { attempt: number | { id: number } } | [attempt: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attempt: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { attempt: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    attempt: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        attempt: typeof args.attempt === 'object'
                ? args.attempt.id
                : args.attempt,
                }

    return submit.definition.url
            .replace('{attempt}', parsedArgs.attempt.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::submit
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:91
 * @route '/student/exam-attempts/{attempt}/submit'
 */
submit.post = (args: { attempt: number | { id: number } } | [attempt: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: submit.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::submit
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:91
 * @route '/student/exam-attempts/{attempt}/submit'
 */
    const submitForm = (args: { attempt: number | { id: number } } | [attempt: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: submit.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::submit
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:91
 * @route '/student/exam-attempts/{attempt}/submit'
 */
        submitForm.post = (args: { attempt: number | { id: number } } | [attempt: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: submit.url(args, options),
            method: 'post',
        })
    
    submit.form = submitForm
/**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::abandon
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:113
 * @route '/student/exam-attempts/{attempt}/abandon'
 */
export const abandon = (args: { attempt: number | { id: number } } | [attempt: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: abandon.url(args, options),
    method: 'post',
})

abandon.definition = {
    methods: ["post"],
    url: '/student/exam-attempts/{attempt}/abandon',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::abandon
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:113
 * @route '/student/exam-attempts/{attempt}/abandon'
 */
abandon.url = (args: { attempt: number | { id: number } } | [attempt: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { attempt: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { attempt: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    attempt: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        attempt: typeof args.attempt === 'object'
                ? args.attempt.id
                : args.attempt,
                }

    return abandon.definition.url
            .replace('{attempt}', parsedArgs.attempt.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::abandon
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:113
 * @route '/student/exam-attempts/{attempt}/abandon'
 */
abandon.post = (args: { attempt: number | { id: number } } | [attempt: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: abandon.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::abandon
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:113
 * @route '/student/exam-attempts/{attempt}/abandon'
 */
    const abandonForm = (args: { attempt: number | { id: number } } | [attempt: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: abandon.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamAttemptController::abandon
 * @see Modules/Exam/app/Http/Controllers/ExamAttemptController.php:113
 * @route '/student/exam-attempts/{attempt}/abandon'
 */
        abandonForm.post = (args: { attempt: number | { id: number } } | [attempt: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: abandon.url(args, options),
            method: 'post',
        })
    
    abandon.form = abandonForm
const ExamAttemptController = { index, review, grade, start, take, submit, abandon }

export default ExamAttemptController