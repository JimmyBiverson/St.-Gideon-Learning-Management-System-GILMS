import { usePage } from '@inertiajs/react';
import { cn } from '@/lib/utils';

const AppLogo = ({
   className,
   theme,
}: {
   theme?: 'light' | 'dark';
   className?: string;
}) => {
   const { system } = usePage<SharedData>().props;
   const logoDark = system?.fields?.logo_dark || '';
   const logoLight = system?.fields?.logo_light || '';
   const siteName = system?.fields?.name;

   if (theme && theme === 'dark') {
      return (
         <img
            src={logoDark}
            alt={siteName}
            className={cn('block h-6 w-auto', className)}
         />
      );
   }

   if (theme && theme === 'light') {
      return (
         <img
            src={logoLight}
            alt={siteName}
            className={cn('block h-6 w-auto', className)}
         />
      );
   }

   return (
      <>
         <img
            id="app-logo"
            src={logoDark}
            alt={siteName}
            className={cn('block h-6 w-auto dark:hidden', className)}
         />
         <img
            id="app-logo"
            src={logoLight}
            alt={siteName}
            className={cn('hidden h-6 w-auto dark:block', className)}
         />
      </>
   );
};

export default AppLogo;
