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
        Schema::create('class_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('class_name');
            $table->string('study_program');
            $table->string('faculty');
            $table->string('university');
            $table->string('academic_year', 4);
            $table->integer('total_students')->default(0);
            $table->string('class_leader');
            $table->string('homeroom_lecturer');
            $table->text('description');
            $table->string('logo')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('class_profiles');
    }
};
