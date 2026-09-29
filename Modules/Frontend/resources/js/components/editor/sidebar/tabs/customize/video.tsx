import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEditor } from '@/frontend/hooks/use-editor';

const VideoSettings = ({
   changeCustomValues,
}: {
   changeCustomValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
   const { editor } = useEditor();

   return (
      editor.editor.selectedElement.type === 'video' && (
         <div className="flex flex-col gap-2">
            <Label>Video Path</Label>
            <Input
               id="src"
               placeholder="https://domain.example.com/pathname"
               onChange={changeCustomValues}
               value={
                  typeof editor.editor.selectedElement.content === 'object' &&
                  !Array.isArray(editor.editor.selectedElement.content) &&
                  editor.editor.selectedElement.content !== null &&
                  'src' in editor.editor.selectedElement.content
                     ? (editor.editor.selectedElement.content as any).src
                     : ''
               }
            />
         </div>
      )
   );
};

export default VideoSettings;
