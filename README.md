# Learning Management System (LMS)

A web-based Learning Management System designed to make online learning easier for students, instructors, and administrators.

The system provides separate dashboards and features for students, instructors, and administrators, allowing institutions to manage courses, learning content, users, enrollments, and learning activities from one platform.

## Features

### Student
- Create and manage an account
- Browse available courses
- Enroll in courses
- Access course content and lessons
- Track learning progress
- View enrolled courses
- Complete learning activities
- Receive certificates where applicable
- Manage personal profile

### Instructor
- Instructor dashboard
- Create and manage courses
- Add course lessons and learning materials
- Manage enrolled students
- Monitor student progress
- Update course information
- Manage course content
- Schedule and manage live classes

### Administrator
- Admin dashboard
- Manage students and instructors
- Manage courses and categories
- Monitor platform activities
- Manage users and permissions
- Manage enrollments
- Manage certificates
- Manage and maintain the overall LMS

## Technology Stack

- **Backend:** Laravel 13 on PHP 8.3+ (developed against PHP 8.4)
- **Database:** MySQL
- **Frontend:** React 19 with TypeScript, rendered server-side through Inertia 3
- **Styling:** Tailwind CSS 4
- **Build tool:** Vite 8 with `laravel-vite-plugin`
- **Authentication:** Laravel Authentication (session based)
- **Notifications:** Laravel Notifications (database + mail channels)
- **Modules:** nwidart-style modular structure under `Modules/`
- **Version Control:** Git & GitHub

### Feature Modules

| Module | Responsibility |
| --- | --- |
| `Course` | Courses, sections, lessons, quizzes, live classes, enrollments |
| `Exam` | Exams, questions, attempts and exam enrollments |
| `Store` | Products, product categories and orders |
| `Billing` | Payment gateways, payment and payout history |
| `Certification` | Certificate and marksheet templates |
| `Blog` | Blog posts, categories and comments |
| `Frontend` | Site pages, page builder and page collections |
| `Language` | Languages and translations |
| `Maintenance` | Backups and application updates |
| `Installer` | Guided first-run installation |

## System Structure

The LMS is built around three main user roles:

```text
                    Learning Management System
                              |
          ---------------------------------------------
          |                     |                     |
       Student              Instructor              Admin
          |                     |                     |
       Courses              Courses               Users
       Lessons              Lessons               Courses
       Enrollment           Students              Enrollments
       Progress             Progress              Certificates
       Certificates         Management            System Settings
```

The application entry points are:

```text
app/                  Core application code (models, services, notifications, middleware)
Modules/<Module>/     Feature modules, each with its own routes, models and controllers
resources/js/         React components, pages, layouts and hooks
resources/views/      Blade templates (app shell and package views)
config/               Configuration files
database/             Migrations, seeders and factories
public/               Public web root, including the committed build output
public/build/         Compiled Vite assets (committed, so the server needs no Node)
storage/              Logs, framework cache and generated page data
```

## Live Class Notifications

Scheduling, rescheduling or cancelling a live class notifies everyone concerned through the in-app notification bell and, where enabled, by email.

### Who is notified

| Audience | Rule |
| --- | --- |
| Administrators | Every active administrator **except** the person who made the change |
| Instructor | The instructor who owns the course, unless they made the change |
| Students | Every **actively enrolled** student on the course, except the person who made the change |

Active means a non-deleted user. An active student is one with a `CourseEnrollment` whose
`enrollment_type` is `lifetime`, or whose `expiry_date` is still in the future.

Each audience is resolved and delivered independently, so a problem with one group can never
stop the others, and can never prevent the live class itself from being saved or cancelled.

### Delivery rules

- Every audience always receives the in-app (database) notification. This is what the bell renders.
- Email is **additional** and is controlled per audience by the settings below.
- The database channel is always written **before** any email is attempted, so a rejected or
  unreachable mailbox can never cost someone their in-app notification.
- Delivery is synchronous and wrapped in `try/catch`. A mail failure is logged as a warning and
  never rolls back or blocks the live class action.

### Configuration

These are read from the environment and are all optional — the defaults below apply when unset.

| Variable | Default | Purpose |
| --- | --- | --- |
| `NOTIFICATIONS_EMAIL_ADMINS` | `true` | Also email administrators |
| `NOTIFICATIONS_EMAIL_INSTRUCTORS` | `true` | Also email the owning instructor |
| `NOTIFICATIONS_EMAIL_STUDENTS` | `false` | Also email enrolled students |
| `NOTIFICATIONS_STUDENT_EMAIL_LIMIT` | `50` | Maximum students emailed per action |
| `NOTIFICATIONS_UNREAD_LIMIT` | `15` | Unread rows sent to the bell per request |
| `NOTIFICATIONS_POLL_INTERVAL` | `15000` | Milliseconds between bell refreshes |

Student email is **off by default** on purpose. Mail is sent during the request that scheduled
the class, so emailing a large cohort can make that request slow. Even when student email is
enabled, no more than `NOTIFICATIONS_STUDENT_EMAIL_LIMIT` students are emailed per action, and
everyone still receives the in-app notification regardless of cohort size.

### Near-real-time updates

The bell refreshes in the background every `NOTIFICATIONS_POLL_INTERVAL` milliseconds using
Inertia's `router.poll()`. A poll is used rather than a websocket so that no extra service,
process or configuration is required to keep the bell current.

To avoid hydrating an ever-growing notification list on every request, only the most recent
`NOTIFICATIONS_UNREAD_LIMIT` unread rows are sent, while the badge itself shows the true unread
count.

## Local Setup

Requirements: PHP 8.3+, Composer, Node 20+, and MySQL.

```bash
# install PHP dependencies
composer install

# install frontend dependencies
npm install

# create the environment file
cp .env.example .env
php artisan key:generate

# create the database, then configure DB_* in .env
php artisan migrate
php artisan db:seed

# run the app
php artisan serve
npm run dev
```

> Use `npm install` rather than `npm ci`. The committed `package.json` and `package-lock.json`
> are currently out of sync, so `npm ci` will refuse to run until the lockfile is regenerated.

Run the frontend and PHP servers side by side in development. In production the compiled assets
in `public/build` are used, so no Node process is needed.

## Deployment

The repository ships the compiled frontend, so the server does **not** need Node, npm or a build
step. After the code is in place, deployment is configured from `.env` alone.

```bash
# PHP dependencies (needed once per release, unless vendor/ is already deployed)
composer install --no-dev --optimize-autoloader

# one-time, exposes uploaded files under public/
php artisan storage:link

# point the vhost document root at the public/ directory

# after editing .env
php artisan optimize:clear
php artisan migrate --force
```

A reverse proxy in front of the app should be listed in `TRUSTED_PROXIES` so `X-Forwarded-Proto`
is honoured, and `APP_URL` must be set to the real public URL so notification links are correct.

## Contributing

1. Create a branch from `main`.
2. Make the change, keeping unrelated changes out of the commit.
3. If you touched the frontend, rebuild so the committed build stays in sync:
   ```bash
   npm run build
   ```
   `public/build` is committed, so forgetting this will deploy stale assets.
4. Commit and open a pull request.

## License

All rights reserved.
