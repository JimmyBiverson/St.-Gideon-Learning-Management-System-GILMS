<?php

use App\Enums\PricingType;
use App\Enums\StatusType;
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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('status')->default(StatusType::DRAFT->value);
            $table->text('summary');
            $table->longText('description')->nullable();

            $table->string('pricing_type')->default(PricingType::FREE->value);
            $table->double('price', 10, 2)->nullable();
            $table->boolean('discount')->default(false);
            $table->double('discount_price', 10, 2)->nullable();

            $table->integer('inventory')->nullable();
            $table->boolean('unlimited_inventory')->default(true);

            $table->boolean('featured')->default(false);
            $table->unsignedInteger('views')->default(0);
            $table->string('thumbnail')->nullable();

            $table->string('meta_title')->nullable();
            $table->text('meta_keywords')->nullable();
            $table->text('meta_description')->nullable();
            $table->string('og_title')->nullable();
            $table->text('og_description')->nullable();

            $table->foreignId('instructor_id')->constrained()->cascadeOnDelete();
            $table->foreignId('product_category_id')->constrained();
            $table->foreignId('product_category_child_id')->nullable()->constrained();
            $table->timestamps();

            $table->index('status');
            $table->index('featured');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
