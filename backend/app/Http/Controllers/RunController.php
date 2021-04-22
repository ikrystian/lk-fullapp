<?php

namespace App\Http\Controllers;

use App\Models\Run;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RunController extends Controller
{
    public function index() {
        return DB::table('runs')->where('user_id', Auth::id())->latest()->get();
    }

    public function store(Request $request)
    {
        $run = new Run();
        $run->user_id = Auth::id();
        $run->date = Carbon::now()->toDateString();
        $run->distance = $request['distance'];
        $run->time = $request['time'];
        $run->weather = $request['weather'];
        $run->save();

        return $run->toJson();
    }
}
