<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    use HasFactory;
    protected $primaryKey = 'idMesa';
    
    protected $fillable = [
        'numMesa',
        'numOcupantes',
        'restaurant_id',
    ];


    public function restaurant(){
        return $this->belongsTo('App\Models\Restaurant');
    }
}
