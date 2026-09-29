import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DashboardLayout from '@/layouts/dashboard/layout';
import { update } from '@/routes/products';
import productFiles from '@/routes/products/files';
import productImages from '@/routes/products/images';
import { Form, router, usePage } from '@inertiajs/react';
import { File as FileIcon, Trash2 } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';

const formatBytes = (bytes: number) => {
   if (!bytes) {
      return '0 B';
   }

   const units = ['B', 'KB', 'MB', 'GB'];
   const exponent = Math.min(
      Math.floor(Math.log(bytes) / Math.log(1024)),
      units.length - 1,
   );

   return `${(bytes / 1024 ** exponent).toFixed(1)} ${units[exponent]}`;
};

const Media = () => {
   const { props } = usePage<ProductUpdateProps>();
   const { tab, product } = props;
   const [thumbnailPreview, setThumbnailPreview] = useState(product.thumbnail);
   const [uploadingImages, setUploadingImages] = useState(false);
   const [uploadingFiles, setUploadingFiles] = useState(false);

   const onFileChangePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
         setThumbnailPreview(URL.createObjectURL(file));
      }
   };

   const uploadImages = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (!files || files.length === 0) {
         return;
      }

      const formData = new FormData();
      formData.append('product_id', String(product.id));
      Array.from(files).forEach((file) => formData.append('images[]', file));

      setUploadingImages(true);
      router.post(productImages.store(), formData, {
         preserveScroll: true,
         onFinish: () => setUploadingImages(false),
      });
      e.target.value = '';
   };

   const uploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (!files || files.length === 0) {
         return;
      }

      const formData = new FormData();
      formData.append('product_id', String(product.id));
      Array.from(files).forEach((file) => formData.append('files[]', file));

      setUploadingFiles(true);
      router.post(productFiles.store(), formData, {
         preserveScroll: true,
         onFinish: () => setUploadingFiles(false),
      });
      e.target.value = '';
   };

   return (
      <div className="space-y-6">
         <Card className="container p-4 sm:p-6">
            <Form
               {...update.form({ id: product.id })}
               className="space-y-4"
               options={{ preserveScroll: true }}
            >
               {({ processing, errors }) => (
                  <>
                     <input type="hidden" name="tab" value={tab} />

                     <div>
                        <Label>Thumbnail</Label>
                        <Input
                           type="file"
                           name="thumbnail"
                           accept="image/*"
                           onChange={onFileChangePreview}
                        />
                        <InputError message={errors.thumbnail} />

                        <img
                           src={
                              thumbnailPreview ||
                              '/assets/images/blank-image.jpg'
                           }
                           alt=""
                           className="mt-2 w-full max-w-sm rounded-md"
                        />
                     </div>

                     <LoadingButton
                        loading={processing}
                        className="float-end mt-4"
                     >
                        Save Changes
                     </LoadingButton>
                  </>
               )}
            </Form>
         </Card>

         <Card className="container space-y-4 p-4 sm:p-6">
            <div className="flex items-center justify-between">
               <div>
                  <h3 className="font-medium">Gallery Images</h3>
                  <p className="text-sm text-muted-foreground">
                     Shown on the public product page. Up to 8 images.
                  </p>
               </div>
               <div>
                  <Input
                     type="file"
                     multiple
                     accept="image/*"
                     disabled={uploadingImages}
                     onChange={uploadImages}
                  />
               </div>
            </div>

            {product.images && product.images.length > 0 ? (
               <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {product.images.map((image) => (
                     <div key={image.id} className="group relative">
                        <img
                           src={image.url}
                           alt={image.name}
                           className="aspect-square w-full rounded-md object-cover"
                        />
                        <Button
                           type="button"
                           size="icon"
                           variant="destructive"
                           className="absolute top-1 right-1 h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
                           onClick={() =>
                              router.delete(
                                 productImages.destroy.url({
                                    product: Number(product.id),
                                    media: image.id,
                                 }),
                                 { preserveScroll: true },
                              )
                           }
                        >
                           <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                     </div>
                  ))}
               </div>
            ) : (
               <p className="rounded-lg border border-dashed py-8 text-center text-sm text-muted-foreground">
                  No gallery images uploaded yet
               </p>
            )}
         </Card>

         <Card className="container space-y-4 p-4 sm:p-6">
            <div className="flex items-center justify-between">
               <div>
                  <h3 className="font-medium">Downloadable Files</h3>
                  <p className="text-sm text-muted-foreground">
                     Delivered to buyers after purchase. Up to 5 files, 50MB
                     each.
                  </p>
               </div>
               <div>
                  <Input
                     type="file"
                     multiple
                     disabled={uploadingFiles}
                     onChange={uploadFiles}
                  />
               </div>
            </div>

            {product.files && product.files.length > 0 ? (
               <div className="space-y-2">
                  {product.files.map((file) => (
                     <div
                        key={file.id}
                        className="flex items-center justify-between rounded-lg border px-4 py-2"
                     >
                        <div className="flex items-center gap-3">
                           <FileIcon className="h-4 w-4 text-muted-foreground" />
                           <div>
                              <p className="text-sm font-medium">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                 {formatBytes(file.size)}
                              </p>
                           </div>
                        </div>
                        <Button
                           type="button"
                           size="icon"
                           variant="ghost"
                           onClick={() =>
                              router.delete(
                                 productFiles.destroy.url({
                                    product: Number(product.id),
                                    media: file.id,
                                 }),
                                 { preserveScroll: true },
                              )
                           }
                        >
                           <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                     </div>
                  ))}
               </div>
            ) : (
               <p className="rounded-lg border border-dashed py-8 text-center text-sm text-muted-foreground">
                  No downloadable files uploaded yet
               </p>
            )}
         </Card>
      </div>
   );
};

Media.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Media;
