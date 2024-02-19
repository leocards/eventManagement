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
        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId("event_participant_id")
                ->constrained(
                    table: 'event_participants', indexName: 'event_participants_event_participant_id_fk'
                )
                ->cascadeOnDelete();
            $table->dateTime("time_in");
            $table->dateTime("time_out")->nullable();
            $table->boolean('evaluated')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendances');
    }
};
