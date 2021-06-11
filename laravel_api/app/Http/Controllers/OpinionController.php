<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Opinion;
use App\Models\Client;
use App\Models\Restaurant;
use DB;
use Validator;
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
