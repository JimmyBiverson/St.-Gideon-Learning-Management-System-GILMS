import { Renderer } from '@/components/rich-editor';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import LandingLayout from '@/layouts/landing';
import { Head, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';

import BlogComments from './partials/blog-comments';
import BlogLikeDislike from './partials/blog-like-dislike';

const ShowBlog = ({ blog }: BlogShowProps) => {
   const { url, props } = usePage<BlogShowProps>();
   const { translate, system } = props;
   const { frontend } = translate;
   const {
      title,
      description,
      created_at,
      updated_at,
      user,
      category,
      banner,
      thumbnail,
   } = blog;

   const createdAt = new Date(created_at).toLocaleDateString();
   const authorInitials = user?.name
      ? user.name
           .split(' ')
           .map((n) => n.charAt(0))
           .join('')
           .toUpperCase()
      : frontend.author_initials_fallback;

   const keywords = (blog.keywords || '')
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean);

   // Meta information
   const siteName = system?.fields?.name || frontend.default_site_name;
   const siteUrl = url;
   const siteOrigin =
      typeof window !== 'undefined'
         ? window.location.origin
         : url.split('/').slice(0, 3).join('/');
   const pageTitle = `${title} | ${siteName}`;
   const plainText =
      description
         ?.replace(/<[^>]*>/g, ' ')
         .replace(/\s+/g, ' ')
         .trim() || '';
   const pageDescription =
      plainText.length > 160 ? `${plainText.slice(0, 157)}...` : plainText;
   const ogImage = banner || thumbnail;

   return (
      <>
         <Head>
            <title>{pageTitle}</title>
            {pageDescription && (
               <meta name="description" content={pageDescription} />
            )}
            {keywords.length > 0 && (
               <meta name="keywords" content={keywords.join(', ')} />
            )}

            {/* Open Graph Tags */}
            <meta property="og:type" content="article" />
            <meta property="og:url" content={siteUrl} />
            <meta property="og:title" content={title} />
            {pageDescription && (
               <meta property="og:description" content={pageDescription} />
            )}
            <meta property="og:site_name" content={siteName} />
            {ogImage && <meta property="og:image" content={ogImage} />}
            {ogImage && <meta property="og:image:width" content="1200" />}
            {ogImage && <meta property="og:image:height" content="630" />}

            {/* Twitter Card Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            {pageDescription && (
               <meta name="twitter:description" content={pageDescription} />
            )}
            {ogImage && <meta name="twitter:image" content={ogImage} />}

            {/* Schema.org structured data */}
            <script type="application/ld+json">
               {JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'BlogPosting',
                  headline: title,
                  description: pageDescription,
                  image: ogImage,
                  url: siteUrl,
                  mainEntityOfPage: siteUrl,
                  datePublished: created_at,
                  dateModified: updated_at,
                  author: user?.name
                     ? {
                          '@type': 'Person',
                          name: user.name,
                       }
                     : undefined,
                  publisher: {
                     '@type': 'Organization',
                     name: siteName,
                     url: siteOrigin,
                  },
                  keywords: keywords.join(', '),
               })}
            </script>
         </Head>

         <div className="mx-auto w-full max-w-4xl space-y-6">
            {/* Banner */}
            {banner && (
               <div className="overflow-hidden border">
                  <img
                     src={banner}
                     alt={frontend.blog_banner_alt}
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
                           alt={user?.name || frontend.author_alt}
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
                        alt={frontend.blog_thumbnail_alt}
                        className="max-h-60 w-full overflow-hidden rounded-lg border object-cover sm:max-h-72 md:max-h-96"
                     />
                  )}

                  <div className="prose dark:prose-invert max-w-none py-6">
                     <Renderer value={description ?? ''} />
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

               <Separator className="my-6" />

               {/* Like/Dislike Section */}
               <div className="flex items-center justify-center py-4">
                  <BlogLikeDislike />
               </div>

               <Separator className="my-6" />

               {/* Comments Section */}
               <BlogComments />
            </div>
         </div>
      </>
   );
};

ShowBlog.layout = (page: ReactNode) => <LandingLayout children={page} />;

export default ShowBlog;
