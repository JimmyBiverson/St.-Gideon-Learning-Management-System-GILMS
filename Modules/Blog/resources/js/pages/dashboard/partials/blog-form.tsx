import Combobox from '@/components/combobox';
import InputError from '@/components/input-error';
import { Editor } from '@/components/rich-editor';
import { Button } from '@/components/ui/button';
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { onFileChangePreview } from '@/lib/inertia';
import { store as storeBlog, update as updateBlog } from '@/routes/blogs';
import { Form, useForm, usePage } from '@inertiajs/react';
import { Image, Save } from 'lucide-react';
import { useState } from 'react';

const BlogForm = () => {
   const { props } = usePage<BlogCreateEditProps>();
   const { auth, blog, categories, statuses, translate } = props;
   const { dashboard, input, button } = translate;

   const [bannerUrl, setBannerUrl] = useState(
      blog?.banner || '/assets/images/blank-image.jpg',
   );
   const [thumbnailUrl, setThumbnailUrl] = useState(
      blog?.thumbnail || '/assets/images/blank-image.jpg',
   );

   const { data, setData } = useForm({
      categoryId: blog?.blog_category_id ? String(blog.blog_category_id) : '',
      description: blog ? blog.description : '',
   });

   const transformedCategories = categories?.map((category) => ({
      label: category.name,
      value: category.id.toString(),
   }));

   const formDefinition = blog ? updateBlog.form(blog.id) : storeBlog.form();

   return (
      <Form
         {...formDefinition}
         transform={(formData) => ({
            ...formData,
            user_id: blog ? blog.user_id : auth.user.id,
            blog_category_id: data.categoryId,
            description: data.description,
         })}
         options={{ preserveScroll: true }}
         className="space-y-6"
      >
         {({ processing, errors }) => (
            <>
               {/* Basic Information */}
               <Card className="py-6">
                  <CardContent className="space-y-6">
                     <div>
                        <Label htmlFor="title">{input.title}</Label>
                        <Input
                           id="title"
                           name="title"
                           defaultValue={blog?.title || ''}
                           placeholder={input.title}
                           maxLength={80}
                        />
                        <InputError message={errors.title as string} />
                     </div>

                     <div className="grid gap-4 md:grid-cols-2">
                        <div>
                           <Label htmlFor="blog_category_id">
                              {input.category} *
                           </Label>
                           <Combobox
                              defaultValue={data.categoryId}
                              data={transformedCategories || []}
                              placeholder={dashboard.select_category}
                              onSelect={(selected) =>
                                 setData('categoryId', selected.value)
                              }
                           />
                           <InputError
                              message={errors.blog_category_id as string}
                           />
                        </div>

                        <div>
                           <Label htmlFor="status">{input.status} *</Label>
                           <Select
                              name="status"
                              defaultValue={blog ? blog.status : 'draft'}
                           >
                              <SelectTrigger>
                                 <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                 {Object.entries(statuses).map(
                                    ([key, label]) => (
                                       <SelectItem key={key} value={key}>
                                          {String(label)}
                                       </SelectItem>
                                    ),
                                 )}
                              </SelectContent>
                           </Select>
                           <InputError message={errors.status as string} />
                        </div>
                     </div>

                     <div>
                        <Label htmlFor="keywords">{input.keywords}</Label>
                        <Input
                           id="keywords"
                           name="keywords"
                           defaultValue={blog?.keywords || ''}
                           placeholder={(dashboard as any).keywords_80_char}
                           maxLength={80}
                        />
                        <InputError message={errors.keywords as string} />
                     </div>

                     <div>
                        <Label htmlFor="description">
                           {input.description} *
                        </Label>
                        <Editor
                           ssr={true}
                           output="html"
                           placeholder={{
                              paragraph: dashboard.write_blog_content_here,
                              imageCaption: dashboard.type_caption_optional,
                           }}
                           contentMinHeight={256}
                           contentMaxHeight={640}
                           initialContent={data.description}
                           onContentChange={(value: any) =>
                              setData('description', value as string)
                           }
                        />
                        <InputError message={errors.description as string} />
                     </div>
                  </CardContent>
               </Card>

               {/* Media Information */}
               <Card className="space-y-6 py-6">
                  <CardHeader>
                     <CardTitle className="flex items-center gap-2">
                        <Image className="h-5 w-5" />
                        {dashboard.media_files}
                     </CardTitle>
                     <CardDescription>
                        {dashboard.upload_banner_thumbnail_desc}
                     </CardDescription>
                  </CardHeader>

                  <CardContent className="grid gap-4 md:grid-cols-2">
                     <div>
                        <Label htmlFor="banner">{dashboard.blog_banner}</Label>
                        <Input
                           id="banner"
                           type="file"
                           accept="image/*"
                           name="banner"
                           onChange={(e) =>
                              onFileChangePreview(e, setBannerUrl)
                           }
                        />
                        <InputError message={errors.banner as string} />

                        <div className="mt-3 overflow-hidden rounded-lg border-2 border-dashed border-border">
                           <img src={bannerUrl} alt="" />
                        </div>
                     </div>

                     <div>
                        <Label htmlFor="thumbnail">
                           {dashboard.blog_thumbnail}
                        </Label>
                        <Input
                           id="thumbnail"
                           type="file"
                           accept="image/*"
                           name="thumbnail"
                           onChange={(e) =>
                              onFileChangePreview(e, setThumbnailUrl)
                           }
                        />
                        <InputError message={errors.thumbnail as string} />

                        <div className="mt-3 overflow-hidden rounded-lg border-2 border-dashed border-border">
                           <img src={thumbnailUrl} alt="" />
                        </div>
                     </div>
                  </CardContent>
               </Card>

               <Button type="submit" disabled={processing}>
                  <Save className="h-4 w-4" />
                  {blog ? dashboard.update_blog : 'Create Blog'}
               </Button>
            </>
         )}
      </Form>
   );
};

export default BlogForm;
