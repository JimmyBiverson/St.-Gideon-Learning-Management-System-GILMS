import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
import translations0c7b9f from './translations'
import maintenance from './maintenance'
/**
* @see \App\Http\Controllers\SettingController::index
 * @see app/Http/Controllers/SettingController.php:67
 * @route '/dashboard/settings/system'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/dashboard/settings/system',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::index
 * @see app/Http/Controllers/SettingController.php:67
 * @route '/dashboard/settings/system'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::index
 * @see app/Http/Controllers/SettingController.php:67
 * @route '/dashboard/settings/system'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SettingController::index
 * @see app/Http/Controllers/SettingController.php:67
 * @route '/dashboard/settings/system'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SettingController::index
 * @see app/Http/Controllers/SettingController.php:67
 * @route '/dashboard/settings/system'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SettingController::index
 * @see app/Http/Controllers/SettingController.php:67
 * @route '/dashboard/settings/system'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SettingController::index
 * @see app/Http/Controllers/SettingController.php:67
 * @route '/dashboard/settings/system'
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
* @see \App\Http\Controllers\SettingController::update
 * @see app/Http/Controllers/SettingController.php:95
 * @route '/dashboard/settings/system/{id}'
 */
export const update = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

update.definition = {
    methods: ["post"],
    url: '/dashboard/settings/system/{id}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SettingController::update
 * @see app/Http/Controllers/SettingController.php:95
 * @route '/dashboard/settings/system/{id}'
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
* @see \App\Http\Controllers\SettingController::update
 * @see app/Http/Controllers/SettingController.php:95
 * @route '/dashboard/settings/system/{id}'
 */
update.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: update.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SettingController::update
 * @see app/Http/Controllers/SettingController.php:95
 * @route '/dashboard/settings/system/{id}'
 */
    const updateForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SettingController::update
 * @see app/Http/Controllers/SettingController.php:95
 * @route '/dashboard/settings/system/{id}'
 */
        updateForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, options),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\SettingController::translations
 * @see app/Http/Controllers/SettingController.php:105
 * @route '/dashboard/settings/system/translations/{locale}'
 */
export const translations = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: translations.url(args, options),
    method: 'get',
})

translations.definition = {
    methods: ["get","head"],
    url: '/dashboard/settings/system/translations/{locale}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SettingController::translations
 * @see app/Http/Controllers/SettingController.php:105
 * @route '/dashboard/settings/system/translations/{locale}'
 */
translations.url = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { locale: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    locale: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        locale: args.locale,
                }

    return translations.definition.url
            .replace('{locale}', parsedArgs.locale.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SettingController::translations
 * @see app/Http/Controllers/SettingController.php:105
 * @route '/dashboard/settings/system/translations/{locale}'
 */
translations.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: translations.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SettingController::translations
 * @see app/Http/Controllers/SettingController.php:105
 * @route '/dashboard/settings/system/translations/{locale}'
 */
translations.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: translations.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SettingController::translations
 * @see app/Http/Controllers/SettingController.php:105
 * @route '/dashboard/settings/system/translations/{locale}'
 */
    const translationsForm = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: translations.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SettingController::translations
 * @see app/Http/Controllers/SettingController.php:105
 * @route '/dashboard/settings/system/translations/{locale}'
 */
        translationsForm.get = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: translations.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SettingController::translations
 * @see app/Http/Controllers/SettingController.php:105
 * @route '/dashboard/settings/system/translations/{locale}'
 */
        translationsForm.head = (args: { locale: string | number } | [locale: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: translations.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    translations.form = translationsForm
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
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateStart
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:140
 * @route '/system/update'
 */
export const updateStart = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateStart.url(options),
    method: 'post',
})

updateStart.definition = {
    methods: ["post"],
    url: '/system/update',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateStart
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:140
 * @route '/system/update'
 */
updateStart.url = (options?: RouteQueryOptions) => {
    return updateStart.definition.url + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateStart
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:140
 * @route '/system/update'
 */
updateStart.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateStart.url(options),
    method: 'post',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateStart
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:140
 * @route '/system/update'
 */
    const updateStartForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateStart.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateStart
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:140
 * @route '/system/update'
 */
        updateStartForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateStart.url(options),
            method: 'post',
        })
    
    updateStart.form = updateStartForm
/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateSeeder
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:305
 * @route '/system/update'
 */
export const updateSeeder = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: updateSeeder.url(options),
    method: 'get',
})

updateSeeder.definition = {
    methods: ["get","head"],
    url: '/system/update',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateSeeder
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:305
 * @route '/system/update'
 */
updateSeeder.url = (options?: RouteQueryOptions) => {
    return updateSeeder.definition.url + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateSeeder
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:305
 * @route '/system/update'
 */
updateSeeder.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: updateSeeder.url(options),
    method: 'get',
})
/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateSeeder
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:305
 * @route '/system/update'
 */
updateSeeder.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: updateSeeder.url(options),
    method: 'head',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateSeeder
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:305
 * @route '/system/update'
 */
    const updateSeederForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: updateSeeder.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateSeeder
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:305
 * @route '/system/update'
 */
        updateSeederForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: updateSeeder.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateSeeder
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:305
 * @route '/system/update'
 */
        updateSeederForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: updateSeeder.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    updateSeeder.form = updateSeederForm
/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateStatus
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:243
 * @route '/system/update-status'
 */
export const updateStatus = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: updateStatus.url(options),
    method: 'get',
})

updateStatus.definition = {
    methods: ["get","head"],
    url: '/system/update-status',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateStatus
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:243
 * @route '/system/update-status'
 */
updateStatus.url = (options?: RouteQueryOptions) => {
    return updateStatus.definition.url + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateStatus
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:243
 * @route '/system/update-status'
 */
updateStatus.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: updateStatus.url(options),
    method: 'get',
})
/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateStatus
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:243
 * @route '/system/update-status'
 */
updateStatus.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: updateStatus.url(options),
    method: 'head',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateStatus
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:243
 * @route '/system/update-status'
 */
    const updateStatusForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: updateStatus.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateStatus
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:243
 * @route '/system/update-status'
 */
        updateStatusForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: updateStatus.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateStatus
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:243
 * @route '/system/update-status'
 */
        updateStatusForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: updateStatus.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    updateStatus.form = updateStatusForm
/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateStep
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:226
 * @route '/system/update-step'
 */
export const updateStep = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateStep.url(options),
    method: 'post',
})

updateStep.definition = {
    methods: ["post"],
    url: '/system/update-step',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateStep
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:226
 * @route '/system/update-step'
 */
updateStep.url = (options?: RouteQueryOptions) => {
    return updateStep.definition.url + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateStep
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:226
 * @route '/system/update-step'
 */
updateStep.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateStep.url(options),
    method: 'post',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateStep
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:226
 * @route '/system/update-step'
 */
    const updateStepForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateStep.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateStep
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:226
 * @route '/system/update-step'
 */
        updateStepForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateStep.url(options),
            method: 'post',
        })
    
    updateStep.form = updateStepForm
/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateRollback
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:251
 * @route '/system/update-rollback'
 */
export const updateRollback = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateRollback.url(options),
    method: 'post',
})

updateRollback.definition = {
    methods: ["post"],
    url: '/system/update-rollback',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateRollback
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:251
 * @route '/system/update-rollback'
 */
updateRollback.url = (options?: RouteQueryOptions) => {
    return updateRollback.definition.url + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateRollback
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:251
 * @route '/system/update-rollback'
 */
updateRollback.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateRollback.url(options),
    method: 'post',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateRollback
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:251
 * @route '/system/update-rollback'
 */
    const updateRollbackForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateRollback.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateRollback
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:251
 * @route '/system/update-rollback'
 */
        updateRollbackForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateRollback.url(options),
            method: 'post',
        })
    
    updateRollback.form = updateRollbackForm
/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateAbort
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:272
 * @route '/system/update-abort'
 */
export const updateAbort = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateAbort.url(options),
    method: 'post',
})

updateAbort.definition = {
    methods: ["post"],
    url: '/system/update-abort',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateAbort
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:272
 * @route '/system/update-abort'
 */
updateAbort.url = (options?: RouteQueryOptions) => {
    return updateAbort.definition.url + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateAbort
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:272
 * @route '/system/update-abort'
 */
updateAbort.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateAbort.url(options),
    method: 'post',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateAbort
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:272
 * @route '/system/update-abort'
 */
    const updateAbortForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateAbort.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateAbort
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:272
 * @route '/system/update-abort'
 */
        updateAbortForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateAbort.url(options),
            method: 'post',
        })
    
    updateAbort.form = updateAbortForm
/**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::updatePackageStore
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:30
 * @route '/system/update/packages'
 */
export const updatePackageStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updatePackageStore.url(options),
    method: 'post',
})

updatePackageStore.definition = {
    methods: ["post"],
    url: '/system/update/packages',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::updatePackageStore
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:30
 * @route '/system/update/packages'
 */
updatePackageStore.url = (options?: RouteQueryOptions) => {
    return updatePackageStore.definition.url + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::updatePackageStore
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:30
 * @route '/system/update/packages'
 */
updatePackageStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updatePackageStore.url(options),
    method: 'post',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::updatePackageStore
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:30
 * @route '/system/update/packages'
 */
    const updatePackageStoreForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updatePackageStore.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::updatePackageStore
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:30
 * @route '/system/update/packages'
 */
        updatePackageStoreForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updatePackageStore.url(options),
            method: 'post',
        })
    
    updatePackageStore.form = updatePackageStoreForm
/**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::updatePackageVerify
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:59
 * @route '/system/update/packages/{id}/verify'
 */
export const updatePackageVerify = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updatePackageVerify.url(args, options),
    method: 'post',
})

updatePackageVerify.definition = {
    methods: ["post"],
    url: '/system/update/packages/{id}/verify',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::updatePackageVerify
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:59
 * @route '/system/update/packages/{id}/verify'
 */
updatePackageVerify.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updatePackageVerify.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::updatePackageVerify
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:59
 * @route '/system/update/packages/{id}/verify'
 */
updatePackageVerify.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updatePackageVerify.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::updatePackageVerify
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:59
 * @route '/system/update/packages/{id}/verify'
 */
    const updatePackageVerifyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updatePackageVerify.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::updatePackageVerify
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:59
 * @route '/system/update/packages/{id}/verify'
 */
        updatePackageVerifyForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updatePackageVerify.url(args, options),
            method: 'post',
        })
    
    updatePackageVerify.form = updatePackageVerifyForm
/**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::updatePackageDelete
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:73
 * @route '/system/update/packages/{id}'
 */
export const updatePackageDelete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: updatePackageDelete.url(args, options),
    method: 'delete',
})

updatePackageDelete.definition = {
    methods: ["delete"],
    url: '/system/update/packages/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::updatePackageDelete
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:73
 * @route '/system/update/packages/{id}'
 */
updatePackageDelete.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return updatePackageDelete.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::updatePackageDelete
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:73
 * @route '/system/update/packages/{id}'
 */
updatePackageDelete.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: updatePackageDelete.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::updatePackageDelete
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:73
 * @route '/system/update/packages/{id}'
 */
    const updatePackageDeleteForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updatePackageDelete.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\UpdatePackageController::updatePackageDelete
 * @see Modules/Maintenance/app/Http/Controllers/UpdatePackageController.php:73
 * @route '/system/update/packages/{id}'
 */
        updatePackageDeleteForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updatePackageDelete.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    updatePackageDelete.form = updatePackageDeleteForm
/**
* @see \Modules\Maintenance\Http\Controllers\BackupController::backupStore
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:23
 * @route '/system/backup'
 */
export const backupStore = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: backupStore.url(options),
    method: 'post',
})

backupStore.definition = {
    methods: ["post"],
    url: '/system/backup',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Maintenance\Http\Controllers\BackupController::backupStore
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:23
 * @route '/system/backup'
 */
backupStore.url = (options?: RouteQueryOptions) => {
    return backupStore.definition.url + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\BackupController::backupStore
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:23
 * @route '/system/backup'
 */
backupStore.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: backupStore.url(options),
    method: 'post',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\BackupController::backupStore
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:23
 * @route '/system/backup'
 */
    const backupStoreForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: backupStore.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\BackupController::backupStore
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:23
 * @route '/system/backup'
 */
        backupStoreForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: backupStore.url(options),
            method: 'post',
        })
    
    backupStore.form = backupStoreForm
/**
* @see \Modules\Maintenance\Http\Controllers\BackupController::backupDelete
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:63
 * @route '/system/backup/{id}'
 */
export const backupDelete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: backupDelete.url(args, options),
    method: 'delete',
})

backupDelete.definition = {
    methods: ["delete"],
    url: '/system/backup/{id}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Modules\Maintenance\Http\Controllers\BackupController::backupDelete
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:63
 * @route '/system/backup/{id}'
 */
backupDelete.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return backupDelete.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\BackupController::backupDelete
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:63
 * @route '/system/backup/{id}'
 */
backupDelete.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: backupDelete.url(args, options),
    method: 'delete',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\BackupController::backupDelete
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:63
 * @route '/system/backup/{id}'
 */
    const backupDeleteForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: backupDelete.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\BackupController::backupDelete
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:63
 * @route '/system/backup/{id}'
 */
        backupDeleteForm.delete = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: backupDelete.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    backupDelete.form = backupDeleteForm
/**
* @see \Modules\Maintenance\Http\Controllers\BackupController::backupRestore
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:82
 * @route '/system/backup/{id}/restore'
 */
export const backupRestore = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: backupRestore.url(args, options),
    method: 'post',
})

backupRestore.definition = {
    methods: ["post"],
    url: '/system/backup/{id}/restore',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Maintenance\Http\Controllers\BackupController::backupRestore
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:82
 * @route '/system/backup/{id}/restore'
 */
backupRestore.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return backupRestore.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\BackupController::backupRestore
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:82
 * @route '/system/backup/{id}/restore'
 */
backupRestore.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: backupRestore.url(args, options),
    method: 'post',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\BackupController::backupRestore
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:82
 * @route '/system/backup/{id}/restore'
 */
    const backupRestoreForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: backupRestore.url(args, options),
        method: 'post',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\BackupController::backupRestore
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:82
 * @route '/system/backup/{id}/restore'
 */
        backupRestoreForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: backupRestore.url(args, options),
            method: 'post',
        })
    
    backupRestore.form = backupRestoreForm
/**
* @see \Modules\Maintenance\Http\Controllers\BackupController::backupDownload
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:145
 * @route '/system/backup/{id}/download'
 */
export const backupDownload = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: backupDownload.url(args, options),
    method: 'get',
})

backupDownload.definition = {
    methods: ["get","head"],
    url: '/system/backup/{id}/download',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Maintenance\Http\Controllers\BackupController::backupDownload
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:145
 * @route '/system/backup/{id}/download'
 */
backupDownload.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return backupDownload.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\BackupController::backupDownload
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:145
 * @route '/system/backup/{id}/download'
 */
backupDownload.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: backupDownload.url(args, options),
    method: 'get',
})
/**
* @see \Modules\Maintenance\Http\Controllers\BackupController::backupDownload
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:145
 * @route '/system/backup/{id}/download'
 */
backupDownload.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: backupDownload.url(args, options),
    method: 'head',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\BackupController::backupDownload
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:145
 * @route '/system/backup/{id}/download'
 */
    const backupDownloadForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: backupDownload.url(args, options),
        method: 'get',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\BackupController::backupDownload
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:145
 * @route '/system/backup/{id}/download'
 */
        backupDownloadForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: backupDownload.url(args, options),
            method: 'get',
        })
            /**
* @see \Modules\Maintenance\Http\Controllers\BackupController::backupDownload
 * @see Modules/Maintenance/app/Http/Controllers/BackupController.php:145
 * @route '/system/backup/{id}/download'
 */
        backupDownloadForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: backupDownload.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    backupDownload.form = backupDownloadForm
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
const system = {
    index: Object.assign(index, index),
update: Object.assign(update, update),
translations: Object.assign(translations, translations0c7b9f),
login: Object.assign(login, login),
verify: Object.assign(verify, verify),
maintenance: Object.assign(maintenance, maintenance),
updateStart: Object.assign(updateStart, updateStart),
updateSeeder: Object.assign(updateSeeder, updateSeeder),
updateStatus: Object.assign(updateStatus, updateStatus),
updateStep: Object.assign(updateStep, updateStep),
updateRollback: Object.assign(updateRollback, updateRollback),
updateAbort: Object.assign(updateAbort, updateAbort),
updatePackageStore: Object.assign(updatePackageStore, updatePackageStore),
updatePackageVerify: Object.assign(updatePackageVerify, updatePackageVerify),
updatePackageDelete: Object.assign(updatePackageDelete, updatePackageDelete),
backupStore: Object.assign(backupStore, backupStore),
backupDelete: Object.assign(backupDelete, backupDelete),
backupRestore: Object.assign(backupRestore, backupRestore),
backupDownload: Object.assign(backupDownload, backupDownload),
storage: Object.assign(storage, storage),
refresh: Object.assign(refresh, refresh),
clear: Object.assign(clear, clear),
reboot: Object.assign(reboot, reboot),
sitemap: Object.assign(sitemap, sitemap),
}

export default system