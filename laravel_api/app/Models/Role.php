<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $primaryKey = 'role_id';
    protected $fillable = [
        'role'
    ];

    public function users(){
        return $this->hasMany(User::class,'user_id','role_id');
    }
}
