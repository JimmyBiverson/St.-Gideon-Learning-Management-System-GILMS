import { Form } from '@inertiajs/react';
import { useLang } from '@/hooks/use-lang';
import { cn } from '@/lib/utils';
import { store as subscribesStore } from '@/routes/subscribes';
import InputError from './input-error';
import { Button } from './ui/button';

interface SubscribeInputProps {
   className?: string;
   buttonText?: string;
}

const SubscribeInput = ({ className, buttonText }: SubscribeInputProps) => {
   const { input } = useLang();

   return (
      <Form
         {...subscribesStore.form()}
         className={cn('relative z-10', className)}
      >
         {({ errors }) => (
            <>
               <div className="flex items-center justify-between rounded-lg border border-gray-400 bg-background">
                  <input
                     type="email"
                     name="email"
                     className="h-[50px] w-full px-4 text-foreground focus:outline-0"
                     placeholder={input.email_placeholder}
                  />
                  <Button type="submit" className="mr-[3px] h-11 rounded-lg">
                     {buttonText || 'Subscribe'}
                  </Button>
               </div>

               <InputError message={errors.email} />
            </>
         )}
      </Form>
   );
};

export default SubscribeInput;
