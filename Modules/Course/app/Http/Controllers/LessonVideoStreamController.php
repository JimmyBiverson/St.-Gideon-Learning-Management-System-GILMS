<?php

namespace Modules\Course\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Modules\Course\Models\SectionLesson;
use Symfony\Component\HttpFoundation\Response;

class LessonVideoStreamController extends Controller
{
    /**
     * Read/flush size for each streamed slice. Bounded so a large Range
     * request can't spike memory, and so connection_aborted() gets checked
     * often enough that a seek (many small Range requests) stays cheap.
     */
    private const CHUNK_SIZE = 1024 * 1024;

    /**
     * Stream a private local video lesson file with HTTP Range support.
     *
     * No X-Sendfile/X-Accel-Redirect: most installs are on shared hosting
     * with no control over the web server config, so this is pure PHP.
     */
    public function __invoke(Request $request, SectionLesson $lesson): Response
    {
        $upload = $lesson->chunkedUpload;

        abort_if($upload === null || $upload->disk !== 'local', 404);

        $path = Storage::disk('local')->path($upload->key);

        abort_unless(is_file($path), 404);

        $size = filesize($path);
        $start = 0;
        $end = $size - 1;
        $status = 200;

        $rangeHeader = $request->header('Range');

        if ($rangeHeader && preg_match('/bytes=(\d*)-(\d*)/', $rangeHeader, $matches)) {
            $start = $matches[1] === '' ? 0 : (int) $matches[1];
            $end = $matches[2] === '' ? $size - 1 : min((int) $matches[2], $size - 1);

            if ($start > $end || $start >= $size) {
                return response('', 416, ['Content-Range' => "bytes */{$size}"]);
            }

            $status = 206;
        }

        $length = $end - $start + 1;

        $headers = [
            'Content-Type' => $upload->mime_type ?: 'video/mp4',
            'Content-Length' => $length,
            'Accept-Ranges' => 'bytes',
        ];

        if ($status === 206) {
            $headers['Content-Range'] = "bytes {$start}-{$end}/{$size}";
        }

        return response()->stream(function () use ($path, $start, $length) {
            $handle = fopen($path, 'rb');
            fseek($handle, $start);

            $remaining = $length;

            while ($remaining > 0 && ! feof($handle)) {
                if (connection_aborted()) {
                    break;
                }

                $read = fread($handle, min(self::CHUNK_SIZE, $remaining));

                if ($read === false) {
                    break;
                }

                echo $read;
                flush();

                $remaining -= strlen($read);
            }

            fclose($handle);
        }, $status, $headers);
    }
}
