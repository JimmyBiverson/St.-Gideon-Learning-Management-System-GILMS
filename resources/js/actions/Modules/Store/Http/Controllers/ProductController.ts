import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults, validateParameters } from './../../../../../wayfinder'
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
* @see \Modules\Store\Http\Controllers\ProductController::show
 * @see Modules/Store/app/Http/Controllers/ProductController.php:82
 * @route '/products/details/{slug}/{id}'
 */
export const show = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/products/details/{slug}/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Store\Http\Controllers\ProductController::show
 * @see Modules/Store/app/Http/Controllers/ProductController.php:82
 * @route '/products/details/{slug}/{id}'
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
* @see \Modules\Store\Http\Controllers\ProductController::show
 * @see Modules/Store/app/Http/Controllers/ProductController.php:82
 * @route '/products/details/{slug}/{id}'
 */
show.get = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Store\Http\Controllers\ProductController::show
 * @see Modules/Store/app/Http/Controllers/ProductController.php:82
 * @route '/products/details/{slug}/{id}'
 */
show.head = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductController::show
 * @see Modules/Store/app/Http/Controllers/ProductController.php:82
 * @route '/products/details/{slug}/{id}'
 */
    const showForm = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductController::show
 * @see Modules/Store/app/Http/Controllers/ProductController.php:82
 * @route '/products/details/{slug}/{id}'
 */
        showForm.get = (args: { slug: string | number, id: string | number } | [slug: string | number, id: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Store\Http\Controllers\ProductController::show
 * @see Modules/Store/app/Http/Controllers/ProductController.php:82
 * @route '/products/details/{slug}/{id}'
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
* @see \Modules\Store\Http\Controllers\ProductController::storeImage
 * @see Modules/Store/app/Http/Controllers/ProductController.php:218
 * @route '/dashboard/store/products/images'
 */
export const storeImage = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeImage.url(options),
    method: 'post',
})

storeImage.definition = {
    methods: ["post"],
    url: '/dashboard/store/products/images',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Store\Http\Controllers\ProductController::storeImage
 * @see Modules/Store/app/Http/Controllers/ProductController.php:218
 * @route '/dashboard/store/products/images'
 */
storeImage.url = (options?: RouteQueryOptions) => {
    return storeImage.definition.url + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductController::storeImage
 * @see Modules/Store/app/Http/Controllers/ProductController.php:218
 * @route '/dashboard/store/products/images'
 */
storeImage.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeImage.url(options),
    method: 'post',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductController::storeImage
 * @see Modules/Store/app/Http/Controllers/ProductController.php:218
 * @route '/dashboard/store/products/images'
 */
    const storeImageForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeImage.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductController::storeImage
 * @see Modules/Store/app/Http/Controllers/ProductController.php:218
 * @route '/dashboard/store/products/images'
 */
        storeImageForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeImage.url(options),
            method: 'post',
        })
    
    storeImage.form = storeImageForm
/**
* @see \Modules\Store\Http\Controllers\ProductController::destroyImage
 * @see Modules/Store/app/Http/Controllers/ProductController.php:232
 * @route '/dashboard/store/products/{product}/images/{media}'
 */
export const destroyImage = (args: { product: number | { id: number }, media: string | number } | [product: number | { id: number }, media: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyImage.url(args, options),
    method: 'delete',
})

destroyImage.definition = {
    methods: ["delete"],
    url: '/dashboard/store/products/{product}/images/{media}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Store\Http\Controllers\ProductController::destroyImage
 * @see Modules/Store/app/Http/Controllers/ProductController.php:232
 * @route '/dashboard/store/products/{product}/images/{media}'
 */
destroyImage.url = (args: { product: number | { id: number }, media: string | number } | [product: number | { id: number }, media: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    product: args[0],
                    media: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        product: typeof args.product === 'object'
                ? args.product.id
                : args.product,
                                media: args.media,
                }

    return destroyImage.definition.url
            .replace('{product}', parsedArgs.product.toString())
            .replace('{media}', parsedArgs.media.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductController::destroyImage
 * @see Modules/Store/app/Http/Controllers/ProductController.php:232
 * @route '/dashboard/store/products/{product}/images/{media}'
 */
destroyImage.delete = (args: { product: number | { id: number }, media: string | number } | [product: number | { id: number }, media: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyImage.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductController::destroyImage
 * @see Modules/Store/app/Http/Controllers/ProductController.php:232
 * @route '/dashboard/store/products/{product}/images/{media}'
 */
    const destroyImageForm = (args: { product: number | { id: number }, media: string | number } | [product: number | { id: number }, media: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyImage.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductController::destroyImage
 * @see Modules/Store/app/Http/Controllers/ProductController.php:232
 * @route '/dashboard/store/products/{product}/images/{media}'
 */
        destroyImageForm.delete = (args: { product: number | { id: number }, media: string | number } | [product: number | { id: number }, media: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyImage.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyImage.form = destroyImageForm
/**
* @see \Modules\Store\Http\Controllers\ProductController::storeFile
 * @see Modules/Store/app/Http/Controllers/ProductController.php:242
 * @route '/dashboard/store/products/files'
 */
export const storeFile = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeFile.url(options),
    method: 'post',
})

storeFile.definition = {
    methods: ["post"],
    url: '/dashboard/store/products/files',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Store\Http\Controllers\ProductController::storeFile
 * @see Modules/Store/app/Http/Controllers/ProductController.php:242
 * @route '/dashboard/store/products/files'
 */
storeFile.url = (options?: RouteQueryOptions) => {
    return storeFile.definition.url + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductController::storeFile
 * @see Modules/Store/app/Http/Controllers/ProductController.php:242
 * @route '/dashboard/store/products/files'
 */
storeFile.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeFile.url(options),
    method: 'post',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductController::storeFile
 * @see Modules/Store/app/Http/Controllers/ProductController.php:242
 * @route '/dashboard/store/products/files'
 */
    const storeFileForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeFile.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductController::storeFile
 * @see Modules/Store/app/Http/Controllers/ProductController.php:242
 * @route '/dashboard/store/products/files'
 */
        storeFileForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeFile.url(options),
            method: 'post',
        })
    
    storeFile.form = storeFileForm
/**
* @see \Modules\Store\Http\Controllers\ProductController::destroyFile
 * @see Modules/Store/app/Http/Controllers/ProductController.php:258
 * @route '/dashboard/store/products/{product}/files/{media}'
 */
export const destroyFile = (args: { product: number | { id: number }, media: string | number } | [product: number | { id: number }, media: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyFile.url(args, options),
    method: 'delete',
})

destroyFile.definition = {
    methods: ["delete"],
    url: '/dashboard/store/products/{product}/files/{media}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Store\Http\Controllers\ProductController::destroyFile
 * @see Modules/Store/app/Http/Controllers/ProductController.php:258
 * @route '/dashboard/store/products/{product}/files/{media}'
 */
destroyFile.url = (args: { product: number | { id: number }, media: string | number } | [product: number | { id: number }, media: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    product: args[0],
                    media: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        product: typeof args.product === 'object'
                ? args.product.id
                : args.product,
                                media: args.media,
                }

    return destroyFile.definition.url
            .replace('{product}', parsedArgs.product.toString())
            .replace('{media}', parsedArgs.media.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductController::destroyFile
 * @see Modules/Store/app/Http/Controllers/ProductController.php:258
 * @route '/dashboard/store/products/{product}/files/{media}'
 */
destroyFile.delete = (args: { product: number | { id: number }, media: string | number } | [product: number | { id: number }, media: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroyFile.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductController::destroyFile
 * @see Modules/Store/app/Http/Controllers/ProductController.php:258
 * @route '/dashboard/store/products/{product}/files/{media}'
 */
    const destroyFileForm = (args: { product: number | { id: number }, media: string | number } | [product: number | { id: number }, media: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroyFile.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductController::destroyFile
 * @see Modules/Store/app/Http/Controllers/ProductController.php:258
 * @route '/dashboard/store/products/{product}/files/{media}'
 */
        destroyFileForm.delete = (args: { product: number | { id: number }, media: string | number } | [product: number | { id: number }, media: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroyFile.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroyFile.form = destroyFileForm
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
/**
* @see \Modules\Store\Http\Controllers\ProductController::status
 * @see Modules/Store/app/Http/Controllers/ProductController.php:201
 * @route '/dashboard/store/product/status/{id}'
 */
export const status = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: status.url(args, options),
    method: 'put',
})

status.definition = {
    methods: ["put"],
    url: '/dashboard/store/product/status/{id}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Store\Http\Controllers\ProductController::status
 * @see Modules/Store/app/Http/Controllers/ProductController.php:201
 * @route '/dashboard/store/product/status/{id}'
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
* @see \Modules\Store\Http\Controllers\ProductController::status
 * @see Modules/Store/app/Http/Controllers/ProductController.php:201
 * @route '/dashboard/store/product/status/{id}'
 */
status.put = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: status.url(args, options),
    method: 'put',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductController::status
 * @see Modules/Store/app/Http/Controllers/ProductController.php:201
 * @route '/dashboard/store/product/status/{id}'
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
* @see \Modules\Store\Http\Controllers\ProductController::status
 * @see Modules/Store/app/Http/Controllers/ProductController.php:201
 * @route '/dashboard/store/product/status/{id}'
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
const ProductController = { shop, show, destroy, index, create, store, edit, storeImage, destroyImage, storeFile, destroyFile, update, status }

export default ProductController