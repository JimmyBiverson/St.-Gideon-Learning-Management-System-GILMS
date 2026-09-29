<?php

use App\Enums\UserType;
use App\Models\TempStore;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

function isAdmin(): bool
{
    return Auth::user()->role === UserType::ADMIN->value ? true : false;
}

/**
 * Redirect to the session's intended URL (falling back to $default) as an
 * Inertia "location" visit, so the browser performs a real navigation.
 *
 * Plain `redirect()->intended()` breaks when the intended URL points at a
 * non-Inertia page (e.g. the Blade-rendered checkout page) and the request
 * that resolves it is Inertia-driven (login, email verification, Google
 * auth, etc.): Inertia's client expects an Inertia response, and since the
 * target never sends one it shows its "unexpected response" dev dialog
 * instead of navigating, leaving the browser stuck on the previous URL.
 */
function redirectIntended(string $default): Response
{
    $path = session()->pull('url.intended', $default);

    return Inertia::location(url()->to($path));
}

function setTempStore(array $data): TempStore
{
    $userTemp = TempStore::where('user_id', $data['user_id'])->first();

    if ($userTemp) {
        $userTemp->delete();
    }

    return TempStore::create($data);
}

function getTempStore(string $user_id, ?string $key = null): ?TempStore
{
    return TempStore::where('user_id', $user_id)
        ->when($key, function ($query) use ($key) {
            return $query->where('key', $key);
        })
        ->first();
}

function deleteTempStore(string $user_id, ?string $key = null): bool
{
    return TempStore::where('user_id', $user_id)
        ->when($key, function ($query) use ($key) {
            return $query->where('key', $key);
        })
        ->delete();
}

function sortTableRows(string $table, array $sortedData): bool
{
    return DB::transaction(function () use ($table, $sortedData) {
        // Recompute sort = 1..N by the order of IDs we receive
        $ids = array_column($sortedData, 'id');
        $caseParts = [];
        foreach (array_values($ids) as $index => $id) {
            $sort = $index + 1; // 1-based sequence
            $caseParts[] = "WHEN {$id} THEN {$sort}";
        }
        $caseSql = implode(' ', $caseParts);
        $idsCsv = implode(',', $ids);

        // Use backticks for table name; assumes $table is a trusted table identifier
        DB::update("UPDATE `{$table}` SET `sort` = CASE `id` {$caseSql} END, `updated_at` = ? WHERE `id` IN ({$idsCsv})", [now()]);

        return true;
    });
}

function removeNullProperties(array $array): array
{
    foreach ($array as $key => $value) {
        if (is_array($value)) {
            $array[$key] = removeNullProperties($value);

            // Remove empty arrays after processing
            if ($array[$key] === []) {
                unset($array[$key]);
            }
        } elseif ($value === null) {
            unset($array[$key]);
        }
    }

    return $array;
}

function calculateGrade(float $percentage): string
{
    if ($percentage >= 90) {
        return 'A+';
    }
    if ($percentage >= 85) {
        return 'A';
    }
    if ($percentage >= 80) {
        return 'A-';
    }
    if ($percentage >= 75) {
        return 'B+';
    }
    if ($percentage >= 70) {
        return 'B';
    }
    if ($percentage >= 65) {
        return 'B-';
    }
    if ($percentage >= 60) {
        return 'C+';
    }
    if ($percentage >= 55) {
        return 'C';
    }
    if ($percentage >= 50) {
        return 'C-';
    }
    if ($percentage >= 45) {
        return 'D';
    }

    return 'F';
}

/**
 * Generate a unique slug for the model.
 * Automatically appends numbers if slug already exists.
 */
function getModelUniqueSlug(string $model, string $text): string
{
    $slug = Str::slug($text);
    $originalSlug = $slug;
    $counter = 1;

    while ($model::where('slug', $slug)->exists()) {
        $slug = $originalSlug.'-'.$counter;
        $counter++;
    }

    return $slug;
}

function getBySuffix(array $data, string $suffix): array
{
    return array_filter($data, function ($key) use ($suffix) {
        return str_ends_with($key, $suffix);
    }, ARRAY_FILTER_USE_KEY);
}
