import { Button } from '@/components/ui/button';
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';
import WarningModal from '@/components/warning-modal';
import { Map } from 'lucide-react';

export default function ApplicationSitemap() {
   return (
      <Card className="border-2">
         <CardHeader className="p-4 sm:p-6">
            <h2 className="flex items-center gap-2 text-xl font-semibold">
               <Map className="h-5 w-5 text-primary" />
               XML Sitemap
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
               Generate search-engine sitemap for public courses, exams, blogs,
               and pages
            </p>
         </CardHeader>

         <CardContent className="space-y-6 p-4 pt-0 sm:p-6 sm:pt-0">
            <Card className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/10">
               <CardHeader className="p-4">
                  <CardTitle className="text-lg text-blue-900">
                     Sitemap generation
                  </CardTitle>
                  <CardDescription className="text-blue-700">
                     This writes{' '}
                     <code className="text-sm">public/sitemap.xml</code> and
                     clears the cached sitemap response.
                  </CardDescription>
               </CardHeader>
               <CardContent className="space-y-2 p-4 text-sm text-blue-800">
                  <div className="flex items-start gap-2">
                     <span className="font-semibold">1.</span>
                     <span>
                        Includes approved courses, published exams and blogs,
                        active CMS pages, instructors, and categories
                     </span>
                  </div>
                  <div className="flex items-start gap-2">
                     <span className="font-semibold">2.</span>
                     <span>
                        Run after publishing new content so Google can discover
                        updated URLs
                     </span>
                  </div>
                  <div className="flex items-start gap-2">
                     <span className="font-semibold">3.</span>
                     <span>
                        Ensure the <code className="text-sm">public/</code>{' '}
                        directory is writable on your hosting server
                     </span>
                  </div>
               </CardContent>
            </Card>

            <div className="flex flex-col gap-3 sm:flex-row">
               <WarningModal
                  method="post"
                  routePath="/system/sitemap"
                  title="Generate sitemap.xml now?"
                  actionComponent={
                     <Button type="button">
                        <Map className="h-4 w-4" />
                        <span>Generate Sitemap</span>
                     </Button>
                  }
               />
            </div>
         </CardContent>
      </Card>
   );
}
