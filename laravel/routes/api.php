<?php

use App\Http\Controllers\PropertyController;
use App\Http\Controllers\WishlistController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['prefix' => '/v1'], function () {
    Route::apiResource('properties',PropertyController::class)->only('index');
    Route::apiResource('wishlist', WishlistController::class)->except('update');
});

Route::fallback(function () {
    abort(404, 'Route Not Found: ' . request()->path());
});
