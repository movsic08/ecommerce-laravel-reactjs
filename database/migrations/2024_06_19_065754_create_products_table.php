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
    Schema::create('products', function (Blueprint $table) {
      $table->id();
      $table->string('product_name');
      $table->float('rating')->default(0);
      $table->bigInteger('sold')->default(0);
      $table->integer('quantity')->unsigned()->default(0);
      $table->integer('price')->unsigned()->default(0);
      $table->string('description');
      $table->boolean('is_verified')->default(0);
      $table->unsignedBigInteger('seller_id');
      $table->foreign('seller_id')->references('id')->on('sellers')->onDelete('cascade');
      $table->string('category');
      $table->timestamps();
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
