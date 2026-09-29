<?php

namespace Modules\Course\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ChunkedUpload;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\Course\Services\BunnyUploadService;

class BunnyVideoUploadController extends Controller
{
    public function __construct(private BunnyUploadService $bunny) {}

    /**
     * Create the video on Bunny and hand the browser everything it needs to
     * start a TUS upload directly to Bunny (no bytes are relayed through
     * our server).
     */
    public function initiate(Request $request): JsonResponse
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        try {
            $result = $this->bunny->initiate($data['title'], (int) Auth::id());
        } catch (\Throwable $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }

        return response()->json([
            'success' => true,
            'upload_id' => $result['upload']->id,
            'video_id' => $result['video_id'],
            'library_id' => $result['library_id'],
            'signature' => $result['signature'],
            'expire' => $result['expire'],
        ]);
    }

    /**
     * Called once the browser's TUS upload finishes. Response shape mirrors
     * ChunkedUploadController::complete() so the lesson form's existing
     * onFileUploaded wiring needs no changes for this provider.
     */
    public function complete(ChunkedUpload $upload): JsonResponse
    {
        $this->bunny->markCompleted($upload);

        return response()->json([
            'success' => true,
            'message' => 'Upload completed successfully',
            'upload_id' => $upload->id,
            'file_path' => $upload->file_path,
            'file_url' => null,
            'mime_type' => $upload->mime_type,
            'file_name' => $upload->original_filename,
            'file_size' => $upload->size,
        ]);
    }

    public function abort(ChunkedUpload $upload): JsonResponse
    {
        $this->bunny->deleteFile($upload);

        return response()->json(['success' => true]);
    }
}
