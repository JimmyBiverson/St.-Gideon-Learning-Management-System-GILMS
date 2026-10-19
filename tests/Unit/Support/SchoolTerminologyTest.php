<?php

use App\Support\SchoolTerminology;

it('replaces course terminology in translated labels while preserving keys', function () {
    $translations = [
        'frontend' => [
            'courses' => 'Courses',
            'certificate' => 'Course completion certificate',
            'sentence' => 'Browse COURSES and learn about course content.',
        ],
    ];

    expect(SchoolTerminology::replaceCourseTerms($translations))->toBe([
        'frontend' => [
            'courses' => 'Subjects',
            'certificate' => 'Subject completion certificate',
            'sentence' => 'Browse SUBJECTS and learn about subject content.',
        ],
    ]);
});
