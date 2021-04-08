<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Series extends Model
{
    use HasFactory;

    protected $fillable = [
        'training_id',
        'user_id',
        'series_type_id',
        'reps',
        'weight',
        'exercise_type_id'
    ];

    protected $with = ['type'];
    public function exerciseType() {
        return $this->belongsTo(ExerciseType::class, 'exercise_type_id', 'id');
    }
    public function type() {
        return $this->belongsTo(SeriesType::class, 'series_type_id', 'id');
    }
}
