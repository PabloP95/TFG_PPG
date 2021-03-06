<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'nombreCompleto',
    ];

    public function user(){
        return $this->morphOne('App\Models\User', 'userable');
    }

    public function opiniones(){
        return $this->hasMany('App\Models\Opinion');
    }

    public function reservas(){
        return $this->hasMany('App\Models\Reserva');
    }
}
