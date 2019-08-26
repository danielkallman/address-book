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



Route::prefix('auth')->group(function () {
    Route::post('register', 'AuthController@register');
    Route::post('login', 'AuthController@login');
    Route::get('refresh', 'AuthController@refresh');
    Route::group(['middleware' => 'auth:api'], function(){
        Route::get('user', 'AuthController@user');
        Route::post('logout', 'AuthController@logout');
    });
});

Route::group(['middleware' => 'auth:api'], function(){
    Route::get('user', 'UserController@index')->middleware('isAdminOrUser');

        
    Route::get('addressbook', 'AddressBookController@index')->middleware('isAdminOrUser');
    Route::get('addressbook/{id}', 'AddressBookController@show')->middleware('isAdminOrUser');
    Route::post('addressbook', 'AddressBookController@store')->middleware('isAdminOrUser');
    Route::put('addressbook/{id}', 'AddressBookController@update')->middleware('isAdmin');
    Route::delete('addressbook/{id}', 'AddressBookController@delete')->middleware('isAdmin');
});