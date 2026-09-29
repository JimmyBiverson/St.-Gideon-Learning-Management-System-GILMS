import DeleteModal from '@/components/inertia/delete-modal';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { formatDateLocale } from '@/lib/date';
import { cn } from '@/lib/utils';
import blogComments from '@/routes/blogs/comments';
import { Form, useForm, usePage } from '@inertiajs/react';
import { MessageCircle, Send, Trash2 } from 'lucide-react';
import { useState } from 'react';

const BlogComments = () => {
   const { props } = usePage<BlogShowProps>();
   const { auth, blog, translate } = props;
   const { button, frontend, input } = translate;

   const [replyingTo, setReplyingTo] = useState<number | string | null>(null);
   const [commentContent, setCommentContent] = useState('');
   const { data, setData } = useForm({ replyContent: '' });

   // Get user initials
   const getUserInitials = (name: string) => {
      return name
         .split(' ')
         .map((n) => n.charAt(0))
         .join('')
         .toUpperCase()
         .slice(0, 2);
   };

   return (
      <div className={cn('space-y-6')}>
         {/* Comment Form */}
         <Card>
            <CardHeader>
               <h4 className="text-base font-medium">
                  {frontend.post_a_comment}
               </h4>
            </CardHeader>
            <CardContent>
               <Form
                  {...blogComments.store.form()}
                  transform={(formData) => ({
                     ...formData,
                     blog_id: blog.id,
                  })}
                  options={{ preserveScroll: true }}
                  resetOnSuccess={['content']}
                  className="space-y-4"
               >
                  {({ processing }) => (
                     <>
                        <Textarea
                           name="content"
                           maxLength={1000}
                           placeholder={input.description}
                           className="min-h-[100px] resize-none"
                           onChange={(e) => setCommentContent(e.target.value)}
                        />
                        <div className="flex items-center justify-between">
                           <span className="text-sm text-muted-foreground">
                              {commentContent.length}/1000 {frontend.characters}
                           </span>
                           <Button
                              type="submit"
                              disabled={!commentContent.trim() || processing}
                              className="flex items-center gap-2"
                           >
                              <Send className="h-4 w-4" />
                              {processing
                                 ? frontend.posting
                                 : button.post_comment}
                           </Button>
                        </div>
                     </>
                  )}
               </Form>
            </CardContent>
         </Card>

         {/* Comments List */}
         <div className="space-y-4">
            {blog.comments.length === 0 ? (
               <div className="py-8 text-center">
                  <MessageCircle className="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
                  <p className="text-muted-foreground">
                     {frontend.no_comments_yet}
                  </p>
               </div>
            ) : (
               blog.comments.map((comment) => (
                  <Card key={comment.id} className="overflow-hidden">
                     <CardContent className="p-4">
                        {/* Comment Header */}
                        <div className="mb-3 flex items-start justify-between">
                           <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                 <AvatarImage
                                    src={comment.user.photo || ''}
                                    alt={comment.user.name}
                                 />
                                 <AvatarFallback>
                                    {getUserInitials(comment.user.name)}
                                 </AvatarFallback>
                              </Avatar>
                              <div>
                                 <p className="font-medium">
                                    {comment.user.name}
                                 </p>
                                 <p className="text-sm text-muted-foreground">
                                    {formatDateLocale(comment.created_at)}
                                 </p>
                              </div>
                           </div>
                           {auth?.user?.id === comment.user.id && (
                              <DeleteModal
                                 routePath={blogComments.destroy.url({
                                    id: comment.id,
                                 })}
                                 actionComponent={
                                    <Button
                                       variant="ghost"
                                       className="h-8 w-8 bg-destructive/8 hover:bg-destructive/6"
                                    >
                                       <Trash2 className="h-3 w-3 text-destructive" />
                                    </Button>
                                 }
                              />
                           )}
                        </div>

                        {/* Comment Content */}
                        <div className="mb-3">
                           <p className="text-sm leading-relaxed whitespace-pre-wrap">
                              {comment.content}
                           </p>
                        </div>

                        {/* Comment Actions */}
                        <div className="flex items-center gap-2">
                           <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                 setReplyingTo(
                                    replyingTo === comment.id
                                       ? null
                                       : comment.id,
                                 );
                                 setData('replyContent', '');
                              }}
                              className="text-xs"
                           >
                              {button.reply}
                           </Button>
                        </div>

                        {/* Reply Form */}

                        {replyingTo === comment.id && (
                           <div className="mt-4 space-y-3 border-t pt-4">
                              <Form
                                 {...blogComments.store.form()}
                                 transform={(formData) => ({
                                    ...formData,
                                    blog_id: blog.id,
                                    parent_id: comment.id,
                                    content: data.replyContent,
                                 })}
                                 options={{ preserveScroll: true }}
                                 onSuccess={() => {
                                    setReplyingTo(null);
                                    setData('replyContent', '');
                                 }}
                                 resetOnSuccess={['content']}
                                 className="space-y-3"
                              >
                                 {({ processing }) => (
                                    <>
                                       <Textarea
                                          name="content"
                                          placeholder={input.description}
                                          value={data.replyContent}
                                          onChange={(e) =>
                                             setData(
                                                'replyContent',
                                                e.target.value,
                                             )
                                          }
                                          className="min-h-[80px] resize-none"
                                          maxLength={1000}
                                       />

                                       <div className="flex items-center justify-between">
                                          <span className="text-xs text-muted-foreground">
                                             {data.replyContent.length}/1000{' '}
                                             {frontend.characters}
                                          </span>
                                          <div className="flex items-center gap-2">
                                             <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                   setReplyingTo(null);
                                                   setData('replyContent', '');
                                                }}
                                             >
                                                {button.cancel}
                                             </Button>
                                             <Button
                                                type="submit"
                                                size="sm"
                                                disabled={
                                                   !data.replyContent.trim() ||
                                                   processing
                                                }
                                             >
                                                {processing
                                                   ? frontend.replying
                                                   : button.reply}
                                             </Button>
                                          </div>
                                       </div>
                                    </>
                                 )}
                              </Form>
                           </div>
                        )}

                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                           <div className="mt-5 space-y-5">
                              {comment.replies.map((reply) => (
                                 <div
                                    key={reply.id}
                                    className="space-y-2 border-l border-border pl-4"
                                 >
                                    <div className="flex items-start justify-between">
                                       <div className="flex items-center gap-2">
                                          <Avatar className="h-8 w-8">
                                             <AvatarImage
                                                src={reply.user.photo || ''}
                                                alt={reply.user.name}
                                             />
                                             <AvatarFallback className="text-xs">
                                                {getUserInitials(
                                                   reply.user.name,
                                                )}
                                             </AvatarFallback>
                                          </Avatar>
                                          <div>
                                             <p className="text-sm font-medium">
                                                {reply.user.name}
                                             </p>
                                             <p className="text-xs text-muted-foreground">
                                                {formatDateLocale(
                                                   reply.created_at,
                                                )}
                                             </p>
                                          </div>
                                       </div>
                                       {auth?.user?.id === reply.user.id && (
                                          <DeleteModal
                                             routePath={blogComments.destroy.url(
                                                { id: reply.id },
                                             )}
                                             actionComponent={
                                                <Button
                                                   variant="ghost"
                                                   className="h-8 w-8 bg-destructive/8 hover:bg-destructive/6"
                                                >
                                                   <Trash2 className="h-3 w-3 text-destructive" />
                                                </Button>
                                             }
                                          />
                                       )}
                                    </div>
                                    <p className="pl-10 text-sm leading-relaxed whitespace-pre-wrap">
                                       {reply.content}
                                    </p>
                                 </div>
                              ))}
                           </div>
                        )}
                     </CardContent>
                  </Card>
               ))
            )}
         </div>
      </div>
   );
};

export default BlogComments;
