<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeriesType extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'user_id',
        'multiplier',
        'body_part_id',
        'imageurl',
        'exercise_type_id'
    ];

    protected $with = ['bodyPart'];

    public function exercise() {
        return $this->hasMany(Exercise::class);
    }

    public function exerciseType() {
        return $this->belongsTo(ExerciseType::class, 'exercise_type_id', 'id');
    }

    public function bodyPart() {
        return $this->belongsTo(BodyPart::class, 'body_part_id', 'id');
    }

}
