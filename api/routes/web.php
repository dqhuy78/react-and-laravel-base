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
// auth()->login(\App\Models\User::find(58));
// phpcs:disable
Route::prefix('api')->group(function () {
    Route::get('web-init', 'WebInitController');
});
// phpcs:enable
Route::get('{path?}', 'WebRenderController')->where('path', '[a-zA-Z0-9-/]+');
