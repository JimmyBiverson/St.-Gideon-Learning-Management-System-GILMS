import axios from 'axios';
import { CheckCircle, Loader2 } from 'lucide-react';
import type { ChangeEvent, FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Upload as TusUpload } from 'tus-js-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { abort, complete, initiate } from '@/routes/bunny/upload';
import InputError from './input-error';

const BUNNY_TUS_ENDPOINT = 'https://video.bunnycdn.com/tusupload';

interface BunnyUploaderInputProps {
   isSubmit: boolean;
   delayUpload?: boolean;
   onError?: (message: string) => void;
   onCancelUpload?: () => void;
   onFileSelected?: (file: File) => void;
   onFileUploaded?: (fileData: ChunkUploadedFileData) => void;
   className?: string;
   inputClass?: string;
   buttonClass?: string;
}

/**
 * Uploads a lesson video straight from the browser to Bunny Stream via TUS
 * — no bytes pass through our server (see BunnyVideoUploadController, which
 * only mints/finalizes/cancels the upload record). Mirrors
 * ChunkedUploaderInput's external props so the lesson form can swap between
 * the two without changing its own wiring.
 */
const BunnyUploaderInput: FC<BunnyUploaderInputProps> = ({
   isSubmit,
   delayUpload = false,
   onError,
   onCancelUpload,
   onFileSelected,
   onFileUploaded,
   className,
   inputClass,
   buttonClass,
}) => {
   const [file, setFile] = useState<File | null>(null);
   const [uploadId, setUploadId] = useState<number | null>(null);
   const [errorMessage, setErrorMessage] = useState<string>('');
   const [uploadProgress, setUploadProgress] = useState<number>(0);
   const [uploadStatus, setUploadStatus] = useState<
      | 'idle'
      | 'initializing'
      | 'uploading'
      | 'completing'
      | 'completed'
      | 'error'
   >('idle');

   const fileInputRef = useRef<HTMLInputElement>(null);
   const tusUploadRef = useRef<TusUpload | null>(null);
   const uploadInFlightRef = useRef(false);
   const uploadedFileRef = useRef<File | null>(null);
   const maxFileSize = 1024 * 1024 * 1024;

   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
         const selectedFile = event.target.files[0];

         if (selectedFile.size > maxFileSize) {
            setErrorMessage(
               `File is too large. Maximum file size is ${maxFileSize / (1024 * 1024)} MB`,
            );

            return;
         }

         setFile(selectedFile);
         setErrorMessage('');
         setUploadStatus('idle');
         setUploadProgress(0);
         uploadedFileRef.current = null;
         onFileSelected?.(selectedFile);

         if (!delayUpload) {
            void startUpload(selectedFile);
         }
      }
   };

   const fail = (message: string) => {
      setUploadStatus('error');
      setErrorMessage(message);
      onError?.(message);
   };

   const startUpload = async (fileToUpload?: File | null) => {
      const target = fileToUpload ?? file;

      if (
         !target ||
         uploadInFlightRef.current ||
         uploadedFileRef.current === target
      ) {
         return;
      }

      uploadInFlightRef.current = true;
      setUploadStatus('initializing');
      setErrorMessage('');

      try {
         const response = await axios.post(initiate.url(), {
            title: target.name,
         });

         if (!response.data.success) {
            throw new Error(
               response.data.message || 'Failed to initialize upload',
            );
         }

         setUploadId(response.data.upload_id);
         setUploadStatus('uploading');

         const tusUpload = new TusUpload(target, {
            endpoint: BUNNY_TUS_ENDPOINT,
            retryDelays: [0, 3000, 5000, 10000],
            headers: {
               AuthorizationSignature: response.data.signature,
               AuthorizationExpire: String(response.data.expire),
               VideoId: response.data.video_id,
               LibraryId: response.data.library_id,
            },
            metadata: {
               filetype: target.type,
               title: target.name,
            },
            onError: (error) => {
               fail(error.message || 'Failed to upload file to Bunny Stream');
               uploadInFlightRef.current = false;
            },
            onProgress: (bytesUploaded, bytesTotal) => {
               setUploadProgress(
                  Math.round((bytesUploaded / bytesTotal) * 100),
               );
            },
            onSuccess: () => {
               void finishUpload(response.data.upload_id, target);
            },
         });

         tusUploadRef.current = tusUpload;
         tusUpload.start();
      } catch (error: any) {
         fail(
            error.response?.data?.message ||
               error.message ||
               'Failed to initialize upload',
         );
         uploadInFlightRef.current = false;
      }
   };

   useEffect(() => {
      if (isSubmit) {
         void startUpload();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps -- startUpload closes over latest `file`
   }, [isSubmit]);

   const finishUpload = async (id: number, target: File) => {
      setUploadStatus('completing');

      try {
         const response = await axios.post(complete.url({ upload: id }));

         if (!response.data.success) {
            throw new Error(
               response.data.message || 'Failed to complete upload',
            );
         }

         setUploadStatus('completed');
         uploadedFileRef.current = target;

         const fileData: ChunkUploadedFileData = {
            upload_id: response.data.upload_id,
            file_path: response.data.file_path,
            file_url: response.data.file_url,
            signed_url: response.data.signed_url,
            mime_type: response.data.mime_type,
            file_name: response.data.file_name,
            file_size: response.data.file_size,
         };

         if (fileInputRef.current) {
            fileInputRef.current.value = '';
         }

         onFileUploaded?.(fileData);

         setTimeout(() => {
            setFile(null);
            setUploadId(null);
            setUploadProgress(0);
            setUploadStatus('idle');
         }, 3000);
      } catch (error: any) {
         fail(
            error.response?.data?.message ||
               error.message ||
               'Failed to complete upload',
         );
      } finally {
         uploadInFlightRef.current = false;
      }
   };

   const cancelUpload = async () => {
      if (uploadId && uploadStatus !== 'idle' && uploadStatus !== 'completed') {
         onCancelUpload?.();
         tusUploadRef.current?.abort();

         try {
            await axios.delete(abort.url({ upload: uploadId }));
         } catch {
            // Best-effort — the upload is already stopped client-side.
         }

         setUploadStatus('idle');
         setUploadProgress(0);
         uploadedFileRef.current = null;
         uploadInFlightRef.current = false;

         if (fileInputRef.current) {
            fileInputRef.current.value = '';
         }

         setFile(null);
      }
   };

   const renderStatus = () => {
      switch (uploadStatus) {
         case 'initializing':
            return (
               <div className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Initializing upload...
               </div>
            );
         case 'uploading':
            return (
               <div className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading to Bunny Stream...
               </div>
            );
         case 'completing':
            return (
               <div className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Finalizing upload...
               </div>
            );
         case 'completed':
            return (
               <div className="flex items-center text-secondary-foreground">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Completed upload
               </div>
            );
         default:
            return null;
      }
   };

   return (
      <div className={cn('relative overflow-hidden rounded-lg', className)}>
         <Input
            ref={fileInputRef}
            type="file"
            name="file"
            accept="video/*"
            className={inputClass}
            onChange={handleFileChange}
         />

         {uploadStatus === 'uploading' && file && (
            <div className="absolute top-0 left-0 z-10 flex h-full w-full items-center justify-between">
               <div className="relative h-full w-full overflow-hidden bg-gray-200">
                  <div
                     className="absolute top-0 left-0 h-full bg-secondary transition-all duration-300 ease-in-out"
                     style={{ width: `${uploadProgress}%` }}
                  />
                  <div className="relative z-10 flex h-full items-center justify-between gap-2 px-2 text-xs">
                     <span>{uploadProgress}%</span>
                     {renderStatus()}
                     <span className="text-gray-800">
                        Size: (
                        {(file ? file.size / (1024 * 1024) : 0).toFixed(2)} MB)
                     </span>
                  </div>
               </div>

               <div className="bg-gray-200">
                  <Button
                     size="lg"
                     type="button"
                     variant="destructive"
                     onClick={cancelUpload}
                     className={cn('rounded-l-none', buttonClass)}
                  >
                     Cancel
                  </Button>
               </div>
            </div>
         )}

         {errorMessage && <InputError message={errorMessage} />}
      </div>
   );
};

export default BunnyUploaderInput;
