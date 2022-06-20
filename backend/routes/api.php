<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\ExerciseTypeController;
use App\Http\Controllers\MetaController;
use App\Http\Controllers\RunController;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\UserController;
use App\Models\Coords;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\JwtAuthController;
use App\Http\Controllers\ResetPwdReqController;
use App\Http\Controllers\UpdatePwdController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/signup', [JwtAuthController::class, 'register']);
    Route::post('/signin', [JwtAuthController::class, 'login']);
    Route::get('/user', [JwtAuthController::class, 'user']);
    Route::post('/token-refresh', [JwtAuthController::class, 'refresh']);
    Route::post('/signout', [JwtAuthController::class, 'signout']);
    Route::post('/req-password-reset', [ResetPwdReqController::class, 'reqForgotPassword']);
    Route::post('/update-password', [UpdatePwdController::class, 'updatePassword']);
});
Route::group([
    'middleware' => 'api',
], function ($router) {
    Route::get('coords', function() {
        return Coords::all()->toJson();
    });

    Route::get('/get-exercises-by-training/{trainingId}', [TrainingController::class, 'getExercisesByTrainingId']);
    Route::get('/lorem/{seriesTypeId}/{trainingId}', [TrainingController::class, 'getTotalInSeriesWeightOnTraining']);
    Route::get('/getuniqueseries/{trainingId}', [TrainingController::class, 'getUniqueSeriesByTrainingId']);
    Route::post('/add-coords', [TrainingController::class, 'coords']);
    Route::get('/run/{id}', [RunController::class, 'getRun']);
    Route::get('/get-user-meta/{value}', [TrainingController::class, 'userUserMeta']);
    Route::get('/get-runs', [RunController::class, 'index']);
    Route::post('/training/add-run/', [RunController::class, 'store']);
    Route::post('/remove-run/', [RunController::class, 'destroy']);
    Route::get('/getuseravatar', [TrainingController::class, 'getUserAvatar']);
    Route::get('/getuseravatar/{id}', [TrainingController::class, 'getUserAvatarById']);
    Route::post('/set-weight', [TrainingController::class, 'setWeight']);
    Route::get('/activities', [ActivityController::class, 'getByUserId']);
    Route::get('/exercises/getTotalInSeries/{exerciseId}', [TrainingController::class, 'getLastExerciseSum']);
    Route::get('/exercises/averageInExercise/{exerciseId}', [TrainingController::class, 'getAverageInExercise']);
    Route::post('/trainings/add-image/{trainingId}', [TrainingController::class, 'upload']);
    Route::post('/user/add-image/', [TrainingController::class, 'userImage']);
    Route::get('/training/total/{trainingId}', [ExerciseController::class, 'total']);
    Route::post('/meta/add', [MetaController::class, 'store']);
    Route::get('/stats', [TrainingController::class, 'stats']);
    Route::get('/get-body-parts', [ExerciseController::class, 'getBodyParts']);
    Route::get('/training/exercises/{trainingId}/{exerciseType}', [TrainingController::class, 'getSeries']);

    Route::get('/training/series/{trainingId}', [TrainingController::class, 'getAllSeriesByTrainingId']);
    Route::post('/remove-series', [TrainingController::class, 'removeSeries']);
    Route::post('/training/change-name', [TrainingController::class, 'changeName']);
    Route::post('/trainings/workout/save', [TrainingController::class, 'save']);
    Route::post('sync', [TrainingController::class, 'sync']);
    Route::post('/trainings/workout/finish', [TrainingController::class, 'end']);

    Route::post('/training/series/add', [TrainingController::class, 'addSeries']);

    Route::post('/set-progress', [UserController::class, 'changeProgressSetting']);

    Route::get('/trainings/day/{date}', [TrainingController::class, 'getByDate']);
    Route::get('/exercises/unique/{trainingId}', [TrainingController::class, 'getUniqueExercises']);
    Route::get('/check-opened-training', [TrainingController::class, 'checkOpenedTraining']);
    Route::resource('/trainings', TrainingController::class);
    Route::resource('/exercises', ExerciseController::class);
    Route::resource('/exercises-types', ExerciseTypeController::class);

    Route::get('/get-runs/{trainingId}/{typeId}', [RunController::class, 'getRunsForTraining']);

    Route::get('/user/latest-images/{userId}', [UserController::class, 'getLatestUserImages']);

    Route::get('/profileInfo/{userId}',[TrainingController::class, 'getBasicProfileInfo'] );

});
