<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    
    protected $fillable = [
        'numTelefono',
        'direccionPostal',
        'longitud',
        'latitud'
    ];

    public function user(){
        return $this->morphOne('App\Models\User', 'userable');
    }

    public function tables(){
        return $this->hasMany('App\Models\Table');
    }

    public function tiposCocina(){
        return $this->belongsToMany('App\Models\TiposCocina');
    }
    
    public function platos(){
        return $this->hasMany('App\Models\Plato');
    }

    public function horarios(){
        return $this->hasMany('App\Models\Horario');
    }

    public function opiniones(){
        return $this->hasMany('App\Models\Opinion');
    }
}
