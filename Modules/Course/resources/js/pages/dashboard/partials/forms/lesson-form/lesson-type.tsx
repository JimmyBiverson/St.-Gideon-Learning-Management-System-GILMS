import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { usePlugin } from '@/hooks/use-plugin';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';

interface Props {
   value: string;
   onChange: (value: string) => void;
}

const LessonType = ({ value, onChange }: Props) => {
   const { props } = usePage<SharedData>();
   const { translate } = props;
   const { input, dashboard } = translate;
   const {
      video_file,
      video_url,
      document_file,
      image_file,
      text_content,
      embed_source,
      text_content_with_ai,
   } = dashboard;
   const aiAssistantEnabled = usePlugin('AIAssistant');

   const lessonTypes = [
      // { value: 'vimeo', label: 'Vimeo Video', flag: true },
      // { value: 'drive', label: 'Google drive video', flag: true },
      { value: 'video', label: video_file, flag: false },
      { value: 'video_url', label: video_url, flag: false },
      {
         value: 'document',
         label: document_file,
         flag: false,
      },
      { value: 'image', label: image_file, flag: false },
      { value: 'text', label: text_content, flag: false },
      { value: 'embed', label: embed_source, flag: false },
      ...(aiAssistantEnabled
         ? [
              {
                 value: 'text_ai',
                 label: text_content_with_ai ?? 'Text Content With AI',
                 flag: false,
              },
           ]
         : []),
   ];

   return (
      <div className="space-y-1">
         <Label className="font-semibold">{input.lesson_type}</Label>
         <RadioGroup
            value={value}
            onValueChange={(lesson) => onChange(lesson)}
            className="grid grid-cols-2 gap-3"
         >
            {lessonTypes.map((type) => (
               <Label
                  key={type.value}
                  className={cn(
                     'flex items-center space-x-2 rounded-lg border p-2',
                     type.flag ? 'cursor-not-allowed' : 'cursor-pointer',
                     type.value === 'text_ai' &&
                        'text-violet-700 dark:text-violet-400',
                     type.value === 'text_ai' &&
                        value === 'text_ai' &&
                        'border-violet-500 bg-violet-50/50 dark:bg-violet-950/20',
                  )}
               >
                  <RadioGroupItem
                     className="mb-0 cursor-pointer"
                     value={type.value}
                     disabled={type.flag}
                  />
                  <span>{type.label}</span>
               </Label>
            ))}
         </RadioGroup>
      </div>
   );
};

export default LessonType;
