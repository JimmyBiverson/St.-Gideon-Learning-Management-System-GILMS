import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
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
const api = {
    storePage: Object.assign(storePage, storePage),
}

export default api