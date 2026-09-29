import ProductController from './ProductController'
import ProductCategoryController from './ProductCategoryController'
import ProductCategoryChildController from './ProductCategoryChildController'
import ProductCouponController from './ProductCouponController'
import ProductFaqController from './ProductFaqController'
import ProductSpecificationController from './ProductSpecificationController'
import ProductOrderController from './ProductOrderController'
import ProductWishlistController from './ProductWishlistController'
import ProductReviewController from './ProductReviewController'
import ProductFileController from './ProductFileController'
const Controllers = {
    ProductController: Object.assign(ProductController, ProductController),
ProductCategoryController: Object.assign(ProductCategoryController, ProductCategoryController),
ProductCategoryChildController: Object.assign(ProductCategoryChildController, ProductCategoryChildController),
ProductCouponController: Object.assign(ProductCouponController, ProductCouponController),
ProductFaqController: Object.assign(ProductFaqController, ProductFaqController),
ProductSpecificationController: Object.assign(ProductSpecificationController, ProductSpecificationController),
ProductOrderController: Object.assign(ProductOrderController, ProductOrderController),
ProductWishlistController: Object.assign(ProductWishlistController, ProductWishlistController),
ProductReviewController: Object.assign(ProductReviewController, ProductReviewController),
ProductFileController: Object.assign(ProductFileController, ProductFileController),
}

export default Controllers