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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string("platform", 100);
            $table->string("venue", 1000);
            $table->string("title", 1000);
            $table->mediumText("objective");
            $table->string("fund");
            $table->boolean("is_range");
            $table->date("dateStart");
            $table->date("dateEnd")->nullable();
            $table->integer("total_rp");
            $table->text("remarks")->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
