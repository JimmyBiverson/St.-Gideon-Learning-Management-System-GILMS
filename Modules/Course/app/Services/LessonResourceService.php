<?php

namespace Modules\Course\Services;

use App\Models\ChunkedUpload;
use App\Services\FileUploadService;
use App\Services\MediaService;
use Modules\Course\Models\LessonResource;
use Modules\Course\Models\SectionLesson;

class LessonResourceService extends MediaService
{
    protected FileUploadService $uploaderService;

    public function __construct()
    {
        $this->uploaderService = new FileUploadService;
    }

    public function sortSectionLessons(array $sortedData): bool
    {
        foreach ($sortedData as $value) {
            SectionLesson::findOrFail($value['id'])->update([
                'sort' => $value['sort'],
            ]);
        }

        return true;
    }

    public function resourceStore(array $data): LessonResource
    {
        $resource = $data['type'] === 'link'
            ? $data['resource']
            : $data['resource_url'];

        return LessonResource::create(array_merge($data, ['resource' => $resource]));
    }

    public function resourceUpdate(LessonResource $resource, array $data): bool
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

    public function resourceDelete(LessonResource $resource): bool
    {
        $chunkedUpload = ChunkedUpload::whereFileUrl($resource->resource)->first();
        $chunkedUpload && $this->uploaderService->deleteFile($chunkedUpload);

        $resource->delete();

        return true;
    }
}
