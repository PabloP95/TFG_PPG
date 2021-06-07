<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RestaurantTiposCocina extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('restaurant_tipos_cocina', function (Blueprint $table) {
            $table->bigInteger('tipos_cocina_id')->unsigned();
            $table->bigInteger('restaurant_id')->unsigned();

            $table->foreign('tipos_cocina_id')
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
        Schema::dropIfExists('restaurant_tipos_cocina');
    }
}
