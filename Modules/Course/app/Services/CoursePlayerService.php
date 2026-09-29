<?php

namespace Modules\Course\Services;

use Illuminate\Support\Facades\Auth;
use Modules\Course\Models\Course;
use Modules\Course\Models\CourseSection;
use Modules\Course\Models\SectionLesson;
use Modules\Course\Models\SectionQuiz;
use Modules\Course\Models\WatchHistory;

class CoursePlayerService
{
    public function __construct(private LessonVideoUrlResolver $videoUrlResolver) {}

    public function getWatchingLesson(string $lesson_id, string $watching_type): SectionLesson|SectionQuiz
    {
        $user = Auth::user();

        if ($watching_type !== 'lesson') {
            return SectionQuiz::with([
                'quiz_questions',
                'quiz_submissions' => function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                },
            ])->find($lesson_id);
        }

        $lesson = SectionLesson::with([
            'resources',
            'forums' => function ($query) {
                $query->with([
                    'user',
                    'replies' => function ($replies) {
                        $replies->with(['user']);
                    },
                ]);
            },
        ])->find($lesson_id);

        if ($lesson && $lesson->lesson_type === 'video') {
            // The raw lesson_src is never handed to the frontend for video
            // lessons — only a freshly resolved, short-lived URL, so it must
            // be re-resolved on every request rather than cached anywhere.
            $videoUrl = $this->videoUrlResolver->resolve($lesson);
            $lesson->setAttribute('stream_url', $videoUrl->url);
            $lesson->setAttribute('stream_url_expires_in', $videoUrl->expiresInSeconds);
            $lesson->setAttribute('stream_url_type', $videoUrl->type);
            $lesson->setAttribute('lesson_src', null);
        }

        return $lesson;
    }

    public function getWatchHistory(array $data): ?WatchHistory
    {
        $user = Auth::user();

        if ($user) {
            return WatchHistory::ofCourse($data['course_id'])
                ->ofUser($user->id)
                ->when(array_key_exists('select', $data), function ($query) use ($data) {
                    $columns = is_array($data['select']) ? $data['select'] : explode(',', $data['select']);

                    return $query->select($columns);
                })
                ->when(array_key_exists('relations', $data), function ($query) use ($data) {
                    return $query->with($data['relations']);
                })
                ->first();
        } else {
            return null;
        }
    }

    public function watchHistory(Course $course, string $watching_id, string $watching_type, string $user_id): WatchHistory
    {
        // Get or create watch history
        $watchHistory = WatchHistory::ofCourse($course->id)
            ->ofUser($user_id)
            ->first();

        // Find current section, next item, and previous item
        $nextItem = null;
        $prevItem = null;
        $currentSection = null;
        $foundCurrent = false;

        // Create a flat list of all content items with their section info and proper ordering
        $allItems = [];
        $globalOrder = 0;

        foreach ($course->sections as $sectionIndex => $section) {
            /** @var CourseSection $section */
            // Add lessons first (maintaining their lesson_number order within section)
            $sectionLessons = $section->section_lessons->sortBy('lesson_number');
            foreach ($sectionLessons as $lesson) {
                $allItems[] = [
                    'id' => $lesson->id,
                    'type' => 'lesson',
                    'section' => $section,
                    'section_index' => $sectionIndex,
                    'lesson_number' => $lesson->lesson_number,
                    'global_order' => $globalOrder++,
                ];
            }

            // Add quizzes after all lessons in the section
            foreach ($section->section_quizzes as $quiz) {
                $allItems[] = [
                    'id' => $quiz->id,
                    'type' => 'quiz',
                    'section' => $section,
                    'section_index' => $sectionIndex,
                    'lesson_number' => 999999, // High number to put after lessons
                    'global_order' => $globalOrder++,
                ];
            }
        }

        // Items are already in the correct order due to global_order, no sorting needed

        // Find current item and determine next/previous
        for ($i = 0; $i < count($allItems); $i++) {
            if ((string) $allItems[$i]['id'] === (string) $watching_id && $allItems[$i]['type'] === $watching_type) {
                $currentSection = $allItems[$i]['section'];

                // Set previous item
                if ($i > 0) {
                    $prevItem = [
                        'id' => $allItems[$i - 1]['id'],
                        'type' => $allItems[$i - 1]['type'],
                    ];
                }

                // Set next item
                if ($i < count($allItems) - 1) {
                    $nextItem = [
                        'id' => $allItems[$i + 1]['id'],
                        'type' => $allItems[$i + 1]['type'],
                    ];
                }
                break;
            }
        }

        if ($watchHistory) {
            $completedItems = $watchHistory->completed_watching ?: [];
            if (is_string($completedItems)) {
                $decoded = json_decode($completedItems, true);
                $completedItems = is_array($decoded) ? $decoded : [];
            }
            $previousItemId = $watchHistory->current_watching_id;
            $previousItemType = $watchHistory->current_watching_type;

            // Mark previous item as completed when moving to a new item
            if ($previousItemId && $previousItemId != $watching_id) {
                $previousItemToComplete = [
                    'id' => $previousItemId,
                    'type' => $previousItemType,
                ];

                // Check if item is not already in completed items using array_filter
                $isDuplicate = array_filter($completedItems, function ($item) use ($previousItemToComplete) {
                    return (string) $item['id'] === (string) $previousItemToComplete['id'] && $item['type'] === $previousItemToComplete['type'];
                });

                if (empty($isDuplicate)) {
                    $completedItems[] = $previousItemToComplete;
                }
            }

            // Also mark all items before the current item as completed (for sequential progression)
            $currentItemIndex = -1;
            for ($i = 0; $i < count($allItems); $i++) {
                if ((string) $allItems[$i]['id'] === (string) $watching_id && $allItems[$i]['type'] === $watching_type) {
                    $currentItemIndex = $i;
                    break;
                }
            }

            // Mark all previous items in sequence as completed
            if ($currentItemIndex > 0) {
                for ($i = 0; $i < $currentItemIndex; $i++) {
                    $itemToComplete = [
                        'id' => $allItems[$i]['id'],
                        'type' => $allItems[$i]['type'],
                    ];

                    // Check if item is not already completed
                    $isDuplicate = array_filter($completedItems, function ($item) use ($itemToComplete) {
                        return (string) $item['id'] === (string) $itemToComplete['id'] && $item['type'] === $itemToComplete['type'];
                    });

                    if (empty($isDuplicate)) {
                        $completedItems[] = $itemToComplete;
                    }
                }
            }

            // Clean up duplicates and ensure consistent data types
            $completedItems = $this->cleanupCompletedItems($completedItems);

            $watchHistory->completed_watching = $completedItems;
            $watchHistory->prev_watching_id = $prevItem ? $prevItem['id'] : null;
            $watchHistory->prev_watching_type = $prevItem ? $prevItem['type'] : null;
            $watchHistory->current_watching_id = $watching_id;
            $watchHistory->current_watching_type = $watching_type;
            $watchHistory->next_watching_id = $nextItem ? $nextItem['id'] : null;
            $watchHistory->next_watching_type = $nextItem ? $nextItem['type'] : null;
            $watchHistory->current_section_id = $currentSection ? $currentSection->id : null;
            $watchHistory->save();
        } else {
            $watchHistory = WatchHistory::create([
                'current_watching_type' => $watching_type,
                'course_id' => $course->id,
                'user_id' => $user_id,
                'current_watching_id' => $watching_id,
                'current_section_id' => $currentSection ? $currentSection->id : null,
                'prev_watching_id' => $prevItem ? $prevItem['id'] : null,
                'prev_watching_type' => $prevItem ? $prevItem['type'] : null,
                'next_watching_id' => $nextItem ? $nextItem['id'] : null,
                'next_watching_type' => $nextItem ? $nextItem['type'] : null,
                'completed_watching' => [], // Start with empty completed items
            ]);
        }

        return $watchHistory;
    }

    public function calculateCompletion(Course $course, ?WatchHistory $watchHistory): array
    {
        $completedItems = $watchHistory ? ($watchHistory->completed_watching ?: []) : [];
        if (is_string($completedItems)) {
            $decoded = json_decode($completedItems, true);
            $completedItems = is_array($decoded) ? $decoded : [];
        }

        // Count the total number of items (lessons + quizzes) across all sections
        $totalItems = 0;
        /** @var CourseSection $section */
        foreach ($course->sections as $section) {
            $totalItems += count($section->section_lessons) + count($section->section_quizzes);
        }

        // Count how many items are completed
        $completedCount = 0;
        /** @var CourseSection $section */
        foreach ($course->sections as $section) {
            // Count completed lessons
            foreach ($section->section_lessons as $lesson) {
                foreach ($completedItems as $completedItem) {
                    if ((string) $completedItem['id'] === (string) $lesson->id && $completedItem['type'] === 'lesson') {
                        $completedCount++;
                        break;
                    }
                }
            }

            // Count completed quizzes
            foreach ($section->section_quizzes as $quiz) {
                foreach ($completedItems as $completedItem) {
                    if ((string) $completedItem['id'] === (string) $quiz->id && $completedItem['type'] === 'quiz') {
                        $completedCount++;
                        break;
                    }
                }
            }
        }

        // Calculate completion
        $completion = $totalItems > 0 ? round(($completedCount / $totalItems) * 100, 2) : 0;

        return [
            'total_items' => $totalItems,
            'completed_items' => $completedCount,
            'completion' => $completion,
        ];
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
