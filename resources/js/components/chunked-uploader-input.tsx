import axios from 'axios';
import { CheckCircle, Loader2 } from 'lucide-react';
import type { ChangeEvent, FC } from 'react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import InputError from './input-error';

function getCsrfHeaders(): Record<string, string> {
   const cookieToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1];

   if (cookieToken) {
      return { 'X-XSRF-TOKEN': decodeURIComponent(cookieToken) };
   }

   const metaToken = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute('content');

   return metaToken ? { 'X-CSRF-TOKEN': metaToken } : {};
}

/**
 * Raw XHR POST for a chunk's bytes, bypassing axios entirely for a direct,
 * guaranteed-accurate result independent of axios's adapter behavior.
 *
 * This intentionally does not report send progress: the browser can only
 * see bytes reaching our own server, not the server's own onward relay to
 * S3/R2 (often the slower leg), so a live byte counter here would move
 * before the chunk is actually done and then sit idle — the resolved
 * promise (full round trip complete) is the only accurate signal.
 */
function postChunk(
   url: string,
   body: Blob,
   signal: AbortSignal,
): Promise<{ success: boolean; message?: string }> {
   return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const onAbort = () => xhr.abort();
      signal.addEventListener('abort', onAbort);

      xhr.open('POST', url);
      xhr.withCredentials = true;
      xhr.setRequestHeader('Content-Type', 'application/octet-stream');
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

      const csrfHeaders = getCsrfHeaders();

      for (const [header, value] of Object.entries(csrfHeaders)) {
         xhr.setRequestHeader(header, value);
      }

      xhr.onload = () => {
         signal.removeEventListener('abort', onAbort);

         try {
            resolve(JSON.parse(xhr.responseText));
         } catch {
            reject(new Error('Invalid server response'));
         }
      };

      xhr.onerror = () => {
         signal.removeEventListener('abort', onAbort);
         reject(new Error('Network error while uploading chunk'));
      };

      xhr.onabort = () => {
         signal.removeEventListener('abort', onAbort);
         reject(new DOMException('Upload cancelled', 'AbortError'));
      };

      xhr.send(body);
   });
}

interface PartUrl {
   part_number: number;
   url: string;
}

interface UploadedPart {
   part_number: number;
   etag: string;
}

/**
 * Raw XHR PUT for one presigned part, reporting real byte-level progress via
 * `xhr.upload.onprogress` — this is what `fetch()` cannot do (it has no
 * upload-progress event), and is why the old fetch-based version only ever
 * advanced in big steps at part boundaries instead of smoothly like Bunny's
 * TUS upload. Here the destination is the bucket itself, not our own server,
 * so unlike `postChunk()` above, a live byte counter genuinely reflects real
 * network transfer — there's no hidden second hop to misrepresent.
 */
function putPart(
   url: string,
   body: Blob,
   signal: AbortSignal,
   onProgress: (bytesLoaded: number) => void,
): Promise<{ etag: string }> {
   return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const onAbort = () => xhr.abort();
      signal.addEventListener('abort', onAbort);

      xhr.open('PUT', url);

      xhr.upload.onprogress = (event) => {
         if (event.lengthComputable) {
            onProgress(event.loaded);
         }
      };

      xhr.onload = () => {
         signal.removeEventListener('abort', onAbort);

         if (xhr.status < 200 || xhr.status >= 300) {
            reject(new Error(`Failed to upload part (${xhr.status})`));

            return;
         }

         const etag = xhr.getResponseHeader('ETag');

         if (!etag) {
            reject(
               new Error(
                  'Upload succeeded but the bucket didn\'t return an ETag — its CORS policy likely needs ExposeHeaders: ["ETag"].',
               ),
            );

            return;
         }

         onProgress(body.size);
         resolve({ etag });
      };

      // The browser hides the real reason a cross-origin request failed, so
      // a CORS rejection and a genuine network failure both surface here
      // identically. Thrown as TypeError to match fetch()'s equivalent
      // failure mode, which the catch block below already has a specific,
      // CORS-pointed message for.
      xhr.onerror = () => {
         signal.removeEventListener('abort', onAbort);
         reject(new TypeError('Network error while uploading part'));
      };

      xhr.onabort = () => {
         signal.removeEventListener('abort', onAbort);
         reject(new DOMException('Upload cancelled', 'AbortError'));
      };

      xhr.send(body);
   });
}

/** How many presigned-part PUTs run at once for S3/R2 direct upload. */
const DIRECT_UPLOAD_CONCURRENCY = 4;

interface ChunkedUploaderInputProps {
   storage?: 's3' | 'local';
   isSubmit: boolean;
   filetype: string;
   additional?: Record<string, any>;
   delayUpload?: boolean;
   onError?: (message: string) => void;
   onCancelUpload?: () => void;
   onFileSelected?: (file: File) => void;
   onFileUploaded?: (fileData: ChunkUploadedFileData) => void;
   className?: string;
   inputClass?: string;
   buttonClass?: string;
}

const ChunkedUploaderInput: FC<ChunkedUploaderInputProps> = ({
   storage,
   isSubmit,
   filetype,
   additional,
   delayUpload = false,
   onError,
   onCancelUpload,
   onFileSelected,
   onFileUploaded,
   className,
   inputClass,
   buttonClass,
}) => {
   // Use external file if provided, or manage internally
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
   const abortControllerRef = useRef<AbortController | null>(null);
   // Which path this upload took — direct-to-bucket (S3/R2) vs relayed
   // through our own server (local) — purely to label the status text
   // accurately; both paths behave the same otherwise.
   const [isDirectUpload, setIsDirectUpload] = useState(false);
   // Guards against uploading the same file twice: `delayUpload={false}` starts
   // an upload on selection and a parent flipping `isSubmit` starts another, so
   // without these the whole file is re-sent and the first copy is orphaned on
   // the server. `uploadInFlightRef` blocks a concurrent start;
   // `uploadedFileRef` blocks a repeat of one that already finished.
   const uploadInFlightRef = useRef(false);
   const uploadedFileRef = useRef<File | null>(null);
   const maxFileSize = 1024 * 1024 * 1024;
   const chunkSize = 5 * 1024 * 1024;

   // Configure axios to automatically handle CSRF tokens
   useEffect(() => {
      // Set up axios defaults for CSRF protection
      axios.defaults.withCredentials = true;

      // Get CSRF token from cookie if available
      const token = document.cookie
         .split('; ')
         .find((row) => row.startsWith('XSRF-TOKEN='))
         ?.split('=')[1];

      if (token) {
         axios.defaults.headers.common['X-XSRF-TOKEN'] =
            decodeURIComponent(token);
      } else {
         // If no XSRF-TOKEN cookie, try to get it from meta tag as fallback
         const metaToken = document
            .querySelector('meta[name="csrf-token"]')
            ?.getAttribute('content');

         if (metaToken) {
            axios.defaults.headers.common['X-CSRF-TOKEN'] = metaToken;
         }
      }
   }, []);

   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
         const selectedFile = event.target.files[0];

         // Validate file size
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

         // Upload immediately unless the parent wants to defer it until it
         // sets `isSubmit`. The file is passed explicitly because the `file`
         // state set above is not visible to this render's closure yet.
         if (!delayUpload) {
            void initiateUpload(selectedFile);
         }
      }
   };

   const initiateUpload = async (fileToUpload?: File | null) => {
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
         // Calculate total chunks
         const totalChunks = Math.ceil(target.size / chunkSize);

         // Initiate upload on the server
         const response = await axios.post(
            '/dashboard/uploads/chunked/initialize',
            {
               storage: storage,
               filename: target.name,
               mimetype: target.type,
               filesize: (target.size || 0) / 1024,
               filetype: filetype,
               total_chunks: totalChunks,
               ...additional,
            },
            {
               timeout: 360000, // 2 minutes timeout for initialization request
            },
         );

         if (response.data.success) {
            setUploadId(response.data.upload_id);

            // part_urls present = S3/R2 presigned direct upload (browser
            // PUTs straight to the bucket); absent = local, which still
            // relays chunk bytes through our own server.
            if (response.data.part_urls) {
               setIsDirectUpload(true);
               await uploadPartsDirectly(
                  response.data.upload_id,
                  response.data.part_urls,
                  target,
               );
            } else {
               setIsDirectUpload(false);
               await uploadChunks(response.data.upload_id, totalChunks, target);
            }
         } else {
            throw new Error(
               response.data.message || 'Failed to initialize upload',
            );
         }
      } catch (error: any) {
         setUploadStatus('error');
         setErrorMessage(
            error.response?.data?.message ||
               error.message ||
               'Failed to initialize upload',
         );

         if (onError) {
            onError(
               error.response?.data?.message ||
                  error.message ||
                  'Failed to initialize upload',
            );
         }
      } finally {
         // uploadChunks/completeUpload handle their own errors and return
         // normally, so this runs once the whole chain has settled.
         uploadInFlightRef.current = false;
      }
   };

   // Start upload when parent sets isSubmit (delayed upload flow)
   useEffect(() => {
      if (isSubmit) {
         void initiateUpload();
      }
   }, [isSubmit]); // eslint-disable-line react-hooks/exhaustive-deps -- initiateUpload closes over latest `file`

   const uploadChunks = async (
      uploadId: number,
      totalChunks: number,
      target: File,
   ) => {
      setUploadStatus('uploading');

      // Create a new AbortController for this upload
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      try {
         // Process chunks sequentially to avoid overwhelming the server
         for (
            let chunkIndex = 0;
            chunkIndex < totalChunks && !signal.aborted;
            chunkIndex++
         ) {
            const start = chunkIndex * chunkSize;
            const end = Math.min(start + chunkSize, target.size);
            const chunk = target.slice(start, end);

            // The chunk goes as the raw request body, not a multipart file
            // field — a multipart file part is capped by PHP's small default
            // upload_max_filesize, while a raw body is only bound by the much
            // larger post_max_size (same constraint the old base64 payload
            // relied on). Metadata therefore travels via the query string.
            const params = new URLSearchParams();

            if (storage) {
               params.set('storage', storage);
            }

            params.set('part_number', String(chunkIndex + 1));
            params.set('filename', target.name);
            params.set('mimetype', target.type);

            const response = await postChunk(
               `/dashboard/uploads/chunked/${uploadId}/chunk?${params.toString()}`,
               chunk,
               signal,
            );

            if (response.success) {
               // Advance the percentage only once this chunk's full round
               // trip (upload + server-side processing) has actually
               // finished, not as soon as the browser sent the bytes — the
               // server's own onward relay to storage isn't otherwise
               // observable from here.
               setUploadProgress(
                  Math.round(((chunkIndex + 1) / totalChunks) * 100),
               );
            } else {
               throw new Error(response.message || 'Failed to upload chunk');
            }
         }

         if (signal.aborted) {
            return; // Upload was cancelled
         }

         // Complete the upload
         await completeUpload(uploadId, target);
      } catch (error: any) {
         if (signal.aborted) {
            setUploadStatus('idle');
            setUploadProgress(0);

            return;
         }

         setUploadStatus('error');
         setErrorMessage(
            error.response?.data?.message ||
               error.message ||
               'Failed to upload file chunks',
         );

         if (onError) {
            onError(
               error.response?.data?.message ||
                  error.message ||
                  'Failed to upload file chunks',
            );
         }
      }
   };

   /**
    * S3/R2 direct upload: PUT each part straight to its presigned URL, a few
    * at a time, instead of relaying bytes through our own server. This is
    * also where most of the speed difference vs. the relay path comes from
    * — one network hop instead of two, run in parallel rather than one
    * chunk at a time.
    */
   const uploadPartsDirectly = async (
      uploadId: number,
      partUrls: PartUrl[],
      target: File,
   ) => {
      setUploadStatus('uploading');

      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;
      const uploadedParts: UploadedPart[] = [];
      // Bytes uploaded so far per part index, including in-flight partial
      // progress — not just a count of finished parts. Summed against the
      // whole file's size, this is what gives a smooth, continuously moving
      // percentage (matching Bunny's TUS upload) instead of the old jump at
      // each 5MB part boundary.
      const bytesByPart = new Array<number>(partUrls.length).fill(0);
      let nextIndex = 0;

      const reportProgress = () => {
         const uploaded = bytesByPart.reduce((sum, bytes) => sum + bytes, 0);
         setUploadProgress(Math.round((uploaded / target.size) * 100));
      };

      const worker = async () => {
         while (nextIndex < partUrls.length) {
            if (signal.aborted) {
               return;
            }

            const index = nextIndex++;
            const { part_number: partNumber, url } = partUrls[index];
            const start = (partNumber - 1) * chunkSize;
            const end = Math.min(start + chunkSize, target.size);
            const blob = target.slice(start, end);

            const { etag } = await putPart(url, blob, signal, (loaded) => {
               bytesByPart[index] = loaded;
               reportProgress();
            });

            uploadedParts.push({ part_number: partNumber, etag });
         }
      };

      try {
         const workerCount = Math.min(
            DIRECT_UPLOAD_CONCURRENCY,
            partUrls.length,
         );
         await Promise.all(Array.from({ length: workerCount }, worker));

         if (signal.aborted) {
            return; // Upload was cancelled
         }

         await completeUpload(uploadId, target, uploadedParts);
      } catch (error: any) {
         if (signal.aborted) {
            setUploadStatus('idle');
            setUploadProgress(0);

            return;
         }

         // The browser deliberately hides the real reason a cross-origin
         // request failed (security measure — it won't tell a page why
         // another origin rejected it), so fetch() only ever surfaces a
         // generic "Failed to fetch" here. But that specific failure mode —
         // fetch rejecting before any HTTP response exists — is a real
         // TypeError, distinct from the plain Error objects thrown above for
         // an actual HTTP error status or a missing ETag. For a direct PUT
         // to a cloud bucket, a missing CORS policy is overwhelmingly the
         // most common cause, so it's worth naming even though a handful of
         // other things (offline, DNS, an ad/security blocker) look
         // identical from here.
         const message =
            error instanceof TypeError
               ? 'Upload blocked. Verify your bucket CORS policy in Storage Settings, or check your network connection.'
               : error.message || 'Failed to upload file parts';

         setUploadStatus('error');
         setErrorMessage(message);
         onError?.(message);
      }
   };

   const completeUpload = async (
      uploadId: number,
      target: File,
      parts?: UploadedPart[],
   ) => {
      setUploadStatus('completing');

      try {
         const response = await axios.post(
            `/dashboard/uploads/chunked/${uploadId}/complete`,
            {
               storage: storage,
               ...(parts ? { parts } : {}),
            },
            {
               timeout: 360000, // 2 minute timeout for completion request
            },
         );

         if (response.data.success) {
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

            // Clear the native file input synchronously, before notifying the
            // parent. Callers commonly submit their own enclosing form as
            // soon as onFileUploaded fires; since that's a native <Form>
            // that serializes the whole DOM subtree via FormData, a stale
            // populated file input here would re-attach the entire raw file
            // to that submission on top of the already-uploaded URL field.
            if (fileInputRef.current) {
               fileInputRef.current.value = '';
            }

            onFileUploaded?.(fileData);

            // Reset the remaining uploader state for potential future
            // uploads, after letting the "Completed upload" indicator show.
            setTimeout(() => {
               setFile(null);
               setUploadId(null);
               setUploadProgress(0);
               setUploadStatus('idle');
            }, 3000);
         } else {
            throw new Error(
               response.data.message || 'Failed to complete upload',
            );
         }
      } catch (error: any) {
         setUploadStatus('error');
         setErrorMessage(
            error.response?.data?.message ||
               error.message ||
               'Failed to complete upload',
         );

         if (onError) {
            onError(
               error.response?.data?.message ||
                  error.message ||
                  'Failed to complete upload',
            );
         }
      }
   };

   const cancelUpload = async () => {
      if (uploadId && uploadStatus !== 'idle' && uploadStatus !== 'completed') {
         onCancelUpload?.();

         // Abort any in-progress network requests
         if (abortControllerRef.current) {
            abortControllerRef.current.abort();
         }

         try {
            // Inform the server to abort the multipart upload
            await axios.delete(`/dashboard/uploads/chunked/${uploadId}/abort`);
         } catch (error) {
            toast.error('Error aborting upload:' + error);
         }

         // Reset UI state
         setUploadStatus('idle');
         setUploadProgress(0);
         uploadedFileRef.current = null;

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
                  {isDirectUpload
                     ? 'Uploading directly to storage...'
                     : 'Uploading file chunks...'}
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
         // case 'error':
         //    return (
         //       <div className="text-destructive flex items-center text-sm">
         //          <AlertCircle className="mr-2 h-4 w-4" />
         //          Error: {errorMessage}
         //       </div>
         //    );
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

export default ChunkedUploaderInput;
