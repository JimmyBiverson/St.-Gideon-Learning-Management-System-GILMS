# Multi-stage build for production
FROM composer:2.7 AS vendor

WORKDIR /app

# Copy composer files
COPY composer.json composer.lock ./

# Install production dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Production PHP stage
FROM php:8.3-fpm-alpine

# Install system dependencies
RUN apk add --no-cache \
   libzip-dev \
   zip \
   libpng-dev \
   libjpeg-turbo-dev \
   freetype-dev \
   libxml2-dev \
   icu-dev \
   oniguruma-dev \
   imagemagick-dev \
   supervisor \
   curl \
   openssl \
   nginx \
   && docker-php-ext-configure gd --with-freetype --with-jpeg \
   && docker-php-ext-install -j$(nproc) \
   gd \
   pdo_mysql \
   zip \
   bcmath \
   intl \
   opcache \
   exif \
   imagick \
   && pecl install redis \
   && docker-php-ext-enable redis

# Copy composer dependencies from vendor stage
COPY --from=vendor /app/vendor/ /var/www/html/vendor/

# Copy application code
COPY . /var/www/html/

# Set permissions
RUN chown -R www-data:www-data /var/www/html \
   && chmod -R 755 /var/www/html \
   && chmod -R 777 /var/www/html/storage \
   && chmod -R 777 /var/www/html/bootstrap/cache

# Create log directories
RUN mkdir -p /var/log/php \
   && chown -R www-data:www-data /var/log/php

# Copy PHP configuration
COPY docker/config/php.prod.ini /usr/local/etc/php/conf.d/99-custom.ini

# Copy supervisor configuration
COPY docker/config/supervisor.prod.conf /etc/supervisor/conf.d/supervisor.conf

# Copy entrypoint
COPY docker/entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Laravel caches are deliberately NOT warmed here.
#
# .dockerignore keeps .env out of the build context and docker-compose injects
# the real values at run time, so `php artisan config:cache` in a build layer
# either fails the build or bakes an empty APP_KEY into bootstrap/cache/config.php.
# The latter is the nastier one: the app then boots with a key that disagrees
# with the one used to encrypt existing data, so sessions, cookies and
# password-reset tokens all fail to decrypt and the site throws on first load.
#
# The entrypoint warms them at container start instead, where the environment
# actually exists.

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
   CMD php-fpm -t || exit 1

EXPOSE 9000

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisor.conf"]
