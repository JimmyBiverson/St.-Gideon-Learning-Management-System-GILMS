<?php

namespace App\Support;

final class SchoolTerminology
{
    /**
     * Replace course terminology in translated UI labels without changing
     * translation keys.
     *
     * @param  array<string, mixed>  $translations
     * @return array<string, mixed>
     */
    public static function replaceCourseTerms(array $translations): array
    {
        foreach ($translations as $key => $value) {
            if (is_array($value)) {
                $translations[$key] = self::replaceCourseTerms($value);

                continue;
            }

            if (is_string($value)) {
                $translations[$key] = preg_replace_callback(
                    '/\bcourses?\b/i',
                    static function (array $matches): string {
                        $term = $matches[0];
                        $isPlural = strtolower($term) === 'courses';
                        $replacement = 'subject'.($isPlural ? 's' : '');

                        if (strtoupper($term) === $term) {
                            return strtoupper($replacement);
                        }

                        if (ctype_upper($term[0])) {
                            return ucfirst($replacement);
                        }

                        return $replacement;
                    },
                    $value,
                ) ?? throw new \RuntimeException('Unable to replace course terminology in translations.');
            }
        }

        return $translations;
    }
}
