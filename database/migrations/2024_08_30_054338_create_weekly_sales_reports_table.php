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
    Schema::create('weekly_sales_reports', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('seller_id');
      $table->decimal('total_sales', 10, 2);
      $table->integer('total_orders');
      $table->date('report_date');
      $table->timestamps();

      $table->foreign('seller_id')->references('id')->on('sellers')->onDelete('cascade');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('weekly_sales_reports');
  }
};
