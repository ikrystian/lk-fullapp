<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Training extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'training_date',
        'name',
        'start',
        'end',
        'total',
        'archive_training'
    ];

    public function exercises() {
        return $this->hasMany(Exercise::class);
    }

}
