<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHorariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('horarios', function (Blueprint $table) {
            $table->id();
            $table->string('dia');
            $table->time('horarioAperturaP1')->nullable();
            $table->time('horarioCierreP1')->nullable();
            $table->time('horarioAperturaP2')->nullable();
            $table->time('horarioCierreP2')->nullable();
            $table->bigInteger('restaurant_id')->unsigned();
            $table->foreign('restaurant_id')
            ->references('id')
            ->on('restaurants')
            ->onUpdate('cascade')
            ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('horarios');
    }
}
