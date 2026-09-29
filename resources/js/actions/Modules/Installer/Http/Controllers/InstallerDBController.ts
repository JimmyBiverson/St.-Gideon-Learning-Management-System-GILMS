import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\Installer\Http\Controllers\InstallerDBController::databaseChecker
 * @see Modules/Installer/app/Http/Controllers/InstallerDBController.php:14
 * @route '/install/check-database'
 */
export const databaseChecker = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: databaseChecker.url(options),
    method: 'post',
})

databaseChecker.definition = {
    methods: ["post"],
    url: '/install/check-database',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Installer\Http\Controllers\InstallerDBController::databaseChecker
 * @see Modules/Installer/app/Http/Controllers/InstallerDBController.php:14
 * @route '/install/check-database'
 */
databaseChecker.url = (options?: RouteQueryOptions) => {
    return databaseChecker.definition.url + queryParams(options)
}

/**
* @see \Modules\Installer\Http\Controllers\InstallerDBController::databaseChecker
 * @see Modules/Installer/app/Http/Controllers/InstallerDBController.php:14
 * @route '/install/check-database'
 */
databaseChecker.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: databaseChecker.url(options),
    method: 'post',
})

    /**
* @see \Modules\Installer\Http\Controllers\InstallerDBController::databaseChecker
 * @see Modules/Installer/app/Http/Controllers/InstallerDBController.php:14
 * @route '/install/check-database'
 */
    const databaseCheckerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: databaseChecker.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Installer\Http\Controllers\InstallerDBController::databaseChecker
 * @see Modules/Installer/app/Http/Controllers/InstallerDBController.php:14
 * @route '/install/check-database'
 */
        databaseCheckerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: databaseChecker.url(options),
            method: 'post',
        })
    
    databaseChecker.form = databaseCheckerForm
const InstallerDBController = { databaseChecker }

export default InstallerDBController