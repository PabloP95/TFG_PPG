<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTiposCocinaRestaurantesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tipos_cocina__restaurantes', function (Blueprint $table) {
            $table->BigInteger('tiposCocina_id')->unsigned();
            $table->bigInteger('restaurant_id')->unsigned();

            $table->foreign('tiposCocina_id')
                ->references('id')
                ->on('tipos_cocinas')
                ->onUpdate('cascade')
                ->onDelete('cascade');
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
        Schema::dropIfExists('tipos_cocina__restaurantes');
    }
}
