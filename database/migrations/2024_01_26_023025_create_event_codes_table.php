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
        Schema::create('event_codes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')
                ->constrained()
                ->cascadeOnDelete();
            $table->dateTime("time_in");
            $table->dateTime("time_in_cutoff");
            $table->string("time_in_code");
            $table->dateTime("time_in_code_exp");
            $table->dateTime("time_out");
            $table->dateTime("time_out_cutoff");
            $table->string("time_out_code");
            $table->dateTime("time_out_code_exp");
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_codes');
    }
};
