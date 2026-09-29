<?php

namespace Modules\Exam\Services;

use Modules\Exam\Models\ExamFaq;

class ExamFaqService
{
    public function createFaq(array $data)
    {
        return ExamFaq::create($data);
    }

    public function updateFaq(array $data, string $id)
    {
        return ExamFaq::findOrFail($id)->update($data);
    }

    public function deleteFaq(string $id): bool
    {
        return ExamFaq::findOrFail($id)->delete();
    }
}
