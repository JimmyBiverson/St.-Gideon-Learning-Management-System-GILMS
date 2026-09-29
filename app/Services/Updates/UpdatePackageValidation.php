<?php

namespace App\Services\Updates;

/**
 * Outcome of inspecting an update package ZIP.
 *
 * Errors block installation. Warnings do not — they surface packaging mistakes
 * (stray files, unexpected content) so they can be seen and fixed rather than
 * silently shipped.
 */
class UpdatePackageValidation
{
    /**
     * @param  array<int, string>  $errors
     * @param  array<int, string>  $warnings
     * @param  array<string, mixed>|null  $manifest
     */
    public function __construct(
        public readonly array $errors = [],
        public readonly array $warnings = [],
        public readonly ?array $manifest = null,
        public readonly ?string $version = null,
        public readonly ?string $minUpgradableFrom = null,
        public readonly ?string $type = null,
        public readonly int $fileCount = 0,
        public readonly int $sizeBytes = 0,
        public readonly bool $vendorIncluded = false,
        public readonly bool $incremental = false,
        public readonly ?string $baseVersion = null,
        public readonly int $removedCount = 0,
    ) {}

    public function isValid(): bool
    {
        return $this->errors === [];
    }

    /**
     * The first error, suitable for a single-line failure message.
     */
    public function firstError(): ?string
    {
        return $this->errors[0] ?? null;
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(): array
    {
        return [
            'valid' => $this->isValid(),
            'errors' => $this->errors,
            'warnings' => $this->warnings,
            'version' => $this->version,
            'min_upgradable_from' => $this->minUpgradableFrom,
            'type' => $this->type,
            'file_count' => $this->fileCount,
            'size_bytes' => $this->sizeBytes,
            'vendor_included' => $this->vendorIncluded,
            'incremental' => $this->incremental,
            'base_version' => $this->baseVersion,
            'removed_count' => $this->removedCount,
        ];
    }
}
