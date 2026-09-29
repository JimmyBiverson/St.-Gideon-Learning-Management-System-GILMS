import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import video from './video'
/**
* @see \Modules\Course\Http\Controllers\CurriculumController::store
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:79
 * @route '/dashboard/lesson'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/lesson',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::store
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:79
 * @route '/dashboard/lesson'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::store
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:79
 * @route '/dashboard/lesson'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\CurriculumController::store
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:79
 * @route '/dashboard/lesson'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CurriculumController::store
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:79
 * @route '/dashboard/lesson'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Course\Http\Controllers\CurriculumController::update
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:95
 * @route '/dashboard/lesson/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/lesson/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::update
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:95
 * @route '/dashboard/lesson/{id}'
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
* @see \Modules\Course\Http\Controllers\CurriculumController::update
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:95
 * @route '/dashboard/lesson/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \Modules\Course\Http\Controllers\CurriculumController::update
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:95
 * @route '/dashboard/lesson/{id}'
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
* @see \Modules\Course\Http\Controllers\CurriculumController::update
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:95
 * @route '/dashboard/lesson/{id}'
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
* @see \Modules\Course\Http\Controllers\CurriculumController::deleteMethod
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:107
 * @route '/dashboard/lesson/{id}'
 */
export const deleteMethod = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/dashboard/lesson/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::deleteMethod
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:107
 * @route '/dashboard/lesson/{id}'
 */
deleteMethod.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return deleteMethod.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::deleteMethod
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:107
 * @route '/dashboard/lesson/{id}'
 */
deleteMethod.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Course\Http\Controllers\CurriculumController::deleteMethod
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:107
 * @route '/dashboard/lesson/{id}'
 */
    const deleteMethodForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: deleteMethod.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CurriculumController::deleteMethod
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:107
 * @route '/dashboard/lesson/{id}'
 */
        deleteMethodForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: deleteMethod.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    deleteMethod.form = deleteMethodForm
/**
* @see \Modules\Course\Http\Controllers\CurriculumController::sort
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:120
 * @route '/dashboard/lesson/sort'
 */
export const sort = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sort.url(options),
    method: 'post',
})

sort.definition = {
    methods: ["post"],
    url: '/dashboard/lesson/sort',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::sort
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:120
 * @route '/dashboard/lesson/sort'
 */
sort.url = (options?: RouteQueryOptions) => {
    return sort.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::sort
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:120
 * @route '/dashboard/lesson/sort'
 */
sort.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sort.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\CurriculumController::sort
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:120
 * @route '/dashboard/lesson/sort'
 */
    const sortForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sort.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CurriculumController::sort
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:120
 * @route '/dashboard/lesson/sort'
 */
        sortForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sort.url(options),
            method: 'post',
        })
    
    sort.form = sortForm
const lesson = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
delete: Object.assign(deleteMethod, deleteMethod),
sort: Object.assign(sort, sort),
video: Object.assign(video, video),
}

export default lesson