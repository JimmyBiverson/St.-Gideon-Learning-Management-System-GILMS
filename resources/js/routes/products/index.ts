import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../wayfinder'
import images from './images'
import files from './files'
/**
* @see \Modules\Store\Http\Controllers\ProductController::shop
 * @see Modules/Store/app/Http/Controllers/ProductController.php:38
 * @route '/products/{category?}'
 */
export const shop = (args?: { category?: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: shop.url(args, options),
    method: 'get',
})

shop.definition = {
    methods: ["get","head"],
    url: '/products/{category?}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Store\Http\Controllers\ProductController::shop
 * @see Modules/Store/app/Http/Controllers/ProductController.php:38
 * @route '/products/{category?}'
 */
shop.url = (args?: { category?: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return shop.definition.url
            .replace('{category?}', parsedArgs.category?.toString() ?? '')
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductController::shop
 * @see Modules/Store/app/Http/Controllers/ProductController.php:38
 * @route '/products/{category?}'
 */
shop.get = (args?: { category?: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: shop.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Store\Http\Controllers\ProductController::shop
 * @see Modules/Store/app/Http/Controllers/ProductController.php:38
 * @route '/products/{category?}'
 */
shop.head = (args?: { category?: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: shop.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductController::shop
 * @see Modules/Store/app/Http/Controllers/ProductController.php:38
 * @route '/products/{category?}'
 */
    const shopForm = (args?: { category?: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: shop.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductController::shop
 * @see Modules/Store/app/Http/Controllers/ProductController.php:38
 * @route '/products/{category?}'
 */
        shopForm.get = (args?: { category?: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: shop.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Store\Http\Controllers\ProductController::shop
 * @see Modules/Store/app/Http/Controllers/ProductController.php:38
 * @route '/products/{category?}'
 */
        shopForm.head = (args?: { category?: string | number } | [category: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: shop.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    shop.form = shopForm
/**
* @see \Modules\Store\Http\Controllers\ProductController::details
 * @see Modules/Store/app/Http/Controllers/ProductController.php:82
 * @route '/products/details/{slug}/{id}'
 */
export const details = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: details.url(args, options),
    method: 'get',
})

details.definition = {
    methods: ["get","head"],
    url: '/products/details/{slug}/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Store\Http\Controllers\ProductController::details
 * @see Modules/Store/app/Http/Controllers/ProductController.php:82
 * @route '/products/details/{slug}/{id}'
 */
details.url = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions) => {
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

    return details.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductController::details
 * @see Modules/Store/app/Http/Controllers/ProductController.php:82
 * @route '/products/details/{slug}/{id}'
 */
details.get = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: details.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Store\Http\Controllers\ProductController::details
 * @see Modules/Store/app/Http/Controllers/ProductController.php:82
 * @route '/products/details/{slug}/{id}'
 */
details.head = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: details.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductController::details
 * @see Modules/Store/app/Http/Controllers/ProductController.php:82
 * @route '/products/details/{slug}/{id}'
 */
    const detailsForm = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: details.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductController::details
 * @see Modules/Store/app/Http/Controllers/ProductController.php:82
 * @route '/products/details/{slug}/{id}'
 */
        detailsForm.get = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: details.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Store\Http\Controllers\ProductController::details
 * @see Modules/Store/app/Http/Controllers/ProductController.php:82
 * @route '/products/details/{slug}/{id}'
 */
        detailsForm.head = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: details.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    details.form = detailsForm
/**
* @see \Modules\Store\Http\Controllers\ProductController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductController.php:208
 * @route '/dashboard/store/products/{id}'
 */
export const destroy = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/dashboard/store/products/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Store\Http\Controllers\ProductController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductController.php:208
 * @route '/dashboard/store/products/{id}'
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
* @see \Modules\Store\Http\Controllers\ProductController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductController.php:208
 * @route '/dashboard/store/products/{id}'
 */
destroy.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductController.php:208
 * @route '/dashboard/store/products/{id}'
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
* @see \Modules\Store\Http\Controllers\ProductController::destroy
 * @see Modules/Store/app/Http/Controllers/ProductController.php:208
 * @route '/dashboard/store/products/{id}'
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
* @see \Modules\Store\Http\Controllers\ProductController::index
 * @see Modules/Store/app/Http/Controllers/ProductController.php:129
 * @route '/dashboard/store/products'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/store/products',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Store\Http\Controllers\ProductController::index
 * @see Modules/Store/app/Http/Controllers/ProductController.php:129
 * @route '/dashboard/store/products'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductController::index
 * @see Modules/Store/app/Http/Controllers/ProductController.php:129
 * @route '/dashboard/store/products'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Store\Http\Controllers\ProductController::index
 * @see Modules/Store/app/Http/Controllers/ProductController.php:129
 * @route '/dashboard/store/products'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductController::index
 * @see Modules/Store/app/Http/Controllers/ProductController.php:129
 * @route '/dashboard/store/products'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductController::index
 * @see Modules/Store/app/Http/Controllers/ProductController.php:129
 * @route '/dashboard/store/products'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Store\Http\Controllers\ProductController::index
 * @see Modules/Store/app/Http/Controllers/ProductController.php:129
 * @route '/dashboard/store/products'
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
* @see \Modules\Store\Http\Controllers\ProductController::create
 * @see Modules/Store/app/Http/Controllers/ProductController.php:149
 * @route '/dashboard/store/products/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/dashboard/store/products/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Store\Http\Controllers\ProductController::create
 * @see Modules/Store/app/Http/Controllers/ProductController.php:149
 * @route '/dashboard/store/products/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductController::create
 * @see Modules/Store/app/Http/Controllers/ProductController.php:149
 * @route '/dashboard/store/products/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \Modules\Store\Http\Controllers\ProductController::create
 * @see Modules/Store/app/Http/Controllers/ProductController.php:149
 * @route '/dashboard/store/products/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductController::create
 * @see Modules/Store/app/Http/Controllers/ProductController.php:149
 * @route '/dashboard/store/products/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductController::create
 * @see Modules/Store/app/Http/Controllers/ProductController.php:149
 * @route '/dashboard/store/products/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Store\Http\Controllers\ProductController::create
 * @see Modules/Store/app/Http/Controllers/ProductController.php:149
 * @route '/dashboard/store/products/create'
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
* @see \Modules\Store\Http\Controllers\ProductController::store
 * @see Modules/Store/app/Http/Controllers/ProductController.php:165
 * @route '/dashboard/store/products'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/dashboard/store/products',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Store\Http\Controllers\ProductController::store
 * @see Modules/Store/app/Http/Controllers/ProductController.php:165
 * @route '/dashboard/store/products'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductController::store
 * @see Modules/Store/app/Http/Controllers/ProductController.php:165
 * @route '/dashboard/store/products'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductController::store
 * @see Modules/Store/app/Http/Controllers/ProductController.php:165
 * @route '/dashboard/store/products'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductController::store
 * @see Modules/Store/app/Http/Controllers/ProductController.php:165
 * @route '/dashboard/store/products'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Store\Http\Controllers\ProductController::edit
 * @see Modules/Store/app/Http/Controllers/ProductController.php:172
 * @route '/dashboard/store/products/{product}/edit'
 */
export const edit = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/dashboard/store/products/{product}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Store\Http\Controllers\ProductController::edit
 * @see Modules/Store/app/Http/Controllers/ProductController.php:172
 * @route '/dashboard/store/products/{product}/edit'
 */
edit.url = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { product: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    product: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        product: args.product,
                }

    return edit.definition.url
            .replace('{product}', parsedArgs.product.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductController::edit
 * @see Modules/Store/app/Http/Controllers/ProductController.php:172
 * @route '/dashboard/store/products/{product}/edit'
 */
edit.get = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Store\Http\Controllers\ProductController::edit
 * @see Modules/Store/app/Http/Controllers/ProductController.php:172
 * @route '/dashboard/store/products/{product}/edit'
 */
edit.head = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductController::edit
 * @see Modules/Store/app/Http/Controllers/ProductController.php:172
 * @route '/dashboard/store/products/{product}/edit'
 */
    const editForm = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductController::edit
 * @see Modules/Store/app/Http/Controllers/ProductController.php:172
 * @route '/dashboard/store/products/{product}/edit'
 */
        editForm.get = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Store\Http\Controllers\ProductController::edit
 * @see Modules/Store/app/Http/Controllers/ProductController.php:172
 * @route '/dashboard/store/products/{product}/edit'
 */
        editForm.head = (args: { product: string | number } | [product: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \Modules\Store\Http\Controllers\ProductController::update
 * @see Modules/Store/app/Http/Controllers/ProductController.php:194
 * @route '/dashboard/store/products/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/dashboard/store/products/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Store\Http\Controllers\ProductController::update
 * @see Modules/Store/app/Http/Controllers/ProductController.php:194
 * @route '/dashboard/store/products/{id}'
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
* @see \Modules\Store\Http\Controllers\ProductController::update
 * @see Modules/Store/app/Http/Controllers/ProductController.php:194
 * @route '/dashboard/store/products/{id}'
 */
update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductController::update
 * @see Modules/Store/app/Http/Controllers/ProductController.php:194
 * @route '/dashboard/store/products/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductController::update
 * @see Modules/Store/app/Http/Controllers/ProductController.php:194
 * @route '/dashboard/store/products/{id}'
 */
        updateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
const products = {
    shop: Object.assign(shop, shop),
details: Object.assign(details, details),
destroy: Object.assign(destroy, destroy),
index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
images: Object.assign(images, images),
files: Object.assign(files, files),
update: Object.assign(update, update),
}

export default products