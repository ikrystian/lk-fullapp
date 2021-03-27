<?php

namespace App\Http\Controllers;

use App\Http\Resources\ActivityResource;
use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ActivityController extends Controller
{
    public function getByUserId()
    {
        $activities = Activity::where('user_id', Auth::id())->get();
        return ActivityResource::collection($activities);
    }
}
