import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\Maintenance\Http\Controllers\SystemController::login
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:17
 * @route '/system/login'
 */
export const login = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})

login.definition = {
    methods: ["get","head"],
    url: '/system/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Maintenance\Http\Controllers\SystemController::login
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:17
 * @route '/system/login'
 */
login.url = (options?: RouteQueryOptions) => {
    return login.definition.url + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\SystemController::login
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:17
 * @route '/system/login'
 */
login.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: login.url(options),
    method: 'get',
})
/**
* @see \Modules\Maintenance\Http\Controllers\SystemController::login
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:17
 * @route '/system/login'
 */
login.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: login.url(options),
    method: 'head',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\SystemController::login
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:17
 * @route '/system/login'
 */
    const loginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: login.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\SystemController::login
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:17
 * @route '/system/login'
 */
        loginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Maintenance\Http\Controllers\SystemController::login
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:17
 * @route '/system/login'
 */
        loginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: login.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    login.form = loginForm
/**
* @see \Modules\Maintenance\Http\Controllers\SystemController::verify
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:22
 * @route '/system/login'
 */
export const verify = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(options),
    method: 'post',
})

verify.definition = {
    methods: ["post"],
    url: '/system/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Maintenance\Http\Controllers\SystemController::verify
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:22
 * @route '/system/login'
 */
verify.url = (options?: RouteQueryOptions) => {
    return verify.definition.url + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\SystemController::verify
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:22
 * @route '/system/login'
 */
verify.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verify.url(options),
    method: 'post',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\SystemController::verify
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:22
 * @route '/system/login'
 */
    const verifyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: verify.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\SystemController::verify
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:22
 * @route '/system/login'
 */
        verifyForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: verify.url(options),
            method: 'post',
        })
    
    verify.form = verifyForm
/**
* @see \Modules\Maintenance\Http\Controllers\SystemController::storage
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:30
 * @route '/system/storage'
 */
export const storage = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storage.url(options),
    method: 'post',
})

storage.definition = {
    methods: ["post"],
    url: '/system/storage',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Maintenance\Http\Controllers\SystemController::storage
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:30
 * @route '/system/storage'
 */
storage.url = (options?: RouteQueryOptions) => {
    return storage.definition.url + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\SystemController::storage
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:30
 * @route '/system/storage'
 */
storage.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storage.url(options),
    method: 'post',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\SystemController::storage
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:30
 * @route '/system/storage'
 */
    const storageForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storage.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\SystemController::storage
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:30
 * @route '/system/storage'
 */
        storageForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storage.url(options),
            method: 'post',
        })
    
    storage.form = storageForm
/**
* @see \Modules\Maintenance\Http\Controllers\SystemController::refresh
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:37
 * @route '/system/refresh'
 */
export const refresh = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: refresh.url(options),
    method: 'post',
})

refresh.definition = {
    methods: ["post"],
    url: '/system/refresh',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Maintenance\Http\Controllers\SystemController::refresh
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:37
 * @route '/system/refresh'
 */
refresh.url = (options?: RouteQueryOptions) => {
    return refresh.definition.url + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\SystemController::refresh
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:37
 * @route '/system/refresh'
 */
refresh.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: refresh.url(options),
    method: 'post',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\SystemController::refresh
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:37
 * @route '/system/refresh'
 */
    const refreshForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: refresh.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\SystemController::refresh
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:37
 * @route '/system/refresh'
 */
        refreshForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: refresh.url(options),
            method: 'post',
        })
    
    refresh.form = refreshForm
/**
* @see \Modules\Maintenance\Http\Controllers\SystemController::clear
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:54
 * @route '/system/clear'
 */
export const clear = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: clear.url(options),
    method: 'post',
})

clear.definition = {
    methods: ["post"],
    url: '/system/clear',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Maintenance\Http\Controllers\SystemController::clear
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:54
 * @route '/system/clear'
 */
clear.url = (options?: RouteQueryOptions) => {
    return clear.definition.url + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\SystemController::clear
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:54
 * @route '/system/clear'
 */
clear.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: clear.url(options),
    method: 'post',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\SystemController::clear
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:54
 * @route '/system/clear'
 */
    const clearForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: clear.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\SystemController::clear
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:54
 * @route '/system/clear'
 */
        clearForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: clear.url(options),
            method: 'post',
        })
    
    clear.form = clearForm
/**
* @see \Modules\Maintenance\Http\Controllers\SystemController::reboot
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:67
 * @route '/system/reboot'
 */
export const reboot = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reboot.url(options),
    method: 'post',
})

reboot.definition = {
    methods: ["post"],
    url: '/system/reboot',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Maintenance\Http\Controllers\SystemController::reboot
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:67
 * @route '/system/reboot'
 */
reboot.url = (options?: RouteQueryOptions) => {
    return reboot.definition.url + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\SystemController::reboot
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:67
 * @route '/system/reboot'
 */
reboot.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reboot.url(options),
    method: 'post',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\SystemController::reboot
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:67
 * @route '/system/reboot'
 */
    const rebootForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reboot.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\SystemController::reboot
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:67
 * @route '/system/reboot'
 */
        rebootForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reboot.url(options),
            method: 'post',
        })
    
    reboot.form = rebootForm
/**
* @see \Modules\Maintenance\Http\Controllers\SystemController::sitemap
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:80
 * @route '/system/sitemap'
 */
export const sitemap = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sitemap.url(options),
    method: 'post',
})

sitemap.definition = {
    methods: ["post"],
    url: '/system/sitemap',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Maintenance\Http\Controllers\SystemController::sitemap
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:80
 * @route '/system/sitemap'
 */
sitemap.url = (options?: RouteQueryOptions) => {
    return sitemap.definition.url + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\SystemController::sitemap
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:80
 * @route '/system/sitemap'
 */
sitemap.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: sitemap.url(options),
    method: 'post',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\SystemController::sitemap
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:80
 * @route '/system/sitemap'
 */
    const sitemapForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: sitemap.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\SystemController::sitemap
 * @see Modules/Maintenance/app/Http/Controllers/SystemController.php:80
 * @route '/system/sitemap'
 */
        sitemapForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: sitemap.url(options),
            method: 'post',
        })
    
    sitemap.form = sitemapForm
const SystemController = { login, verify, storage, refresh, clear, reboot, sitemap }

export default SystemController