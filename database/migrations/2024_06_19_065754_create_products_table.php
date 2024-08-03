<?php

use App\Models\Products;
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

    $products = [
      [
        'product_name' => 'Chandelier Shells with lights from Hundred Islands',
        'is_verified' => '1',
        'price' => '1000',
        'rating' => '2',
        'quantity' => '50',
        'seller_id' => '1',
        'description' => 'Chandelier made of Small shells',
        'category' => 'Chandelier',
        'sold' => '10'
      ],
      [
        'product_name' => 'Shell Clock assorted design',
        'is_verified' => '1',
        'price' => '1200',
        'rating' => '3.5',
        'quantity' => '100',
        'seller_id' => '2',
        'description' => ' - Assorted Clock made of shells
                           - Fout Layers',
        'category' => 'Shell Clock',
        'sold' => '30'
      ],
      [
        'product_name' => 'Hundred Island Printed T-shirt assorted design',
        'is_verified' => '1',
        'price' => '250',
        'rating' => '4.5',
        'quantity' => '200',
        'seller_id' => '3',
        'description' => ' Assorted specialized Printed T-shirts of Hundred Islands.',
        'category' => 'Shell Clock',
        'sold' => '300'
      ],
      [
        'product_name' => 'Bamboo Toys, Furniture & Display',
        'is_verified' => '1',
        'price' => '650',
        'rating' => '4.5',
        'quantity' => '200',
        'seller_id' => '4',
        'description' => ' Toys & Furniture made in bamboo (kawayan)',
        'category' => 'E - Kawayan',
        'sold' => '300'
      ],
    ];

    foreach ($products as $product) {
      Products::create($product);
    }
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('products');
  }
};
