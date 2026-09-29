import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\CurriculumController::section_store
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:25
 * @route '/dashboard/section'
 */
export const section_store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: section_store.url(options),
    method: 'post',
})

section_store.definition = {
    methods: ["post"],
    url: '/dashboard/section',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::section_store
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:25
 * @route '/dashboard/section'
 */
section_store.url = (options?: RouteQueryOptions) => {
    return section_store.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::section_store
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:25
 * @route '/dashboard/section'
 */
section_store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: section_store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\CurriculumController::section_store
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:25
 * @route '/dashboard/section'
 */
    const section_storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: section_store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CurriculumController::section_store
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:25
 * @route '/dashboard/section'
 */
        section_storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: section_store.url(options),
            method: 'post',
        })
    
    section_store.form = section_storeForm
/**
* @see \Modules\Course\Http\Controllers\CurriculumController::section_update
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:41
 * @route '/dashboard/section/{id}'
 */
export const section_update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: section_update.url(args, options),
    method: 'put',
})

section_update.definition = {
    methods: ["put"],
    url: '/dashboard/section/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::section_update
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:41
 * @route '/dashboard/section/{id}'
 */
section_update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return section_update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::section_update
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:41
 * @route '/dashboard/section/{id}'
 */
section_update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: section_update.url(args, options),
    method: 'put',
})

    /**
* @see \Modules\Course\Http\Controllers\CurriculumController::section_update
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:41
 * @route '/dashboard/section/{id}'
 */
    const section_updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: section_update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CurriculumController::section_update
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:41
 * @route '/dashboard/section/{id}'
 */
        section_updateForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: section_update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    section_update.form = section_updateForm
/**
* @see \Modules\Course\Http\Controllers\CurriculumController::section_delete
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:54
 * @route '/dashboard/section/{id}'
 */
export const section_delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: section_delete.url(args, options),
    method: 'delete',
})

section_delete.definition = {
    methods: ["delete"],
    url: '/dashboard/section/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::section_delete
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:54
 * @route '/dashboard/section/{id}'
 */
section_delete.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return section_delete.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::section_delete
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:54
 * @route '/dashboard/section/{id}'
 */
section_delete.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: section_delete.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Course\Http\Controllers\CurriculumController::section_delete
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:54
 * @route '/dashboard/section/{id}'
 */
    const section_deleteForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: section_delete.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CurriculumController::section_delete
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:54
 * @route '/dashboard/section/{id}'
 */
        section_deleteForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: section_delete.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    section_delete.form = section_deleteForm
/**
* @see \Modules\Course\Http\Controllers\CurriculumController::section_sort
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:66
 * @route '/dashboard/section/sort'
 */
export const section_sort = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: section_sort.url(options),
    method: 'post',
})

section_sort.definition = {
    methods: ["post"],
    url: '/dashboard/section/sort',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::section_sort
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:66
 * @route '/dashboard/section/sort'
 */
section_sort.url = (options?: RouteQueryOptions) => {
    return section_sort.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::section_sort
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:66
 * @route '/dashboard/section/sort'
 */
section_sort.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: section_sort.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\CurriculumController::section_sort
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:66
 * @route '/dashboard/section/sort'
 */
    const section_sortForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: section_sort.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CurriculumController::section_sort
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:66
 * @route '/dashboard/section/sort'
 */
        section_sortForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: section_sort.url(options),
            method: 'post',
        })
    
    section_sort.form = section_sortForm
/**
* @see \Modules\Course\Http\Controllers\CurriculumController::lesson_store
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:79
 * @route '/dashboard/lesson'
 */
export const lesson_store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: lesson_store.url(options),
    method: 'post',
})

lesson_store.definition = {
    methods: ["post"],
    url: '/dashboard/lesson',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::lesson_store
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:79
 * @route '/dashboard/lesson'
 */
lesson_store.url = (options?: RouteQueryOptions) => {
    return lesson_store.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::lesson_store
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:79
 * @route '/dashboard/lesson'
 */
lesson_store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: lesson_store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\CurriculumController::lesson_store
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:79
 * @route '/dashboard/lesson'
 */
    const lesson_storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: lesson_store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CurriculumController::lesson_store
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:79
 * @route '/dashboard/lesson'
 */
        lesson_storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: lesson_store.url(options),
            method: 'post',
        })
    
    lesson_store.form = lesson_storeForm
/**
* @see \Modules\Course\Http\Controllers\CurriculumController::lesson_update
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:95
 * @route '/dashboard/lesson/{id}'
 */
export const lesson_update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: lesson_update.url(args, options),
    method: 'put',
})

lesson_update.definition = {
    methods: ["put"],
    url: '/dashboard/lesson/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::lesson_update
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:95
 * @route '/dashboard/lesson/{id}'
 */
lesson_update.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return lesson_update.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::lesson_update
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:95
 * @route '/dashboard/lesson/{id}'
 */
lesson_update.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: lesson_update.url(args, options),
    method: 'put',
})

    /**
* @see \Modules\Course\Http\Controllers\CurriculumController::lesson_update
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:95
 * @route '/dashboard/lesson/{id}'
 */
    const lesson_updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: lesson_update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CurriculumController::lesson_update
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:95
 * @route '/dashboard/lesson/{id}'
 */
        lesson_updateForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: lesson_update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    lesson_update.form = lesson_updateForm
/**
* @see \Modules\Course\Http\Controllers\CurriculumController::lesson_delete
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:107
 * @route '/dashboard/lesson/{id}'
 */
export const lesson_delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: lesson_delete.url(args, options),
    method: 'delete',
})

lesson_delete.definition = {
    methods: ["delete"],
    url: '/dashboard/lesson/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::lesson_delete
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:107
 * @route '/dashboard/lesson/{id}'
 */
lesson_delete.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return lesson_delete.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::lesson_delete
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:107
 * @route '/dashboard/lesson/{id}'
 */
lesson_delete.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: lesson_delete.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Course\Http\Controllers\CurriculumController::lesson_delete
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:107
 * @route '/dashboard/lesson/{id}'
 */
    const lesson_deleteForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: lesson_delete.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CurriculumController::lesson_delete
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:107
 * @route '/dashboard/lesson/{id}'
 */
        lesson_deleteForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: lesson_delete.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    lesson_delete.form = lesson_deleteForm
/**
* @see \Modules\Course\Http\Controllers\CurriculumController::lesson_sort
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:120
 * @route '/dashboard/lesson/sort'
 */
export const lesson_sort = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: lesson_sort.url(options),
    method: 'post',
})

lesson_sort.definition = {
    methods: ["post"],
    url: '/dashboard/lesson/sort',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::lesson_sort
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:120
 * @route '/dashboard/lesson/sort'
 */
lesson_sort.url = (options?: RouteQueryOptions) => {
    return lesson_sort.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CurriculumController::lesson_sort
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:120
 * @route '/dashboard/lesson/sort'
 */
lesson_sort.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: lesson_sort.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\CurriculumController::lesson_sort
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:120
 * @route '/dashboard/lesson/sort'
 */
    const lesson_sortForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: lesson_sort.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CurriculumController::lesson_sort
 * @see Modules/Course/app/Http/Controllers/CurriculumController.php:120
 * @route '/dashboard/lesson/sort'
 */
        lesson_sortForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: lesson_sort.url(options),
            method: 'post',
        })
    
    lesson_sort.form = lesson_sortForm
const CurriculumController = { section_store, section_update, section_delete, section_sort, lesson_store, lesson_update, lesson_delete, lesson_sort }

export default CurriculumController