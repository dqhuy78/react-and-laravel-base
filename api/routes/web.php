<?php

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
// phpcs:disable
Route::get('/', function () {
    return view('welcome');
});
// phpcs:enable
Route::get('{path?}', 'RenderWebView')->where('path', '[a-zA-Z0-9-/]+');
