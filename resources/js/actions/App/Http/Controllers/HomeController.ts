import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\HomeController::index
 * @see app/Http/Controllers/HomeController.php:26
 * @route '/'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomeController::index
 * @see app/Http/Controllers/HomeController.php:26
 * @route '/'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::index
 * @see app/Http/Controllers/HomeController.php:26
 * @route '/'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomeController::index
 * @see app/Http/Controllers/HomeController.php:26
 * @route '/'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomeController::index
 * @see app/Http/Controllers/HomeController.php:26
 * @route '/'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomeController::index
 * @see app/Http/Controllers/HomeController.php:26
 * @route '/'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomeController::index
 * @see app/Http/Controllers/HomeController.php:26
 * @route '/'
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
* @see \App\Http\Controllers\HomeController::demo
 * @see app/Http/Controllers/HomeController.php:75
 * @route '/demo/{slug}'
 */
export const demo = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: demo.url(args, options),
    method: 'get',
})

demo.definition = {
    methods: ["get","head"],
    url: '/demo/{slug}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomeController::demo
 * @see app/Http/Controllers/HomeController.php:75
 * @route '/demo/{slug}'
 */
demo.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return demo.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::demo
 * @see app/Http/Controllers/HomeController.php:75
 * @route '/demo/{slug}'
 */
demo.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: demo.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomeController::demo
 * @see app/Http/Controllers/HomeController.php:75
 * @route '/demo/{slug}'
 */
demo.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: demo.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomeController::demo
 * @see app/Http/Controllers/HomeController.php:75
 * @route '/demo/{slug}'
 */
    const demoForm = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: demo.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomeController::demo
 * @see app/Http/Controllers/HomeController.php:75
 * @route '/demo/{slug}'
 */
        demoForm.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: demo.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomeController::demo
 * @see app/Http/Controllers/HomeController.php:75
 * @route '/demo/{slug}'
 */
        demoForm.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: demo.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    demo.form = demoForm
/**
* @see \App\Http\Controllers\HomeController::sort_section
 * @see app/Http/Controllers/HomeController.php:104
 * @route '/dashboard/page/section/sort'
 */
export const sort_section = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sort_section.url(options),
    method: 'post',
})

sort_section.definition = {
    methods: ["post"],
    url: '/dashboard/page/section/sort',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HomeController::sort_section
 * @see app/Http/Controllers/HomeController.php:104
 * @route '/dashboard/page/section/sort'
 */
sort_section.url = (options?: RouteQueryOptions) => {
    return sort_section.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::sort_section
 * @see app/Http/Controllers/HomeController.php:104
 * @route '/dashboard/page/section/sort'
 */
sort_section.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sort_section.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HomeController::sort_section
 * @see app/Http/Controllers/HomeController.php:104
 * @route '/dashboard/page/section/sort'
 */
    const sort_sectionForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sort_section.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HomeController::sort_section
 * @see app/Http/Controllers/HomeController.php:104
 * @route '/dashboard/page/section/sort'
 */
        sort_sectionForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sort_section.url(options),
            method: 'post',
        })
    
    sort_section.form = sort_sectionForm
/**
* @see \App\Http\Controllers\HomeController::update_section
 * @see app/Http/Controllers/HomeController.php:94
 * @route '/dashboard/page/section/update/{id}'
 */
export const update_section = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update_section.url(args, options),
    method: 'post',
})

update_section.definition = {
    methods: ["post"],
    url: '/dashboard/page/section/update/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HomeController::update_section
 * @see app/Http/Controllers/HomeController.php:94
 * @route '/dashboard/page/section/update/{id}'
 */
update_section.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return update_section.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::update_section
 * @see app/Http/Controllers/HomeController.php:94
 * @route '/dashboard/page/section/update/{id}'
 */
update_section.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update_section.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HomeController::update_section
 * @see app/Http/Controllers/HomeController.php:94
 * @route '/dashboard/page/section/update/{id}'
 */
    const update_sectionForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update_section.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HomeController::update_section
 * @see app/Http/Controllers/HomeController.php:94
 * @route '/dashboard/page/section/update/{id}'
 */
        update_sectionForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update_section.url(args, options),
            method: 'post',
        })
    
    update_section.form = update_sectionForm
/**
* @see \App\Http\Controllers\HomeController::inner_page
 * @see app/Http/Controllers/HomeController.php:111
 * @route '/{slug}'
 */
export const inner_page = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: inner_page.url(args, options),
    method: 'get',
})

inner_page.definition = {
    methods: ["get","head"],
    url: '/{slug}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomeController::inner_page
 * @see app/Http/Controllers/HomeController.php:111
 * @route '/{slug}'
 */
inner_page.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return inner_page.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::inner_page
 * @see app/Http/Controllers/HomeController.php:111
 * @route '/{slug}'
 */
inner_page.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: inner_page.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomeController::inner_page
 * @see app/Http/Controllers/HomeController.php:111
 * @route '/{slug}'
 */
inner_page.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: inner_page.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomeController::inner_page
 * @see app/Http/Controllers/HomeController.php:111
 * @route '/{slug}'
 */
    const inner_pageForm = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: inner_page.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomeController::inner_page
 * @see app/Http/Controllers/HomeController.php:111
 * @route '/{slug}'
 */
        inner_pageForm.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: inner_page.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomeController::inner_page
 * @see app/Http/Controllers/HomeController.php:111
 * @route '/{slug}'
 */
        inner_pageForm.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: inner_page.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    inner_page.form = inner_pageForm
const HomeController = { index, demo, sort_section, update_section, inner_page }

export default HomeController