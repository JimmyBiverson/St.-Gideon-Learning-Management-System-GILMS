<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('chunked_uploads', function (Blueprint $table) {
            // Change upload_id from VARCHAR(255) to TEXT to accommodate longer R2/S3 upload IDs
            $table->text('upload_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('chunked_uploads', function (Blueprint $table) {
            // Revert back to VARCHAR(255)
            $table->string('upload_id')->nullable()->change();
        });
    }
};
