import HtmlRenderer from './html-renderer';

interface ServerRendererProps {
   children: string;
   className?: string;
}

const ServerRenderer = ({ children, className }: ServerRendererProps) => {
   return <HtmlRenderer content={children} className={className} />;
};

export default ServerRenderer;
