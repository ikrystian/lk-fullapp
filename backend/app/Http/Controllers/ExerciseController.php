<?php

namespace App\Http\Controllers;

use App\Http\Resources\ExerciseResource;
use App\Models\Exercise;
use App\Models\Training;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ExerciseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $exercises = Exercise::all();
        return ExerciseResource::collection($exercises);
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
        //
    }

    public function total($trainingId) {
        $exercises = Exercise::where('training_id', $trainingId)->get();
        $total = 0;
        foreach($exercises as $exercise) {
            $total += ($exercise->weight * $exercise->reps);
        }
        return $total;
    }

    public function getBodyParts()
    {
        return DB::table('body_parts')->get();
    }

    public function averageExercisesWeight($id, $trainingId)
    {
        if($id == 0) return null;

        $trainings = Training::where('archive_training', 0)->get()->count();

        $total = 0;
        $exercises = DB::table('exercises')
            ->where('user_id', Auth::id())
            ->where('exercise_type_id', $id)
            ->where('training_id', '!=', $trainingId)
            ->get();

        $ex2 = $exercises->unique('training_id')->count();


        if (!$exercises) {
            return false;
        } else {
            foreach ($exercises as $exercise) {
                $weight = $exercise->reps * $exercise->weight;
                $total += $weight;
            }
            $averageInOneSeries = round($total /  $ex2);
            $averageInTraining = round($total / $trainings);

            return [$averageInOneSeries, $averageInTraining];
        }
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
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
        Exercise::destroy($id);
        return response()->json('removed', 200);
    }
}
