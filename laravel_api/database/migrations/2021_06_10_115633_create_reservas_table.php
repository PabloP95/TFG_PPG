<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('reservas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('restaurant_id');
            $table->unsignedBigInteger('table_id');
            $table->unsignedBigInteger('client_id');
            $table->date('diaReserva');
            $table->time('horaReserva');
            $table->timestamps();

            $table->foreign('restaurant_id')->references('id')->on('restaurants')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('table_id')->references('idMesa')->on('tables')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('reservas');
    }
}
