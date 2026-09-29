import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::getStudentSubmissions
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:40
 * @route '/assignment/submission/{assignmentId}/student'
 */
export const getStudentSubmissions = (args: { assignmentId: string | number } | [assignmentId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStudentSubmissions.url(args, options),
    method: 'get',
})

getStudentSubmissions.definition = {
    methods: ["get","head"],
    url: '/assignment/submission/{assignmentId}/student',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::getStudentSubmissions
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:40
 * @route '/assignment/submission/{assignmentId}/student'
 */
getStudentSubmissions.url = (args: { assignmentId: string | number } | [assignmentId: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return getStudentSubmissions.definition.url
            .replace('{assignmentId}', parsedArgs.assignmentId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::getStudentSubmissions
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:40
 * @route '/assignment/submission/{assignmentId}/student'
 */
getStudentSubmissions.get = (args: { assignmentId: string | number } | [assignmentId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getStudentSubmissions.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::getStudentSubmissions
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:40
 * @route '/assignment/submission/{assignmentId}/student'
 */
getStudentSubmissions.head = (args: { assignmentId: string | number } | [assignmentId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getStudentSubmissions.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::getStudentSubmissions
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:40
 * @route '/assignment/submission/{assignmentId}/student'
 */
    const getStudentSubmissionsForm = (args: { assignmentId: string | number } | [assignmentId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getStudentSubmissions.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::getStudentSubmissions
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:40
 * @route '/assignment/submission/{assignmentId}/student'
 */
        getStudentSubmissionsForm.get = (args: { assignmentId: string | number } | [assignmentId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getStudentSubmissions.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\AssignmentSubmissionController::getStudentSubmissions
 * @see Modules/Course/app/Http/Controllers/AssignmentSubmissionController.php:40
 * @route '/assignment/submission/{assignmentId}/student'
 */
        getStudentSubmissionsForm.head = (args: { assignmentId: string | number } | [assignmentId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getStudentSubmissions.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getStudentSubmissions.form = getStudentSubmissionsForm
const AssignmentSubmissionController = { store, show, update, getStudentSubmissions }

export default AssignmentSubmissionController