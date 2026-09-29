<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Modules\Course\Models\Course;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('payment_histories', function (Blueprint $table) {
            $table->string('purchase_type')->nullable();
            $table->unsignedBigInteger('purchase_id')->nullable();
            $table->json('meta')->nullable();
        });

        // Backfill existing records to the new polymorphic structure
        if (class_exists(Course::class)) {
            DB::statement(sprintf(
                "UPDATE payment_histories SET purchase_type = '%s', purchase_id = course_id WHERE course_id IS NOT NULL",
                addslashes(Course::class)
            ));
        }

        $driver = DB::getDriverName();

        // SQLite forbids DROP COLUMN on columns referenced by foreign keys in the
        // original CREATE TABLE statement. Test databases start fresh so skipping
        // the column removal is safe on SQLite.
        if ($driver !== 'sqlite') {
            $foreignKeys = array_column(Schema::getForeignKeys('payment_histories'), 'name');

            Schema::table('payment_histories', function (Blueprint $table) use ($foreignKeys) {
                if (in_array('payment_histories_course_id_foreign', $foreignKeys)) {
                    $table->dropForeign(['course_id']);
                }
                if (Schema::hasColumn('payment_histories', 'course_id')) {
                    $table->dropColumn('course_id');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('payment_histories', function (Blueprint $table) {
            $table->foreignId('course_id')->nullable()->constrained()->cascadeOnDelete();
        });

        if (class_exists(Course::class)) {
            DB::statement(sprintf(
                "UPDATE payment_histories SET course_id = purchase_id WHERE purchase_type = '%s'",
                addslashes(Course::class)
            ));
        }

        Schema::table('payment_histories', function (Blueprint $table) {
            $table->dropIndex('payment_histories_purchasable_index');
            $table->dropColumn(['purchase_type', 'purchase_id', 'meta']);
        });
    }
};
