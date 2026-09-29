<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Nwidart\Modules\Facades\Module;

/*
|--------------------------------------------------------------------------
| Plugin Routes
|--------------------------------------------------------------------------
|
| Routes for optional plugin modules. Each route is guarded by Module::has()
| so that Wayfinder never autoloads a controller from an uninstalled module.
|
*/

Route::prefix('dashboard')->group(function () {
   // AIAssistant ─────────────────────────────────────────────────────────────
   $aiControllerClass = 'Modules\AIAssistant\Http\Controllers\AIAssistantController';

   if (Module::has('AIAssistant')) {
      Route::get('ai-assistant/configuration', [$aiControllerClass, 'index'])->name('aiassistant.index');
   } else {
      Route::get('ai-assistant/configuration', fn () => Inertia::render('404'))->name('aiassistant.index');
   }
});