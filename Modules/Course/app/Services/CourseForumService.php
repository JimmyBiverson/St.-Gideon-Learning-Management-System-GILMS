<?php

namespace Modules\Course\Services;

use App\Models\User;
use App\Notifications\ForumNotification;
use App\Services\MediaService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Arr;
use Modules\Course\Models\Course;
use Modules\Course\Models\CourseForum;
use Modules\Course\Models\CourseForumReply;

class CourseForumService extends MediaService
{
    public function getForums(array $data, bool $paginate = false): LengthAwarePaginator|Collection
    {
        $page = array_key_exists('per_page', $data) ? intval($data['per_page']) : 10;

        $courses = CourseForum::ofCourse($data['course_id'])
            ->when(array_key_exists('search', $data), function ($query) use ($data) {
                return $query->where('title', 'LIKE', '%'.$data['search'].'%');
            })
            ->latest();

        if ($paginate) {
            return $courses->paginate($page);
        }

        return $courses->get();
    }

    public function getForumById(string $id): ?CourseForum
    {
        return CourseForum::withRelatedData()->find($id);
    }

    public function createForum(array $data): CourseForum
    {
        $forum = CourseForum::create($data);

        if (User::findOrFail($data['user_id'])->role == 'student') {
            $this->notifyInstructor($data);
        }

        return $forum;
    }

    public function createForumReply(array $data): CourseForumReply
    {
        $replyData = Arr::except($data, 'course_forum_user_id');
        $reply = CourseForumReply::create($replyData);

        $this->notifyInstructor([...$data, 'title' => 'reply']);

        return $reply;
    }

    public function updateForum(string $id, array $data): CourseForum
    {
        $forum = CourseForum::findOrFail($id);
        $forum->update($data);

        return $forum;
    }

    public function updateForumReply(string $id, array $data): CourseForumReply
    {
        $reply = CourseForumReply::findOrFail($id);
        $reply->update($data);

        return $reply;
    }

    public function deleteForum(string $id): void
    {
        CourseForum::findOrFail($id)->delete();
    }

    public function deleteForumReply(string $id): void
    {
        CourseForumReply::findOrFail($id)->delete();
    }

    private function notifyInstructor(array $data): void
    {
        $course = Course::findOrFail($data['course_id']);

        if (array_key_exists('course_forum_user_id', $data) && $data['user_id'] == $course->instructor->user_id) {
            $user = User::findOrFail($data['course_forum_user_id']);

            $user->notify(new ForumNotification($data));
        } else {
            $instructor = User::findOrFail($course->instructor->user_id);

            $instructor->notify(new ForumNotification($data));
        }
    }
}
