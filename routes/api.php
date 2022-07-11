<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::group(['prefix' => 'auth', 'name' => 'auth.', 'namespace' => 'Auth'], function(){
    Route::post('login', 'LoginController@login')->name('login');
});

Route::group(['prefix' => 'document', 'name' => 'document.'], function(){
    Route::get('/', 'DocumentsController@index')->name('index');
    Route::get('/edit/{id}', 'DocumentsController@edit')->name('edit');
    Route::post('/store', 'DocumentsController@store')->name('store');
    Route::post('/update/{id}', 'DocumentsController@update')->name('update');
    Route::post('/delete/{id}', 'DocumentsController@destroy')->name('delete');

    Route::post('/upload/{id}', 'DocumentsController@upload')->name('upload');
    Route::get('/sequence-letter', 'DocumentsController@sequenceLetter')->name('sequenceLetter');
});
Route::group(['prefix' => 'person-in-charge', 'name' => 'personInCharge.'], function(){
    Route::get('/', 'PersonInChargeController@index')->name('index');
    Route::get('/fetch-data', 'PersonInChargeController@fetchData')->name('fetchData');
    Route::post('/store', 'PersonInChargeController@store')->name('store');
    Route::post('/update/{id}', 'PersonInChargeController@update')->name('update');
    Route::post('/delete/{id}', 'PersonInChargeController@destroy')->name('delete');
});
Route::group(['prefix' => 'job', 'name' => 'job.'], function(){
    Route::get('/', 'JobsController@index')->name('index');
    Route::get('/fetch-data', 'JobsController@fetchData')->name('fetchData');
    Route::post('/store', 'JobsController@store')->name('store');
    Route::post('/update/{id}', 'JobsController@update')->name('update');
    Route::post('/delete/{id}', 'JobsController@destroy')->name('delete');
});
Route::group(['prefix' => 'activity', 'name' => 'activity.'], function(){
    Route::get('/', 'ActivitiesController@index')->name('index');
    Route::get('/fetch-data', 'ActivitiesController@fetchData')->name('fetchData');
    Route::post('/store', 'ActivitiesController@store')->name('store');
    Route::post('/update/{id}', 'ActivitiesController@update')->name('update');
    Route::post('/delete/{id}', 'ActivitiesController@destroy')->name('delete');
});
Route::group(['prefix' => 'user', 'name' => 'user.'], function(){
    Route::get('/', 'UsersController@index')->name('index');
    Route::post('/store', 'UsersController@store')->name('store');
    Route::post('/update/{id}', 'UsersController@update')->name('update');
    Route::post('/delete/{id}', 'UsersController@destroy')->name('delete');
});
