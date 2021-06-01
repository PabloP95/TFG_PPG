<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Table;
use App\Models\Restaurant;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Validator;

class TableController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Table::orderBy('numMesa', 'asc')->get();
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
            'numMesa' => 'required|integer|gt:0|unique:tables',
            'numOcupantes' => 'required|integer|gt:0',
            'restaurant_id' => 'required|integer|exists:restaurants,id',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }
        return Table::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $idMesa
     * @return \Illuminate\Http\Response
     */
    public function show($id, $idMesa)
    {
        $restaurant = Restaurant::findOrFail($id);
        $table = Table::findOrFail($idMesa);
        return $table;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $idMesa
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id, $idMesa)
    {
        
        $restaurant = Restaurant::findOrFail($id);
    
        $table = Table::findOrFail($idMesa);
        $validator = Validator::make($request->all(), [
            'numMesa' => 'sometimes|required|integer|gt:0|unique:tables',
            'numOcupantes' => 'required|integer|gt:0',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $table->update([
            'numMesa' => $request->input('numMesa'),
            'numOcupantes' => $request->input('numOcupantes'),
        ]);

        return $table;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $idMesa
     * @return \Illuminate\Http\Response
     */
    public function destroy($id, $idMesa)
    {
        $restaurant = Restaurant::findOrFail($id);
        $table = Table::findOrFail($idMesa);
        $table->delete();
        return $table;
    }

    public function multipleStore(Request $request, $id){
        $numMesas = $request->input('numMesas');
        $numOcupantes = $request->input('numOcupantes');
        $data = [];
        $current_date_time = Carbon::now()->toDateTimeString();
        $i = 1;
        $numUltimaMesa = DB::select("SELECT max(numMesa) as lastTable
                    FROM tables
                    WHERE restaurant_id = $id")[0]->lastTable;

        while($numMesas >= $i){
            array_push($data, 
            [
                'numMesa' => $numUltimaMesa+$i, 
                'numOcupantes' => $numOcupantes,
                'restaurant_id' => $id,
                'created_at' => $current_date_time,
                'updated_at' => $current_date_time
            ]);
            $i++;
        }
        Table::insert($data);
        return response()->json(['message' => 'Mesas creadas satisfactoriamente'], 200); 
        
    }
}