import { useEditorState } from '@tiptap/react';
import { useState } from 'react';
import Button from '@/components/rich-editor/components/ui/Button';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from '@/components/rich-editor/components/ui/dialog';
import MenuButton from '../MenuButton';
import { useTiptapContext } from '../Provider';
import Input from '../ui/Input';
import Label from '../ui/Label';

const YoutubeButton = () => {
   const { editor } = useTiptapContext();
   const [open, setOpen] = useState(false);
   const [url, setUrl] = useState(
      'https://www.youtube.com/watch?v=DupfnOCH-JI',
   );

   const state = useEditorState({
      editor,
      selector: (ctx) => {
         return {
            active: ctx.editor.isActive('youtube'),
            disabled: !ctx.editor.isEditable,
         };
      },
   });

   const handleSubmit = () => {
      if (url.trim()) {
         editor.chain().focus().embedYoutube({ src: url }).run();
         setUrl('https://www.youtube.com/watch?v=DupfnOCH-JI');
         setOpen(false);
      }
   };

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <MenuButton
            icon="Youtube"
            tooltip="Youtube"
            onClick={() => setOpen(true)}
            {...state}
         />
         <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
               <DialogTitle>Embed YouTube Video</DialogTitle>
               <DialogDescription>
                  Enter the YouTube video URL to embed it in your content.
               </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
               <div className="grid gap-3">
                  <Label>YouTube URL</Label>
                  <Input
                     id="youtube-url"
                     placeholder="https://www.youtube.com/watch?v=..."
                     value={url}
                     onChange={(e) => setUrl(e.target.value)}
                     autoFocus
                  />
               </div>
            </div>
            <DialogFooter>
               <DialogClose asChild>
                  <Button type="button" variant="outline">
                     Cancel
                  </Button>
               </DialogClose>
               <Button onClick={handleSubmit} type="button" variant="primary">
                  Embed Video
               </Button>
            </DialogFooter>
         </DialogContent>
      </Dialog>
   );
};

export default YoutubeButton;
