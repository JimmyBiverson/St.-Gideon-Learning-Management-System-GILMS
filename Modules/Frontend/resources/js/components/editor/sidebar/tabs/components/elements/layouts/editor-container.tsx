import { cn } from '@/lib/utils';
import SortableList from '@/frontend/components/editor/dnd/SortableList';
import { useEditor } from '@/frontend/hooks/use-editor';
import ElementWrapper from '../element-wrapper';

interface ContainerProps {
   element: EditorElement;
}

const EditorContainer = ({ element }: ContainerProps) => {
   const { editor: editorState } = useEditor();
   const { editor } = editorState;
   const { id, type, content } = element;

   const childIds = Array.isArray(content)
      ? (content as EditorElement[]).map((child) => child.id)
      : [];

   return (
      <ElementWrapper
         tag="div"
         element={element}
         isContainer={true}
         wrapperClassName={cn('relative transition-all', {
            'py-2': !editor.liveMode && !editor.previewMode,
         })}
      >
         {Array.isArray(content) && (
            <SortableList items={childIds} id={id} content={content} />
         )}
      </ElementWrapper>
   );
};

export default EditorContainer;
