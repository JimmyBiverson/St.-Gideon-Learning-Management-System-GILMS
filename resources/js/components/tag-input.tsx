import Tagify from '@yaireo/tagify';
import '@yaireo/tagify/dist/tagify.css';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import InputError from '@/components/input-error';
import { cn } from '@/lib/utils';

interface Props {
   value?: string;
   maxTags?: number;
   whitelist?: string[];
   placeholder?: string;
   onChange?: (values: string[]) => void;
   enforceWhitelist?: boolean;
   defaultTags?: string[];
   className?: string;
   change?: boolean;
}

const TagInput = (props: Props) => {
   const {
      value,
      onChange,
      placeholder,
      whitelist,
      maxTags,
      enforceWhitelist,
      defaultTags,
      className,
      change = false,
   } = props;

   const tagRef = useRef<any>(null);
   const inputRef = useRef<HTMLInputElement>(null);
   const [errorMessage, setErrorMessage] = useState<string>('');

   // Use a stable ref for the onChange callback so it never triggers re-initialization.
   // Updated via useLayoutEffect (not during render) to satisfy React's ref rules.
   const onChangeRef = useRef(onChange);
   useLayoutEffect(() => {
      onChangeRef.current = onChange;
   });

   // Initialize Tagify once — only re-run for truly structural changes (enforceWhitelist, maxTags).
   // Whitelist is intentionally excluded here and updated dynamically in its own effect below.
   useEffect(() => {
      if (!inputRef.current) {
         return;
      }

      if (tagRef.current) {
         tagRef.current.destroy();
      }

      tagRef.current = new Tagify(inputRef.current, {
         maxTags: maxTags || 10,
         whitelist: whitelist || [],
         enforceWhitelist: enforceWhitelist || false,
         // Prevent blur from adding the partial typed text as a tag.
         // Without this, clicking a dropdown suggestion fires blur first,
         // causing the partial input (e.g. "dd") to be submitted instead of
         // the clicked suggestion (e.g. "dddd").
         addTagOnBlur: false,
         dropdown: {
            enabled: 1,
            closeOnSelect: true,
            highlightFirst: true,
         },
         callbacks: {
            change: (e: any) => {
               const tags = e.detail.tagify.value.map((tag: any) => tag.value);
               onChangeRef.current?.(tags);
               setErrorMessage('');
            },
            add: () => {
               // Restore focus after a tag is added so the user can keep typing
               setTimeout(() => {
                  tagRef.current?.DOM?.input?.focus();
               }, 0);
            },
            remove: () => {
               // Restore focus after a tag is removed so the user can keep typing
               setTimeout(() => {
                  tagRef.current?.DOM?.input?.focus();
               }, 0);
            },
            invalid: (e: any) => {
               setErrorMessage(e.detail.message);
            },
         },
         texts: {
            empty: 'Tag field is required',
            exceed: 'Maximum number of tags exceeded',
            pattern: 'The tag is invalid',
            duplicate: 'Tag is already exists',
         },
         pattern: /^.{1,}$/,
      });

      return () => {
         if (tagRef.current) {
            tagRef.current.destroy();
            tagRef.current = null;
         }
      };
      // Intentionally exclude whitelist and onChange:
      // - onChange is handled via stable onChangeRef
      // - whitelist is updated dynamically in the effect below, avoiding Tagify re-creation
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [enforceWhitelist, maxTags]);

   // Update the whitelist dynamically without destroying and re-creating Tagify.
   // This is critical for enforceWhitelist mode — if Tagify is destroyed mid-click on a
   // dropdown suggestion, the click lands on nothing and triggers an "invalid" error.
   useEffect(() => {
      if (tagRef.current) {
         tagRef.current.settings.whitelist = whitelist || [];
      }
   }, [whitelist]);

   // Sync defaultTags into Tagify when the prop changes, without full re-initialization
   useEffect(() => {
      if (tagRef.current && defaultTags) {
         const currentTags = tagRef.current.value.map((tag: any) => tag.value);
         const newTags = defaultTags.filter(
            (tag: string) => tag && tag.trim() !== '',
         );

         // Only update if tags are actually different to avoid unnecessary DOM churn
         if (JSON.stringify(currentTags) !== JSON.stringify(newTags)) {
            tagRef.current.removeAllTags();

            if (newTags.length > 0) {
               tagRef.current.addTags(newTags);
            }
         }
      }
   }, [defaultTags]);

   return (
      <div className="w-full [&>tags]:!h-auto">
         <input
            ref={inputRef}
            defaultValue={value || ''}
            placeholder={placeholder || 'Enter tags...'}
            className={cn(
               'flex min-h-10 w-full min-w-0 rounded-lg !border !border-input bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
               change
                  ? 'selection:bg-primary selection:text-primary-foreground focus-within:!border-ring focus-within:!ring-1 focus-within:!ring-ring hover:!border-ring'
                  : 'selection:bg-zinc-900 selection:text-zinc-50 focus-within:!border-zinc-900 focus-within:!ring-1 focus-within:!ring-zinc-900 hover:!border-zinc-900 dark:selection:bg-zinc-50 dark:selection:text-zinc-900 dark:focus-within:!border-zinc-50 dark:focus-within:!ring-zinc-50 dark:hover:!border-zinc-50',
               'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
               className,
            )}
         />

         {errorMessage && <InputError message={errorMessage} />}
      </div>
   );
};

export default TagInput;
