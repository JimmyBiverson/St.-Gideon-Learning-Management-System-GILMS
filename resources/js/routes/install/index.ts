import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::index
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:26
 * @route '/install/step-1'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/install/step-1',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::index
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:26
 * @route '/install/step-1'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::index
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:26
 * @route '/install/step-1'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::index
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:26
 * @route '/install/step-1'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \Modules\Installer\Http\Controllers\InstallerController::index
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:26
 * @route '/install/step-1'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::index
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:26
 * @route '/install/step-1'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::index
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:26
 * @route '/install/step-1'
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
* @see \Modules\Installer\Http\Controllers\InstallerController::showStep2
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:62
 * @route '/install/step-2'
 */
export const showStep2 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showStep2.url(options),
    method: 'get',
})

showStep2.definition = {
    methods: ["get","head"],
    url: '/install/step-2',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::showStep2
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:62
 * @route '/install/step-2'
 */
showStep2.url = (options?: RouteQueryOptions) => {
    return showStep2.definition.url + queryParams(options)
}

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::showStep2
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:62
 * @route '/install/step-2'
 */
showStep2.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showStep2.url(options),
    method: 'get',
})
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::showStep2
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:62
 * @route '/install/step-2'
 */
showStep2.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showStep2.url(options),
    method: 'head',
})

    /**
* @see \Modules\Installer\Http\Controllers\InstallerController::showStep2
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:62
 * @route '/install/step-2'
 */
    const showStep2Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showStep2.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::showStep2
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:62
 * @route '/install/step-2'
 */
        showStep2Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showStep2.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::showStep2
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:62
 * @route '/install/step-2'
 */
        showStep2Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showStep2.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showStep2.form = showStep2Form
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::storeStep2
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:95
 * @route '/install/step-2'
 */
export const storeStep2 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeStep2.url(options),
    method: 'post',
})

storeStep2.definition = {
    methods: ["post"],
    url: '/install/step-2',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::storeStep2
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:95
 * @route '/install/step-2'
 */
storeStep2.url = (options?: RouteQueryOptions) => {
    return storeStep2.definition.url + queryParams(options)
}

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::storeStep2
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:95
 * @route '/install/step-2'
 */
storeStep2.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeStep2.url(options),
    method: 'post',
})

    /**
* @see \Modules\Installer\Http\Controllers\InstallerController::storeStep2
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:95
 * @route '/install/step-2'
 */
    const storeStep2Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeStep2.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::storeStep2
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:95
 * @route '/install/step-2'
 */
        storeStep2Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeStep2.url(options),
            method: 'post',
        })
    
    storeStep2.form = storeStep2Form
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::showStep3
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:107
 * @route '/install/step-3'
 */
export const showStep3 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showStep3.url(options),
    method: 'get',
})

showStep3.definition = {
    methods: ["get","head"],
    url: '/install/step-3',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::showStep3
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:107
 * @route '/install/step-3'
 */
showStep3.url = (options?: RouteQueryOptions) => {
    return showStep3.definition.url + queryParams(options)
}

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::showStep3
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:107
 * @route '/install/step-3'
 */
showStep3.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showStep3.url(options),
    method: 'get',
})
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::showStep3
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:107
 * @route '/install/step-3'
 */
showStep3.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showStep3.url(options),
    method: 'head',
})

    /**
* @see \Modules\Installer\Http\Controllers\InstallerController::showStep3
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:107
 * @route '/install/step-3'
 */
    const showStep3Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showStep3.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::showStep3
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:107
 * @route '/install/step-3'
 */
        showStep3Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showStep3.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::showStep3
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:107
 * @route '/install/step-3'
 */
        showStep3Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showStep3.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showStep3.form = showStep3Form
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::storeStep3
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:132
 * @route '/install/step-3'
 */
export const storeStep3 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeStep3.url(options),
    method: 'post',
})

storeStep3.definition = {
    methods: ["post"],
    url: '/install/step-3',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::storeStep3
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:132
 * @route '/install/step-3'
 */
storeStep3.url = (options?: RouteQueryOptions) => {
    return storeStep3.definition.url + queryParams(options)
}

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::storeStep3
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:132
 * @route '/install/step-3'
 */
storeStep3.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeStep3.url(options),
    method: 'post',
})

    /**
* @see \Modules\Installer\Http\Controllers\InstallerController::storeStep3
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:132
 * @route '/install/step-3'
 */
    const storeStep3Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeStep3.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::storeStep3
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:132
 * @route '/install/step-3'
 */
        storeStep3Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeStep3.url(options),
            method: 'post',
        })
    
    storeStep3.form = storeStep3Form
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::showStep4
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:144
 * @route '/install/step-4'
 */
export const showStep4 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showStep4.url(options),
    method: 'get',
})

showStep4.definition = {
    methods: ["get","head"],
    url: '/install/step-4',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::showStep4
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:144
 * @route '/install/step-4'
 */
showStep4.url = (options?: RouteQueryOptions) => {
    return showStep4.definition.url + queryParams(options)
}

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::showStep4
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:144
 * @route '/install/step-4'
 */
showStep4.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showStep4.url(options),
    method: 'get',
})
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::showStep4
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:144
 * @route '/install/step-4'
 */
showStep4.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showStep4.url(options),
    method: 'head',
})

    /**
* @see \Modules\Installer\Http\Controllers\InstallerController::showStep4
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:144
 * @route '/install/step-4'
 */
    const showStep4Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showStep4.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::showStep4
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:144
 * @route '/install/step-4'
 */
        showStep4Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showStep4.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::showStep4
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:144
 * @route '/install/step-4'
 */
        showStep4Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showStep4.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showStep4.form = showStep4Form
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::storeStep4
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:157
 * @route '/install/step-4'
 */
export const storeStep4 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeStep4.url(options),
    method: 'post',
})

storeStep4.definition = {
    methods: ["post"],
    url: '/install/step-4',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::storeStep4
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:157
 * @route '/install/step-4'
 */
storeStep4.url = (options?: RouteQueryOptions) => {
    return storeStep4.definition.url + queryParams(options)
}

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::storeStep4
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:157
 * @route '/install/step-4'
 */
storeStep4.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeStep4.url(options),
    method: 'post',
})

    /**
* @see \Modules\Installer\Http\Controllers\InstallerController::storeStep4
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:157
 * @route '/install/step-4'
 */
    const storeStep4Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeStep4.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::storeStep4
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:157
 * @route '/install/step-4'
 */
        storeStep4Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeStep4.url(options),
            method: 'post',
        })
    
    storeStep4.form = storeStep4Form
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::showProcessing
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:166
 * @route '/install/processing'
 */
export const showProcessing = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showProcessing.url(options),
    method: 'get',
})

showProcessing.definition = {
    methods: ["get","head"],
    url: '/install/processing',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::showProcessing
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:166
 * @route '/install/processing'
 */
showProcessing.url = (options?: RouteQueryOptions) => {
    return showProcessing.definition.url + queryParams(options)
}

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::showProcessing
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:166
 * @route '/install/processing'
 */
showProcessing.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showProcessing.url(options),
    method: 'get',
})
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::showProcessing
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:166
 * @route '/install/processing'
 */
showProcessing.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showProcessing.url(options),
    method: 'head',
})

    /**
* @see \Modules\Installer\Http\Controllers\InstallerController::showProcessing
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:166
 * @route '/install/processing'
 */
    const showProcessingForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: showProcessing.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::showProcessing
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:166
 * @route '/install/processing'
 */
        showProcessingForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showProcessing.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::showProcessing
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:166
 * @route '/install/processing'
 */
        showProcessingForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: showProcessing.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    showProcessing.form = showProcessingForm
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::storeProcessing
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:175
 * @route '/install/processing'
 */
export const storeProcessing = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeProcessing.url(options),
    method: 'post',
})

storeProcessing.definition = {
    methods: ["post"],
    url: '/install/processing',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::storeProcessing
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:175
 * @route '/install/processing'
 */
storeProcessing.url = (options?: RouteQueryOptions) => {
    return storeProcessing.definition.url + queryParams(options)
}

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::storeProcessing
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:175
 * @route '/install/processing'
 */
storeProcessing.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeProcessing.url(options),
    method: 'post',
})

    /**
* @see \Modules\Installer\Http\Controllers\InstallerController::storeProcessing
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:175
 * @route '/install/processing'
 */
    const storeProcessingForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeProcessing.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::storeProcessing
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:175
 * @route '/install/processing'
 */
        storeProcessingForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeProcessing.url(options),
            method: 'post',
        })
    
    storeProcessing.form = storeProcessingForm
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::finish
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:327
 * @route '/install/finish'
 */
export const finish = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: finish.url(options),
    method: 'get',
})

finish.definition = {
    methods: ["get","head"],
    url: '/install/finish',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::finish
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:327
 * @route '/install/finish'
 */
finish.url = (options?: RouteQueryOptions) => {
    return finish.definition.url + queryParams(options)
}

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::finish
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:327
 * @route '/install/finish'
 */
finish.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: finish.url(options),
    method: 'get',
})
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::finish
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:327
 * @route '/install/finish'
 */
finish.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: finish.url(options),
    method: 'head',
})

    /**
* @see \Modules\Installer\Http\Controllers\InstallerController::finish
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:327
 * @route '/install/finish'
 */
    const finishForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: finish.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::finish
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:327
 * @route '/install/finish'
 */
        finishForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: finish.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::finish
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:327
 * @route '/install/finish'
 */
        finishForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: finish.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    finish.form = finishForm
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::refresh
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:332
 * @route '/install/refresh'
 */
export const refresh = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: refresh.url(options),
    method: 'get',
})

refresh.definition = {
    methods: ["get","head"],
    url: '/install/refresh',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::refresh
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:332
 * @route '/install/refresh'
 */
refresh.url = (options?: RouteQueryOptions) => {
    return refresh.definition.url + queryParams(options)
}

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::refresh
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:332
 * @route '/install/refresh'
 */
refresh.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: refresh.url(options),
    method: 'get',
})
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::refresh
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:332
 * @route '/install/refresh'
 */
refresh.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: refresh.url(options),
    method: 'head',
})

    /**
* @see \Modules\Installer\Http\Controllers\InstallerController::refresh
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:332
 * @route '/install/refresh'
 */
    const refreshForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: refresh.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::refresh
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:332
 * @route '/install/refresh'
 */
        refreshForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: refresh.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::refresh
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:332
 * @route '/install/refresh'
 */
        refreshForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: refresh.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    refresh.form = refreshForm
const install = {
    index: Object.assign(index, index),
showStep2: Object.assign(showStep2, showStep2),
storeStep2: Object.assign(storeStep2, storeStep2),
showStep3: Object.assign(showStep3, showStep3),
storeStep3: Object.assign(storeStep3, storeStep3),
showStep4: Object.assign(showStep4, showStep4),
storeStep4: Object.assign(storeStep4, storeStep4),
showProcessing: Object.assign(showProcessing, showProcessing),
storeProcessing: Object.assign(storeProcessing, storeProcessing),
finish: Object.assign(finish, finish),
refresh: Object.assign(refresh, refresh),
}

export default install