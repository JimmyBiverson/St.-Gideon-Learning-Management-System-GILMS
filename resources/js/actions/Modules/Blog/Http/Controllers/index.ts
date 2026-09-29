import BlogController from './BlogController'
import BlogCategoryController from './BlogCategoryController'
import BlogLikeDislikeController from './BlogLikeDislikeController'
import BlogCommentController from './BlogCommentController'
const Controllers = {
    BlogController: Object.assign(BlogController, BlogController),
BlogCategoryController: Object.assign(BlogCategoryController, BlogCategoryController),
BlogLikeDislikeController: Object.assign(BlogLikeDislikeController, BlogLikeDislikeController),
BlogCommentController: Object.assign(BlogCommentController, BlogCommentController),
}

export default Controllers