<?php

namespace Modules\Language\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Inertia\Inertia;
use Modules\Language\Http\Requests\StoreLanguageRequest;
use Modules\Language\Http\Requests\UpdateLanguageRequest;
use Modules\Language\Models\Language;
use Modules\Language\Models\LanguageProperty;
use Modules\Language\Services\LanguageService;

class LanguageController extends Controller
{
    public function __construct(
        public LanguageService $languageService
    ) {}

    public function index()
    {
        $langs = Language::orderBy('is_default', 'desc')->get();

        return Inertia::render('Language/index', compact('langs'));
    }

    public function store(StoreLanguageRequest $request)
    {
        $this->languageService->storeLanguage($request->validated());

        return back()->with('success', 'New language added successfully');
    }

    public function update(UpdateLanguageRequest $request, string $id)
    {
        $this->languageService->updateLanguage($id, $request->validated());

        return back()->with('success', 'Language updated successfully');
    }

    public function edit(string $local)
    {
        $language = Language::where('code', $local)->with(['properties'])->firstOrFail();

        return Inertia::render('Language/update', compact('local', 'language'));
    }

    public function destroy(string $id)
    {
        $this->languageService->deleteLanguage($id);

        return back()->with('success', 'Language deleted successfully');
    }

    public function edit_property(string $id)
    {
        $property = LanguageProperty::where('id', $id)->with(['language:id,code'])->firstOrFail();

        return Inertia::render('Language/properties', compact('property'));
    }

    public function update_property(Request $request, $id)
    {
        $property = LanguageProperty::with('language:id,code')->findOrFail($id);

        // Get original and new data
        $originalData = (array) $property->properties;
        $newData = $request->all();

        // Validate that keys haven't changed
        $originalKeys = array_keys($originalData);
        $newKeys = array_keys($newData);

        sort($originalKeys);
        sort($newKeys);

        if ($originalKeys !== $newKeys) {
            $addedKeys = array_diff($newKeys, $originalKeys);
            $removedKeys = array_diff($originalKeys, $newKeys);

            $errors = [];
            if (! empty($addedKeys)) {
                $errors[] = 'Added keys are not allowed: '.implode(', ', $addedKeys);
            }
            if (! empty($removedKeys)) {
                $errors[] = 'Removed keys are not allowed: '.implode(', ', $removedKeys);
            }

            return back()->withErrors(['json' => implode(' ', $errors)]);
        }

        // Validate data types match
        foreach ($originalData as $key => $value) {
            if (isset($newData[$key])) {
                $originalType = gettype($value);
                $newType = gettype($newData[$key]);

                if ($originalType !== $newType) {
                    return back()->withErrors([
                        'json' => "Data type mismatch for key '{$key}': expected {$originalType}, got {$newType}",
                    ]);
                }
            }
        }

        // Update the property
        $property->update(['properties' => $newData]);

        $this->languageService->forgetCache($property->language->code);

        return back()->with('success', $property->name.' translation successfully updated');
    }

    public function change_direction(Request $request)
    {
        $cookie = Cookie::forever('direction', $request->direction);

        return back()->withCookie($cookie);
    }

    public function change_font_family(Request $request)
    {
        $request->validate(['font_family' => 'required|string|in:inter,roboto,poppins,nunito,outfit']);

        $system = Setting::where('type', 'system')->first();
        if ($system) {
            $fields = $system->fields;
            $fields['font_family'] = $request->font_family;
            $system->update(['fields' => $fields]);
        }

        return back()->with('success', 'Font family changed successfully');
    }

    public function change_lang(Request $request)
    {
        $cookie = Cookie::forever('locale', $request->locale);

        return back()->withCookie($cookie);
    }

    public function default(Request $request, $id)
    {
        $this->languageService->defaultLanguage($id);

        return back()->with('success', 'Default language set successfully');
    }

    public function status(Request $request, $local)
    {
        $langFilePath = base_path("lang/$local/active.txt");
        if (is_file($langFilePath)) {
            unlink($langFilePath);
        } else {
            file_put_contents($langFilePath, true);
        }

        return back();
    }
}
