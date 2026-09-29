import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
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
* @see \Modules\Installer\Http\Controllers\InstallerController::show_step2
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:62
 * @route '/install/step-2'
 */
export const show_step2 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show_step2.url(options),
    method: 'get',
})

show_step2.definition = {
    methods: ["get","head"],
    url: '/install/step-2',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::show_step2
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:62
 * @route '/install/step-2'
 */
show_step2.url = (options?: RouteQueryOptions) => {
    return show_step2.definition.url + queryParams(options)
}

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::show_step2
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:62
 * @route '/install/step-2'
 */
show_step2.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show_step2.url(options),
    method: 'get',
})
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::show_step2
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:62
 * @route '/install/step-2'
 */
show_step2.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show_step2.url(options),
    method: 'head',
})

    /**
* @see \Modules\Installer\Http\Controllers\InstallerController::show_step2
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:62
 * @route '/install/step-2'
 */
    const show_step2Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show_step2.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::show_step2
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:62
 * @route '/install/step-2'
 */
        show_step2Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show_step2.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::show_step2
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:62
 * @route '/install/step-2'
 */
        show_step2Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show_step2.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show_step2.form = show_step2Form
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::store_step2
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:95
 * @route '/install/step-2'
 */
export const store_step2 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store_step2.url(options),
    method: 'post',
})

store_step2.definition = {
    methods: ["post"],
    url: '/install/step-2',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::store_step2
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:95
 * @route '/install/step-2'
 */
store_step2.url = (options?: RouteQueryOptions) => {
    return store_step2.definition.url + queryParams(options)
}

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::store_step2
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:95
 * @route '/install/step-2'
 */
store_step2.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store_step2.url(options),
    method: 'post',
})

    /**
* @see \Modules\Installer\Http\Controllers\InstallerController::store_step2
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:95
 * @route '/install/step-2'
 */
    const store_step2Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store_step2.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::store_step2
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:95
 * @route '/install/step-2'
 */
        store_step2Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store_step2.url(options),
            method: 'post',
        })
    
    store_step2.form = store_step2Form
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::show_step3
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:107
 * @route '/install/step-3'
 */
export const show_step3 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show_step3.url(options),
    method: 'get',
})

show_step3.definition = {
    methods: ["get","head"],
    url: '/install/step-3',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::show_step3
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:107
 * @route '/install/step-3'
 */
show_step3.url = (options?: RouteQueryOptions) => {
    return show_step3.definition.url + queryParams(options)
}

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::show_step3
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:107
 * @route '/install/step-3'
 */
show_step3.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show_step3.url(options),
    method: 'get',
})
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::show_step3
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:107
 * @route '/install/step-3'
 */
show_step3.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show_step3.url(options),
    method: 'head',
})

    /**
* @see \Modules\Installer\Http\Controllers\InstallerController::show_step3
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:107
 * @route '/install/step-3'
 */
    const show_step3Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show_step3.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::show_step3
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:107
 * @route '/install/step-3'
 */
        show_step3Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show_step3.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::show_step3
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:107
 * @route '/install/step-3'
 */
        show_step3Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show_step3.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show_step3.form = show_step3Form
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::store_step3
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:132
 * @route '/install/step-3'
 */
export const store_step3 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store_step3.url(options),
    method: 'post',
})

store_step3.definition = {
    methods: ["post"],
    url: '/install/step-3',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::store_step3
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:132
 * @route '/install/step-3'
 */
store_step3.url = (options?: RouteQueryOptions) => {
    return store_step3.definition.url + queryParams(options)
}

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::store_step3
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:132
 * @route '/install/step-3'
 */
store_step3.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store_step3.url(options),
    method: 'post',
})

    /**
* @see \Modules\Installer\Http\Controllers\InstallerController::store_step3
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:132
 * @route '/install/step-3'
 */
    const store_step3Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store_step3.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::store_step3
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:132
 * @route '/install/step-3'
 */
        store_step3Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store_step3.url(options),
            method: 'post',
        })
    
    store_step3.form = store_step3Form
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::show_step4
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:144
 * @route '/install/step-4'
 */
export const show_step4 = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show_step4.url(options),
    method: 'get',
})

show_step4.definition = {
    methods: ["get","head"],
    url: '/install/step-4',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::show_step4
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:144
 * @route '/install/step-4'
 */
show_step4.url = (options?: RouteQueryOptions) => {
    return show_step4.definition.url + queryParams(options)
}

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::show_step4
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:144
 * @route '/install/step-4'
 */
show_step4.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show_step4.url(options),
    method: 'get',
})
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::show_step4
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:144
 * @route '/install/step-4'
 */
show_step4.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show_step4.url(options),
    method: 'head',
})

    /**
* @see \Modules\Installer\Http\Controllers\InstallerController::show_step4
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:144
 * @route '/install/step-4'
 */
    const show_step4Form = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show_step4.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::show_step4
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:144
 * @route '/install/step-4'
 */
        show_step4Form.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show_step4.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::show_step4
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:144
 * @route '/install/step-4'
 */
        show_step4Form.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show_step4.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show_step4.form = show_step4Form
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::store_step4
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:157
 * @route '/install/step-4'
 */
export const store_step4 = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store_step4.url(options),
    method: 'post',
})

store_step4.definition = {
    methods: ["post"],
    url: '/install/step-4',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::store_step4
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:157
 * @route '/install/step-4'
 */
store_step4.url = (options?: RouteQueryOptions) => {
    return store_step4.definition.url + queryParams(options)
}

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::store_step4
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:157
 * @route '/install/step-4'
 */
store_step4.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store_step4.url(options),
    method: 'post',
})

    /**
* @see \Modules\Installer\Http\Controllers\InstallerController::store_step4
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:157
 * @route '/install/step-4'
 */
    const store_step4Form = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store_step4.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::store_step4
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:157
 * @route '/install/step-4'
 */
        store_step4Form.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store_step4.url(options),
            method: 'post',
        })
    
    store_step4.form = store_step4Form
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::show_processing
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:166
 * @route '/install/processing'
 */
export const show_processing = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show_processing.url(options),
    method: 'get',
})

show_processing.definition = {
    methods: ["get","head"],
    url: '/install/processing',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::show_processing
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:166
 * @route '/install/processing'
 */
show_processing.url = (options?: RouteQueryOptions) => {
    return show_processing.definition.url + queryParams(options)
}

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::show_processing
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:166
 * @route '/install/processing'
 */
show_processing.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show_processing.url(options),
    method: 'get',
})
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::show_processing
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:166
 * @route '/install/processing'
 */
show_processing.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show_processing.url(options),
    method: 'head',
})

    /**
* @see \Modules\Installer\Http\Controllers\InstallerController::show_processing
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:166
 * @route '/install/processing'
 */
    const show_processingForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show_processing.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::show_processing
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:166
 * @route '/install/processing'
 */
        show_processingForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show_processing.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::show_processing
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:166
 * @route '/install/processing'
 */
        show_processingForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show_processing.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show_processing.form = show_processingForm
/**
* @see \Modules\Installer\Http\Controllers\InstallerController::store_processing
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:175
 * @route '/install/processing'
 */
export const store_processing = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store_processing.url(options),
    method: 'post',
})

store_processing.definition = {
    methods: ["post"],
    url: '/install/processing',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::store_processing
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:175
 * @route '/install/processing'
 */
store_processing.url = (options?: RouteQueryOptions) => {
    return store_processing.definition.url + queryParams(options)
}

/**
* @see \Modules\Installer\Http\Controllers\InstallerController::store_processing
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:175
 * @route '/install/processing'
 */
store_processing.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store_processing.url(options),
    method: 'post',
})

    /**
* @see \Modules\Installer\Http\Controllers\InstallerController::store_processing
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:175
 * @route '/install/processing'
 */
    const store_processingForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store_processing.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Installer\Http\Controllers\InstallerController::store_processing
 * @see Modules/Installer/app/Http/Controllers/InstallerController.php:175
 * @route '/install/processing'
 */
        store_processingForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store_processing.url(options),
            method: 'post',
        })
    
    store_processing.form = store_processingForm
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
const InstallerController = { index, show_step2, store_step2, show_step3, store_step3, show_step4, store_step4, show_processing, store_processing, finish, generateAppKey, refresh }

export default InstallerController