import DeleteModal from '@/components/inertia/delete-modal';
import InputError from '@/components/input-error';
import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import projectRoutes from '@/routes/project';
import { router, usePage } from '@inertiajs/react';
import { Check, Copy, ImagePlus, Trash2, X } from 'lucide-react';
import type { FormEventHandler } from 'react';
import { useEffect, useState } from 'react';

interface PreviewImage {
   file: File;
   preview: string;
}

interface UploadedImage {
   id: number;
   name: string;
   url: string;
   size: number;
   mime_type: string;
}

const MediaTab = () => {
   const { props } = usePage<EditorProps>();
   const { project } = props;
   const [selectedImages, setSelectedImages] = useState<PreviewImage[]>([]);
   const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
   const [processing, setProcessing] = useState(false);
   const [errors, setErrors] = useState<{ [key: string]: string }>({});
   const [copiedId, setCopiedId] = useState<number | null>(null);

   // Load existing images on mount
   useEffect(() => {
      if (project.media) {
         const images = project.media.map((media: any) => ({
            id: media.id,
            name: media.file_name,
            url: media.original_url,
            size: media.size,
            mime_type: media.mime_type,
         }));
         setTimeout(() => {
            setUploadedImages(images);
         }, 0);
      }
   }, [project]);

   const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      const newImages: PreviewImage[] = [];

      files.forEach((file) => {
         if (file.type.startsWith('image/')) {
            const preview = URL.createObjectURL(file);
            newImages.push({ file, preview });
         }
      });

      setSelectedImages((prev) => [...prev, ...newImages]);
      setErrors({});
   };

   const removeSelectedImage = (index: number) => {
      setSelectedImages((prev) => {
         URL.revokeObjectURL(prev[index].preview);

         return prev.filter((_, i) => i !== index);
      });
   };

   const submit: FormEventHandler = (e) => {
      e.preventDefault();

      if (selectedImages.length === 0) {
         setErrors({ images: 'Please select at least one image' });

         return;
      }

      const formData = new FormData();
      formData.append('project_id', project.id.toString());
      selectedImages.forEach((img, index) => {
         formData.append(`images[${index}]`, img.file);
      });

      setProcessing(true);
      setErrors({});

      router.post(projectRoutes.storeImage(), formData, {
         onSuccess: (page: any) => {
            selectedImages.forEach((img) => URL.revokeObjectURL(img.preview));
            setSelectedImages([]);

            const flash = page.props?.flash as
               | { uploaded_images?: UploadedImage[] }
               | undefined;
            const newImages = flash?.uploaded_images;

            if (newImages && Array.isArray(newImages)) {
               setUploadedImages((prev) => [...prev, ...newImages]);
            }
         },
         onError: (errors: any) => {
            setErrors(errors);
         },
         onFinish: () => {
            setProcessing(false);
         },
      });
   };

   const copyToClipboard = async (url: string, id: number) => {
      try {
         await navigator.clipboard.writeText(url);
         setCopiedId(id);
         setTimeout(() => setCopiedId(null), 2000);
      } catch (err) {
         console.error('Failed to copy:', err);
      }
   };

   const deleteImage = (imageId: number) => {
      if (!confirm('Are you sure you want to delete this image?')) {
         return;
      }

      router.delete(`/page-editor/projects/image/${project.id}/${imageId}`, {
         onSuccess: () => {
            setUploadedImages((prev) =>
               prev.filter((img) => img.id !== imageId),
            );
         },
      });
   };

   const formatFileSize = (bytes: number) => {
      if (bytes < 1024) {
         return bytes + ' B';
      }

      if (bytes < 1024 * 1024) {
         return (bytes / 1024).toFixed(1) + ' KB';
      }

      return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
   };

   return (
      <div className="overflow-auto p-4">
         <div className="flex h-full w-full flex-col gap-4">
            <div className="flex flex-col gap-2">
               <h2 className="text-xl font-semibold">Media</h2>
               <p className="text-sm text-muted-foreground">
                  Upload and manage your media files
               </p>
            </div>

            {/* Upload Form */}
            <form className="w-full space-y-4" onSubmit={submit}>
               <div>
                  <label
                     htmlFor="images"
                     className="flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-primary/20 transition-colors hover:border-primary/40"
                  >
                     <ImagePlus className="mb-2 h-8 w-8 text-muted-foreground" />
                     <span className="mt-1 text-xs text-muted-foreground">
                        Select maximum 4 images at a time.
                     </span>
                     <span className="mt-1 text-xs text-muted-foreground">
                        Max 2MB per image to Upload.
                     </span>
                  </label>
                  <input
                     hidden
                     id="images"
                     type="file"
                     accept="image/*"
                     multiple
                     onChange={handleFileSelect}
                  />
                  <InputError message={errors.images || errors['images.0']} />
               </div>

               {/* Selected Images Preview */}
               {selectedImages.length > 0 && (
                  <div className="space-y-2">
                     <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">
                           Selected Images ({selectedImages.length})
                        </p>
                        <LoadingButton
                           loading={processing}
                           type="submit"
                           size="sm"
                        >
                           <span>Upload All</span>
                        </LoadingButton>
                     </div>

                     <div className="grid grid-cols-2 gap-2">
                        {selectedImages.map((img, index) => (
                           <div
                              key={index}
                              className="group relative overflow-hidden rounded-lg border"
                           >
                              <img
                                 src={img.preview}
                                 alt="Preview"
                                 className="h-24 w-full object-cover"
                              />
                              <button
                                 type="button"
                                 onClick={() => removeSelectedImage(index)}
                                 className="absolute top-1 right-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                              >
                                 <X className="h-3 w-3" />
                              </button>
                              <div className="absolute right-0 bottom-0 left-0 bg-background/80 p-1">
                                 <p className="truncate text-xs">
                                    {img.file.name}
                                 </p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               )}
            </form>

            {/* Uploaded Images */}
            {uploadedImages.length > 0 && (
               <div className="space-y-2">
                  <h3 className="text-sm font-medium">
                     Uploaded Images ({uploadedImages.length})
                  </h3>

                  <div className="grid grid-cols-2 gap-2">
                     {uploadedImages.map((img, index) => (
                        <div
                           key={index}
                           className="group relative overflow-hidden rounded-lg border"
                        >
                           <img
                              src={img.url}
                              alt="Preview"
                              className="h-24 w-full object-cover"
                           />

                           <div className="absolute top-1 right-1 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                              <Button
                                 size="icon"
                                 type="button"
                                 variant="outline"
                                 className="h-7 w-7"
                                 onClick={() =>
                                    copyToClipboard(img.url, img.id)
                                 }
                              >
                                 {copiedId === img.id ? (
                                    <Check className="!h-[14px] !w-[14px] text-green-500" />
                                 ) : (
                                    <Copy className="!h-[14px] !w-[14px]" />
                                 )}
                              </Button>

                              <DeleteModal
                                 routePath={projectRoutes.deleteImage.url({
                                    project: project.id,
                                    image: img.id,
                                 })}
                                 actionComponent={
                                    <Button
                                       size="icon"
                                       type="button"
                                       variant="outline"
                                       className="h-7 w-7 text-red-500 hover:bg-red-50 hover:text-red-600"
                                       // onClick={() => deleteImage(img.id)}
                                    >
                                       <Trash2 className="!h-[14px] !w-[14px]" />
                                    </Button>
                                 }
                              />
                           </div>

                           <div className="absolute right-0 bottom-0 left-0 bg-background/80 p-1">
                              <p className="truncate text-xs">{img.name}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            )}

            {uploadedImages.length === 0 && selectedImages.length === 0 && (
               <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                  <ImagePlus className="mb-2 h-12 w-12 opacity-20" />
                  <p className="text-sm">No images uploaded yet</p>
               </div>
            )}
         </div>
      </div>
   );
};

export default MediaTab;
