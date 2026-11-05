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

- Complete teacher application ownership, duplicate-decision and audit-history checks.
- Prevent SMTP credentials from being returned to frontend responses; review all email flows and worker configuration.
- Complete academic terminology coverage in hardcoded UI copy, notifications, email and printable templates.
- Continue dashboard/authentication visual polish and browser accessibility/responsiveness checks.
- Verify external email delivery and sender DNS only with the required environment access.
