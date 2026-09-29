<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * The 2025_11_12_000001 migration could not drop `course_id` on SQLite
     * (dropping FK-constrained columns from the original CREATE TABLE isn't
     * supported there), so it left the column in place as NOT NULL. That's
     * harmless on drivers where the column was fully removed, but on SQLite
     * (used by the test suite) it blocks every payment_histories insert
     * that doesn't set course_id — including exam and product purchases.
     * Making it nullable keeps parity with the polymorphic purchase_type/
     * purchase_id columns without touching the already-applied migration.
     */
    public function up(): void
    {
        if (! Schema::hasColumn('payment_histories', 'course_id')) {
            return;
        }

        Schema::table('payment_histories', function (Blueprint $table) {
            $table->foreignId('course_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (! Schema::hasColumn('payment_histories', 'course_id')) {
            return;
        }

        Schema::table('payment_histories', function (Blueprint $table) {
            $table->foreignId('course_id')->nullable(false)->change();
        });
    }
};
