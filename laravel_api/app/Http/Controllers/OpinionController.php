<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Opinion;
use App\Models\Client;
use App\Models\Restaurant;

use Validator;
class OpinionController extends Controller
{
    /**
     * Display a listing of the opinions of an existing client.
     * @param int  $idCliente
     * @return \Illuminate\Http\Response
     */
    public function indexOpinionCliente($idCliente)
    {
        $client = Client::findOrFail($idCliente);
        return $client->opiniones()->get();
    }

    /**
     * Display a listing of the opinions of an existing restaurant.
     * @param int  $idRestaurant
     * @return \Illuminate\Http\Response
     */
    public function indexOpinionCliente($idRestaurant)
    {
        $restaurant = Restaurant::findOrFail($idRestaurant);
        return $restaurant->opiniones()->get();
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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @param  int  $idClient
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, $idClient)
    {
        //
    }
}
