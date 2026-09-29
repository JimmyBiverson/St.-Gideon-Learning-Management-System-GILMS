import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\CourseController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseController.php:280
 * @route '/dashboard/courses/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/courses/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Course\Http\Controllers\CourseController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseController.php:280
 * @route '/dashboard/courses/{id}'
 */
destroy.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseController.php:280
 * @route '/dashboard/courses/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseController.php:280
 * @route '/dashboard/courses/{id}'
 */
    const destroyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseController::destroy
 * @see Modules/Course/app/Http/Controllers/CourseController.php:280
 * @route '/dashboard/courses/{id}'
 */
        destroyForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Modules\Course\Http\Controllers\CourseController::index
 * @see Modules/Course/app/Http/Controllers/CourseController.php:44
 * @route '/dashboard/courses'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/courses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\CourseController::index
 * @see Modules/Course/app/Http/Controllers/CourseController.php:44
 * @route '/dashboard/courses'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseController::index
 * @see Modules/Course/app/Http/Controllers/CourseController.php:44
 * @route '/dashboard/courses'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\CourseController::index
 * @see Modules/Course/app/Http/Controllers/CourseController.php:44
 * @route '/dashboard/courses'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseController::index
 * @see Modules/Course/app/Http/Controllers/CourseController.php:44
 * @route '/dashboard/courses'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseController::index
 * @see Modules/Course/app/Http/Controllers/CourseController.php:44
 * @route '/dashboard/courses'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\CourseController::index
 * @see Modules/Course/app/Http/Controllers/CourseController.php:44
 * @route '/dashboard/courses'
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
* @see \Modules\Course\Http\Controllers\CourseController::create
 * @see Modules/Course/app/Http/Controllers/CourseController.php:109
 * @route '/dashboard/courses/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/dashboard/courses/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\CourseController::create
 * @see Modules/Course/app/Http/Controllers/CourseController.php:109
 * @route '/dashboard/courses/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseController::create
 * @see Modules/Course/app/Http/Controllers/CourseController.php:109
 * @route '/dashboard/courses/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\CourseController::create
 * @see Modules/Course/app/Http/Controllers/CourseController.php:109
 * @route '/dashboard/courses/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseController::create
 * @see Modules/Course/app/Http/Controllers/CourseController.php:109
 * @route '/dashboard/courses/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseController::create
 * @see Modules/Course/app/Http/Controllers/CourseController.php:109
 * @route '/dashboard/courses/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\CourseController::create
 * @see Modules/Course/app/Http/Controllers/CourseController.php:109
 * @route '/dashboard/courses/create'
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
* @see \Modules\Course\Http\Controllers\CourseController::store
 * @see Modules/Course/app/Http/Controllers/CourseController.php:141
 * @route '/dashboard/courses'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/courses',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\CourseController::store
 * @see Modules/Course/app/Http/Controllers/CourseController.php:141
 * @route '/dashboard/courses'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseController::store
 * @see Modules/Course/app/Http/Controllers/CourseController.php:141
 * @route '/dashboard/courses'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseController::store
 * @see Modules/Course/app/Http/Controllers/CourseController.php:141
 * @route '/dashboard/courses'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseController::store
 * @see Modules/Course/app/Http/Controllers/CourseController.php:141
 * @route '/dashboard/courses'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Course\Http\Controllers\CourseController::show
 * @see Modules/Course/app/Http/Controllers/CourseController.php:148
 * @route '/dashboard/courses/{course}'
 */
export const show = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/dashboard/courses/{course}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\CourseController::show
 * @see Modules/Course/app/Http/Controllers/CourseController.php:148
 * @route '/dashboard/courses/{course}'
 */
show.url = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: args.course,
                }

    return show.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseController::show
 * @see Modules/Course/app/Http/Controllers/CourseController.php:148
 * @route '/dashboard/courses/{course}'
 */
show.get = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\CourseController::show
 * @see Modules/Course/app/Http/Controllers/CourseController.php:148
 * @route '/dashboard/courses/{course}'
 */
show.head = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseController::show
 * @see Modules/Course/app/Http/Controllers/CourseController.php:148
 * @route '/dashboard/courses/{course}'
 */
    const showForm = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseController::show
 * @see Modules/Course/app/Http/Controllers/CourseController.php:148
 * @route '/dashboard/courses/{course}'
 */
        showForm.get = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\CourseController::show
 * @see Modules/Course/app/Http/Controllers/CourseController.php:148
 * @route '/dashboard/courses/{course}'
 */
        showForm.head = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Course\Http\Controllers\CourseController::edit
 * @see Modules/Course/app/Http/Controllers/CourseController.php:205
 * @route '/dashboard/courses/{course}/edit'
 */
export const edit = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/courses/{course}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\CourseController::edit
 * @see Modules/Course/app/Http/Controllers/CourseController.php:205
 * @route '/dashboard/courses/{course}/edit'
 */
edit.url = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { course: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    course: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        course: args.course,
                }

    return edit.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseController::edit
 * @see Modules/Course/app/Http/Controllers/CourseController.php:205
 * @route '/dashboard/courses/{course}/edit'
 */
edit.get = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\CourseController::edit
 * @see Modules/Course/app/Http/Controllers/CourseController.php:205
 * @route '/dashboard/courses/{course}/edit'
 */
edit.head = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseController::edit
 * @see Modules/Course/app/Http/Controllers/CourseController.php:205
 * @route '/dashboard/courses/{course}/edit'
 */
    const editForm = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseController::edit
 * @see Modules/Course/app/Http/Controllers/CourseController.php:205
 * @route '/dashboard/courses/{course}/edit'
 */
        editForm.get = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\CourseController::edit
 * @see Modules/Course/app/Http/Controllers/CourseController.php:205
 * @route '/dashboard/courses/{course}/edit'
 */
        editForm.head = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Course\Http\Controllers\CourseController::update
 * @see Modules/Course/app/Http/Controllers/CourseController.php:266
 * @route '/dashboard/courses/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/dashboard/courses/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Course\Http\Controllers\CourseController::update
 * @see Modules/Course/app/Http/Controllers/CourseController.php:266
 * @route '/dashboard/courses/{id}'
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
* @see \Modules\Course\Http\Controllers\CourseController::update
 * @see Modules/Course/app/Http/Controllers/CourseController.php:266
 * @route '/dashboard/courses/{id}'
 */
update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseController::update
 * @see Modules/Course/app/Http/Controllers/CourseController.php:266
 * @route '/dashboard/courses/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseController::update
 * @see Modules/Course/app/Http/Controllers/CourseController.php:266
 * @route '/dashboard/courses/{id}'
 */
        updateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
const courses = {
    destroy: Object.assign(destroy, destroy),
index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
}

export default courses