<?php

use App\Models\Setting;
use Illuminate\Support\Str;

beforeEach(function () {
    $this->faviconPath = 'storage/favicon-cache-test-'.Str::uuid().'.png';
    $filePath = public_path($this->faviconPath);

    if (! is_dir(dirname($filePath))) {
        mkdir(dirname($filePath), 0777, true);
    }

    file_put_contents($filePath, 'test favicon');

    app()->instance('system', Setting::make([
        'fields' => [
            'name' => 'Test Site',
            'title' => 'Test Site',
            'description' => 'Test description',
            'keywords' => 'test',
            'author' => 'Test',
            'favicon' => 'https://old.example/'.$this->faviconPath,
            'banner' => null,
            'font_family' => 'inter',
            'global_style' => null,
        ],
    ]));
});

afterEach(function () {
    $filePath = public_path($this->faviconPath);

    if (is_file($filePath)) {
        unlink($filePath);
    }
});

it('adds the stored favicon modification time to the favicon URL', function () {
    $filePath = public_path($this->faviconPath);
    $lastModified = filemtime($filePath);
    $html = view('app', ['page' => ['component' => '']])->render();

    expect($html)->toContain('href="/'.$this->faviconPath.'?v='.$lastModified.'"');
});
