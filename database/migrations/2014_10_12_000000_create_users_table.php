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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('first_name')->index();
            $table->string('last_name')->index();
            $table->date('birthday');
            $table->string('email')->index()->unique();
            $table->string('contact', 12);
            $table->string('address');
            $table->string('position');
            $table->string('province');
            $table->string('municipality')->nullable();
            $table->string('ip_affiliation')->nullable();
            $table->string('gender', 10);
            $table->string('profile')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('status');
            $table->string('employment_status', 20)->nullable();
            $table->string('role');
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
