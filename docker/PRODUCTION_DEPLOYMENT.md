# MentorLMS Production Deployment Guide

## Overview
This guide covers deploying MentorLMS in production using Docker Compose with optimized configurations for security, performance, and scalability.

## Prerequisites
- Docker & Docker Compose installed
- SSL certificates (or use Let's Encrypt)
- Domain name configured
- At least 4GB RAM, 2 CPU cores
- 20GB+ storage space

## Quick Deployment

### 1. Prepare Environment Files
```bash
# Copy production environment templates
cp docker/env/mysql.prod.env.example docker/env/mysql.prod.env
cp .env.production.example .env.production

# Edit production configurations
nano docker/env/mysql.prod.env
nano .env.production
```

### 2. Configure Domain & SSL
```bash
# Update .env.production with your domain
APP_URL=https://your-domain.com
SESSION_DOMAIN=.your-domain.com
SANCTUM_STATEFUL_DOMAINS=your-domain.com,www.your-domain.com

# Place SSL certificates in docker/ssl/
cp cert.pem docker/ssl/cert.pem
cp key.pem docker/ssl/key.pem
```

### 3. Deploy Application
```bash
# Build and start production containers
sudo docker compose -f docker-compose.prod.yaml up -d --build

# Run database migrations
sudo docker compose -f docker-compose.prod.yaml exec php php artisan migrate --force

# Seed database (if needed)
sudo docker compose -f docker-compose.prod.yaml exec php php artisan db:seed --force
```

### 4. Optimize Application

The `php` image warms its own caches at start-up via `docker/entrypoint.sh`, so a
normal `docker compose up -d` is already optimized and none of the below is
required. Run it by hand only after changing `.env` or any config file, since
Laravel reads those from a compiled `bootstrap/cache/config.php` and will keep
using the old values until the cache is rebuilt.

```bash
# Clear and rebuild configuration, route, view and event caches
sudo docker compose -f docker-compose.prod.yaml exec php php artisan optimize:clear
sudo docker compose -f docker-compose.prod.yaml exec php php artisan optimize
```

> **Do not move these commands into the Dockerfile.** `.dockerignore` excludes
> `.env`, and the real values are injected by Compose at run time, so a
> build-time `config:cache` either fails the build or compiles an empty
> `APP_KEY` into the image. That second case is the dangerous one: the app then
> boots with a key that cannot decrypt anything that was encrypted with the real
> one, so sessions, cookies and password-reset tokens all fail on first load.

## Environment Configuration

### Production Environment Variables (.env.production)
**Critical Settings:**
- `APP_ENV=production`
- `APP_DEBUG=false`
- `APP_URL=https://your-domain.com`
- `DB_PASSWORD` - Strong database password
- `REDIS_PASSWORD` - Redis authentication
- `MAIL_PASSWORD` - Email service password

### Database Security
```bash
# Generate strong passwords
openssl rand -base64 32  # For database
openssl rand -base64 32  # For Redis
```

### SSL Configuration
```bash
# Option 1: Use existing certificates
cp your-cert.pem docker/ssl/cert.pem
cp your-key.pem docker/ssl/key.pem

# Option 2: Use Let's Encrypt (recommended)
sudo docker compose -f docker-compose.prod.yaml --profile ssl up certbot
```

## Services Overview

### Core Services
- **Nginx**: Web server with SSL termination
- **PHP-FPM**: Application server with OPcache
- **MySQL**: Database with performance tuning
- **Redis**: Caching and sessions

### Optional Services
- **Backup**: Automated database backups
- **Monitoring**: Prometheus + Grafana
- **SSL**: Let's Encrypt certificate management

## Performance Optimization

### Nginx Configuration
- HTTP/2 support
- Gzip compression
- Static file caching
- FastCGI caching
- Security headers

### PHP Configuration
- OPcache enabled
- Memory limits optimized
- Error handling for production
- Session storage in Redis

### Database Configuration
- InnoDB buffer pool: 256MB
- Query cache enabled
- Connection limit: 200
- Binary logging for backups

## Security Configuration

### Network Security
- Isolated Docker network
- Only necessary ports exposed
- SSL/TLS encryption enforced
- Security headers configured

### Application Security
- Environment variables for secrets
- File permissions restricted
- Error display disabled
- Session security enabled

## Monitoring & Maintenance

### Health Checks
All services include health checks:
```bash
# Check service status
sudo docker compose -f docker-compose.prod.yaml ps
```

### Logs Management
```bash
# View application logs
sudo docker compose -f docker-compose.prod.yaml logs -f php

# View Nginx logs
sudo docker compose -f docker-compose.prod.yaml logs -f nginx
```

### Automated Backups
```bash
# Enable backup service
sudo docker compose -f docker-compose.prod.yaml --profile backup up -d

# Manual backup
sudo docker compose -f docker-compose.prod.yaml exec mysql mysqldump -u root -p mentor_lms_prod > backup.sql
```

### Monitoring Setup
```bash
# Enable monitoring stack
sudo docker compose -f docker-compose.prod.yaml --profile monitoring up -d

# Access Grafana: http://your-server:3000
# Access Prometheus: http://your-server:9090
```

## Scaling Options

### Horizontal Scaling
```yaml
# Scale PHP workers
php:
  deploy:
    replicas: 3
```

### Load Balancing
- Use Nginx upstream blocks
- Configure multiple PHP instances
- Implement session affinity

## Troubleshooting

### Common Issues

#### SSL Certificate Errors
```bash
# Check certificate paths
sudo docker compose -f docker-compose.prod.yaml exec nginx ls -la /etc/nginx/ssl/

# Test SSL configuration
sudo docker compose -f docker-compose.prod.yaml exec nginx nginx -t
```

#### Database Connection Issues
```bash
# Test database connection
sudo docker compose -f docker-compose.prod.yaml exec php php artisan tinker
>>> DB::connection()->getPdo()
```

#### Performance Issues
```bash
# Check resource usage
sudo docker stats

# Monitor PHP OPcache
sudo docker compose -f docker-compose.prod.yaml exec php php -i | grep opcache
```

### Recovery Procedures

#### Database Recovery
```bash
# Restore from backup
sudo docker compose -f docker-compose.prod.yaml exec -T mysql mysql -u root -p mentor_lms_prod < backup.sql
```

#### Application Rollback
```bash
# Rollback to previous deployment
git checkout <previous-commit>
sudo docker compose -f docker-compose.prod.yaml up -d --build
```

## Maintenance Tasks

### Regular Updates
```bash
# Update containers
sudo docker compose -f docker-compose.prod.yaml pull
sudo docker compose -f docker-compose.prod.yaml up -d

# Clear Laravel cache
sudo docker compose -f docker-compose.prod.yaml exec php php artisan optimize:clear
```

### Log Rotation
```bash
# Configure logrotate for production
sudo nano /etc/logrotate.d/mentor-lms
```

### Security Updates
```bash
# Update base images
sudo docker compose -f docker-compose.prod.yaml pull
sudo docker compose -f docker-compose.prod.yaml up -d --build
```

## Production Checklist

### Pre-Deployment
- [ ] Environment variables configured
- [ ] SSL certificates installed
- [ ] Database credentials set
- [ ] Domain DNS configured
- [ ] Firewall rules configured
- [ ] Backup strategy planned

### Post-Deployment
- [ ] Application accessible via HTTPS
- [ ] Database migrations completed
- [ ] Cache optimization performed
- [ ] Monitoring enabled
- [ ] Backup service running
- [ ] Error logs checked
- [ ] Performance tested

## Support

### Emergency Contacts
- System Administrator: [contact-info]
- Database Administrator: [contact-info]
- DevOps Team: [contact-info]

### Documentation
- Application Logs: `/var/log/nginx/`, `/var/log/php/`
- Docker Logs: `sudo docker compose logs`
- Configuration Files: `docker/config/`

---

**Last Updated**: December 2025
**Version**: 1.0
**Environment**: Production
