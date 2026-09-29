<?php

namespace Modules\Maintenance\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Modules\Maintenance\Models\UpdatePackage;
use Modules\Maintenance\Services\UpdatePackageLibrary;
use Modules\Maintenance\Services\UpdateRunState;
use RuntimeException;

/**
 * Step one of the update flow: get a package onto the server and find out
 * whether it is any good — without touching the running application.
 *
 * Installing it is step two, in UpdaterController.
 */
class UpdatePackageController extends Controller
{
    public function __construct(
        private UpdatePackageLibrary $library,
        private UpdateRunState $runState
    ) {}

    /**
     * Adopt a completed chunked upload as an update package and validate it.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'upload_id' => ['required', 'integer'],
        ]);

        try {
            $package = $this->library->register((int) $validated['upload_id'], Auth::id());
        } catch (RuntimeException $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }

        if ($package->status === UpdatePackage::STATUS_INVALID) {
            return redirect()->back()->with(
                'warning',
                "\"{$package->original_filename}\" was uploaded but cannot be installed. See the details in the update dialog."
            );
        }

        return redirect()->back()->with(
            'success',
            "Version {$package->version} uploaded and verified successfully."
        );
    }

    /**
     * Re-check a stored package. A file can rot on disk, and a package that was
     * valid when uploaded may not be applicable any more.
     */
    public function verify(int $id): RedirectResponse
    {
        $package = UpdatePackage::findOrFail($id);

        $this->library->reverify($package);

        return redirect()->back()->with(
            $package->status === UpdatePackage::STATUS_READY ? 'success' : 'warning',
            $package->status === UpdatePackage::STATUS_READY
                ? "\"{$package->original_filename}\" is valid and ready to install."
                : "\"{$package->original_filename}\" did not pass verification."
        );
    }

    public function destroy(int $id): RedirectResponse
    {
        $package = UpdatePackage::findOrFail($id);

        // Deleting the package an in-flight run is reading from would leave it
        // with nothing to resume from.
        if ($this->runState->isRunningPackage($package->id)) {
            return redirect()->back()->with(
                'error',
                'This package is currently being installed and cannot be deleted.'
            );
        }

        $filename = $package->original_filename;

        $this->library->delete($package);

        return redirect()->back()->with('success', "\"{$filename}\" was deleted.");
    }
}
