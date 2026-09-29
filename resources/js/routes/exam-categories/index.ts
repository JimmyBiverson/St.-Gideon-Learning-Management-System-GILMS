import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Exam\Http\Controllers\ExamCategoryController::index
 * @see Modules/Exam/app/Http/Controllers/ExamCategoryController.php:21
 * @route '/dashboard/exams/categories'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/exams/categories',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamCategoryController::index
 * @see Modules/Exam/app/Http/Controllers/ExamCategoryController.php:21
 * @route '/dashboard/exams/categories'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamCategoryController::index
 * @see Modules/Exam/app/Http/Controllers/ExamCategoryController.php:21
 * @route '/dashboard/exams/categories'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Exam\Http\Controllers\ExamCategoryController::index
 * @see Modules/Exam/app/Http/Controllers/ExamCategoryController.php:21
 * @route '/dashboard/exams/categories'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamCategoryController::index
 * @see Modules/Exam/app/Http/Controllers/ExamCategoryController.php:21
 * @route '/dashboard/exams/categories'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamCategoryController::index
 * @see Modules/Exam/app/Http/Controllers/ExamCategoryController.php:21
 * @route '/dashboard/exams/categories'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Exam\Http\Controllers\ExamCategoryController::index
 * @see Modules/Exam/app/Http/Controllers/ExamCategoryController.php:21
 * @route '/dashboard/exams/categories'
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
* @see \Modules\Exam\Http\Controllers\ExamCategoryController::store
 * @see Modules/Exam/app/Http/Controllers/ExamCategoryController.php:34
 * @route '/dashboard/exams/categories'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/exams/categories',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamCategoryController::store
 * @see Modules/Exam/app/Http/Controllers/ExamCategoryController.php:34
 * @route '/dashboard/exams/categories'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamCategoryController::store
 * @see Modules/Exam/app/Http/Controllers/ExamCategoryController.php:34
 * @route '/dashboard/exams/categories'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamCategoryController::store
 * @see Modules/Exam/app/Http/Controllers/ExamCategoryController.php:34
 * @route '/dashboard/exams/categories'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamCategoryController::store
 * @see Modules/Exam/app/Http/Controllers/ExamCategoryController.php:34
 * @route '/dashboard/exams/categories'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Exam\Http\Controllers\ExamCategoryController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamCategoryController.php:54
 * @route '/dashboard/exams/categories/{category}'
 */
export const destroy = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/exams/categories/{category}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamCategoryController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamCategoryController.php:54
 * @route '/dashboard/exams/categories/{category}'
 */
destroy.url = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        category: args.category,
                }

    return destroy.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamCategoryController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamCategoryController.php:54
 * @route '/dashboard/exams/categories/{category}'
 */
destroy.delete = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamCategoryController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamCategoryController.php:54
 * @route '/dashboard/exams/categories/{category}'
 */
    const destroyForm = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamCategoryController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamCategoryController.php:54
 * @route '/dashboard/exams/categories/{category}'
 */
        destroyForm.delete = (args: { category: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Exam\Http\Controllers\ExamCategoryController::update
 * @see Modules/Exam/app/Http/Controllers/ExamCategoryController.php:44
 * @route '/dashboard/exams/categories/{category}'
 */
export const update = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/dashboard/exams/categories/{category}',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamCategoryController::update
 * @see Modules/Exam/app/Http/Controllers/ExamCategoryController.php:44
 * @route '/dashboard/exams/categories/{category}'
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
* @see \Modules\Exam\Http\Controllers\ExamCategoryController::update
 * @see Modules/Exam/app/Http/Controllers/ExamCategoryController.php:44
 * @route '/dashboard/exams/categories/{category}'
 */
update.post = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamCategoryController::update
 * @see Modules/Exam/app/Http/Controllers/ExamCategoryController.php:44
 * @route '/dashboard/exams/categories/{category}'
 */
    const updateForm = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamCategoryController::update
 * @see Modules/Exam/app/Http/Controllers/ExamCategoryController.php:44
 * @route '/dashboard/exams/categories/{category}'
 */
        updateForm.post = (args: { category: number | { id: number } } | [category: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \Modules\Exam\Http\Controllers\ExamCategoryController::sort
 * @see Modules/Exam/app/Http/Controllers/ExamCategoryController.php:64
 * @route '/dashboard/exams/categories/order/sort'
 */
export const sort = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sort.url(options),
    method: 'post',
})

sort.definition = {
    methods: ["post"],
    url: '/dashboard/exams/categories/order/sort',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamCategoryController::sort
 * @see Modules/Exam/app/Http/Controllers/ExamCategoryController.php:64
 * @route '/dashboard/exams/categories/order/sort'
 */
sort.url = (options?: RouteQueryOptions) => {
    return sort.definition.url + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamCategoryController::sort
 * @see Modules/Exam/app/Http/Controllers/ExamCategoryController.php:64
 * @route '/dashboard/exams/categories/order/sort'
 */
sort.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sort.url(options),
    method: 'post',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamCategoryController::sort
 * @see Modules/Exam/app/Http/Controllers/ExamCategoryController.php:64
 * @route '/dashboard/exams/categories/order/sort'
 */
    const sortForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sort.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamCategoryController::sort
 * @see Modules/Exam/app/Http/Controllers/ExamCategoryController.php:64
 * @route '/dashboard/exams/categories/order/sort'
 */
        sortForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sort.url(options),
            method: 'post',
        })
    
    sort.form = sortForm
const examCategories = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
destroy: Object.assign(destroy, destroy),
update: Object.assign(update, update),
sort: Object.assign(sort, sort),
}

export default examCategories