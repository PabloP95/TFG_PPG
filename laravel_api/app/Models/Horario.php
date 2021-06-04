<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Horario extends Model
{
    use HasFactory;

    protected $fillable = [
        'dia',
        'horarioAperturaP1',
        'horarioAperturaP2',
        'horarioCierreP1',
        'horarioCierreP2',
        'restaurant_id',
    ];
    public $timestamps = FALSE;
    

    public function restaurant(){
        return $this->belongsTo('App\Models\Restaurant');
    }
}
