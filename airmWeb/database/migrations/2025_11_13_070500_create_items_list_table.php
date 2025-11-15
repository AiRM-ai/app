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
        Schema::create('items_list', function (Blueprint $table) {
            $table->id();
            $table->string("username", length: 100);
            $table->string("item_name");
            $table->longText("item_description");
            $table->string("item_category");
            $table->float("item_price");
            $table->integer("item_stock");
            $table->string("item_currency");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items_list');
    }
};
