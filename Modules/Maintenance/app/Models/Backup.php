<?php

namespace Modules\Maintenance\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// use Modules\Maintenance\Database\Factories\BackupFactory;

/**
 * @property int $id
 * @property string $backup_name
 * @property string $source_code_zip
 * @property string $database_zip
 * @property int $source_code_size
 * @property int $database_size
 * @property string $status
 */
class Backup extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'backup_name',
        'source_code_zip',
        'database_zip',
        'source_code_size',
        'database_size',
        'status',
        'notes',
    ];

    // protected static function newFactory(): BackupFactory
    // {
    //     // return BackupFactory::new();
    // }
}
