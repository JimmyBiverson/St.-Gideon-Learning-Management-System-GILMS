import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { likeDislike } from '@/routes/blogs';
import { Form, usePage } from '@inertiajs/react';
import { MessageCircle, ThumbsDown, ThumbsUp } from 'lucide-react';

const BlogLikeDislike = () => {
   const { props } = usePage<BlogShowProps>();
   const {
      blog,
      likesCount,
      dislikesCount,
      userReaction,
      commentsCount,
      translate,
   } = props;
   const { button, common } = translate;

   return (
      <div className="flex w-full items-center justify-between">
         <Form
            action={likeDislike()}
            method="post"
            className="flex items-center gap-2"
         >
            {({ processing }) => (
               <>
                  <input type="hidden" name="blog_id" value={blog.id} />
                  <Button
                     type="submit"
                     name="type"
                     value="like"
                     variant={userReaction === 'like' ? 'default' : 'outline'}
                     size="sm"
                     disabled={processing}
                     className={cn(
                        'flex items-center gap-2 transition-colors',
                        userReaction === 'like' &&
                           'bg-blue-500 text-white hover:bg-blue-600',
                     )}
                  >
                     <ThumbsUp className="h-4 w-4" />
                     <span>{likesCount}</span>
                     <span className="sr-only">{button.like}</span>
                  </Button>

                  <Button
                     type="submit"
                     name="type"
                     value="dislike"
                     variant={
                        userReaction === 'dislike' ? 'default' : 'outline'
                     }
                     size="sm"
                     disabled={processing}
                     className={cn(
                        'flex items-center gap-2 transition-colors',
                        userReaction === 'dislike' &&
                           'bg-red-500 text-white hover:bg-red-600',
                     )}
                  >
                     <ThumbsDown className="h-4 w-4" />
                     <span>{dislikesCount}</span>
                     <span className="sr-only">{button.dislike}</span>
                  </Button>
               </>
            )}
         </Form>

         <div className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" />
            <h3 className="text-lg font-semibold">
               {commentsCount}{' '}
               {commentsCount > 1 ? common.comments : common.comment}
            </h3>
         </div>
      </div>
   );
};

export default BlogLikeDislike;
