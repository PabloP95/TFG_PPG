<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Horario;
use App\Models\Restaurant;
use Validator;
class HorarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)
    {
        $horariosRestaurant = Restaurant::findOrFail($id)->horarios()->get();
        return $horariosRestaurant;
    }

    public function horarioDia($id, $dia){
        return Restaurant::findOrFail($id)->horarios()->where('dia', '=', $dia)->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'dia' => 'string|in:Lunes,Martes,Miércoles,Jueves,Viernes,Sábado,Domingo',
            'horarioAperturaP1' => 'nullable|date_format:H:i|before:' . $request->input('horarioAperturaP2') . '|before:' . $request->input('horarioCierreP1') . '|before:' . $request->input('horarioCierreP2'),
            'horarioAperturaP2' => 'nullable|date_format:H:i|after:' . $request->input('horarioAperturaP1') . '|after:' . $request->input('horarioCierreP1') . '|before:' . $request->input('horarioCierreP2'),
            'horarioCierreP1' => 'nullable|date_format:H:i|after:' . $request->input('horarioAperturaP1') . '|before:' . $request->input('horarioAperturaP2') . '|before:' . $request->input('horarioCierreP2'),
            'horarioCierreP2' => 'nullable|date_format:H:i|after:' . $request->input('horarioAperturaP1') . '|after:' . $request->input('horarioAperturaP2') . '|after:' . $request->input('horarioCierreP1'),
            'restaurant_id' => 'required|integer|exists:restaurants,id',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        Horario::create([
            'dia' => $request->input('dia'),
            'horarioAperturaP1' => $request->input('horarioAperturaP1'),
            'horarioAperturaP2' => $request->input('horarioAperturaP2'),
            'horarioCierreP1' => $request->input('horarioCierreP1'),
            'horarioCierreP2' => $request->input('horarioCierreP2'),
            'restaurant_id' => $request->input('restaurant_id'),
        ]);

        return $horariosRestaurant = Restaurant::findOrFail($request->restaurant_id)->horarios()->get();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id, $dia)
    {
        return Restaurant::findOrFail($id)->horarios()->where('dia', '=', $dia)->get();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id, $dia)
    {
        $validator = Validator::make($request->all(), [
            $dia => 'string|in:Lunes,Martes,Miércoles,Jueves,Viernes,Sábado,Domingo',
            'horarioAperturaP1' => 'nullable|date_format:H:i|before:' . $request->input('horarioAperturaP2') . '|before:' . $request->input('horarioCierreP1') . '|before:' . $request->input('horarioCierreP2'),
            'horarioAperturaP2' => 'nullable|date_format:H:i|after:' . $request->input('horarioAperturaP1') . '|after:' . $request->input('horarioCierreP1') . '|before:' . $request->input('horarioCierreP2'),
            'horarioCierreP1' => 'nullable|date_format:H:i|after:' . $request->input('horarioAperturaP1') . '|before:' . $request->input('horarioAperturaP2') . '|before:' . $request->input('horarioCierreP2'),
            'horarioCierreP2' => 'nullable|date_format:H:i|after:' . $request->input('horarioAperturaP1') . '|after:' . $request->input('horarioAperturaP2') . '|after:' . $request->input('horarioCierreP1'),
            $id => 'integer|exists:restaurants,id',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $horario = Restaurant::findOrFail($id)->horarios()->where('dia', '=', $dia)->update([
            'horarioAperturaP1' => $request->input('horarioAperturaP1'),
            'horarioAperturaP2' => $request->input('horarioAperturaP2'),
            'horarioCierreP1' => $request->input('horarioCierreP1'),
            'horarioCierreP2' => $request->input('horarioCierreP2'),
        ]);

        return $horariosRestaurant = Restaurant::findorFail($id)->horarios()->get();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, $idHorario)
    {
        return Restaurant::findOrFail($id)->horarios()->where('id', '=', $idHorario)->delete();
    }
}
