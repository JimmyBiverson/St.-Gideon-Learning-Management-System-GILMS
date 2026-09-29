'use client';

import HtmlRenderer from './html-renderer';

interface ClientRendererProps {
   children: string;
   className?: string;
}

const ClientRenderer = ({ children, className }: ClientRendererProps) => {
   return <HtmlRenderer content={children} className={className} />;
};

export default ClientRenderer;
