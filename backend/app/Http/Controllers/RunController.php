<?php

namespace App\Http\Controllers;

use App\Models\Run;
use App\Models\Series;
use App\Models\Training;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class RunController extends Controller
{
    public function index() {
        return DB::table('runs')->where('user_id', Auth::id())->latest()->get();
    }

    public function getRunsForTraining($trainingId, $typeId) {
        return DB::table('runs')->where('type', $typeId)->where('training_id', $trainingId)->where('user_id', Auth::id())->latest()->get();
    }

    public function getRun($id) {
        return Run::find($id);
    }

    public function store(Request $request)
    {

        $run = new Run();
        $run->user_id = Auth::id();
        $run->date = Carbon::now()->toDateString();
        $run->distance = $request['distance'] * 1000;
        $run->training_id = $request['trainingId'];
        $run->time = $request['time'];
        $run->weather = $request['weather'];
        $run->type = $request['type'];
        $run->save();

        return $run->toJson();
    }

    public function destroy(Request $request)
    {
        Run::destroy($request[0]);
        return response()->json('removed', 200);
    }

}
