<?php

namespace Modules\Store\Services;

use Modules\Store\Models\ProductFaq;

class ProductFaqService
{
    public function createFaq(array $data)
    {
        return ProductFaq::create($data);
    }

    public function updateFaq(array $data, string $id)
    {
        return ProductFaq::findOrFail($id)->update($data);
    }

    public function deleteFaq(string $id): bool
    {
        return ProductFaq::findOrFail($id)->delete();
    }
}
