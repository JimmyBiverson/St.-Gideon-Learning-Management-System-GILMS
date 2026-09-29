<?php

namespace Modules\Course\Console\Commands;

use App\Models\ChunkedUpload;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Modules\Course\Models\SectionLesson;

class PrivatizeVideoLessonFilesCommand extends Command
{
    protected $signature = 'course:privatize-video-lessons {--seconds=8 : Time budget for this invocation}';

    protected $description = 'Move legacy publicly-stored video lesson files to private storage and link them via chunked_upload_id';

    private const BATCH_SIZE = 25;

    public function handle(): int
    {
        $deadline = microtime(true) + max(1, (int) $this->option('seconds'));
        $migrated = 0;
        $skipped = 0;

        while (microtime(true) < $deadline) {
            $lessons = SectionLesson::query()
                ->where('lesson_type', 'video')
                ->whereNull('chunked_upload_id')
                ->whereNotNull('lesson_src')
                ->limit(self::BATCH_SIZE)
                ->get();

            if ($lessons->isEmpty()) {
                $this->info("Done. Migrated {$migrated}, skipped {$skipped}.");

                return self::SUCCESS;
            }

            foreach ($lessons as $lesson) {
                try {
                    if ($this->migrateLesson($lesson)) {
                        $migrated++;
                    } else {
                        $skipped++;
                    }
                } catch (\Throwable $e) {
                    $skipped++;
                    Log::warning('Video lesson privatization skipped', [
                        'lesson_id' => $lesson->id,
                        'reason' => $e->getMessage(),
                    ]);
                }

                if (microtime(true) >= $deadline) {
                    break;
                }
            }
        }

        $remaining = SectionLesson::query()
            ->where('lesson_type', 'video')
            ->whereNull('chunked_upload_id')
            ->whereNotNull('lesson_src')
            ->count();

        $this->info("Time budget exhausted. Migrated {$migrated}, skipped {$skipped}, {$remaining} remaining.");

        return $remaining > 0 ? self::FAILURE : self::SUCCESS;
    }

    /**
     * Move one lesson's file from the public disk to the private local disk
     * and link it via chunked_upload_id. Returns false (skip, not failure)
     * when there's nothing recoverable to migrate — a permanently broken
     * row like this is cheap to re-check on the next invocation since it's
     * excluded from nothing, but the bounded time budget keeps that cheap.
     */
    private function migrateLesson(SectionLesson $lesson): bool
    {
        /** @var ChunkedUpload|null $upload */
        $upload = ChunkedUpload::where('file_url', $lesson->lesson_src)->first();

        if ($upload === null) {
            return false;
        }

        if ($upload->disk === 'local') {
            // Already on the private disk from a previous partial run —
            // just wire up the FK.
            $lesson->update(['chunked_upload_id' => $upload->id, 'lesson_src' => null]);

            return true;
        }

        if ($upload->disk !== 'public' || ! Storage::disk('public')->exists($upload->key)) {
            return false;
        }

        return DB::transaction(function () use ($lesson, $upload) {
            if (! Storage::disk('local')->exists($upload->key)) {
                Storage::disk('local')->put($upload->key, Storage::disk('public')->readStream($upload->key));
            }

            Storage::disk('public')->delete($upload->key);

            $upload->update(['disk' => 'local', 'file_url' => null]);
            $lesson->update(['chunked_upload_id' => $upload->id, 'lesson_src' => null]);

            return true;
        });
    }
}
