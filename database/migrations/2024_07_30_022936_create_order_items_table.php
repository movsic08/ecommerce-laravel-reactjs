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
    Schema::create('order_items', function (Blueprint $table) {
      $table->id();
      $table->foreignId('order_id')->constrained()->onDelete('cascade');
      $table->foreignId('product_id')->constrained()->onDelete('cascade');
      $table->integer('quantity');
      $table->decimal('price', 8, 2);
      $table->unsignedBigInteger('seller_id');
      $table->foreign('seller_id')->reference('id')->on('sellers')->onDelete('cascade');
      $table->string('shop_name');
      $table->string('product_name');
      $table->string('status');
      $table->date('received_date')->nullable();
      $table->string('category');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('order_items');
  }
};
