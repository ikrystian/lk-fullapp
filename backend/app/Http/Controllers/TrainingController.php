<?php

namespace App\Http\Controllers;

use App\Http\Resources\TrainingResource;
use App\Models\Activity;
use App\Models\Coords;
use App\Models\Meta;
use App\Models\Series;
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
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index()
    {
        $trainings = Training::where('user_id', Auth::id())->latest()->get();
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

    public function checkOpenedTraining() {
        return Training::where('end', null)->where('user_id', Auth::id())->get();
    }

    public function sync(Request $request) {
        $series =  $request->data;
        foreach($series as $singleSeries) {
            $exercise = new Series;
            $exercise->training_id = $singleSeries['training_id'];
            $exercise->user_id = Auth::id();
            $exercise->multiplier = $singleSeries['multiplier'];
            $exercise->series_type_id = $singleSeries['series_type_id'];
            $exercise->reps = $singleSeries['reps'];
            $exercise->weight = $singleSeries['weight'];
            $exercise->exercise_type_id = $singleSeries['exercise_type_id'];
            $exercise->body_part_id = $singleSeries['bodyPartId'];
            $exercise->save();
        }

        return response()->json('added');
    }

    public function coords(Request $request) {

        $coords = new Coords();
        $coords->user_id = Auth::id();
        $coords->lat = $request['lat'];
        $coords->lng = $request['lng'];
        $coords->save();

    }

    public function getLastExerciseSum($exerciseId)
    {

        $currentTrainingId = Training::latest()->findOrFail('id');

        $trainingId = Series::where('series_type_id', $exerciseId)
            ->where('training_id', '!=', $currentTrainingId)
            ->where('user_id', Auth::id())
            ->latest()
            ->first('training_id');



        $exercises = Series::where('training_id', $trainingId->training_id)->where('series_type_id', $exerciseId)->get();
        $lastTraining = $exercises->map(function ($item) {
            $data = $item;
            $data['total'] = $item->weight * $item->reps;
            return $data;
        });

        return [
            'lastTraining' => $lastTraining->sum('total')
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

    public function getUserAvatar() {
        $avatar = User::find(Auth::id())->profileimage;
        return response()->json(['avatar' => $avatar]);
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

    public function userImage(Request $request) {

        if ($files = $request->file('file')) {
            $file = $request->file->store('public');
            $document = User::find(1);
            $document->profileimage = explode('/', $file)[1];
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

    public function getByDate($date)
    {
        $trainings = Training::where('training_date', $date)
            ->where('user_id', Auth::id())
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
        $exercises = DB::table('series')
            ->where('training_id', $trainingId)
            ->where('series_type_id', $exerciseType)
            ->latest()->get();
        return $exercises;
    }

    public function end(Request $request)
    {
        $total = 0;
        $exercises = Series::all()->where('training_id', $request->id);
        foreach ($exercises as $exercise) {
            $total += $exercise->weight * $exercise->reps * $exercise->type->multiplier;
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
        $exercises = Series::all()->where('training_id', $request->id);
        foreach ($exercises as $exercise) {
            $total += $exercise->weight * $exercise->reps * $exercise->type->multiplier;
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
        Series::where('training_id', $id)->delete();
        return response()->json('removed', 200);
    }

    public function stats() {

        $user = User::find(Auth::id());
        $stats = [];
        $stats['total'] = Training::where('user_id', Auth::id())->sum('total');

        $stats['username'] = $user->name;
        $stats['trainings'] = Training::where('user_id', Auth::id())->count();

        return $stats;
    }
}
