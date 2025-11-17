<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FakultasController;
use App\Http\Controllers\ProdiController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Routes Fakultas
    Route::apiResource('fakultas', FakultasController::class);
    
    // Routes Prodi
    Route::apiResource('prodis', ProdiController::class);
    
    // Route khusus untuk mendapatkan prodi by fakultas
    Route::get('/fakultas/{id}/prodis', [FakultasController::class, 'prodiByFakultas']);
    
    // Contoh route protected lainnya
    Route::get('/dashboard', function (Request $request) {
        return response()->json([
            'message' => 'Welcome to dashboard!',
            'user' => $request->user()
        ]);
    });
});