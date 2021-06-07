<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlergenoPlato extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('alergeno_plato', function(Blueprint $table){
            $table->bigInteger('alergeno_id')->unsigned();
            $table->bigInteger('plato_id')->unsigned();

            $table->foreign('alergeno_id')
                    ->references('id')
                    ->on('alergenos')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');

            $table->foreign('plato_id')
                    ->references('id')
                    ->on('platos')
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
        Schema::dropIfExists('alergeno_plato');
    }
}
