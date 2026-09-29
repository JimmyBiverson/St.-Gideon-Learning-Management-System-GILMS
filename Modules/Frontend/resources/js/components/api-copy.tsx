import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
   Tooltip,
   TooltipContent,
   TooltipTrigger,
} from '@/components/ui/tooltip';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

interface ApiCopyProps {
   value: string;
}

const ApiCopy = ({ value }: ApiCopyProps) => {
   const handleCopy = () => {
      navigator.clipboard.writeText(value);
      toast.success('API copied to clipboard');
   };

   return (
      <Badge variant="outline" className="p-0 pl-2 text-muted-foreground">
         {value}

         <Tooltip>
            <TooltipTrigger asChild>
               <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 bg-muted text-foreground"
                  onClick={handleCopy}
               >
                  <Copy />
               </Button>
            </TooltipTrigger>
            <TooltipContent>
               <p>Copy to paste in the dynamic wrapper</p>
            </TooltipContent>
         </Tooltip>
      </Badge>
   );
};

export default ApiCopy;
