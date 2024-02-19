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
        Schema::create('event_resource_people', function (Blueprint $table) {
            $table->id();
            $table->foreignId("event_id")
                ->constrained()
                ->cascadeOnDelete();
            $table->foreignId("rp_id")
                ->constrained(
                    table: 'resource_people', indexName: 'rp_id'
                )
                ->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_resource_people');
    }
};
