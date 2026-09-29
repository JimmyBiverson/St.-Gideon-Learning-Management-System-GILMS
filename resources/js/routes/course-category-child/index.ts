import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\CategoryChildController::store
 * @see Modules/Course/app/Http/Controllers/CategoryChildController.php:24
 * @route '/dashboard/courses/category-child'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/courses/category-child',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\CategoryChildController::store
 * @see Modules/Course/app/Http/Controllers/CategoryChildController.php:24
 * @route '/dashboard/courses/category-child'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CategoryChildController::store
 * @see Modules/Course/app/Http/Controllers/CategoryChildController.php:24
 * @route '/dashboard/courses/category-child'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\CategoryChildController::store
 * @see Modules/Course/app/Http/Controllers/CategoryChildController.php:24
 * @route '/dashboard/courses/category-child'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CategoryChildController::store
 * @see Modules/Course/app/Http/Controllers/CategoryChildController.php:24
 * @route '/dashboard/courses/category-child'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Course\Http\Controllers\CategoryChildController::update
 * @see Modules/Course/app/Http/Controllers/CategoryChildController.php:34
 * @route '/dashboard/courses/category-child/{category_child}'
 */
export const update = (args: { category_child: string | number } | [category_child: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/dashboard/courses/category-child/{category_child}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Course\Http\Controllers\CategoryChildController::update
 * @see Modules/Course/app/Http/Controllers/CategoryChildController.php:34
 * @route '/dashboard/courses/category-child/{category_child}'
 */
update.url = (args: { category_child: string | number } | [category_child: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category_child: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    category_child: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category_child: args.category_child,
                }

    return update.definition.url
            .replace('{category_child}', parsedArgs.category_child.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CategoryChildController::update
 * @see Modules/Course/app/Http/Controllers/CategoryChildController.php:34
 * @route '/dashboard/courses/category-child/{category_child}'
 */
update.put = (args: { category_child: string | number } | [category_child: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Course\Http\Controllers\CategoryChildController::update
 * @see Modules/Course/app/Http/Controllers/CategoryChildController.php:34
 * @route '/dashboard/courses/category-child/{category_child}'
 */
update.patch = (args: { category_child: string | number } | [category_child: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Course\Http\Controllers\CategoryChildController::update
 * @see Modules/Course/app/Http/Controllers/CategoryChildController.php:34
 * @route '/dashboard/courses/category-child/{category_child}'
 */
    const updateForm = (args: { category_child: string | number } | [category_child: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CategoryChildController::update
 * @see Modules/Course/app/Http/Controllers/CategoryChildController.php:34
 * @route '/dashboard/courses/category-child/{category_child}'
 */
        updateForm.put = (args: { category_child: string | number } | [category_child: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Course\Http\Controllers\CategoryChildController::update
 * @see Modules/Course/app/Http/Controllers/CategoryChildController.php:34
 * @route '/dashboard/courses/category-child/{category_child}'
 */
        updateForm.patch = (args: { category_child: string | number } | [category_child: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \Modules\Course\Http\Controllers\CategoryChildController::destroy
 * @see Modules/Course/app/Http/Controllers/CategoryChildController.php:41
 * @route '/dashboard/courses/category-child/{category_child}'
 */
export const destroy = (args: { category_child: string | number } | [category_child: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/courses/category-child/{category_child}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Course\Http\Controllers\CategoryChildController::destroy
 * @see Modules/Course/app/Http/Controllers/CategoryChildController.php:41
 * @route '/dashboard/courses/category-child/{category_child}'
 */
destroy.url = (args: { category_child: string | number } | [category_child: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category_child: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    category_child: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category_child: args.category_child,
                }

    return destroy.definition.url
            .replace('{category_child}', parsedArgs.category_child.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CategoryChildController::destroy
 * @see Modules/Course/app/Http/Controllers/CategoryChildController.php:41
 * @route '/dashboard/courses/category-child/{category_child}'
 */
destroy.delete = (args: { category_child: string | number } | [category_child: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Course\Http\Controllers\CategoryChildController::destroy
 * @see Modules/Course/app/Http/Controllers/CategoryChildController.php:41
 * @route '/dashboard/courses/category-child/{category_child}'
 */
    const destroyForm = (args: { category_child: string | number } | [category_child: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CategoryChildController::destroy
 * @see Modules/Course/app/Http/Controllers/CategoryChildController.php:41
 * @route '/dashboard/courses/category-child/{category_child}'
 */
        destroyForm.delete = (args: { category_child: string | number } | [category_child: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \Modules\Course\Http\Controllers\CategoryChildController::sort
 * @see Modules/Course/app/Http/Controllers/CategoryChildController.php:48
 * @route '/dashboard/courses/category-child/sort'
 */
export const sort = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sort.url(options),
    method: 'post',
})

sort.definition = {
    methods: ["post"],
    url: '/dashboard/courses/category-child/sort',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\CategoryChildController::sort
 * @see Modules/Course/app/Http/Controllers/CategoryChildController.php:48
 * @route '/dashboard/courses/category-child/sort'
 */
sort.url = (options?: RouteQueryOptions) => {
    return sort.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CategoryChildController::sort
 * @see Modules/Course/app/Http/Controllers/CategoryChildController.php:48
 * @route '/dashboard/courses/category-child/sort'
 */
sort.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sort.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\CategoryChildController::sort
 * @see Modules/Course/app/Http/Controllers/CategoryChildController.php:48
 * @route '/dashboard/courses/category-child/sort'
 */
    const sortForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sort.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CategoryChildController::sort
 * @see Modules/Course/app/Http/Controllers/CategoryChildController.php:48
 * @route '/dashboard/courses/category-child/sort'
 */
        sortForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sort.url(options),
            method: 'post',
        })
    
    sort.form = sortForm
const courseCategoryChild = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
sort: Object.assign(sort, sort),
}

export default courseCategoryChild