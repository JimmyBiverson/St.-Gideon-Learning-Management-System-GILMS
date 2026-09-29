import { Link } from '@inertiajs/react';
import { formatDistanceToNowStrict } from 'date-fns';
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
} from '@/components/ui/card';
import { cn, getReadingTime } from '@/lib/utils';
import { read } from '@/routes/blogs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface Props {
   blog: Blog;
   viewType?: 'grid' | 'list';
   className?: string;
}

const BlogCard1 = ({ blog, viewType = 'grid', className }: Props) => {
   return (
      <Card
         className={cn(
            'group p-0',
            viewType === 'list' &&
               'sm:flex sm:w-full sm:flex-row sm:justify-between',
            className,
         )}
      >
         <CardHeader className="p-0">
            <div className={cn('p-2 pb-0', viewType === 'list' && 'pb-2')}>
               <Link href={read(blog.uuid)}>
                  <div
                     className={cn(
                        'relative h-[190px] overflow-hidden rounded-lg',
                        viewType === 'list' && 'sm:w-[260px]',
                     )}
                  >
                     <img
                        src={blog.thumbnail || '/assets/images/blank-image.jpg'}
                        alt={blog.title}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                           const target = e.target as HTMLImageElement;
                           target.src = '/assets/images/blank-image.jpg';
                        }}
                     />
                  </div>
               </Link>
            </div>
         </CardHeader>

         <div
            className={cn(
               viewType === 'list' &&
                  'flex w-[calc(100%-272px)] flex-col justify-between',
            )}
         >
            <CardContent className={cn('p-4', viewType === 'list' && 'h-full')}>
               <Link
                  className={cn(
                     'space-y-3',
                     viewType === 'list' &&
                        'sm:flex sm:h-full sm:flex-col sm:justify-between sm:py-4',
                  )}
                  href={read(blog.uuid)}
               >
                  <p className="font-semibold hover:text-secondary-foreground">
                     {blog.title}
                  </p>
               </Link>
            </CardContent>

            <CardFooter className="flex w-full items-center justify-between gap-2 p-4 pt-0">
               <Avatar className="h-9 w-9">
                  <AvatarImage
                     src={blog.user.photo || ''}
                     alt={blog.user.name}
                     className="object-cover"
                  />
                  <AvatarFallback>{blog.user.name[0]}</AvatarFallback>
               </Avatar>
               <div className="w-full">
                  <p className="text-sm font-semibold">{blog.user.name}</p>
                  <div className="flex w-full items-center justify-between gap-2 text-sm text-muted-foreground">
                     <span>{getReadingTime(blog.description)}</span>
                     <span>
                        {formatDistanceToNowStrict(new Date(blog.created_at), {
                           addSuffix: true,
                        })}
                     </span>
                  </div>
               </div>
            </CardFooter>
         </div>
      </Card>
   );
};

export default BlogCard1;
