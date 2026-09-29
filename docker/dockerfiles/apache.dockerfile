FROM httpd:2.4-alpine

RUN apk add --no-cache bash curl \
   && sed -i '/LoadModule proxy_module/s/^#//g' /usr/local/apache2/conf/httpd.conf \
   && sed -i '/LoadModule proxy_fcgi_module/s/^#//g' /usr/local/apache2/conf/httpd.conf \
   && sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf \
   && sed -i '/LoadModule slotmem_shm_module/s/^#//g' /usr/local/apache2/conf/httpd.conf \
   && mkdir -p /var/log/apache2 \
   && echo "IncludeOptional conf/vhosts/*.conf" >> /usr/local/apache2/conf/httpd.conf

COPY docker/config/apache.conf /usr/local/apache2/conf/vhosts/laravel.conf

WORKDIR /var/www/html

COPY . .
