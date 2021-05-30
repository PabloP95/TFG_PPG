<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RestaurantController;
use App\Http\Controllers\ClientController;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('unauthorized', function() {
    return response()->json([
        'status' => 'error',
        'message' => 'Unauthorized'
    ], 401);
})->name('api.jwt.unauthorized');

Route::get('users', [UserController::class, 'index']);

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
    Route::get('/client/{id}', [ClientController::class, 'show']);
    Route::get('/restaurant/{id}', [RestaurantController::class, 'show']);

    Route::put('/user/{id}', [UserController::class, 'update']);
    Route::put('/client/{id}', [ClientController::class, 'update']);
    Route::put('/restaurant/{id}', [RestaurantController::class, 'update']);
    
    Route::delete('/user/{id}', [UserController::class, 'destroy']);
    Route::delete('/client/{id}', [ClientController::class, 'destroy']);
    Route::delete('/restaurant/{id}', [RestaurantController::class, 'destroy']);

});