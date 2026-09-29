import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Frontend\Http\Controllers\ProjectController::storeImage
 * @see Modules/Frontend/app/Http/Controllers/ProjectController.php:85
 * @route '/projects/image/store'
 */
export const storeImage = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeImage.url(options),
    method: 'post',
})

storeImage.definition = {
    methods: ["post"],
    url: '/projects/image/store',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Frontend\Http\Controllers\ProjectController::storeImage
 * @see Modules/Frontend/app/Http/Controllers/ProjectController.php:85
 * @route '/projects/image/store'
 */
storeImage.url = (options?: RouteQueryOptions) => {
    return storeImage.definition.url + queryParams(options)
}

/**
* @see \Modules\Frontend\Http\Controllers\ProjectController::storeImage
 * @see Modules/Frontend/app/Http/Controllers/ProjectController.php:85
 * @route '/projects/image/store'
 */
storeImage.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeImage.url(options),
    method: 'post',
})

    /**
* @see \Modules\Frontend\Http\Controllers\ProjectController::storeImage
 * @see Modules/Frontend/app/Http/Controllers/ProjectController.php:85
 * @route '/projects/image/store'
 */
    const storeImageForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeImage.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Frontend\Http\Controllers\ProjectController::storeImage
 * @see Modules/Frontend/app/Http/Controllers/ProjectController.php:85
 * @route '/projects/image/store'
 */
        storeImageForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeImage.url(options),
            method: 'post',
        })
    
    storeImage.form = storeImageForm
/**
* @see \Modules\Frontend\Http\Controllers\ProjectController::deleteImage
 * @see Modules/Frontend/app/Http/Controllers/ProjectController.php:111
 * @route '/projects/image/{project}/{image}'
 */
export const deleteImage = (args: { project: number | { id: number }, image: string | number } | [project: number | { id: number }, image: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteImage.url(args, options),
    method: 'delete',
})

deleteImage.definition = {
    methods: ["delete"],
    url: '/projects/image/{project}/{image}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Frontend\Http\Controllers\ProjectController::deleteImage
 * @see Modules/Frontend/app/Http/Controllers/ProjectController.php:111
 * @route '/projects/image/{project}/{image}'
 */
deleteImage.url = (args: { project: number | { id: number }, image: string | number } | [project: number | { id: number }, image: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    project: args[0],
                    image: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project: typeof args.project === 'object'
                ? args.project.id
                : args.project,
                                image: args.image,
                }

    return deleteImage.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace('{image}', parsedArgs.image.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Frontend\Http\Controllers\ProjectController::deleteImage
 * @see Modules/Frontend/app/Http/Controllers/ProjectController.php:111
 * @route '/projects/image/{project}/{image}'
 */
deleteImage.delete = (args: { project: number | { id: number }, image: string | number } | [project: number | { id: number }, image: string | number ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: deleteImage.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Frontend\Http\Controllers\ProjectController::deleteImage
 * @see Modules/Frontend/app/Http/Controllers/ProjectController.php:111
 * @route '/projects/image/{project}/{image}'
 */
    const deleteImageForm = (args: { project: number | { id: number }, image: string | number } | [project: number | { id: number }, image: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: deleteImage.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Frontend\Http\Controllers\ProjectController::deleteImage
 * @see Modules/Frontend/app/Http/Controllers/ProjectController.php:111
 * @route '/projects/image/{project}/{image}'
 */
        deleteImageForm.delete = (args: { project: number | { id: number }, image: string | number } | [project: number | { id: number }, image: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: deleteImage.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    deleteImage.form = deleteImageForm
const project = {
    storeImage: Object.assign(storeImage, storeImage),
deleteImage: Object.assign(deleteImage, deleteImage),
}

export default project