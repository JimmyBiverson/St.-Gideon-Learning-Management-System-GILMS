<?php

namespace App\Services;

use App\Models\FooterItem;
use App\Models\NavbarItem;
use App\Models\Setting;
use App\Models\SiteTranslation;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Modules\Language\Models\Language;

/**
 * Per-locale text overrides for site-wide chrome that has no locale column
 * of its own (navbar/footer items and the system Setting's SEO/branding
 * fields). Mirrors the pattern already proven for Web Builder pages
 * (Modules/Frontend/app/Services/PageTranslationService): a translations
 * table keyed by (locale, type, id, field), a versionless per-(type, locale)
 * cache invalidated on write, and an overlay step that mutates
 * already-loaded models in place — default-locale requests never touch the
 * translations table at all.
 */
class SiteTranslationService
{
    public const NAVBAR_ITEM = 'navbar_item';

    public const FOOTER_ITEM = 'footer_item';

    public const SYSTEM_SETTING = 'system_setting';

    /**
     * Prose/SEO fields worth localizing. Deliberately excludes `author`
     * (a name, not prose) and `email`/`phone` (the same contact details
     * regardless of locale) — matches the same judgment call already made
     * for people's names and physical addresses elsewhere in this feature.
     *
     * @var array<int, string>
     */
    public const SYSTEM_SETTING_FIELDS = ['name', 'title', 'keywords', 'description', 'slogan'];

    public function defaultLocale(): string
    {
        return Language::where('is_default', true)->value('code') ?? 'en';
    }

    /**
     * @return array<int, array<string, string>>
     */
    public function getMap(string $type, string $locale): array
    {
        $map = [];

        foreach (SiteTranslation::where('translatable_type', $type)->where('locale', $locale)->get() as $row) {
            $map[$row->translatable_id][$row->field] = $row->value;
        }

        return $map;
    }

    /**
     * An empty value deletes the row rather than storing it, so the field
     * falls back to the default-locale text instead of rendering blank.
     *
     * @param  array<int, array{translatable_id: int, field: string, value: ?string}>  $translations
     */
    public function saveMap(string $type, string $locale, array $translations): void
    {
        DB::transaction(function () use ($type, $locale, $translations) {
            foreach ($translations as $item) {
                $identity = [
                    'locale' => $locale,
                    'translatable_type' => $type,
                    'translatable_id' => $item['translatable_id'],
                    'field' => $item['field'],
                ];

                if (trim((string) ($item['value'] ?? '')) === '') {
                    SiteTranslation::where($identity)->delete();

                    continue;
                }

                SiteTranslation::updateOrCreate($identity, ['value' => $item['value']]);
            }
        });

        $this->forgetCache($type, $locale);
    }

    public function forgetCache(string $type, string $locale): void
    {
        Cache::forget($this->cacheKey($type, $locale));
    }

    /**
     * Overlays the current visitor's locale onto already-loaded navbar
     * items in place, including each dropdown item's nested `items[].title`
     * (sub-items have no id of their own, so array position is the field
     * key — same convention as applyToFooterItems). No-op for the default
     * locale.
     *
     * @param  iterable<NavbarItem>  $items
     */
    public function applyToNavbarItems(iterable $items): void
    {
        $locale = app()->getLocale();

        if ($locale === $this->defaultLocale()) {
            return;
        }

        $map = $this->cachedMap(self::NAVBAR_ITEM, $locale);

        foreach ($items as $item) {
            $translations = $map[$item->id] ?? [];

            if ($translations === []) {
                continue;
            }

            if (isset($translations['title'])) {
                $item->title = $translations['title'];
            }

            if (is_array($item->items) && $item->items !== []) {
                $subItems = $item->items;

                foreach ($subItems as $index => $subItem) {
                    $key = "items.{$index}.title";

                    if (isset($translations[$key])) {
                        $subItems[$index]['title'] = $translations[$key];
                    }
                }

                $item->items = $subItems;
            }
        }
    }

    /**
     * Overlays the current visitor's locale onto already-loaded footer
     * items in place, including each item's nested `items[].title` (list
     * links, social links). Sub-items have no stable id of their own, so
     * their array position is used as the field key (`items.0.title`, ...).
     * No-op for the default locale.
     *
     * @param  iterable<FooterItem>  $items
     */
    public function applyToFooterItems(iterable $items): void
    {
        $locale = app()->getLocale();

        if ($locale === $this->defaultLocale()) {
            return;
        }

        $map = $this->cachedMap(self::FOOTER_ITEM, $locale);

        foreach ($items as $item) {
            $translations = $map[$item->id] ?? [];

            if ($translations === []) {
                continue;
            }

            if (isset($translations['title'])) {
                $item->title = $translations['title'];
            }

            if (is_array($item->items) && $item->items !== []) {
                $subItems = $item->items;

                foreach ($subItems as $index => $subItem) {
                    $key = "items.{$index}.title";

                    if (isset($translations[$key])) {
                        $subItems[$index]['title'] = $translations[$key];
                    }
                }

                $item->items = $subItems;
            }
        }
    }

    /**
     * Overlays the current visitor's locale onto the system Setting's
     * fields in place. $system is normally the app('system') singleton, so
     * mutating it here also fixes every other reader within the same
     * request (HomeController's meta tags, the footer's company
     * description, etc.) as long as this runs before they resolve it — see
     * HandleInertiaRequests::share(), the one call site every request goes
     * through first. No-op for the default locale.
     */
    public function applyToSystemSettings(Setting $system): void
    {
        $locale = app()->getLocale();

        if ($locale === $this->defaultLocale()) {
            return;
        }

        $translations = $this->cachedMap(self::SYSTEM_SETTING, $locale)[$system->id] ?? [];

        foreach (self::SYSTEM_SETTING_FIELDS as $field) {
            if (isset($translations[$field])) {
                $system->setField($field, $translations[$field]);
            }
        }
    }

    /**
     * @return array<int, array<string, string>>
     */
    private function cachedMap(string $type, string $locale): array
    {
        return Cache::remember(
            $this->cacheKey($type, $locale),
            now()->addHour(),
            fn () => $this->getMap($type, $locale)
        );
    }

    private function cacheKey(string $type, string $locale): string
    {
        return "site-translations:{$type}:{$locale}";
    }
}
