<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function __construct(
        protected DashboardService $dashboardService,
    ) {}

    public function index()
    {
        $user = Auth::user();
        $currentYear = Carbon::now()->year;
        $data = $this->dashboardService->getDashboard($user, $currentYear);

        return Inertia::render('dashboard/index', $data);
    }
}
