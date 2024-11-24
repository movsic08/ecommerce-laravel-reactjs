<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('order_received_report', function (Blueprint $table) {
            // Drop the existing foreign key constraint on buyer_id
            $table->dropForeign(['buyer_id']);

            $table->unsignedBigInteger('buyer_id')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('order_received_report', function (Blueprint $table) {
            // Drop the updated foreign key
            $table->dropForeign(['buyer_id']);

            $table->unsignedBigInteger('buyer_id')->nullable(false)->change();
        });
    }
};
