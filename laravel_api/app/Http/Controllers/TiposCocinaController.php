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
        $tiposCocina = Restaurant::findOrFail($id)->tiposCocina()->get();
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
        $validator = Validator::make($request->all(), [
            'tiposCocinaSelected' => 'required|exists:tipos_cocinas,id'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        $tiposCocina = $request->input('tiposCocinaSelected');
        $tiposCocinaConNombre = $request->input('tiposCocinaNombre');
        $res = $restaurant->tiposCocina()->sync($tiposCocina);
        
        return response()->json(['data' => $tiposCocinaConNombre], 200);
    }
}
