<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Validator;
class RestaurantController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index', 'show']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $restaurantes = DB::select("SELECT userable_id, email, name, numTelefono
        FROM users
        JOIN restaurants as r
        ON userable_id = r.id");
        return $restaurantes;
    }

    public function storeLocation(Request $request, $id){
        $restaurant = Restaurant::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'direccionPostal' => 'required|string|unique:restaurants,direccionPostal',
            'longitud' => 'required|numeric',
            'latitud' => 'required|numeric'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        return $restaurant->update($request->all());
    }
    
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $restaurant = DB::select("SELECT email, name, numTelefono, latitud, longitud, direccionPostal
        FROM users
        JOIN restaurants as r
        ON userable_id = r.id
        WHERE userable_id = $id");
        return $restaurant;
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
        $restaurant = Restaurant::findOrFail($id);
        $validator = Validator::make($request->all(), [
            'numTelefono' => 'required|string|regex:/([\d]{3} )([\d]{2} )([\d]{2} )([\d]{2})$/|unique:restaurants,numTelefono,'.$id,
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $restaurant->update($request->all());
        return $restaurant;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $restaurant = Restaurant::findOrFail($id);
        $restaurant->delete();
        return $restaurant;
    }
}
