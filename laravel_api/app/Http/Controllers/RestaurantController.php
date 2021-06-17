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
        $this->middleware('auth:api', ['except' => ['index', 'show', 'searchNavBar', 'search']]);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        /* $restaurantes = DB::select("SELECT userable_id, email, name, numTelefono
        FROM users, restaurants
        WHERE users.userable_id = restaurants.id
        AND
        users.userable_type like '%Restaurant'"); 
        */
        $restaurantes = DB::select("SELECT userable_id, email, name, numTelefono,((SUM(nota) * 100) / (COUNT(*) * 5)) as porcentaje
        FROM users, restaurants,opinions
        WHERE users.userable_id = restaurants.id
        AND
        opinions.restaurant_id = restaurants.id
        AND
        users.userable_type like '%Restaurant'
        GROUP BY userable_id, email, name, numTelefono
        ORDER BY porcentaje DESC, name DESC
        "
        );
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
        FROM users, restaurants
        WHERE userable_id = restaurants.id
        AND
        restaurants.id = $id
        AND
        users.userable_type like '%Restaurant'
        ");
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

    public function searchNavBar($nombre){
        return DB::select("SELECT userable_id, email, name, numTelefono
        FROM users, restaurants
        WHERE users.userable_id = restaurants.id
        AND
        users.name like '%$nombre%'
        AND
        users.userable_type like '%Restaurant' 
        ");
    }

    public function search($nombre, $tiposCocina){
        if($nombre !== '0' && $tiposCocina === '0'){
            return DB::select("SELECT userable_id, email, name, numTelefono
            FROM users, restaurants
            WHERE users.userable_id = restaurants.id
            AND
            users.name like '%$nombre%'
            AND
            users.userable_type like '%Restaurant' 
            ");
        }
        else if($nombre === '0' && $tiposCocina !== '0'){
            return DB::select("SELECT distinct(userable_id), email, name, numTelefono
            FROM users, restaurants, restaurant_tipos_cocina
            WHERE users.userable_id = restaurants.id
            AND
            restaurant_tipos_cocina.tipos_cocina_id in ($tiposCocina)
            AND
            restaurants.id = restaurant_tipos_cocina.restaurant_id
            AND
            users.userable_type like '%Restaurant' 
            ");
        }
        else if($nombre !== '0' && $tiposCocina !== '0'){
            return DB::select("SELECT distinct(userable_id), email, name, numTelefono
            FROM users, restaurants, restaurant_tipos_cocina
            WHERE users.userable_id = restaurants.id
            AND
            users.name like '%$nombre%'
            AND
            restaurant_tipos_cocina.tipos_cocina_id in ($tiposCocina)
            AND
            restaurants.id = restaurant_tipos_cocina.restaurant_id
            AND
            users.userable_type like '%Restaurant' 
            ");
        }
    }
}
