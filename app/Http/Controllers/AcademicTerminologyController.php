<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateAcademicTerminologyRequest;
use App\Services\AcademicTerminology;
use Illuminate\Http\RedirectResponse;

class AcademicTerminologyController extends Controller
{
    public function update(UpdateAcademicTerminologyRequest $request, AcademicTerminology $terminology): RedirectResponse
    {
        $terminology->save($request->validated());

        return back()->with('success', 'Academic terminology updated successfully.');
    }
}
