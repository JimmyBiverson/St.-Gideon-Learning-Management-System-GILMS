<?php

namespace Modules\Exam\Http\Controllers;

use App\Enums\PricingType;
use App\Http\Controllers\Controller;
use App\Models\Instructor;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Modules\Exam\Http\Requests\ExamEnrollmentRequest;
use Modules\Exam\Services\ExamEnrollmentService;
use Modules\Exam\Services\ExamService;

class ExamEnrollmentController extends Controller
{
    public function __construct(
        private UserService $user,
        private ExamService $exam,
        private ExamEnrollmentService $examEnrollments,
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $extraParams = [];
        if (! isAdmin()) {
            if ($user->instructor) {
                /** @var Instructor $instructor */
                $instructor = $user->instructor;
                $extraParams = ['instructor_id' => $instructor->id];
            } else {
                $extraParams = ['user_id' => $user->id];
            }
        }

        $data = array_merge($request->all(), [
            'pagination' => true,
            'relations' => ['exam:id,title', 'user:id,name,email,photo'],
        ], $extraParams);

        $prices = PricingType::cases();
        $users = $this->user->getUsers(['select' => 'id,name']);
        $exams = $this->exam->getAllExams(['status' => 'published', 'select' => 'id,title']);
        $enrollments = $this->examEnrollments->getEnrollments($data);

        return Inertia::render('Exam/dashboard/enrollments/exams', compact('prices', 'users', 'exams', 'enrollments'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ExamEnrollmentRequest $request)
    {
        $this->examEnrollments->createExamEnroll($request->validated());

        return back()->with('success', 'Enrollment is successfully done in this exam');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->examEnrollments->deleteEnrollment($id);

        return back()->with('success', 'Enrollment is successfully deleted');
    }
}
