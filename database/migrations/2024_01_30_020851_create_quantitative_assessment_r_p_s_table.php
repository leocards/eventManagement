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
        Schema::create('quantitative_assessment_r_p_s', function (Blueprint $table) {
            $table->id();
            $table->foreignId("event_id")
                ->constrained()
                ->cascadeOnDelete();
            $table->foreignId("user_id")
                ->constrained()
                ->cascadeOnDelete();
            $table->foreignId("rps_id")
                ->constrained(
                    table: 'resource_people', indexName: 'rps_id'
                )
                ->cascadeOnDelete();
            $table->tinyInteger("q1");
            $table->tinyInteger("q2");
            $table->tinyInteger("q3");
            $table->tinyInteger("q4");
            $table->tinyInteger("q5");
            $table->tinyInteger("q6");
            $table->tinyInteger("q7");
            $table->mediumText("comment");
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quantitative_assessment_r_p_s');
    }
};
