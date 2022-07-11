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

Route::get('/', function () {
    return view('welcome');
});
Route::get('{parms}', function(){
    return view('welcome');
});
Route::get('{parms}/{parms2}', function(){
    return view('welcome');
});
Route::get('{parms}/{parms2}/{parms3}', function(){
    return view('welcome');
});

