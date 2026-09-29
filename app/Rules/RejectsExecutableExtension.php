<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Http\UploadedFile;

/**
 * Blocks uploads whose extension would let a web server execute them as
 * code, for any "accept arbitrary file type" upload field (e.g. downloadable
 * digital products) that can't rely on a `mimes:` allow-list.
 */
class RejectsExecutableExtension implements ValidationRule
{
    /**
     * @var array<int, string>
     */
    private const array DENIED_EXTENSIONS = [
        'php', 'php2', 'php3', 'php4', 'php5', 'php7', 'php8', 'phtml', 'phts', 'pht', 'phar',
        'cgi', 'pl', 'py', 'rb', 'sh', 'bash', 'ksh', 'csh',
        'asp', 'aspx', 'ashx', 'asmx', 'jsp', 'jspx',
        'exe', 'dll', 'so', 'com', 'bat', 'cmd', 'msi',
        'htaccess', 'htpasswd', 'ini', 'conf', 'config',
    ];

    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $extension = match (true) {
            $value instanceof UploadedFile => $value->getClientOriginalExtension(),
            is_string($value) => pathinfo($value, PATHINFO_EXTENSION),
            default => null,
        };

        if (self::isDenied($extension)) {
            $fail('The :attribute file type is not allowed for security reasons.');
        }
    }

    public static function isDenied(?string $extension): bool
    {
        return in_array(strtolower((string) $extension), self::DENIED_EXTENSIONS, true);
    }
}
