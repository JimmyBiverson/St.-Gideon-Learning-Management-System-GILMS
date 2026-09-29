<?php

namespace Modules\Installer\Http\Controllers;

use App\Enums\UserType;
use App\Http\Controllers\Controller;
use App\Models\Instructor;
use App\Models\Page;
use App\Models\Setting;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Modules\Frontend\Models\ProjectPage;
use Modules\Installer\Helpers\Utils;
use Modules\Installer\Http\Requests\StoreInstallingRequest;
use Modules\Installer\Http\Requests\StoreStep2Request;
use Modules\Installer\Http\Requests\StoreStep3Request;
use Modules\Installer\Http\Requests\StoreStep4Request;

class InstallerController extends Controller
{
    public function index()
    {
        $current_version = PHP_VERSION;
        $require_version = '8.2';
        $allValuesAreTrue = true;

        $requirements = [
            'current_php_version' => $current_version,
            'required_php_version' => $require_version,
            'php_version' => version_compare($current_version, $require_version, '>='),
            'openssl_enabled' => extension_loaded('openssl'),
            'pdo_enabled' => defined('PDO::ATTR_DRIVER_NAME'),
            'mbstring_enabled' => extension_loaded('mbstring'),
            'curl_enabled' => extension_loaded('curl'),
            'tokenizer_enabled' => extension_loaded('tokenizer'),
            'xml_enabled' => extension_loaded('xml'),
            'ctype_enabled' => extension_loaded('ctype'),
            'fileinfo_enabled' => extension_loaded('fileinfo'),
            'gd_enabled' => extension_loaded('gd'),
            'json_enabled' => extension_loaded('json'),
            'bcmath_enabled' => extension_loaded('bcmath'),
            'symlink_enabled' => function_exists('symlink'),
        ];

        foreach ($requirements as $item) {
            if (! $item) {
                $allValuesAreTrue = false;
                break;
            }
        }

        session()->put('requirements', $allValuesAreTrue);

        return Inertia::render('Installer/step-1', compact('allValuesAreTrue', 'requirements'));
    }

    public function show_step2(Request $request)
    {
        $requirements = session('requirements');

        if (is_null($requirements) || ! $requirements) {
            session()->forget('requirements');

            return redirect()->route('install.index');
        }

        // $APP_NAME = session('APP_NAME') ?? config('app.name');
        $APP_ENV = session('APP_ENV') ?? config('app.env');
        $APP_DEBUG = session('APP_DEBUG') ?? config('app.debug');
        // Never default to whatever key is already sitting in .env: every
        // distributable ships from the same .env.example, so falling back
        // to config('app.key') here would pre-fill the same APP_KEY for
        // every customer who doesn't notice and click "Generate" — a
        // shared encryption key across unrelated installs. Generate a
        // fresh one up front instead; the customer can still regenerate it.
        $APP_KEY = $request->APP_KEY ?? session('APP_KEY') ?? $this->freshAppKey();
        session()->put('APP_KEY', $APP_KEY);
        $APP_TIMEZONE = session('APP_TIMEZONE') ?? config('app.timezone');
        $APP_URL = session('APP_URL') ?? config('app.url');

        return Inertia::render('Installer/step-2', compact(
            'APP_ENV',
            'APP_DEBUG',
            'APP_KEY',
            'APP_TIMEZONE',
            'APP_URL',
        ));
    }

    public function store_step2(StoreStep2Request $request)
    {
        session()->put('APP_ENV', $request->app_env);
        session()->put('APP_DEBUG', $request->app_debug);
        // session()->put('APP_NAME', '"' . $request->app_name . '"');
        session()->put('APP_KEY', $request->app_key);
        session()->put('APP_TIMEZONE', '"'.$request->app_timezone.'"');
        session()->put('APP_URL', $request->app_url);

        return redirect()->route('install.show-step3');
    }

    public function show_step3(Request $request)
    {
        if (config('database.default') == 'mysql') {
            $db = config('database.connections.mysql');
        }

        $DB_CONNECTION = session('DB_CONNECTION') ?? config('database.default');
        $DB_HOST = session('DB_HOST') ?? (isset($db['host']) ? $db['host'] : '');
        $DB_PORT = session('DB_PORT') ?? (isset($db['port']) ? $db['port'] : '');
        $DB_DATABASE = session('DB_DATABASE') ?? (isset($db['database']) ? $db['database'] : '');
        $DB_USERNAME = session('DB_USERNAME') ?? (isset($db['username']) ? $db['username'] : '');
        $DB_PASSWORD = session('DB_PASSWORD') ? str_replace('"', '', session('DB_PASSWORD')) : (isset($db['password']) ? str_replace('"', '', $db['password']) : '');
        $DB_CONNECTION_STATUS = $request->connection_status ?? false;

        return Inertia::render('Installer/step-3', compact(
            'DB_CONNECTION',
            'DB_HOST',
            'DB_PORT',
            'DB_DATABASE',
            'DB_USERNAME',
            'DB_PASSWORD',
            'DB_CONNECTION_STATUS',
        ));
    }

    public function store_step3(StoreStep3Request $request)
    {
        session()->put('DB_CONNECTION', $request->db_connection);
        session()->put('DB_HOST', $request->db_host);
        session()->put('DB_PORT', $request->db_port);
        session()->put('DB_DATABASE', $request->db_database);
        session()->put('DB_USERNAME', $request->db_username);
        session()->put('DB_PASSWORD', '"'.$request->db_password.'"');

        return redirect()->route('install.show-step4');
    }

    public function show_step4()
    {
        $NAME = session('NAME') ?? '';
        $EMAIL = session('EMAIL') ?? '';
        $PASSWORD = session('PASSWORD') ?? '';

        return Inertia::render('Installer/step-4', compact(
            'NAME',
            'EMAIL',
            'PASSWORD',
        ));
    }

    public function store_step4(StoreStep4Request $request)
    {
        session()->put('NAME', $request->name);
        session()->put('EMAIL', $request->email);
        session()->put('PASSWORD', $request->password);

        return redirect(route('install.show-processing'));
    }

    public function show_processing()
    {
        if (! session('db_connection')) {
            return redirect(route('install.show-step3'));
        }

        return Inertia::render('Installer/install');
    }

    public function store_processing(StoreInstallingRequest $request)
    {
        $NAME = session('NAME');
        $EMAIL = session('EMAIL');
        $PASSWORD = session('PASSWORD');
        if (! $NAME || ! $EMAIL || ! $PASSWORD) {
            return redirect(route('install.show-step4'));
        }

        ini_set('max_execution_time', 600);

        // Maintenance mode ON
        // Artisan::call('down');

        try {
            // Clean the password value by removing extra quotes
            $dbPassword = trim(session('DB_PASSWORD'), '"');

            // Set database configuration for migration
            config(['database.default' => session('DB_CONNECTION')]);
            config(['database.connections.'.session('DB_CONNECTION').'.host' => session('DB_HOST')]);
            config(['database.connections.'.session('DB_CONNECTION').'.port' => session('DB_PORT')]);
            config(['database.connections.'.session('DB_CONNECTION').'.database' => session('DB_DATABASE')]);
            config(['database.connections.'.session('DB_CONNECTION').'.username' => session('DB_USERNAME')]);
            config(['database.connections.'.session('DB_CONNECTION').'.password' => $dbPassword]);

            // Reconnect to database with new configuration
            DB::purge(session('DB_CONNECTION'));
            DB::reconnect(session('DB_CONNECTION'));

            // Drop all existing tables manually — compatible with shared hosting where
            // `db:wipe` is prohibited. Disabling FK checks prevents constraint errors.
            DB::statement('SET FOREIGN_KEY_CHECKS=0');
            $database = session('DB_DATABASE');
            $tables = DB::select('SHOW TABLES');
            $tableKey = 'Tables_in_'.$database;
            foreach ($tables as $table) {
                DB::statement('DROP TABLE IF EXISTS `'.$table->$tableKey.'`');
            }
            DB::statement('SET FOREIGN_KEY_CHECKS=1');

            $exitCode = Artisan::call('migrate', ['--force' => true]);
            if ($exitCode !== 0) {
                throw new \Exception(Artisan::output());
            }

            $seedCode = Artisan::call('db:seed', ['--force' => true]);
            if ($seedCode !== 0) {
                throw new \Exception(Artisan::output());
            }

            Artisan::call('storage:link');

            // Add or update admin user
            $admin = User::updateOrCreate(
                ['email' => $EMAIL],
                [
                    'name' => $NAME,
                    'role' => UserType::ADMIN,
                    'status' => 1,
                    'password' => Hash::make($PASSWORD),
                    'email_verified_at' => now(),
                ]
            );

            $instructor = Instructor::updateOrCreate(
                ['user_id' => $admin->id],
                [
                    'status' => 'approved',
                    'designation' => 'Administrator',
                    'skills' => json_encode(['admin']),
                    'resume' => 'https://www.sbs.ox.ac.uk/sites/default/files/2019-01/cv-template.pdf',
                    'biography' => 'Administrator of the platform to manage the platform and the users of the platform',
                ]
            );
            $admin->instructor_id = $instructor->id;
            $admin->save();

            // Add system settings
            $page = Page::where('type', $request->course_creation)->first();
            $system = Setting::where('type', 'system')->first();
            $homePage = Setting::where('type', 'home_page')->first();

            // Activate new frontend system page
            if ($request->course_creation === 'administrative') {
                ProjectPage::where('type', 'home')->where('status', true)->update([
                    'status' => false,
                ]);

                $projectPage = ProjectPage::where('type', 'home')->where('slug', 'home-4')->first();
                $projectPage->update(['status' => true]);
            }

            $system->update(['sub_type' => $request->course_creation]);
            $homePage->update([
                'fields' => [
                    'page_id' => $page->id,
                    'page_name' => $page->name,
                    'page_slug' => $page->slug,
                ],
            ]);

            // After successful migration, update env file with new configurations
            Utils::changeEnv([
                'APP_ENV' => session('APP_ENV'),
                'APP_KEY' => session('APP_KEY'),
                'APP_DEBUG' => session('APP_DEBUG') ? 'true' : 'false',
                'APP_TIMEZONE' => session('APP_TIMEZONE'),
                'APP_URL' => session('APP_URL'),

                'DB_CONNECTION' => session('DB_CONNECTION'),
                'DB_HOST' => session('DB_HOST'),
                'DB_PORT' => session('DB_PORT'),
                'DB_DATABASE' => session('DB_DATABASE'),
                'DB_USERNAME' => session('DB_USERNAME'),
                'DB_PASSWORD' => session('DB_PASSWORD'),
                'MENTOR_INSTALLED' => 'true',
            ]);

            // Mark as installed
            Storage::disk('public')->put('installed', 'Contents');

            // Clear all cache and installation sessions
            // Artisan::call('optimize:clear');
            session()->forget([
                'APP_ENV',
                'APP_DEBUG',
                'APP_KEY',
                'APP_TIMEZONE',
                'APP_URL',

                'DB_CONNECTION',
                'DB_HOST',
                'DB_PORT',
                'DB_DATABASE',
                'DB_USERNAME',
                'DB_PASSWORD',

                'requirements',
            ]);

            // Maintenance mode OFF
            Artisan::call('up');

            return redirect(route('install.finish'));
        } catch (\Exception $e) {
            Artisan::call('up');

            return back()->with('error', 'Error: '.$e->getMessage());
        }
    }

    public function finish()
    {
        return Inertia::render('Installer/finish');
    }

    public function refresh(Request $request)
    {
        // Clear caches without affecting logged in users
        Artisan::call('optimize:clear');
        Artisan::call('up');

        return redirect()->route('install.index');
    }

    public function generateAppKey()
    {
        $output = $this->freshAppKey();

        // return Inertia::render('', compact('APP_KEY'))
        return redirect()->route('install.show-step2', ['APP_KEY' => $output]);
    }

    /**
     * Generate a new, random APP_KEY value (base64:...), independent of
     * whatever is currently sitting in .env.
     */
    private function freshAppKey(): string
    {
        Artisan::call('key:generate', ['--show' => true]);

        return substr(Artisan::output(), 0, -2);
    }
}
