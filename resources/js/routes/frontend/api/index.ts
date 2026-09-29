import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../wayfinder'
/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::update
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:144
 * @route '/dashboard/frontend/api'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/frontend/api',
} satisfies RouteDefinition<["put"]>

/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::update
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:144
 * @route '/dashboard/frontend/api'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::update
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:144
 * @route '/dashboard/frontend/api'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

    /**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::update
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:144
 * @route '/dashboard/frontend/api'
 */
    const updateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url({
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
        updateForm.put = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
const api = {
    update: Object.assign(update, update),
}

export default api