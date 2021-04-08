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
        'weight'
    ];

    protected $with = ['type'];

    public function type() {
        return $this->belongsTo(SeriesType::class, 'series_type_id', 'id');
    }
}
