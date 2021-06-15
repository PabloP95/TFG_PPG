<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    use HasFactory;
    protected $fillable = [
        'restaurant_id',
        'table_id',
        'client_id',
        'diaReserva',
        'horaReserva'
    ];

    public function cliente(){
        return $this->belongsTo('App\Models\Client');
    }

    public function restaurante(){
        return $this->belongsTo('App\Models\Restaurant');
    }
}
