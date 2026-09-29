import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../../wayfinder'
/**
* @see \Modules\Exam\Http\Controllers\ExamController::category_exams
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:59
 * @route '/exams/{category?}'
 */
export const category_exams = (args?: { category?: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: category_exams.url(args, options),
    method: 'get',
})

category_exams.definition = {
    methods: ["get","head"],
    url: '/exams/{category?}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamController::category_exams
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:59
 * @route '/exams/{category?}'
 */
category_exams.url = (args?: { category?: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { category: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "category",
        ])

    const parsedArgs = {
                        category: args?.category,
                }

    return category_exams.definition.url
            .replace('{category?}', parsedArgs.category?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamController::category_exams
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:59
 * @route '/exams/{category?}'
 */
category_exams.get = (args?: { category?: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: category_exams.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Exam\Http\Controllers\ExamController::category_exams
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:59
 * @route '/exams/{category?}'
 */
category_exams.head = (args?: { category?: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: category_exams.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamController::category_exams
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:59
 * @route '/exams/{category?}'
 */
    const category_examsForm = (args?: { category?: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: category_exams.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamController::category_exams
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:59
 * @route '/exams/{category?}'
 */
        category_examsForm.get = (args?: { category?: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: category_exams.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Exam\Http\Controllers\ExamController::category_exams
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:59
 * @route '/exams/{category?}'
 */
        category_examsForm.head = (args?: { category?: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: category_exams.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    category_exams.form = category_examsForm
/**
* @see \Modules\Exam\Http\Controllers\ExamController::show
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:124
 * @route '/exams/details/{slug}/{id}'
 */
export const show = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/exams/details/{slug}/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamController::show
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:124
 * @route '/exams/details/{slug}/{id}'
 */
show.url = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    slug: args[0],
                    id: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        slug: args.slug,
                                id: args.id,
                }

    return show.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamController::show
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:124
 * @route '/exams/details/{slug}/{id}'
 */
show.get = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Exam\Http\Controllers\ExamController::show
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:124
 * @route '/exams/details/{slug}/{id}'
 */
show.head = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamController::show
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:124
 * @route '/exams/details/{slug}/{id}'
 */
    const showForm = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamController::show
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:124
 * @route '/exams/details/{slug}/{id}'
 */
        showForm.get = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Exam\Http\Controllers\ExamController::show
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:124
 * @route '/exams/details/{slug}/{id}'
 */
        showForm.head = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Exam\Http\Controllers\ExamController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:232
 * @route '/dashboard/exams/{exam}'
 */
export const destroy = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/exams/{exam}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:232
 * @route '/dashboard/exams/{exam}'
 */
destroy.url = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{exam}', parsedArgs.exam.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:232
 * @route '/dashboard/exams/{exam}'
 */
destroy.delete = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:232
 * @route '/dashboard/exams/{exam}'
 */
    const destroyForm = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamController::destroy
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:232
 * @route '/dashboard/exams/{exam}'
 */
        destroyForm.delete = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Exam\Http\Controllers\ExamController::index
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:39
 * @route '/dashboard/exams'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/exams',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamController::index
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:39
 * @route '/dashboard/exams'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamController::index
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:39
 * @route '/dashboard/exams'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Exam\Http\Controllers\ExamController::index
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:39
 * @route '/dashboard/exams'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamController::index
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:39
 * @route '/dashboard/exams'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamController::index
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:39
 * @route '/dashboard/exams'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Exam\Http\Controllers\ExamController::index
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:39
 * @route '/dashboard/exams'
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
* @see \Modules\Exam\Http\Controllers\ExamController::create
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:95
 * @route '/dashboard/exams/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/dashboard/exams/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamController::create
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:95
 * @route '/dashboard/exams/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamController::create
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:95
 * @route '/dashboard/exams/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Exam\Http\Controllers\ExamController::create
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:95
 * @route '/dashboard/exams/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamController::create
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:95
 * @route '/dashboard/exams/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamController::create
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:95
 * @route '/dashboard/exams/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Exam\Http\Controllers\ExamController::create
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:95
 * @route '/dashboard/exams/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \Modules\Exam\Http\Controllers\ExamController::store
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:112
 * @route '/dashboard/exams'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/exams',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamController::store
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:112
 * @route '/dashboard/exams'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamController::store
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:112
 * @route '/dashboard/exams'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamController::store
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:112
 * @route '/dashboard/exams'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamController::store
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:112
 * @route '/dashboard/exams'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Exam\Http\Controllers\ExamController::edit
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:163
 * @route '/dashboard/exams/{exam}/edit'
 */
export const edit = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/exams/{exam}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamController::edit
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:163
 * @route '/dashboard/exams/{exam}/edit'
 */
edit.url = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{exam}', parsedArgs.exam.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamController::edit
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:163
 * @route '/dashboard/exams/{exam}/edit'
 */
edit.get = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Exam\Http\Controllers\ExamController::edit
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:163
 * @route '/dashboard/exams/{exam}/edit'
 */
edit.head = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamController::edit
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:163
 * @route '/dashboard/exams/{exam}/edit'
 */
    const editForm = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamController::edit
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:163
 * @route '/dashboard/exams/{exam}/edit'
 */
        editForm.get = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Exam\Http\Controllers\ExamController::edit
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:163
 * @route '/dashboard/exams/{exam}/edit'
 */
        editForm.head = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \Modules\Exam\Http\Controllers\ExamController::update
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:222
 * @route '/dashboard/exams/{exam}'
 */
export const update = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/dashboard/exams/{exam}',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Exam\Http\Controllers\ExamController::update
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:222
 * @route '/dashboard/exams/{exam}'
 */
update.url = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{exam}', parsedArgs.exam.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Exam\Http\Controllers\ExamController::update
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:222
 * @route '/dashboard/exams/{exam}'
 */
update.post = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Exam\Http\Controllers\ExamController::update
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:222
 * @route '/dashboard/exams/{exam}'
 */
    const updateForm = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Exam\Http\Controllers\ExamController::update
 * @see Modules/Exam/app/Http/Controllers/ExamController.php:222
 * @route '/dashboard/exams/{exam}'
 */
        updateForm.post = (args: { exam: number | { id: number } } | [exam: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
const ExamController = { category_exams, show, destroy, index, create, store, edit, update }

export default ExamController