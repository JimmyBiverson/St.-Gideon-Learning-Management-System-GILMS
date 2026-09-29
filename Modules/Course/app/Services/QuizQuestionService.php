<?php

namespace Modules\Course\Services;

use Modules\Course\Models\QuizQuestion;

class QuizQuestionService
{
    public function createQuestion(array $data)
    {
        return QuizQuestion::create([
            ...$data,
            'answer' => json_encode($data['answer']),
            'options' => json_encode($data['options']),
        ]);
    }

    public function updateQuestion(array $data, string $id)
    {
        return QuizQuestion::findOrFail($id)->update([
            ...$data,
            'answer' => json_encode($data['answer']),
            'options' => json_encode($data['options']),
        ]);
    }

    public function deleteQuestion(string $id): bool
    {
        return QuizQuestion::findOrFail($id)->delete();
    }

    public function sortQuestions(array $sortedData)
    {
        foreach ($sortedData as $value) {
            QuizQuestion::findOrFail($value['id'])->update([
                'sort' => $value['sort'],
            ]);
        }
    }
}
