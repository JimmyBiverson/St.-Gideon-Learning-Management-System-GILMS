# Multi-stage build for production
FROM node:20-alpine AS node-build

WORKDIR /var/www/html

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build assets
RUN npm run build

# Production Nginx stage
FROM nginx:1.25-alpine

# Install additional packages
RUN apk add --no-cache \
   openssl \
   curl \
   && rm -rf /var/cache/apk/*

# Copy custom Nginx configuration
COPY docker/config/nginx.prod.conf /etc/nginx/nginx.conf
COPY docker/config/nginx.prod.conf /etc/nginx/conf.d/default.conf

# Copy built assets from node-build stage
COPY --from=node-build /var/www/html/public /var/www/html/public

# Create log directories
RUN mkdir -p /var/log/nginx \
   && mkdir -p /var/www/html/storage/logs \
   && chown -R nginx:nginx /var/log/nginx \
   && chown -R nginx:nginx /var/www/html/storage

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
   CMD curl -f http://localhost/ || exit 1

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
