'use client';

import { useEditorState } from '@tiptap/react';
import type { ChangeEvent } from 'react';
import { useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';
import MenuButton from '@/components/rich-editor/components/MenuButton';
import { useTiptapContext } from '@/components/rich-editor/components/Provider';
import { Button } from '@/components/rich-editor/components/ui/Button';
import {
   Dialog,
   DialogContent,
   DialogTrigger,
} from '@/components/rich-editor/components/ui/dialog';
import Input from '@/components/rich-editor/components/ui/Input';
import {
   Tabs,
   TabsContent,
   TabsList,
   TabsTrigger,
} from '@/components/rich-editor/components/ui/tabs';

const ImageButton = () => {
   const [open, setOpen] = useState(false);
   const [imageUrl, setImageUrl] = useState('');

   const { editor } = useTiptapContext();
   const state = useEditorState({
      editor,
      selector: (ctx) => {
         return {
            active: ctx.editor.isActive('image'),
            disabled: !ctx.editor.isEditable,
         };
      },
   });

   const fileInput = useRef<HTMLInputElement>(null);
   const onUrlSubmit = useCallback(() => {
      editor.chain().setImage({ src: imageUrl }).focus().run();
      setOpen(false);
   }, [imageUrl, editor]);

   const onUpload = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
         const target = e.target;
         const file = target.files?.[0];
         // if (file?.type.startsWith('image/')) {
         //    const url = URL.createObjectURL(file);
         //    editor.chain().setImage({ src: url }).focus().run();
         // }

         if (file?.type.startsWith('image/')) {
            // Check file size (512KB max)
            const maxSizeInBytes = 512 * 1024; // 512KB

            if (file.size > maxSizeInBytes) {
               toast.warning(
                  'Image max size 512KB. Because this image will save on the database, please use smaller images.',
                  {
                     position: 'top-center',
                     style: {
                        backgroundColor: '#fef3c7',
                        color: '#92400e',
                        borderColor: '#f59e0b',
                     },
                  },
               );
               setOpen(false);

               return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
               const dataUrl = event.target?.result as string;
               editor.chain().setImage({ src: dataUrl }).focus().run();
            };
            reader.readAsDataURL(file);
            setOpen(false);
         }
      },
      [editor],
   );

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <MenuButton icon="Image" tooltip="Image" {...state} />
         </DialogTrigger>
         <DialogContent className="sm:max-w-[425px]">
            <Tabs defaultValue="url">
               <TabsList className="mb-2 w-full">
                  <TabsTrigger value="url" className="cursor-pointer">
                     Image URL
                  </TabsTrigger>
                  <TabsTrigger value="upload" className="cursor-pointer">
                     Image Upload
                  </TabsTrigger>
               </TabsList>

               <TabsContent value="upload">
                  <p className="mb-2 text-sm text-orange-500 italic">
                     Click below to select an image file (max 512KB). Images
                     will be converted to base64 and stored in the database,
                     making them publicly accessible.
                  </p>
                  <Input
                     type="file"
                     accept="image/*"
                     className="!border !border-border"
                     ref={fileInput}
                     onChange={onUpload}
                  />
               </TabsContent>
               <TabsContent value="url">
                  <p className="text-sm">
                     Enter the image url you want to insert.
                  </p>
                  <Input
                     value={imageUrl}
                     className="!mt-2 !border !border-border"
                     placeholder="https://example.com/image.jpg"
                     onChange={(e) => setImageUrl(e.target.value)}
                  />

                  <Button
                     className="!mt-3 !w-full cursor-pointer"
                     onClick={onUrlSubmit}
                  >
                     Insert Image
                  </Button>
               </TabsContent>
            </Tabs>
         </DialogContent>
      </Dialog>
   );
};

export default ImageButton;
