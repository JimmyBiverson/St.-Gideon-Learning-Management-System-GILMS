<?php

namespace Modules\Course\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Modules\Course\Models\CourseSection;
use Modules\Course\Models\WatchHistory;
use Modules\Course\Services\CoursePlayerService;
use Modules\Course\Services\CourseReviewService;
use Modules\Course\Services\CourseSectionService;
use Modules\Course\Services\CourseService;
use Modules\Course\Services\ZoomLiveService;

class PlayerController extends Controller
{
    public function __construct(
        protected CourseService $courseService,
        protected CoursePlayerService $coursePlay,
        protected CourseSectionService $sectionService,
        protected CourseReviewService $reviewService,
        protected ZoomLiveService $zoomLiveService,
    ) {}

    public function intWatchHistory(Request $request)
    {
        $user = Auth::user();
        $watchHistory = $this->sectionService->initWatchHistory($request->course_id, 'lesson', $user->id);

        return redirect()->route('course.play.start', [
            'type' => $watchHistory->current_watching_type,
            'watch_history' => $watchHistory->id,
            'lesson_id' => $watchHistory->current_watching_id,
        ]);
    }

    public function course_player(Request $request, string $type, WatchHistory $watch_history, string $lesson_id)
    {
        try {
            $user = Auth::user();

            $section_id = $watch_history->current_section_id;
            $watching_id = $lesson_id ?? $watch_history->current_watching_id;
            $watching_type = $type; // Use the route parameter, not old watch history

            $course = $this->courseService->getPlayCourseById($watch_history->course_id, $user);
            $watching = $this->coursePlay->getWatchingLesson($lesson_id, $type);
            $reviews = $this->reviewService->getReviews(array_merge($request->all(), [
                'select' => 'id,user_id,rating,review,created_at',
                'relations' => ['user:id,name,photo'],
                'course_id' => $course->id,
                'paginate' => true,
            ]));
            $userReview = $this->reviewService->userReview($course->id, $user->id);
            $totalReviews = $this->reviewService->totalReviews($course->id);
            $zoomConfig = $this->zoomLiveService->zoomConfig;

            $section = null;
            $totalContent = 0;

            /** @var CourseSection $courseSection */
            foreach ($course->sections as $courseSection) {
                $totalContent += count($courseSection->section_lessons) + count($courseSection->section_quizzes);

                // The curriculum sidebar only needs lesson_type for its icon —
                // never leak a video lesson's source (public URL or opaque
                // upload reference) for lessons that aren't the one being
                // watched right now.
                foreach ($courseSection->section_lessons as $sectionLesson) {
                    if ($sectionLesson->lesson_type === 'video') {
                        $sectionLesson->setAttribute('lesson_src', null);
                    }
                }

                if ($courseSection->id == $section_id) {
                    $section = $courseSection;
                }
            }

            $watchHistory = $this->coursePlay->watchHistory($course, $watching_id, $watching_type, $user->id);

            return Inertia::render('Course/course-player/index', [
                'type' => $type,
                'course' => $course,
                'section' => $section,
                'reviews' => $reviews,
                'watching' => $watching,
                'totalContent' => $totalContent,
                'watchHistory' => $watchHistory,
                'userReview' => $userReview,
                'totalReviews' => $totalReviews,
                'zoomConfig' => $zoomConfig,
            ]);
        } catch (\Throwable $th) {
            return redirect()->route('category.courses', ['category' => 'all'])->with('error', $th->getMessage());
        }
    }

    public function finish_course(WatchHistory $watch_history)
    {
        $user = Auth::user();
        abort_if($user->id !== $watch_history->user_id && $user->role !== 'admin', 403);

        $completedItems = $watch_history->completed_watching ?: [];
        $lastItem = [
            'id' => $watch_history->current_watching_id,
            'type' => $watch_history->current_watching_type,
        ];

        // Check if lastItem already exists in completedItems
        $itemExists = false;
        foreach ($completedItems as $item) {
            if ((string) $item['id'] === (string) $lastItem['id'] && $item['type'] === $lastItem['type']) {
                $itemExists = true;
                break;
            }
        }

        // Add lastItem to completedItems if it doesn't exist
        if (! $itemExists) {
            $completedItems[] = $lastItem;
        }

        // Clean up duplicates and ensure consistent data types
        $completedItems = $this->cleanupCompletedItems($completedItems);

        $watch_history->completed_watching = $completedItems;
        $watch_history->completion_date = now();
        $watch_history->save();

        return back()->with('success', 'Course completed successfully');
    }

    /**
     * Clean up completed items to remove duplicates and ensure consistent data types
     */
    private function cleanupCompletedItems(array $completedItems): array
    {
        $cleaned = [];
        $seen = [];

        foreach ($completedItems as $item) {
            // Ensure consistent data types (string for ID)
            $normalizedItem = [
                'id' => (string) $item['id'],
                'type' => $item['type'],
            ];

            // Create unique key for duplicate checking
            $key = $normalizedItem['id'].'|'.$normalizedItem['type'];

            // Only add if not already seen
            if (! isset($seen[$key])) {
                $seen[$key] = true;
                $cleaned[] = $normalizedItem;
            }
        }

        return $cleaned;
    }
}
