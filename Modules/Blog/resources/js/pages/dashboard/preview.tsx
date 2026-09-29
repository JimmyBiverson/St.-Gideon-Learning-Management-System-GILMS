import { Renderer } from '@/components/rich-editor';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface Props extends SharedData {
   blog: Blog;
}

const Preview = ({ blog }: Props) => {
   const { title, description, created_at, user, category, banner, thumbnail } =
      blog;
   const createdAt = new Date(created_at).toLocaleDateString();
   const authorInitials = user?.name
      ? user.name
           .split(' ')
           .map((n) => n.charAt(0))
           .join('')
           .toUpperCase()
      : 'AU';

   const keywords = (blog.keywords || '')
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);

   return (
      <div className="mx-auto w-full max-w-4xl space-y-6">
         {/* Banner */}
         {banner && (
            <div className="overflow-hidden border">
               <img
                  src={banner}
                  alt="Blog banner"
                  className="max-h-64 w-full object-cover sm:max-h-80 md:max-h-[420px]"
               />
            </div>
         )}

         {/* Title and meta */}
         <div className="space-y-3 px-4">
            <div className="flex flex-wrap items-center gap-3">
               {category?.name && (
                  <Badge variant="secondary">{category.name}</Badge>
               )}
               {keywords.slice(0, 3).map((k) => (
                  <Badge key={k} variant="outline">
                     {k}
                  </Badge>
               ))}
            </div>
            <h1 className="text-2xl leading-tight font-semibold md:text-3xl">
               {title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
               <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                     <AvatarImage
                        src={user?.photo || undefined}
                        alt={user?.name || 'Author'}
                     />
                     <AvatarFallback>{authorInitials}</AvatarFallback>
                  </Avatar>
                  <span>{user?.name}</span>
               </div>
               <span>•</span>
               <span>{createdAt}</span>
            </div>
         </div>

         <Separator />

         <div className="space-y-6 px-6 pb-10">
            {/* Content */}
            <div>
               {thumbnail && (
                  <img
                     src={thumbnail}
                     alt="Blog thumbnail"
                     className="max-h-60 w-full overflow-hidden rounded-lg border object-cover sm:max-h-72 md:max-h-96"
                  />
               )}

               <div className="prose dark:prose-invert max-w-none py-6">
                  <Renderer value={description} />
               </div>
            </div>

            {/* Keywords */}
            {keywords.length > 0 && (
               <div className="flex flex-wrap gap-2">
                  {keywords.map((k) => (
                     <Badge key={k} variant="secondary">
                        #{k}
                     </Badge>
                  ))}
               </div>
            )}
         </div>
      </div>
   );
};

export default Preview;
