<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChunkInitiateRequest;
use App\Http\Requests\ChunkUploadRequest;
use App\Models\ChunkedUpload;
use App\Services\FileUploadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ChunkedUploadController extends Controller
{
    /**
     * Determine which upload service to use based on request or config
     */
    private function getUploadService(Request $request): FileUploadService
    {
        $storage = $request->input('storage');

        if (! empty($storage)) {
            config(['filesystems.default' => $storage]);
        }

        return new FileUploadService;
    }

    /**
     * Initialize a new chunked upload
     *
     * @return JsonResponse
     */
    public function initialize(ChunkInitiateRequest $request)
    {
        try {
            $uploaderService = $this->getUploadService($request);

            $metadata = [
                'filetype' => $request->filetype,
                'course_id' => $request->course_id,
                'course_section_id' => $request->course_section_id,
            ];

            // Initialize the upload in the database and S3
            $upload = $uploaderService->initiateUpload(
                $request->input('filename'),
                $request->input('mimetype'),
                $request->input('filesize'),
                Auth::id(),
                $metadata
            );

            // Update total chunks
            $upload->update(['total_chunks' => $request->total_chunks]);

            // S3/R2 uploads go straight from the browser to the bucket via
            // presigned part URLs — the app server never sees the bytes.
            // Their presence in the response is what tells the frontend to
            // use the direct-upload path instead of relaying chunks through
            // uploadChunk(); local uploads get null and keep relaying.
            $partUrls = null;

            if (in_array($upload->disk, ['s3', 'r2'], true)) {
                $partUrls = [];

                for ($partNumber = 1; $partNumber <= (int) $request->total_chunks; $partNumber++) {
                    $partUrls[] = [
                        'part_number' => $partNumber,
                        'url' => $uploaderService->presignedPartUrl($upload, $partNumber),
                    ];
                }
            }

            return response()->json([
                'success' => true,
                'key' => $upload->key,
                'upload_id' => $upload->id,
                'aws_upload_id' => $upload->upload_id,
                'part_urls' => $partUrls,
                'message' => 'Upload initialized successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to initialize upload: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Upload a chunk of the file
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function uploadChunk(ChunkUploadRequest $request, $id)
    {
        try {
            // Find the upload record
            $upload = ChunkedUpload::where('user_id', Auth::id())
                ->where('status', '!=', 'completed')
                ->find($id);

            if (! $upload) {
                abort(404, 'Upload not found');
            }

            // Determine upload service based on the stored disk type
            $uploaderService = $this->getUploadService($request);

            // Get part number
            $partNumber = $request->input('part_number');

            // The chunk bytes are the raw request body (see ChunkUploadRequest
            // for why this isn't a multipart file field).
            $chunk = $request->getContent();

            if ($chunk === '') {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to read uploaded chunk data',
                ], 400);
            }

            // Upload the part to S3
            $part = $uploaderService->uploadPart($upload, $partNumber, $chunk);

            // Store part information in the database (for completing the upload later)
            DB::table('chunked_upload_parts')->insert([
                'upload_id' => $upload->id,
                'part_number' => $partNumber,
                'etag' => $part['ETag'],
                'size' => strlen($chunk),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'part_number' => $partNumber,
                'percentage' => $upload->percentCompleted(),
                'chunks_completed' => $upload->chunks_completed,
                'message' => 'Chunk uploaded successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to upload chunk: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Complete the chunked upload
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function complete(Request $request, $id)
    {
        try {
            // Determine upload service based on the stored disk type
            $uploaderService = $this->getUploadService($request);

            // Find the upload record
            $upload = ChunkedUpload::where('user_id', Auth::id())
                ->find($id);

            if (! $upload) {
                abort(404, 'Upload not found');
            }

            if ($upload->status === 'completed') {
                return response()->json([
                    'success' => true,
                    'message' => 'Upload already completed',
                    'file_path' => $upload->file_path,
                ]);
            }

            if ($request->filled('parts')) {
                // Direct-to-cloud path (S3/R2 presigned part uploads): the
                // browser uploaded every part itself and already has each
                // part's ETag from the PUT response — nothing was relayed
                // through uploadChunk(), so chunked_upload_parts has no rows
                // to read here.
                $request->validate([
                    'parts' => 'required|array|min:1',
                    'parts.*.part_number' => 'required|integer|min:1',
                    'parts.*.etag' => 'required|string',
                ]);

                $parts = collect($request->input('parts'))
                    ->map(fn (array $part) => [
                        'PartNumber' => (int) $part['part_number'],
                        'ETag' => $part['etag'],
                    ])
                    ->sortBy('PartNumber')
                    ->values()
                    ->all();
            } else {
                if ($upload->chunks_completed < $upload->total_chunks) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Cannot complete upload, not all chunks have been uploaded',
                    ], 422);
                }

                // Get all parts from database
                $parts = DB::table('chunked_upload_parts')
                    ->where('upload_id', $upload->id)
                    ->orderBy('part_number')
                    ->get()
                    ->map(function ($part) {
                        return [
                            'PartNumber' => $part->part_number,
                            'ETag' => $part->etag,
                        ];
                    })
                    ->toArray();
            }

            // Complete the upload
            $uploaderService->completeUpload($upload, $parts);

            // After successful completion
            DB::table('chunked_upload_parts')
                ->where('upload_id', $upload->id)
                ->delete();

            // Return file information. `upload_id` lets callers address the
            // stored file by record rather than by URL — the only option for
            // private uploads, which have no public URL at all.
            return response()->json([
                'success' => true,
                'message' => 'Upload completed successfully',
                'upload_id' => $upload->id,
                'file_path' => $upload->file_path,
                'file_url' => $upload->file_url,
                'mime_type' => $upload->mime_type,
                'file_name' => $upload->original_filename,
                'file_size' => $upload->size,
            ]);
        } catch (ValidationException $e) {
            // Let Laravel's own automatic 422 response through — the
            // generic \Exception catch below would otherwise turn a
            // validation failure into a misleading 500.
            throw $e;
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to complete upload: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Check upload status
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function status($id)
    {
        try {
            // Find the upload record
            $upload = ChunkedUpload::where('user_id', Auth::id())
                ->find($id);

            if (! $upload) {
                abort(404, 'Upload not found');
            }

            return response()->json([
                'success' => true,
                'status' => $upload->status,
                'chunks_completed' => $upload->chunks_completed,
                'total_chunks' => $upload->total_chunks,
                'percentage' => $upload->percentCompleted(),
                'file_path' => $upload->status === 'completed' ? $upload->file_path : null,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to check upload status: '.$e->getMessage(),
            ], 500);
        }
    }

    /**
     * Abort upload
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function abort(Request $request, $id)
    {
        try {
            // Find the upload record
            $upload = ChunkedUpload::where('user_id', Auth::id())
                ->find($id);

            if (! $upload) {
                abort(404, 'Upload not found');
            }

            // Determine upload service based on the stored disk type
            $uploaderService = $this->getUploadService($request);

            // Abort the upload
            $uploaderService->abortUpload($upload);

            return response()->json([
                'success' => true,
                'message' => 'Upload aborted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to abort upload: '.$e->getMessage(),
            ], 500);
        }
    }
}
