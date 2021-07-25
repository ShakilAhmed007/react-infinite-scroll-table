<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;
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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function (Request $request) {
    $posts = Post::paginate(20);
    if($request->wantsJson()){
        return $posts;
    }else{
        return Inertia::render('Dashboard', compact('posts'));
    }
})->middleware(['auth', 'verified'])->name('dashboard');

// Search data

Route::get('/dashboard/search/{search_term}', function ($serchTrem) {
    return Post::where('title', 'LIKE', "%{$serchTrem}%")->paginate(20);
})->middleware(['auth', 'verified'])->name('search');

require __DIR__.'/auth.php';
