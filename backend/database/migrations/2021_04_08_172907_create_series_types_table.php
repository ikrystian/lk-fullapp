<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSeriesTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('series_types', function (Blueprint $table) {
            $table->id();
            $table->string('exercise_type_id')->default(1);
            $table->string('imageurl')->nullable();
            $table->foreignId('body_part_id')->default(0);
            $table->integer('multiplier')->default(1);
            $table->string('name', 255);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('exercises_types');
    }
}
