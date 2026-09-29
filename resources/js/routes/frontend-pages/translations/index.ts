import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Modules\Frontend\Http\Controllers\PageTranslationController::update
 * @see Modules/Frontend/app/Http/Controllers/PageTranslationController.php:26
 * @route '/editor/{project}/{page}/translations/{locale}'
 */
export const update = (args: { project: number | { id: number }, page: number | { id: number }, locale: string | number } | [project: number | { id: number }, page: number | { id: number }, locale: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/editor/{project}/{page}/translations/{locale}',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Frontend\Http\Controllers\PageTranslationController::update
 * @see Modules/Frontend/app/Http/Controllers/PageTranslationController.php:26
 * @route '/editor/{project}/{page}/translations/{locale}'
 */
update.url = (args: { project: number | { id: number }, page: number | { id: number }, locale: string | number } | [project: number | { id: number }, page: number | { id: number }, locale: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    project: args[0],
                    page: args[1],
                    locale: args[2],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project: typeof args.project === 'object'
                ? args.project.id
                : args.project,
                                page: typeof args.page === 'object'
                ? args.page.id
                : args.page,
                                locale: args.locale,
                }

    return update.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace('{page}', parsedArgs.page.toString())
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Frontend\Http\Controllers\PageTranslationController::update
 * @see Modules/Frontend/app/Http/Controllers/PageTranslationController.php:26
 * @route '/editor/{project}/{page}/translations/{locale}'
 */
update.put = (args: { project: number | { id: number }, page: number | { id: number }, locale: string | number } | [project: number | { id: number }, page: number | { id: number }, locale: string | number ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \Modules\Frontend\Http\Controllers\PageTranslationController::update
 * @see Modules/Frontend/app/Http/Controllers/PageTranslationController.php:26
 * @route '/editor/{project}/{page}/translations/{locale}'
 */
    const updateForm = (args: { project: number | { id: number }, page: number | { id: number }, locale: string | number } | [project: number | { id: number }, page: number | { id: number }, locale: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Frontend\Http\Controllers\PageTranslationController::update
 * @see Modules/Frontend/app/Http/Controllers/PageTranslationController.php:26
 * @route '/editor/{project}/{page}/translations/{locale}'
 */
        updateForm.put = (args: { project: number | { id: number }, page: number | { id: number }, locale: string | number } | [project: number | { id: number }, page: number | { id: number }, locale: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const translations = {
    update: Object.assign(update, update),
}

export default translations