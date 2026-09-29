import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
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
const home = {
    demo: Object.assign(demo, demo),
}

export default home