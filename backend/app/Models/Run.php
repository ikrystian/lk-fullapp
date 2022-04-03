<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Run extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'date',
        'distance',
        'training_id',
        'time',
        'weather',
        'type'
    ];
}
