import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../../wayfinder'
/**
* @see \Modules\Course\Http\Controllers\CourseController::category_courses
 * @see Modules/Course/app/Http/Controllers/CourseController.php:66
 * @route '/courses/{category}/{category_child?}'
 */
export const category_courses = (args: { category: string | number, category_child?: string | number } | [category: string | number, category_child: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: category_courses.url(args, options),
    method: 'get',
})

category_courses.definition = {
    methods: ["get","head"],
    url: '/courses/{category}/{category_child?}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\CourseController::category_courses
 * @see Modules/Course/app/Http/Controllers/CourseController.php:66
 * @route '/courses/{category}/{category_child?}'
 */
category_courses.url = (args: { category: string | number, category_child?: string | number } | [category: string | number, category_child: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    category: args[0],
                    category_child: args[1],
                }
    }

    args = applyUrlDefaults(args)

    validateParameters(args, [
            "category_child",
        ])

    const parsedArgs = {
                        category: args.category,
                                category_child: args.category_child,
                }

    return category_courses.definition.url
            .replace('{category}', parsedArgs.category.toString())
            .replace('{category_child?}', parsedArgs.category_child?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseController::category_courses
 * @see Modules/Course/app/Http/Controllers/CourseController.php:66
 * @route '/courses/{category}/{category_child?}'
 */
category_courses.get = (args: { category: string | number, category_child?: string | number } | [category: string | number, category_child: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: category_courses.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\CourseController::category_courses
 * @see Modules/Course/app/Http/Controllers/CourseController.php:66
 * @route '/courses/{category}/{category_child?}'
 */
category_courses.head = (args: { category: string | number, category_child?: string | number } | [category: string | number, category_child: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: category_courses.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseController::category_courses
 * @see Modules/Course/app/Http/Controllers/CourseController.php:66
 * @route '/courses/{category}/{category_child?}'
 */
    const category_coursesForm = (args: { category: string | number, category_child?: string | number } | [category: string | number, category_child: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: category_courses.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseController::category_courses
 * @see Modules/Course/app/Http/Controllers/CourseController.php:66
 * @route '/courses/{category}/{category_child?}'
 */
        category_coursesForm.get = (args: { category: string | number, category_child?: string | number } | [category: string | number, category_child: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: category_courses.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\CourseController::category_courses
 * @see Modules/Course/app/Http/Controllers/CourseController.php:66
 * @route '/courses/{category}/{category_child?}'
 */
        category_coursesForm.head = (args: { category: string | number, category_child?: string | number } | [category: string | number, category_child: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: category_courses.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    category_courses.form = category_coursesForm
/**
* @see \Modules\Course\Http\Controllers\CourseController::show
 * @see Modules/Course/app/Http/Controllers/CourseController.php:148
 * @route '/courses/details/{slug}/{id}'
 */
const show29b7a6776150080accfc14b1930dc5fa = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show29b7a6776150080accfc14b1930dc5fa.url(args, options),
    method: 'get',
})

show29b7a6776150080accfc14b1930dc5fa.definition = {
    methods: ["get","head"],
    url: '/courses/details/{slug}/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\CourseController::show
 * @see Modules/Course/app/Http/Controllers/CourseController.php:148
 * @route '/courses/details/{slug}/{id}'
 */
show29b7a6776150080accfc14b1930dc5fa.url = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions) => {
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

    return show29b7a6776150080accfc14b1930dc5fa.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseController::show
 * @see Modules/Course/app/Http/Controllers/CourseController.php:148
 * @route '/courses/details/{slug}/{id}'
 */
show29b7a6776150080accfc14b1930dc5fa.get = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show29b7a6776150080accfc14b1930dc5fa.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\CourseController::show
 * @see Modules/Course/app/Http/Controllers/CourseController.php:148
 * @route '/courses/details/{slug}/{id}'
 */
show29b7a6776150080accfc14b1930dc5fa.head = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show29b7a6776150080accfc14b1930dc5fa.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseController::show
 * @see Modules/Course/app/Http/Controllers/CourseController.php:148
 * @route '/courses/details/{slug}/{id}'
 */
    const show29b7a6776150080accfc14b1930dc5faForm = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show29b7a6776150080accfc14b1930dc5fa.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseController::show
 * @see Modules/Course/app/Http/Controllers/CourseController.php:148
 * @route '/courses/details/{slug}/{id}'
 */
        show29b7a6776150080accfc14b1930dc5faForm.get = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show29b7a6776150080accfc14b1930dc5fa.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\CourseController::show
 * @see Modules/Course/app/Http/Controllers/CourseController.php:148
 * @route '/courses/details/{slug}/{id}'
 */
        show29b7a6776150080accfc14b1930dc5faForm.head = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show29b7a6776150080accfc14b1930dc5fa.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show29b7a6776150080accfc14b1930dc5fa.form = show29b7a6776150080accfc14b1930dc5faForm
    /**
* @see \Modules\Course\Http\Controllers\CourseController::show
 * @see Modules/Course/app/Http/Controllers/CourseController.php:148
 * @route '/dashboard/courses/{course}'
 */
const showf2bad258ac59202dd211a45f266dc62d = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showf2bad258ac59202dd211a45f266dc62d.url(args, options),
    method: 'get',
})

showf2bad258ac59202dd211a45f266dc62d.definition = {
    methods: ["get","head"],
    url: '/dashboard/courses/{course}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Course\Http\Controllers\CourseController::show
 * @see Modules/Course/app/Http/Controllers/CourseController.php:148
 * @route '/dashboard/courses/{course}'
 */
showf2bad258ac59202dd211a45f266dc62d.url = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return showf2bad258ac59202dd211a45f266dc62d.definition.url
            .replace('{course}', parsedArgs.course.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseController::show
 * @see Modules/Course/app/Http/Controllers/CourseController.php:148
 * @route '/dashboard/courses/{course}'
 */
showf2bad258ac59202dd211a45f266dc62d.get = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showf2bad258ac59202dd211a45f266dc62d.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Course\Http\Controllers\CourseController::show
 * @see Modules/Course/app/Http/Controllers/CourseController.php:148
 * @route '/dashboard/courses/{course}'
 */
showf2bad258ac59202dd211a45f266dc62d.head = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showf2bad258ac59202dd211a45f266dc62d.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseController::show
 * @see Modules/Course/app/Http/Controllers/CourseController.php:148
 * @route '/dashboard/courses/{course}'
 */
    const showf2bad258ac59202dd211a45f266dc62dForm = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showf2bad258ac59202dd211a45f266dc62d.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseController::show
 * @see Modules/Course/app/Http/Controllers/CourseController.php:148
 * @route '/dashboard/courses/{course}'
 */
        showf2bad258ac59202dd211a45f266dc62dForm.get = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showf2bad258ac59202dd211a45f266dc62d.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Course\Http\Controllers\CourseController::show
 * @see Modules/Course/app/Http/Controllers/CourseController.php:148
 * @route '/dashboard/courses/{course}'
 */
        showf2bad258ac59202dd211a45f266dc62dForm.head = (args: { course: string | number } | [course: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showf2bad258ac59202dd211a45f266dc62d.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showf2bad258ac59202dd211a45f266dc62d.form = showf2bad258ac59202dd211a45f266dc62dForm

export const show = {
    '/courses/details/{slug}/{id}': show29b7a6776150080accfc14b1930dc5fa,
    '/dashboard/courses/{course}': showf2bad258ac59202dd211a45f266dc62d,
}

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
/**
* @see \Modules\Course\Http\Controllers\CourseController::status
 * @see Modules/Course/app/Http/Controllers/CourseController.php:273
 * @route '/dashboard/course/status/{id}'
 */
export const status = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: status.url(args, options),
    method: 'put',
})

status.definition = {
    methods: ["put"],
    url: '/dashboard/course/status/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Course\Http\Controllers\CourseController::status
 * @see Modules/Course/app/Http/Controllers/CourseController.php:273
 * @route '/dashboard/course/status/{id}'
 */
status.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return status.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Course\Http\Controllers\CourseController::status
 * @see Modules/Course/app/Http/Controllers/CourseController.php:273
 * @route '/dashboard/course/status/{id}'
 */
status.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: status.url(args, options),
    method: 'put',
})

    /**
* @see \Modules\Course\Http\Controllers\CourseController::status
 * @see Modules/Course/app/Http/Controllers/CourseController.php:273
 * @route '/dashboard/course/status/{id}'
 */
    const statusForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: status.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Course\Http\Controllers\CourseController::status
 * @see Modules/Course/app/Http/Controllers/CourseController.php:273
 * @route '/dashboard/course/status/{id}'
 */
        statusForm.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: status.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    status.form = statusForm
const CourseController = { category_courses, show, destroy, index, create, store, edit, update, status }

export default CourseController