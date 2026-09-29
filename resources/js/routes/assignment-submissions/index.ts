import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::store
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:20
 * @route '/assignment/submission'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/assignment/submission',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::store
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:20
 * @route '/assignment/submission'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::store
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:20
 * @route '/assignment/submission'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::store
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:20
 * @route '/assignment/submission'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::store
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:20
 * @route '/assignment/submission'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::show
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:50
 * @route '/assignment/submission/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/assignment/submission/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::show
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:50
 * @route '/assignment/submission/{id}'
 */
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::show
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:50
 * @route '/assignment/submission/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::show
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:50
 * @route '/assignment/submission/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::show
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:50
 * @route '/assignment/submission/{id}'
 */
    const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::show
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:50
 * @route '/assignment/submission/{id}'
 */
        showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::show
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:50
 * @route '/assignment/submission/{id}'
 */
        showForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::update
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:30
 * @route '/assignment/submission/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/assignment/submission/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::update
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:30
 * @route '/assignment/submission/{id}'
 */
update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::update
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:30
 * @route '/assignment/submission/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::update
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:30
 * @route '/assignment/submission/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::update
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:30
 * @route '/assignment/submission/{id}'
 */
        updateForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::student
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:40
 * @route '/assignment/submission/{assignmentId}/student'
 */
export const student = (args: { assignmentId: string | number } | [assignmentId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: student.url(args, options),
    method: 'get',
})

student.definition = {
    methods: ["get","head"],
    url: '/assignment/submission/{assignmentId}/student',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::student
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:40
 * @route '/assignment/submission/{assignmentId}/student'
 */
student.url = (args: { assignmentId: string | number } | [assignmentId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { assignmentId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    assignmentId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        assignmentId: args.assignmentId,
                }

    return student.definition.url
            .replace('{assignmentId}', parsedArgs.assignmentId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::student
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:40
 * @route '/assignment/submission/{assignmentId}/student'
 */
student.get = (args: { assignmentId: string | number } | [assignmentId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: student.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::student
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:40
 * @route '/assignment/submission/{assignmentId}/student'
 */
student.head = (args: { assignmentId: string | number } | [assignmentId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: student.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::student
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:40
 * @route '/assignment/submission/{assignmentId}/student'
 */
    const studentForm = (args: { assignmentId: string | number } | [assignmentId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: student.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::student
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:40
 * @route '/assignment/submission/{assignmentId}/student'
 */
        studentForm.get = (args: { assignmentId: string | number } | [assignmentId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: student.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::student
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:40
 * @route '/assignment/submission/{assignmentId}/student'
 */
        studentForm.head = (args: { assignmentId: string | number } | [assignmentId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: student.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    student.form = studentForm
const assignmentSubmissions = {
    store: Object.assign(store, store),
show: Object.assign(show, show),
update: Object.assign(update, update),
student: Object.assign(student, student),
}

export default assignmentSubmissions