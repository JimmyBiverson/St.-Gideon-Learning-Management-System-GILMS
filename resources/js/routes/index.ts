import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../wayfinder'
/**
* @see \App\Http\Controllers\HomeController::home
 * @see app/Http/Controllers/HomeController.php:26
 * @route '/'
 */
export const home = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})

home.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomeController::home
 * @see app/Http/Controllers/HomeController.php:26
 * @route '/'
 */
home.url = (options?: RouteQueryOptions) => {
    return home.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomeController::home
 * @see app/Http/Controllers/HomeController.php:26
 * @route '/'
 */
home.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: home.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomeController::home
 * @see app/Http/Controllers/HomeController.php:26
 * @route '/'
 */
home.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: home.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomeController::home
 * @see app/Http/Controllers/HomeController.php:26
 * @route '/'
 */
    const homeForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: home.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomeController::home
 * @see app/Http/Controllers/HomeController.php:26
 * @route '/'
 */
        homeForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomeController::home
 * @see app/Http/Controllers/HomeController.php:26
 * @route '/'
 */
        homeForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: home.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    home.form = homeForm
/**
* @see \App\Http\Controllers\SitemapController::__invoke
 * @see app/Http/Controllers/SitemapController.php:12
 * @route '/sitemap.xml'
 */
export const sitemap = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sitemap.url(options),
    method: 'get',
})

sitemap.definition = {
    methods: ["get","head"],
    url: '/sitemap.xml',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SitemapController::__invoke
 * @see app/Http/Controllers/SitemapController.php:12
 * @route '/sitemap.xml'
 */
sitemap.url = (options?: RouteQueryOptions) => {
    return sitemap.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SitemapController::__invoke
 * @see app/Http/Controllers/SitemapController.php:12
 * @route '/sitemap.xml'
 */
sitemap.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sitemap.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SitemapController::__invoke
 * @see app/Http/Controllers/SitemapController.php:12
 * @route '/sitemap.xml'
 */
sitemap.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: sitemap.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SitemapController::__invoke
 * @see app/Http/Controllers/SitemapController.php:12
 * @route '/sitemap.xml'
 */
    const sitemapForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: sitemap.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SitemapController::__invoke
 * @see app/Http/Controllers/SitemapController.php:12
 * @route '/sitemap.xml'
 */
        sitemapForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: sitemap.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SitemapController::__invoke
 * @see app/Http/Controllers/SitemapController.php:12
 * @route '/sitemap.xml'
 */
        sitemapForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: sitemap.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    sitemap.form = sitemapForm
/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:59
 * @route '/logout'
 */
export const logout = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

logout.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:59
 * @route '/logout'
 */
logout.url = (options?: RouteQueryOptions) => {
    return logout.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:59
 * @route '/logout'
 */
logout.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: logout.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:59
 * @route '/logout'
 */
    const logoutForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: logout.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::logout
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:59
 * @route '/logout'
 */
        logoutForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: logout.url(options),
            method: 'post',
        })
    
    logout.form = logoutForm
/**
* @see \App\Http\Controllers\DashboardController::dashboard
 * @see app/Http/Controllers/DashboardController.php:16
 * @route '/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\DashboardController::dashboard
 * @see app/Http/Controllers/DashboardController.php:16
 * @route '/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\DashboardController::dashboard
 * @see app/Http/Controllers/DashboardController.php:16
 * @route '/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\DashboardController::dashboard
 * @see app/Http/Controllers/DashboardController.php:16
 * @route '/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\DashboardController::dashboard
 * @see app/Http/Controllers/DashboardController.php:16
 * @route '/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\DashboardController::dashboard
 * @see app/Http/Controllers/DashboardController.php:16
 * @route '/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\DashboardController::dashboard
 * @see app/Http/Controllers/DashboardController.php:16
 * @route '/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \Modules\Installer\Http\Controllers\InstallerDBController::checkDatabase
 * @see Modules/Installer/app/Http/Controllers/InstallerDBController.php:14
 * @route '/install/check-database'
 */
export const checkDatabase = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkDatabase.url(options),
    method: 'post',
})

checkDatabase.definition = {
    methods: ["post"],
    url: '/install/check-database',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Installer\Http\Controllers\InstallerDBController::checkDatabase
 * @see Modules/Installer/app/Http/Controllers/InstallerDBController.php:14
 * @route '/install/check-database'
 */
checkDatabase.url = (options?: RouteQueryOptions) => {
    return checkDatabase.definition.url + queryParams(options)
}

/**
* @see \Modules\Installer\Http\Controllers\InstallerDBController::checkDatabase
 * @see Modules/Installer/app/Http/Controllers/InstallerDBController.php:14
 * @route '/install/check-database'
 */
checkDatabase.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: checkDatabase.url(options),
    method: 'post',
})

    /**
* @see \Modules\Installer\Http\Controllers\InstallerDBController::checkDatabase
 * @see Modules/Installer/app/Http/Controllers/InstallerDBController.php:14
 * @route '/install/check-database'
 */
    const checkDatabaseForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: checkDatabase.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Installer\Http\Controllers\InstallerDBController::checkDatabase
 * @see Modules/Installer/app/Http/Controllers/InstallerDBController.php:14
 * @route '/install/check-database'
 */
        checkDatabaseForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: checkDatabase.url(options),
            method: 'post',
        })
    
    checkDatabase.form = checkDatabaseForm
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::generateAppKey
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:341
 * @route '/install/generate-app-key'
 */
export const generateAppKey = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateAppKey.url(options),
    method: 'get',
})

generateAppKey.definition = {
    methods: ["get","head"],
    url: '/install/generate-app-key',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::generateAppKey
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:341
 * @route '/install/generate-app-key'
 */
generateAppKey.url = (options?: RouteQueryOptions) => {
    return generateAppKey.definition.url + queryParams(options)
}

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::generateAppKey
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:341
 * @route '/install/generate-app-key'
 */
generateAppKey.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: generateAppKey.url(options),
    method: 'get',
})
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::generateAppKey
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:341
 * @route '/install/generate-app-key'
 */
generateAppKey.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: generateAppKey.url(options),
    method: 'head',
})

    /**
* @see \Modules\Installer\Http\Controllers\InstallerController::generateAppKey
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:341
 * @route '/install/generate-app-key'
 */
    const generateAppKeyForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: generateAppKey.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::generateAppKey
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:341
 * @route '/install/generate-app-key'
 */
        generateAppKeyForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: generateAppKey.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::generateAppKey
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:341
 * @route '/install/generate-app-key'
 */
        generateAppKeyForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: generateAppKey.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    generateAppKey.form = generateAppKeyForm