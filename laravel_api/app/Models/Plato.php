<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Plato extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'nombre',
        'descripcion',
        'tipo_plato',
        'vegano',
        'precio',
        'restaurant_id'
    ];

    public function restaurants(){
        return $this->belongsTo('App\Models\Restaurant');
    }
    
    public function alergenos(){
        return $this->belongsToMany('App\Models\Alergeno');
    }
}
