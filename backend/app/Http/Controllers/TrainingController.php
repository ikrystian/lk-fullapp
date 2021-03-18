<?php

namespace App\Http\Controllers;

use App\Http\Resources\TrainingResource;
use App\Models\Exercise;
use App\Models\Training;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TrainingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $trainings = Training::where('user_id', Auth::id())->get();
        return TrainingResource::collection($trainings);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $training = new Training;
        $training->user_id = Auth::id();
        $training->training_date = Carbon::now()->toDateString();
        $training->name = Carbon::now()->toDateString() . ' - ' . Carbon::now()->locale('pl')->dayName;
        $training->archive_training = 0;
        $training->start = Carbon::now();
        $training->save();
        $training->id;

        return $training->toJson();
    }

    public function addSeries(Request $request)
    {
        $exercise = new Exercise;
        $exercise->training_id = $request['training_id'];
        $exercise->user_id = Auth::id();
        $exercise->exercise_type_id = $request['exercise_type_id'];
        $exercise->reps = $request['reps'];
        $exercise->weight = $request['weight'];
        $exercise->save();

        return $exercise->toJson();
    }

    public function getByDate($date)
    {
        $trainings = Training::where('training_date', $date)->with('exercises')->orderBy('id', 'desc')->get();
        return TrainingResource::collection($trainings);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $training = Training::find($id);
        return $training;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    public function changeName(Request $request) {
        $training = Training::findOrFail($request->id);
        $training->name = $request->name;
        $training->save();
    }

    public function end(Request $request)
    {
        $training = Training::findOrFail($request->id);
        $training->end = Carbon::now();
        $training->save();
        return $training->toJson();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
