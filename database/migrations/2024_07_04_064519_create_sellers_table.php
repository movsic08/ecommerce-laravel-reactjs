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
    Schema::create('sellers', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('seller_id');
      $table->foreign('seller_id')->references('id')->on('users')->onDelete('cascade');
      $table->string('address')->nullable();
      $table->string('shop_name')->nullable();
      $table->integer('years_in_selling');
      $table->string('profile_picture_path')->nullable();
      $table->string('store_name')->nullable();
      $table->string("motto")->nullable();
      $table->boolean('has_permit');
      $table->boolean('has_DTI');
      $table->boolean('has_mayors_business_permit');
      $table->boolean('has_paid_organizational_fee');
      $table->boolean('has_barangay_clearance');
      $table->string('proof_of_membership_path');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('sellers');
  }
};
