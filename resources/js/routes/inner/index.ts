import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\HomeController::page
 * @see app/Http/Controllers/HomeController.php:111
 * @route '/{slug}'
 */
export const page = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(args, options),
    method: 'get',
})

page.definition = {
    methods: ["get","head"],
    url: '/{slug}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomeController::page
 * @see app/Http/Controllers/HomeController.php:111
 * @route '/{slug}'
 */
page.url = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return page.definition.url
            .replace('{slug}', parsedArgs.slug.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::page
 * @see app/Http/Controllers/HomeController.php:111
 * @route '/{slug}'
 */
page.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: page.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomeController::page
 * @see app/Http/Controllers/HomeController.php:111
 * @route '/{slug}'
 */
page.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: page.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomeController::page
 * @see app/Http/Controllers/HomeController.php:111
 * @route '/{slug}'
 */
    const pageForm = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: page.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomeController::page
 * @see app/Http/Controllers/HomeController.php:111
 * @route '/{slug}'
 */
        pageForm.get = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: page.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomeController::page
 * @see app/Http/Controllers/HomeController.php:111
 * @route '/{slug}'
 */
        pageForm.head = (args: { slug: string | number } | [slug: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: page.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    page.form = pageForm
const inner = {
    page: Object.assign(page, page),
}

export default inner