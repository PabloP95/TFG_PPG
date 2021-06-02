<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TiposCocina extends Model
{
    use HasFactory;

    public function restaurants(){
        return $this->belongsToMany('App\Models\Restaurant');
    }
}
