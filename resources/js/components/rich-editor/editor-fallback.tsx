import { cn } from '@/lib/utils';

type RichEditorFallbackProps = {
   contentMinHeight?: string | number;
   containerClass?: string;
};

export function RichEditorFallback({
   contentMinHeight = 200,
   containerClass,
}: RichEditorFallbackProps) {
   const minHeight =
      typeof contentMinHeight === 'number'
         ? `${contentMinHeight}px`
         : contentMinHeight;

   return (
      <div
         className={cn(
            'animate-pulse rounded-md border border-border bg-muted/40',
            containerClass,
         )}
         style={{ minHeight }}
         aria-hidden
      />
   );
}
