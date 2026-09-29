FROM php:8.3-fpm-alpine

WORKDIR /var/www/html

RUN addgroup -g 1000 laravel && adduser -G laravel -g laravel -s /bin/sh -D laravel \
   && sed -i 's/^user = .*/user = laravel/' /usr/local/etc/php-fpm.d/www.conf \
   && sed -i 's/^group = .*/group = laravel/' /usr/local/etc/php-fpm.d/www.conf \
   && sed -i 's/^listen\.owner = .*/listen.owner = laravel/' /usr/local/etc/php-fpm.d/www.conf \
   && sed -i 's/^listen\.group = .*/listen.group = laravel/' /usr/local/etc/php-fpm.d/www.conf

RUN apk add --no-cache \
   $PHPIZE_DEPS \
   icu-dev \
   libzip-dev \
   zlib-dev \
   oniguruma-dev \
   freetype-dev \
   libjpeg-turbo-dev \
   libpng-dev \
   && docker-php-ext-configure gd --with-freetype --with-jpeg \
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
   zip \
   && pecl install redis \
   && docker-php-ext-enable redis

COPY --chown=laravel:laravel . .

# RUN chown -R laravel:laravel .

USER laravel