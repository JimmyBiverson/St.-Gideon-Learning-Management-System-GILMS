<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Update packages uploaded through the maintenance area and kept on the
     * private disk until they are installed or deleted.
     *
     * Only *structural* validation is stored — whether the archive is a
     * well-formed Mentor LMS release. Whether it can be installed right now
     * depends on the site's current version, which changes, so that is derived
     * on read rather than frozen here.
     */
    public function up(): void
    {
        Schema::create('update_packages', function (Blueprint $table) {
            $table->id();
            $table->string('original_filename');
            $table->string('path')->comment('Path on the private "local" disk');
            $table->bigInteger('size')->default(0)->comment('Bytes');
            $table->string('sha256')->nullable();
            $table->string('version')->nullable();
            $table->string('min_upgradable_from')->nullable();
            $table->string('package_type')->nullable()->comment('update | full');
            $table->boolean('incremental')->default(false);
            $table->string('base_version')->nullable()
                ->comment('Incremental packages apply only to exactly this version');
            $table->integer('removed_count')->default(0);
            $table->integer('file_count')->default(0);
            $table->boolean('vendor_included')->default(false);
            $table->string('status')->default('ready')->comment('ready | invalid | applied');
            $table->json('validation')->nullable()->comment('errors[] and warnings[] from validation');
            $table->foreignId('uploaded_by')->nullable()->constrained('users')->nullOnDelete();
            $table->timestamp('applied_at')->nullable();
            $table->timestamps();

            $table->index('status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('update_packages');
    }
};
