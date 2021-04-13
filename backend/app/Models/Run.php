<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Run extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'training_id',
        'distance',
        'time',
        'weather'
    ];

    protected $with = ['training'];

    public function training() {
        return $this->belongsTo(Training::class, 'training_id', 'id');
    }




}
