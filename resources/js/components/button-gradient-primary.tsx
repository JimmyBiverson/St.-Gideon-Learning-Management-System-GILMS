import type { ComponentProps } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props extends ComponentProps<typeof Button> {
   containerClass?: string;
   shadow?: boolean;
   shadowClass?: string;
}

const ButtonGradientPrimary = ({
   children,
   className,
   shadow = true,
   shadowClass,
   containerClass,
   ...props
}: Props) => {
   return (
      <div className={cn('relative', containerClass)}>
         {shadow && (
            <div
               className={cn(
                  "after:pointer-events-none after:absolute after:top-1/2 after:-left-7 after:h-[84px] after:w-[84px] after:-translate-y-1/2 after:rounded-full after:bg-[#E4CBA8A6] after:blur-[30px] after:content-[''] dark:after:bg-[#e4cba857]",
                  shadowClass,
               )}
            ></div>
         )}

         <Button
            className={cn(
               'to-secondary-dark hover:from-secondary-dark hover:to-secondary-dark dark:from-secondary-dark dark:hover:from-secondary-dark dark:hover:to-secondary-dark relative z-10 h-auto bg-gradient-to-r from-primary px-5 py-2.5 text-white shadow-none dark:to-secondary-foreground',
               className,
            )}
            {...props}
         >
            {children}
         </Button>
      </div>
   );
};

export default ButtonGradientPrimary;
