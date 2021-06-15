<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Opinion;
use App\Models\Client;
use App\Models\Restaurant;
use DB;
use Validator;
use Carbon\Carbon;
class OpinionController extends Controller
{
    /**
     * Display a listing of the opinions of an existing client.
     * @param int  $idCliente
     * @return \Illuminate\Http\Response
     */
    public function indexOpinionesCliente($idCliente)
    {
        $client = Client::findOrFail($idCliente);
        return DB::select("SELECT opinions.id, nota, restaurant_id,comentario, users.name, opinions.updated_at
                            FROM opinions, restaurants, users
                            WHERE 
                            opinions.client_id = $idCliente
                            AND
                            opinions.restaurant_id = restaurants.id
                            AND
                            users.userable_id = restaurants.id
                            AND
                            users.userable_type like '%Restaurant'
        ");

    }

    /**
     * Display a listing of the opinions of an existing restaurant.
     * @param int  $idRestaurant
     * @return \Illuminate\Http\Response
     */
    public function indexOpinionesRestaurante($idRestaurant)
    {
        $restaurant = Restaurant::findOrFail($idRestaurant);
        return DB::select("SELECT opinions.id, nota, comentario, users.name, opinions.updated_at
                            FROM opinions, clients, users
                            WHERE opinions.restaurant_id = $idRestaurant
                            AND
                            opinions.client_id = clients.id
                            AND
                            users.userable_id = clients.id
                            AND
                            users.userable_type like '%Client'
        ");
        
    }

    public function numOpinionesRestaurante($idRestaurant){
        $restaurant = Restaurant::findOrFail($idRestaurant);
        return DB::select("SELECT count(*) as numOpiniones
                            FROM opinions, clients, users
                            WHERE opinions.restaurant_id = $idRestaurant
                            AND
                            opinions.client_id = clients.id
                            AND
                            users.userable_id = clients.id
                            AND
                            users.userable_type like '%Client'
        ");
    }

    public function porcentajeVotos($idRestaurant){
        $restaurant = Restaurant::findOrFail($idRestaurant);
        return DB::select("SELECT ((SUM(nota) * 100) / (COUNT(*) * 5)) as porcentaje
                            FROM opinions, clients, users
                            WHERE opinions.restaurant_id = $idRestaurant
                            AND
                            opinions.client_id = clients.id
                            AND
                            users.userable_id = clients.id
                            AND
                            users.userable_type like '%Client'
        ");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $idClient
     * @param  int  $idRestaurant
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, $idClient, $idRestaurant)
    {
        $validator = Validator::make($request->all(), [
            'nota' => 'required|integer|numeric|min:0|max:5',
            'comentario' => 'required|nullable|string',
            'client_id' => 'required|integer|numeric|exists:clients,id|unique_custom:opinions,client_id,restaurant_id,'.$idRestaurant,
            'restaurant_id' => 'required|integer|numeric|exists:restaurants,id'
        ]);


        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        return Opinion::create($request->all());
    }

    public function mostrarOpinionesPorNota($idRestaurant, $nota){
        
        if($nota !== null){
            if(($nota >= 0 && $nota <= 5)){
                return DB::select("SELECT opinions.id, nota, comentario, users.name, opinions.updated_at
                                    FROM opinions,users,clients
                                    WHERE opinions.restaurant_id = $idRestaurant
                                    AND
                                    nota = $nota
                                    AND
                                    opinions.client_id = clients.id
                                    AND
                                    users.userable_id = clients.id
                                    AND
                                    users.userable_type like '%Client'
                ");
            }
            else{
                return response()->json(['message' => 'La nota esa no es posible', 'nota' => $request->nota]);
            }
        }
    }

    public function showOpinionesPorFechaYNota($idRestaurant, $nota, $fecha){
        $hoy = Carbon::now()->toDateString();
        $ayer = new Carbon('yesterday');
        $haceUnaSemana = new Carbon('last week');
        $haceUnMes = new Carbon('last month');
        $haceUnAnno = new Carbon('last year');
        $ayer = $ayer->toDateString();
        $haceUnaSemana = $haceUnaSemana->toDateString();
        $haceUnMes = $haceUnMes->toDateString();
        $haceUnAnno = $haceUnAnno->toDateString();
        $fechaDMY = $hoy;
        //0 = hoy, 1 = ayer, 2 = lastWeek, 3 = lastMonth, 4 = lastYear
        switch($fecha){
            case 0:$fechaDMY = $hoy; break;
            case 1:$fechaDMY = $ayer; break;
            case 2:$fechaDMY = $haceUnaSemana; break;
            case 3:$fechaDMY = $haceUnMes; break;
            case 4:$fechaDMY = $haceUnAnno; break;
            default: return response()->json(['message' => 'Fecha no proporcionada'], 400);
        }
        if(($nota >= 0 && $nota <= 5)){
            return DB::select("SELECT opinions.id, nota, comentario, users.name, opinions.updated_at
                                    FROM opinions,users,clients
                                    WHERE opinions.restaurant_id = $idRestaurant
                                    AND
                                    nota = $nota
                                    AND
                                    opinions.updated_at like '$fechaDMY%'
                                    AND
                                    opinions.client_id = clients.id
                                    AND
                                    users.userable_id = clients.id
                                    AND
                                    users.userable_type like '%Client'                            
                ");
        }
    }

    public function showOpinionesFecha($idRestaurant, $fecha){
        $hoy = Carbon::now()->toDateString();
        $ayer = new Carbon('yesterday');
        $haceUnaSemana = new Carbon('last week');
        $haceUnMes = new Carbon('last month');
        $haceUnAnno = new Carbon('last year');
        $ayer = $ayer->toDateString();
        $haceUnaSemana = $haceUnaSemana->toDateString();
        $haceUnMes = $haceUnMes->toDateString();
        $haceUnAnno = $haceUnAnno->toDateString();
        $fechaDMY = $hoy;
        //0 = hoy, 1 = ayer, 2 = lastWeek, 3 = lastMonth, 4 = lastYear
        switch($fecha){
            case 0:$fechaDMY = $hoy; break;
            case 1:$fechaDMY = $ayer; break;
            case 2:$fechaDMY = $haceUnaSemana; break;
            case 3:$fechaDMY = $haceUnMes; break;
            case 4:$fechaDMY = $haceUnAnno; break;
            default: return response()->json(['message' => 'Fecha no proporcionada'], 400);
        }

        return DB::select("SELECT opinions.id, nota, comentario, users.name, opinions.updated_at
                                    FROM opinions,users,clients
                                    WHERE opinions.restaurant_id = $idRestaurant
                                    AND
                                    opinions.updated_at like '$fechaDMY%'
                                    AND
                                    opinions.client_id = clients.id
                                    AND
                                    users.userable_id = clients.id
                                    AND
                                    users.userable_type like '%Client'
                                    
                ");
    }

    public function showOpinionRangoFechas($idRestaurant, $fecha1, $fecha2){
        $fCarbon1 = new Carbon($fecha1);
        $fCarbon2 = new Carbon($fecha2);
        $tomorrow = Carbon::now()->tomorrow();
        
        if($fCarbon1->lt($fCarbon2)){
            if($fCarbon1->ne($tomorrow) && $fCarbon2->ne($tomorrow)){
                $fCarbon2 = $fCarbon2->addDay();
                return DB::select("SELECT opinions.id, nota, comentario, users.name, opinions.updated_at
                FROM opinions, users, clients
                WHERE opinions.restaurant_id = $idRestaurant
                AND
                opinions.updated_at BETWEEN '$fCarbon1' AND '$fCarbon2'
                AND
                opinions.client_id = clients.id
                AND
                users.userable_id = clients.id
                AND
                users.userable_type like '%Client'
                ");
            }
        }
        else{
            return response()->json(['error' => 'Las fechas no son correctas']);
        }
    }

    public function showOpinionRangoFechasConNota($idRestaurant, $fecha1, $fecha2, $nota){
        $fCarbon1 = new Carbon($fecha1);
        $fCarbon2 = new Carbon($fecha2);
        $tomorrow = Carbon::now()->tomorrow();
        
        if($fCarbon1->lt($fCarbon2)){
            if($fCarbon1->ne($tomorrow) && $fCarbon2->ne($tomorrow)){
                if($nota >= 0 && $nota <= 5){
                    $fCarbon2 = $fCarbon2->addDay();
                    return DB::select("SELECT opinions.id, nota, comentario, users.name, opinions.updated_at
                    FROM opinions, users, clients
                    WHERE opinions.restaurant_id = $idRestaurant
                    AND
                    opinions.updated_at BETWEEN '$fCarbon1' AND '$fCarbon2'
                    AND
                    nota = $nota
                    AND
                    opinions.client_id = clients.id
                    AND
                    users.userable_id = clients.id
                    AND
                    users.userable_type like '%Client'
                    ");
                }
                else{
                    return response()->json(['error' => 'Nota incorrecta']);
                }
            }
        }
        else{
            return response()->json(['error' => 'Las fechas no son correctas']);
        }
    }   
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $idClient
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $idClient, $id)
    {

        $validator = Validator::make($request->all(), [
            'nota' => 'required|numeric|integer|max:5|min:0',
            'comentario' => 'required|string|nullable',
            'client_id' => 'required|integer|numeric|exists:clients,id',
            'restaurant_id' => 'required|integer|numeric|exists:restaurants,id'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $opinion = Client::findOrFail($idClient)->opiniones()->where('id', '=', $id)->update($request->all());

        if($opinion === 1){
            return response()->json(['message' => 'Opinion updated successfully'], 200);
        }

        if($opinion === 0){
            return response()->json(['error' => 'An error has occurred. Probably the client do not exist or something'], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @param  int  $idClient
     * @return \Illuminate\Http\Response
     */
    public function destroy($idClient, $idRestaurant)
    {
        $opinion = Client::findOrFail($idClient)->opiniones()->where('restaurant_id', '=', $idRestaurant)->delete();
        
        if($opinion == 0){
            return response()->json(['error' => 'The opinion is still here'], 400);
        }

        else if($opinion > 0){
            return response()->json(['message' => 'The opinion has been deleted successfully'], 200);
        }
    }
}
