<?php

namespace Modules\Course\Services;

use App\Models\Instructor;
use App\Models\User;
use App\Services\MediaService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Modules\Course\Models\Course;
use Modules\Course\Models\CourseEnrollment;
use Modules\Course\Models\CourseSection;
use Modules\Course\Notifications\CourseApprovalNotification;

class CourseService extends MediaService
{
    public function getCheckoutCourse(string $id): Course
    {
        return Course::where('id', $id)->first();
    }

    public function createCourse(array $data): Course
    {
        $slug = getModelUniqueSlug(Course::class, $data['title']);
        $course = Course::create(array_merge($data, [
            'slug' => $slug,
            'user_id' => Auth::user()->id,
            'course_type' => 'general',
        ]));

        if (array_key_exists('thumbnail', $data) && $data['thumbnail']) {
            $course->update([
                'thumbnail' => $this->addNewDeletePrev($course, $data['thumbnail'], 'thumbnail'),
            ]);
        }

        return $course;
    }

    public function updateCourse(string $id, array $data): ?Course
    {
        $course = Course::findOrFail($id);

        switch ($data['tab']) {
            case 'basic':
                $slug = Str::slug($data['title']);
                $course->update(array_merge($data, ['slug' => $slug]));
                break;

            case 'pricing':
                $course->update($data);
                break;

            case 'info':
                $course->update($data);
                break;

            case 'media':
                $media = ['preview' => $data['preview']];

                if (array_key_exists('banner', $data) && $data['banner']) {
                    $media['banner'] = $this->addNewDeletePrev($course, $data['banner'], 'banner');
                }

                if (array_key_exists('thumbnail', $data) && $data['thumbnail']) {
                    $media['thumbnail'] = $this->addNewDeletePrev($course, $data['thumbnail'], 'thumbnail');
                }

                $course->update($media);
                break;

            case 'seo':
                $course->update($data);
                break;

            case 'status':
                $course->update($data);

                if (array_key_exists('feedback', $data) && $data['feedback']) {
                    $instructor = Instructor::findOrFail($course->instructor_id);
                    $user = User::findOrFail($instructor->user_id);

                    $user->notify(new CourseApprovalNotification($course, $data));
                }

                break;

            case 'default':
                $course->update($data);
                break;
        }

        return $course;
    }

    public function getCourses(array $data): LengthAwarePaginator|Collection
    {
        $user = Auth::user();
        $pageNumber = array_key_exists('courses_page', $data) ? intval($data['courses_page']) : 1;
        $perPage = array_key_exists('courses_per_page', $data) ? intval($data['courses_per_page']) : 10;

        $courses = Course::searchWhen('title', $data, 'courses_search')
            ->when(array_key_exists('select', $data), function ($query) use ($data) {
                $columns = is_array($data['select']) ? $data['select'] : explode(',', $data['select']);

                return $query->select($columns);
            })
            ->when(array_key_exists('relations', $data), function ($query) use ($data) {
                return $query->with($data['relations']);
            })
            ->when(array_key_exists('reviews_count', $data) && $data['reviews_count'], function ($query) {
                return $query->withCount('reviews');
            })
            ->when(array_key_exists('enrollments_count', $data) && $data['enrollments_count'], function ($query) {
                return $query->withCount('enrollments');
            })
            ->when(array_key_exists('assignments_count', $data) && $data['assignments_count'], function ($query) {
                return $query->withCount('assignments');
            })
            ->when(array_key_exists('average_rating', $data) && $data['average_rating'], function ($query) {
                return $query->withAvg('reviews as average_rating', 'rating');
            })
            ->when(array_key_exists('lessons_duration', $data) && $data['lessons_duration'], function ($query) {
                return $query->addSelect(DB::raw('(SELECT SUM(TIME_TO_SEC(`duration`)) FROM `section_lessons` WHERE `section_lessons`.`course_id` = `courses`.`id`) as lessons_duration'));
            })
            ->when(array_key_exists('category', $data) && $data['category'] !== 'all', function ($query) use ($data) {
                return $query->inCategory($data['category']);
            })
            ->when(array_key_exists('category_child', $data) && $data['category_child'] && $data['category_child'] !== 'all', function ($query) use ($data) {
                return $query->inCategoryChild($data['category_child']);
            })
            ->when(array_key_exists('status', $data) && $data['status'] !== 'all', function ($query) use ($data) {
                return $query->where('status', $data['status']);
            })
            ->when(array_key_exists('level', $data) && $data['level'] !== 'all', function ($query) use ($data) {
                return $query->where('level', $data['level']);
            })
            ->when(array_key_exists('mode', $data) && $data['mode'] !== null, function ($query) use ($data) {
                return $query->where('mode', $data['mode']);
            })
            ->when(array_key_exists('price', $data) && $data['price'] !== 'all', function ($query) use ($data) {
                return $query->where('pricing_type', $data['price']);
            })
            ->when(array_key_exists('language', $data) && $data['language'] !== 'all', function ($query) use ($data) {
                return $query->where('language', $data['language']);
            })
            ->when(array_key_exists('instructor_id', $data) && $data['instructor_id'], function ($query) use ($data) {
                return $query->where('instructor_id', $data['instructor_id']);
            });

        if (array_key_exists('paginate', $data) && $data['paginate']) {
            return $courses->paginate($perPage, ['*'], 'courses_page', $pageNumber);
        }

        return $courses->get();
    }

    public function getEditCourseById(string $id): ?Course
    {
        $course = Course::where('id', $id)
            ->withCount('enrollments')
            ->with([
                // Info tab: faqs, outcomes, requirements
                'faqs:id,course_id,question,answer',
                'outcomes:id,course_id,outcome',
                'requirements:id,course_id,requirement',

                // Basic tab & live-class tab: instructor name
                'instructor:id,user_id',
                'instructor.user:id,name',

                // Live-class tab
                'live_classes:id,course_id,class_topic,class_date_and_time,class_note',

                // Assignment tab
                'assignments' => function ($query) {
                    $query->withCount('submissions');
                },

                // Curriculum tab
                'sections' => function ($query) {
                    $query->select(['id', 'course_id', 'title', 'sort'])->with([
                        'section_lessons',
                        'section_lessons.resources',
                        'section_quizzes' => function ($query) {
                            $query->with('quiz_questions:id,section_quiz_id,title,type,options,answer,sort')
                                ->reorder('created_at', 'asc');
                        },
                    ]);
                },
            ])
            ->first();

        return $course;
    }

    public function getPlayCourseById(string $id, User $user): ?Course
    {
        $course = Course::where('id', $id)
            ->select(['id', 'title', 'slug', 'drip_content', 'instructor_id'])
            ->with([
                'instructor:id,user_id',
                'instructor.user:id',
                'live_classes:id,course_id,class_topic,class_date_and_time,class_date_and_time,class_note,additional_info',
                'sections' => function ($query) use ($user) {
                    $query->select(['id', 'course_id', 'title'])->with([
                        'section_lessons:id,course_section_id,title,lesson_type,duration',
                        'section_lessons.resources:id,title,resource',
                        'section_quizzes' => function ($quizzes) use ($user) {
                            $quizzes->with([
                                'quiz_questions' => function ($questions) use ($user) {
                                    $questions->with(['answers' => function ($answers) use ($user) {
                                        $answers->when($user, function ($query) use ($user) {
                                            $query->ofUser($user->id)->latest()->limit(1);
                                        });
                                    }]);
                                },
                                'quiz_submissions' => function ($submissions) use ($user) {
                                    $submissions->when($user, function ($query) use ($user) {
                                        $query->ofUser($user->id)->latest()->limit(1);
                                    });
                                },
                            ]);
                        },
                    ]);
                },
            ])
            ->first();

        return $course;
    }

    public function getGuestCourseById(string $id): Course
    {
        $course = Course::where('id', $id)
            ->withCount('enrollments')
            ->withAvg('reviews as average_rating', 'rating')
            ->with([
                'faqs' => function ($query) {
                    $query->select(['id', 'course_id', 'question', 'answer']);
                },
                'outcomes' => function ($query) {
                    $query->select(['id', 'course_id', 'outcome']);
                },
                'requirements' => function ($query) {
                    $query->select(['id', 'course_id', 'requirement']);
                },
                'sections' => function ($query) {
                    $query->select(['id', 'course_id', 'title'])
                        ->with([
                            'section_lessons' => function ($query) {
                                $query->select(['id', 'course_section_id', 'course_id', 'title', 'lesson_type']);
                            },
                            'section_quizzes' => function ($query) {
                                $query->select(['id', 'course_section_id', 'title', 'duration']);
                            },
                        ]);
                },
                'instructor' => function ($query) {
                    $query->select(['id', 'user_id'])
                        ->with([
                            'user' => function ($query) {
                                $query->select(['id', 'name', 'email', 'photo']);
                            },
                            'courses' => function ($query) {
                                $query->select(['id', 'instructor_id'])
                                    ->withCount('enrollments');
                            },
                        ])
                        ->selectRaw('(SELECT COUNT(*) FROM course_reviews
                     INNER JOIN courses ON course_reviews.course_id = courses.id
                     WHERE courses.instructor_id = instructors.id) as reviews_count')
                        ->selectRaw('(SELECT AVG(rating) FROM course_reviews
                     INNER JOIN courses ON course_reviews.course_id = courses.id
                     WHERE courses.instructor_id = instructors.id) as average_rating')
                        ->selectRaw('(SELECT COUNT(DISTINCT user_id) FROM course_enrollments
                     INNER JOIN courses ON course_enrollments.course_id = courses.id
                     WHERE courses.instructor_id = instructors.id) as enrollments_count');
                },
            ])
            ->addSelect(DB::raw('(SELECT SUM(TIME_TO_SEC(`duration`)) FROM `section_lessons` WHERE `section_lessons`.`course_id` = `courses`.`id`) as lessons_duration'))
            ->first();

        return $course;
    }

    public function getCourseEnrollment(array $data): ?CourseEnrollment
    {
        $user = Auth::user();
        if ($user) {
            $enrollment = CourseEnrollment::ofCourse($data['course_id'])
                ->ofUser($user->id)
                ->when(array_key_exists('select', $data), function ($query) use ($data) {
                    $columns = is_array($data['select']) ? $data['select'] : explode(',', $data['select']);

                    return $query->select($columns);
                })
                ->when(array_key_exists('relations', $data), function ($query) use ($data) {
                    return $query->with($data['relations']);
                })
                ->first();

            return $enrollment;
        } else {
            return null;
        }
    }

    public function deleteCourse(string $id): void
    {
        $course = Course::findOrFail($id);
        $course->delete();
    }

    /**
     * Validate if a course is ready for approval based on content completeness
     *
     * @param  Course  $course  The course object to validate
     * @return array Contains validation result with counts and approval status
     */
    public function validateCourseForApproval(Course $course): array
    {
        // Initialize counts
        $sectionsCount = 0;
        $lessonsCount = 0;
        $quizzesCount = 0;
        $totalContent = 0;

        // Check if course has required basic information
        $hasThumbnail = ! empty($course->thumbnail);

        // Calculate content counts if sections are loaded
        if ($course->sections) {
            $sectionsCount = $course->sections->count();

            // Get lessons count
            $lessonsCount = $course->sections->reduce(function ($carry, $section) {
                /** @var CourseSection $section */
                return $carry + ($section->section_lessons ? $section->section_lessons->count() : 0);
            }, 0);

            // Get quizzes count
            $quizzesCount = $course->sections->reduce(function ($carry, $section) {
                /** @var CourseSection $section */
                return $carry + ($section->section_quizzes ? $section->section_quizzes->count() : 0);
            }, 0);

            $totalContent = $sectionsCount + $lessonsCount;
        }

        // Define minimum requirements for approval
        $minSections = 1;
        $minLessons = 1;
        $minTotalContent = 2; // At least 2 content items (lessons + quizzes)

        // Check if content meets minimum requirements
        $hasMinSections = $sectionsCount >= $minSections;
        $hasMinLessons = $lessonsCount >= $minLessons;
        $hasMinContent = $totalContent >= $minTotalContent;

        // Check if course has outcomes and requirements
        $hasOutcomes = $course->outcomes && $course->outcomes->count() > 0;
        $hasRequirements = $course->requirements && $course->requirements->count() > 0;

        // Determine if the course is ready for approval
        $isReadyForApproval =
            $hasThumbnail &&
            $hasMinSections &&
            $hasMinContent &&
            $hasOutcomes &&
            $hasRequirements;

        // Build validation result
        $validationMessages = [];
        if (! $hasThumbnail) {
            $validationMessages[] = 'Course thumbnail is missing';
        }
        if (! $hasMinSections) {
            $validationMessages[] = "Course needs at least {$minSections} section";
        }
        if (! $hasMinLessons) {
            $validationMessages[] = "Course needs at least {$minLessons} lesson";
        }
        if (! $hasMinContent) {
            $validationMessages[] = "Course needs at least {$minTotalContent} content items (sections + section_lessons)";
        }
        if (! $hasOutcomes) {
            $validationMessages[] = 'Course outcomes are missing';
        }
        if (! $hasRequirements) {
            $validationMessages[] = 'Course requirements are missing';
        }

        return [
            'approve_able' => $isReadyForApproval,
            'counts' => [
                'sections_count' => $sectionsCount,
                'lessons_count' => $lessonsCount,
                'quizzes_count' => $quizzesCount,
                'total_content_count' => $totalContent,
            ],
            'has_requirements' => [
                'thumbnail' => $hasThumbnail,
                'min_sections' => $hasMinSections,
                'min_lessons' => $hasMinLessons,
                'min_content' => $hasMinContent,
                'outcomes' => $hasOutcomes,
                'requirements' => $hasRequirements,
            ],
            'validation_messages' => $validationMessages,
        ];
    }
}
