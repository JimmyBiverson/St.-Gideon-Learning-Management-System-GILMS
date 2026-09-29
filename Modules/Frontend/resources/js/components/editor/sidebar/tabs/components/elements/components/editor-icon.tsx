import { DynamicIcon } from 'lucide-react/dynamic';
import React from 'react';
import { useEditor } from '@/frontend/hooks/use-editor';
import ElementWrapper from '../element-wrapper';

interface IconProps {
   element: EditorElement;
}

const EditorIcon: React.FC<IconProps> = ({ element }) => {
   const { editor } = useEditor();
   const iconName =
      typeof element.content === 'object' && 'icon' in element.content
         ? element.content.icon
         : 'star';

   // Extract size from styles or use default
   const size =
      element.styles?.width && typeof element.styles.width === 'string'
         ? parseInt(element.styles.width)
         : 24;

   return (
      <ElementWrapper
         tag="span"
         element={element}
         isContainer={false}
         applyStyles={false}
         wrapperClassName={!editor.editor.liveMode ? 'p-1' : ''}
      >
         <DynamicIcon
            name={iconName as any}
            className={element.className}
            size={size}
         />
      </ElementWrapper>
   );
};

export default EditorIcon;
