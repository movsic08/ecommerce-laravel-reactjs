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
      $table->unsignedBigInteger('user_id');
      $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
      $table->string('shop_address')->nullable();
      $table->string('shop_name')->nullable();
      $table->string('years_in_selling');
      $table->string('shop_picture_path')->nullable();
      $table->string('store_name')->nullable();
      $table->string("motto")->nullable();
      $table->boolean('has_permit');
      $table->boolean('has_DTI');
      $table->boolean('has_mayors_business_permit');
      $table->boolean('has_paid_organizational_fee');
      $table->boolean('has_barangay_clearance');
      $table->boolean('has_bir');
      $table->string('proof_of_membership_path');
      $table->boolean('is_verified')->default(false);
      $table->date("verified_at")->nullable();
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
