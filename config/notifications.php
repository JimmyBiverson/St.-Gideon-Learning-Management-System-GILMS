<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Audience channels
    |--------------------------------------------------------------------------
    | Every audience always receives an in-app (database) notification, which
    | is what the notification bell renders. These flags only control whether
    | an EMAIL is also sent alongside it.
    |
    | Student email is off by default on purpose: mail is delivered
    | synchronously during the request that scheduled the live class, so
    | emailing a large cohort can make that request time out. Turn it on with
    | NOTIFICATIONS_EMAIL_STUDENTS=true only once a queue worker is running.
    */

    'email_admins' => env('NOTIFICATIONS_EMAIL_ADMINS', true),

    'email_instructors' => env('NOTIFICATIONS_EMAIL_INSTRUCTORS', true),

    'email_students' => env('NOTIFICATIONS_EMAIL_STUDENTS', false),

    /*
    |--------------------------------------------------------------------------
    | Student email ceiling
    |--------------------------------------------------------------------------
    | Safety net for the synchronous sends above. Even when student email is
    | enabled, never more than this many students are emailed per action.
    | Everyone still receives the in-app notification regardless.
    */

    'student_email_limit' => (int) env('NOTIFICATIONS_STUDENT_EMAIL_LIMIT', 50),

    /*
    |--------------------------------------------------------------------------
    | In-app notification feed
    |--------------------------------------------------------------------------
    | The feed is shared with every page. Hydrating the entire unread history
    | on every request gets slower as notifications pile up, so only the most
    | recent ones are sent and the badge is driven by the real count.
    */

    'unread_limit' => (int) env('NOTIFICATIONS_UNREAD_LIMIT', 15),

    /*
    |--------------------------------------------------------------------------
    | Live refresh
    |--------------------------------------------------------------------------
    | Milliseconds between background refreshes of the notification bell.
    | A poll is used instead of a websocket so that no extra service, process
    | or configuration is required to keep the bell current.
    */

    'poll_interval' => (int) env('NOTIFICATIONS_POLL_INTERVAL', 15000),

];
