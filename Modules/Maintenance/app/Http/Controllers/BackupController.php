<?php

namespace Modules\Maintenance\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Modules\Maintenance\Models\Backup;
use Modules\Maintenance\Services\BackupService;
use ZipArchive;

class BackupController extends Controller
{
    public function __construct(
        private BackupService $backupService,
    ) {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        ini_set('max_execution_time', 600); // Set max execution time to 600 seconds (10 minutes)

        try {
            $backupName = 'backup_'.now()->format('Y_m_d_H_i_s');
            $backupDir = storage_path('app/backups');

            // Create backup directory if it doesn't exist
            if (! file_exists($backupDir)) {
                mkdir($backupDir, 0755, true);
            }

            // 1. Create source code backup first
            $sourceCodeZip = $this->backupService->createSourceCodeBackup($backupName, $backupDir);
            $sourceCodeSize = file_exists($sourceCodeZip) ? filesize($sourceCodeZip) : 0;

            // 2. Estimate database backup size (so we can include it in the record)
            $estimatedDatabaseSize = $this->backupService->estimateDatabaseBackupSize();

            // 3. Create backup record with actual source code size and estimated database size
            $backup = $this->backupService->createBackup($backupName, $sourceCodeSize, $estimatedDatabaseSize);

            // 4. Create database backup (now includes the complete backup record with estimated size)
            $this->backupService->createDatabaseBackup($backupName, $backupDir);

            return redirect()->back()->with('success', 'Backup created successfully! Files: '.$backup->source_code_zip.', '.$backup->database_zip);
        } catch (\Exception $e) {
            // If backup creation fails, delete the incomplete backup record
            if (isset($backup)) {
                $backup->delete();
            }

            return redirect()->back()->with('error', 'Backup failed: '.$e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        ini_set('max_execution_time', 600); // Set max execution time to 600 seconds (10 minutes)

        try {
            $backup = $this->backupService->deleteFromBackup($id);

            // Prepare response message
            $message = "Backup '{$backup->backup_name}' deleted successfully.";

            return redirect(route('system.maintenance.index'), 303)->with('success', $message);
        } catch (\Exception $e) {
            return redirect(route('system.maintenance.index'), 303)->with('error', 'Failed to delete backup: '.$e->getMessage());
        }
    }

    /**
     * Restore backup by ID
     */
    public function restore($id)
    {
        $secret = null;
        ini_set('max_execution_time', 600); // Set max execution time to 600 seconds (10 minutes)

        try {
            // Find the backup record first (before maintenance mode)
            $backup = Backup::findOrFail($id);
            $backupDir = storage_path('app/backups');

            // Validate backup files exist
            $sourceCodePath = $backupDir.'/'.$backup->source_code_zip;
            $databasePath = $backupDir.'/'.$backup->database_zip;

            if (! file_exists($sourceCodePath)) {
                throw new \Exception('Source code backup file not found: '.$backup->source_code_zip);
            }

            if (! file_exists($databasePath)) {
                throw new \Exception('Database backup file not found: '.$backup->database_zip);
            }

            // Put app into maintenance mode with secret
            $secret = 'restore-'.now()->timestamp;
            Artisan::call('down', [
                '--secret' => $secret,
                '--render' => 'errors::503',
                '--retry' => 60, // clients told to retry after 60s
            ]);

            // Store secret in cache (so frontend can show bypass link if needed)
            Cache::put('maintenance_secret', $secret, now()->addMinutes(30));

            // Pre-update refresh
            Artisan::call('optimize:clear');

            // Perform the restore operation
            $this->backupService->restoreFromBackup($sourceCodePath, $databasePath);

            // Log successful restore
            Log::info("Backup restore completed successfully: {$backup->backup_name}");

            return redirect()->back()->with('success', "Backup '{$backup->backup_name}' restored successfully! Please refresh the page.");
        } catch (\Exception $e) {
            // Log the error
            Log::error('Backup restore failed: '.$e->getMessage(), [
                'backup_id' => $id ?? null,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->with('error', 'Restore failed: '.$e->getMessage());
        } finally {
            // Always disable maintenance mode, regardless of success or failure
            Artisan::call('up');
            Cache::forget('maintenance_secret');
            Log::info('Maintenance mode disabled after restore operation');
        }
    }

    /**
     * Download backup files
     */
    public function download($id)
    {
        try {
            $backup = Backup::findOrFail($id);

            // Verify backup files exist
            $sourcePath = storage_path('app/backups/'.$backup->source_code_zip);
            $dbPath = storage_path('app/backups/'.$backup->database_zip);

            if (! file_exists($sourcePath) || ! file_exists($dbPath)) {
                return redirect()->back()->with('error', 'Backup files not found');
            }

            // Create a temporary zip containing both files
            $zipName = 'backup_'.$backup->backup_name.'.zip';
            $zipPath = storage_path('app/temp/'.$zipName);

            // Ensure temp directory exists
            if (! file_exists(dirname($zipPath))) {
                mkdir(dirname($zipPath), 0755, true);
            }

            $zip = new ZipArchive;
            if ($zip->open($zipPath, ZipArchive::CREATE) === true) {
                // Add files to the zip
                $zip->addFile($sourcePath, basename($sourcePath));
                $zip->addFile($dbPath, basename($dbPath));
                $zip->close();

                // Stream the file to the browser
                return response()->download($zipPath, $zipName)->deleteFileAfterSend(true);
            }

            return redirect()->back()->with('error', 'Failed to create download package');
        } catch (\Exception $e) {
            Log::error('Backup download failed: '.$e->getMessage());

            return redirect()->back()->with('error', 'Failed to download backup: '.$e->getMessage());
        }
    }
}
