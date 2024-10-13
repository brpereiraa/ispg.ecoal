<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ArticlesController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\API\UsersController;
use App\Http\Controllers\API\CommentsController;
use App\Http\Controllers\API\TagsController;
use App\Http\Controllers\API\CategoriesController;
use App\Http\Middleware\Admin;

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

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group([
    'middleware' => 'auth:sanctum',
], function () {
    Route::get('/logout',  [AuthController::class, 'logout']);
    Route::get("/user",[AuthController::class,"user"]);
    Route::post("/user",[AuthController::class,"update"]);
    Route::post("/user/password",[AuthController::class,"updatePassword"]);
    Route::delete("/user",[AuthController::class,"destroy"]);

    Route::post("/articles/{article}/favorite",[ArticlesController::class,"favorite"]);
    Route::delete("/articles/{article}/favorite",[ArticlesController::class,"unfavorite"]);
    Route::apiResource("articles",ArticlesController::class)->only("store","update","destroy")->middleware(Admin::class);

    Route::apiResource("comments",CommentsController::class)->only("store","update","destroy");

    
});

Route::get("/articles/{article}/comments",[ArticlesController::class,"comments"]);

Route::get("/articles/leads",[ArticlesController::class,"leadedArticles"]);
Route::apiResource("articles",ArticlesController::class)->only("index","show");

Route::apiResource("users",UsersController::class)->only("show");

Route::apiResource("tags",TagsController::class)->only("show");

Route::get("/categories/{category}/leads",[CategoriesController::class,"leadedArticles"]);
Route::apiResource("categories",CategoriesController::class)->only("index","show");





