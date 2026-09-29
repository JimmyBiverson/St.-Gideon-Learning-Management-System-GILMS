<?php

namespace Modules\Certification\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Modules\Certification\Http\Requests\CertificateTemplateRequest;
use Modules\Certification\Models\CertificateTemplate;
use Modules\Certification\Services\CertificationService;

class CertificateTemplateController extends Controller
{
    public function __construct(protected CertificationService $certificationService) {}

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $templates = CertificateTemplate::latest()->get();

        return Inertia::render('Certification/certificate', [
            'templates' => $templates,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Certification/certificate-builder');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CertificateTemplateRequest $request)
    {
        $this->certificationService->createCertificateTemplate($request->validated());

        return redirect()
            ->route('certificate.templates.index')
            ->with('success', 'Certificate template created successfully!');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $template = CertificateTemplate::findOrFail($id);

        return Inertia::render('Certification/certificate-builder', [
            'template' => $template,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CertificateTemplateRequest $request, $id)
    {
        $this->certificationService->updateCertificateTemplate($id, $request->validated());

        return back()->with('success', 'Certificate template updated successfully!');
    }

    /**
     * Activate a specific template.
     */
    public function activate(Request $request, $id)
    {
        $this->certificationService->activateCertificateTemplate($id, $request->type);

        return back()->with('success', 'Certificate template activated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->certificationService->deleteCertificateTemplate($id);

        return back()->with('success', 'Certificate template deleted successfully!');
    }
}
