# LMS modernization audit and implementation plan

## Baseline and preservation

- User selected GitHub main as the authoritative baseline on 2026-11-04.
- Baseline commit: `44853b2` (Improve mobile navigation dismissal).
- Work branch: `lms-modernization`, in a separate checkout. Original local application files are preserved.
- Do not import the original working directory wholesale: it differs from main in 3,707 tracked files, including missing payment and private video-access functionality.
- Preserve database records, routes, permissions, configurable branding, and existing academic calculations. Test with an isolated database; never run test migrations on production.

## Initial findings

- Laravel 13, Inertia 3, React 19, Tailwind 4, modular academic/payment/frontend components, Pest 4.
- Instructor applications and decision notifications already exist. Admin recipients currently receive only database notifications, not email.
- Application notification rendering assumes feedback is present, although pending application notifications omit it.
- SMTP settings and a test-send-on-save workflow already exist; extend these rather than create a second settings workflow.
- SMTP configuration is applied by HTTP middleware. Background workers need their own configuration path before email can safely be queued.
- GitHub main contains module tests, but lacks the root Pest bootstrap and PHPUnit configuration needed for the requested test workflow.
- The main branch ignores environment backups. No production environment file is copied into the isolated checkout.

## Implementation sequence

1. Establish isolated test infrastructure and baseline checks.
2. Fix email configuration, application alerts, safe retries, and decision idempotency within the existing workflow.
3. Add persistent academic terminology settings and reusable display helpers; preserve academic identifiers and email subject fields.
4. Polish existing layouts, dashboards, authentication, and role-specific mobile navigation while retaining customization.
5. Run focused regression tests after each change, then broader automated, build, and browser checks.
6. Commit and push reviewed batches to the modernization branch.

## Verification status

Implementation and testing are in progress. SMTP delivery, DNS authentication, production workers, and browser flows have not yet been verified. No inbox-delivery guarantee is made.

## Verified implementation batches

- `84d1907`: SMTP test configuration is restored on success and failure; cached mailers are refreshed, SMTP connections have a timeout, and application alerts include queued admin email with immediate database delivery. Nine regression tests passed.
- Academic terminology now has an administrator-only settings tab, institution presets and custom singular/plural labels, persistent settings storage, cache invalidation, capitalization handling, shared academic translation labels, and mobile-navigation integration. No database migration is required. Hardcoded display wording still needs a complete pass before terminology coverage can be considered complete.
- Mobile navigation provides distinct student, instructor and administrator destinations, unread badges, active states, a More drawer, and safe-area spacing using existing theme colors and routes. Browser/device verification remains outstanding.
- Corrected the default test-user role and admin translation fixture. The module page test now verifies the actual module component path rather than asking Inertia's root-page finder to resolve a module alias.
- Restored missing shared AI content types and guarded the optional AI usage navigation route.
- Full automated suite: **55 passed, 201 assertions**. TypeScript passed and the final frontend build completed in **52.13 seconds**. Build warnings remain for two pre-existing decorative image references and plugin timing.

## Remaining work

- Verify production worker configuration and external mail delivery; ownership, duplicate-decision checks and SMTP prop redaction are covered by regression tests.
- Complete academic terminology coverage in hardcoded UI copy, notifications, email and printable templates.
- Continue dashboard/authentication visual polish and browser accessibility/responsiveness checks.
- Verify external email delivery and sender DNS only with the required environment access.

## Security and delivery follow-up (2026-11-05)

- Applicant ownership is now checked on create/update requests. Application creation locks the user row and rejects duplicates before file handling. Decision updates lock the application and suppress repeated decisions; notification data records reviewer, application, old status and new status. Editing an approved profile no longer reopens its application.
- SMTP passwords are omitted from frontend page props and retained when the password field is blank. SMTP exceptions return safe diagnostics. Administrators can send a rate-limited test message without changing settings.
- Mail notifications load database SMTP settings through a notification event listener, including in queue workers. Verification and reset notifications queue after commit. SMTP configuration no longer blocks unrelated page navigation.
- CAPTCHA secrets and OAuth tokens are excluded from frontend serialization. CAPTCHA enforcement uses server settings, not a client flag. New OAuth accounts receive random passwords; legacy Google accounts with the former shared password cannot use password login until reset, while Google sign-in remains available.
- Expanded automated suite: **77 passed, 263 assertions**. External SMTP/DNS and device-browser checks remain unverified.

## Dashboard and terminology follow-up (2026-11-05)

- Instructors without a linked profile now receive scoped empty dashboard statistics rather than institution-wide counts. Administrators see a real pending-application count. Monthly revenue aggregation supports SQLite tests alongside the existing production database expressions.
- Dashboard and authentication layouts use existing theme colors and configured branding. Student learning lists include an actionable empty state.
- Academic terminology now covers additional management headings, approval emails, certificate and marksheet display copy. Stored academic records remain unchanged; regression tests verify this. Request-scoped label memoization avoids repeated setting lookups.
- The full suite passes: **81 tests, 275 assertions**. TypeScript checking passes. Browser preview could not start because the browser-control process failed; visual/device verification remains outstanding.
- Production frontend build passed in 57.95 seconds; existing decorative-image and plugin-timing warnings remain.

## Active-project integration and branding (2026-11-06)

- Confirmed both the running Artisan server and Laragon virtual host serve `C:/laragon/www/gilms.ac.ug`, whereas the earlier commits were made in the nested Git checkout. Merged the modernization changes into the active directory, retaining local changes and backing up affected files under `storage/app/private/modernization-backup-20261106`.
- Repaired the active project's malformed installer route file using the GitHub version. Its `public/storage` was a disconnected ordinary directory. Preserved its 23 additional files, verified no file-content conflicts, and replaced it with a junction to `storage/app/public`. The previous directory remains in the private backup.
- Branding settings now preserve unrelated fields on partial updates, exclude temporary upload/form fields, and invalidate the resolved system settings. System settings use a request-scoped binding. Existing local upload URLs resolve against the current host with file-version cache busting; external URLs remain unchanged when they do not correspond to a local upload. The favicon refreshes after Inertia navigation.
- Live HTTP verification: login returned 200 with academic terminology props; dark logo, light logo, favicon and login banner each returned 200 with image/png content. Active frontend TypeScript and production build passed. Active modernization tests: 51 passed, 147 assertions. Git checkout full suite: 84 passed, 285 assertions.
- The active folder's broader legacy suite is not green: its initial run had 101 failures and 129 passes, including missing AI classes and obsolete/missing routes. The specific integration failures were repaired and the focused tests rerun. This is not a claim that every original requirement or legacy feature is complete. Interactive browser automation was unavailable; authenticated device walkthroughs remain unverified.

### Where to find the changes

- Admin: Settings > System Settings > Academic Terminology (presets and custom singular/plural labels).
- The fixed bottom navigation is for authenticated users below the `md` breakpoint (768px). Student, instructor and admin destinations differ; desktop navigation remains available above that width.
- System settings control the logo variants, favicon and authentication banner independently. The dashboard retains clickable statistics and adds the overview/quick-action panel.

### Uploading to a server

Deploy the `lms-modernization` branch, including its built `public/build` assets. Preserve the server's `.env`, `APP_KEY`, database and `storage/app/public` uploads. Do not upload the private local backup, `public/hot`, or a Windows storage junction. The web document root must point to `public`.

After installing the locked dependencies, run `php artisan storage:link` on the server, then `php artisan config:clear`, `php artisan route:clear` and `php artisan view:clear`. Set the server's correct HTTPS `APP_URL`, and ensure `storage` and `bootstrap/cache` are writable. Rebuild configuration caches only after reviewing the server environment. No new database migrations are required for these modernization changes; academic terminology uses the existing settings table.

Queued mail requires a supervised queue worker and `php artisan queue:restart` after deployment. Check the login page, both logo themes, favicon, a new image upload, all three roles on mobile, and the SMTP test on the actual server. Server credentials, remote deployment and external email delivery were not available for verification.
- Follow-up browser verification used isolated headless Chrome: the fully rendered login screen was inspected at 1440px and 390px. All three rendered images loaded; the mobile page had no horizontal overflow. No JavaScript exception was reported during this login check. The first immediate screenshot preceded frontend rendering; authenticated role walkthroughs remain outstanding.

## Profile media, notifications and mobile follow-up (2026-11-07)

- Profile URLs resolve existing local uploads against the current host with file-version cache busting. Replacement uploads are saved successfully before previous media is deleted. Public expert cards display initials on image failure, constrain long names, and expose overlays on touch screens. Collection requests bypass stale caches and refresh when users return to the tab. Curated collection ordering now works with SQLite and MySQL.
- Notifications use one lightweight authenticated JSON poll, normally every two seconds while visible. The feed is separate from the paginated notification page and carries the full unread count. New arrivals trigger a toast and a quiet two-note chime after browser audio is unlocked by interaction; a persisted mute control is available. This is polling, not instantaneous websocket delivery.
- Long dashboard names are limited to two lines; header/breadcrumb widths and profile text are constrained. An isolated Chrome dashboard fixture at 390px showed no horizontal overflow, visible bottom navigation and updated badges after a simulated notification. This uses synthetic test data, not a complete authenticated role walkthrough or a real-device sound test.
- Validation: Git checkout full suite 92 passed (325 assertions); active project focused suite 59 passed (187 assertions); four notification tracker tests passed; TypeScript checks and both production builds passed. Pint and diff checks passed. Build concurrency was reduced after an initial memory failure; the prior active assets are retained in the private backup.
- The existing instructor profile points to storage/29/St.-Gideon-Junior-School-Logo.png, which is missing from local storage and returns 404 at its recorded public URL. That original photo must be uploaded again. No unrelated image was substituted and no real user records were changed during testing. Existing broader active-project legacy test failures remain as documented above.
