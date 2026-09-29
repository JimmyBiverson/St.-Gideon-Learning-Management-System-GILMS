<?php

namespace Modules\Frontend\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Frontend\Models\ProjectPage;

class FrontendPageUpdateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $changes = [
            [
                'prev' => "pointer-events-none absolute bottom-0 left-0 h-[240px] w-[240px] rounded-full bg-[rgba(0,120,103,1)] blur-[200px] content-['']",
                'new' => "pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(0,120,103,0.45)_0%,transparent_70%)] opacity-40 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute top-0 right-0 h-[240px] w-[240px] rounded-full bg-[rgba(97,95,255,1)] blur-[200px] content-['']",
                'new' => "pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-40 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute top-1/2 right-0 h-[200px] w-[200px] -translate-y-1/2 rounded-full bg-[rgba(0,167,111,1)] blur-[140px] content-['']",
                'new' => "pointer-events-none absolute top-1/2 right-0 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,167,111,0.45)_0%,transparent_70%)] opacity-40 content-['']",
            ],
            [
                'prev' => "after:pointer-events-none after:absolute after:top-1/2 after:-left-[60px] after:h-[240px] after:w-[240px] after:-translate-y-1/2 after:rounded-full after:bg-[rgba(0,167,111,1)] after:blur-[290px] after:content-[''] dark:after:bg-[#fff5cc6d]",
                'new' => "after:pointer-events-none after:absolute after:top-1/2 after:-left-[60px] after:h-[600px] after:w-[600px] after:-translate-y-1/2 after:rounded-full after:bg-[radial-gradient(circle,rgba(0,167,111,0.45)_0%,transparent_70%)] after:opacity-40 after:content-[''] dark:after:bg-[radial-gradient(circle,rgba(255,245,204,0.35)_0%,transparent_70%)] dark:after:opacity-20",
            ],
            [
                'prev' => 'group relative overflow-hidden rounded-2xl !shadow-card-lg',
                'new' => 'group relative overflow-hidden rounded-2xl p-0 !shadow-card-lg',
            ],
            [
                'prev' => 'overflow-y-hidden py-20',
                'new' => 'overflow-hidden py-20',
            ],
            [
                'prev' => "pointer-events-none absolute top-0 left-0 h-[240px] w-[240px] rounded-full bg-[rgba(0,167,111,1)] blur-[290px] content-['']",
                'new' => "pointer-events-none absolute -top-100 -left-100 h-[1200px] w-[1200px] rounded-full bg-[radial-gradient(circle,rgba(0,167,111,0.45)_0%,transparent_70%)] opacity-25 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute top-1/2 right-20 h-[290px] w-[290px] -translate-y-1/2 rounded-full bg-[rgba(97,95,255,1))] blur-[290px] content-['']",
                'new' => "pointer-events-none absolute top-1/2 -right-100 h-[1200px] w-[1200px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-25 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute top-0 -right-20 h-[240px] w-[240px] rounded-full bg-[rgba(97,95,255,1))] blur-[290px] content-['']",
                'new' => "pointer-events-none absolute -top-120 -right-120 h-[1200px] w-[1200px] rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-22 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute right-0 bottom-20 h-[240px] w-[240px] rounded-full bg-[rgba(0,167,111,1)] blur-[290px] content-['']",
                'new' => "pointer-events-none absolute -right-120 -bottom-100 h-[1200px] w-[1200px] rounded-full bg-[radial-gradient(circle,rgba(0,167,111,0.45)_0%,transparent_70%)] opacity-25 content-['']",
            ],
            [
                'prev' => "overflow-y-hidden bg-[url('/assets/images/intro/home-1/bg-line.png')] bg-cover bg-center py-20",
                'new' => "overflow-hidden bg-[url('/assets/images/intro/home-1/bg-line.png')] bg-cover bg-center py-20",
            ],
            [
                'prev' => "pointer-events-none absolute top-20 right-0 h-[240px] w-[240px] rounded-full bg-[rgba(0,120,103,1)] blur-[180px] content-['']",
                'new' => "pointer-events-none absolute -top-40 -right-60 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(0,120,103,0.45)_0%,transparent_70%)] opacity-50 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute bottom-20 left-0 h-[240px] w-[240px] rounded-full bg-[rgba(97,95,255,1))] blur-[180px] content-['']",
                'new' => "pointer-events-none absolute -bottom-40 -left-60 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-50 content-['']",
            ],
            [
                'prev' => "overflow-y-hidden bg-[url('/assets/images/intro/home-1/bg-line.png')] bg-cover bg-center py-20",
                'new' => "overflow-hidden bg-[url('/assets/images/intro/home-1/bg-line.png')] bg-cover bg-center py-20",
            ],
            [
                'prev' => "pointer-events-none absolute top-20 right-0 h-[240px] w-[240px] rounded-full bg-[rgba(97,95,255,1)] blur-[180px] content-['']",
                'new' => "pointer-events-none absolute -top-40 -right-60 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-50 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute bottom-20 left-0 h-[240px] w-[240px] rounded-full bg-[rgba(0,120,103,1)] blur-[180px] content-['']",
                'new' => "pointer-events-none absolute -bottom-60 -left-60 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(0,120,103,0.45)_0%,transparent_70%)] opacity-50 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute top-0 left-16 h-[240px] w-[240px] rounded-full bg-[rgba(97,95,255,1))] blur-[290px] content-['']",
                'new' => "pointer-events-none absolute -top-80 -left-60 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-25 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute right-16 bottom-0 h-[240px] w-[240px] rounded-full bg-[rgba(0,167,111,1)] blur-[290px] content-['']",
                'new' => "pointer-events-none absolute -right-60 -bottom-80 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle,rgba(0,167,111,0.45)_0%,transparent_70%)] opacity-25 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute top-0 right-0 h-[240px] w-[240px] rounded-full bg-[rgba(97,95,255,1))] blur-[290px] content-['']",
                'new' => "pointer-events-none absolute -top-100 -right-100 h-[1200px] w-[1200px] rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-25 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute top-20 -left-10 h-[240px] w-[240px] rounded-full bg-[rgba(97,95,255,1))] blur-[290px] content-['']",
                'new' => "pointer-events-none absolute -top-80 -left-80 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-25 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute -right-10 bottom-0 h-[240px] w-[240px] rounded-full bg-[rgba(0,167,111,1)] blur-[290px] content-['']",
                'new' => "pointer-events-none absolute -right-80 -bottom-80 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle,rgba(0,167,111,0.45)_0%,transparent_70%)] opacity-25 content-['']",
            ],
            [
                'prev' => 'relative z-10 rounded-3xl border-2 border-white bg-background/20 px-6 py-16 backdrop-blur-lg md:py-20',
                'new' => 'relative z-10 rounded-3xl border-2 border-white bg-background/50 px-6 py-16 md:py-20',
            ],
            [
                'prev' => "pointer-events-none absolute top-[72px] left-1/2 h-[120px] w-[600px] -translate-x-1/2 -rotate-[15deg] bg-[rgba(97,95,255,1)] blur-[300px] content-['']",
                'new' => "pointer-events-none absolute -top-120 left-1/2 h-[1200px] w-[1800px] -translate-x-1/2 bg-[radial-gradient(ellipse,rgba(97,95,255,0.4)_0%,transparent_70%)] opacity-30 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute bottom-0 left-0 h-[240px] w-[240px] rounded-full bg-[rgba(0,167,111,1)] blur-[290px] content-['']",
                'new' => "pointer-events-none absolute -bottom-80 -left-80 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle,rgba(0,167,111,0.45)_0%,transparent_70%)] opacity-25 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute top-0 right-0 h-[240px] w-[240px] rounded-full bg-[rgba(97,95,255,1))] blur-[290px] content-['']",
                'new' => "pointer-events-none absolute -top-80 -right-80 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-25 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute right-5 -bottom-10 h-[200px] w-[200px] rounded-full bg-[#FFF5CC] blur-[250px] content-[''] md:h-[310px] md:w-[310px]",
                'new' => "pointer-events-none absolute -right-100 -bottom-100 h-[1200px] w-[1200px] rounded-full bg-[radial-gradient(circle,rgba(255,245,204,0.5)_0%,transparent_70%)] opacity-30 content-['']",
            ],
            [
                'prev' => 'relative overflow-hidden rounded-2xl',
                'new' => 'relative overflow-hidden rounded-2xl border border-border shadow-card',
            ],
            [
                'prev' => "pointer-events-none absolute -top-6 left-0 h-[98px] w-[98px] rounded-full bg-[#E4CBA866] blur-[72px] content-['']",
                'new' => '',
            ],
            [
                'prev' => "pointer-events-none absolute -bottom-9 -left-8 h-[116px] w-[116px] rounded-full bg-[#00A76F1A] blur-[72px] content-['']",
                'new' => '',
            ],
            [
                'prev' => "pointer-events-none absolute top-0 left-0 h-20 w-20 rounded-full bg-[rgba(97,95,255,1))] blur-[140px] content-['']",
                'new' => '',
            ],
            [
                'prev' => "pointer-events-none absolute right-0 bottom-0 h-20 w-20 rounded-full bg-[rgba(0,167,111,1)] blur-[140px] content-['']",
                'new' => '',
            ],
            [
                'prev' => "pointer-events-none absolute -top-6 left-0 h-[98px] w-[98px] rounded-full bg-[#E4CBA866] blur-[72px] content-['']",
                'new' => '',
            ],
            [
                'prev' => "pointer-events-none absolute -bottom-9 -left-8 h-[116px] w-[116px] rounded-full bg-[#00A76F1A] blur-[72px] content-['']",
                'new' => '',
            ],
            [
                'prev' => "pointer-events-none absolute top-0 left-0 h-20 w-20 rounded-full bg-[rgba(97,95,255,1))] blur-[140px] content-['']",
                'new' => '',
            ],
            [
                'prev' => "pointer-events-none absolute right-0 bottom-0 h-20 w-20 rounded-full bg-[rgba(0,167,111,1)] blur-[140px] content-['']",
                'new' => '',
            ],
            [
                'prev' => "pointer-events-none absolute -top-6 left-0 h-[98px] w-[98px] rounded-full bg-[#E4CBA866] blur-[72px] content-['']",
                'new' => '',
            ],
            [
                'prev' => "pointer-events-none absolute -bottom-9 -left-8 h-[116px] w-[116px] rounded-full bg-[#00A76F1A] blur-[72px] content-['']",
                'new' => '',
            ],
            [
                'prev' => "pointer-events-none absolute top-0 left-0 h-20 w-20 rounded-full bg-[rgba(97,95,255,1))] blur-[140px] content-['']",
                'new' => '',
            ],
            [
                'prev' => "pointer-events-none absolute right-0 bottom-0 h-20 w-20 rounded-full bg-[rgba(0,167,111,1)] blur-[140px] content-['']",
                'new' => '',
            ],
            [
                'prev' => "pointer-events-none absolute top-0 -right-20 h-[240px] w-[240px] rounded-full bg-[rgba(97,95,255,1))] blur-[290px] content-['']",
                'new' => "pointer-events-none absolute -top-100 -right-120 h-[1200px] w-[1200px] rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-20 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute right-0 bottom-0 h-[240px] w-[240px] rounded-full bg-[rgba(0,167,111,1)] blur-[290px] content-['']",
                'new' => "pointer-events-none absolute -right-40 -bottom-40 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle,rgba(0,167,111,0.45)_0%,transparent_70%)] opacity-40 content-['']",
            ],
            [
                'prev' => 'rounded-2xl border-2 border-white bg-background/20 px-6 py-16 shadow-none backdrop-blur-lg md:py-[72px] dark:border-border',
                'new' => 'rounded-2xl border-2 border-white bg-background/50 px-6 py-16 shadow-none md:py-[72px] dark:border-border',
            ],
            [
                'prev' => 'flex items-center justify-center gap-4 rounded-2xl border-2 border-white bg-background/20 px-6 py-8 shadow-none backdrop-blur-lg md:py-8 dark:border-border',
                'new' => 'flex items-center justify-center gap-4 rounded-2xl border-2 border-white bg-background/50 px-6 py-8 shadow-none md:py-8 dark:border-border',
            ],
            [
                'prev' => "pointer-events-none absolute top-1/2 left-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 bg-[rgba(97,95,255,1)] blur-[290px] content-['']",
                'new' => "pointer-events-none absolute top-1/2 left-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-30 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute -top-14 -left-[180px] h-[240px] w-[240px] rounded-full bg-[rgba(0,167,111,1)] blur-[290px] content-['']",
                'new' => "pointer-events-none absolute top-1/2 -left-120 h-[1200px] w-[1200px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,167,111,0.45)_0%,transparent_70%)] opacity-20 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute top-10 left-20 h-[240px] w-[240px] rounded-full bg-[rgba(97,95,255,1))] blur-[290px] content-['']",
                'new' => "pointer-events-none absolute top-1/2 -left-100 h-[1200px] w-[1200px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-20 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute right-20 bottom-10 h-[240px] w-[240px] rounded-full bg-[rgba(0,167,111,1)] blur-[290px] content-['']",
                'new' => "pointer-events-none absolute top-1/2 -right-100 h-[1200px] w-[1200px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,167,111,0.45)_0%,transparent_70%)] opacity-20 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute top-1/2 left-1/2 h-[240px] w-[240px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(97,95,255,1)] blur-[280px] content-['']",
                'new' => "pointer-events-none absolute top-1/2 left-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-30 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute top-0 left-0 h-[334px] w-[334px] rounded-full bg-[rgba(89,85,220,1)] blur-[320px] content-['']",
                'new' => "pointer-events-none absolute -top-100 -left-100 h-[1200px] w-[1200px] rounded-full bg-[radial-gradient(circle,rgba(89,85,220,0.45)_0%,transparent_70%)] opacity-30 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute top-[220px] right-0 h-[300px] w-[300px] rounded-full bg-[rgba(255,190,0,1)] blur-[310px] content-['']",
                'new' => "pointer-events-none absolute -top-40 -right-120 h-[1200px] w-[1200px] rounded-full bg-[radial-gradient(circle,rgba(255,190,0,0.4)_0%,transparent_70%)] opacity-30 content-['']",
            ],
            [
                'prev' => 'flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200',
                'new' => 'flex h-8 w-8 items-center justify-center rounded-lg bg-muted',
            ],
            [
                'prev' => "pointer-events-none absolute top-1/2 left-1/2 h-[290px] w-[290px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(97,95,255,1)] blur-[320px] content-['']",
                'new' => "pointer-events-none absolute top-1/2 left-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-30 content-['']",
            ],
            [
                'prev' => 'py-20',
                'new' => 'overflow-hidden py-20',
            ],
            [
                'prev' => "pointer-events-none absolute top-1/2 left-0 h-[240px] w-[240px] -translate-y-1/2 rounded-full bg-[rgba(0,167,111,1)] blur-[290px] content-['']",
                'new' => "pointer-events-none absolute top-1/2 -left-100 h-[1200px] w-[1200px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,167,111,0.45)_0%,transparent_70%)] opacity-25 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute top-0 right-0 h-[200px] w-[200px] rounded-full bg-[rgba(97,95,255,1)] blur-[290px] content-['']",
                'new' => "pointer-events-none absolute -top-80 -right-80 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-25 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute bottom-10 left-0 h-[240px] w-[240px] rounded-full bg-[rgba(0,167,111,1)] blur-[290px] content-['']",
                'new' => "pointer-events-none absolute -bottom-100 -left-100 h-[1200px] w-[1200px] rounded-full bg-[radial-gradient(circle,rgba(0,167,111,0.45)_0%,transparent_70%)] opacity-30 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute top-10 right-0 h-[240px] w-[240px] rounded-full bg-[rgba(97,95,255,1)] blur-[290px] content-['']",
                'new' => "pointer-events-none absolute -top-100 -right-100 h-[1200px] w-[1200px] rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-30 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute bottom-1 left-0 h-[260px] w-[260px] rounded-full bg-[rgba(0,167,111,1)] blur-[290px] content-['']",
                'new' => "pointer-events-none absolute -bottom-100 -left-100 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-30 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute top-0 right-0 h-[200px] w-[200px] rounded-full bg-[rgba(97,95,255,1)] blur-[290px] content-['']",
                'new' => "pointer-events-none absolute -top-100 -right-100 h-[1200px] w-[1200px] rounded-full bg-[radial-gradient(circle,rgba(0,167,111,0.45)_0%,transparent_70%)] opacity-30 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute top-0 left-0 h-[200px] w-[200px] rounded-full bg-[rgba(97,95,255,1)] blur-[290px] content-['']",
                'new' => "pointer-events-none absolute -top-80 -left-80 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-25 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute right-0 bottom-0 h-[260px] w-[260px] rounded-full bg-[rgba(0,167,111,1)] blur-[290px] content-['']",
                'new' => "pointer-events-none absolute -right-100 -bottom-100 h-[1200px] w-[1200px] rounded-full bg-[radial-gradient(circle,rgba(0,167,111,0.45)_0%,transparent_70%)] opacity-25 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute top-1/2 left-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(97,95,255,1)] blur-[290px] content-['']",
                'new' => "pointer-events-none absolute top-1/2 left-1/2 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-20 content-['']",
            ],
            [
                'prev' => "pointer-events-none absolute top-1/2 left-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(0,167,111,1)] blur-[290px] content-['']",
                'new' => "pointer-events-none absolute top-1/2 left-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(0,167,111,0.45)_0%,transparent_70%)] opacity-30 content-['']",
            ],
            [
                'prev' => 'rounded-lg border bg-white px-6 py-7 shadow-sm',
                'new' => 'rounded-lg border bg-background px-6 py-7 shadow-sm',
            ],
            [
                'prev' => "pointer-events-none absolute right-[120px] bottom-10 h-[200px] w-[200px] rounded-full bg-[rgba(97,95,255,1)] blur-[290px] content-['']",
                'new' => "pointer-events-none absolute -right-80 -bottom-80 h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle,rgba(97,95,255,0.45)_0%,transparent_70%)] opacity-30 content-['']",
            ],
            [
                'prev' => 'bg-primary text-primary-foreground hover:bg-primary/90',
                'new' => 'bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90',
            ],
        ];

        $this->replaceInPageContent('"/about"', '"/about-us"');
        $this->replaceInPageContent('"top-courses-carousel"', '"top-courses-carousel-1"');
        $this->replaceInPageContent('"new-courses-carousel"', '"new-courses-carousel-1"');

        foreach ($changes as $change) {
            $this->replaceInPageContent($change['prev'], $change['new']);
        }
    }

    /**
     * Replace a string within the content of all ProjectPage records.
     * Only the matched string is replaced; all other content remains unchanged.
     */
    private function replaceInPageContent(string $search, string $replace): void
    {
        ProjectPage::query()
            ->whereNotNull('content')
            ->where('content', 'like', '%'.$search.'%')
            ->each(function (ProjectPage $page) use ($search, $replace): void {
                $page->content = str_replace($search, $replace, $page->content);
                $page->save();
            });
    }
}
