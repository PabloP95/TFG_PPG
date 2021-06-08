<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Opinion extends Model
{
    use HasFactory;

    protected $fillable = [
        'nota',
        'comentario',
        'client_id',
        'restaurant_id'
    ];

    public function client(){
        return $this->belongsTo('App\Models\Client');
    }
    
    public function restaurant(){
        return $this->belongsTo('App\Models\Restaurant');
    }
}
