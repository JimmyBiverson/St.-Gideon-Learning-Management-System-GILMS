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
        Schema::create('page_translations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_page_id')->constrained()->cascadeOnDelete();
            $table->string('locale', 12);
            $table->string('element_id');
            $table->string('field', 32);
            $table->text('value');
            $table->timestamps();

            $table->unique(['project_page_id', 'locale', 'element_id', 'field']);
            $table->index(['project_page_id', 'locale']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('page_translations');
    }
};
