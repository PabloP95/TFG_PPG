<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Client;
use App\Models\Restaurant;
use App\Models\Reserva;
use Validator;
use DB;

class ReservaController extends Controller
{
    /**
     * Display a listing of the resource for a client.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexCliente($client_id)
    {
        return DB::select("
        SELECT reservas.id, reservas.restaurant_id, reservas.table_id, reservas.client_id, diaReserva, horaReserva,numOcupantes,name,numMesa
        FROM reservas, restaurants,tables,users,clients
        WHERE
        restaurants.id = reservas.restaurant_id
        AND
        idMesa = reservas.table_id
        AND
        reservas.client_id = $client_id
        AND
        clients.id = reservas.client_id
        AND
        restaurants.id = users.userable_id
        AND
        users.userable_type like '%Restaurant';
        ");
        return Client::findOrFail($client_id)->reservas()->orderBy('diaReserva', 'asc')->orderBy('horaReserva', 'asc')->get();
    }

    /**
     * Display a listing of the resource for a client.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexRestaurante($restaurant_id)
    {
        return Restaurant::findOrFail($restaurant_id)->reservas()->orderBy('diaReserva', 'asc')->orderBy('horaReserva', 'asc')->get();
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
            'restaurant_id' => 'required|integer|numeric|exists:restaurants,id',
            'table_id' => 'required|integer|numeric|exists:tables,idMesa|unique_custom_three_parameters:reservas,table_id,restaurant_id,'.$request->restaurant_id.',horaReserva,'.$request->horaReserva,
            'client_id' => 'required|integer|numeric|exists:clients,id',
            'diaReserva' => 'required|date_format:Y-m-d',
            'horaReserva' => 'required|date_format:H:i:s|unique_custom:reservas,horaReserva,client_id,'.$request->client_id
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 200);
        }

        return Reserva::create($request->all());
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
        $validator = Validator::make($request->all(), [
            'restaurant_id' => 'required|integer|numeric|exists:restaurants,id',
            'table_id' => 'required|integer|numeric|exists:tables,idMesa|unique_custom_three_parameters:reservas,table_id,restaurant_id,'.$request->restaurant_id.',horaReserva,'.$request->horaReserva,
            'client_id' => 'required|integer|numeric|exists:clients,id',
            'diaReserva' => 'required|date_format:Y-m-d',
            'horaReserva' => 'required|date_format:H:i:s|unique_custom:reservas,horaReserva,table_id,'.$request->table_id.',client_id,'.$request->client_id
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 200);
        }

        $reserva = Reserva::findOrFail($id);
        $reserva->update($request->all());
        return $reserva;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $reserva = Reserva::findOrFail($id);
        $reserva->delete();
        return response()->json(['message' => 'Reserva eliminada correctamente']);
    }
}
