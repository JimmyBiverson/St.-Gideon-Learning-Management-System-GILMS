<?php

namespace Modules\Course\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Modules\Course\Http\Requests\StoreQuestionRequest;
use Modules\Course\Http\Requests\UpdateQuestionRequest;
use Modules\Course\Services\QuizQuestionService;

class QuestionController extends Controller
{
    public function __construct(
        private QuizQuestionService $questionService,
    ) {}

    public function store(StoreQuestionRequest $request)
    {
        $this->questionService->createQuestion($request->validated());

        return back()->with('success', 'Question has been added.');
    }

    public function update(UpdateQuestionRequest $request, $id)
    {
        $this->questionService->updateQuestion($request->validated(), $id);

        return back()->with('success', 'Question has been updated.');
    }

    public function destroy($id)
    {
        $this->questionService->deleteQuestion($id);

        return back()->with('success', 'Question has been deleted.');
    }

    public function sort(Request $request)
    {
        $this->questionService->sortQuestions($request->sortedData);

        return back()->with('success', 'Sections sorted successfully');
    }
}
