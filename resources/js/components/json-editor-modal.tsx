// import {
//    AlertCircle,
//    AlertTriangle,
//    CheckCircle2,
//    Lightbulb,
// } from 'lucide-react';
// import { useEffect, useState } from 'react';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { Button } from '@/components/ui/button';
// import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
// import {
//    formatJson,
//    getDiff,
//    isValidJson,
//    validateTranslationJson,
// } from '@/lib/translation-validator';
// import JsonEditor from './json-editor';

// interface JsonEditorModalProps {
//    tab: string;
//    data: Record<string, any>;
//    setTab: (value: string) => void;
//    onChange: (data: Record<string, any>) => void;
//    onSave: () => void;
// }

// const JsonEditorModal = ({
//    tab,
//    setTab,
//    data,
//    onChange,
//    onSave,
// }: JsonEditorModalProps) => {
//    const [jsonValue, setJsonValue] = useState('');
//    const [originalData, setOriginalData] = useState<Record<string, any>>({});
//    const [errors, setErrors] = useState<string[]>([]);
//    const [warnings, setWarnings] = useState<string[]>([]);
//    const [isValid, setIsValid] = useState(true);
//    const [changedCount, setChangedCount] = useState(0);

//    // Initialize editor when tab opens
//    useEffect(() => {
//       if (tab === 'json') {
//          const formatted = JSON.stringify(data, null, 2);
//          const dataSnapshot = data;

//          queueMicrotask(() => {
//             setJsonValue(formatted);
//             setOriginalData(dataSnapshot);
//             setErrors([]);
//             setWarnings([]);
//             setIsValid(true);
//             setChangedCount(0);
//          });
//       }
//    }, [data, tab]);

//    // Validate JSON changes
//    useEffect(() => {
//       if (!jsonValue || tab !== 'json') {
//          return;
//       }

//       queueMicrotask(() => {
//          if (!isValidJson(jsonValue)) {
//             setErrors(['Invalid JSON syntax. Please check your formatting.']);
//             setIsValid(false);
//             setWarnings([]);
//             setChangedCount(0);

//             return;
//          }

//          try {
//             const parsed = JSON.parse(jsonValue);
//             const validation = validateTranslationJson(originalData, parsed);
//             const diff = getDiff(originalData, parsed);

//             onChange(parsed);
//             setErrors(validation.errors);
//             setWarnings(validation.warnings);
//             setIsValid(validation.valid);
//             setChangedCount(diff.changed.length);
//          } catch {
//             setErrors(['Failed to parse JSON. Please check your syntax.']);
//             setIsValid(false);
//             setWarnings([]);
//             setChangedCount(0);
//          }
//       });
//    }, [jsonValue, onChange, originalData, tab]);

//    const handleReset = () => {
//       const formatted = JSON.stringify(originalData, null, 2);
//       setJsonValue(formatted);
//    };

//    const handleFormat = () => {
//       const formatted = formatJson(jsonValue);
//       setJsonValue(formatted);
//    };

//    return (
//       <>
//          <div className="flex flex-1 flex-col gap-4 overflow-hidden">
//             <div className="relative flex-1 overflow-hidden">
//                <JsonEditor
//                   value={jsonValue}
//                   setValue={setJsonValue}
//                   height="400px"
//                />

//                <Dialog>
//                   <DialogTrigger asChild>
//                      <Button
//                         size="sm"
//                         type="button"
//                         onClick={handleFormat}
//                         variant="secondary"
//                         className="absolute top-1 right-1 border border-green-300 pl-2"
//                      >
//                         <Lightbulb />
//                         Help
//                      </Button>
//                   </DialogTrigger>
//                   <DialogContent>
//                      <Alert
//                         variant="default"
//                         className="border-blue-500 bg-blue-50 dark:bg-blue-950"
//                      >
//                         <AlertDescription className="text-sm text-blue-800 dark:text-blue-200">
//                            <div className="mb-2 font-semibold">
//                               💡 Quick Translation Guide:
//                            </div>
//                            <ol className="list-inside list-decimal space-y-1 text-xs">
//                               <li>
//                                  Copy the entire JSON below (Ctrl+A, Ctrl+C)
//                               </li>
//                               <li>
//                                  Paste it into ChatGPT, DeepL, or any AI
//                                  translation tool
//                               </li>
//                               <li>
//                                  Ask: "Translate all the values in this JSON to
//                                  [your language], keep the keys unchanged"
//                               </li>
//                               <li>
//                                  Copy the translated JSON and paste it back here
//                               </li>
//                               <li>
//                                  Click "Save Changes" to apply the translations
//                               </li>
//                            </ol>
//                         </AlertDescription>
//                      </Alert>
//                   </DialogContent>
//                </Dialog>
//             </div>

//             {/* Validation Status */}
//             <div className="space-y-2">
//                {errors.length > 0 && (
//                   <Alert variant="destructive">
//                      <AlertCircle className="h-4 w-4" />
//                      <AlertDescription>
//                         <div className="mb-1 font-semibold">Errors:</div>
//                         <ul className="list-inside list-disc space-y-1">
//                            {errors.map((error, index) => (
//                               <li key={index} className="text-sm">
//                                  {error}
//                               </li>
//                            ))}
//                         </ul>
//                      </AlertDescription>
//                   </Alert>
//                )}

//                {warnings.length > 0 && errors.length === 0 && (
//                   <Alert
//                      variant="default"
//                      className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950"
//                   >
//                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
//                      <AlertDescription>
//                         <div className="mb-1 font-semibold text-yellow-800 dark:text-yellow-200">
//                            Warnings:
//                         </div>
//                         <ul className="list-inside list-disc space-y-1">
//                            {warnings.map((warning, index) => (
//                               <li
//                                  key={index}
//                                  className="text-sm text-yellow-700 dark:text-yellow-300"
//                               >
//                                  {warning}
//                               </li>
//                            ))}
//                         </ul>
//                      </AlertDescription>
//                   </Alert>
//                )}

//                {isValid && errors.length === 0 && (
//                   <Alert
//                      variant="default"
//                      className="border-green-500 bg-green-50 dark:bg-green-950"
//                   >
//                      <CheckCircle2 className="h-4 w-4 text-green-600" />
//                      <AlertDescription className="text-green-800 dark:text-green-200">
//                         {changedCount > 0
//                            ? `✓ Valid JSON. ${changedCount} ${changedCount === 1 ? 'property' : 'properties'} modified.`
//                            : '✓ Valid JSON. No changes detected.'}
//                      </AlertDescription>
//                   </Alert>
//                )}
//             </div>
//          </div>

//          <div className="mt-6 flex items-center justify-between sm:justify-between">
//             <div className="flex gap-2">
//                <Button type="button" variant="outline" onClick={handleFormat}>
//                   Format JSON
//                </Button>
//                <Button type="button" variant="outline" onClick={handleReset}>
//                   Reset to Original
//                </Button>
//             </div>
//             <div className="flex gap-2">
//                <Button
//                   type="button"
//                   variant="outline"
//                   onClick={() => setTab('form')}
//                >
//                   Cancel
//                </Button>
//                <Button
//                   type="button"
//                   onClick={onSave}
//                   disabled={!isValid || changedCount === 0}
//                >
//                   Save Changes
//                </Button>
//             </div>
//          </div>
//       </>
//    );
// };

// export default JsonEditorModal;
import {
   AlertCircle,
   AlertTriangle,
   CheckCircle2,
   Lightbulb,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
   formatJson,
   getDiff,
   isValidJson,
   validateTranslationJson,
} from '@/lib/translation-validator';
import JsonEditor from './json-editor';

interface JsonEditorModalProps {
   tab: string;
   data: Record<string, any>;
   setTab: (value: string) => void;
   onChange: (data: Record<string, any>) => void;
   onSave: () => void;
}

const JsonEditorModal = ({
   tab,
   setTab,
   data,
   onChange,
   onSave,
}: JsonEditorModalProps) => {
   const [jsonValue, setJsonValue] = useState('');
   const [originalData, setOriginalData] = useState<Record<string, any>>({});
   const [errors, setErrors] = useState<string[]>([]);
   const [warnings, setWarnings] = useState<string[]>([]);
   const [isValid, setIsValid] = useState(true);
   const [changedCount, setChangedCount] = useState(0);

   // Initialize editor when tab opens
   useEffect(() => {
      if (tab === 'json') {
         const formatted = JSON.stringify(data, null, 2);

         const timer = setTimeout(() => {
            setJsonValue(formatted);
            setOriginalData(data);
            setErrors([]);
            setWarnings([]);
            setIsValid(true);
            setChangedCount(0);
         }, 0);

         return () => clearTimeout(timer);
      }
   }, [tab]);

   // Validate JSON changes
   useEffect(() => {
      if (!jsonValue || tab !== 'json') {
         return;
      }

      if (!isValidJson(jsonValue)) {
         const timer = setTimeout(() => {
            setErrors(['Invalid JSON syntax. Please check your formatting.']);
            setIsValid(false);
            setWarnings([]);
            setChangedCount(0);
         }, 0);

         return () => clearTimeout(timer);
      }

      try {
         const parsed = JSON.parse(jsonValue);
         const validation = validateTranslationJson(originalData, parsed);
         const diff = getDiff(originalData, parsed);

         onChange(parsed);
         const timer = setTimeout(() => {
            setErrors(validation.errors);
            setWarnings(validation.warnings);
            setIsValid(validation.valid);
            setChangedCount(diff.changed.length);
         }, 0);

         return () => clearTimeout(timer);
      } catch (error) {
         const timer = setTimeout(() => {
            setErrors(['Failed to parse JSON. Please check your syntax.']);
            setIsValid(false);
            setWarnings([]);
            setChangedCount(0);
         }, 0);

         return () => clearTimeout(timer);
      }
   }, [jsonValue, tab]);

   const handleReset = () => {
      const formatted = JSON.stringify(originalData, null, 2);
      setJsonValue(formatted);
   };

   const handleFormat = () => {
      const formatted = formatJson(jsonValue);
      setJsonValue(formatted);
   };

   return (
      <>
         <div className="flex flex-1 flex-col gap-4 overflow-hidden">
            <div className="relative flex-1 overflow-hidden">
               <JsonEditor
                  value={jsonValue}
                  setValue={setJsonValue}
                  height="400px"
               />

               <Dialog>
                  <DialogTrigger asChild>
                     <Button
                        size="sm"
                        type="button"
                        onClick={handleFormat}
                        variant="secondary"
                        className="absolute top-1 right-1 border border-green-300 pl-2"
                     >
                        <Lightbulb />
                        Help
                     </Button>
                  </DialogTrigger>
                  <DialogContent>
                     <Alert
                        variant="default"
                        className="border-blue-500 bg-blue-50 dark:bg-blue-950"
                     >
                        <AlertDescription className="text-sm text-blue-800 dark:text-blue-200">
                           <div className="mb-2 font-semibold">
                              💡 Quick Translation Guide:
                           </div>
                           <ol className="list-inside list-decimal space-y-1 text-xs">
                              <li>
                                 Copy the entire JSON below (Ctrl+A, Ctrl+C)
                              </li>
                              <li>
                                 Paste it into ChatGPT, DeepL, or any AI
                                 translation tool
                              </li>
                              <li>
                                 Ask: "Translate all the values in this JSON to
                                 [your language], keep the keys unchanged"
                              </li>
                              <li>
                                 Copy the translated JSON and paste it back here
                              </li>
                              <li>
                                 Click "Save Changes" to apply the translations
                              </li>
                           </ol>
                        </AlertDescription>
                     </Alert>
                  </DialogContent>
               </Dialog>
            </div>

            {/* Validation Status */}
            <div className="space-y-2">
               {errors.length > 0 && (
                  <Alert variant="destructive">
                     <AlertCircle className="h-4 w-4" />
                     <AlertDescription className="!text-destructive">
                        <div className="mb-1 font-semibold">Errors:</div>
                        <ul className="list-inside list-disc space-y-1">
                           {errors.map((error, index) => (
                              <li key={index} className="text-sm">
                                 {error}
                              </li>
                           ))}
                        </ul>
                     </AlertDescription>
                  </Alert>
               )}

               {warnings.length > 0 && errors.length === 0 && (
                  <Alert
                     variant="default"
                     className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950"
                  >
                     <AlertTriangle className="h-4 w-4 text-yellow-600" />
                     <AlertDescription>
                        <div className="mb-1 font-semibold text-yellow-800 dark:text-yellow-200">
                           Warnings:
                        </div>
                        <ul className="list-inside list-disc space-y-1">
                           {warnings.map((warning, index) => (
                              <li
                                 key={index}
                                 className="text-sm text-yellow-700 dark:text-yellow-300"
                              >
                                 {warning}
                              </li>
                           ))}
                        </ul>
                     </AlertDescription>
                  </Alert>
               )}

               {isValid && errors.length === 0 && (
                  <Alert
                     variant="default"
                     className="border-green-500 bg-green-50 dark:bg-green-950"
                  >
                     <CheckCircle2 className="h-4 w-4 text-green-600" />
                     <AlertDescription className="text-green-800 dark:text-green-200">
                        {changedCount > 0
                           ? `✓ Valid JSON. ${changedCount} ${changedCount === 1 ? 'property' : 'properties'} modified.`
                           : '✓ Valid JSON. No changes detected.'}
                     </AlertDescription>
                  </Alert>
               )}
            </div>
         </div>

         <div className="mt-6 flex items-center justify-between sm:justify-between">
            <div className="flex gap-2">
               <Button type="button" variant="outline" onClick={handleFormat}>
                  Format JSON
               </Button>
               <Button type="button" variant="outline" onClick={handleReset}>
                  Reset to Original
               </Button>
            </div>
            <div className="flex gap-2">
               <Button
                  type="button"
                  variant="outline"
                  onClick={() => setTab('form')}
               >
                  Cancel
               </Button>
               <Button
                  type="button"
                  onClick={onSave}
                  disabled={!isValid || changedCount === 0}
               >
                  Save Changes
               </Button>
            </div>
         </div>
      </>
   );
};

export default JsonEditorModal;
