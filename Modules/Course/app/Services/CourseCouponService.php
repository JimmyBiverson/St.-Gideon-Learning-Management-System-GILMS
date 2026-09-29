<?php

namespace Modules\Course\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Course\Models\CourseCoupon;

class CourseCouponService
{
    public function getCourseValidCoupon(string $courseId, string $code): ?CourseCoupon
    {
        return CourseCoupon::where('code', $code)
            ->where(function ($q) use ($courseId) {
                $q->where('course_id', $courseId)
                    ->orWhereNull('course_id');
            })
            ->isValid()
            ->first();
    }

    public function getCourseValidCoupons(string $courseId): Collection
    {
        return CourseCoupon::where(function ($q) use ($courseId) {
            $q->where('course_id', $courseId)
                ->orWhereNull('course_id');
        })
            ->isValid()
            ->get();
    }

    public function getCouponsList(array $data): LengthAwarePaginator|Collection
    {
        $pageNumber = array_key_exists('course_coupons_page', $data) ? intval($data['course_coupons_page']) : 1;
        $perPage = array_key_exists('course_coupons_per_page', $data) ? intval($data['course_coupons_per_page']) : 10;

        $coupons = CourseCoupon::with('course:id,title')->searchWhen('code', $data, 'course_coupons_search');

        if (array_key_exists('paginate', $data) && $data['paginate']) {
            return $coupons->paginate($perPage, ['*'], 'course_coupons_page', $pageNumber);
        }

        return $coupons->get();
    }

    public function createCoupon(array $data): CourseCoupon
    {
        return CourseCoupon::create($data);
    }

    public function updateCoupon(string $id, array $data): bool
    {
        return CourseCoupon::findOrFail($id)->update($data);
    }

    public function deleteCoupon(string $id): bool
    {
        return CourseCoupon::findOrFail($id)->delete();
    }

    public function verifyCoupon(string $code, ?string $courseId = null): ?CourseCoupon
    {
        $query = CourseCoupon::where('code', $code);

        if ($courseId) {
            $query->where(function ($q) use ($courseId) {
                $q->where('course_id', $courseId)
                    ->orWhereNull('course_id');
            });
        }

        return $query->isValid()->first();
    }
}
