<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Route;

class MobileNavigation
{
    /** @return array{items: array<int, array<string, string>>, more: array<int, array<string, string>>} */
    public function forUser(?User $user): array
    {
        if (! $user || ! in_array($user->role, ['admin', 'instructor', 'student'], true)) {
            return ['items' => [], 'more' => []];
        }

        $academic = app(AcademicTerminology::class)->label(true);
        $items = match ($user->role) {
            'admin' => [
                ['Dashboard', 'dashboard', 'home', []],
                [$academic, 'courses.index', 'book', []],
                ['Users', 'users.index', 'users', []],
                ['Alerts', 'notifications.index', 'bell', []],
            ],
            'instructor' => [
                ['Dashboard', 'dashboard', 'home', []],
                ['My teaching', 'courses.index', 'book', []],
                ['Assessments', 'exams.index', 'assessment', []],
                ['Alerts', 'notifications.index', 'bell', []],
            ],
            default => [
                ['Home', 'home', 'home', []],
                [$academic, 'student.index', 'book', ['tab' => 'courses']],
                ['Alerts', 'notifications.index', 'bell', []],
                ['Profile', 'student.index', 'profile', ['tab' => 'profile']],
            ],
        };

        $more = $user->role === 'student'
            ? [
                ['Exams', 'student.index', 'assessment', ['tab' => 'exams']],
                ['Wishlist', 'student.index', 'book', ['tab' => 'wishlist']],
                ['Settings', 'student.index', 'settings', ['tab' => 'settings']],
            ]
            : [
                ['Profile', 'instructor.index', 'profile', []],
                ['Learning dashboard', 'student.index', 'book', ['tab' => 'courses']],
            ];

        if ($user->role === 'admin') {
            $more[] = ['Teacher applications', 'instructors.applications', 'users', []];
            $more[] = ['System settings', 'system.index', 'settings', []];
        }

        $resolve = static function (array $links): array {
            $result = [];
            foreach ($links as [$label, $name, $icon, $parameters]) {
                if (Route::has($name)) {
                    $result[] = ['label' => $label, 'href' => route($name, $parameters, false), 'icon' => $icon];
                }
            }

            return $result;
        };

        return ['items' => $resolve($items), 'more' => $resolve($more)];
    }
}
