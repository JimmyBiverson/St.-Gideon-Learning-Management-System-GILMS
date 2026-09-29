import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import setGlobalColorTheme from '@/lib/theme-colors';

const Main = ({ children }: PropsWithChildren) => {
   const { props, url, component } = usePage<SharedData>();
   const { frontend, direction } = props;

   useEffect(() => {
      if (props.flash.error) {
         toast.error(props.flash.error);
      }

      if (props.flash.success || props.flash.warning) {
         toast.success(props.flash.success || props.flash.warning);
      }
   }, [props.flash]);

   useEffect(() => {
      // Update direction on <html> tag dynamically
      document.documentElement.setAttribute('dir', direction);
   }, [direction]);

   useEffect(() => {
      const fontFamily = props.system?.fields?.font_family ?? 'inter';
      const fontNameMap: Record<string, string> = {
         inter: 'Inter',
         roboto: 'Roboto',
         poppins: 'Poppins',
         nunito: 'Nunito',
         outfit: 'Outfit',
      };
      const fontName = fontNameMap[fontFamily] || 'Inter';

      // Set the CSS variable on document element
      document.documentElement.style.setProperty(
         '--font-sans',
         `'${fontName}', sans-serif`,
         'important',
      );

      // Load font stylesheet dynamically
      const fontMap: Record<string, string> = {
         inter: 'inter:400,500,600,700',
         roboto: 'roboto:400,500,700',
         poppins: 'poppins:400,500,600,700',
         nunito: 'nunito:400,600,700',
         outfit: 'outfit:400,500,600,700',
      };
      const fontQuery = fontMap[fontFamily] || 'inter:400,500,600,700';
      const fontUrl = `https://fonts.bunny.net/css?family=${fontQuery}`;

      let link = document.querySelector(
         `link[href*="fonts.bunny.net/css?family="]`,
      ) as HTMLLinkElement;

      if (link) {
         link.href = fontUrl;
      } else {
         link = document.createElement('link');
         link.rel = 'stylesheet';
         link.href = fontUrl;
         document.head.appendChild(link);
      }
   }, [props.system?.fields?.font_family]);

   useEffect(() => {
      if (frontend) {
         setGlobalColorTheme(props.appearance, frontend.theme_color);
      }
   }, [frontend, props.appearance]);

   return (
      <>
         <Toaster />

         <TooltipProvider>{children}</TooltipProvider>
      </>
   );
};

export default Main;
