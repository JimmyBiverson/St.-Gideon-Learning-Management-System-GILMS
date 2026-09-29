import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import course from './course'
import exam from './exam'
import profile from './profile'
/**
* @see \App\Http\Controllers\StudentController::index
 * @see app/Http/Controllers/StudentController.php:30
 * @route '/student/{tab}'
 */
export const index = (args: { tab: string | number } | [tab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/student/{tab}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StudentController::index
 * @see app/Http/Controllers/StudentController.php:30
 * @route '/student/{tab}'
 */
index.url = (args: { tab: string | number } | [tab: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tab: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    tab: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tab: args.tab,
                }

    return index.definition.url
            .replace('{tab}', parsedArgs.tab.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StudentController::index
 * @see app/Http/Controllers/StudentController.php:30
 * @route '/student/{tab}'
 */
index.get = (args: { tab: string | number } | [tab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StudentController::index
 * @see app/Http/Controllers/StudentController.php:30
 * @route '/student/{tab}'
 */
index.head = (args: { tab: string | number } | [tab: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StudentController::index
 * @see app/Http/Controllers/StudentController.php:30
 * @route '/student/{tab}'
 */
    const indexForm = (args: { tab: string | number } | [tab: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StudentController::index
 * @see app/Http/Controllers/StudentController.php:30
 * @route '/student/{tab}'
 */
        indexForm.get = (args: { tab: string | number } | [tab: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StudentController::index
 * @see app/Http/Controllers/StudentController.php:30
 * @route '/student/{tab}'
 */
        indexForm.head = (args: { tab: string | number } | [tab: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
const student = {
    index: Object.assign(index, index),
course: Object.assign(course, course),
exam: Object.assign(exam, exam),
profile: Object.assign(profile, profile),
}

export default student