<?php

use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\ExerciseTypeController;
use App\Http\Controllers\TrainingController;
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
Route::group(['middleware' => 'api'], function ($router) {
    Route::get('/training/exercises/{trainingId}/{exerciseType}', [TrainingController::class, 'getSeries']);
    Route::post('/training/change-name', [TrainingController::class, 'changeName']);
    Route::post('/training/series/add', [TrainingController::class, 'addSeries']);
    Route::post('/trainings/workout/finish', [TrainingController::class, 'end']);
    Route::get('/trainings/day/{date}', [TrainingController::class, 'getByDate']);
    Route::get('/exercises/unique/{trainingId}', [TrainingController::class, 'getUniqueExercises']);
    Route::get('/exercises/average/{id}/{trainingId}', [ExerciseController::class, 'averageExercisesWeight']);
    Route::resource('/trainings', TrainingController::class);
    Route::resource('/exercises', ExerciseController::class);
    Route::resource('/exercises-types', ExerciseTypeController::class);
});


