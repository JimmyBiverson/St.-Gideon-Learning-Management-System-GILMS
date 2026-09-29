<?php

namespace Modules\Frontend\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Modules\Frontend\Models\PageTranslation;
use Modules\Frontend\Models\ProjectPage;
use Modules\Language\Models\Language;

class PageTranslationService
{
    /**
     * Mirrors TRANSLATABLE_FIELDS in
     * Modules/Frontend/resources/js/hooks/use-translatable-text.tsx.
     */
    private const TRANSLATABLE_FIELDS = [
        'innerText', 'alt', 'placeholder', 'label',
        'formTitle', 'formDescription', 'formButton',
    ];

    public function defaultLocale(): string
    {
        return Language::where('is_default', true)->value('code') ?? 'en';
    }

    /**
     * Walks an element tree (same shape as overlay()) and collects every
     * translatable scalar field found, keyed by element id — the inverse of
     * overlay(). Used by seeders/tooling that need to enumerate a page's
     * translatable strings without a live ProjectPage/database round trip.
     *
     * @param  array<int, mixed>  $elements
     * @return array<int, array{element_id: string, field: string, value: string}>
     */
    public function extractTranslatableStrings(array $elements): array
    {
        $rows = [];

        $this->walkForExtraction($elements, $rows);

        return $rows;
    }

    /**
     * @param  array<int, mixed>  $elements
     * @param  array<int, array{element_id: string, field: string, value: string}>  $rows
     */
    private function walkForExtraction(array $elements, array &$rows): void
    {
        foreach ($elements as $element) {
            if (! is_array($element) || ! isset($element['content'])) {
                continue;
            }

            $content = $element['content'];

            if ($this->isElementList($content)) {
                $this->walkForExtraction($content, $rows);

                continue;
            }

            if (is_array($content) && isset($content['children']) && $this->isElementList($content['children'])) {
                $this->walkForExtraction($content['children'], $rows);

                continue;
            }

            if (! is_array($content) || ! isset($element['id'])) {
                continue;
            }

            foreach (self::TRANSLATABLE_FIELDS as $field) {
                $value = $content[$field] ?? null;

                if (! is_string($value) || trim($value) === '') {
                    continue;
                }

                $rows[] = ['element_id' => $element['id'], 'field' => $field, 'value' => $value];
            }
        }
    }

    /**
     * @return array<string, array<string, string>>
     */
    public function getMap(ProjectPage $page, string $locale): array
    {
        $map = [];

        foreach (PageTranslation::where('project_page_id', $page->id)->where('locale', $locale)->get() as $row) {
            $map[$row->element_id][$row->field] = $row->value;
        }

        return $map;
    }

    /**
     * An empty value deletes the row rather than storing it, so the field
     * falls back to the default-locale text instead of rendering blank.
     *
     * @param  array<int, array{element_id: string, field: string, value: ?string}>  $translations
     */
    public function saveMap(ProjectPage $page, string $locale, array $translations): void
    {
        DB::transaction(function () use ($page, $locale, $translations) {
            foreach ($translations as $item) {
                $identity = [
                    'project_page_id' => $page->id,
                    'locale' => $locale,
                    'element_id' => $item['element_id'],
                    'field' => $item['field'],
                ];

                if (trim((string) ($item['value'] ?? '')) === '') {
                    PageTranslation::where($identity)->delete();

                    continue;
                }

                PageTranslation::updateOrCreate($identity, ['value' => $item['value']]);
            }
        });

        $this->forgetCache($page, $locale);
    }

    public function forgetCache(ProjectPage $page, string $locale): void
    {
        Cache::forget($this->cacheKey($page, $locale));
    }

    /**
     * Overlays the current visitor's locale onto a builder page's content
     * and title/description in place, ahead of sending it to Inertia. This
     * is the single call every render path (public pages, inner pages, the
     * standalone show route) must make — centralized here so a new entry
     * point can't accidentally skip a step the way HomeController originally
     * did.
     *
     * Default-locale requests return immediately without touching $page at
     * all — content stays the exact original string (no decode/encode round
     * trip, which would otherwise re-escape unicode/slashes and silently
     * cost every request the "zero overhead for single-language installs"
     * this feature promised).
     */
    public function applyToPage(ProjectPage $page): void
    {
        $locale = app()->getLocale();

        if ($locale === $this->defaultLocale()) {
            return;
        }

        $page->content = json_encode(
            $this->mergeIntoContent($page, $locale),
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );

        $pageFields = $this->getPageFields($page, $locale);
        $page->title = $pageFields['page_title'] ?? $page->title;
        $page->description = $pageFields['page_description'] ?? $page->description;
    }

    /**
     * Decode the page's content and, for a non-default locale, overlay any
     * saved translation values onto their matching elements. Default-locale
     * requests skip the overlay entirely — zero overhead for single-language
     * installs and byte-identical output to before this feature existed.
     *
     * @return array<int, mixed>
     */
    public function mergeIntoContent(ProjectPage $page, string $locale): array
    {
        $content = json_decode((string) $page->content, true) ?: [];

        if ($locale === $this->defaultLocale()) {
            return $content;
        }

        $map = $this->cachedMap($page, $locale);

        if (empty($map)) {
            return $content;
        }

        return $this->overlay($content, $map);
    }

    /**
     * Page-level fields (title, description) use the `__page__` sentinel
     * element id and never appear inside the content tree.
     *
     * @return array<string, string>
     */
    public function getPageFields(ProjectPage $page, string $locale): array
    {
        if ($locale === $this->defaultLocale()) {
            return [];
        }

        return $this->cachedMap($page, $locale)['__page__'] ?? [];
    }

    /**
     * @return array<string, array<string, string>>
     */
    private function cachedMap(ProjectPage $page, string $locale): array
    {
        return Cache::remember(
            $this->cacheKey($page, $locale),
            now()->addHour(),
            fn () => $this->getMap($page, $locale)
        );
    }

    private function cacheKey(ProjectPage $page, string $locale): string
    {
        return "page-translations:{$page->id}:{$locale}";
    }

    /**
     * Walks the same two-branch element tree shape used on the frontend
     * (Modules/Frontend/resources/js/lib/find-element.ts, editor-provider.tsx):
     * `content` is either a list of child elements, an object carrying a
     * `children` list (dropdown/popover), or a leaf whose scalar fields
     * (innerText, alt, placeholder, ...) are directly translatable.
     *
     * @param  array<int, mixed>  $elements
     * @param  array<string, array<string, string>>  $map
     * @return array<int, mixed>
     */
    private function overlay(array $elements, array $map): array
    {
        return array_map(function ($element) use ($map) {
            if (! is_array($element) || ! isset($element['content'])) {
                return $element;
            }

            $content = $element['content'];

            if ($this->isElementList($content)) {
                $element['content'] = $this->overlay($content, $map);

                return $element;
            }

            if (is_array($content) && isset($content['children']) && $this->isElementList($content['children'])) {
                $content['children'] = $this->overlay($content['children'], $map);
                $element['content'] = $content;

                return $element;
            }

            if (is_array($content) && isset($element['id'], $map[$element['id']])) {
                foreach ($map[$element['id']] as $field => $value) {
                    $content[$field] = $value;
                }
                $element['content'] = $content;
            }

            return $element;
        }, $elements);
    }

    private function isElementList(mixed $content): bool
    {
        return is_array($content) && (empty($content) || array_is_list($content));
    }
}
