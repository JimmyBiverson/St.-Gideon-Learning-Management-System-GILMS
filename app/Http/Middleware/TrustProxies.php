<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Middleware\TrustProxies as Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

class TrustProxies extends Middleware
{
    /**
     * The trusted proxies for this application.
     *
     * This should be set to the IP addresses or CIDR ranges of your reverse proxies.
     * For Docker environments, this is typically the Docker network range.
     *
     * SECURITY WARNING: Never use ['*'] in production unless you are behind a
     * trusted cloud load balancer (AWS ELB, Google Cloud Load Balancer, etc.)
     * and have verified that untrusted clients cannot set X-Forwarded-* headers.
     *
     * @var array<int, string>|string|null
     */
    protected $proxies = null;

    /**
     * The headers that should be used to detect proxies.
     *
     * @var int
     */
    protected $headers =
        Request::HEADER_X_FORWARDED_FOR |
        Request::HEADER_X_FORWARDED_HOST |
        Request::HEADER_X_FORWARDED_PORT |
        Request::HEADER_X_FORWARDED_PROTO |
        Request::HEADER_X_FORWARDED_PREFIX;

    /**
     * Constructor - Set trusted proxies based on environment
     */
    public function __construct()
    {
        // Determine trusted proxies based on environment
        $this->proxies = $this->getTrustedProxies();
    }

    /**
     * Establish which proxies to trust, then fix the generated URL scheme.
     *
     * The scheme has to be decided here, after the parent has worked out
     * which proxies to believe, and not in AppServiceProvider::boot(): service
     * providers boot before the HTTP middleware stack runs, so at boot time
     * no proxy is trusted yet and a request that genuinely arrived over HTTPS
     * through a load balancer still looks like plain HTTP.
     *
     * isSecure() only consults X-Forwarded-Proto when the request actually
     * came from a trusted proxy, so this cannot be talked into rewriting every
     * generated URL to https:// by a client that just sends the header.
     * Wrapping $next rather than reimplementing handle() keeps the trust
     * logic in one place if the framework ever changes it.
     */
    public function handle(Request $request, Closure $next)
    {
        return parent::handle($request, function (Request $request) use ($next) {
            if ($request->isSecure()) {
                URL::forceScheme('https');
            }

            return $next($request);
        });
    }

    /**
     * Get the trusted proxies based on the current environment
     *
     * @return array<int, string>|string|null
     */
    protected function getTrustedProxies()
    {
        // Option 1: Use environment variable (RECOMMENDED for production)
        // Set TRUSTED_PROXIES in your .env file:
        // TRUSTED_PROXIES=172.16.0.0/12,192.168.0.0/16
        if ($trustedProxies = env('TRUSTED_PROXIES')) {
            return array_map('trim', explode(',', $trustedProxies));
        }

        // Option 2: Auto-detect Docker environment
        if ($this->isDockerEnvironment()) {
            return [
                '172.16.0.0/12',  // Docker default bridge network
                '192.168.0.0/16', // Docker custom networks
                '10.0.0.0/8',     // Private network range
            ];
        }

        // Option 3: Cloud platform detection
        if ($this->isCloudPlatform()) {
            // For AWS ELB, Google Cloud Load Balancer, Azure Load Balancer
            // These platforms strip malicious headers, so trusting all is safe
            return '*';
        }

        // Option 4: Local development - trust localhost only
        if (config('app.env') === 'local') {
            return [
                '127.0.0.0/8',    // Localhost
                '::1',            // IPv6 localhost
            ];
        }

        // Default: Don't trust any proxies (most secure)
        return null;
    }

    /**
     * Detect if running in Docker environment
     */
    protected function isDockerEnvironment(): bool
    {
        // Check for Docker-specific environment indicators
        return env('DB_HOST') === 'mysql'
            || env('REDIS_HOST') === 'redis'
            || file_exists('/.dockerenv')
            || (file_exists('/proc/1/cgroup') && str_contains(file_get_contents('/proc/1/cgroup'), 'docker'));
    }

    /**
     * Detect if running on a cloud platform
     */
    protected function isCloudPlatform(): bool
    {
        // Detect common cloud platforms
        $cloudIndicators = [
            'AWS_EXECUTION_ENV',           // AWS Lambda/Elastic Beanstalk
            'GOOGLE_CLOUD_PROJECT',        // Google Cloud
            'WEBSITE_INSTANCE_ID',         // Azure App Service
            'HEROKU_APP_NAME',             // Heroku
            'RAILWAY_ENVIRONMENT',         // Railway
            'RENDER',                      // Render
            'VERCEL',                      // Vercel
        ];

        foreach ($cloudIndicators as $indicator) {
            if (env($indicator)) {
                return true;
            }
        }

        return false;
    }
}
