import { cn } from '@/lib/utils';

interface HtmlRendererProps {
   content: string;
   className?: string;
}

/**
 * Renders stored TipTap HTML with editor styles. No TipTap runtime — avoids
 * useEditor mount races that can blank the page after reload.
 */
const HtmlRenderer = ({ content, className }: HtmlRendererProps) => {
   return (
      <div className={cn('rte-renderer', className)}>
         <div className="rte-editor__container">
            <div className="rte-editor__content">
               <div
                  className="tiptap ProseMirror"
                  dangerouslySetInnerHTML={{ __html: content }}
               />
            </div>
         </div>
      </div>
   );
};

export default HtmlRenderer;
