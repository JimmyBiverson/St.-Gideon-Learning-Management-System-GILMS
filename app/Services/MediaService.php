<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;

class MediaService extends BaseService
{
    public function getMediaByName(Model $model, string $name): ?string
    {
        $media = $model->getMedia('*', ['name' => $name])->first();

        return $media ? $media->getFullUrl() : null;
    }

    public function addNewDeletePrev(Model $model, $image, ?string $name): string
    {
        if ($name) {
            $prevMedia = $model->getMedia('*', ['name' => $name])->first();

            $newMedia = $model
                ->addMedia($image)
                ->withCustomProperties(['name' => $name])
                ->toMediaCollection();
        } else {
            $prevMedia = $model->getMedia()->first();

            $newMedia = $model
                ->addMedia($image)
                ->toMediaCollection();
        }

        $prevMedia?->delete();
        $model->unsetRelation('media');

        return $newMedia->getFullUrl();
    }

    public function addSingleFile(Model $model, $image, ?string $name)
    {
        if ($name) {
            $newMedia = $model
                ->addMedia($image)
                ->withCustomProperties(['name' => $name])
                ->toMediaCollection();
        } else {
            $newMedia = $model
                ->addMedia($image)
                ->toMediaCollection();
        }

        return $newMedia->getFullUrl();
    }
}
