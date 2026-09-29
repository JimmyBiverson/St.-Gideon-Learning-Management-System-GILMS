import ExamController from './ExamController'
import ExamCategoryController from './ExamCategoryController'
import ExamCouponController from './ExamCouponController'
import ExamEnrollmentController from './ExamEnrollmentController'
import ExamFaqController from './ExamFaqController'
import ExamRequirementController from './ExamRequirementController'
import ExamOutcomeController from './ExamOutcomeController'
import ExamQuestionController from './ExamQuestionController'
import ExamResourceController from './ExamResourceController'
import ExamAttemptController from './ExamAttemptController'
import ExamReviewController from './ExamReviewController'
import ExamWishlistController from './ExamWishlistController'
const Controllers = {
    ExamController: Object.assign(ExamController, ExamController),
ExamCategoryController: Object.assign(ExamCategoryController, ExamCategoryController),
ExamCouponController: Object.assign(ExamCouponController, ExamCouponController),
ExamEnrollmentController: Object.assign(ExamEnrollmentController, ExamEnrollmentController),
ExamFaqController: Object.assign(ExamFaqController, ExamFaqController),
ExamRequirementController: Object.assign(ExamRequirementController, ExamRequirementController),
ExamOutcomeController: Object.assign(ExamOutcomeController, ExamOutcomeController),
ExamQuestionController: Object.assign(ExamQuestionController, ExamQuestionController),
ExamResourceController: Object.assign(ExamResourceController, ExamResourceController),
ExamAttemptController: Object.assign(ExamAttemptController, ExamAttemptController),
ExamReviewController: Object.assign(ExamReviewController, ExamReviewController),
ExamWishlistController: Object.assign(ExamWishlistController, ExamWishlistController),
}

export default Controllers