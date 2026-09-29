<?php

namespace Modules\Course\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Modules\Course\Http\Requests\StoreQuizRequest;
use Modules\Course\Http\Requests\UpdateQuizRequest;
use Modules\Course\Models\SectionLesson;
use Modules\Course\Services\SectionQuizService;

class QuizController extends Controller
{
    public function __construct(
        private SectionQuizService $quizService,
    ) {}

    public function store(StoreQuizRequest $request)
    {
        $hasLessons = SectionLesson::ofSection($request->course_section_id)->exists();

        if (! $hasLessons) {
            return back()->with('error', 'You must add at least one lesson to the section before adding a quiz.');
        }

        $this->quizService->createQuiz($request->validated(), Auth::user()->id);

        return back()->with('success', 'Quiz has been created.');
    }

    public function update(UpdateQuizRequest $request, string $id)
    {
        $this->quizService->updateQuiz($request->validated(), $id);

        return back()->with('success', 'Quiz has been updated.');
    }

    public function destroy(string $id)
    {
        $this->quizService->deleteQuiz($id);

        return back()->with('success', 'Quiz has been deleted.');
    }
}
