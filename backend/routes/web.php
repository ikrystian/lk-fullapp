<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\JwtAuthController;
use App\Http\Controllers\TrainingController;
use App\Models\Coords;
use Carbon\Carbon;
use Faker\Provider\Image;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/clear', function () {
   Artisan::call('cache:clear');
   Artisan::call('config:clear');
   Artisan::call('config:cache');
   Artisan::call('view:cache');
   Artisan::call('key:generate');
   Artisan::call('storage:link');
});
//Route::get('/user', [JwtAuthController::class, 'user']);
//Route::get('/activities/{userId}', [ActivityController::class, 'getByUserId']);
//Route::get('test', [TrainingController::class, 'getLastExerciseSum']);

Route::get('/a', function() {
    $to = Carbon::createFromFormat('Y-m-d H:i:s', '2021-05-06 13:30:34');
    $from = Carbon::createFromFormat('Y-m-d H:i:s', '2016-05-06 13:30:54');


    $diff_in_minutes = $to->diffInMinutes($from);
    print_r($diff_in_minutes); // Output: 20
});

Route::get('coords', function() {
    return Coords::all()->toJson();
});
