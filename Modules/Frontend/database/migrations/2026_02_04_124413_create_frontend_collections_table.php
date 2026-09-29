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
        Schema::create('frontend_collections', function (Blueprint $table) {
            $table->id();
            $table->string('type')->unique();
            $table->string('best')->nullable();
            $table->json('top')->nullable();
            $table->json('new')->nullable();
            $table->json('featured')->nullable();
            $table->json('trending')->nullable();
            $table->json('popular')->nullable();
            $table->timestamps();

            $table->index('type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('frontend_collections');
    }
};
