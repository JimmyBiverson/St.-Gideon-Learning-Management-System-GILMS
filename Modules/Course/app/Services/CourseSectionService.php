<?php

namespace Modules\Course\Services;

use App\Models\ChunkedUpload;
use App\Services\FileUploadService;
use App\Services\MediaService;
use Modules\Course\Models\Course;
use Modules\Course\Models\CourseSection;
use Modules\Course\Models\LessonResource;
use Modules\Course\Models\SectionLesson;
use Modules\Course\Models\SectionQuiz;
use Modules\Course\Models\WatchHistory;

class CourseSectionService extends MediaService
{
    protected FileUploadService $uploaderService;

    public function __construct(protected BunnyUploadService $bunnyUploadService)
    {
        $this->uploaderService = new FileUploadService;
    }

    /**
     * FileUploadService only knows about local/s3/r2 — Bunny lives outside
     * it entirely, so its cleanup has to be routed here explicitly. Every
     * deletion of a video ChunkedUpload must go through this instead of
     * $this->uploaderService directly.
     */
    private function deleteVideoUpload(ChunkedUpload $upload): bool
    {
        return $upload->disk === 'bunny'
            ? $this->bunnyUploadService->deleteFile($upload)
            : $this->uploaderService->deleteFile($upload);
    }

    public function createSection(array $data, string $user_id): CourseSection
    {
        return CourseSection::create([...$data, 'user_id' => $user_id]);
    }

    public function updateSection(string $id, array $data): bool
    {
        return CourseSection::findOrFail($id)->update($data);
    }

    public function deleteSection(string $id): bool
    {
        $section = CourseSection::findOrFail($id);

        // Delete each lesson through the service so WatchHistory is properly cleaned up.
        // DB cascade would silently delete lessons without touching WatchHistory.
        $lessonIds = SectionLesson::ofSection($id)->pluck('id');
        foreach ($lessonIds as $lessonId) {
            $this->deleteSectionLesson((string) $lessonId);
        }

        return $section->delete();
    }

    public function sortSections(array $sortedData): bool
    {
        foreach ($sortedData as $value) {
            CourseSection::where('id', $value['id'])
                ->update(['sort' => $value['sort']]);
        }

        return true;
    }

    public function createSectionLesson(array $data, string $user_id): SectionLesson
    {
        $lesson = SectionLesson::create($data);

        $this->lessonHandler($lesson, $data);

        $this->initWatchHistory($data['course_id'], 'lesson', $user_id);

        return $lesson;
    }

    public function updateSectionLesson(string $id, array $data): SectionLesson
    {
        $lesson = SectionLesson::findOrFail($id);

        $this->lessonHandler($lesson, $data);

        return $lesson;
    }

    public function deleteSectionLesson(string $id): bool
    {
        $lesson = SectionLesson::findOrFail($id);

        $lesson_id = $lesson->id;
        $course_id = $lesson->course_id;
        $lesson_sort = $lesson->sort;
        $course_section_id = $lesson->course_section_id;

        // Get the current section to get its sort order
        $currentSection = CourseSection::findOrFail($course_section_id);

        if ($lesson->lesson_type === 'video') {
            $chunkedUpload = $lesson->chunked_upload_id
                ? ChunkedUpload::find($lesson->chunked_upload_id)
                : null;
            $chunkedUpload && $this->deleteVideoUpload($chunkedUpload);
        } elseif ($lesson->lesson_src) {
            $chunkedUpload = ChunkedUpload::where('file_url', $lesson->lesson_src)->first();
            $chunkedUpload && $this->uploaderService->deleteFile($chunkedUpload);
        }

        /** @var LessonResource $resource */
        foreach ($lesson->resources()->get() as $resource) {
            $chunkedUpload = ChunkedUpload::where('file_url', $resource->resource)->first();
            $chunkedUpload && $this->uploaderService->deleteFile($chunkedUpload);
        }

        $lesson->delete();
        $lessons = SectionLesson::ofCourse($course_id)->get();

        if ($lessons->count() <= 0) {
            WatchHistory::ofCourse($course_id)->delete();

            return true;
        }

        // Get all watch histories for this course
        $histories = WatchHistory::ofCourse($course_id)->get();

        foreach ($histories as $history) {
            if ($history) {
                $updateNeeded = false;

                // 1. Remove from completed_watching if exists
                $completedWatching = $history->completed_watching ?? [];
                $originalCount = count($completedWatching);
                $completedWatching = array_filter($completedWatching, function ($item) use ($lesson_id) {
                    return $item['id'] != $lesson_id;
                });

                if (count($completedWatching) !== $originalCount) {
                    $history->completed_watching = ! empty($completedWatching) ? array_values($completedWatching) : null;
                    $updateNeeded = true;
                }

                // 2. Handle current_watching_id and next_watching_id updates
                if ($history->current_watching_id == $lesson_id) {
                    // First try to find the next lesson in the same section
                    $nextLesson = SectionLesson::ofSection($course_section_id)
                        ->where('sort', '>', $lesson_sort)
                        ->ordered()
                        ->first();

                    // If no next lesson in same section, try first lesson in next section
                    if (! $nextLesson && $currentSection) {
                        $nextSection = CourseSection::ofCourse($course_id)
                            ->where('sort', '>', $currentSection->sort)
                            ->ordered()
                            ->first();

                        if ($nextSection) {
                            $nextLesson = SectionLesson::ofSection($nextSection->id)
                                ->ordered()
                                ->first();
                        }
                    }

                    // If still no next lesson, try previous lesson in same section
                    if (! $nextLesson) {
                        $nextLesson = SectionLesson::ofSection($course_section_id)
                            ->where('sort', '<', $lesson_sort)
                            ->orderBy('sort', 'desc')
                            ->first();
                    }

                    // If still no lesson found, try any lesson in the course
                    if (! $nextLesson) {
                        $nextLesson = SectionLesson::ofCourse($course_id)
                            ->where('id', '!=', $lesson_id)
                            ->ordered()
                            ->first();
                    }

                    if ($nextLesson) {
                        $history->current_watching_id = $nextLesson->id;
                        $history->current_watching_type = 'lesson';
                        $history->current_section_id = $nextLesson->course_section_id;
                    } else {
                        $history->current_watching_id = null;
                        $history->current_watching_type = null;
                        $history->current_section_id = null;
                    }
                    $updateNeeded = true;
                }

                // 3. Update next_watching_id if it matches the deleted lesson
                if ($history->next_watching_id == $lesson_id) {
                    // First try to find next lesson in sort order
                    $nextLesson = SectionLesson::ofCourse($course_id)
                        ->where('sort', '>', $lesson_sort)
                        ->ordered()
                        ->first();

                    // If no next lesson, try previous lesson
                    if (! $nextLesson) {
                        $nextLesson = SectionLesson::ofCourse($course_id)
                            ->where('sort', '<', $lesson_sort)
                            ->orderBy('sort', 'desc')
                            ->first();
                    }

                    // If still no lesson found, try any lesson in the course
                    if (! $nextLesson) {
                        $nextLesson = SectionLesson::ofCourse($course_id)
                            ->where('id', '!=', $lesson_id)
                            ->ordered()
                            ->first();
                    }

                    if ($nextLesson) {
                        $history->next_watching_id = $nextLesson->id;
                        $history->next_watching_type = 'lesson';
                    } else {
                        $history->next_watching_id = null;
                        $history->next_watching_type = null;
                    }
                    $updateNeeded = true;
                }

                // 4. Update prev_watching_id if it matches the deleted lesson
                if ($history->prev_watching_id == $lesson_id && $history->prev_watching_type === 'lesson') {
                    // Find the lesson before the deleted one
                    $prevLesson = SectionLesson::ofCourse($course_id)
                        ->where('sort', '<', $lesson_sort)
                        ->orderBy('sort', 'desc')
                        ->first();

                    if ($prevLesson) {
                        $history->prev_watching_id = $prevLesson->id;
                        $history->prev_watching_type = 'lesson';
                    } else {
                        // If no previous lesson, set to null
                        $history->prev_watching_id = null;
                        $history->prev_watching_type = null;
                    }
                    $updateNeeded = true;
                }

                if ($updateNeeded) {
                    $history->save();
                }
            }
        }

        return true;
    }

    public function sortSectionLessons(array $sortedData): bool
    {
        foreach ($sortedData as $value) {
            SectionLesson::where('id', $value['id'])->update([
                'sort' => $value['sort'],
            ]);
        }

        return true;
    }

    private function lessonHandler(SectionLesson $lesson, array $data): SectionLesson
    {
        $updatedLesson = $data;

        switch ($data['lesson_type']) {
            case 'image':
            case 'document':
                if (array_key_exists('lesson_src_new', $data) && $data['lesson_src_new']) {
                    $embedCode = '<iframe src="'.$data['lesson_src_new'].'" width="100%" height="500" frameborder="0" allowfullscreen></iframe>';

                    $chunkedUpload = ChunkedUpload::where('file_url', $lesson->lesson_src)->first();
                    $chunkedUpload && $this->uploaderService->deleteFile($chunkedUpload);

                    $updatedLesson = [
                        ...$updatedLesson,
                        'lesson_src' => $data['lesson_src_new'],
                        'embed_source' => $embedCode,
                    ];
                }

                break;

            case 'video':
                // Video files are private (see LocalFileUploadService) — never
                // reachable at a public URL, so lesson_src stays null and the
                // upload is referenced by id (see LessonVideoUrlResolver).
                // chunked_upload_id_new (mirroring lesson_src_new) only carries
                // a value when a fresh file was just uploaded — an edit that
                // doesn't touch the video must never re-delete/replace it.
                if (array_key_exists('chunked_upload_id_new', $data) && $data['chunked_upload_id_new']) {
                    $oldUpload = $lesson->chunked_upload_id
                        ? ChunkedUpload::find($lesson->chunked_upload_id)
                        : null;
                    $oldUpload && $this->deleteVideoUpload($oldUpload);

                    $updatedLesson = [
                        ...$updatedLesson,
                        'chunked_upload_id' => $data['chunked_upload_id_new'],
                        'lesson_src' => null,
                    ];
                }

                break;

                // case 'video_url':
                //    $safeUrl = htmlspecialchars($data['lesson_src'], ENT_QUOTES, 'UTF-8');

                //    $updatedLesson = [
                //       ...$updatedLesson,
                //       'lesson_src' => $safeUrl,
                //    ];
                //    break;

            case 'embed':
                $updatedLesson = [
                    ...$updatedLesson,
                    'lesson_src' => $data['embed_source'],
                ];

                break;

            default:
                $updatedLesson = $data;

                break;
        }

        $lesson->update($updatedLesson);

        return $lesson;
    }

    public function initWatchHistory(string $course_id, string $watching_type, string $user_id): ?WatchHistory
    {
        $lessonQuery = SectionLesson::ofCourse($course_id);
        $history = WatchHistory::ofCourse($course_id)
            ->ofUser($user_id)
            ->first();

        if (! $history) {
            if ($lessonQuery->count() > 0) {
                $lesson = $lessonQuery->ordered()->first();
                $coursePlay = app(CoursePlayerService::class);
                $course = Course::findOrFail($course_id);

                return $coursePlay->watchHistory($course, $lesson->id, 'lesson', $user_id);
            }

            return null;
        }

        // Guard against stale watch history where current_watching_id points to a deleted item
        if ($history->current_watching_id) {
            $currentItemExists = $history->current_watching_type === 'quiz'
                ? SectionQuiz::find($history->current_watching_id) !== null
                : SectionLesson::find($history->current_watching_id) !== null;

            if (! $currentItemExists) {
                $firstLesson = $lessonQuery->ordered()->first();

                if ($firstLesson) {
                    $coursePlay = app(CoursePlayerService::class);
                    $course = Course::findOrFail($course_id);

                    return $coursePlay->watchHistory($course, $firstLesson->id, 'lesson', $user_id);
                }

                $history->delete();

                return null;
            }
        }

        return $history;
    }

    /**
     * Extract YouTube video ID from URL
     */
    protected function extractYouTubeVideoId(string $url): ?string
    {
        $pattern = '/(youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/';

        if (preg_match($pattern, $url, $matches)) {
            return $matches[2];
        }

        return null;
    }
}
