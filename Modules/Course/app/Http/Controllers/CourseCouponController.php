<?php

namespace Modules\Course\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Modules\Course\Http\Requests\CourseCouponRequest;
use Modules\Course\Models\CourseCoupon;
use Modules\Course\Services\CourseCouponService;
use Modules\Course\Services\CourseService;

class CourseCouponController extends Controller
{
    public function __construct(
        private CourseService $course,
        private CourseCouponService $courseCoupon
    ) {}

    /**
     * Display a listing of coupons
     */
    public function index(Request $request): Response
    {
        $courses = $this->course->getCourses([...$request->all(), 'status' => 'approved', 'select' => 'id,title']);
        $coupons = $this->courseCoupon->getCouponsList([...$request->all(), 'paginate' => true]);

        return Inertia::render('Course/dashboard/coupons/index', [
            'courses' => $courses,
            'coupons' => $coupons,
        ]);
    }

    /**
     * Store a newly created coupon
     */
    public function store(CourseCouponRequest $request)
    {
        $this->courseCoupon->createCoupon($request->validated());

        return redirect()
            ->route('course-coupons.index')
            ->with('success', 'Coupon created successfully.');
    }

    /**
     * Update the specified coupon
     */
    public function update(CourseCouponRequest $request, CourseCoupon $coupon)
    {
        $this->courseCoupon->updateCoupon($coupon->id, $request->validated());

        return redirect()
            ->route('course-coupons.index')
            ->with('success', 'Coupon updated successfully.');
    }

    /**
     * Remove the specified coupon
     */
    public function destroy(CourseCoupon $coupon)
    {
        $this->courseCoupon->deleteCoupon($coupon->id);

        return redirect()
            ->route('course-coupons.index')
            ->with('success', 'Coupon deleted successfully.');
    }

    /**
     * Verify a coupon code
     */
    public function verify(Request $request)
    {
        $request->validate([
            'code' => 'required|string',
            'course_id' => 'nullable|exists:courses,id',
        ]);

        $coupon = $this->courseCoupon->verifyCoupon($request->code, $request->course_id);

        if (! $coupon) {
            return response()->json([
                'valid' => false,
                'message' => 'Invalid coupon code.',
            ], 404);
        }

        if (! $coupon->isValid()) {
            return response()->json([
                'valid' => false,
                'message' => 'Coupon is not valid or has expired.',
            ], 400);
        }

        return response()->json([
            'valid' => true,
            'coupon' => $coupon,
        ]);
    }
}
