<?php

namespace App\Http\Controllers;

class WebRenderController extends Controller
{
    public function __invoke()
    {
        return file_get_contents(public_path() . '/build/index.html');
    }
}
