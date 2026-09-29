import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import frontend from '@/routes/frontend';
import { Link } from '@inertiajs/react';
import { Eye } from 'lucide-react';
import { useEditor } from '@/frontend/hooks/use-editor';
import { DYNAMIC_COMPONENTS } from '@/frontend/lib/dynamic-component-registry';

const DynamicWrapperSettings = ({
   changeCustomValues,
}: {
   changeCustomValues: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
   const { editor, dispatch } = useEditor();

   // Get available component keys from registry
   const componentKeys = Object.keys(DYNAMIC_COMPONENTS);

   const handleComponentRefChange = (value: string) => {
      dispatch({
         type: 'UPDATE_ELEMENT',
         payload: {
            elementDetails: {
               ...editor.editor.selectedElement,
               content: {
                  ...editor.editor.selectedElement.content,
                  componentRef: value,
               },
            },
         },
      });
   };

   const currentContent =
      typeof editor.editor.selectedElement.content === 'object' &&
      !Array.isArray(editor.editor.selectedElement.content)
         ? editor.editor.selectedElement.content
         : {};

   const api = currentContent.api as string;

   return (
      editor.editor.selectedElement.type === 'dynamicWrapper' &&
      api?.length > 0 && (
         <div className="flex flex-col gap-4">
            {/* Component Reference Selector */}
            {/* <div className="flex flex-col gap-2">
                    <Label>Component</Label>
                    <Select
                        value={
                            'componentRef' in currentContent
                                ? (currentContent.componentRef as string)
                                : ''
                        }
                        onValueChange={handleComponentRefChange}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a component" />
                        </SelectTrigger>
                        <SelectContent>
                            {componentKeys.map((key) => (
                                <SelectItem key={key} value={key}>
                                    {key}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                        Choose which component to render
                    </p>
                </div> */}

            {/* API Endpoint Input */}
            <div className="flex flex-col gap-2">
               <div className="flex items-center justify-between">
                  <Label>API Endpoint</Label>
                  <Link href={frontend.api()}>
                     <Button
                        className="h-6 w-6 hover:text-blue-500"
                        size="icon"
                        variant="outline"
                     >
                        <Eye />
                     </Button>
                  </Link>
               </div>
               {/* <Input
                        id="api"
                        placeholder="https://api.example.com/data"
                        onChange={changeCustomValues}
                        value={
                            'api' in currentContent
                                ? (currentContent.api as string)
                                : ''
                        }
                    />
                    <p className="text-xs text-muted-foreground">
                        Leave empty for static component, or provide API URL to
                        fetch data
                    </p> */}

               <Badge>{api}</Badge>
            </div>
         </div>
      )
   );
};

export default DynamicWrapperSettings;
