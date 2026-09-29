import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DynamicIcon } from 'lucide-react/dynamic';
import { useState } from 'react';
import ApiCopy from './api-copy';
import DeleteCollection from './delete-collection';

interface BlogCategoriesCollectionProps {
   data: { best: any | null; top: any[]; new: any[] };
   categories: Pagination<any>;
   onInsert: (
      type: string,
      category: FrontendPageAPIParams,
      itemId: number | string,
   ) => void;
}

const BlogCategoriesCollection = ({
   data,
   categories,
   onInsert,
}: BlogCategoriesCollectionProps) => {
   const [value, setValue] = useState('best');

   const renderCategoryRow = (
      category_item: any,
      category: FrontendPageAPIParams,
   ) => (
      <TableRow key={category_item.id}>
         <TableCell>
            {category_item.icon ? (
               <DynamicIcon
                  name={category_item.icon as any}
                  className="h-8 w-8"
               />
            ) : (
               <div className="h-12 w-12 rounded bg-muted" />
            )}
         </TableCell>
         <TableCell className="font-medium">{category_item.name}</TableCell>
         <TableCell>{category_item.slug || 'N/A'}</TableCell>
         <TableCell>{category_item.blogs_count || 0} blogs</TableCell>
         <TableCell className="flex items-center justify-end">
            <DeleteCollection
               type="blog_categories"
               category={category}
               itemId={category_item.id}
            />
         </TableCell>
      </TableRow>
   );

   return (
      <Card>
         <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
            <div>
               <CardTitle className="text-xl font-bold">
                  Blog Categories
               </CardTitle>
               <ApiCopy value={`api/collections/blog_categories/${value}`} />
            </div>
         </CardHeader>
         <CardContent>
            <Tabs
               defaultValue="best"
               className="w-full"
               value={value}
               onValueChange={setValue}
            >
               <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="best">Best</TabsTrigger>
                  <TabsTrigger value="top">Top</TabsTrigger>
                  <TabsTrigger value="new">New</TabsTrigger>
               </TabsList>

               <TabsContent value="best">
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Icon</TableHead>
                           <TableHead>Name</TableHead>
                           <TableHead>Slug</TableHead>
                           <TableHead>Blogs</TableHead>
                           <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {data.best ? (
                           renderCategoryRow(data.best, 'best')
                        ) : (
                           <TableRow>
                              <TableCell
                                 colSpan={5}
                                 className="text-center text-muted-foreground"
                              >
                                 No best blog category selected
                              </TableCell>
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>
               </TabsContent>

               <TabsContent value="top">
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Icon</TableHead>
                           <TableHead>Name</TableHead>
                           <TableHead>Slug</TableHead>
                           <TableHead>Blogs</TableHead>
                           <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {data.top && data.top.length > 0 ? (
                           data.top.map((category_item) =>
                              renderCategoryRow(category_item, 'top'),
                           )
                        ) : (
                           <TableRow>
                              <TableCell
                                 colSpan={5}
                                 className="text-center text-muted-foreground"
                              >
                                 No top blog categories selected
                              </TableCell>
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>
               </TabsContent>

               <TabsContent value="new">
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Icon</TableHead>
                           <TableHead>Name</TableHead>
                           <TableHead>Slug</TableHead>
                           <TableHead>Blogs</TableHead>
                           <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {data.new && data.new.length > 0 ? (
                           data.new.map((category_item) =>
                              renderCategoryRow(category_item, 'new'),
                           )
                        ) : (
                           <TableRow>
                              <TableCell
                                 colSpan={5}
                                 className="text-center text-muted-foreground"
                              >
                                 No new blog categories selected
                              </TableCell>
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>
               </TabsContent>
            </Tabs>
         </CardContent>
      </Card>
   );
};

export default BlogCategoriesCollection;
