<?php

namespace Modules\Exam\Services;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Modules\Exam\Models\ExamCoupon;

class ExamCouponService
{
    public function getExamValidCoupon(string $examId, string $code): ?ExamCoupon
    {
        return ExamCoupon::where('code', $code)
            ->where(function ($q) use ($examId) {
                $q->where('exam_id', $examId)
                    ->orWhereNull('exam_id');
            })
            ->isValid()
            ->first();
    }

    public function getExamValidCoupons(string $examId): Collection
    {
        return ExamCoupon::where(function ($q) use ($examId) {
            $q->where('exam_id', $examId)
                ->orWhereNull('exam_id');
        })
            ->isValid()
            ->get();
    }

    public function getCouponsList(array $data): LengthAwarePaginator|Collection
    {
        $pageNumber = array_key_exists('exam_coupons_page', $data) ? intval($data['exam_coupons_page']) : 1;
        $perPage = array_key_exists('exam_coupons_per_page', $data) ? intval($data['exam_coupons_per_page']) : 10;

        $coupons = ExamCoupon::with('exam:id,title')->searchWhen('code', $data, 'exam_coupons_search');

        if (array_key_exists('paginate', $data) && $data['paginate']) {
            return $coupons->paginate($perPage, ['*'], 'exam_coupons_page', $pageNumber);
        }

        return $coupons->get();
    }
}
