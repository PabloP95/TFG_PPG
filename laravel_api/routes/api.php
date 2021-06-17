<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\TableController;
use App\Http\Controllers\TiposCocinaController;
use App\Http\Controllers\HorarioController;
use App\Http\Controllers\PlatoController;
use App\Http\Controllers\AlergenoController;
use App\Http\Controllers\OpinionController;
use App\Http\Controllers\ReservaController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
*/
Route::get('unauthorized', function() {
    return response()->json([
        'status' => 'error',
        'message' => 'Unauthorized'
    ], 401);
})->name('api.jwt.unauthorized');

Route::get('/users', [UserController::class, 'index']);
Route::get('/restaurants', [RestaurantController::class, 'index']);
Route::get('/restaurant/{id}', [RestaurantController::class, 'show']);
Route::get('/restaurants/search/{nombre}', [RestaurantController::class, 'searchNavBar']);
Route::get('/restaurants/search/{nombre}/{tiposCocina}', [RestaurantController::class, 'search']);
Route::get('/tiposCocina/restaurant/{id}', [TiposCocinaController::class, 'indexTipoCocinaRestaurante']);
Route::get('/horarios/restaurant/{id}', [HorarioController::class, 'index']);
Route::get('/restaurant/{id}/horario/{dia}', [HorarioController::class, 'show']);
Route::get('/restaurant/{id}/horarioReserva/{dia}', [HorarioController::class, 'horarioReserva']);



Route::get('/restaurant/{id}/mesas', [TableController::class, 'index']);
Route::get('/restaurant/{id}/mesas/{nComensales}', [TableController::class, 'indexNumComensales']);
Route::get('/tiposCocina', [TiposCocinaController::class, 'index']);
Route::get('/restaurant/{id}/platos', [PlatoController::class, 'index']);
Route::get('/restaurant/{id}/plato/{idPlato}', [PlatoController::class, 'show']);
Route::get('/restaurant/{id}/alergenosPlatos', [AlergenoController::class, 'alergenosPlatosRestaurante']);
Route::get('/alergenos', [AlergenoController::class, 'index']);
Route::get('/plato/{id}/alergenos', [AlergenoController::class, 'indexPlato']);
Route::get('/restaurant/{id}/opiniones', [OpinionController::class, 'indexOpinionesRestaurante']);
Route::get('/restaurant/{id}/numOpiniones', [OpinionController::class, 'numOpinionesRestaurante']);
Route::get('/restaurant/{id}/opinionesFiltroNota/{nota}', [OpinionController::class, 'mostrarOpinionesPorNota']);
Route::get('/restaurant/{id}/opinionesFiltroFecha/{fecha}', [OpinionController::class, 'showOpinionesFecha']);
Route::get('/restaurant/{id}/opinionesFiltroFechas/{fecha1}/{fecha2}', [OpinionController::class, 'showOpinionRangoFechas']);
Route::get('/restaurant/{id}/opinionesFiltroFechas/{fecha1}/{fecha2}/{nota}', [OpinionController::class, 'showOpinionRangoFechasConNota']);
Route::get('/restaurant/{id}/opinionesFiltro/{nota}/{fecha}', [OpinionController::class, 'showOpinionesPorFechaYNota']);
Route::get('/restaurant/{id}/porcentajeNotas', [OpinionController::class, 'porcentajeVotos']);



Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('userProfile', [AuthController::class, 'userProfile']);
});


Route::group(['middleware' => 'api'], function($router){
    Route::post('/client/{id}/opinion/{restaurantId}', [OpinionController::class, 'store']);
    Route::post('/restaurant/{id}/mesa', [TableController::class, 'store']);
    Route::post('/restaurant/{id}/multiple-mesa', [TableController::class, 'multipleStore']);
    Route::post('/tiposCocina/restaurant/{id}', [TiposCocinaController::class, 'store']);
    Route::post('/horarios/restaurant/{id}', [HorarioController::class, 'store']);
    Route::post('plato/restaurant/{id}', [PlatoController::class, 'store']);
    Route::post('restaurant/{id}/plato/{idPlato}/alergenos', [AlergenoController::class, 'store']);
    Route::post('/client/{id}/reserva', [ReservaController::class, 'store']);
    
    Route::get('/client/{id}', [ClientController::class, 'show']);
    Route::get('/client/{id}/opiniones', [OpinionController::class, 'indexOpinionesCliente']);
    Route::get('/restaurant/{id}', [RestaurantController::class, 'show']);
    Route::get('/restaurant/{id}/mesa/{idMesa}', [TableController::class, 'show']);
    Route::get('/restaurant/{id}/horario/{dia}', [HorarioController::class, 'show']);
    Route::get('/restaurant/{id}/reservas', [ReservaController::class, 'indexRestaurante']);
    Route::get('/client/{id}/reservasRealizadas', [ReservaController::class, 'indexCliente']);

    Route::put('/user/{id}', [UserController::class, 'update']);
    Route::put('/client/{id}', [ClientController::class, 'update']);
    Route::put('/client/reserva/{id}', [ReservaController::class, 'update']);
    Route::put('/client/{id}/opinion/{idOpinion}', [OpinionController::class, 'update']);
    Route::put('/restaurant/{id}', [RestaurantController::class, 'update']);
    Route::put('/restaurant/{id}/location', [RestaurantController::class, 'storeLocation']);
    Route::put('/restaurant/{id}/mesa/{idMesa}', [TableController::class, 'update']);
    Route::put('/restaurant/{id}/horario/{dia}', [HorarioController::class, 'update']);
    Route::put('/restaurant/{id}/plato/{idPlato}', [PlatoController::class, 'update']);


    Route::delete('/user/{id}', [UserController::class, 'destroy']);
    Route::delete('/client/{id}', [ClientController::class, 'destroy']);
    Route::delete('/client/{id}/opinion/{restaurantId}', [OpinionController::class, 'destroy']);
    Route::delete('/restaurant/{id}', [RestaurantController::class, 'destroy']);
    Route::delete('/restaurant/{id}/mesa/{idMesa}', [TableController::class, 'destroy']);
    Route::delete('/restaurant/{id}/horario/{idHorario}', [HorarioController::class, 'destroy']);
    Route::delete('/restaurant/{id}/plato/{idPlato}', [PlatoController::class, 'destroy']);
    Route::delete('/client/reserva/{id}', [ReservaController::class, 'destroy']);
});