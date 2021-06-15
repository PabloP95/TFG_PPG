<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Horario;
use App\Models\Restaurant;
use Validator;
use Carbon\Carbon;
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

    public function horarioReserva($id, $dia){
        $horarioReserva = Restaurant::findOrFail($id)->horarios()->where('dia', '=', $dia)->get();
        $arr = array();
        if($horarioReserva[0]->horarioAperturaP1 === null){
            array_push($arr, ' ');
            return $arr;
        }
        else{
            $hAperturaP1 = Carbon::createFromTimeString($horarioReserva[0]->horarioAperturaP1)->format('H:i:s');
            $hAperturaP2 = Carbon::createFromTimeString($horarioReserva[0]->horarioAperturaP2)->format('H:i:s');
            $hCierreP1 = Carbon::createFromTimeString($horarioReserva[0]->horarioCierreP1)->format('H:i:s');
            $hCierreP2 = Carbon::createFromTimeString($horarioReserva[0]->horarioCierreP2)->format('H:i:s');
            
            while(Carbon::parse($hAperturaP1)->lte(Carbon::parse($hCierreP1))){
                array_push($arr, $hAperturaP1);
                $hAperturaP1 = Carbon::parse($hAperturaP1)->addMinutes(20)->format('H:i:s');
            }
            array_pop($arr); //Fuera la hora de cierre
    
            while(Carbon::parse($hAperturaP2)->lte(Carbon::parse($hCierreP2))){
                array_push($arr, $hAperturaP2);
                $hAperturaP2 = Carbon::parse($hAperturaP2)->addMinutes(30)->format('H:i:s');
            }
            array_pop($arr); //Fuera la hora de cierre
            return $arr;
        }
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
