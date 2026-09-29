<?php

namespace Modules\Frontend\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\InstructorService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Modules\Blog\Services\BlogService;
use Modules\Course\Services\CourseCategoryService;
use Modules\Course\Services\CourseService;
use Modules\Exam\Services\ExamService;
use Modules\Frontend\Models\FrontendCollection;

class FrontendCollectionController extends Controller
{
    public function __construct(
        private ExamService $exam,
        private BlogService $blog,
        private CourseService $course,
        private InstructorService $instructor,
        private CourseCategoryService $courseCategory,
    ) {}

    /**
     * Get all collections
     * GET /api/collections
     */
    public function index(Request $request)
    {
        // Load collection data for each type
        $collections = [];
        $types = ['courses', 'exams', 'blogs', 'instructors', 'course_categories', 'exam_categories', 'blog_categories', 'testimonials', 'sponsors'];

        foreach ($types as $type) {
            $collection = FrontendCollection::where('type', $type)->first();

            if ($collection) {
                // Testimonials and sponsors don't have 'best', only 'top' and 'new'
                if ($type === 'testimonials' || $type === 'sponsors') {
                    $collections[$type] = [
                        'top' => $collection->top ?? [],
                        'new' => $collection->new ?? [],
                    ];
                } else {
                    $collections[$type] = [
                        'best' => $collection->getBestData(),
                        'top' => $collection->getTopData(),
                        'new' => $collection->getNewData(),
                        'featured' => $collection->getFeaturedData(),
                    ];
                }
            }
        }

        $data['courses'] = $this->course->getCourses(array_merge($request->all(), [
            'status' => 'approved',
            'select' => 'id,title',
            'enrollments_count' => true,
            'average_rating' => true,
            'paginate' => true,
        ]));
        $data['exams'] = $this->exam->getAllExams(array_merge($request->all(), [
            'status' => 'published',
            'select' => 'id,title',
            'relations' => ['instructor:id,user_id', 'instructor.user:id,name,email'],
            'paginate' => true,
        ]));
        $data['blogs'] = $this->blog->getBlogs(array_merge($request->all(), [
            'paginate' => true,
            'relations' => ['user:id,name,email'],
            'select' => 'id,title,user_id',
        ]));
        $data['instructors'] = $this->instructor->getInstructors(array_merge($request->all(), [
            'courses_count' => true,
            'reviews_count' => true,
            'average_rating' => true,
            'enrollments_count' => true,
            'relations' => ['user:id,name,email,photo'],
            'paginate' => true,
        ]));
        $data['course_categories'] = $this->courseCategory->getCategories(array_merge($request->all(), [
            'default' => false,
            'courses_count' => true,
            'select' => 'id,title',
            'paginate' => true,
        ]));

        return Inertia::render('Frontend/api/index', [
            'collections' => $collections,
            ...$data,
        ]);
    }

    public function seeder()
    {
        return Inertia::render('Frontend/api/seeder');
    }

    /**
     * Get collection data by type and category
     * GET /api/collections/{type}/{category}
     * Example: /api/collections/courses/best
     */
    public function show(string $type, string $category)
    {
        $collection = FrontendCollection::where('type', $type)->first();

        if (! $collection) {
            return response()->json([
                'success' => false,
                'message' => "Collection not found for type: {$type}",
            ], 404);
        }

        $methodName = 'get' . ucfirst($category) . 'Data';

        if (! method_exists($collection, $methodName)) {
            return response()->json([
                'success' => false,
                'message' => "Invalid category: {$category}",
            ], 400);
        }

        $data = $collection->$methodName();

        return response()->json([
            'success' => true,
            'collection' => $data,
            'ids' => $collection->$category,
        ]);
    }

    /**
     * Update collection data by type and category
     * PUT/PATCH /api/collections/{type}/{category}
     * Body: { "id": 1 } for best, { "ids": [1,2,3] } for top/new/etc
     *
     * Also handles remove action from frontend API page
     * PUT /frontend/api
     * Body: { "type": "courses", "category": "best", "item_id": 1, "action": "remove" }
     */
    public function update(Request $request, ?string $type = null, ?string $category = null)
    {
        // Handle frontend API page insert action
        if ($request->has('action') && $request->action === 'insert') {
            $type = $request->type;
            $category = $request->category;

            // For testimonials and sponsors, use item_data; for others, use item_id
            if ($type === 'testimonials') {
                $validator = Validator::make($request->all(), [
                    'type' => 'required|string',
                    'category' => 'required|string|in:top,new',
                    'item_data' => 'required|array',
                    'item_data.name' => 'required|string',
                    'item_data.image' => 'nullable|string',
                    'item_data.rating' => 'required|integer|min:1|max:5',
                    'item_data.description' => 'required|string',
                ]);

                if ($validator->fails()) {
                    return back()->withErrors($validator->errors());
                }

                $itemData = $request->item_data;
            } elseif ($type === 'sponsors') {
                $validator = Validator::make($request->all(), [
                    'type' => 'required|string',
                    'category' => 'required|string|in:top,new',
                    'item_data' => 'required|array',
                    'item_data.image' => 'required|string',
                    'item_data.url' => 'required|url',
                ]);

                if ($validator->fails()) {
                    return back()->withErrors($validator->errors());
                }

                $itemData = $request->item_data;
            } else {
                $validator = Validator::make($request->all(), [
                    'type' => 'required|string',
                    'category' => 'required|string|in:best,top,new,featured,trending,popular',
                    'item_id' => 'required',
                ]);

                if ($validator->fails()) {
                    return back()->withErrors($validator->errors());
                }

                $itemId = $request->item_id;
            }

            $collection = FrontendCollection::where('type', $type)->first();

            if (! $collection) {
                return back()->with('error', "Collection not found for type: {$type}");
            }

            if ($type === 'testimonials' || $type === 'sponsors') {
                // For testimonials and sponsors, add the entire object to the array
                $currentItems = $collection->$category ?? [];
                $currentItems[] = $itemData;
                $collection->$category = $currentItems;
            } else {
                // For other types, handle ID-based collections
                if ($category === 'best') {
                    $collection->best = $itemId;
                } else {
                    $currentIds = $collection->$category ?? [];
                    if (! in_array($itemId, $currentIds)) {
                        $currentIds[] = $itemId;
                        $collection->$category = $currentIds;
                    }
                }
            }

            $collection->save();

            return back()->with('success', 'Item added to collection successfully');
        }

        // Handle frontend API page remove action
        if ($request->has('action') && $request->action === 'remove') {
            $validator = Validator::make($request->all(), [
                'type' => 'required|string',
                'category' => 'required|string|in:best,top,new,featured,trending,popular',
                'item_id' => 'required',
            ]);

            if ($validator->fails()) {
                return back()->withErrors($validator->errors());
            }

            $type = $request->type;
            $category = $request->category;
            $itemId = $request->item_id;

            $collection = FrontendCollection::where('type', $type)->first();

            if (! $collection) {
                return back()->with('error', "Collection not found for type: {$type}");
            }

            if ($type === 'testimonials' || $type === 'sponsors') {
                // For testimonials and sponsors, item_id is the array index
                $currentItems = $collection->$category ?? [];
                if (isset($currentItems[$itemId])) {
                    unset($currentItems[$itemId]);
                    $collection->$category = array_values($currentItems); // Re-index array
                }
            } else {
                // For other types, handle ID-based collections
                if ($category === 'best') {
                    $collection->best = null;
                } else {
                    $currentIds = $collection->$category ?? [];
                    $currentIds = array_values(array_filter($currentIds, fn($id) => $id != $itemId));
                    $collection->$category = $currentIds;
                }
            }

            $collection->save();

            return back()->with('success', 'Item removed from collection successfully');
        }

        // Original update logic for API routes
        $collection = FrontendCollection::where('type', $type)->first();

        if (! $collection) {
            return response()->json([
                'success' => false,
                'message' => "Collection not found for type: {$type}",
            ], 404);
        }

        // Validate based on category type
        if ($category === 'best') {
            $validator = Validator::make($request->all(), [
                'id' => 'required',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors(),
                ], 422);
            }

            $collection->best = (string) $request->id;
        } else {
            $validator = Validator::make($request->all(), [
                'ids' => 'required|array',
                'ids.*' => 'integer',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors(),
                ], 422);
            }

            $collection->$category = $request->ids;
        }

        $collection->save();

        return response()->json([
            'success' => true,
            'message' => 'Collection updated successfully',
            'collection' => $collection,
        ]);
    }

    /**
     * Toggle ID in collection (add if not exists, remove if exists)
     * POST /api/collections/{type}/{category}/toggle
     * Body: { "id": 1 }
     */
    public function toggle(Request $request, string $type, string $category)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $collection = FrontendCollection::where('type', $type)->first();

        if (! $collection) {
            return response()->json([
                'success' => false,
                'message' => "Collection not found for type: {$type}",
            ], 404);
        }

        $id = $request->id;

        if ($category === 'best') {
            // For best, just set or unset
            if ($collection->best == $id) {
                $collection->best = null;
                $action = 'removed';
            } else {
                $collection->best = $id;
                $action = 'added';
            }
        } else {
            // For arrays (top, new, etc.)
            $currentIds = $collection->$category ?? [];

            if (in_array($id, $currentIds)) {
                // Remove ID
                $currentIds = array_values(array_filter($currentIds, fn($item) => $item != $id));
                $action = 'removed';
            } else {
                // Add ID
                $currentIds[] = $id;
                $action = 'added';
            }

            $collection->$category = $currentIds;
        }

        $collection->save();

        return response()->json([
            'success' => true,
            'message' => "ID {$action} successfully",
            'collection' => $collection,
        ]);
    }

    /**
     * Store page data as JSON file
     * POST /api/store-page/{slug}
     * Body: { "pageData": [...] }
     */
    public function storePage(Request $request, string $slug)
    {
        $validator = Validator::make($request->all(), [
            'pageData' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            // Ensure the directory exists
            $directory = storage_path('app/page-data');
            if (! file_exists($directory)) {
                mkdir($directory, 0755, true);
            }

            // Create the file path
            $filePath = $directory . '/' . $slug . '.json';

            // Convert page data to JSON
            $jsonData = json_encode($request->pageData, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

            // Save to file
            file_put_contents($filePath, [$jsonData]);

            return response()->json([
                'success' => true,
                'message' => "Page data for '{$slug}' saved successfully",
                'file_path' => $filePath,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to save page data',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
