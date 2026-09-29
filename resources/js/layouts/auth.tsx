import { Link, usePage } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';
import GoogleAnalytics from '@/components/google-analytics';
import MetaPixel from '@/components/meta-pixel';
import Main from './main';

interface Props {
   title: string;
   description: string;
   headline?: string;
   subtitle?: string;
   children: React.ReactNode;
}

const AuthLayout = ({
   children,
   title,
   description,
   headline,
   subtitle,
}: Props) => {
   const { props } = usePage<SharedData>();

   return (
      <Main>
         <MetaPixel />
         <GoogleAnalytics />

         <div className="mx-auto flex min-h-svh max-w-[1480px]">
            {/* Middle: Headline + Subtitle */}
            <div className="hidden flex-1 flex-col items-center justify-center space-y-10 border-r border-border p-10 md:flex md:max-w-xl">
               <div className="space-y-3">
                  {headline && (
                     <h2 className="text-3xl leading-tight font-bold tracking-tight text-foreground">
                        {headline}
                     </h2>
                  )}
                  {subtitle && (
                     <p className="text-base leading-relaxed text-muted-foreground">
                        {subtitle}
                     </p>
                  )}
               </div>

               {/* Illustration */}
               <div className="flex items-center justify-center">
                  <img
                     src={
                        props.system.fields?.auth_banner ??
                        '/assets/auth/lms-illustration.png'
                     }
                     alt="LMS Learning"
                     className="mx-auto w-full max-w-[460px]"
                     draggable={false}
                  />
               </div>
            </div>

            {/* ── Right panel (always visible) ─────────────────────────── */}
            <div className="flex flex-1 flex-col items-center justify-center bg-background px-6 py-10 md:px-10">
               {/* Mobile-only logo */}

               <div className="w-full max-w-[420px] space-y-12">
                  <div className="flex w-full items-center justify-center md:justify-start">
                     <Link href="/">
                        <AppLogo className="h-8 w-auto" />
                     </Link>
                  </div>

                  <div className="flex flex-col gap-7">
                     {/* Page title block */}
                     <div className="space-y-1.5">
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                           {title}
                        </h1>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                           {description}
                        </p>
                     </div>

                     {/* Form content */}
                     {children}
                  </div>
               </div>
            </div>
         </div>
      </Main>
   );
};

export default AuthLayout;
