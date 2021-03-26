<?php

namespace App\Http\Controllers;

use App\Http\Resources\ActivityResource;
use App\Models\Activity;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    public function getByUserId($userId)
    {
        $activities = Activity::where('user_id', $userId)->get();
        return ActivityResource::collection($activities);
    }
}
