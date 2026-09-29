import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\CurriculumController::store
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:25
 * @route '/dashboard/section'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/section',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::store
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:25
 * @route '/dashboard/section'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::store
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:25
 * @route '/dashboard/section'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\CurriculumController::store
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:25
 * @route '/dashboard/section'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CurriculumController::store
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:25
 * @route '/dashboard/section'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Course\Http\Controllers\CurriculumController::update
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:41
 * @route '/dashboard/section/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/section/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::update
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:41
 * @route '/dashboard/section/{id}'
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
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:41
 * @route '/dashboard/section/{id}'
 */
update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \Modules\Course\Http\Controllers\CurriculumController::update
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:41
 * @route '/dashboard/section/{id}'
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
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:41
 * @route '/dashboard/section/{id}'
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
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:54
 * @route '/dashboard/section/{id}'
 */
export const deleteMethod = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

deleteMethod.definition = {
    methods: ["delete"],
    url: '/dashboard/section/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::deleteMethod
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:54
 * @route '/dashboard/section/{id}'
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
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:54
 * @route '/dashboard/section/{id}'
 */
deleteMethod.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteMethod.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Course\Http\Controllers\CurriculumController::deleteMethod
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:54
 * @route '/dashboard/section/{id}'
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
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:54
 * @route '/dashboard/section/{id}'
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
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:66
 * @route '/dashboard/section/sort'
 */
export const sort = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sort.url(options),
    method: 'post',
})

sort.definition = {
    methods: ["post"],
    url: '/dashboard/section/sort',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::sort
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:66
 * @route '/dashboard/section/sort'
 */
sort.url = (options?: RouteQueryOptions) => {
    return sort.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::sort
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:66
 * @route '/dashboard/section/sort'
 */
sort.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sort.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\CurriculumController::sort
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:66
 * @route '/dashboard/section/sort'
 */
    const sortForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sort.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CurriculumController::sort
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:66
 * @route '/dashboard/section/sort'
 */
        sortForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sort.url(options),
            method: 'post',
        })
    
    sort.form = sortForm
const section = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
delete: Object.assign(deleteMethod, deleteMethod),
sort: Object.assign(sort, sort),
}

export default section