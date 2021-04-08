<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExerciseType extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function seriesTypes() {
        return $this->hasMany(SeriesType::class);
    }

    public function series() {
        return $this->hasMany(Series::class);
    }
}
