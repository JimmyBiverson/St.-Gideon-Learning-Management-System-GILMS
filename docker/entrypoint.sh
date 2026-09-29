#!/bin/sh
#
# Container entrypoint.
#
# Laravel caches are warmed here, at start-up, rather than at image build time.
# Building them in the Dockerfile cannot work for this app: .dockerignore keeps
# .env out of the build context, and the production values are injected by
# docker-compose at run time. A `config:cache` in the Dockerfile therefore either
# fails the build outright or bakes an empty APP_KEY into bootstrap/cache/config.php,
# which makes every encrypted value — sessions, cookies, passwords — undecryptable
# once the real key is finally present.

cd /var/www/html

log() {
    echo "[entrypoint] $*" >&2
}

# Warm one cache. Returns the command's own exit status so a caller can decide
# what to do; never exits, because a cache is an optimisation and a container
# that refuses to boot is the worse outcome.
#
# `cmd && { ... }` rather than `if cmd; then ...` so that $? on the next line is
# reliably the command's status rather than the if-statement's.
warm() {
    label="$1"
    shift

    "$@" && {
        log "warmed $label"
        return 0
    }

    status=$?
    log "WARNING: could not warm $label (exit $status); continuing without it"
    return "$status"
}

# config is the one that matters most: without it every request pays to re-read
# .env, and with a stale one it pays the wrong price.
warm "config cache" php artisan config:cache || true

# route:cache is the one that can genuinely fail on a perfectly healthy
# application: it refuses to serialise closure-based routes. A half-written
# cache — or one left over from a previous image — serves routes that no longer
# match the code, which is exactly how a site starts throwing on routes that
# plainly exist. Clearing on failure is version-proof, where sniffing for a
# hardcoded routes-v7.php would silently miss APP_ROUTES_CACHE overrides.
if ! warm "route cache" php artisan route:cache; then
    log "discarding route cache so a partial one cannot be served"
    php artisan route:clear || true
fi

warm "view cache"  php artisan view:cache  || true
warm "event cache" php artisan event:cache || true

# Supervisord drops to www-data for the queue worker, so the cache directories
# have to be writable by it or `config:cache` above just failed for a different
# reason on the next boot.
chown -R www-data:www-data bootstrap/cache storage 2>/dev/null || true

log "handing off to: $*"
exec "$@"
