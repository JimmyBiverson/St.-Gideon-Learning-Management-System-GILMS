import '@/components/rich-editor/style/editor.css';

import ClientRenderer from './components/renderer/client-renderer';
import ServerRenderer from './components/renderer/server-renderer';

interface TiptapRendererProps {
   value: string;
   ssr?: boolean;
   className?: string;
}

const TiptapRenderer = ({
   value,
   ssr = false,
   className,
}: TiptapRendererProps) => {
   if (ssr) {
      return <ServerRenderer className={className}>{value}</ServerRenderer>;
   }

   return <ClientRenderer className={className}>{value}</ClientRenderer>;
};

export default TiptapRenderer;
