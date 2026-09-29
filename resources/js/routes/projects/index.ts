import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Modules\Frontend\Http\Controllers\ProjectController::index
 * @see Modules/Frontend/app/Http/Controllers/ProjectController.php:33
 * @route '/projects'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/projects',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Frontend\Http\Controllers\ProjectController::index
 * @see Modules/Frontend/app/Http/Controllers/ProjectController.php:33
 * @route '/projects'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Frontend\Http\Controllers\ProjectController::index
 * @see Modules/Frontend/app/Http/Controllers/ProjectController.php:33
 * @route '/projects'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Frontend\Http\Controllers\ProjectController::index
 * @see Modules/Frontend/app/Http/Controllers/ProjectController.php:33
 * @route '/projects'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Frontend\Http\Controllers\ProjectController::index
 * @see Modules/Frontend/app/Http/Controllers/ProjectController.php:33
 * @route '/projects'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Frontend\Http\Controllers\ProjectController::index
 * @see Modules/Frontend/app/Http/Controllers/ProjectController.php:33
 * @route '/projects'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Frontend\Http\Controllers\ProjectController::index
 * @see Modules/Frontend/app/Http/Controllers/ProjectController.php:33
 * @route '/projects'
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
* @see \Modules\Frontend\Http\Controllers\ProjectController::update
 * @see Modules/Frontend/app/Http/Controllers/ProjectController.php:65
 * @route '/projects/{project}'
 */
export const update = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/projects/{project}',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Frontend\Http\Controllers\ProjectController::update
 * @see Modules/Frontend/app/Http/Controllers/ProjectController.php:65
 * @route '/projects/{project}'
 */
update.url = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { project: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    project: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project: typeof args.project === 'object'
                ? args.project.id
                : args.project,
                }

    return update.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Frontend\Http\Controllers\ProjectController::update
 * @see Modules/Frontend/app/Http/Controllers/ProjectController.php:65
 * @route '/projects/{project}'
 */
update.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Frontend\Http\Controllers\ProjectController::update
 * @see Modules/Frontend/app/Http/Controllers/ProjectController.php:65
 * @route '/projects/{project}'
 */
    const updateForm = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Frontend\Http\Controllers\ProjectController::update
 * @see Modules/Frontend/app/Http/Controllers/ProjectController.php:65
 * @route '/projects/{project}'
 */
        updateForm.post = (args: { project: number | { id: number } } | [project: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \Modules\Frontend\Http\Controllers\ProjectController::settings
 * @see Modules/Frontend/app/Http/Controllers/ProjectController.php:0
 * @route '/projects/settings/{project}'
 */
export const settings = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: settings.url(args, options),
    method: 'post',
})

settings.definition = {
    methods: ["post"],
    url: '/projects/settings/{project}',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Frontend\Http\Controllers\ProjectController::settings
 * @see Modules/Frontend/app/Http/Controllers/ProjectController.php:0
 * @route '/projects/settings/{project}'
 */
settings.url = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { project: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    project: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        project: args.project,
                }

    return settings.definition.url
            .replace('{project}', parsedArgs.project.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Frontend\Http\Controllers\ProjectController::settings
 * @see Modules/Frontend/app/Http/Controllers/ProjectController.php:0
 * @route '/projects/settings/{project}'
 */
settings.post = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: settings.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Frontend\Http\Controllers\ProjectController::settings
 * @see Modules/Frontend/app/Http/Controllers/ProjectController.php:0
 * @route '/projects/settings/{project}'
 */
    const settingsForm = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: settings.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Frontend\Http\Controllers\ProjectController::settings
 * @see Modules/Frontend/app/Http/Controllers/ProjectController.php:0
 * @route '/projects/settings/{project}'
 */
        settingsForm.post = (args: { project: string | number } | [project: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: settings.url(args, options),
            method: 'post',
        })
    
    settings.form = settingsForm
const projects = {
    index: Object.assign(index, index),
update: Object.assign(update, update),
settings: Object.assign(settings, settings),
}

export default projects