import { Eye, EyeOff } from 'lucide-react';
import React, { forwardRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const PasswordInput = forwardRef<
   HTMLInputElement,
   Omit<React.ComponentProps<'input'>, 'type'>
>(({ className, ...props }, ref) => {
   const [show, setShow] = useState(false);

   return (
      <div className="relative">
         <Input
            ref={ref}
            type={show ? 'text' : 'password'}
            className={cn('pr-10', className)}
            {...props}
         />
         <button
            type="button"
            tabIndex={-1}
            aria-label={show ? 'Hide password' : 'Show password'}
            onClick={() => setShow((prev) => !prev)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground transition-colors hover:text-foreground focus:outline-none"
         >
            {show ? (
               <EyeOff className="h-4 w-4" />
            ) : (
               <Eye className="h-4 w-4" />
            )}
         </button>
      </div>
   );
});

PasswordInput.displayName = 'PasswordInput';

export default PasswordInput;
