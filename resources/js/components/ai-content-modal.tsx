import axios from 'axios';
import { Bot } from 'lucide-react';
import { useEffect, useState } from 'react';
import LoadingButton from '@/components/loading-button';
import { Button } from '@/components/ui/button';
import {
   Dialog,
   DialogClose,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';

const DEFAULT_ACTION_URL = '/dashboard/ai-assistant/generate-content';

function configureAxiosCsrf(): void {
   axios.defaults.withCredentials = true;

   const xsrf = document.cookie
      .split('; ')
      .find((row) => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1];

   if (xsrf) {
      axios.defaults.headers.common['X-XSRF-TOKEN'] = decodeURIComponent(xsrf);
   }

   const metaToken = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute('content');

   if (metaToken) {
      axios.defaults.headers.common['X-CSRF-TOKEN'] = metaToken;
   }
}

function formatContentForDisplay(
   format: AiGlobalContentFormat,
   content: AiGlobalContent,
): string {
   if (format === 'json') {
      return JSON.stringify(content, null, 2);
   }

   return typeof content === 'string' ? content : String(content);
}

export interface AiContentModalProps {
   /** Output shape returned by the AI: rich HTML, JSON, or plain text. */
   format: AiGlobalContentFormat;
   title?: string;
   description?: string;
   /** Optional hint passed to the agent (e.g. field name, page context). */
   context?: string;
   actionUrl?: string;
   handler: React.ReactNode;
   onGenerated?: (payload: AiGlobalContentResponse) => void;
}

/**
 * Reusable modal that generates content via the AI Assistant without persisting it.
 *
 * @example
 * <AiContentModal
 *    format="html"
 *    title="Generate description"
 *    handler={<Button>Write with AI</Button>}
 *    onGenerated={({ content }) => setDescription(content as string)}
 * />
 */
const AiContentModal = ({
   format,
   title = 'Generate content with AI',
   description = 'Describe what you want. The result is returned to this page only — nothing is saved until you apply it.',
   context,
   actionUrl = DEFAULT_ACTION_URL,
   handler,
   onGenerated,
}: AiContentModalProps) => {
   const [open, setOpen] = useState(false);
   const [prompt, setPrompt] = useState('');
   const [processing, setProcessing] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [result, setResult] = useState<AiGlobalContentResponse | null>(null);

   useEffect(() => {
      configureAxiosCsrf();
   }, []);

   const resetState = () => {
      setPrompt('');
      setError(null);
      setResult(null);
      setProcessing(false);
   };

   const handleOpenChange = (nextOpen: boolean) => {
      setOpen(nextOpen);

      if (!nextOpen) {
         resetState();
      }
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (prompt.trim().length < 5) {
         setError('Please enter at least 5 characters.');

         return;
      }

      setProcessing(true);
      setError(null);
      setResult(null);

      try {
         const { data } = await axios.post<AiGlobalContentResponse>(
            actionUrl,
            {
               prompt: prompt.trim(),
               format,
               context: context?.trim() || undefined,
            },
            {
               headers: {
                  Accept: 'application/json',
                  'X-Requested-With': 'XMLHttpRequest',
               },
            },
         );

         setResult(data);
         onGenerated?.(data);
      } catch (err) {
         if (axios.isAxiosError(err)) {
            const message =
               (err.response?.data as { message?: string } | undefined)
                  ?.message ??
               err.message ??
               'Something went wrong. Please try again.';

            setError(message);
            console.error('[AiContentModal] error:', message, err);
         } else {
            setError('Something went wrong. Please try again.');
            console.error('[AiContentModal] error:', err);
         }
      } finally {
         setProcessing(false);
      }
   };

   return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
         <DialogTrigger asChild>{handler}</DialogTrigger>

         <DialogContent className="max-w-lg p-0">
            <ScrollArea className="max-h-[85vh] p-6">
               <DialogHeader className="mb-4">
                  <DialogTitle className="flex items-center gap-2">
                     <Bot className="h-5 w-5 text-violet-600" />
                     {title}
                  </DialogTitle>
                  {description && (
                     <p className="text-sm text-muted-foreground">
                        {description}
                     </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                     Output format:{' '}
                     <span className="font-medium uppercase">{format}</span>
                  </p>
               </DialogHeader>

               <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                     <Label htmlFor="global-ai-prompt">Your prompt *</Label>
                     <Textarea
                        id="global-ai-prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe the content you want the AI to write…"
                        rows={5}
                        disabled={processing}
                     />
                     {error && (
                        <p className="mt-2 text-sm text-destructive">{error}</p>
                     )}
                  </div>

                  {result && (
                     <div className="space-y-2">
                        <Label>Generated content</Label>
                        <pre className="max-h-48 overflow-auto rounded-md border bg-muted/40 p-3 text-xs whitespace-pre-wrap">
                           {formatContentForDisplay(
                              result.format,
                              result.content,
                           )}
                        </pre>
                        <p className="text-xs text-muted-foreground">
                           Also logged to the browser console.
                        </p>
                     </div>
                  )}

                  <DialogFooter className="gap-2 sm:justify-between">
                     <DialogClose asChild>
                        <Button
                           type="button"
                           variant="outline"
                           disabled={processing}
                        >
                           Close
                        </Button>
                     </DialogClose>

                     <LoadingButton
                        type="submit"
                        loading={processing}
                        disabled={processing || prompt.trim().length < 5}
                     >
                        Generate
                     </LoadingButton>
                  </DialogFooter>
               </form>
            </ScrollArea>
         </DialogContent>
      </Dialog>
   );
};

export default AiContentModal;
