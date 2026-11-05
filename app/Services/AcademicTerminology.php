<?php

namespace App\Services;

use App\Models\Setting;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;

class AcademicTerminology
{
    private const CACHE_KEY = 'academic_terminology';

    /** @var array{singular: string, plural: string}|null */
    private ?array $resolvedLabels = null;

    /** @return array{singular: string, plural: string} */
    public function labels(): array
    {
        return $this->resolvedLabels ??= Cache::rememberForever(self::CACHE_KEY, function (): array {
            $fields = Setting::where('type', 'academic_terminology')->first()?->fields ?? [];

            return [
                'singular' => $fields['singular'] ?? 'Subject',
                'plural' => $fields['plural'] ?? 'Subjects',
            ];
        });
    }

    /** @param array{singular: string, plural: string} $labels */
    public function save(array $labels): void
    {
        Setting::updateOrCreate(['type' => 'academic_terminology'], [
            'title' => 'Academic Terminology Settings',
            'fields' => $labels,
        ]);

        Cache::forget(self::CACHE_KEY);
        $this->resolvedLabels = null;
    }

    public function label(bool $plural = false, bool $lowercase = false): string
    {
        $label = $this->labels()[$plural ? 'plural' : 'singular'];

        return $lowercase ? Str::lower($label) : $label;
    }

    /** Only call with display copy known to describe the academic entity. */
    public function text(string $text): string
    {
        return preg_replace_callback('/\b(subjects?|courses?)\b/i', function (array $match): string {
            $word = $match[0];
            $label = $this->label(str_ends_with(strtolower($word), 's'));

            if ($word === strtoupper($word)) {
                return Str::upper($label);
            }

            return $word === strtolower($word) ? Str::lower($label) : $label;
        }, $text);
    }

    /** @param array<string, mixed> $translations @return array<string, mixed> */
    public function translations(array $translations): array
    {
        foreach ($translations as $key => $value) {
            if (is_array($value)) {
                $translations[$key] = $this->translations($value);
            } elseif (is_string($value) && preg_match('/(^|_)(courses?|subjects?)(_|$)/', $key)
                && ! preg_match('/mail|email|message/', $key)) {
                $translations[$key] = $this->text($value);
            }
        }

        return $translations;
    }
}
