<?php

/**
 * Redirect-loop guard.
 *
 * Walks the redirect chain for a set of URLs and fails if any URL is visited
 * twice, or if the chain is longer than the hop budget. That is exactly the
 * condition a browser reports as ERR_TOO_MANY_REDIRECTS, so this catches the
 * loop before the user does.
 *
 * Run it against local dev and against production:
 *
 *   php tools/check-redirect-loop.php http://127.0.0.1/gilms.ac.ug
 *   php tools/check-redirect-loop.php https://example.com --max-hops=2
 *   php tools/check-redirect-loop.php http://127.0.0.1/gilms.ac.ug --path=/dashboard --path=/login
 *
 * Exit code 0 = no loop, 1 = loop detected, 2 = could not reach the target.
 */

const DEFAULT_PATHS = ['/', '/login', '/install/step-1', '/dashboard'];

$argv = $_SERVER['argv'] ?? [];
array_shift($argv);

$baseUrl = null;
$paths = [];
$maxHops = 3;
$timeout = 15;

foreach ($argv as $arg) {
    if (str_starts_with($arg, '--path=')) {
        $paths[] = substr($arg, 7);
    } elseif (str_starts_with($arg, '--max-hops=')) {
        $maxHops = (int) substr($arg, 11);
    } elseif (str_starts_with($arg, '--timeout=')) {
        $timeout = (int) substr($arg, 10);
    } elseif (! str_starts_with($arg, '--')) {
        $baseUrl ??= rtrim($arg, '/');
    }
}

if ($baseUrl === null) {
    fwrite(STDERR, "Usage: php tools/check-redirect-loop.php <base-url> [--path=/x] [--max-hops=N] [--timeout=S]\n");
    exit(2);
}

if (! extension_loaded('curl')) {
    fwrite(STDERR, "The curl PHP extension is required.\n");
    exit(2);
}

$paths === [] && ($paths = DEFAULT_PATHS);

echo "Redirect-loop check\n";
echo "  base: {$baseUrl}\n";
echo "  budget: {$maxHops} hops per path\n\n";

$failed = [];
$unreachable = [];

foreach ($paths as $path) {
    $result = walkChain($baseUrl.$path, $maxHops, $timeout);

    if ($result['error'] !== null) {
        $unreachable[] = $path;
        printf("  [SKIP] %-18s %s\n", $path, $result['error']);
        continue;
    }

    $chain = implode("\n          -> ", $result['chain']);

    if ($result['loop']) {
        $failed[] = $path;
        printf("  [FAIL] %-18s %d hops, URL revisited\n", $path, count($result['chain']));
    } elseif (count($result['chain']) > $maxHops) {
        $failed[] = $path;
        printf("  [FAIL] %-18s %d hops exceeds budget of %d\n", $path, count($result['chain']), $maxHops);
    } else {
        printf(
            "  [ OK ] %-18s %d hop(s) -> %d %s\n",
            $path,
            count($result['chain']) - 1,
            $result['status'],
            $result['chain'][count($result['chain']) - 1]
        );
    }

    echo "          {$chain}\n";
}

echo "\n";

if ($failed !== []) {
    printf("FAILED: redirect loop on %s\n", implode(', ', $failed));
    exit(1);
}

if ($unreachable !== [] && count($unreachable) === count($paths)) {
    printf("FAILED: none of the paths were reachable from %s\n", $baseUrl);
    exit(2);
}

if ($unreachable !== []) {
    printf("PASSED: no redirect loops (%d path(s) skipped as unreachable)\n", count($unreachable));
    exit(0);
}

echo "PASSED: no redirect loops\n";
exit(0);

/**
 * Follow one redirect chain, one hop at a time, and report where it lands.
 *
 * Cookies are kept in a jar across the whole walk: the one-hop guards in this
 * app are session-backed, so a walk that dropped them would measure behaviour
 * a real browser never sees.
 *
 * @return array{chain: array<int, string>, status: int, loop: bool, error: ?string}
 */
function walkChain(string $start, int $maxHops, int $timeout): array
{
    $chain = [];
    $seen = [];
    $jar = tempnam(sys_get_temp_dir(), 'rl-jar-');

    $url = $start;
    $status = 0;

    // maxHops + 1: enough to prove the chain overshoots, without letting a
    // genuinely pathological target spin forever.
    for ($i = 0; $i <= $maxHops; $i++) {
        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => false,
            CURLOPT_HEADER => true,
            CURLOPT_TIMEOUT => $timeout,
            CURLOPT_CONNECTTIMEOUT => $timeout,
            CURLOPT_COOKIEJAR => $jar,
            CURLOPT_COOKIEFILE => $jar,
            CURLOPT_USERAGENT => 'redirect-loop-check/1.0',
            // Without a browser-like Accept header Laravel answers an
            // unauthenticated request with a 401 instead of redirecting to the
            // login page, and a 401 is treated as a terminal state. Every
            // protected route would then report "0 hops, OK" without the chain
            // ever being walked, which is exactly the chain that loops.
            CURLOPT_HTTPHEADER => [
                'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'Accept-Language: en-US,en;q=0.9',
            ],
        ]);

        $raw = curl_exec($ch);
        $error = curl_error($ch);
        $status = (int) curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
        $headerSize = (int) curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        curl_close($ch);

        @unlink($jar);

        if ($raw === false || $error !== '') {
            return ['chain' => $chain, 'status' => $status, 'loop' => false, 'error' => $error !== '' ? $error : 'request failed'];
        }

        $headers = substr($raw, 0, $headerSize);
        $chain[] = $status.' '.$url;

        if (isset($seen[$url])) {
            return ['chain' => $chain, 'status' => $status, 'loop' => true, 'error' => null];
        }
        $seen[$url] = true;

        $location = null;
        if (preg_match('/^Location:\s*(.+)$/mi', $headers, $m) === 1) {
            $location = trim($m[1]);
        }

        // Only 3xx carries a chain for this purpose. 401/403/404/500 are
        // terminal states, not hops.
        if ($location === null || $status < 300 || $status >= 400) {
            return ['chain' => $chain, 'status' => $status, 'loop' => false, 'error' => null];
        }

        $url = absolutize($location, $url);
    }

    return ['chain' => $chain, 'status' => $status, 'loop' => false, 'error' => null];
}

/**
 * Resolve a Location header that may be relative against the URL it came from.
 */
function absolutize(string $location, string $base): string
{
    if (preg_match('#^https?://#i', $location) === 1) {
        return $location;
    }

    $parts = parse_url($base);

    if (str_starts_with($location, '//')) {
        return ($parts['scheme'] ?? 'http').':'.$location;
    }

    $origin = ($parts['scheme'] ?? 'http').'://'.($parts['host'] ?? '');
    if (isset($parts['port'])) {
        $origin .= ':'.$parts['port'];
    }

    if (str_starts_with($location, '/')) {
        return $origin.$location;
    }

    $path = $parts['path'] ?? '/';
    $dir = substr($path, 0, (int) strrpos($path, '/') + 1);

    return $origin.$dir.$location;
}
