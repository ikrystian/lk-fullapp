<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    use HasFactory;

    protected $fillable = [
        'training_id',
        'user_id',
        'exercise_type_id',
        'reps',
        'weight'
    ];

    public function type() {
        return $this->belongsTo(ExerciseType::class, 'exercise_type_id', 'id');
    }
}
