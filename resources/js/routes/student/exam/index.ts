import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\StudentController::show
 * @see app/Http/Controllers/StudentController.php:66
 * @route '/student/exams/{id}/{tab}'
 */
export const show = (args: { id: string | number, tab: string | number } | [id: string | number, tab: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/student/exams/{id}/{tab}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\StudentController::show
 * @see app/Http/Controllers/StudentController.php:66
 * @route '/student/exams/{id}/{tab}'
 */
show.url = (args: { id: string | number, tab: string | number } | [id: string | number, tab: string | number ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                    tab: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                                tab: args.tab,
                }

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace('{tab}', parsedArgs.tab.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\StudentController::show
 * @see app/Http/Controllers/StudentController.php:66
 * @route '/student/exams/{id}/{tab}'
 */
show.get = (args: { id: string | number, tab: string | number } | [id: string | number, tab: string | number ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\StudentController::show
 * @see app/Http/Controllers/StudentController.php:66
 * @route '/student/exams/{id}/{tab}'
 */
show.head = (args: { id: string | number, tab: string | number } | [id: string | number, tab: string | number ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\StudentController::show
 * @see app/Http/Controllers/StudentController.php:66
 * @route '/student/exams/{id}/{tab}'
 */
    const showForm = (args: { id: string | number, tab: string | number } | [id: string | number, tab: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\StudentController::show
 * @see app/Http/Controllers/StudentController.php:66
 * @route '/student/exams/{id}/{tab}'
 */
        showForm.get = (args: { id: string | number, tab: string | number } | [id: string | number, tab: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\StudentController::show
 * @see app/Http/Controllers/StudentController.php:66
 * @route '/student/exams/{id}/{tab}'
 */
        showForm.head = (args: { id: string | number, tab: string | number } | [id: string | number, tab: string | number ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
const exam = {
    show: Object.assign(show, show),
}

export default exam