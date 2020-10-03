<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;

class WebInitController extends Controller
{
    public function __invoke()
    {
        $authUser = auth()->user();

        if ($authUser) {
            return new UserResource($authUser);
        }
        return response()->json(['data' => null]);
    }
}
