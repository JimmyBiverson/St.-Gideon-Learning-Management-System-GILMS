import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \Modules\Store\Http\Controllers\ProductOrderController::sales
 * @see Modules/Store/app/Http/Controllers/ProductOrderController.php:34
 * @route '/dashboard/store/products/product/sales'
 */
export const sales = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sales.url(options),
    method: 'get',
})

sales.definition = {
    methods: ["get","head"],
    url: '/dashboard/store/products/product/sales',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Store\Http\Controllers\ProductOrderController::sales
 * @see Modules/Store/app/Http/Controllers/ProductOrderController.php:34
 * @route '/dashboard/store/products/product/sales'
 */
sales.url = (options?: RouteQueryOptions) => {
    return sales.definition.url + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductOrderController::sales
 * @see Modules/Store/app/Http/Controllers/ProductOrderController.php:34
 * @route '/dashboard/store/products/product/sales'
 */
sales.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: sales.url(options),
    method: 'get',
})
/**
* @see \Modules\Store\Http\Controllers\ProductOrderController::sales
 * @see Modules/Store/app/Http/Controllers/ProductOrderController.php:34
 * @route '/dashboard/store/products/product/sales'
 */
sales.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: sales.url(options),
    method: 'head',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductOrderController::sales
 * @see Modules/Store/app/Http/Controllers/ProductOrderController.php:34
 * @route '/dashboard/store/products/product/sales'
 */
    const salesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: sales.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductOrderController::sales
 * @see Modules/Store/app/Http/Controllers/ProductOrderController.php:34
 * @route '/dashboard/store/products/product/sales'
 */
        salesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: sales.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Store\Http\Controllers\ProductOrderController::sales
 * @see Modules/Store/app/Http/Controllers/ProductOrderController.php:34
 * @route '/dashboard/store/products/product/sales'
 */
        salesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: sales.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    sales.form = salesForm
/**
* @see \Modules\Store\Http\Controllers\ProductOrderController::store
 * @see Modules/Store/app/Http/Controllers/ProductOrderController.php:22
 * @route '/products/product/orders'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/products/product/orders',
} satisfies RouteDefinition<["post"]>

/**
* @see \Modules\Store\Http\Controllers\ProductOrderController::store
 * @see Modules/Store/app/Http/Controllers/ProductOrderController.php:22
 * @route '/products/product/orders'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductOrderController::store
 * @see Modules/Store/app/Http/Controllers/ProductOrderController.php:22
 * @route '/products/product/orders'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductOrderController::store
 * @see Modules/Store/app/Http/Controllers/ProductOrderController.php:22
 * @route '/products/product/orders'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductOrderController::store
 * @see Modules/Store/app/Http/Controllers/ProductOrderController.php:22
 * @route '/products/product/orders'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Modules\Store\Http\Controllers\ProductOrderController::purchases
 * @see Modules/Store/app/Http/Controllers/ProductOrderController.php:60
 * @route '/products/product/purchases'
 */
export const purchases = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: purchases.url(options),
    method: 'get',
})

purchases.definition = {
    methods: ["get","head"],
    url: '/products/product/purchases',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Modules\Store\Http\Controllers\ProductOrderController::purchases
 * @see Modules/Store/app/Http/Controllers/ProductOrderController.php:60
 * @route '/products/product/purchases'
 */
purchases.url = (options?: RouteQueryOptions) => {
    return purchases.definition.url + queryParams(options)
}

/**
* @see \Modules\Store\Http\Controllers\ProductOrderController::purchases
 * @see Modules/Store/app/Http/Controllers/ProductOrderController.php:60
 * @route '/products/product/purchases'
 */
purchases.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: purchases.url(options),
    method: 'get',
})
/**
* @see \Modules\Store\Http\Controllers\ProductOrderController::purchases
 * @see Modules/Store/app/Http/Controllers/ProductOrderController.php:60
 * @route '/products/product/purchases'
 */
purchases.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: purchases.url(options),
    method: 'head',
})

    /**
* @see \Modules\Store\Http\Controllers\ProductOrderController::purchases
 * @see Modules/Store/app/Http/Controllers/ProductOrderController.php:60
 * @route '/products/product/purchases'
 */
    const purchasesForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: purchases.url(options),
        method: 'get',
    })

            /**
* @see \Modules\Store\Http\Controllers\ProductOrderController::purchases
 * @see Modules/Store/app/Http/Controllers/ProductOrderController.php:60
 * @route '/products/product/purchases'
 */
        purchasesForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: purchases.url(options),
            method: 'get',
        })
            /**
* @see \Modules\Store\Http\Controllers\ProductOrderController::purchases
 * @see Modules/Store/app/Http/Controllers/ProductOrderController.php:60
 * @route '/products/product/purchases'
 */
        purchasesForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: purchases.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    purchases.form = purchasesForm
const productOrders = {
    sales: Object.assign(sales, sales),
store: Object.assign(store, store),
purchases: Object.assign(purchases, purchases),
}

export default productOrders