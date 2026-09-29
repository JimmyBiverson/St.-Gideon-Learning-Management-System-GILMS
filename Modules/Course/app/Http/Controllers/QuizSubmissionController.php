<?php

namespace Modules\Course\Http\Controllers;

use App\Http\Controllers\Controller;
use Modules\Course\Http\Requests\StoreQuizSubmissionRequest;
use Modules\Course\Services\SectionQuizService;

class QuizSubmissionController extends Controller
{
    public function __construct(
        private SectionQuizService $quizService,
    ) {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreQuizSubmissionRequest $request)
    {
        $submission = $this->quizService->quizSubmission($request->validated());

        if (! $submission) {
            return back()->with('error', 'You have done your retake attempts');
        }

        return back()->with('success', 'Quiz submitted successfully');
    }
}
