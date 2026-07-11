<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\ContactController;
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\GalleryController;
use App\Http\Controllers\API\ProfileController;
use App\Http\Controllers\API\ScheduleController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// --- PUBLIC GUEST ENDPOINTS ---
Route::post('/login', [AuthController::class, 'login']);

Route::get('/profile', [ProfileController::class, 'show']);
Route::get('/contact', [ContactController::class, 'show']);

Route::get('/schedules', [ScheduleController::class, 'index']);
Route::get('/schedules/{id}', [ScheduleController::class, 'show']);

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/categories/{id}', [CategoryController::class, 'show']);

Route::get('/gallery', [GalleryController::class, 'index']);
Route::get('/gallery/{id}', [GalleryController::class, 'show']);


// --- SECURE AUTHENTICATED ADMIN ENDPOINTS ---
Route::middleware('auth:sanctum')->group(function () {
    
    // Auth Sessions & Profile
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::put('/me/profile', [AuthController::class, 'updateProfile']);
    Route::put('/me/password', [AuthController::class, 'changePassword']);

    // Admin Metrics Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Class Profiles Modifying
    Route::put('/profile', [ProfileController::class, 'update']);

    // Class Contact Modifying
    Route::put('/contact', [ContactController::class, 'update']);

    // Schedules Modifying CRUD
    Route::post('/schedules', [ScheduleController::class, 'store']);
    Route::put('/schedules/{id}', [ScheduleController::class, 'update']);
    Route::delete('/schedules/{id}', [ScheduleController::class, 'destroy']);

    // Gallery Modifying CRUD
    Route::post('/gallery', [GalleryController::class, 'store']);
    Route::post('/gallery/{id}', [GalleryController::class, 'update']); // Using POST method for multipart/form-data upload updates
    Route::delete('/gallery/{id}', [GalleryController::class, 'destroy']);

    // Gallery Categories Modifying CRUD
    Route::post('/categories', [CategoryController::class, 'store']);
    Route::put('/categories/{id}', [CategoryController::class, 'update']);
    Route::delete('/categories/{id}', [CategoryController::class, 'destroy']);
});
