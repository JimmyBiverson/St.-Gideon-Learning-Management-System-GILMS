<?php

namespace App\Concerns;

use App\Support\CouponDatetime;

trait NormalizesCouponDatetime
{
    protected function prepareForValidation(): void
    {
        $this->merge([
            'valid_from' => CouponDatetime::normalizeForStorage($this->input('valid_from')),
            'valid_to' => CouponDatetime::normalizeForStorage($this->input('valid_to')),
        ]);
    }
}
