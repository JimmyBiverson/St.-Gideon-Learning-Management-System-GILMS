<?php

namespace Modules\Certification\Services;

use App\Services\MediaService;
use Modules\Certification\Models\CertificateTemplate;
use Modules\Certification\Models\MarksheetTemplate;

class CertificationService extends MediaService
{
    public function createCertificateTemplate(array $data): CertificateTemplate
    {
        $template = CertificateTemplate::create($data);

        if (array_key_exists('logo', $data) && $data['logo']) {
            $template->update([
                'logo_path' => $this->addNewDeletePrev($template, $data['logo'], 'certificates_logo'),
            ]);
        }

        return $template;
    }

    public function updateCertificateTemplate(string $id, array $data): CertificateTemplate
    {
        $template = CertificateTemplate::findOrFail($id);

        $attributes = [
            'name' => $data['name'],
            'type' => $data['type'],
            'template_data' => $data['template_data'],
        ];

        if (array_key_exists('logo', $data) && $data['logo']) {
            $attributes['logo_path'] = $this->addNewDeletePrev($template, $data['logo'], 'certificates_logo');
        }

        $template->update($attributes);

        return $template->fresh();
    }

    public function activateCertificateTemplate(string $id, string $type): void
    {
        $template = CertificateTemplate::findOrFail($id);

        CertificateTemplate::where('id', '!=', $id)
            ->where('type', $type)
            ->update(['is_active' => false]);

        $template->update(['is_active' => true]);
    }

    public function deleteCertificateTemplate(string $id): void
    {
        CertificateTemplate::findOrFail($id)->delete();
    }

    public function getActiveCertificateTemplate(string $type)
    {
        $template = CertificateTemplate::where('is_active', true)->where('type', $type)->first();

        // Return default template if no active template exists
        if (! $template) {
            return [
                'id' => 0,
                'name' => 'Default Template',
                'logo_path' => null,
                'template_data' => [
                    'primaryColor' => '#3730a3',
                    'secondaryColor' => '#4b5563',
                    'backgroundColor' => '#dbeafe',
                    'borderColor' => '#f59e0b',
                    'titleText' => 'Certificate of Completion',
                    'descriptionText' => 'This certificate is proudly presented to',
                    'completionText' => 'for successfully completing the course',
                    'footerText' => 'Authorized Certificate',
                    'fontFamily' => 'serif',
                ],
                'is_active' => false,
            ];
        }

        return $template;
    }

    public function getActiveMarksheetTemplate(string $type)
    {
        $template = MarksheetTemplate::where('is_active', true)->where('type', $type)->first();

        // Return default template if no active template exists
        if (! $template) {
            return [
                'id' => 0,
                'name' => 'Default Marksheet',
                'logo_path' => null,
                'template_data' => [
                    'primaryColor' => '#1e40af',
                    'secondaryColor' => '#64748b',
                    'backgroundColor' => '#ffffff',
                    'borderColor' => '#3b82f6',
                    'headerText' => 'Academic Marksheet',
                    'institutionName' => 'Learning Management System',
                    'footerText' => 'This is an official academic record',
                    'fontFamily' => 'sans-serif',
                ],
                'is_active' => false,
            ];
        }

        return $template;
    }
}
