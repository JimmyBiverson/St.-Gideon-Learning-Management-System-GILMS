import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\AcademicTerminologyController::update
 * @see app/Http/Controllers/AcademicTerminologyController.php:11
 * @route '/dashboard/settings/academic-terminology'
 */
export const update = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/dashboard/settings/academic-terminology',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\AcademicTerminologyController::update
 * @see app/Http/Controllers/AcademicTerminologyController.php:11
 * @route '/dashboard/settings/academic-terminology'
 */
update.url = (options?: RouteQueryOptions) => {
    return update.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\AcademicTerminologyController::update
 * @see app/Http/Controllers/AcademicTerminologyController.php:11
 * @route '/dashboard/settings/academic-terminology'
 */
update.put = (options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\AcademicTerminologyController::update
 * @see app/Http/Controllers/AcademicTerminologyController.php:11
 * @route '/dashboard/settings/academic-terminology'
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
* @see \App\Http\Controllers\AcademicTerminologyController::update
 * @see app/Http/Controllers/AcademicTerminologyController.php:11
 * @route '/dashboard/settings/academic-terminology'
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
const AcademicTerminologyController = { update }

export default AcademicTerminologyController