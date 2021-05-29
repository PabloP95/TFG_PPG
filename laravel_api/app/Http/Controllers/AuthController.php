<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Client;
use App\Models\Restaurant;

use Validator;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 422);
        }


        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->createNewToken($token);
    }

    /**
     * 
     * Register a user
     */
    //Con unique hacemos que el email sea unico, con lo que no puede haber dos usuarios con el mismo email
    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:100|unique:users',
            'password' => 'required|string|confirmed|min:6',
            'name' => 'required|string|unique:users',
            'userable_type' => 'required|string',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        if($request->input('userable_type') === 'App\\Models\\Client'){
            $client = new Client();
            $client->save();
            $idClient = $client->id;
            $user = User::create([
                'email' => $request->input('email'),
                'password' => bcrypt($request->input('password')),
                'name' => $request->input('name'),
                'userable_id' => $idClient,
                'userable_type' => $request->input('userable_type')
            ]);
            $token = auth()->login($user);
            return $this->createNewToken($token);
            return response()->json([
            'message' => 'User register OK',
            'user' => $user,
            'token' => $token,
        ], 201);
        }

        if($request->input('userable_type') === 'App\\Models\\Restaurant'){
            $restaurant = new Restaurant();
            $restaurant->save();
            $idRestaurant = $restaurant->id;
            $user = User::create([
                'email' => $request->input('email'),
                'password' => bcrypt($request->input('password')),
                'name' => $request->input('name'),
                'userable_id' => $idRestaurant,
                'userable_type' => $request->input('userable_type')
            ]);
            $token = auth()->login($user);

            return response()->json(
            [
                'message' => 'User register OK',
                'user' => $user,
                'token' => $token,
            ], 201);
        }
    }
    
    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();
        
        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function userProfile()
    {
        return response()->json(auth()->user());
    }
    
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->createNewToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user()
        ]);
    }
}
