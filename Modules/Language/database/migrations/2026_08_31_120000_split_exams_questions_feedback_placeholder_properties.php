<?php

use Illuminate\Database\Migrations\Migration;
use Modules\Language\Models\Language;
use Modules\Language\Models\LanguageProperty;

return new class extends Migration
{
    /**
     * The 'input.exams_questions_feedback' slug used to collide with a second,
     * separately-named 'Exams, Questions & Feedback Placeholder' group definition
     * (a copy-paste slug typo — its siblings all use a `..._placeholder` suffix).
     * Both definitions merged into one database row. Now that the definition
     * file separates them under distinct slugs, split the existing row so each
     * language's already-translated placeholder values move to the new slug
     * instead of being lost or duplicated.
     */
    public function up(): void
    {
        $placeholderKeys = [
            'answer_placeholder',
            'question_options_placeholder',
            'answer_options_placeholder',
            'hours_placeholder',
            'minutes_placeholder',
            'seconds_placeholder',
        ];

        Language::query()->each(function (Language $language) use ($placeholderKeys) {
            $row = LanguageProperty::where('language_id', $language->id)
                ->where('group', 'input')
                ->where('slug', 'exams_questions_feedback')
                ->first();

            if (! $row) {
                return;
            }

            $properties = (array) $row->properties;
            $placeholderValues = array_intersect_key($properties, array_flip($placeholderKeys));

            if (empty($placeholderValues)) {
                return;
            }

            $row->update(['properties' => array_diff_key($properties, $placeholderValues)]);

            LanguageProperty::firstOrCreate(
                ['group' => 'input', 'slug' => 'exams_questions_feedback_placeholder', 'language_id' => $language->id],
                ['name' => 'Exams, Questions & Feedback Placeholder', 'properties' => $placeholderValues]
            );
        });
    }

    /**
     * Data-repair migration; not reversible.
     */
    public function down(): void {}
};
