<?php

use Tests\TestCase;

pest()->extend(TestCase::class)->in(
    'Feature',
    '../Modules/Course/tests/Feature',
    '../Modules/Frontend/tests/Feature',
);
