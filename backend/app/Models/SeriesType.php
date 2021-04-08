<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeriesType extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'multiplier',
        'body_part_id',
        'imageurl'
    ];

    protected $with = ['bodyPart'];

    public function exercise() {
        return $this->hasMany(Exercise::class);
    }

    public function bodyPart() {
        return $this->belongsTo(BodyPart::class, 'body_part_id', 'id');
    }

}
