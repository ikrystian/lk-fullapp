<?php

namespace App\Http\Controllers;

use App\Models\Meta;
use Illuminate\Http\Request;

class MetaController extends Controller
{
    public function store( Request $request) {
        $meta = new Meta();
        $meta->connection_name = $request['connection_name'];
        $meta->connection_value = $request['connection_value'];
        $meta->meta_name = $request['meta_name'];
        $meta->meta_value = $request['meta_value'];
        $meta->save();

        return response()->json('meta value is added', 200);

    }
}
