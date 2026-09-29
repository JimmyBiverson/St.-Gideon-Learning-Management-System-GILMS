import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::index
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:39
 * @route '/system/maintenance'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/system/maintenance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::index
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:39
 * @route '/system/maintenance'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::index
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:39
 * @route '/system/maintenance'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::index
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:39
 * @route '/system/maintenance'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::index
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:39
 * @route '/system/maintenance'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::index
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:39
 * @route '/system/maintenance'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::index
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:39
 * @route '/system/maintenance'
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
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::store
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:119
 * @route '/system/maintenance'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/system/maintenance',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::store
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:119
 * @route '/system/maintenance'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::store
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:119
 * @route '/system/maintenance'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::store
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:119
 * @route '/system/maintenance'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::store
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:119
 * @route '/system/maintenance'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateApp
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:140
 * @route '/system/update'
 */
export const updateApp = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateApp.url(options),
    method: 'post',
})

updateApp.definition = {
    methods: ["post"],
    url: '/system/update',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateApp
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:140
 * @route '/system/update'
 */
updateApp.url = (options?: RouteQueryOptions) => {
    return updateApp.definition.url + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateApp
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:140
 * @route '/system/update'
 */
updateApp.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: updateApp.url(options),
    method: 'post',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateApp
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:140
 * @route '/system/update'
 */
    const updateAppForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: updateApp.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateApp
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:140
 * @route '/system/update'
 */
        updateAppForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: updateApp.url(options),
            method: 'post',
        })
    
    updateApp.form = updateAppForm
/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateAppSeeder
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:305
 * @route '/system/update'
 */
export const updateAppSeeder = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: updateAppSeeder.url(options),
    method: 'get',
})

updateAppSeeder.definition = {
    methods: ["get","head"],
    url: '/system/update',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateAppSeeder
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:305
 * @route '/system/update'
 */
updateAppSeeder.url = (options?: RouteQueryOptions) => {
    return updateAppSeeder.definition.url + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateAppSeeder
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:305
 * @route '/system/update'
 */
updateAppSeeder.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: updateAppSeeder.url(options),
    method: 'get',
})
/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateAppSeeder
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:305
 * @route '/system/update'
 */
updateAppSeeder.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: updateAppSeeder.url(options),
    method: 'head',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateAppSeeder
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:305
 * @route '/system/update'
 */
    const updateAppSeederForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: updateAppSeeder.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateAppSeeder
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:305
 * @route '/system/update'
 */
        updateAppSeederForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: updateAppSeeder.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::updateAppSeeder
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:305
 * @route '/system/update'
 */
        updateAppSeederForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: updateAppSeeder.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    updateAppSeeder.form = updateAppSeederForm
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
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::rollbackUpdate
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:251
 * @route '/system/update-rollback'
 */
export const rollbackUpdate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rollbackUpdate.url(options),
    method: 'post',
})

rollbackUpdate.definition = {
    methods: ["post"],
    url: '/system/update-rollback',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::rollbackUpdate
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:251
 * @route '/system/update-rollback'
 */
rollbackUpdate.url = (options?: RouteQueryOptions) => {
    return rollbackUpdate.definition.url + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::rollbackUpdate
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:251
 * @route '/system/update-rollback'
 */
rollbackUpdate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: rollbackUpdate.url(options),
    method: 'post',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::rollbackUpdate
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:251
 * @route '/system/update-rollback'
 */
    const rollbackUpdateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: rollbackUpdate.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::rollbackUpdate
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:251
 * @route '/system/update-rollback'
 */
        rollbackUpdateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: rollbackUpdate.url(options),
            method: 'post',
        })
    
    rollbackUpdate.form = rollbackUpdateForm
/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::abortUpdate
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:272
 * @route '/system/update-abort'
 */
export const abortUpdate = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: abortUpdate.url(options),
    method: 'post',
})

abortUpdate.definition = {
    methods: ["post"],
    url: '/system/update-abort',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::abortUpdate
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:272
 * @route '/system/update-abort'
 */
abortUpdate.url = (options?: RouteQueryOptions) => {
    return abortUpdate.definition.url + queryParams(options)
}

/**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::abortUpdate
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:272
 * @route '/system/update-abort'
 */
abortUpdate.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: abortUpdate.url(options),
    method: 'post',
})

    /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::abortUpdate
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:272
 * @route '/system/update-abort'
 */
    const abortUpdateForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: abortUpdate.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Maintenance\Http\Controllers\UpdaterController::abortUpdate
 * @see Modules/Maintenance/app/Http/Controllers/UpdaterController.php:272
 * @route '/system/update-abort'
 */
        abortUpdateForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: abortUpdate.url(options),
            method: 'post',
        })
    
    abortUpdate.form = abortUpdateForm
const UpdaterController = { index, store, updateApp, updateAppSeeder, updateStatus, updateStep, rollbackUpdate, abortUpdate }

export default UpdaterController