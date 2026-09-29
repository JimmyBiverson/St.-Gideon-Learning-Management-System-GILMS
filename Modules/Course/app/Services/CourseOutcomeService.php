<?php

namespace Modules\Course\Services;

use Modules\Course\Models\CourseOutcome;

class CourseOutcomeService
{
    public function createOutcome(array $data)
    {
        return CourseOutcome::create($data);
    }

    public function updateOutcome(array $data, string $id)
    {
        return CourseOutcome::findOrFail($id)->update($data);
    }

    public function deleteOutcome(string $id): bool
    {
        return CourseOutcome::findOrFail($id)->delete();
    }
}
