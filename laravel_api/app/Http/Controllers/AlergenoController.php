<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Alergeno;
use App\Models\Plato;
use App\Models\Restaurant;
use Validator;
use DB;
class AlergenoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Alergeno::orderBy('id', 'asc')->get();
    }
    public function alergenosPlatosRestaurante($idRestaurante){
        return DB::select("SELECT platos.id, nomAlergeno
        from restaurants, platos, alergeno_plato, alergenos
        where platos.restaurant_id = $idRestaurante
        and
        platos.id = alergeno_plato.plato_id
        and
        alergenos.id = alergeno_plato.alergeno_id");

    }
    public function indexPlato($idPlato){
        $alergenosPlato = Plato::findOrFail($idPlato)->alergenos()->get();
        return $alergenosPlato;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $idRestaurante, $idPlato)
    {
        $restaurante = Restaurant::findOrFail($idRestaurante);
        $plato = Plato::findOrFail($idPlato);

        $validator = Validator::make($request->all(), [
            'alergenosSelected' => 'exists:alergenos,id'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $alergenos = $request->input('alergenosSelected');
        //$alergenos_nombre_imagen = $request->input('alergenosNombreImagen');
        $res = $plato->alergenos()->sync($alergenos);

        return response()->json(['data' => 'OK'], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
