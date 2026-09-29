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
        Schema::create('site_translations', function (Blueprint $table) {
            $table->id();
            $table->string('locale', 12);
            $table->string('translatable_type', 32);
            $table->unsignedBigInteger('translatable_id');
            $table->string('field', 64);
            $table->text('value');
            $table->timestamps();

            $table->unique(['locale', 'translatable_type', 'translatable_id', 'field'], 'site_translations_unique');
            $table->index(['translatable_type', 'translatable_id', 'locale']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_translations');
    }
};
