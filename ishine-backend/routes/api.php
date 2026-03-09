<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\BannerController;
use App\Http\Controllers\Api\MenuController;
use App\Http\Controllers\Api\SectionController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\Admin\AdminProductController;
use App\Http\Controllers\Api\Admin\AdminOrderController;
use App\Http\Controllers\Api\Admin\AdminUserController;
use App\Http\Controllers\Api\Admin\AdminStatsController;
use App\Http\Controllers\Api\Admin\AdminMenuController;
use App\Http\Controllers\Api\Admin\AdminBannerController;
use App\Http\Controllers\Api\Admin\AdminCategoryController;
use App\Http\Controllers\Api\Admin\AdminBrandController;

// Public routes
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{slug}', [ProductController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/brands', [BrandController::class, 'index']);
Route::get('/banners', [BannerController::class, 'index']);
Route::get('/menu', [MenuController::class, 'index']);
Route::get('/sections/{section}', [SectionController::class, 'show']);

// Auth routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::put('/auth/profile', [AuthController::class, 'updateProfile']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::put('/cart/{id}', [CartController::class, 'update']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);
    
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
});

// Admin routes
Route::middleware(['auth:sanctum'])->prefix('admin')->group(function () {
    Route::get('/stats', [AdminStatsController::class, 'index']);
    Route::apiResource('/products', AdminProductController::class);
    Route::apiResource('/orders', AdminOrderController::class);
    Route::apiResource('/users', AdminUserController::class);
    Route::put('/sections/{section}', [SectionController::class, 'update']);
    Route::apiResource('/menu-items', AdminMenuController::class);
    Route::apiResource('/banners', AdminBannerController::class);
    Route::apiResource('/categories', AdminCategoryController::class);
    Route::apiResource('/brands', AdminBrandController::class);
});
