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
        Schema::table('section_lessons', function (Blueprint $table) {
            $table->longText('lesson_src')->nullable()->change();
            $table->longText('summary')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('section_lessons', function (Blueprint $table) {
            $table->text('summary')->nullable()->change();
            $table->text('lesson_src')->nullable()->change();
        });
    }
};
