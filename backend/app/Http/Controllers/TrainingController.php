<?php

namespace App\Http\Controllers;

use App\Http\Resources\TrainingResource;
use App\Models\Activity;
use App\Models\Exercise;
use App\Models\Meta;
use App\Models\Training;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class TrainingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $trainings = Training::where('user_id', Auth::id())->orderBy('training_date', 'desc')->get();
        $trainings->map(function ($training) {

            if ($training->end) {
                $to = Carbon::createFromFormat('Y-m-d H:i:s', $training->start);
                $from = Carbon::createFromFormat('Y-m-d H:i:s',$training->end);
                $diff_in_minutes = $to->diffInMinutes($from);
                $training['time'] = $diff_in_minutes;
            }
        });
        return TrainingResource::collection($trainings);

    }

    public function getLastExerciseSum($exerciseId, $currentTrainingId)
    {
        $trainingId = Exercise::where('exercise_type_id', $exerciseId)
            ->where('training_id', '!=', $currentTrainingId)
            ->where('user_id', Auth::id())
            ->latest()
            ->firstOrFail('training_id')->training_id;


        $exercises = Exercise::where('training_id', $trainingId)->where('exercise_type_id', $exerciseId)->get();

        $lastTraining = $exercises->map(function ($item) {
            $data = $item;
            $data['total'] = $item->weight * $item->reps * $item->type->multipler;
            return $data;
        });

        $exercises = Exercise::where('training_id', $currentTrainingId)->where('exercise_type_id', $exerciseId)->get();


        $currentTraining = $exercises->map(function ($item) {
            $data = $item;
            $data['total'] = $item->weight * $item->reps * $item->type->multipler;
            return $data;
        });

        $exercises = Exercise::where('training_id', $currentTrainingId)->get();

        $currentTotalTraining = $exercises->map(function ($item) {
            $data = $item;
            $data['total'] = $item->weight * $item->reps * $item->type->multipler;
            return $data;
        });


        return [
            'lastTraining' => $lastTraining->sum('total'),
            'currentTraining' => $currentTraining->sum('total'),
            'currentTotalTraining' => $currentTotalTraining->sum('total'),
        ];
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

    public function storeImage($trainingId, Request $request)
    {
        if ($files = $request->file('file')) {
            $file = $request->file->store('public');
            $document = Training::findOrFail($trainingId);
            $document->user_image = explode('/', $file)[1];
            $document->save();

            return response()->json([
                "success" => true,
                "message" => "File successfully uploaded",
                "file" => $file
            ]);

        }
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
        $meta = new Meta();
        $meta->connection_name = 'training';
        $meta->connection_value = $training->id;
        $meta->meta_name = 'location';
        $meta->meta_value = json_encode($request['data']);
        $meta->save();
        $training->id;

        $activity = new Activity;
        $activity->user_id = Auth::id();
        $activity->message = 'Krystian dodał trening o id ' . $training->id;
        $activity->created = Carbon::now();
        $activity->save();

        return $training->toJson();
    }


    public function addSeries(Request $request)
    {
        $exercise = new Exercise;
        $exercise->training_id = $request['training_id'];
        $exercise->user_id = Auth::id();
        $exercise->exercise_type_id = $request['exercise_type_id'];
        $exercise->body_part_id = $request['bodyPartId'];
        $exercise->reps = $request['reps'];
        $exercise->weight = $request['weight'];
        $exercise->save();
        $exercise->id;
        return $exercise->toJson();
    }

    public function getByDate($date)
    {
        $trainings = Training::where('training_date', $date)
            ->where('user_id', Auth::id())
            ->with('exercises')
            ->orderBy('id', 'desc')
            ->get();
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

    public function changeName(Request $request)
    {
        $training = Training::findOrFail($request->id);
        $training->name = $request->name;
        $training->save();
    }

    public function getSeries($trainingId, $exerciseType)
    {
        $exercises = DB::table('exercises')
            ->where('training_id', $trainingId)
            ->where('exercise_type_id', $exerciseType)
            ->latest()->get();
        return $exercises;
    }

    public function end(Request $request)
    {
        $total = 0;
        $exercises = Exercise::all()->where('training_id', $request->id);
        foreach ($exercises as $exercise) {
            $total += $exercise->weight * $exercise->reps * $exercise->type->multipler;
        }

        $training = Training::findOrFail($request->id);
        $training->end = Carbon::now();
        $training->total = $total;
        $training->save();
        return $training->toJson();
    }

    public function save(Request $request)
    {
        $total = 0;
        $exercises = Exercise::all()->where('training_id', $request->id);
        foreach ($exercises as $exercise) {
            $total += $exercise->weight * $exercise->reps * $exercise->type->multipler;
        }
        $training = Training::findOrFail($request->id);
        $training->total = $total;
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
        Training::destroy($id);
        Exercise::where('training_id', $id)->delete();
        return response()->json('removed', 200);
    }

    public function stats() {

        $user = User::find(Auth::id());
        $stats = [];
        $stats['total'] = Training::where('user_id', Auth::id())->sum('total');

        $stats['username'] = $user->name;
        $stats['trainings'] = Training::where('user_id', Auth::id())->count();
        if (Auth::id() == 1) {
            $stats['total'] += 550000;
            $stats['trainings'] += 28;

        }
        return $stats;
    }
}
