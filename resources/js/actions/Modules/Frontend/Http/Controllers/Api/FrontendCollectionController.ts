import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../../wayfinder'
/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::index
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:30
 * @route '/api/collections'
 */
const index5b0abeff92278057580d537e148f3185 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index5b0abeff92278057580d537e148f3185.url(options),
    method: 'get',
})

index5b0abeff92278057580d537e148f3185.definition = {
    methods: ["get","head"],
    url: '/api/collections',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::index
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:30
 * @route '/api/collections'
 */
index5b0abeff92278057580d537e148f3185.url = (options?: RouteQueryOptions) => {
    return index5b0abeff92278057580d537e148f3185.definition.url + queryParams(options)
}

/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::index
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:30
 * @route '/api/collections'
 */
index5b0abeff92278057580d537e148f3185.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index5b0abeff92278057580d537e148f3185.url(options),
    method: 'get',
})
/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::index
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:30
 * @route '/api/collections'
 */
index5b0abeff92278057580d537e148f3185.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index5b0abeff92278057580d537e148f3185.url(options),
    method: 'head',
})

    /**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::index
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:30
 * @route '/api/collections'
 */
    const index5b0abeff92278057580d537e148f3185Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index5b0abeff92278057580d537e148f3185.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::index
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:30
 * @route '/api/collections'
 */
        index5b0abeff92278057580d537e148f3185Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index5b0abeff92278057580d537e148f3185.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::index
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:30
 * @route '/api/collections'
 */
        index5b0abeff92278057580d537e148f3185Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index5b0abeff92278057580d537e148f3185.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index5b0abeff92278057580d537e148f3185.form = index5b0abeff92278057580d537e148f3185Form
    /**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::index
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:30
 * @route '/dashboard/frontend/api'
 */
const indexab18167a3a329cfecc3de58de5849662 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexab18167a3a329cfecc3de58de5849662.url(options),
    method: 'get',
})

indexab18167a3a329cfecc3de58de5849662.definition = {
    methods: ["get","head"],
    url: '/dashboard/frontend/api',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::index
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:30
 * @route '/dashboard/frontend/api'
 */
indexab18167a3a329cfecc3de58de5849662.url = (options?: RouteQueryOptions) => {
    return indexab18167a3a329cfecc3de58de5849662.definition.url + queryParams(options)
}

/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::index
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:30
 * @route '/dashboard/frontend/api'
 */
indexab18167a3a329cfecc3de58de5849662.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: indexab18167a3a329cfecc3de58de5849662.url(options),
    method: 'get',
})
/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::index
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:30
 * @route '/dashboard/frontend/api'
 */
indexab18167a3a329cfecc3de58de5849662.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: indexab18167a3a329cfecc3de58de5849662.url(options),
    method: 'head',
})

    /**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::index
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:30
 * @route '/dashboard/frontend/api'
 */
    const indexab18167a3a329cfecc3de58de5849662Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: indexab18167a3a329cfecc3de58de5849662.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::index
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:30
 * @route '/dashboard/frontend/api'
 */
        indexab18167a3a329cfecc3de58de5849662Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexab18167a3a329cfecc3de58de5849662.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::index
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:30
 * @route '/dashboard/frontend/api'
 */
        indexab18167a3a329cfecc3de58de5849662Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: indexab18167a3a329cfecc3de58de5849662.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    indexab18167a3a329cfecc3de58de5849662.form = indexab18167a3a329cfecc3de58de5849662Form

export const index = {
    '/api/collections': index5b0abeff92278057580d537e148f3185,
    '/dashboard/frontend/api': indexab18167a3a329cfecc3de58de5849662,
}

/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::show
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:106
 * @route '/api/collections/{type}/{category}'
 */
export const show = (args: { type: string | number, category: string | number } | [type: string | number, category: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/api/collections/{type}/{category}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::show
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:106
 * @route '/api/collections/{type}/{category}'
 */
show.url = (args: { type: string | number, category: string | number } | [type: string | number, category: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    type: args[0],
                    category: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        type: args.type,
                                category: args.category,
                }

    return show.definition.url
            .replace('{type}', parsedArgs.type.toString())
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::show
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:106
 * @route '/api/collections/{type}/{category}'
 */
show.get = (args: { type: string | number, category: string | number } | [type: string | number, category: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::show
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:106
 * @route '/api/collections/{type}/{category}'
 */
show.head = (args: { type: string | number, category: string | number } | [type: string | number, category: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::show
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:106
 * @route '/api/collections/{type}/{category}'
 */
    const showForm = (args: { type: string | number, category: string | number } | [type: string | number, category: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::show
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:106
 * @route '/api/collections/{type}/{category}'
 */
        showForm.get = (args: { type: string | number, category: string | number } | [type: string | number, category: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::show
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:106
 * @route '/api/collections/{type}/{category}'
 */
        showForm.head = (args: { type: string | number, category: string | number } | [type: string | number, category: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::update
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:144
 * @route '/api/collections/{type}/{category}'
 */
const update4df1c692daa2cc80d8e11c003065df8d = (args: { type: string | number, category: string | number } | [type: string | number, category: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update4df1c692daa2cc80d8e11c003065df8d.url(args, options),
    method: 'put',
})

update4df1c692daa2cc80d8e11c003065df8d.definition = {
    methods: ["put","patch"],
    url: '/api/collections/{type}/{category}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::update
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:144
 * @route '/api/collections/{type}/{category}'
 */
update4df1c692daa2cc80d8e11c003065df8d.url = (args: { type: string | number, category: string | number } | [type: string | number, category: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    type: args[0],
                    category: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        type: args.type,
                                category: args.category,
                }

    return update4df1c692daa2cc80d8e11c003065df8d.definition.url
            .replace('{type}', parsedArgs.type.toString())
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::update
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:144
 * @route '/api/collections/{type}/{category}'
 */
update4df1c692daa2cc80d8e11c003065df8d.put = (args: { type: string | number, category: string | number } | [type: string | number, category: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update4df1c692daa2cc80d8e11c003065df8d.url(args, options),
    method: 'put',
})
/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::update
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:144
 * @route '/api/collections/{type}/{category}'
 */
update4df1c692daa2cc80d8e11c003065df8d.patch = (args: { type: string | number, category: string | number } | [type: string | number, category: string | number ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update4df1c692daa2cc80d8e11c003065df8d.url(args, options),
    method: 'patch',
})

    /**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::update
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:144
 * @route '/api/collections/{type}/{category}'
 */
    const update4df1c692daa2cc80d8e11c003065df8dForm = (args: { type: string | number, category: string | number } | [type: string | number, category: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update4df1c692daa2cc80d8e11c003065df8d.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::update
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:144
 * @route '/api/collections/{type}/{category}'
 */
        update4df1c692daa2cc80d8e11c003065df8dForm.put = (args: { type: string | number, category: string | number } | [type: string | number, category: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update4df1c692daa2cc80d8e11c003065df8d.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::update
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:144
 * @route '/api/collections/{type}/{category}'
 */
        update4df1c692daa2cc80d8e11c003065df8dForm.patch = (args: { type: string | number, category: string | number } | [type: string | number, category: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update4df1c692daa2cc80d8e11c003065df8d.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update4df1c692daa2cc80d8e11c003065df8d.form = update4df1c692daa2cc80d8e11c003065df8dForm
    /**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::update
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:144
 * @route '/dashboard/frontend/api'
 */
const updateab18167a3a329cfecc3de58de5849662 = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateab18167a3a329cfecc3de58de5849662.url(options),
    method: 'put',
})

updateab18167a3a329cfecc3de58de5849662.definition = {
    methods: ["put"],
    url: '/dashboard/frontend/api',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::update
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:144
 * @route '/dashboard/frontend/api'
 */
updateab18167a3a329cfecc3de58de5849662.url = (options?: RouteQueryOptions) => {
    return updateab18167a3a329cfecc3de58de5849662.definition.url + queryParams(options)
}

/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::update
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:144
 * @route '/dashboard/frontend/api'
 */
updateab18167a3a329cfecc3de58de5849662.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: updateab18167a3a329cfecc3de58de5849662.url(options),
    method: 'put',
})

    /**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::update
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:144
 * @route '/dashboard/frontend/api'
 */
    const updateab18167a3a329cfecc3de58de5849662Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateab18167a3a329cfecc3de58de5849662.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::update
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:144
 * @route '/dashboard/frontend/api'
 */
        updateab18167a3a329cfecc3de58de5849662Form.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateab18167a3a329cfecc3de58de5849662.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updateab18167a3a329cfecc3de58de5849662.form = updateab18167a3a329cfecc3de58de5849662Form

export const update = {
    '/api/collections/{type}/{category}': update4df1c692daa2cc80d8e11c003065df8d,
    '/dashboard/frontend/api': updateab18167a3a329cfecc3de58de5849662,
}

/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::toggle
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:324
 * @route '/api/collections/{type}/{category}/toggle'
 */
export const toggle = (args: { type: string | number, category: string | number } | [type: string | number, category: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

toggle.definition = {
    methods: ["post"],
    url: '/api/collections/{type}/{category}/toggle',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::toggle
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:324
 * @route '/api/collections/{type}/{category}/toggle'
 */
toggle.url = (args: { type: string | number, category: string | number } | [type: string | number, category: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    type: args[0],
                    category: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        type: args.type,
                                category: args.category,
                }

    return toggle.definition.url
            .replace('{type}', parsedArgs.type.toString())
            .replace('{category}', parsedArgs.category.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::toggle
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:324
 * @route '/api/collections/{type}/{category}/toggle'
 */
toggle.post = (args: { type: string | number, category: string | number } | [type: string | number, category: string | number ], options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: toggle.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::toggle
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:324
 * @route '/api/collections/{type}/{category}/toggle'
 */
    const toggleForm = (args: { type: string | number, category: string | number } | [type: string | number, category: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: toggle.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::toggle
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:324
 * @route '/api/collections/{type}/{category}/toggle'
 */
        toggleForm.post = (args: { type: string | number, category: string | number } | [type: string | number, category: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: toggle.url(args, options),
            method: 'post',
        })
    
    toggle.form = toggleForm
/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::seeder
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:96
 * @route '/frontend/seeder'
 */
export const seeder = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: seeder.url(options),
    method: 'get',
})

seeder.definition = {
    methods: ["get","head"],
    url: '/frontend/seeder',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::seeder
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:96
 * @route '/frontend/seeder'
 */
seeder.url = (options?: RouteQueryOptions) => {
    return seeder.definition.url + queryParams(options)
}

/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::seeder
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:96
 * @route '/frontend/seeder'
 */
seeder.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: seeder.url(options),
    method: 'get',
})
/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::seeder
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:96
 * @route '/frontend/seeder'
 */
seeder.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: seeder.url(options),
    method: 'head',
})

    /**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::seeder
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:96
 * @route '/frontend/seeder'
 */
    const seederForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: seeder.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::seeder
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:96
 * @route '/frontend/seeder'
 */
        seederForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: seeder.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::seeder
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:96
 * @route '/frontend/seeder'
 */
        seederForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: seeder.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    seeder.form = seederForm
/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::storePage
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:388
 * @route '/api/store-page/{slug}'
 */
export const storePage = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePage.url(args, options),
    method: 'post',
})

storePage.definition = {
    methods: ["post"],
    url: '/api/store-page/{slug}',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::storePage
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:388
 * @route '/api/store-page/{slug}'
 */
storePage.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { slug: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    slug: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        slug: args.slug,
                }

    return storePage.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::storePage
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:388
 * @route '/api/store-page/{slug}'
 */
storePage.post = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storePage.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::storePage
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:388
 * @route '/api/store-page/{slug}'
 */
    const storePageForm = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storePage.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::storePage
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:388
 * @route '/api/store-page/{slug}'
 */
        storePageForm.post = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storePage.url(args, options),
            method: 'post',
        })
    
    storePage.form = storePageForm
const FrontendCollectionController = { index, show, update, toggle, seeder, storePage }

export default FrontendCollectionController