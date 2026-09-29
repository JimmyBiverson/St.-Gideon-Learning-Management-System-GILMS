import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\HomeController::sort
 * @see app/Http/Controllers/HomeController.php:104
 * @route '/dashboard/page/section/sort'
 */
export const sort = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sort.url(options),
    method: 'post',
})

sort.definition = {
    methods: ["post"],
    url: '/dashboard/page/section/sort',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HomeController::sort
 * @see app/Http/Controllers/HomeController.php:104
 * @route '/dashboard/page/section/sort'
 */
sort.url = (options?: RouteQueryOptions) => {
    return sort.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::sort
 * @see app/Http/Controllers/HomeController.php:104
 * @route '/dashboard/page/section/sort'
 */
sort.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sort.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HomeController::sort
 * @see app/Http/Controllers/HomeController.php:104
 * @route '/dashboard/page/section/sort'
 */
    const sortForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sort.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HomeController::sort
 * @see app/Http/Controllers/HomeController.php:104
 * @route '/dashboard/page/section/sort'
 */
        sortForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sort.url(options),
            method: 'post',
        })
    
    sort.form = sortForm
/**
* @see \App\Http\Controllers\HomeController::update
 * @see app/Http/Controllers/HomeController.php:94
 * @route '/dashboard/page/section/update/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/dashboard/page/section/update/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HomeController::update
 * @see app/Http/Controllers/HomeController.php:94
 * @route '/dashboard/page/section/update/{id}'
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
* @see \App\Http\Controllers\HomeController::update
 * @see app/Http/Controllers/HomeController.php:94
 * @route '/dashboard/page/section/update/{id}'
 */
update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HomeController::update
 * @see app/Http/Controllers/HomeController.php:94
 * @route '/dashboard/page/section/update/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HomeController::update
 * @see app/Http/Controllers/HomeController.php:94
 * @route '/dashboard/page/section/update/{id}'
 */
        updateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
const section = {
    sort: Object.assign(sort, sort),
update: Object.assign(update, update),
}

export default section