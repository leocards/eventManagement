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
        Schema::create('quantitative_assessments', function (Blueprint $table) {
            $table->id();
            $table->foreignId("event_id")
                ->constrained()
                ->cascadeOnDelete();
            $table->foreignId("user_id")
                ->constrained()
                ->cascadeOnDelete();
            $table->tinyInteger("q1");
            $table->tinyInteger("q2");
            $table->tinyInteger("q3");
            $table->tinyInteger("q4");
            $table->tinyInteger("q5");
            $table->tinyInteger("q6");
            $table->tinyInteger("q7");
            $table->tinyInteger("q8");
            $table->tinyInteger("q9");
            $table->tinyInteger("q10");
            $table->tinyInteger("q11");
            $table->tinyInteger("q12");
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quantitative_assessments');
    }
};
