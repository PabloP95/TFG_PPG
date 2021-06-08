<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Plato;
use App\Models\Restaurant;
use App\Models\Alergeno;
use Validator;

class PlatoController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($idRestaurante){
        $platosRestaurante = Restaurant::findOrFail($idRestaurante)->platos()->get();
        return $platosRestaurante;
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $idRestaurante)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|string|unique:platos,nombre,'.$idRestaurante,
            'descripcion'=>'required|string',
            'tipo_plato' => 'required|string|in:Entrantes,Platos principales,Bebidas,Postres',
            'vegano' => 'required|boolean',
            'precio' => 'required|gt:0',
            'restaurant_id' => 'required|integer|exists:restaurants,id'
            ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $newPlato = Plato::create($request->all());

        return $newPlato;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    
    public function show($idRestaurante, $idPlato){
        if(count(Restaurant::findOrFail($idRestaurante)->platos()->where('id', '=', $idPlato)->get()) > 0){
            return Restaurant::findOrFail($idRestaurante)->platos()->where('id', '=', $idPlato)->get();
        }
        else{
            return response()->json(['error', 'El plato no se encuentra, pruebe en otra ocasión'], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $idRestaurante, $id)
    {
        $restaurant = Restaurant::findOrFail($idRestaurante);

        $validator = Validator::make($request->all(), [
            'nombre' => 'string|unique:platos,nombre,'.$id,
            'descripcion'=>'string',
            'tipo_plato' => 'string|in:Entrantes,Platos principales,Bebidas,Postres',
            'vegano' => 'boolean',
            'precio' => 'gt:0',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $restaurantUpdated = $restaurant->platos()->where('id', '=', $id)->update($request->all());
        
        if($restaurantUpdated == 1 ){
            return response()->json(['message' => 'Plato modificado correctamente'], 200);
        }
        else{
            return response()->json(['message' => 'ERROR en la modificación del plato'], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($idRestaurante, $idPlato)
    {
        $restaurant = Restaurant::findOrFail($idRestaurante);
        $plato = $restaurant->platos()->where('id', '=', $idPlato)->delete();
        
        if($plato == 1 ){
            return response()->json(['message' => 'Plato borrado correctamente'], 200);
        }
        else{
            return response()->json(['message' => 'ERROR en el borrado del plato'], 400);
        }
    }
}
