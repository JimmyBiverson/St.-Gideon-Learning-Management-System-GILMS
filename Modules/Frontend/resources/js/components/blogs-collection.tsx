import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import DataTable from '@/frontend/components/table';
import ApiCopy from './api-copy';
import DeleteCollection from './delete-collection';

interface BlogsCollectionProps {
   data: { best: Blog | null; top: Blog[]; new: Blog[] };
   blogs: Pagination<Blog>;
   onInsert: (
      type: string,
      category: FrontendPageAPIParams,
      itemId: number | string,
   ) => void;
}

const BlogsCollection = ({ data, blogs, onInsert }: BlogsCollectionProps) => {
   const [value, setValue] = useState('best');

   const renderBlogRow = (blog: Blog, category: FrontendPageAPIParams) => (
      <TableRow key={blog.id}>
         <TableCell>
            <img
               src={blog.thumbnail || '/placeholder.jpg'}
               alt={blog.title}
               className="h-12 w-20 rounded object-cover"
            />
         </TableCell>
         <TableCell className="font-medium">{blog.title}</TableCell>
         <TableCell>{blog.slug}</TableCell>
         <TableCell>{new Date(blog.created_at).toLocaleDateString()}</TableCell>
         <TableCell className="flex items-center justify-end">
            <DeleteCollection
               type="blogs"
               category={category}
               itemId={blog.id}
            />
         </TableCell>
      </TableRow>
   );

   return (
      <Card className="relative space-y-6 py-6">
         <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3">
            <div>
               <CardTitle className="text-xl font-bold">Blogs</CardTitle>
               <ApiCopy value={`api/collections/blogs/${value}`} />
            </div>

            <Dialog>
               <DialogTrigger>
                  <Button variant="outline" className="capitalize">
                     Select {value} Blog
                  </Button>
               </DialogTrigger>
               <DialogContent className="p-0">
                  <ScrollArea className="max-h-[90vh] p-2">
                     <DataTable
                        type="blogs"
                        title="Blogs"
                        data={blogs}
                        selectedIds={
                           value === 'best'
                              ? ([data.best?.id] as number[])
                              : value === 'top'
                                ? (data.top.map((blog) => blog.id) as number[])
                                : (data.new.map((blog) => blog.id) as number[])
                        }
                        onCourseSelect={(id) =>
                           onInsert('blogs', value as FrontendPageAPIParams, id)
                        }
                     />
                  </ScrollArea>
               </DialogContent>
            </Dialog>
         </CardHeader>

         <CardContent>
            <Tabs
               defaultValue="best"
               className="w-full"
               value={value}
               onValueChange={setValue}
            >
               <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="best" className="cursor-pointer">
                     Best Blog
                  </TabsTrigger>
                  <TabsTrigger value="top" className="cursor-pointer">
                     Top Blogs
                  </TabsTrigger>
                  <TabsTrigger value="new" className="cursor-pointer">
                     New Blogs
                  </TabsTrigger>
               </TabsList>

               <TabsContent value="best">
                  <Table>
                     <TableHeader>
                        <TableRow>
                           <TableHead>Image</TableHead>
                           <TableHead>Title</TableHead>
                           <TableHead>Slug</TableHead>
                           <TableHead>Date</TableHead>
                           <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {data.best ? (
                           renderBlogRow(data.best, 'best')
                        ) : (
                           <TableRow>
                              <TableCell
                                 colSpan={5}
                                 className="text-center text-muted-foreground"
                              >
                                 No best blog selected
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
                           <TableHead>Image</TableHead>
                           <TableHead>Title</TableHead>
                           <TableHead>Slug</TableHead>
                           <TableHead>Date</TableHead>
                           <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {data.top && data.top.length > 0 ? (
                           data.top.map((blog) => renderBlogRow(blog, 'top'))
                        ) : (
                           <TableRow>
                              <TableCell
                                 colSpan={5}
                                 className="text-center text-muted-foreground"
                              >
                                 No top blogs selected
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
                           <TableHead>Image</TableHead>
                           <TableHead>Title</TableHead>
                           <TableHead>Slug</TableHead>
                           <TableHead>Date</TableHead>
                           <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                     </TableHeader>
                     <TableBody>
                        {data.new && data.new.length > 0 ? (
                           data.new.map((blog) => renderBlogRow(blog, 'new'))
                        ) : (
                           <TableRow>
                              <TableCell
                                 colSpan={5}
                                 className="text-center text-muted-foreground"
                              >
                                 No new blogs selected
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

export default BlogsCollection;
