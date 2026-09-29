# Multi-stage Dockerfile for Laravel Mentor LMS
FROM node:22-alpine AS node-builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install Node dependencies (including dev dependencies for build)
RUN npm ci

# Copy all source files for build (Vite may need access to various files)
COPY . .

# Build assets
RUN npm run build

# PHP Stage
FROM php:8.3-fpm-alpine AS php-base

# Install system dependencies
RUN apk add --no-cache \
    bash \
    curl \
    freetype-dev \
    g++ \
    gcc \
    git \
    icu-dev \
    jpeg-dev \
    libpng-dev \
    libzip-dev \
    make \
    mysql-client \
    nginx \
    oniguruma-dev \
    redis \
    supervisor \
    unzip \
    zip \
    autoconf \
    pkgconf \
    linux-headers \
    openssl \
    ca-certificates

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        bcmath \
        exif \
        gd \
        intl \
        mbstring \
        opcache \
        pcntl \
        pdo \
        pdo_mysql \
        zip

# Install Redis extension with proper configuration
RUN pecl config-set php_ini /usr/local/etc/php/php.ini \
    && pecl install redis \
    && docker-php-ext-enable redis

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /var/www/html

# Copy PHP configuration
COPY docker/config/php.prod.ini /usr/local/etc/php/conf.d/99-custom.ini

# No php-fpm pool config is copied here on purpose: docker/php/php-fpm.conf does
# not exist in this repository, and the php:8.3-fpm-alpine base image already
# ships a working www pool. Copying the missing path was one of the reasons this
# Dockerfile could never build.

# Copy Nginx configuration
#
# docker/config/nginx.conf is a *server block*, not a full nginx.conf, so it must
# not be written to /etc/nginx/nginx.conf — nginx rejects a bare `server {}` in
# the main context. The base image includes /etc/nginx/http.d/*.conf from inside
# its http block, so that is where a site config belongs.
COPY docker/config/nginx.conf /etc/nginx/http.d/default.conf

# Copy Supervisor configuration
COPY docker/config/supervisor.prod.conf /etc/supervisor/conf.d/supervisord.conf

# Copy entrypoint
COPY docker/entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Copy application code
COPY --chown=www-data:www-data . .

# Copy built assets from node stage
COPY --from=node-builder --chown=www-data:www-data /app/public/build ./public/build

# Copy environment file from docker.env to .env if .env doesn't exist
RUN if [ ! -f .env ]; then cp docker.env .env; fi

# Generate APP_KEY if not present (required for some Composer operations)
RUN if ! grep -q "APP_KEY=base64:" .env; then \
        php artisan key:generate --no-interaction || \
        echo "APP_KEY=base64:$(openssl rand -base64 32)" >> .env; \
    fi

# Create necessary directories before Composer install
RUN mkdir -p storage/logs storage/framework/cache storage/framework/sessions storage/framework/views \
    && mkdir -p bootstrap/cache

# Debug: Check Composer and PHP setup
RUN composer --version && php --version

# Configure Composer
ENV COMPOSER_ALLOW_SUPERUSER=1
ENV COMPOSER_NO_INTERACTION=1
ENV COMPOSER_MEMORY_LIMIT=2G

# Update composer.lock to match PHP version and install dependencies
# Update symfony packages to resolve security advisories
RUN composer update symfony/http-foundation symfony/http-kernel --with-all-dependencies --no-dev --optimize-autoloader --no-interaction --verbose \
    && composer install --no-dev --optimize-autoloader --no-interaction --verbose

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache

# Create necessary directories
RUN mkdir -p /var/www/html/storage/logs \
    && mkdir -p /var/www/html/storage/framework/cache \
    && mkdir -p /var/www/html/storage/framework/sessions \
    && mkdir -p /var/www/html/storage/framework/views \
    && mkdir -p /var/www/html/storage/app/public \
    && mkdir -p /var/log/supervisor \
    && mkdir -p /var/log/nginx \
    && mkdir -p /var/run \
    && chown -R www-data:www-data /var/www/html/storage

# Fix Nginx temp directories permissions for file uploads
RUN chown -R www-data:www-data /var/lib/nginx/ \
&& chmod -R 755 /var/lib/nginx/tmp

# Create storage symlink and test files
#
# public/debug.php is deliberately not created. It globbed the Modules route
# directory and printed the result, which is filesystem layout disclosure on a
# publicly served path, and nothing — including the healthcheck — ever used it.
RUN php artisan storage:link || echo "Storage link creation failed, but continuing..." \
    && echo '<?php echo "Laravel Test: " . date("Y-m-d H:i:s") . "<br>PHP Version: " . phpversion(); ?>' > /var/www/html/public/test.php \
    && echo 'healthy' > /var/www/html/public/health \
    && chmod 644 /var/www/html/public/test.php /var/www/html/public/health

# Ensure the app is NOT marked as installed (for first-time setup)
# RUN rm -f /var/www/html/public/installed

# Clear any cached routes/config that might interfere with installation
RUN php artisan config:clear || true \
    && php artisan route:clear || true \
    && php artisan view:clear || true

# Expose ports
EXPOSE 80

# Health check (more lenient)
HEALTHCHECK --interval=60s --timeout=10s --start-period=30s --retries=5 \
    CMD curl -f http://localhost:80/health || curl -f http://localhost:80/test.php || exit 1

# Start supervisor
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
