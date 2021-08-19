<?php

use Illuminate\Support\Facades\Route;


Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('logout', 'App\Http\Controllers\Auth\Api\LoginController@logout')->name('api.logout');
    Route::get('users', 'App\Http\Controllers\Auth\Api\UsersController@index')->name('api.users');
    
});

Route::post('login', 'App\Http\Controllers\Auth\Api\LoginController@login')->name('api.login');
Route::get('login/exist_email/{email}', 'App\Http\Controllers\Auth\Api\LoginController@existEmail')->name('api.login.exist_email');

Route::delete('userDelete/{id}', 'App\Http\Controllers\Auth\Api\UsersController@delete')->name('api.userDelete');