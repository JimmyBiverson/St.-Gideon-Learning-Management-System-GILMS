<?php

namespace App\Http\Controllers;

use App\Exceptions\PluginInstallException;
use App\Http\Requests\InstallPluginRequest;
use App\Http\Requests\TogglePluginRequest;
use App\Services\Plugins\PluginManagerService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PluginController extends Controller
{
    public function __construct(
        private PluginManagerService $pluginManager,
    ) {}

    public function index(): Response
    {
        return Inertia::render('dashboard/settings/plugins/index', [
            'plugins' => $this->pluginManager->listUploadedPlugins(),
        ]);
    }

    public function store(InstallPluginRequest $request): RedirectResponse
    {
        try {
            $moduleName = $this->pluginManager->installFromChunkedUrl(
                $request->string('plugin_file_url')->toString(),
            );

            return redirect()
                ->route('plugins.index')
                ->with('success', "Plugin [{$moduleName}] installed successfully. Enable it from the list when you are ready.");
        } catch (PluginInstallException $exception) {
            return redirect()
                ->route('plugins.index')
                ->with('error', $exception->getMessage());
        }
    }

    public function toggle(TogglePluginRequest $request, string $module): RedirectResponse
    {
        try {
            $this->pluginManager->toggle($module, $request->boolean('enabled'));

            $state = $request->boolean('enabled') ? 'enabled' : 'disabled';

            return redirect()
                ->route('plugins.index')
                ->with('success', "Plugin [{$module}] {$state} successfully.");
        } catch (PluginInstallException $exception) {
            return redirect()
                ->route('plugins.index')
                ->with('error', $exception->getMessage());
        }
    }

    public function seeder(string $module): RedirectResponse
    {
        try {
            $this->pluginManager->runUploadedPluginSeeder($module);

            return redirect()
                ->route('plugins.index')
                ->with('success', "Seeder for [{$module}] ran successfully.");
        } catch (PluginInstallException $exception) {
            return redirect()
                ->route('plugins.index')
                ->with('error', $exception->getMessage());
        }
    }
}
