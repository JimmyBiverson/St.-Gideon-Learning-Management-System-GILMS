import { usePage } from '@inertiajs/react';
import { AlertCircle, Download, ExternalLink } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import { useMemo } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
   src: string;
   fileName?: string;
}

type DocumentType = 'pdf' | 'office' | 'image' | 'text' | 'unsupported';

const DocumentViewer = ({ src, fileName, className, ...props }: Props) => {
   const { props: pageProps } = usePage<SharedData>();
   const { translate } = pageProps;
   const { frontend } = translate;
   const documentInfo = useMemo(() => {
      const getFileExtension = (url: string): string => {
         const urlWithoutQuery = url.split('?')[0];
         const extension =
            urlWithoutQuery.split('.').pop()?.toLowerCase() || '';

         return extension;
      };

      const getDocumentType = (extension: string): DocumentType => {
         const pdfFormats = ['pdf'];
         const officeFormats = [
            'doc',
            'docx',
            'xls',
            'xlsx',
            'ppt',
            'pptx',
            'odt',
            'ods',
            'odp',
         ];
         const imageFormats = [
            'jpg',
            'jpeg',
            'png',
            'gif',
            'bmp',
            'webp',
            'svg',
         ];
         const textFormats = ['txt', 'rtf', 'csv'];

         if (pdfFormats.includes(extension)) {
            return 'pdf';
         }

         if (officeFormats.includes(extension)) {
            return 'office';
         }

         if (imageFormats.includes(extension)) {
            return 'image';
         }

         if (textFormats.includes(extension)) {
            return 'text';
         }

         return 'unsupported';
      };

      const extension = getFileExtension(src);
      const type = getDocumentType(extension);

      return { extension, type };
   }, [src]);

   const renderDocument = () => {
      const baseClassName =
         'h-full max-h-[calc(100vh-60px)] min-h-[80vh] w-full';

      switch (documentInfo.type) {
         case 'pdf':
            return (
               <iframe
                  src={src}
                  width="100%"
                  height="100%"
                  allowFullScreen
                  title={frontend.pdf_document}
                  className={baseClassName}
               />
            );

         case 'office': {
            // Use Microsoft Office Online Viewer for office documents
            const officeViewerUrl = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(src)}`;

            return (
               <div className="relative h-full">
                  <iframe
                     src={officeViewerUrl}
                     width="100%"
                     height="100%"
                     allowFullScreen
                     title={`${documentInfo.extension.toUpperCase()} Document`}
                     className={baseClassName}
                     onError={() => {
                        // Fallback to Google Docs Viewer if Office Online fails
                        const googleViewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(src)}&embedded=true`;
                        const iframe = document.querySelector(
                           'iframe[src*="officeapps.live.com"]',
                        ) as HTMLIFrameElement;

                        if (iframe) {
                           iframe.src = googleViewerUrl;
                        }
                     }}
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                     <a
                        href={src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md bg-white/90 p-2 shadow-sm transition-colors hover:bg-white"
                        title={frontend.open_in_new_tab}
                     >
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                     </a>
                     <a
                        href={src}
                        download={fileName}
                        className="rounded-md bg-white/90 p-2 shadow-sm transition-colors hover:bg-white"
                        title={frontend.download_document}
                     >
                        <Download className="h-4 w-4 text-muted-foreground" />
                     </a>
                  </div>
               </div>
            );
         }

         case 'image':
            return (
               <div className="flex h-full items-center justify-center bg-gray-50">
                  <img
                     src={src}
                     alt={fileName || frontend.document}
                     className="max-h-full max-w-full object-contain"
                  />
               </div>
            );

         case 'text':
            return (
               <iframe
                  src={src}
                  width="100%"
                  height="100%"
                  title={frontend.text_document}
                  className={baseClassName}
               />
            );

         default:
            return (
               <div className="flex h-full flex-col items-center justify-center bg-gray-50 text-muted-foreground">
                  <AlertCircle className="mb-4 h-16 w-16 text-gray-400" />
                  <h3 className="mb-2 text-lg font-medium">
                     {frontend.unsupported_document_format}
                  </h3>
                  <p className="mb-6 max-w-md text-center text-sm">
                     {frontend.document_format_cannot_be_previewed.replace(
                        '{extension}',
                        documentInfo.extension,
                     )}
                  </p>
                  <div className="flex gap-3">
                     <a
                        href={src}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                     >
                        <ExternalLink className="h-4 w-4" />
                        {frontend.open_in_new_tab_button}
                     </a>
                     <a
                        href={src}
                        download={fileName}
                        className="inline-flex items-center gap-2 rounded-md bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700"
                     >
                        <Download className="h-4 w-4" />
                        {frontend.download}
                     </a>
                  </div>
               </div>
            );
      }
   };

   return (
      <div className={`h-full ${className || ''}`} {...props}>
         {renderDocument()}
      </div>
   );
};

export default DocumentViewer;
