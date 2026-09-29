import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\InstructorController::store
 * @see app/Http/Controllers/InstructorController.php:50
 * @route '/become-instructor'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/become-instructor',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InstructorController::store
 * @see app/Http/Controllers/InstructorController.php:50
 * @route '/become-instructor'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\InstructorController::store
 * @see app/Http/Controllers/InstructorController.php:50
 * @route '/become-instructor'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\InstructorController::store
 * @see app/Http/Controllers/InstructorController.php:50
 * @route '/become-instructor'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\InstructorController::store
 * @see app/Http/Controllers/InstructorController.php:50
 * @route '/become-instructor'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\InstructorController::update
 * @see app/Http/Controllers/InstructorController.php:104
 * @route '/become-instructor/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/become-instructor/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\InstructorController::update
 * @see app/Http/Controllers/InstructorController.php:104
 * @route '/become-instructor/{id}'
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
* @see \App\Http\Controllers\InstructorController::update
 * @see app/Http/Controllers/InstructorController.php:104
 * @route '/become-instructor/{id}'
 */
update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\InstructorController::update
 * @see app/Http/Controllers/InstructorController.php:104
 * @route '/become-instructor/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\InstructorController::update
 * @see app/Http/Controllers/InstructorController.php:104
 * @route '/become-instructor/{id}'
 */
        updateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
const becomeInstructor = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
}

export default becomeInstructor