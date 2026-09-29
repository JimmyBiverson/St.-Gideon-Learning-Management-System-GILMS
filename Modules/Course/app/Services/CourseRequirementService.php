<?php

namespace Modules\Course\Services;

use Modules\Course\Models\CourseRequirement;

class CourseRequirementService
{
    public function createRequirement(array $data)
    {
        return CourseRequirement::create($data);
    }

    public function updateRequirement(array $data, string $id)
    {
        return CourseRequirement::findOrFail($id)->update($data);
    }

    public function deleteRequirement(string $id): bool
    {
        return CourseRequirement::findOrFail($id)->delete();
    }
}
