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
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

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
        return TrainingResource::collection($trainings);
    }

    public function checkOpenedTraining()
    {
        return Training::where('end', null)->where('user_id', Auth::id())->get();
    }

    public function sync(Request $request)
    {
        $series = $request->data;
        foreach ($series as $singleSeries) {
            $exercise = new Series;
            $exercise->training_id = $singleSeries['training_id'];
            $exercise->user_id = Auth::id();
            $exercise->series_type_id = $singleSeries['series_type_id'];
            $exercise->reps = $singleSeries['reps'];
            $exercise->weight = $singleSeries['weight'];
            $exercise->exercise_type_id = $singleSeries['exercise_type_id'];
            $exercise->body_part_id = $singleSeries['bodyPartId'];
            $exercise->save();
        }

        return response()->json('added');
    }

    public function addSeries(Request  $request) {
        $series = $request;

        $exercise = new Series;
        $exercise->training_id = $series['training_id'];
        $exercise->user_id = Auth::id();
        $exercise->series_type_id = $series['series_type_id'];
        $exercise->reps = $series['reps'];
        $exercise->weight = $series['weight'];
        $exercise->exercise_type_id = $series['exercise_type_id'];
        $exercise->body_part_id = $series['bodyPartId'];
        $exercise->save();

        return response()->json($exercise, 200);
    }

    public function coords(Request $request)
    {

        $coords = new Coords();
        $coords->user_id = Auth::id();
        $coords->lat = $request['lat'];
        $coords->lng = $request['lng'];
        $coords->save();

    }

    public function getAverageInExercise($exerciseId)
    {

        $series = Series::where('series_type_id', $exerciseId)->where('user_id', Auth::id());
        $series_array = $series->get()->toArray();
        $training__count = $series->get()->unique('training_id')->count();
        if($training__count == 0) {
            return 0;
        }
        $total =  array_reduce($series_array, function($carry, $item) {
            $carry += $item['reps'] * $item['weight'];
            return $carry;
        }, 0);

        $exerciseSetting = User::find(Auth::id())['progress'];
        if($exerciseSetting == 0) {
            return ['lastTraining' => round($total / $training__count)];
        }

        $currentTrainingId = Training::latest()->first('id')->id;

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

    public function getLastExerciseSum($exerciseId)
    {

        $currentTrainingId = Training::latest()->first('id')->id;

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

    public function userUserMeta($value)
    {

        $meta = DB::table('metas')
            ->where('connection_name', 'user')
            ->where('connection_value', Auth::id())
            ->where('meta_name', $value)
            ->orderBy('id', 'DESC')
            ->first('meta_value');

        return response()->json([
            "data" => $meta
        ]);

    }

    public function getUserAvatar()
    {
        $avatar = User::find(Auth::id())->profileimage;
        return response()->json(['avatar' => $avatar]);
    }

    public function getUserAvatarById($id)
    {
        $avatar = User::findOrFail($id)->profileimage;
        return response()->json(['avatar' => $avatar]);
    }

    public function setWeight(Request $request)
    {
        $meta = new Meta();
        $meta->connection_name = 'user';
        $meta->connection_value = Auth::id();
        $meta->meta_name = 'weight';
        $meta->meta_value = $request->data;
        $meta->save();

        return response()->json([
            "success" => true,
            "message" => "Weight saved successfully",
        ]);
    }

    public function upload($trainingId, Request $request)
    {
        $this->validate($request, [
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg',
        ]);

        $this->storeImage($request, $trainingId);

    }

    public function storeImage($request, $trainingId)
    {
        // Get file from request
        $file = $request->file('file');

        // Get filename with extension
        $filenameWithExt = $file->getClientOriginalName();

        // Get file path
        $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);

        // Remove unwanted characters
        $filename = preg_replace("/[^A-Za-z0-9 ]/", '', $filename);
        $filename = preg_replace("/\s+/", '-', $filename);

        // Get the original image extension
        $extension = $file->getClientOriginalExtension();

        $file->store('public/images');
        $imageName = explode('.jpg', explode('/', $request->file->store('public/images'))[2])[0];
        $this->resizeImage($file, $imageName . '_600.' . $extension, 600);
        $this->resizeImage($file, $imageName . '_120.' . $extension, 120);

        $training = Training::findOrFail($trainingId);
        $training->user_image = $imageName;
        $training->save();

        return $training;
    }

    /**
     * @param $file
     * @param $fileNameToStore
     * @param $size
     * @return bool
     */
    public function resizeImage($file, $fileNameToStore, $size)
    {
        $resize = Image::make($file)->rotate(-90)->resize($size, null, function ($constraint) {
            $constraint->aspectRatio();
        })->encode('jpg');

        $save = Storage::put("public/images/$fileNameToStore", $resize->__toString());
        if (!$save) {
            return true;
        }
    }


    public function userImage(Request $request)
    {

        if (!$request->file('file')) {
            return false;
        }

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
        $training->time = Carbon::parse($training->end)->diffInMinutes(Carbon::parse($training->start));
        return $training;
    }

    public function getExercisesByTrainingId($trainingId)
    {
        $exercises = Series::where('training_id', $trainingId)
            ->orderBy('id', 'DESC')
            ->get();

        $exercises->map(function ($exercise) use ($trainingId) {
            $exercise->total = $this->getTotalInSeriesWeightOnTraining($exercise->series_type_id, $trainingId);
        });

        return $exercises->unique('series_type_id')->values()->all();
    }

    public function getTotalInSeriesWeightOnTraining($seriesTypeId, $trainingId)
    {
        $series = Series::where('training_id', $trainingId)
            ->where('series_type_id', $seriesTypeId)
            ->get();

        $total = 0;
        foreach ($series as $singleSeries) {
            $total += $singleSeries->weight * $singleSeries->reps;
        }

        return $total;
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

    public function getAllSeriesByTrainingId($trainingId) {
        $exercises = DB::table('series')
            ->where('training_id', $trainingId)
            ->latest()->get();
        return $exercises;
    }

    public function removeSeries(Request $request) {
        $id = $request->id;
        Series::findOrFail($id)->delete();
        return response()->json('removed', 200);
    }

    public function end(Request $request)
    {
        $total = 0;
        $id = $request[0];
        $exercises = Series::all()->where('training_id', $id);

        foreach ($exercises as $exercise) {
            $total += $exercise->weight * $exercise->reps * $exercise->type->multiplier;
        }

        $training = Training::findOrFail($id);
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
     * Remove the specified resource from storage.
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        Training::destroy($id);
        Series::where('training_id', $id)->delete();
        return response()->json('removed', 200);
    }

    public function streak($userId)
    {
        $days = [];
        $trainings = Training::where('user_id', $userId)->latest()->get('training_date');

        if ($trainings->isEmpty()) {
            return 0;
        }

        foreach ($trainings as $training) {
            array_push($days, $training->training_date);
        }

        $streak = 1;
        while (in_array(Carbon::createFromFormat('Y-m-d', $days[0])->subDays($streak)->format('Y-m-d'), $days)) {
            $streak++;
        }

        return $streak;
    }

    public function stats()
    {

        $user = User::find(Auth::id());
        $stats = [];
        $stats['total'] = Training::where('user_id', Auth::id())->sum('total');

        $stats['username'] = $user->name;
        $stats['trainings'] = Training::where('user_id', Auth::id())->count();

        $runs = DB::table('runs')->where('user_id', Auth::id());
        $stats['runMeters'] = $runs->sum('distance');
        $stats['runSeconds'] = $runs->sum('time');
        $stats['streak'] = $this->streak(Auth::id());

        return $stats;
    }

    public function getUniqueSeriesByTrainingId($trainingId)
    {
        $series = DB::table('series')->where('training_id', $trainingId)->get();
        return $series;
    }

    public function getBasicProfileInfo($userId) {
        $user = DB::table('users')->where('id', $userId)->get()[0];
        return $user;
    }
}
