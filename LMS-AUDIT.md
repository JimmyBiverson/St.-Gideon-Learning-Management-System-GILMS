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
