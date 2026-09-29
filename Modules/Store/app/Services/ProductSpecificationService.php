<?php

namespace Modules\Store\Services;

use Modules\Store\Models\ProductSpecification;

class ProductSpecificationService
{
    public function createSpecification(array $data)
    {
        return ProductSpecification::create($data);
    }

    public function updateSpecification(array $data, string $id)
    {
        return ProductSpecification::findOrFail($id)->update($data);
    }

    public function deleteSpecification(string $id): bool
    {
        return ProductSpecification::findOrFail($id)->delete();
    }
}
