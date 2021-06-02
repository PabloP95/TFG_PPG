<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTiposCocinasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tipos_cocinas', function (Blueprint $table) {
            $table->id();
            $table->string('tipoCocina');
        });

        DB::table('tipos_cocinas')->insert(
            [
                ['tipoCocina' => 'Árabe'],
                ['tipoCocina' => 'Afgana'],
                ['tipoCocina' => 'Africana'],
                ['tipoCocina' => 'Albanesa'],
                ['tipoCocina' => 'Alemana'],
                ['tipoCocina' => 'Americana'],
                ['tipoCocina' => 'Apuliana'],
                ['tipoCocina' => 'Argelina'],
                ['tipoCocina' => 'Argentina'],
                ['tipoCocina' => 'Armenia'],
                ['tipoCocina' => 'Asador'],
                ['tipoCocina' => 'Asiria'],
                ['tipoCocina' => 'Asiática'],
                ['tipoCocina' => 'Australiana'],
                ['tipoCocina' => 'Austríaca'],
                ['tipoCocina' => 'Azerbayana'],
                ['tipoCocina' => 'Bahamesa'],
                ['tipoCocina' => 'Baiti'],
                ['tipoCocina' => 'Bangladeshi'],
                ['tipoCocina' => 'Barbacoa'],
                ['tipoCocina' => 'Belga'],
                ['tipoCocina' => 'Birmana'],
                ['tipoCocina' => 'Brasileña'],
                ['tipoCocina' => 'Británica'],
                ['tipoCocina' => 'Cajún y criolla'],
                ['tipoCocina' => 'Calabresa'],
                ['tipoCocina' => 'Camboyana'],
                ['tipoCocina' => 'Caribeña'],
                ['tipoCocina' => 'Catalana'],
                ['tipoCocina' => 'Caucásica'],
                ['tipoCocina' => 'Ceilanesa'],
                ['tipoCocina' => 'Centroamericana'],
                ['tipoCocina' => 'Centroeuropea'],
                ['tipoCocina' => 'Checa'],
                ['tipoCocina' => 'Chilena'],
                ['tipoCocina' => 'China'],
                ['tipoCocina' => 'Cocina de Hokkaidó'],
                ['tipoCocina' => 'Cocina de Kioto'],
                ['tipoCocina' => 'Cocina de Kyûshû'],
                ['tipoCocina' => 'Cocina de Pekín'],
                ['tipoCocina' => 'Colombiana'],
                ['tipoCocina' => 'Comida rápida'],
                ['tipoCocina' => 'Confitería japonesa'],
                ['tipoCocina' => 'Contemporánea'],
                ['tipoCocina' => 'Coreana'],
                ['tipoCocina' => 'Costarricense'],
                ['tipoCocina' => 'Croata'],
                ['tipoCocina' => 'Cubana'],
                ['tipoCocina' => 'Danesa'],
                ['tipoCocina' => 'De Asia central'],
                ['tipoCocina' => 'De Campania'],
                ['tipoCocina' => 'De Europa oriental'],
                ['tipoCocina' => 'De Oriente Medio'],
                ['tipoCocina' => 'Del Lacio'],
                ['tipoCocina' => 'Del centro de Italia'],
                ['tipoCocina' => 'Del sur de Italia'],
                ['tipoCocina' => 'Del norte de Italia'],
                ['tipoCocina' => 'Ecuatoriana'],
                ['tipoCocina' => 'Egipcia'],
                ['tipoCocina' => 'Emiliana'],
                ['tipoCocina' => 'Escandinava'],
                ['tipoCocina' => 'Escocesa'],
                ['tipoCocina' => 'Eslovena'],
                ['tipoCocina' => 'Española'],
                ['tipoCocina' => 'Etiope'],
                ['tipoCocina' => 'Europea'],
                ['tipoCocina' => 'Filipina'],
                ['tipoCocina' => 'Francesa'],
                ['tipoCocina' => 'Fujian'],
                ['tipoCocina' => 'Fusión'],
                ['tipoCocina' => 'Fusión japonesa'],
                ['tipoCocina' => 'Galesa'],
                ['tipoCocina' => 'Georgiana'],
                ['tipoCocina' => 'Griega'],
                ['tipoCocina' => 'Guatemalteca'],
                ['tipoCocina' => 'Hawaiana'],
                ['tipoCocina' => 'Holandesa'],
                ['tipoCocina' => 'Húngara'],
                ['tipoCocina' => 'India americana'],
                ['tipoCocina' => 'Indonesia'],
                ['tipoCocina' => 'Internacional'],
                ['tipoCocina' => 'Irlandesa'],
                ['tipoCocina' => 'Israelí'],
                ['tipoCocina' => 'Italiana'],
                ['tipoCocina' => 'Jamaicana'],
                ['tipoCocina' => 'Kaiseki'],
                ['tipoCocina' => 'Kappo'],
                ['tipoCocina' => 'Latina'],
                ['tipoCocina' => 'Latviana'],
                ['tipoCocina' => 'Libanesa'],
                ['tipoCocina' => 'Liguriana'],
                ['tipoCocina' => 'Lombarda'],
                ['tipoCocina' => 'Malaya'],
                ['tipoCocina' => 'Marisco'],
                ['tipoCocina' => 'Marroquí'],
                ['tipoCocina' => 'Mediterránea'],
                ['tipoCocina' => 'Mexicana'],
                ['tipoCocina' => 'Mongola'],
                ['tipoCocina' => 'Napolitana'],
                ['tipoCocina' => 'Neozelandesa'],
                ['tipoCocina' => 'Nepalí'],
                ['tipoCocina' => 'Nigeriana'],
                ['tipoCocina' => 'Noruega'],
                ['tipoCocina' => 'Pakístani'],
                ['tipoCocina' => 'Persa'],
                ['tipoCocina' => 'Peruana'],
                ['tipoCocina' => 'Pizza'],
                ['tipoCocina' => 'Polaca'],
                ['tipoCocina' => 'Polinesia'],
                ['tipoCocina' => 'Portugesa'],
                ['tipoCocina' => 'Puertorriqueña'],
                ['tipoCocina' => 'Romana'],
                ['tipoCocina' => 'Romaña'],
                ['tipoCocina' => 'Rumana'],
                ['tipoCocina' => 'Rusa'],
                ['tipoCocina' => 'Saludable'],
                ['tipoCocina' => 'Salvadoreña'],
                ['tipoCocina' => 'Sarda'],
                ['tipoCocina' => 'Shojin'],
                ['tipoCocina' => 'Siciliana'],
                ['tipoCocina' => 'Singarupeña'],
                ['tipoCocina' => 'Sopas'],
                ['tipoCocina' => 'Street food / Comida en la calle'],
                ['tipoCocina' => 'Sudamericana'],
                ['tipoCocina' => 'Sueca'],
                ['tipoCocina' => 'Suiza'],
                ['tipoCocina' => 'Suroeste'],
                ['tipoCocina' => 'Sushi'],
                ['tipoCocina' => 'Taliandesa'],
                ['tipoCocina' => 'Taiwanesa'],
                ['tipoCocina' => 'Tibetana'],
                ['tipoCocina' => 'Toscana'],
                ['tipoCocina' => 'Tunecina'],
                ['tipoCocina' => 'Turca'],
                ['tipoCocina' => 'Ucraniana'],
                ['tipoCocina' => 'Uzbeka'],
                ['tipoCocina' => 'Venezolana'],
                ['tipoCocina' => 'Vietnamita'],
                ['tipoCocina' => 'Xinjiang'],
                ['tipoCocina' => 'Yunnan'],
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
        Schema::dropIfExists('tipos_cocinas');
    }
}
