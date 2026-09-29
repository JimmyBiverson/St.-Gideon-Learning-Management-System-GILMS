<?php

namespace Modules\Course\Services;

use Modules\Course\Models\CourseFaq;

class CourseFaqService
{
    public function createFaq(array $data)
    {
        return CourseFaq::create($data);
    }

    public function updateFaq(array $data, string $id)
    {
        return CourseFaq::findOrFail($id)->update($data);
    }

    public function deleteFaq(string $id): bool
    {
        return CourseFaq::findOrFail($id)->delete();
    }
}
