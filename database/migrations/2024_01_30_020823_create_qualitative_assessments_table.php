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
        Schema::create('qualitative_assessments', function (Blueprint $table) {
            $table->id();
            $table->foreignId("event_id")
                ->constrained()
                ->cascadeOnDelete();
            $table->foreignId("user_id")
                ->constrained()
                ->cascadeOnDelete();
            $table->string("q1", 2000);
            $table->string("q2", 2000);
            $table->string("q3", 2000);
            $table->string("q4", 2000);
            $table->string("q5", 2000);
            $table->string("q6", 2000);
            $table->string("q7", 2000);
            $table->string("q8", 2000);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('qualitative_assessments');
    }
};
