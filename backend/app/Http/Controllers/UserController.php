<?php

namespace App\Http\Controllers;

use App\Models\Training;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function getLatestUserImages($userId) {
        $images = Training::where('user_id', Auth::id())->where('user_image', '!=', null)->limit(6)->latest()->get('user_image');
        return $images;
    }
}
