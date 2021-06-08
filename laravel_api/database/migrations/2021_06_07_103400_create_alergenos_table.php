<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAlergenosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('alergenos', function (Blueprint $table) {
            $table->id();
            $table->string('nomAlergeno');
            $table->string('img');
        });

        DB::table('alergenos')->insert(
            [
                ['nomAlergeno' => 'Gluten', 'img' => '../../../../img/alergenos/gluten.png'],
                ['nomAlergeno' => 'Crustáceos', 'img' => '../../../../img/alergenos/crustaceans.png'],
                ['nomAlergeno' => 'Huevos', 'img' => '../../../../img/alergenos/egg.png'],
                ['nomAlergeno' => 'Pescado', 'img' => '../../../../img/alergenos/fish.png'],
                ['nomAlergeno' => 'Cacahuetes', 'img' => '../../../../img/alergenos/peanuts.png'],
                ['nomAlergeno' => 'Soja', 'img' => '../../../../img/alergenos/soybean.png'],
                ['nomAlergeno' => 'Lácteos', 'img' => '../../../../img/alergenos/milk.png'],
                ['nomAlergeno' => 'Frutos de cáscara', 'img' => '../../../../img/alergenos/almond.png'],
                ['nomAlergeno' => 'Apio', 'img' => '../../../../img/alergenos/celery.png'],
                ['nomAlergeno' => 'Mostaza', 'img' => '../../../../img/alergenos/mustard.png'],
                ['nomAlergeno' => 'Granos de sesamo', 'img' => '../../../../img/alergenos/sesame.png'],
                ['nomAlergeno' => 'Dióxido de azufre y sulfitos', 'img' => '../../../../img/alergenos/sulfide.png'],
                ['nomAlergeno' => 'Moluscos', 'img' => '../../../../img/alergenos/mollusc.png'],
                ['nomAlergeno' => 'Altramuces', 'img' => '../../../../img/alergenos/lupin.png'],
            ]
            );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('alergenos');
    }
}
