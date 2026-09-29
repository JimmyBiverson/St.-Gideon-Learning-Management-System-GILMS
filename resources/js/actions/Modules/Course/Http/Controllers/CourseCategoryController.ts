import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\CourseCategoryController::index
 * @see Modules/Course/app/Http/Controllers/CourseCategoryController.php:22
 * @route '/dashboard/courses/categories'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/courses/categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\CourseCategoryController::index
 * @see Modules/Course/app/Http/Controllers/CourseCategoryController.php:22
 * @route '/dashboard/courses/categories'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseCategoryController::index
 * @see Modules/Course/app/Http/Controllers/CourseCategoryController.php:22
 * @route '/dashboard/courses/categories'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\CourseCategoryController::index
 * @see Modules/Course/app/Http/Controllers/CourseCategoryController.php:22
 * @route '/dashboard/courses/categories'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseCategoryController::index
 * @see Modules/Course/app/Http/Controllers/CourseCategoryController.php:22
 * @route '/dashboard/courses/categories'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseCategoryController::index
 * @see Modules/Course/app/Http/Controllers/CourseCategoryController.php:22
 * @route '/dashboard/courses/categories'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\CourseCategoryController::index
 * @see Modules/Course/app/Http/Controllers/CourseCategoryController.php:22
 * @route '/dashboard/courses/categories'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \Modules\Course\Http\Controllers\CourseCategoryController::store
 * @see Modules/Course/app/Http/Controllers/CourseCategoryController.php:32
 * @route '/dashboard/courses/categories'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/courses/categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\CourseCategoryController::store
 * @see Modules/Course/app/Http/Controllers/CourseCategoryController.php:32
 * @route '/dashboard/courses/categories'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseCategoryController::store
 * @see Modules/Course/app/Http/Controllers/CourseCategoryController.php:32
 * @route '/dashboard/courses/categories'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseCategoryController::store
 * @see Modules/Course/app/Http/Controllers/CourseCategoryController.php:32
 * @route '/dashboard/courses/categories'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseCategoryController::store
 * @see Modules/Course/app/Http/Controllers/CourseCategoryController.php:32
 * @route '/dashboard/courses/categories'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Course\Http\Controllers\CourseCategoryController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseCategoryController.php:46
 * @route '/dashboard/courses/categories/{category}'
 */
export const destroy = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/courses/categories/{category}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Course\Http\Controllers\CourseCategoryController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseCategoryController.php:46
 * @route '/dashboard/courses/categories/{category}'
 */
destroy.url = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { category: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: typeof args.category === 'object'
                ? args.category.id
                : args.category,
                }

    return destroy.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseCategoryController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseCategoryController.php:46
 * @route '/dashboard/courses/categories/{category}'
 */
destroy.delete = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseCategoryController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseCategoryController.php:46
 * @route '/dashboard/courses/categories/{category}'
 */
    const destroyForm = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseCategoryController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseCategoryController.php:46
 * @route '/dashboard/courses/categories/{category}'
 */
        destroyForm.delete = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Course\Http\Controllers\CourseCategoryController::update
 * @see Modules/Course/app/Http/Controllers/CourseCategoryController.php:39
 * @route '/dashboard/courses/categories/update/{category}'
 */
export const update = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/dashboard/courses/categories/update/{category}',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\CourseCategoryController::update
 * @see Modules/Course/app/Http/Controllers/CourseCategoryController.php:39
 * @route '/dashboard/courses/categories/update/{category}'
 */
update.url = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { category: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: typeof args.category === 'object'
                ? args.category.id
                : args.category,
                }

    return update.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseCategoryController::update
 * @see Modules/Course/app/Http/Controllers/CourseCategoryController.php:39
 * @route '/dashboard/courses/categories/update/{category}'
 */
update.post = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseCategoryController::update
 * @see Modules/Course/app/Http/Controllers/CourseCategoryController.php:39
 * @route '/dashboard/courses/categories/update/{category}'
 */
    const updateForm = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseCategoryController::update
 * @see Modules/Course/app/Http/Controllers/CourseCategoryController.php:39
 * @route '/dashboard/courses/categories/update/{category}'
 */
        updateForm.post = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \Modules\Course\Http\Controllers\CourseCategoryController::sort
 * @see Modules/Course/app/Http/Controllers/CourseCategoryController.php:53
 * @route '/dashboard/courses/categories/sort'
 */
export const sort = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sort.url(options),
    method: 'post',
})

sort.definition = {
    methods: ["post"],
    url: '/dashboard/courses/categories/sort',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\CourseCategoryController::sort
 * @see Modules/Course/app/Http/Controllers/CourseCategoryController.php:53
 * @route '/dashboard/courses/categories/sort'
 */
sort.url = (options?: RouteQueryOptions) => {
    return sort.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseCategoryController::sort
 * @see Modules/Course/app/Http/Controllers/CourseCategoryController.php:53
 * @route '/dashboard/courses/categories/sort'
 */
sort.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sort.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseCategoryController::sort
 * @see Modules/Course/app/Http/Controllers/CourseCategoryController.php:53
 * @route '/dashboard/courses/categories/sort'
 */
    const sortForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sort.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseCategoryController::sort
 * @see Modules/Course/app/Http/Controllers/CourseCategoryController.php:53
 * @route '/dashboard/courses/categories/sort'
 */
        sortForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sort.url(options),
            method: 'post',
        })
    
    sort.form = sortForm
const CourseCategoryController = { index, store, destroy, update, sort }

export default CourseCategoryController