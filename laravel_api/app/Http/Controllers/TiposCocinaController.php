<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TiposCocina;
use App\Models\Restaurant;

use Validator;
class TiposCocinaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return TiposCocina::orderBy('id', 'asc')->get();
    }

    public function indexTipoCocinaRestaurante($id){
        $tiposCocina = Restaurant::find($id)->tiposCocina()->get();
        return $tiposCocina;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $id)
    {
        $restaurant = Restaurant::findOrFail($id);
        $tiposCocina = $request->input('tiposCocinaSelected');
        $tiposCocinaConNombre = $request->input('tiposCocinaNombre');
        $res = $restaurant->tiposCocina()->sync($tiposCocina);
        
        return response()->json(['data' => $tiposCocinaConNombre], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    

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
