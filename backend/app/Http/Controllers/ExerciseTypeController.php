<?php

namespace App\Http\Controllers;

use App\Models\SeriesType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExerciseTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return SeriesType::where('user_id', 0)->orWhere('user_id', Auth::id())->orderBy('name', 'ASC')->get()->toArray();
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $exerciseType = new SeriesType;
        $exerciseType->name = $request->data['name'];
        $exerciseType->user_id = 0;
        $exerciseType->body_part_id = $request->data['body_part'];
        $exerciseType->exercise_type_id = $request->data['exercise_type'];
        $exerciseType->imageurl = $request->data['imageUrl'];
        $exerciseType->save();

        return $exerciseType->toJson();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
