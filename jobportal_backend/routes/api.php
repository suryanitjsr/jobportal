<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\AppliedjobController;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/register', [UserController:: class, 'register']);
Route::post('/login', [UserController:: class, 'login']);
Route::post('/addJob', [JobController:: class, 'addJob']);
Route::post('/addAppliedjob', [AppliedjobController:: class, 'addAppliedjob']);
Route::get('/addAppliedjob/{cid}', [AppliedjobController:: class, 'getAppliedjob']);
Route::get('/addAppliedjobs/{user}', [AppliedjobController:: class, 'getAppliedjobs']);
Route::get('/candidates/{recruiter}', [AppliedjobController:: class, 'getCandidates']);
Route::get('/list', [JobController:: class, 'list']);
Route::put('/updateStatus/{cid}', [AppliedjobController:: class, 'updateStatus']);
Route::get('/list/{id}', [JobController:: class, 'listbyid']);
Route::get('/searchbycomp/{key}', [JobController:: class, 'searchbycomp']);
Route::get('/searchbyjobtype/{key}', [JobController:: class, 'searchbyjobtype']);
