<?php

namespace App\Support;

use Carbon\Carbon;

final class CouponDatetime
{
    /**
     * Normalize coupon validity datetimes for database storage (UTC).
     *
     * Accepts ISO-8601 strings with timezone (preferred from the dashboard form)
     * or datetime-local values without offset (legacy / fallback: app timezone).
     */
    public static function normalizeForStorage(mixed $value): ?string
    {
        if ($value === null || $value === '') {
            return null;
        }

        $value = trim((string) $value);

        if (preg_match('/[Zz]|[+-]\d{2}:?\d{2}$/', $value)) {
            return Carbon::parse($value)->utc()->format('Y-m-d H:i:s');
        }

        $normalized = str_replace('T', ' ', $value);

        if (preg_match('/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/', $normalized)) {
            $normalized .= ':00';
        }

        return Carbon::parse($normalized, config('app.timezone'))
            ->utc()
            ->format('Y-m-d H:i:s');
    }
}
