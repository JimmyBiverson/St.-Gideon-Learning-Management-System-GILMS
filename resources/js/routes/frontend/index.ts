import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import api3b9ccf from './api'
/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::api
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:30
 * @route '/dashboard/frontend/api'
 */
export const api = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: api.url(options),
    method: 'get',
})

api.definition = {
    methods: ["get","head"],
    url: '/dashboard/frontend/api',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::api
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:30
 * @route '/dashboard/frontend/api'
 */
api.url = (options?: RouteQueryOptions) => {
    return api.definition.url + queryParams(options)
}

/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::api
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:30
 * @route '/dashboard/frontend/api'
 */
api.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: api.url(options),
    method: 'get',
})
/**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::api
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:30
 * @route '/dashboard/frontend/api'
 */
api.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: api.url(options),
    method: 'head',
})

    /**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::api
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:30
 * @route '/dashboard/frontend/api'
 */
    const apiForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: api.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::api
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:30
 * @route '/dashboard/frontend/api'
 */
        apiForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: api.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Frontend\Http\Controllers\Api\FrontendCollectionController::api
 * @see Modules/Frontend/app/Http/Controllers/Api/FrontendCollectionController.php:30
 * @route '/dashboard/frontend/api'
 */
        apiForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: api.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    api.form = apiForm
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
const frontend = {
    api: Object.assign(api, api3b9ccf),
seeder: Object.assign(seeder, seeder),
}

export default frontend