<?php

namespace Modules\Exam\Services;

use App\Models\ChunkedUpload;
use App\Services\FileUploadService;
use Modules\Exam\Models\Exam;
use Modules\Exam\Models\ExamResource;

class ExamResourceService
{
    protected FileUploadService $uploaderService;

    public function __construct()
    {
        $this->uploaderService = new FileUploadService;
    }

    public function resourceStore(array $data): ExamResource
    {
        $resource = $data['type'] === 'link'
            ? $data['resource']
            : $data['resource_url'];

        return ExamResource::create(array_merge($data, ['resource' => $resource]));
    }

    public function resourceUpdate(ExamResource $resource, array $data): bool
    {
        if ($data['type'] === 'link') {
            $resource->update($data);
        }

        if (empty($data['resource_url'])) {
            $resource->update($data);
        } else {
            $chunkedUpload = ChunkedUpload::where('file_url', $data['resource'])->first();
            $chunkedUpload && $this->uploaderService->deleteFile($chunkedUpload);

            $resource->update([...$data, 'resource' => $data['resource_url']]);
        }

        return true;
    }

    public function resourceDelete(ExamResource $resource): bool
    {
        $chunkedUpload = ChunkedUpload::where('file_url', $resource->resource)->first();
        $chunkedUpload && $this->uploaderService->deleteFile($chunkedUpload);

        $resource->delete();

        return true;
    }

    public function getExamResources(string $exam_id)
    {
        $exam = Exam::findOrFail($exam_id);
        if (! $exam) {
            return [];
        }

        // Get media files from Spatie Media Library
        $media = $exam->getMedia('resources');

        if (! $media) {
            return [];
        }

        // Convert media collection to array format
        return $media->map(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'file_name' => $item->file_name,
                'mime_type' => $item->mime_type,
                'size' => $item->size,
                'url' => $item->getUrl(),
                'getUrl' => $item->getUrl(),
            ];
        })->toArray();
    }
}
